import React from 'react';
import { Link } from 'react-router-dom';
import './DueDiligence.css';

function DueDiligenceBoaz() {
  return (
    <div className="dd-page">
      {/* Hero Section */}
      <section className="dd-hero" style={{ '--dd-accent': '#1abc9c' }}>
        <div className="dd-hero-bg"></div>
        <div className="dd-hero-badge">TECH DUE DILIGENCE</div>
        <div className="dd-hero-icon">📊</div>
        <h1>Boaz Holdings / Y-Accounting</h1>
        <p className="dd-hero-tagline">AI-Driven Autonomous Financial Management</p>
        <div className="dd-hero-valuation">
          <span className="dd-val-label">IP Valuation (50% ownership)</span>
          <span className="dd-val-amount">R2,500,000 - R5,000,000</span>
          <span className="dd-val-basis">(Joint venture with third party - 50/50 split)</span>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="dd-section">
        <h2>📋 Executive Summary</h2>
        <div className="dd-summary-grid">
          <div className="dd-summary-card">
            <span className="dd-summary-icon">🚀</span>
            <h4>Development Stage</h4>
            <p>Development - Rollout Q1 2026</p>
          </div>
          <div className="dd-summary-card">
            <span className="dd-summary-icon">🤖</span>
            <h4>AI Agents</h4>
            <p>6 Autonomous Financial Agents</p>
          </div>
          <div className="dd-summary-card">
            <span className="dd-summary-icon">📈</span>
            <h4>Forecast Accuracy</h4>
            <p>95%+ Cash Flow Prediction</p>
          </div>
          <div className="dd-summary-card">
            <span className="dd-summary-icon">🔒</span>
            <h4>Ownership</h4>
            <p>50% SARFAT / 50% Partner</p>
          </div>
        </div>
      </section>

      {/* The Innovation */}
      <section className="dd-section dd-section-dark">
        <h2>🧠 Multi-Agent AI Ecosystem</h2>
        <div className="dd-agents-grid">
          <div className="dd-agent-card">
            <div className="dd-agent-icon">📄</div>
            <h4>Document Intelligence Agent</h4>
            <p>Multi-modal processing (PDF, OCR, images). Extracts data, classifies documents, understands business implications.</p>
            <div className="dd-agent-stat">94% Accuracy</div>
          </div>
          <div className="dd-agent-card">
            <div className="dd-agent-icon">💰</div>
            <h4>Cash Flow Optimizer Agent</h4>
            <p>Pattern analysis, seasonal trends, scenario modeling. Autonomous payment optimization.</p>
            <div className="dd-agent-stat">95%+ Forecast Accuracy</div>
          </div>
          <div className="dd-agent-card">
            <div className="dd-agent-icon">🎯</div>
            <h4>Financial Strategist Agent</h4>
            <p>CFO-level insights, multi-year strategic planning, investment recommendations.</p>
            <div className="dd-agent-stat">ROI Projections</div>
          </div>
          <div className="dd-agent-card">
            <div className="dd-agent-icon">⚖️</div>
            <h4>Compliance Monitor Agent</h4>
            <p>Predictive compliance with regulatory tracking. Early warning system for violations.</p>
            <div className="dd-agent-stat">6-Month Predictions</div>
          </div>
          <div className="dd-agent-card">
            <div className="dd-agent-icon">🌐</div>
            <h4>Market Intelligence Agent</h4>
            <p>Real-time analysis of external data sources. Economic indicators, competitor monitoring.</p>
            <div className="dd-agent-stat">50+ Data Sources</div>
          </div>
          <div className="dd-agent-card">
            <div className="dd-agent-icon">🤝</div>
            <h4>Negotiation Assistant Agent</h4>
            <p>Autonomous supplier negotiations, market-rate benchmarking, optimal terms.</p>
            <div className="dd-agent-stat">Cost Optimization</div>
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
              <span className="dd-pill primary">Python 3.11+</span>
              <span className="dd-pill primary">FastAPI</span>
              <span className="dd-pill">PostgreSQL</span>
              <span className="dd-pill">Redis</span>
              <span className="dd-pill">Celery</span>
            </div>
          </div>
          <div className="dd-tech-category">
            <h4>Frontend</h4>
            <div className="dd-tech-pills">
              <span className="dd-pill">React 18</span>
              <span className="dd-pill">TypeScript</span>
              <span className="dd-pill">WebSocket</span>
            </div>
          </div>
          <div className="dd-tech-category">
            <h4>AI/ML Stack</h4>
            <div className="dd-tech-pills">
              <span className="dd-pill highlight">Claude Sonnet 4</span>
              <span className="dd-pill highlight">Claude Opus 4</span>
              <span className="dd-pill">GPT-4 Compatible</span>
              <span className="dd-pill">PyTorch</span>
              <span className="dd-pill">LangChain</span>
              <span className="dd-pill">Vector DB (Pinecone)</span>
            </div>
          </div>
          <div className="dd-tech-category">
            <h4>Document Processing</h4>
            <div className="dd-tech-pills">
              <span className="dd-pill">PyMuPDF</span>
              <span className="dd-pill">Tesseract OCR</span>
              <span className="dd-pill">Claude Vision</span>
            </div>
          </div>
          <div className="dd-tech-category">
            <h4>Security</h4>
            <div className="dd-tech-pills">
              <span className="dd-pill quantum">Quantum-Resistant Encryption</span>
              <span className="dd-pill">Zero-Knowledge Proofs</span>
              <span className="dd-pill">Blockchain Audit Trail</span>
            </div>
          </div>
        </div>
      </section>

      {/* Built Infrastructure */}
      <section className="dd-section dd-section-dark">
        <h2>🏗️ Built Infrastructure</h2>
        <div className="dd-code-showcase">
          <pre className="dd-code-block">
{`backend/
├── app/
│   ├── agents/
│   │   ├── cash_flow_optimizer.py    ✅ Built
│   │   └── document_intelligence.py  ✅ Built
│   ├── api/
│   │   └── v1/endpoints/
│   │       ├── agents.py             ✅ AI agent endpoints
│   │       ├── analytics.py          ✅ Financial analytics
│   │       ├── auth.py               ✅ Authentication
│   │       ├── companies.py          ✅ Company management
│   │       ├── customers.py          ✅ Customer CRM
│   │       ├── invoices.py           ✅ Invoice processing
│   │       └── transactions.py       ✅ Transaction tracking
│   ├── models/
│   │   ├── analytics.py              ✅ Analytics models
│   │   ├── banking.py                ✅ Banking integration
│   │   ├── budget.py                 ✅ Budget management
│   │   ├── invoice.py                ✅ Invoice models
│   │   └── transaction.py            ✅ Transaction models
│   ├── services/
│   │   ├── ai_service.py             ✅ Multi-LLM orchestration
│   │   └── data_ingestion.py         ✅ Document processing
│   └── core/
│       ├── config.py                 ✅ Configuration
│       ├── database.py               ✅ Database layer
│       └── security.py               ✅ Security module
├── alembic/                          ✅ Database migrations
└── tests/                            ✅ Test suite`}
          </pre>
        </div>
      </section>

      {/* Competitive Analysis */}
      <section className="dd-section">
        <h2>🏆 Competitive Advantage Analysis</h2>
        <div className="dd-comparison-table-wrapper">
          <table className="dd-comparison-table">
            <thead>
              <tr>
                <th>Capability</th>
                <th className="competitor">QuickBooks</th>
                <th className="competitor">Xero</th>
                <th className="competitor">Sage</th>
                <th className="us">Y-Accounting</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Transaction Categorization</td>
                <td className="competitor">85% accuracy</td>
                <td className="competitor">80% accuracy</td>
                <td className="competitor">75% accuracy</td>
                <td className="us">✅ 99% with context</td>
              </tr>
              <tr>
                <td>Cash Flow Forecasting</td>
                <td className="competitor">Basic patterns</td>
                <td className="competitor">Limited ML</td>
                <td className="competitor">Historical avg</td>
                <td className="us">✅ 95%+ with market intel</td>
              </tr>
              <tr>
                <td>Strategic Insights</td>
                <td className="competitor">❌ None</td>
                <td className="competitor">❌ None</td>
                <td className="competitor">Basic reports</td>
                <td className="us">✅ AI CFO-level guidance</td>
              </tr>
              <tr>
                <td>Market Intelligence</td>
                <td className="competitor">❌ None</td>
                <td className="competitor">❌ None</td>
                <td className="competitor">❌ None</td>
                <td className="us">✅ 50+ data sources</td>
              </tr>
              <tr>
                <td>Autonomous Operations</td>
                <td className="competitor">❌ None</td>
                <td className="competitor">❌ None</td>
                <td className="competitor">❌ None</td>
                <td className="us">✅ 24/7 AI agents</td>
              </tr>
              <tr>
                <td>Predictive Compliance</td>
                <td className="competitor">❌ None</td>
                <td className="competitor">❌ None</td>
                <td className="competitor">❌ None</td>
                <td className="us">✅ 6-month early warning</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Market Analysis */}
      <section className="dd-section dd-section-dark">
        <h2>📈 Market Position &amp; Size</h2>
        <div className="dd-market-grid">
          <div className="dd-market-card">
            <h4>AI Accounting Market</h4>
            <div className="dd-market-stat">
              <span className="dd-stat-value">$29.33B</span>
              <span className="dd-stat-label">by 2030 (USD)</span>
            </div>
            <p>CAGR 45% - Explosive growth in AI adoption</p>
          </div>
          <div className="dd-market-card">
            <h4>SMB Accounting Software</h4>
            <div className="dd-market-stat">
              <span className="dd-stat-value">$12.5B</span>
              <span className="dd-stat-label">by 2027 (USD)</span>
            </div>
            <p>Primary target market segment</p>
          </div>
          <div className="dd-market-card">
            <h4>Market Pain Points</h4>
            <div className="dd-market-stat">
              <span className="dd-stat-value">82%</span>
              <span className="dd-stat-label">SMBs fail from cash flow</span>
            </div>
            <p>Massive need for predictive solutions</p>
          </div>
          <div className="dd-market-card highlight">
            <h4>Unique Position</h4>
            <div className="dd-market-stat">
              <span className="dd-stat-value">FIRST</span>
              <span className="dd-stat-label">Fully Autonomous AI CFO</span>
            </div>
            <p>Multi-agent ecosystem approach</p>
          </div>
        </div>
      </section>

      {/* IP Valuation */}
      <section className="dd-section">
        <h2>💰 IP Valuation Analysis</h2>
        <div className="dd-valuation-breakdown">
          <div className="dd-val-header">
            <span className="dd-val-total">R2,500,000 - R5,000,000</span>
            <span className="dd-val-basis-text">SARFAT's 50% ownership share of joint venture valuation</span>
          </div>
          
          <div className="dd-val-note" style={{marginBottom: '2rem'}}>
            <strong>Note:</strong> Full platform valuation is R5M-R10M. Values shown represent SARFAT's 50% ownership stake 
            in the joint venture with Boaz Holdings private partner.
          </div>
          
          <div className="dd-val-components">
            <div className="dd-val-item">
              <div className="dd-val-item-header">
                <span className="dd-val-item-name">Multi-Agent AI Framework</span>
                <span className="dd-val-item-amount">R2,000,000</span>
              </div>
              <p>6 autonomous agents, multi-LLM orchestration, collaboration framework</p>
              <div className="dd-val-bar"><div className="dd-val-fill" style={{width: '40%'}}></div></div>
            </div>
            
            <div className="dd-val-item">
              <div className="dd-val-item-header">
                <span className="dd-val-item-name">Cash Flow Intelligence Engine</span>
                <span className="dd-val-item-amount">R1,500,000</span>
              </div>
              <p>95%+ forecasting, pattern analysis, scenario modeling</p>
              <div className="dd-val-bar"><div className="dd-val-fill" style={{width: '30%'}}></div></div>
            </div>
            
            <div className="dd-val-item">
              <div className="dd-val-item-header">
                <span className="dd-val-item-name">Document Intelligence System</span>
                <span className="dd-val-item-amount">R1,000,000</span>
              </div>
              <p>Multi-modal processing, 94% classification accuracy</p>
              <div className="dd-val-bar"><div className="dd-val-fill" style={{width: '20%'}}></div></div>
            </div>
            
            <div className="dd-val-item">
              <div className="dd-val-item-header">
                <span className="dd-val-item-name">Platform &amp; API Infrastructure</span>
                <span className="dd-val-item-amount">R500,000</span>
              </div>
              <p>FastAPI backend, React frontend, API endpoints</p>
              <div className="dd-val-bar"><div className="dd-val-fill" style={{width: '10%'}}></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="dd-section dd-section-dark">
        <h2>💼 Revolutionary Pricing Model</h2>
        <div className="dd-pricing-grid">
          <div className="dd-pricing-tier">
            <h4>AI Financial Insights</h4>
            <div className="dd-price">R3,700/mo</div>
            <p className="dd-price-usd">($199 USD)</p>
            <ul>
              <li>95% forecast accuracy</li>
              <li>Business health scoring</li>
              <li>Market intelligence</li>
            </ul>
            <div className="dd-price-bonus">+ 5% of cost savings identified</div>
          </div>
          <div className="dd-pricing-tier featured">
            <h4>Autonomous Optimization</h4>
            <div className="dd-price">R9,200/mo</div>
            <p className="dd-price-usd">($499 USD)</p>
            <ul>
              <li>Full agent ecosystem</li>
              <li>Real-time optimization</li>
              <li>Compliance monitoring</li>
            </ul>
            <div className="dd-price-bonus">+ 10% of cash flow improvements</div>
          </div>
          <div className="dd-pricing-tier">
            <h4>Strategic AI CFO</h4>
            <div className="dd-price">R18,500/mo</div>
            <p className="dd-price-usd">($999 USD)</p>
            <ul>
              <li>Complete autonomous management</li>
              <li>Strategic planning</li>
              <li>Autonomous negotiations</li>
            </ul>
            <div className="dd-price-bonus">+ 15% of strategic value created</div>
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
              <span>6 autonomous AI agents built</span>
            </div>
            <div className="dd-highlight-item">
              <span className="dd-highlight-icon">✅</span>
              <span>95%+ forecast accuracy (vs 60-70% industry)</span>
            </div>
            <div className="dd-highlight-item">
              <span className="dd-highlight-icon">✅</span>
              <span>$29B market by 2030 (45% CAGR)</span>
            </div>
            <div className="dd-highlight-item">
              <span className="dd-highlight-icon">✅</span>
              <span>First fully autonomous AI CFO platform</span>
            </div>
            <div className="dd-highlight-item">
              <span className="dd-highlight-icon">⚠️</span>
              <span>50/50 joint venture structure</span>
            </div>
          </div>
          <div className="dd-valuation-box">
            <span className="dd-val-label">IP Valuation (50% share)</span>
            <span className="dd-val-final">R2.5M - R5M</span>
            <span className="dd-val-status">Development Phase</span>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="dd-navigation">
        <Link to="/due-diligence/qyvella" className="dd-nav-btn">
          ← Previous: Qyvella
        </Link>
        <Link to="/due-diligence/yellowmantis" className="dd-nav-btn primary">
          Next: Yellow Mantis →
        </Link>
      </section>
    </div>
  );
}

export default DueDiligenceBoaz;
