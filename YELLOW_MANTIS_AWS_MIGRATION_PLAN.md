# AWS Migration & Setup Plan
## Yellow Mantis Investor Platform

**Document Version:** 1.0  
**Date:** January 2026  
**Current State:** Heroku (yellow-mantis-pitch)  
**Target State:** AWS Cloud Infrastructure  
**Production Domain:** yellow-mantis.com

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current Architecture Analysis](#current-architecture-analysis)
3. [Recommended AWS Architecture](#recommended-aws-architecture)
4. [Migration Options Comparison](#migration-options-comparison)
5. [Primary Strategy: S3 + CloudFront](#primary-strategy-s3--cloudfront)
6. [Alternative: Elastic Beanstalk](#alternative-elastic-beanstalk)
7. [Alternative: ECS Fargate](#alternative-ecs-fargate)
8. [Step-by-Step Migration Guide](#step-by-step-migration-guide)
9. [CI/CD Pipeline Setup](#cicd-pipeline-setup)
10. [Domain & SSL Configuration](#domain--ssl-configuration)
11. [Monitoring & Logging](#monitoring--logging)
12. [Security Best Practices](#security-best-practices)
13. [Cost Estimation](#cost-estimation)
14. [Rollback Plan](#rollback-plan)
15. [Post-Migration Checklist](#post-migration-checklist)

---

## Executive Summary

This document outlines the complete migration strategy for moving the Yellow Mantis investor platform from Heroku to AWS. Given the static nature of our React SPA, we recommend **Amazon S3 + CloudFront** as the primary deployment strategy, offering:

- **99.99% availability** via CloudFront global edge network
- **Sub-100ms latency** for South African and global investors
- **~90% cost reduction** compared to current Heroku hosting
- **Unlimited scalability** with no server management
- **Enterprise-grade security** with AWS WAF integration

---

## Current Architecture Analysis

### Application Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Frontend | React | 18.2.0 |
| Routing | React Router DOM | 6.20.0 |
| Bundler | Webpack | 5.89.0 |
| Server | Express.js | 4.18.2 |
| Node.js | Node | 18.x |
| Build Output | Static Files | /dist |

### Application Characteristics

```
Type: Single Page Application (SPA)
Build Output: Static HTML/CSS/JS bundle
Server-Side Logic: None (Express only serves static files)
API Calls: None (self-contained)
Database: None
Authentication: None (public investor pages)
File Size: ~500KB-2MB bundled
```

### Current Deployment Flow

```
npm run build → git push origin main → heroku login → git push heroku main
```

### Current URL Structure

| Route | Purpose |
|-------|---------|
| `/introduction-letter` | Company overview |
| `/pitch-deck` | Investor pitch with deep dives |
| `/full-features` | Tech breakdown (tabbed) |
| `/quantum-guide` | Quantum explainer |
| `/funding` | Interactive budget planner |
| `/structure/7x3k9` | Company org chart #1 |
| `/structure/m4p2n` | Company org chart #2 |
| `/structure/q8f5t` | Company org chart #3 |

---

## Recommended AWS Architecture

### Primary Architecture: S3 + CloudFront (Serverless Static Hosting)

```
                                    ┌─────────────────┐
                                    │   Route 53      │
                                    │ (DNS Management)│
                                    └────────┬────────┘
                                             │
                                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                        CloudFront CDN                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │ Edge Pop │  │ Edge Pop │  │ Edge Pop │  │ Edge Pop │  ...   │
│  │ Cape Town│  │ London   │  │ New York │  │ Singapore│        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   Amazon S3     │
                    │ (Static Assets) │
                    │   eu-west-1     │
                    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   AWS WAF       │
                    │ (Web Firewall)  │
                    └─────────────────┘
```

### Why This Architecture?

1. **No Server Required**: Your Express server only serves static files - S3 does this natively
2. **Global Performance**: CloudFront has edge locations in Cape Town, perfect for SA investors
3. **Zero Maintenance**: No servers to patch, scale, or manage
4. **Cost Effective**: ~$1-5/month for your traffic levels
5. **High Availability**: 99.99% SLA without any configuration

---

## Migration Options Comparison

| Factor | S3 + CloudFront | Elastic Beanstalk | ECS Fargate | EC2 |
|--------|-----------------|-------------------|-------------|-----|
| **Complexity** | ⭐ Low | ⭐⭐ Medium | ⭐⭐⭐ High | ⭐⭐⭐ High |
| **Monthly Cost** | $1-5 | $15-30 | $20-50 | $15-100 |
| **Scalability** | Unlimited | Auto-scaling | Auto-scaling | Manual |
| **Maintenance** | None | Low | Medium | High |
| **Deploy Time** | 1-2 min | 5-10 min | 3-5 min | 5-15 min |
| **Best For** | Static SPA ✓ | Node.js apps | Containers | Full control |

### Recommendation

**Primary: S3 + CloudFront** - Perfect match for static React SPA  
**Fallback: Elastic Beanstalk** - If future server-side features are needed

---

## Primary Strategy: S3 + CloudFront

### Phase 1: AWS Account Setup

#### 1.1 Create AWS Account (if not exists)

```bash
# Navigate to: https://aws.amazon.com/
# Click "Create an AWS Account"
# Choose: Business account (for production use)
# Enable MFA on root account immediately
```

#### 1.2 Create IAM Admin User

```bash
# AWS Console → IAM → Users → Add User
# Username: yellow-mantis-admin
# Access type: Console + Programmatic access
# Attach policy: AdministratorAccess (for setup, restrict later)
```

#### 1.3 Install & Configure AWS CLI

```bash
# Install AWS CLI v2
brew install awscli

# Configure credentials
aws configure
# AWS Access Key ID: [from IAM user]
# AWS Secret Access Key: [from IAM user]
# Default region: eu-west-1 (Ireland - closest to SA with full services)
# Default output format: json

# Verify
aws sts get-caller-identity
```

### Phase 2: S3 Bucket Setup

#### 2.1 Create S3 Bucket

```bash
# Create bucket (name must be globally unique)
aws s3 mb s3://yellow-mantis-production --region eu-west-1

# Create staging bucket
aws s3 mb s3://yellow-mantis-staging --region eu-west-1
```

#### 2.2 Configure Bucket for Static Website Hosting

```bash
# Enable static website hosting
aws s3 website s3://yellow-mantis-production \
    --index-document index.html \
    --error-document index.html
```

#### 2.3 Bucket Policy for CloudFront Access

Create `bucket-policy.json`:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowCloudFrontAccess",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudfront.amazonaws.com"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::yellow-mantis-production/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "arn:aws:cloudfront::ACCOUNT_ID:distribution/DISTRIBUTION_ID"
                }
            }
        }
    ]
}
```

### Phase 3: CloudFront Distribution

#### 3.1 Create CloudFront Distribution

Using AWS Console (recommended for first setup):

1. Navigate to **CloudFront** → **Create Distribution**
2. Configure:

```yaml
Origin Settings:
  Origin Domain: yellow-mantis-production.s3.eu-west-1.amazonaws.com
  Origin Path: (leave empty)
  Origin Access: Origin Access Control (recommended)
  
Default Cache Behavior:
  Viewer Protocol Policy: Redirect HTTP to HTTPS
  Allowed HTTP Methods: GET, HEAD
  Cache Policy: CachingOptimized
  
Settings:
  Price Class: Use all edge locations (best performance)
  Alternate Domain Names (CNAMEs): yellow-mantis.com, www.yellow-mantis.com
  Custom SSL Certificate: Request via ACM (see below)
  Default Root Object: index.html
  
Error Pages (CRITICAL for SPA):
  HTTP Error Code: 403
  Response Page Path: /index.html
  HTTP Response Code: 200
  
  HTTP Error Code: 404
  Response Page Path: /index.html
  HTTP Response Code: 200
```

#### 3.2 Configure SPA Routing (Critical!)

React Router requires all routes to serve `index.html`. Create custom error responses:

```bash
# Via AWS CLI
aws cloudfront create-distribution \
    --distribution-config file://cloudfront-config.json
```

`cloudfront-config.json` excerpt for error handling:

```json
{
    "CustomErrorResponses": {
        "Quantity": 2,
        "Items": [
            {
                "ErrorCode": 403,
                "ResponsePagePath": "/index.html",
                "ResponseCode": "200",
                "ErrorCachingMinTTL": 10
            },
            {
                "ErrorCode": 404,
                "ResponsePagePath": "/index.html",
                "ResponseCode": "200",
                "ErrorCachingMinTTL": 10
            }
        ]
    }
}
```

### Phase 4: SSL Certificate (ACM)

#### 4.1 Request Certificate

```bash
# MUST use us-east-1 for CloudFront certificates
aws acm request-certificate \
    --domain-name yellow-mantis.com \
    --subject-alternative-names "*.yellow-mantis.com" \
    --validation-method DNS \
    --region us-east-1
```

#### 4.2 Validate Certificate

1. Go to ACM in us-east-1
2. Click on certificate → "Create records in Route 53"
3. Wait for validation (usually 5-30 minutes)

### Phase 5: Route 53 DNS Configuration

#### 5.1 Create Hosted Zone (if not exists)

```bash
aws route53 create-hosted-zone \
    --name yellow-mantis.com \
    --caller-reference $(date +%s)
```

#### 5.2 Configure DNS Records

```bash
# Create alias record for apex domain
aws route53 change-resource-record-sets \
    --hosted-zone-id ZONE_ID \
    --change-batch '{
        "Changes": [{
            "Action": "CREATE",
            "ResourceRecordSet": {
                "Name": "yellow-mantis.com",
                "Type": "A",
                "AliasTarget": {
                    "HostedZoneId": "Z2FDTNDATAQYW2",
                    "DNSName": "CLOUDFRONT_DISTRIBUTION_DOMAIN.cloudfront.net",
                    "EvaluateTargetHealth": false
                }
            }
        }]
    }'

# Create www CNAME
aws route53 change-resource-record-sets \
    --hosted-zone-id ZONE_ID \
    --change-batch '{
        "Changes": [{
            "Action": "CREATE",
            "ResourceRecordSet": {
                "Name": "www.yellow-mantis.com",
                "Type": "CNAME",
                "TTL": 300,
                "ResourceRecords": [{"Value": "yellow-mantis.com"}]
            }
        }]
    }'
```

#### 5.3 Update Domain Registrar

Update nameservers at your domain registrar to Route 53's nameservers:
- ns-xxx.awsdns-xx.org
- ns-xxx.awsdns-xx.co.uk
- ns-xxx.awsdns-xx.com
- ns-xxx.awsdns-xx.net

---

## Step-by-Step Migration Guide

### Pre-Migration Checklist

```markdown
☐ AWS account created and secured with MFA
☐ IAM admin user created
☐ AWS CLI installed and configured
☐ S3 buckets created
☐ CloudFront distribution configured
☐ SSL certificate issued and validated
☐ Route 53 hosted zone created
☐ DNS records prepared (not yet active)
☐ Heroku app still running as fallback
```

### Migration Day Procedure

#### Step 1: Final Build

```bash
cd /Users/jpvanzyl/Workspaces/Yellow-Manits

# Clean install
rm -rf node_modules
npm install

# Production build
npm run build

# Verify build
ls -la dist/
```

#### Step 2: Upload to S3

```bash
# Sync all files to S3
aws s3 sync dist/ s3://yellow-mantis-production \
    --delete \
    --cache-control "max-age=31536000" \
    --exclude "index.html"

# Upload index.html with no-cache (for instant updates)
aws s3 cp dist/index.html s3://yellow-mantis-production/index.html \
    --cache-control "no-cache, no-store, must-revalidate"
```

#### Step 3: Invalidate CloudFront Cache

```bash
aws cloudfront create-invalidation \
    --distribution-id YOUR_DISTRIBUTION_ID \
    --paths "/*"
```

#### Step 4: Test via CloudFront URL

```bash
# Test all routes
curl -I https://DISTRIBUTION_ID.cloudfront.net/
curl -I https://DISTRIBUTION_ID.cloudfront.net/pitch-deck
curl -I https://DISTRIBUTION_ID.cloudfront.net/funding
curl -I https://DISTRIBUTION_ID.cloudfront.net/structure/7x3k9
```

#### Step 5: Switch DNS

Update DNS to point to CloudFront (already prepared in Route 53).

#### Step 6: Verify Production

```bash
# Test production domain
curl -I https://yellow-mantis.com
curl -I https://yellow-mantis.com/pitch-deck

# Check SSL
openssl s_client -connect yellow-mantis.com:443 -servername yellow-mantis.com
```

#### Step 7: Decommission Heroku (After 48-72 hours)

```bash
# Only after confirming AWS is stable
heroku apps:destroy yellow-mantis-pitch --confirm yellow-mantis-pitch
```

---

## CI/CD Pipeline Setup

### Option A: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to AWS

on:
  push:
    branches: [main]
  workflow_dispatch:

env:
  AWS_REGION: eu-west-1
  S3_BUCKET: yellow-mantis-production
  CLOUDFRONT_DISTRIBUTION_ID: ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }}

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Deploy to S3
        run: |
          # Sync assets with long cache
          aws s3 sync dist/ s3://${{ env.S3_BUCKET }} \
            --delete \
            --cache-control "max-age=31536000" \
            --exclude "index.html"
          
          # Upload index.html with no cache
          aws s3 cp dist/index.html s3://${{ env.S3_BUCKET }}/index.html \
            --cache-control "no-cache, no-store, must-revalidate"

      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ env.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"

      - name: Deployment Complete
        run: |
          echo "✅ Deployed to https://yellow-mantis.com"
          echo "📊 CloudFront invalidation in progress..."
```

### GitHub Secrets Required

```
AWS_ACCESS_KEY_ID: [from IAM deployment user]
AWS_SECRET_ACCESS_KEY: [from IAM deployment user]
CLOUDFRONT_DISTRIBUTION_ID: [from CloudFront]
```

### Option B: AWS CodePipeline

For fully AWS-native CI/CD:

```yaml
# buildspec.yml
version: 0.2

phases:
  install:
    runtime-versions:
      nodejs: 18
    commands:
      - npm ci

  build:
    commands:
      - npm run build

  post_build:
    commands:
      - aws s3 sync dist/ s3://${S3_BUCKET} --delete --cache-control "max-age=31536000" --exclude "index.html"
      - aws s3 cp dist/index.html s3://${S3_BUCKET}/index.html --cache-control "no-cache"
      - aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_ID} --paths "/*"

artifacts:
  files:
    - '**/*'
  base-directory: dist
```

---

## Alternative: Elastic Beanstalk

If future requirements need server-side logic:

### Create Elastic Beanstalk Environment

```bash
# Install EB CLI
pip install awsebcli

# Initialize
cd /Users/jpvanzyl/Workspaces/Yellow-Manits
eb init yellow-mantis-platform --platform node.js --region eu-west-1

# Create environment
eb create yellow-mantis-prod \
    --instance-type t3.micro \
    --single \
    --elb-type application

# Deploy
eb deploy
```

### Procfile (already compatible)

```
web: npm start
```

### Estimated Cost: ~$15-30/month

---

## Alternative: ECS Fargate

For containerized deployment (future microservices):

### Dockerfile

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf (for SPA routing)

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name _;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

---

## Domain & SSL Configuration

### Transfer Domain to Route 53 (Optional but Recommended)

```bash
# Check if domain is eligible for transfer
aws route53domains check-domain-transferability \
    --domain-name yellow-mantis.com

# Initiate transfer
aws route53domains transfer-domain \
    --domain-name yellow-mantis.com \
    --duration-in-years 1 \
    --admin-contact file://contact.json \
    --registrant-contact file://contact.json \
    --tech-contact file://contact.json \
    --auto-renew
```

### SSL Certificate Best Practices

1. **Always use ACM** (free, auto-renews)
2. **Wildcard certificate** for future subdomains
3. **us-east-1 region** required for CloudFront
4. **DNS validation** preferred over email

---

## Monitoring & Logging

### CloudWatch Dashboard

Create a custom dashboard for Yellow Mantis:

```bash
aws cloudwatch put-dashboard \
    --dashboard-name YellowMantisProduction \
    --dashboard-body file://dashboard.json
```

### Key Metrics to Monitor

| Metric | Service | Alarm Threshold |
|--------|---------|-----------------|
| 4xx Error Rate | CloudFront | > 5% |
| 5xx Error Rate | CloudFront | > 1% |
| Requests | CloudFront | Baseline ± 50% |
| Total Bytes | S3 | Unusual spikes |
| Cache Hit Ratio | CloudFront | < 80% |

### CloudWatch Alarms

```bash
# Create alarm for high error rate
aws cloudwatch put-metric-alarm \
    --alarm-name "YellowMantis-High-Error-Rate" \
    --alarm-description "High 4xx error rate on CloudFront" \
    --metric-name "4xxErrorRate" \
    --namespace "AWS/CloudFront" \
    --statistic Average \
    --period 300 \
    --threshold 5 \
    --comparison-operator GreaterThanThreshold \
    --evaluation-periods 2 \
    --dimensions Name=DistributionId,Value=YOUR_DISTRIBUTION_ID \
    --alarm-actions arn:aws:sns:eu-west-1:ACCOUNT_ID:YellowMantisAlerts
```

### Enable CloudFront Access Logs

```bash
# Create logging bucket
aws s3 mb s3://yellow-mantis-logs --region eu-west-1

# Enable logging on distribution (via console or API)
```

---

## Security Best Practices

### IAM Policy: Least Privilege for Deployment

Create `deployment-policy.json`:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "S3DeployAccess",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::yellow-mantis-production",
                "arn:aws:s3:::yellow-mantis-production/*"
            ]
        },
        {
            "Sid": "CloudFrontInvalidation",
            "Effect": "Allow",
            "Action": [
                "cloudfront:CreateInvalidation",
                "cloudfront:GetInvalidation",
                "cloudfront:ListInvalidations"
            ],
            "Resource": "arn:aws:cloudfront::ACCOUNT_ID:distribution/DISTRIBUTION_ID"
        }
    ]
}
```

### AWS WAF Configuration (Optional, Recommended)

```bash
# Create WAF Web ACL
aws wafv2 create-web-acl \
    --name yellow-mantis-waf \
    --scope CLOUDFRONT \
    --default-action Allow={} \
    --visibility-config SampledRequestsEnabled=true,CloudWatchMetricsEnabled=true,MetricName=YellowMantisWAF \
    --rules file://waf-rules.json \
    --region us-east-1
```

Recommended WAF Rules:
- AWS Managed Core Rule Set
- SQL Injection protection
- Cross-site scripting (XSS) protection
- Rate limiting (1000 requests/5 minutes per IP)

### S3 Security Checklist

```markdown
☐ Block public access enabled (CloudFront uses OAC)
☐ Bucket versioning enabled (for rollback)
☐ Server-side encryption enabled (AES-256)
☐ Access logging enabled
☐ MFA delete enabled for production
```

---

## Cost Estimation

### Monthly Cost Breakdown (S3 + CloudFront)

| Service | Usage Estimate | Cost/Month |
|---------|---------------|------------|
| **S3 Storage** | 10 MB | $0.01 |
| **S3 Requests** | 10,000 GET | $0.04 |
| **CloudFront Data Transfer** | 5 GB | $0.50 |
| **CloudFront Requests** | 100,000 | $0.10 |
| **Route 53 Hosted Zone** | 1 zone | $0.50 |
| **Route 53 Queries** | 100,000 | $0.04 |
| **ACM Certificate** | 1 | Free |
| **CloudWatch** | Basic metrics | Free |
| **Total Estimated** | | **~$1.50-5/month** |

### Cost Comparison

| Platform | Monthly Cost | Notes |
|----------|-------------|-------|
| Heroku (current) | $7-25 | Eco dyno / Basic |
| AWS S3 + CloudFront | $1-5 | Recommended |
| AWS Elastic Beanstalk | $15-30 | Single instance |
| AWS ECS Fargate | $20-50 | Container-based |

### Cost Optimization Tips

1. **Enable S3 Intelligent-Tiering** for infrequent assets
2. **Use CloudFront Price Class 100** if targeting only US/EU
3. **Set up AWS Budgets** with alerts at $5 and $10

```bash
# Create budget alert
aws budgets create-budget \
    --account-id ACCOUNT_ID \
    --budget file://budget.json \
    --notifications-with-subscribers file://subscribers.json
```

---

## Rollback Plan

### Scenario 1: Minor Issues (< 1 hour to fix)

```bash
# Rollback to previous S3 version
aws s3 sync s3://yellow-mantis-production s3://yellow-mantis-backup
aws s3 sync s3://yellow-mantis-previous s3://yellow-mantis-production

# Invalidate cache
aws cloudfront create-invalidation \
    --distribution-id DISTRIBUTION_ID \
    --paths "/*"
```

### Scenario 2: Major Issues (Route back to Heroku)

```bash
# Step 1: Update Route 53 to point to Heroku
# (Heroku should still be running during migration window)

# Step 2: In Route 53, change A record alias to Heroku
# Previous: CloudFront distribution
# New: yellow-mantis-pitch.herokuapp.com

# Step 3: TTL is 300 seconds, propagation in ~5 minutes
```

### Scenario 3: Complete Rebuild

```bash
# Delete and recreate CloudFront distribution
aws cloudfront delete-distribution --id DISTRIBUTION_ID --if-match ETAG

# Recreate from template
aws cloudfront create-distribution \
    --distribution-config file://cloudfront-backup-config.json
```

---

## Post-Migration Checklist

### Immediate (Day 1)

```markdown
☐ All routes accessible via AWS (/, /pitch-deck, /funding, etc.)
☐ HTTPS working correctly
☐ Assets loading (images, fonts, CSS, JS)
☐ React Router navigation working
☐ No console errors
☐ Mobile responsive working
☐ Performance acceptable (< 3s load time)
```

### Short-term (Week 1)

```markdown
☐ CloudWatch alarms configured
☐ Access logs being collected
☐ CI/CD pipeline tested with minor change
☐ AWS costs tracking as expected
☐ Backup/rollback procedure documented and tested
☐ Team access configured via IAM
```

### Medium-term (Month 1)

```markdown
☐ Heroku fully decommissioned
☐ DNS TTLs optimized (lower for critical, higher for stability)
☐ Cache hit ratio > 90%
☐ WAF rules reviewed and tuned
☐ Cost optimization reviewed
☐ Documentation updated (PROJECT_CONTEXT.md)
```

---

## Quick Reference Commands

### Deploy Script

Create `scripts/deploy-aws.sh`:

```bash
#!/bin/bash
set -e

echo "🔨 Building production bundle..."
npm run build

echo "📤 Uploading to S3..."
aws s3 sync dist/ s3://yellow-mantis-production \
    --delete \
    --cache-control "max-age=31536000" \
    --exclude "index.html"

aws s3 cp dist/index.html s3://yellow-mantis-production/index.html \
    --cache-control "no-cache, no-store, must-revalidate"

echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
    --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
    --paths "/*"

echo "✅ Deployment complete!"
echo "🌐 https://yellow-mantis.com"
```

### Update package.json Scripts

```json
{
  "scripts": {
    "dev": "webpack serve --mode development --open",
    "build": "webpack --mode production",
    "start": "node server.js",
    "deploy:aws": "./scripts/deploy-aws.sh",
    "deploy:staging": "aws s3 sync dist/ s3://yellow-mantis-staging --delete"
  }
}
```

---

## Environment Variables

### Local Development (.env)

```bash
# .env (add to .gitignore)
AWS_REGION=eu-west-1
S3_BUCKET_PROD=yellow-mantis-production
S3_BUCKET_STAGING=yellow-mantis-staging
CLOUDFRONT_DISTRIBUTION_ID=EXXXXXXXXXX
```

### GitHub Secrets

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
CLOUDFRONT_DISTRIBUTION_ID
```

---

## Support & Resources

### AWS Documentation

- [S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [CloudFront Developer Guide](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/)
- [Route 53 DNS Configuration](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/)
- [ACM Certificate Management](https://docs.aws.amazon.com/acm/latest/userguide/)

### Troubleshooting

| Issue | Solution |
|-------|----------|
| 403 Access Denied | Check S3 bucket policy and CloudFront OAC |
| Routes return 404 | Configure CloudFront custom error responses |
| HTTPS not working | Ensure ACM certificate in us-east-1 |
| Slow performance | Check CloudFront cache behavior settings |
| Old content showing | Create CloudFront invalidation |

---

## Appendix: Infrastructure as Code (Terraform)

For reproducible infrastructure:

```hcl
# main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "eu-west-1"
}

provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

# S3 Bucket
resource "aws_s3_bucket" "website" {
  bucket = "yellow-mantis-production"
}

resource "aws_s3_bucket_public_access_block" "website" {
  bucket = aws_s3_bucket.website.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "website" {
  origin {
    domain_name              = aws_s3_bucket.website.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.website.id
    origin_id                = "S3Origin"
  }

  enabled             = true
  default_root_object = "index.html"
  aliases             = ["yellow-mantis.com", "www.yellow-mantis.com"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3Origin"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
  }

  # SPA routing - serve index.html for 404s
  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.website.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}

# ACM Certificate (must be in us-east-1 for CloudFront)
resource "aws_acm_certificate" "website" {
  provider          = aws.us_east_1
  domain_name       = "yellow-mantis.com"
  subject_alternative_names = ["*.yellow-mantis.com"]
  validation_method = "DNS"
}

# Origin Access Control
resource "aws_cloudfront_origin_access_control" "website" {
  name                              = "yellow-mantis-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# S3 Bucket Policy
resource "aws_s3_bucket_policy" "website" {
  bucket = aws_s3_bucket.website.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "AllowCloudFrontAccess"
        Effect    = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.website.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.website.arn
          }
        }
      }
    ]
  })
}

# Outputs
output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.website.id
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.website.domain_name
}

output "s3_bucket_name" {
  value = aws_s3_bucket.website.id
}
```

---

**Document Maintained By:** Yellow Mantis DevOps  
**Last Updated:** January 2026  
**Next Review:** Post-migration + 30 days

