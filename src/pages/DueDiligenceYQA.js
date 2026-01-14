import React from 'react';
import { Link } from 'react-router-dom';
import MantisIcon from '../components/MantisIcon';
import './DueDiligence.css';

function DueDiligenceYQA() {
  return (
    <div className="dd-page">
      {/* Hero Section */}
      <section className="dd-hero" style={{ '--dd-accent': '#3498db' }}>
        <div className="dd-hero-bg"></div>
        <div className="dd-hero-badge">TECH DUE DILIGENCE</div>
        <div className="dd-hero-icon">🧪</div>
        <h1>Y-QA Platform</h1>
        <p className="dd-hero-tagline">AI-Powered Quality Assurance with Quantum Optimization &amp; Developer SDK</p>
        <div className="dd-hero-valuation">
          <span className="dd-val-label">IP Valuation</span>
          <span className="dd-val-amount">R22,000,000</span>
          <span className="dd-val-basis">External R15M validation + SDK &amp; Mobile extensions</span>
        </div>
      </section>

      {/* Valuation Note */}
      <section className="dd-valuation-note-banner">
        <div className="dd-valuation-note-content">
          <span className="dd-note-icon">📋</span>
          <div className="dd-note-text">
            <strong>Independent Valuation:</strong> The core platform IP received an external valuation of <strong>R15,000,000</strong> from an independent technology company. 
            The R22M estimate includes the Dev-as-You-Test SDK, Mobile Testing integration, and comprehensive unit testing infrastructure detailed below.
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="dd-section">
        <h2>📋 Executive Summary</h2>
        <div className="dd-summary-grid">
          <div className="dd-summary-card">
            <span className="dd-summary-icon">🎯</span>
            <h4>Development Stage</h4>
            <p>Production Ready - Rollout Q1 2026</p>
          </div>
          <div className="dd-summary-card">
            <span className="dd-summary-icon">📊</span>
            <h4>Total Features</h4>
            <p>75+ Distinct Features Built</p>
          </div>
          <div className="dd-summary-card">
            <span className="dd-summary-icon">🔌</span>
            <h4>Developer SDK</h4>
            <p>Dev-as-You-Test CLI Tool</p>
          </div>
          <div className="dd-summary-card">
            <span className="dd-summary-icon">📱</span>
            <h4>Mobile Testing</h4>
            <p>AWS Device Farm Integration</p>
          </div>
        </div>
      </section>

      {/* Next Phase Enhancements */}
      <section className="dd-section dd-section-dark">
        <h2>🚀 Next Phase Enhancements (Roadmap)</h2>
        <div className="dd-enhancement-grid">
          <div className="dd-enhancement-card">
            <div className="dd-enhancement-header">
              <span className="dd-enhancement-icon">🔌</span>
              <span className="dd-enhancement-status">IN DEVELOPMENT</span>
            </div>
            <h4>Dev-as-You-Test SDK</h4>
            <p>Lightweight CLI tool developers install locally for "test as you dev" workflow integration</p>
            <div className="dd-enhancement-features">
              <span>CLI Tool (y-qa)</span>
              <span>Git Hooks</span>
              <span>Watch Mode</span>
              <span>Real-time Sync</span>
              <span>IDE Plugins</span>
            </div>
          </div>
          <div className="dd-enhancement-card">
            <div className="dd-enhancement-header">
              <span className="dd-enhancement-icon">📱</span>
              <span className="dd-enhancement-status">PLANNED</span>
            </div>
            <h4>Mobile Testing (AWS Device Farm)</h4>
            <p>Real Android &amp; iOS device testing with 100+ device models and cost controls</p>
            <div className="dd-enhancement-features">
              <span>100+ Android Models</span>
              <span>All iOS Devices</span>
              <span>Video Recording</span>
              <span>Budget Controls</span>
            </div>
          </div>
          <div className="dd-enhancement-card">
            <div className="dd-enhancement-header">
              <span className="dd-enhancement-icon">🧪</span>
              <span className="dd-enhancement-status">IN PROGRESS</span>
            </div>
            <h4>Comprehensive Unit Testing</h4>
            <p>90%+ test coverage across 33 models, services, and background jobs</p>
            <div className="dd-enhancement-features">
              <span>RSpec</span>
              <span>FactoryBot</span>
              <span>SimpleCov</span>
              <span>CI Integration</span>
            </div>
          </div>
        </div>
      </section>

      {/* SDK Architecture */}
      <section className="dd-section">
        <h2>🔌 Dev-as-You-Test SDK Architecture</h2>
        <div className="dd-sdk-visual">
          <pre className="dd-code-block">
{`┌─────────────────────────────────────────────────────────────────────┐
│                      Developer's Local Machine                       │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐  │
│  │   IDE/Editor    │    │   Git Hooks     │    │   File Watcher  │  │
│  │  (VS Code,      │    │  (pre-commit,   │    │  (auto-trigger  │  │
│  │   Cursor)       │    │   pre-push)     │    │   on save)      │  │
│  └────────┬────────┘    └────────┬────────┘    └────────┬────────┘  │
│           │                      │                      │           │
│           ▼                      ▼                      ▼           │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                     Y-QA SDK CLI (y-qa)                       │   │
│  ├──────────────────────────────────────────────────────────────┤   │
│  │  • y-qa init          - Initialize project connection         │   │
│  │  • y-qa test          - Run tests locally                     │   │
│  │  • y-qa test --watch  - Watch mode with auto-run             │   │
│  │  • y-qa generate      - AI-generate tests for code           │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                    │                                 │
│                                    │ HTTPS/WebSocket                 │
│                                    ▼                                 │
└────────────────────────────────────┼─────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      Y-QA Platform (Cloud)                           │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐  │
│  │   SDK API       │    │   Test Results  │    │   AI Services   │  │
│  │   Endpoint      │───▶│   Dashboard     │◀───│   (Claude)      │  │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘`}
          </pre>
        </div>
        <div className="dd-sdk-commands">
          <h4>SDK Commands</h4>
          <div className="dd-command-grid">
            <div className="dd-command">
              <code>y-qa init</code>
              <span>Initialize project connection</span>
            </div>
            <div className="dd-command">
              <code>y-qa test --watch</code>
              <span>Watch mode with auto-run</span>
            </div>
            <div className="dd-command">
              <code>y-qa generate tests</code>
              <span>AI-generate tests for code</span>
            </div>
            <div className="dd-command">
              <code>y-qa coverage --sync</code>
              <span>Sync coverage to platform</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Testing */}
      <section className="dd-section dd-section-dark">
        <h2>📱 Mobile Testing - AWS Device Farm Integration</h2>
        <div className="dd-mobile-tiers">
          <div className="dd-tier-card free">
            <div className="dd-tier-header">
              <span className="dd-tier-name">Tier 1: Free</span>
              <span className="dd-tier-cost">$0/mo</span>
            </div>
            <h4>Playwright Mobile Emulation</h4>
            <p>Quick responsive checks during development</p>
          </div>
          <div className="dd-tier-card free">
            <div className="dd-tier-header">
              <span className="dd-tier-name">Tier 2: Local</span>
              <span className="dd-tier-cost">$0/mo</span>
            </div>
            <h4>Android Emulator / iOS Simulator</h4>
            <p>Development testing on dev machine</p>
          </div>
          <div className="dd-tier-card metered">
            <div className="dd-tier-header">
              <span className="dd-tier-name">Tier 3: Device Farm</span>
              <span className="dd-tier-cost">$0.17/min</span>
            </div>
            <h4>Real Device Testing</h4>
            <p>Pre-release, CI/CD, production validation</p>
          </div>
        </div>
        <div className="dd-device-capabilities">
          <h4>Device Farm Capabilities</h4>
          <div className="dd-capabilities-grid">
            <div className="dd-capability">
              <span className="dd-cap-icon">📱</span>
              <span className="dd-cap-text">100+ Android Models</span>
            </div>
            <div className="dd-capability">
              <span className="dd-cap-icon">🍎</span>
              <span className="dd-cap-text">All iPhones &amp; iPads</span>
            </div>
            <div className="dd-capability">
              <span className="dd-cap-icon">📹</span>
              <span className="dd-cap-text">Video Recording</span>
            </div>
            <div className="dd-capability">
              <span className="dd-cap-icon">📊</span>
              <span className="dd-cap-text">Performance Metrics</span>
            </div>
            <div className="dd-capability">
              <span className="dd-cap-icon">🌐</span>
              <span className="dd-cap-text">Network Simulation</span>
            </div>
            <div className="dd-capability">
              <span className="dd-cap-icon">💰</span>
              <span className="dd-cap-text">Budget Controls</span>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="dd-section">
        <h2>🛠️ Technology Stack Analysis</h2>
        <div className="dd-tech-breakdown">
          <div className="dd-tech-category">
            <h4>Backend Framework</h4>
            <div className="dd-tech-pills">
              <span className="dd-pill primary">Ruby on Rails 7.1</span>
              <span className="dd-pill">Ruby 3.2.2</span>
              <span className="dd-pill">PostgreSQL 14</span>
              <span className="dd-pill">Redis</span>
              <span className="dd-pill">Sidekiq</span>
            </div>
          </div>
          <div className="dd-tech-category">
            <h4>SDK &amp; CLI</h4>
            <div className="dd-tech-pills">
              <span className="dd-pill highlight">Ruby Gem (y-qa-sdk)</span>
              <span className="dd-pill highlight">NPM Package (@y-qa/cli)</span>
              <span className="dd-pill">Thor CLI Framework</span>
              <span className="dd-pill">WebSocket Sync</span>
            </div>
          </div>
          <div className="dd-tech-category">
            <h4>AI/ML Integration</h4>
            <div className="dd-tech-pills">
              <span className="dd-pill highlight">Claude Sonnet 4</span>
              <span className="dd-pill highlight">Claude Opus 4</span>
              <span className="dd-pill">GPT-4 Compatible</span>
              <span className="dd-pill">Multi-LLM Orchestration</span>
            </div>
          </div>
          <div className="dd-tech-category">
            <h4>Quantum Integration</h4>
            <div className="dd-tech-pills">
              <span className="dd-pill quantum">D-Wave Systems</span>
              <span className="dd-pill quantum">IBM Quantum</span>
              <span className="dd-pill quantum">AWS Braket</span>
              <span className="dd-pill">QUBO Optimization</span>
            </div>
          </div>
          <div className="dd-tech-category">
            <h4>Mobile Testing Infrastructure</h4>
            <div className="dd-tech-pills">
              <span className="dd-pill">AWS Device Farm</span>
              <span className="dd-pill">Appium</span>
              <span className="dd-pill">XCTest (iOS)</span>
              <span className="dd-pill">Playwright Mobile</span>
            </div>
          </div>
          <div className="dd-tech-category">
            <h4>Testing Infrastructure</h4>
            <div className="dd-tech-pills">
              <span className="dd-pill">RSpec</span>
              <span className="dd-pill">FactoryBot</span>
              <span className="dd-pill">Capybara</span>
              <span className="dd-pill">SimpleCov</span>
              <span className="dd-pill">Playwright</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Deep Dive */}
      <section className="dd-section dd-section-dark">
        <h2>⚡ Core Feature Analysis (75+ Features)</h2>
        <div className="dd-features-grid">
          <div className="dd-feature-category">
            <h4>🤖 AI-Powered Testing (15+ features)</h4>
            <ul>
              <li>AI Test Case Generation (Claude Sonnet/Opus 4)</li>
              <li>AI Playwright Script Generation</li>
              <li>Self-Healing Test Scripts</li>
              <li>Intelligent Defect Prediction</li>
              <li>Collaborative AI Testing (multi-agent)</li>
              <li>AI Provider Tracking with badges</li>
              <li>AI-Powered Test Healing</li>
            </ul>
          </div>
          <div className="dd-feature-category">
            <h4>⚛️ Quantum Optimization (6 features)</h4>
            <ul>
              <li>Quantum Test Suite Optimization</li>
              <li>D-Wave &amp; IBM Quantum Integration</li>
              <li>Test Case Prioritization (QUBO)</li>
              <li>Multi-objective Optimization</li>
              <li>Resource Optimization</li>
              <li>Quantum Annealing Scheduling</li>
            </ul>
          </div>
          <div className="dd-feature-category">
            <h4>🔄 Digital Twin Technology (6 features)</h4>
            <ul>
              <li>Application Digital Twin Modeling</li>
              <li>Component Relationship Mapping</li>
              <li>Impact Analysis for Code Changes</li>
              <li>Test Recommendation Engine</li>
              <li>Real-time GitHub Sync</li>
              <li>Component Risk Assessment</li>
            </ul>
          </div>
          <div className="dd-feature-category">
            <h4>🎯 Advanced Testing (20+ features)</h4>
            <ul>
              <li>Playwright Browser Automation</li>
              <li>Multi-Environment Testing</li>
              <li>Visual Regression Testing</li>
              <li>Parallel Test Execution</li>
              <li>Test Artifact Management</li>
              <li>AI-Driven Exploratory Testing</li>
              <li>Root Cause Analysis</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Competitive Analysis - Updated */}
      <section className="dd-section">
        <h2>🏆 Competitive Advantage Analysis</h2>
        <div className="dd-comparison-table-wrapper">
          <table className="dd-comparison-table">
            <thead>
              <tr>
                <th>Capability</th>
                <th className="competitor">Selenium/Cypress</th>
                <th className="competitor">TestRail</th>
                <th className="competitor">Testim.io</th>
                <th className="competitor">BrowserStack</th>
                <th className="us">Y-QA Platform</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>AI Test Generation</td>
                <td className="competitor">❌ None</td>
                <td className="competitor">❌ None</td>
                <td className="competitor">⚠️ Basic AI</td>
                <td className="competitor">❌ None</td>
                <td className="us">✅ Claude Sonnet 4 / Opus 4</td>
              </tr>
              <tr>
                <td>Developer SDK/CLI</td>
                <td className="competitor">⚠️ Basic CLI</td>
                <td className="competitor">❌ None</td>
                <td className="competitor">❌ None</td>
                <td className="competitor">⚠️ Basic</td>
                <td className="us">✅ Full SDK + Watch Mode</td>
              </tr>
              <tr>
                <td>Real Mobile Devices</td>
                <td className="competitor">❌ Emulators Only</td>
                <td className="competitor">❌ None</td>
                <td className="competitor">⚠️ Limited</td>
                <td className="competitor">✅ Available</td>
                <td className="us">✅ AWS Device Farm + Budget Controls</td>
              </tr>
              <tr>
                <td>Quantum Optimization</td>
                <td className="competitor">❌ None</td>
                <td className="competitor">❌ None</td>
                <td className="competitor">❌ None</td>
                <td className="competitor">❌ None</td>
                <td className="us">✅ D-Wave/IBM Quantum</td>
              </tr>
              <tr>
                <td>Digital Twin</td>
                <td className="competitor">❌ None</td>
                <td className="competitor">❌ None</td>
                <td className="competitor">❌ None</td>
                <td className="competitor">❌ None</td>
                <td className="us">✅ Full Application Modeling</td>
              </tr>
              <tr>
                <td>Self-Healing Tests</td>
                <td className="competitor">❌ Manual</td>
                <td className="competitor">❌ None</td>
                <td className="competitor">✅ Available</td>
                <td className="competitor">❌ None</td>
                <td className="us">✅ AI-Powered Auto-Repair</td>
              </tr>
              <tr>
                <td>Test Time Reduction</td>
                <td className="competitor">0%</td>
                <td className="competitor">10-15%</td>
                <td className="competitor">20-30%</td>
                <td className="competitor">10-20%</td>
                <td className="us">✅ 60% (Quantum Optimized)</td>
              </tr>
              <tr>
                <td>Pricing Model</td>
                <td className="competitor">Open Source</td>
                <td className="competitor">Per User</td>
                <td className="competitor">$450+/mo</td>
                <td className="competitor">$29-399/mo</td>
                <td className="us">✅ Usage-Based + Free Tier</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="dd-unique-advantages">
          <h4>🎯 Unique Competitive Advantages</h4>
          <div className="dd-advantages-grid">
            <div className="dd-advantage-card">
              <span className="dd-advantage-icon">🔌</span>
              <h4>Developer-First SDK</h4>
              <p>Only QA platform with full CLI toolkit, git hooks, watch mode, and real-time sync to platform</p>
            </div>
            <div className="dd-advantage-card">
              <span className="dd-advantage-icon">⚛️</span>
              <h4>Quantum Optimization</h4>
              <p>Only platform using quantum computing for test suite optimization - 60% time reduction proven</p>
            </div>
            <div className="dd-advantage-card">
              <span className="dd-advantage-icon">📱</span>
              <h4>Mobile + Budget Controls</h4>
              <p>AWS Device Farm with automatic fallback to local emulators when budget exceeded</p>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Roadmap */}
      <section className="dd-section dd-section-dark">
        <h2>📅 Implementation Roadmap</h2>
        <div className="dd-roadmap-timeline">
          <div className="dd-roadmap-phase">
            <div className="dd-phase-marker">Phase 1</div>
            <div className="dd-phase-duration">Weeks 1-2</div>
            <div className="dd-phase-content">
              <h4>Unit Tests - Core Models</h4>
              <p>Project, TestCase, UserStory, TestRun model specs with 90%+ coverage</p>
            </div>
          </div>
          <div className="dd-roadmap-phase">
            <div className="dd-phase-marker">Phase 2</div>
            <div className="dd-phase-duration">Weeks 3-4</div>
            <div className="dd-phase-content">
              <h4>Service &amp; Job Tests</h4>
              <p>ClaudeApiService, CodebaseAnalysisJob specs + SimpleCov reporting</p>
            </div>
          </div>
          <div className="dd-roadmap-phase">
            <div className="dd-phase-marker">Phase 3</div>
            <div className="dd-phase-duration">Weeks 5-7</div>
            <div className="dd-phase-content">
              <h4>Dev-as-You-Test SDK v1</h4>
              <p>CLI implementation, file watcher, git hooks, API sync client</p>
            </div>
          </div>
          <div className="dd-roadmap-phase">
            <div className="dd-phase-marker">Phase 4</div>
            <div className="dd-phase-duration">Weeks 8-9</div>
            <div className="dd-phase-content">
              <h4>AWS Device Farm Integration</h4>
              <p>Device pool configuration, budget controls, fallback system</p>
            </div>
          </div>
          <div className="dd-roadmap-phase">
            <div className="dd-phase-marker">Phase 5</div>
            <div className="dd-phase-duration">Week 10</div>
            <div className="dd-phase-content">
              <h4>Mobile Results Dashboard</h4>
              <p>Screenshot/video viewer, performance metrics, embedded results</p>
            </div>
          </div>
        </div>
      </section>

      {/* Market Analysis */}
      <section className="dd-section">
        <h2>📈 Market Position &amp; Size</h2>
        <div className="dd-market-grid">
          <div className="dd-market-card">
            <h4>Global QA/Testing Market</h4>
            <div className="dd-market-stat">
              <span className="dd-stat-value">$51.8B</span>
              <span className="dd-stat-label">by 2026 (USD)</span>
            </div>
            <p>CAGR 14.2% - Growing demand for automated testing solutions</p>
          </div>
          <div className="dd-market-card">
            <h4>Developer Tools Market</h4>
            <div className="dd-market-stat">
              <span className="dd-stat-value">$32B</span>
              <span className="dd-stat-label">by 2028 (USD)</span>
            </div>
            <p>SDK positions Y-QA in high-growth developer tools category</p>
          </div>
          <div className="dd-market-card">
            <h4>Mobile Testing Market</h4>
            <div className="dd-market-stat">
              <span className="dd-stat-value">$9.3B</span>
              <span className="dd-stat-label">by 2027 (USD)</span>
            </div>
            <p>Device Farm integration captures mobile testing opportunity</p>
          </div>
          <div className="dd-market-card highlight">
            <h4>Combined Market Position</h4>
            <div className="dd-market-stat">
              <span className="dd-stat-value">$93B+</span>
              <span className="dd-stat-label">Total Addressable Market</span>
            </div>
            <p>QA + Developer Tools + Mobile = massive opportunity</p>
          </div>
        </div>
      </section>

      {/* IP Valuation - Updated */}
      <section className="dd-section dd-section-dark">
        <h2>💰 IP Valuation Analysis</h2>
        <div className="dd-valuation-breakdown">
          <div className="dd-val-header">
            <span className="dd-val-total">R22,000,000</span>
            <span className="dd-val-basis-text">Comprehensive valuation including external R15M validation + planned enhancements</span>
          </div>
          
          <div className="dd-val-components">
            <div className="dd-val-item validated">
              <div className="dd-val-item-header">
                <span className="dd-val-item-name">🏆 Core Platform (Externally Validated)</span>
                <span className="dd-val-item-amount">R15,000,000</span>
              </div>
              <p>AI testing engine, quantum optimization, digital twin - independently valued by tech company</p>
              <div className="dd-val-bar"><div className="dd-val-fill" style={{width: '68%'}}></div></div>
            </div>
            
            <div className="dd-val-item">
              <div className="dd-val-item-header">
                <span className="dd-val-item-name">Dev-as-You-Test SDK</span>
                <span className="dd-val-item-amount">R4,000,000</span>
              </div>
              <p>CLI toolkit, IDE plugins, git hooks, real-time sync - creates developer ecosystem lock-in</p>
              <div className="dd-val-bar"><div className="dd-val-fill" style={{width: '18%'}}></div></div>
            </div>
            
            <div className="dd-val-item">
              <div className="dd-val-item-header">
                <span className="dd-val-item-name">Mobile Testing Integration</span>
                <span className="dd-val-item-amount">R2,000,000</span>
              </div>
              <p>AWS Device Farm, budget controls, 100+ real devices, automatic fallback system</p>
              <div className="dd-val-bar"><div className="dd-val-fill" style={{width: '9%'}}></div></div>
            </div>
            
            <div className="dd-val-item">
              <div className="dd-val-item-header">
                <span className="dd-val-item-name">Testing Infrastructure &amp; Coverage</span>
                <span className="dd-val-item-amount">R1,000,000</span>
              </div>
              <p>90%+ test coverage, 33 model specs, production-grade CI/CD - reduces technical debt</p>
              <div className="dd-val-bar"><div className="dd-val-fill" style={{width: '5%'}}></div></div>
            </div>
          </div>
          
          <div className="dd-val-note">
            <strong>Valuation Methodology:</strong> The core platform received an <strong>independent external valuation of R15,000,000</strong> from a technology company 
            assessing the original IP. The additional R7M reflects the SDK (R4M - developer tools command premium valuations), 
            mobile testing capability (R2M), and production-grade testing infrastructure (R1M). Total R22M represents a conservative estimate 
            given the combined QA + DevTools market positioning.
          </div>
        </div>
      </section>

      {/* Cost Analysis */}
      <section className="dd-section">
        <h2>💵 Infrastructure Cost Analysis</h2>
        <div className="dd-cost-comparison">
          <div className="dd-cost-card current">
            <h4>Current (Heroku)</h4>
            <div className="dd-cost-amount">~R1,400/mo</div>
            <ul>
              <li>Compute: R900 (Standard-2X)</li>
              <li>Database: R170 (Hobby)</li>
              <li>Redis: R280 (Hobby)</li>
            </ul>
          </div>
          <div className="dd-cost-card proposed">
            <h4>Proposed (AWS)</h4>
            <div className="dd-cost-amount">R1,800-8,000/mo</div>
            <ul>
              <li>EC2/ECS: R900-1,800</li>
              <li>RDS: R450-900</li>
              <li>ElastiCache: R270-450</li>
              <li>Device Farm: R0-4,500 (capped)</li>
            </ul>
          </div>
        </div>
        <p className="dd-cost-note">AWS costs higher but include mobile testing capability not available on Heroku. Device Farm has budget controls to prevent overspend.</p>
      </section>

      {/* Growth Potential */}
      <section className="dd-section dd-section-dark">
        <h2>🚀 Growth Potential</h2>
        <div className="dd-growth-grid">
          <div className="dd-growth-card">
            <h4>Year 1 (2026)</h4>
            <div className="dd-growth-metrics">
              <div className="dd-growth-metric">
                <span className="dd-growth-value">50</span>
                <span className="dd-growth-label">Enterprise Clients</span>
              </div>
              <div className="dd-growth-metric">
                <span className="dd-growth-value">R6M</span>
                <span className="dd-growth-label">ARR Target</span>
              </div>
            </div>
          </div>
          <div className="dd-growth-card">
            <h4>Year 2 (2027)</h4>
            <div className="dd-growth-metrics">
              <div className="dd-growth-metric">
                <span className="dd-growth-value">200</span>
                <span className="dd-growth-label">Enterprise Clients</span>
              </div>
              <div className="dd-growth-metric">
                <span className="dd-growth-value">R24M</span>
                <span className="dd-growth-label">ARR Target</span>
              </div>
            </div>
          </div>
          <div className="dd-growth-card">
            <h4>Year 3 (2028)</h4>
            <div className="dd-growth-metrics">
              <div className="dd-growth-metric">
                <span className="dd-growth-value">500</span>
                <span className="dd-growth-label">Enterprise Clients</span>
              </div>
              <div className="dd-growth-metric">
                <span className="dd-growth-value">R60M</span>
                <span className="dd-growth-label">ARR Target</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="dd-growth-drivers">
          <h4>Key Growth Drivers</h4>
          <div className="dd-drivers-list">
            <div className="dd-driver">
              <span className="dd-driver-icon">🔌</span>
              <div>
                <strong>SDK Adoption</strong>
                <p>Developer tools create viral adoption and ecosystem lock-in</p>
              </div>
            </div>
            <div className="dd-driver">
              <span className="dd-driver-icon">📱</span>
              <div>
                <strong>Mobile Testing Demand</strong>
                <p>$9.3B market with cost-controlled AWS Device Farm access</p>
              </div>
            </div>
            <div className="dd-driver">
              <span className="dd-driver-icon">⚛️</span>
              <div>
                <strong>Quantum Differentiation</strong>
                <p>Only platform with quantum optimization - 2-3 year head start</p>
              </div>
            </div>
            <div className="dd-driver">
              <span className="dd-driver-icon">🧠</span>
              <div>
                <strong>AI Network Effects</strong>
                <p>Platform improves with usage data, creating compounding advantage</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="dd-section">
        <h2>📊 Success Metrics (Targets)</h2>
        <div className="dd-metrics-grid">
          <div className="dd-metric-card">
            <span className="dd-metric-value">90%+</span>
            <span className="dd-metric-label">Model Test Coverage</span>
          </div>
          <div className="dd-metric-card">
            <span className="dd-metric-value">85%+</span>
            <span className="dd-metric-label">Service Test Coverage</span>
          </div>
          <div className="dd-metric-card">
            <span className="dd-metric-value">50%+</span>
            <span className="dd-metric-label">SDK Adoption (3mo)</span>
          </div>
          <div className="dd-metric-card">
            <span className="dd-metric-value">&lt;15min</span>
            <span className="dd-metric-label">Mobile Suite Time</span>
          </div>
          <div className="dd-metric-card">
            <span className="dd-metric-value">100%</span>
            <span className="dd-metric-label">Budget Adherence</span>
          </div>
          <div className="dd-metric-card">
            <span className="dd-metric-value">4.5/5</span>
            <span className="dd-metric-label">Developer Satisfaction</span>
          </div>
        </div>
      </section>

      {/* Risk Analysis */}
      <section className="dd-section dd-section-dark">
        <h2>⚠️ Risk Assessment</h2>
        <div className="dd-risk-grid">
          <div className="dd-risk-card low">
            <div className="dd-risk-header">
              <span className="dd-risk-level">LOW</span>
              <span className="dd-risk-title">Technology Risk</span>
            </div>
            <p>Production-ready codebase with 75+ features. SDK uses proven patterns (Thor, WebSocket).</p>
          </div>
          <div className="dd-risk-card low">
            <div className="dd-risk-header">
              <span className="dd-risk-level">LOW</span>
              <span className="dd-risk-title">IP Ownership</span>
            </div>
            <p>100% IP owned. External R15M valuation validates core platform value. No encumbrances.</p>
          </div>
          <div className="dd-risk-card medium">
            <div className="dd-risk-header">
              <span className="dd-risk-level">MEDIUM</span>
              <span className="dd-risk-title">Mobile Cost Control</span>
            </div>
            <p>AWS Device Farm costs variable. Mitigated by budget caps and automatic local fallback.</p>
          </div>
          <div className="dd-risk-card low">
            <div className="dd-risk-header">
              <span className="dd-risk-level">LOW</span>
              <span className="dd-risk-title">Competitive Threat</span>
            </div>
            <p>SDK + Quantum + Mobile creates unique three-way moat. 2-3 year combined head start.</p>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="dd-section dd-summary-section">
        <h2>📊 Investment Summary</h2>
        <div className="dd-final-summary">
          <div className="dd-summary-highlights">
            <div className="dd-highlight-item">
              <span className="dd-highlight-icon">✅</span>
              <span>External R15M valuation on core platform IP</span>
            </div>
            <div className="dd-highlight-item">
              <span className="dd-highlight-icon">✅</span>
              <span>Dev-as-You-Test SDK creates developer ecosystem</span>
            </div>
            <div className="dd-highlight-item">
              <span className="dd-highlight-icon">✅</span>
              <span>AWS Device Farm for 100+ real mobile devices</span>
            </div>
            <div className="dd-highlight-item">
              <span className="dd-highlight-icon">✅</span>
              <span>Only quantum + AI + SDK testing platform globally</span>
            </div>
            <div className="dd-highlight-item">
              <span className="dd-highlight-icon">✅</span>
              <span>$93B+ combined addressable market</span>
            </div>
            <div className="dd-highlight-item">
              <span className="dd-highlight-icon">✅</span>
              <span>10-week implementation roadmap for all enhancements</span>
            </div>
          </div>
          <div className="dd-valuation-box">
            <span className="dd-val-label">IP Valuation</span>
            <span className="dd-val-final">R22,000,000</span>
            <span className="dd-val-status">R15M validated + R7M enhancements</span>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="dd-navigation">
        <Link to="/due-diligence" className="dd-nav-btn">
          ← Back to Summary
        </Link>
        <Link to="/due-diligence/qproteus" className="dd-nav-btn primary">
          Next: QProteus (Quantum) →
        </Link>
      </section>
    </div>
  );
}

export default DueDiligenceYQA;
