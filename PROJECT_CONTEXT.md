# Yellow Mantis Technology Group - Project Context & Memory

**Last Updated:** December 15, 2025  
**Workspace:** `/Users/jpvanzyl/Workspaces/Yellow-Manits`

---

## Project Overview

Yellow Mantis is an investor-facing React website showcasing a technology holding company with ventures in:
- **Y-QA Platform** - AI-powered QA testing (Valuation: R15M)
- **Quantum Bridge** - Quantum-classical computing bridge (Valuation: R7.5M-R12.5M)
- **Qyvella Robotics** - AI robotics platform (Valuation: R5M-R7.5M)
- **Y-Accounting** - Autonomous financial management (50% ownership, Valuation: R2.5M-R5M)

**Total Portfolio Valuation:** R30M - R40M (Conservative)

---

## Deployment Information

### Production URLs
- **Main Site:** https://yellow-mantis.com
- **Heroku App:** https://yellow-mantis-pitch-cbf8600f787f.herokuapp.com

### Key Pages
| Page | URL | Description |
|------|-----|-------------|
| Introduction Letter | `/introduction-letter` | Company overview |
| Pitch Deck | `/pitch-deck` | Investor pitch with deep dives |
| Features | `/full-features` | Tech stack breakdown |
| Quantum Guide | `/quantum-guide` | Quantum computing explainer |
| Funding Requirements | `/funding` | Interactive budget planner (standalone) |
| Company Structure #1 | `/structure/7x3k9` | Interactive org chart (standalone) |
| Company Structure #2 | `/structure/m4p2n` | Interactive org chart (standalone) |
| Company Structure #3 | `/structure/q8f5t` | Interactive org chart (standalone) |

### Deployment Commands
```bash
cd /Users/jpvanzyl/Workspaces/Yellow-Manits
npm run build
git add -A && git commit -m "Your message"
git push origin main
heroku login  # If authentication expired
git push heroku main
```

---

## Tech Stack

- **Frontend:** React 18 + React Router DOM
- **Bundler:** Webpack 5
- **Server:** Express.js (for Heroku)
- **Styling:** CSS with CSS Variables (themes)
- **Hosting:** Heroku + Custom Domain (yellow-mantis.com)
- **DNS:** Google Domains (configured)

---

## File Structure

```
Yellow-Manits/
├── src/
│   ├── App.js                    # Main router
│   ├── index.js                  # Entry point
│   ├── components/
│   │   ├── Header.js/css         # Navigation
│   │   ├── Footer.js/css         # Footer
│   │   └── MantisIcon.js         # Logo component (PNG)
│   ├── pages/
│   │   ├── IntroductionLetter.js/css
│   │   ├── PitchDeck.js/css
│   │   ├── FullFeatures.js/css
│   │   ├── QuantumForInvestors.js/css
│   │   ├── FundingRequirements.js/css  # Interactive budget
│   │   └── CompanyStructure.js/css     # Interactive org chart
│   └── styles/
│       ├── global.css            # Global styles
│       └── themes.css            # Theme variables
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── mantis-logo-transparent.png
├── dist/                         # Built files
├── server.js                     # Express server
├── webpack.config.js
├── package.json
└── Documentation files (.md)
```

---

## Interactive Features

### 1. Funding Requirements Page (`/funding`)

**Features:**
- Executive Summary with auto-calculated totals
- Per-project expense tables (monthly → 12-month calculations)
- Growth % inputs per project
- Share purchase section with equity calculations
- Milestones & deliverables tracking
- Notes section
- Save to localStorage / Export as JSON

**Key Calculations:**
- IP Valuation + Growth % = Total Valuation
- Equity Purchase = Total Valuation × Equity %
- Running Cost Contribution = Project Operating × Running Cost %

### 2. Company Structure Pages (`/structure/[id]`)

**3 Unique URLs (5-character codes):**
- `/structure/7x3k9`
- `/structure/m4p2n`
- `/structure/q8f5t`

**Features:**
- Add company nodes (Holding, Subsidiary, Associate, Joint Venture, Trust, External)
- Drag & drop positioning
- Connect nodes to show ownership relationships
- Click connections to set shareholding %
- Color-coded by company type
- Notes section at bottom
- Save to localStorage / Export as JSON
- Each URL has independent data storage

---

## Design System

### Colors (Deep Charcoal Theme - Static)
```css
--bg-primary: #1a1a1a
--bg-secondary: #242424
--bg-tertiary: #2d2d2d
--primary-yellow: #F2D974
--text-primary: #E8E8E8
--text-secondary: #D0D0D0
--text-muted: #909090
--border-subtle: rgba(255, 255, 255, 0.1)
```

### Fonts
- Headers: System fonts with fallbacks
- Mono: JetBrains Mono (for numbers/code)

---

## Recent Changes (December 2025)

1. **Added Company Structure pages** - Interactive drag-and-drop org charts with 3 unique URLs
2. **Enhanced Funding Requirements** - Added growth percentages, share purchase section, unit costs for robotics
3. **Removed theme switcher** - Static Deep Charcoal theme
4. **Logo updated** - Using `mantis-logo-transparent.png` (static, no animation)
5. **Bullet points fixed** - Changed from arrows → to simple bullets •
6. **Renamed Nova Robotics → Qyvella Robotics**
7. **Changed Y-QA status** - "Rollout Q1 2026"
8. **Added Y-Accounting note** - "In conjunction with a third party"
9. **Changed "Founder & CEO" → "Founder"**

---

## Valuations (IP_VALUATION_ANALYSIS.md)

| Product | Current Value | Moderate Growth | High Growth | Maturity |
|---------|---------------|-----------------|-------------|----------|
| Y-QA Platform | R15M | R22.5M (1.5x) | R37.5M (2.5x) | R30M-R50M |
| Quantum Bridge | R7.5M-R12.5M | R13M-R16.25M | R37.5M-R125M | R50M-R150M+ |
| Qyvella Robotics | R5M-R7.5M | R6.5M-R9.75M | R15M-R37.5M | R15M-R40M |
| Y-Accounting (50%) | R2.5M-R5M | R3.5M-R7M | R5M-R10M | R5M-R12.5M |

**TAM (Total Addressable Market):**
- Y-QA: $4.8B (12% CAGR)
- Quantum: $1.3B → $8.6B (32% CAGR)
- Robotics: $18.4B (15% CAGR)
- Accounting: $19.6B (8% CAGR)

---

## GitHub Repository

- **Repo:** https://github.com/jpvzyl/Yellow-Mantis
- **Branch:** main

---

## Contact

**JP van Zyl - Founder**
- Email: jp@yellow-mantis.com
- Phone: +27 76 486 3294
- Website: yellow-mantis.com

---

## Troubleshooting

### Heroku Push Fails
```bash
heroku login  # Re-authenticate
git push heroku main
```

### Port 3000 in Use (Local Dev)
```bash
lsof -ti:3000 | xargs kill  # Kill process
npm start
```

### Build Errors
```bash
rm -rf node_modules
npm install
npm run build
```

---

## Related Workspaces

| Workspace | Path | Description |
|-----------|------|-------------|
| Y-QA | `/Users/jpvanzyl/Workspaces/Y-QA` | QA Platform Rails App |
| Quantum | `/Users/jpvanzyl/Workspaces/Quantum` | Quantum Bridge Python |
| Robotics | `/Users/jpvanzyl/Workspaces/Robotics v1` | Django Command Center |
| Y-Accounting | `/Users/jpvanzyl/Workspaces/Y-Accounting` | Accounting Software |
| Faces App | `/Users/jpvanzyl/Workspaces/Faces/Faces App` | Event Tracking Rails |

---

*This file serves as a project memory for AI assistants. Update after significant changes.*

