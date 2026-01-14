import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MantisIcon from '../components/MantisIcon';
import './DueDiligence.css';

const DueDiligenceSummary = () => {
  const [selectedVenture, setSelectedVenture] = useState(null);

  const ventures = {
    yqa: {
      id: 'yqa',
      name: 'Y-QA',
      type: 'flagship',
      shortDesc: 'AI-Powered QA + Developer SDK',
      valuation: 'R22,000,000',
      valuationNote: 'R15M External + R7M Enhancements',
      status: 'Rollout Q1 2026',
      color: '#3498db',
      icon: '🧪',
      keyMetrics: [
        '75+ Features + SDK ✅',
        'Dev-as-You-Test CLI',
        'AWS Device Farm Mobile',
        'External R15M Validated'
      ],
      competitiveAdvantage: 'Only Quantum + AI + SDK testing platform - external R15M valuation on core IP',
      link: '/due-diligence/yqa'
    },
    qproteus: {
      id: 'qproteus',
      name: 'QPROTEUS',
      type: 'operational',
      shortDesc: 'Quantum Bridge Framework',
      valuation: 'R18,000,000',
      valuationNote: 'Complete & Operational',
      status: 'OPERATIONAL',
      color: '#9b59b6',
      icon: '⚛️',
      keyMetrics: [
        'AWS Braket Connected ✅',
        'Live Traffic Demos ✅',
        'D-Wave + IonQ + Rigetti',
        'Cape Town & Joburg Data'
      ],
      competitiveAdvantage: 'First working classical-to-quantum bridge with real-world demos - proven Jan 2026',
      link: '/due-diligence/qproteus'
    },
    qyvella: {
      id: 'qyvella',
      name: 'QYVELLA',
      type: 'rnd',
      shortDesc: 'AI-Powered Robotics',
      valuation: 'R5,000,000 - R7,500,000',
      valuationNote: 'Final R&D Stage',
      status: 'Final R&D',
      color: '#e74c3c',
      icon: '🤖',
      keyMetrics: [
        '4-DOF Arm + AI Head',
        'Claude Opus 4 AI',
        'Sub-$500 Unit Cost',
        '5 AI Personalities'
      ],
      competitiveAdvantage: '"Raspberry Pi of AI Robotics" - first affordable AI-native platform',
      link: '/due-diligence/qyvella'
    },
    boaz: {
      id: 'boaz',
      name: 'BOAZ HOLDINGS',
      type: 'joint',
      shortDesc: 'AI-Driven Accounting',
      valuation: 'R2,500,000 - R5,000,000',
      valuationNote: '50% Ownership Share',
      status: 'Development',
      color: '#1abc9c',
      icon: '📊',
      keyMetrics: [
        '6 AI Agents',
        '95%+ Forecast Accuracy',
        'Multi-LLM Orchestration',
        '6-Month Compliance Prediction'
      ],
      competitiveAdvantage: 'First fully autonomous AI CFO platform',
      link: '/due-diligence/boaz'
    },
    rigelaz: {
      id: 'rigelaz',
      name: 'RIGELAZ HOLDINGS',
      type: 'operational',
      shortDesc: 'Dev & Consulting • Faces Group',
      valuation: 'OPERATIONAL',
      valuationNote: 'Production + Revenue',
      status: 'LIVE',
      color: '#27ae60',
      icon: '💼',
      keyMetrics: [
        '60,000+ Athletes Served',
        '99.9% Uptime (12mo)',
        '4+ Major Events',
        '50K+ Lines of Code'
      ],
      competitiveAdvantage: 'Production-proven platform with enterprise integration moat',
      link: '/due-diligence/rigelaz'
    }
  };

  const closeModal = () => setSelectedVenture(null);
  const getVentureData = () => ventures[selectedVenture];

  // Calculate total valuation
  const calculateTotal = () => {
    const yqa = 22000000; // R15M external validated + R7M enhancements (SDK, Mobile, Tests)
    const qproteus = 18000000; // Proven operational Jan 2026
    const qyvella = (5000000 + 7500000) / 2;
    const boaz = (2500000 + 5000000) / 2;
    return yqa + qproteus + qyvella + boaz;
  };

  return (
    <div className="dd-summary-page">
      {/* Hero Section */}
      <section className="dd-summary-hero">
        <div className="dd-summary-hero-bg"></div>
        <MantisIcon size={80} className="dd-summary-logo" />
        <h1>Yellow Mantis Group Tech Due Diligence</h1>
        <p className="dd-summary-tagline">Portfolio Valuation &amp; Technology Assessment</p>
        <div className="dd-summary-total">
          <span className="dd-total-label">Combined IP Valuation</span>
          <span className="dd-total-amount">R{(calculateTotal() / 1000000).toFixed(1)}M+</span>
          <span className="dd-total-note">Based on development investment, features &amp; market analysis</span>
        </div>
      </section>

      {/* Valuation Overview */}
      <section className="dd-section">
        <h2>💰 Portfolio Valuation Summary</h2>
        <div className="dd-valuation-summary-grid">
          {Object.values(ventures).map((venture) => (
            <div 
              key={venture.id}
              className={`dd-venture-card dd-venture-${venture.type}`}
              style={{ '--venture-color': venture.color }}
              onClick={() => setSelectedVenture(venture.id)}
            >
              <div className="dd-venture-icon">{venture.icon}</div>
              <div className="dd-venture-header">
                <span className="dd-venture-status">{venture.status}</span>
              </div>
              <h3 className="dd-venture-name">{venture.name}</h3>
              <p className="dd-venture-desc">{venture.shortDesc}</p>
              <div className="dd-venture-valuation">
                <span className="dd-val-amount">{venture.valuation}</span>
                <span className="dd-val-note">{venture.valuationNote}</span>
              </div>
              <div className="dd-venture-cta">Click for details →</div>
            </div>
          ))}
        </div>
      </section>

      {/* Valuation Methodology */}
      <section className="dd-section dd-section-dark">
        <h2>📊 Valuation Methodology</h2>
        <div className="dd-methodology-grid">
          <div className="dd-method-card">
            <h4>🎯 External Validation</h4>
            <p><strong>Y-QA Core IP: R15,000,000 (Externally Validated)</strong></p>
            <p>Independent technology company valuation of core platform IP. Additional R7M for SDK, Mobile Testing &amp; Infrastructure = <strong>R22M total</strong>.</p>
          </div>
          <div className="dd-method-card">
            <h4>⚖️ Adjustment Factors</h4>
            <ul>
              <li><strong>Development Stage:</strong> Production vs R&amp;D vs Research</li>
              <li><strong>Technology Novelty:</strong> First-mover advantage</li>
              <li><strong>Market Size:</strong> TAM/SAM analysis</li>
              <li><strong>Competitive Moat:</strong> Barrier to entry</li>
            </ul>
          </div>
          <div className="dd-method-card">
            <h4>📈 Market Comparables</h4>
            <ul>
              <li><strong>QA Testing:</strong> $51.8B market by 2026</li>
              <li><strong>Quantum Computing:</strong> $65B market by 2030</li>
              <li><strong>AI Accounting:</strong> $29.33B market by 2030</li>
              <li><strong>Personal Robotics:</strong> $4.8B market</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Detailed Breakdown Table */}
      <section className="dd-section">
        <h2>📋 Detailed Valuation Breakdown</h2>
        <div className="dd-breakdown-table-wrapper">
          <table className="dd-breakdown-table">
            <thead>
              <tr>
                <th>Venture</th>
                <th>Stage</th>
                <th>IP Valuation</th>
                <th>Market Size</th>
                <th>Competitive Position</th>
              </tr>
            </thead>
            <tbody>
              <tr className="flagship">
                <td>
                  <span className="venture-badge">🧪</span>
                  <strong>Y-QA</strong>
                </td>
                <td>Rollout Q1 2026</td>
                <td className="valuation"><strong>R22,000,000</strong></td>
                <td>$93B+ (QA+DevTools+Mobile)</td>
                <td>Quantum + AI + SDK Platform (R15M Validated)</td>
              </tr>
              <tr className="operational">
                <td>
                  <span className="venture-badge">⚛️</span>
                  <strong>QProteus</strong>
                </td>
                <td>OPERATIONAL ✅</td>
                <td className="valuation"><strong>R18,000,000</strong></td>
                <td>$65B (2030)</td>
                <td>First Working Quantum Bridge (Proven Jan 2026)</td>
              </tr>
              <tr>
                <td>
                  <span className="venture-badge">🤖</span>
                  <strong>Qyvella</strong>
                </td>
                <td>Final R&amp;D</td>
                <td className="valuation">R5M - R7.5M</td>
                <td>$8.3B (Combined)</td>
                <td>AI-Native Affordable Robotics</td>
              </tr>
              <tr>
                <td>
                  <span className="venture-badge">📊</span>
                  <strong>Boaz Holdings</strong>
                </td>
                <td>Development</td>
                <td className="valuation">R2.5M - R5M (50%)</td>
                <td>$29.33B (2030)</td>
                <td>Autonomous AI CFO Platform</td>
              </tr>
              <tr className="operational">
                <td>
                  <span className="venture-badge">💼</span>
                  <strong>Rigelaz Holdings</strong>
                </td>
                <td>LIVE PRODUCTION</td>
                <td className="valuation operational">OPERATIONAL</td>
                <td>R4.4B (SA Events)</td>
                <td>60K+ Athletes, 99.9% Uptime</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2"><strong>TOTAL PORTFOLIO</strong></td>
                <td className="valuation total"><strong>R50,000,000+</strong></td>
                <td colSpan="2">Combined addressable market: $160B+ (R15M externally validated)</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* Technology Stack Overview */}
      <section className="dd-section dd-section-dark">
        <h2>🛠️ Portfolio Technology Stack</h2>
        <div className="dd-tech-overview">
          <div className="dd-tech-column">
            <h4>Languages</h4>
            <div className="dd-tech-pills">
              <span className="dd-pill">Python 3.11</span>
              <span className="dd-pill">Ruby 3.2</span>
              <span className="dd-pill">TypeScript</span>
              <span className="dd-pill">JavaScript</span>
            </div>
          </div>
          <div className="dd-tech-column">
            <h4>Frameworks</h4>
            <div className="dd-tech-pills">
              <span className="dd-pill">Ruby on Rails 7.1</span>
              <span className="dd-pill">Django 5.0</span>
              <span className="dd-pill">FastAPI</span>
              <span className="dd-pill">React 18</span>
              <span className="dd-pill">React Native</span>
            </div>
          </div>
          <div className="dd-tech-column">
            <h4>AI &amp; Quantum</h4>
            <div className="dd-tech-pills">
              <span className="dd-pill highlight">Claude Sonnet 4</span>
              <span className="dd-pill highlight">Claude Opus 4</span>
              <span className="dd-pill">GPT-4 Compatible</span>
              <span className="dd-pill quantum">AWS Braket</span>
              <span className="dd-pill quantum">D-Wave</span>
            </div>
          </div>
          <div className="dd-tech-column">
            <h4>Infrastructure</h4>
            <div className="dd-tech-pills">
              <span className="dd-pill">PostgreSQL</span>
              <span className="dd-pill">Redis</span>
              <span className="dd-pill">Docker</span>
              <span className="dd-pill">Heroku</span>
              <span className="dd-pill">AWS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Assessment */}
      <section className="dd-section">
        <h2>⚠️ Portfolio Risk Assessment</h2>
        <div className="dd-risk-summary-grid">
          <div className="dd-risk-card low">
            <h4>Technology Risk</h4>
            <span className="dd-risk-level">LOW</span>
            <p>Proven tech stack (Rails, React, Python). Production-tested infrastructure.</p>
          </div>
          <div className="dd-risk-card low">
            <h4>IP Ownership</h4>
            <span className="dd-risk-level">LOW</span>
            <p>100% owned IP (except 50% Boaz). No licensing encumbrances.</p>
          </div>
          <div className="dd-risk-card medium">
            <h4>Market Timing</h4>
            <span className="dd-risk-level">MEDIUM</span>
            <p>Quantum computing still maturing. AI adoption accelerating rapidly.</p>
          </div>
          <div className="dd-risk-card low">
            <h4>Execution</h4>
            <span className="dd-risk-level">LOW</span>
            <p>Proven execution - Faces Group live in production with 60K+ users.</p>
          </div>
        </div>
      </section>

      {/* Investment Highlights */}
      <section className="dd-section dd-section-dark">
        <h2>✨ Investment Highlights</h2>
        <div className="dd-highlights-grid">
          <div className="dd-highlight-card">
            <div className="dd-highlight-icon">🎯</div>
            <h4>First-Mover Advantage</h4>
            <p>Only quantum + AI QA platform globally. 2-3 year head start.</p>
          </div>
          <div className="dd-highlight-card">
            <div className="dd-highlight-icon">✅</div>
            <h4>Production Proven</h4>
            <p>60,000+ athletes served. 99.9% uptime. Real revenue.</p>
          </div>
          <div className="dd-highlight-card">
            <div className="dd-highlight-icon">🔗</div>
            <h4>Integrated Portfolio</h4>
            <p>Quantum Bridge powers Y-QA. Cross-venture synergies.</p>
          </div>
          <div className="dd-highlight-card">
            <div className="dd-highlight-icon">📈</div>
            <h4>Massive Markets</h4>
            <p>Combined TAM of $150B+ across all ventures.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="dd-cta-section">
        <MantisIcon size={60} className="dd-cta-logo" />
        <h2>Detailed Due Diligence Reports</h2>
        <p>Explore individual venture analysis</p>
        <div className="dd-cta-grid">
          <Link to="/due-diligence/yqa" className="dd-cta-btn">🧪 Y-QA (R22M)</Link>
          <Link to="/due-diligence/qproteus" className="dd-cta-btn">⚛️ QProteus</Link>
          <Link to="/due-diligence/qyvella" className="dd-cta-btn">🤖 Qyvella</Link>
          <Link to="/due-diligence/boaz" className="dd-cta-btn">📊 Boaz Holdings</Link>
          <Link to="/due-diligence/rigelaz" className="dd-cta-btn">💼 Rigelaz Holdings</Link>
        </div>
        <div className="dd-contact-info">
          <p><strong>JP van Zyl</strong> — Founder</p>
          <p>📧 jp@yellow-mantis.com • 📱 +27 76 486 3294</p>
        </div>
      </section>

      {/* Legend */}
      <div className="dd-legend">
        <div className="dd-legend-item">
          <span className="dd-legend-dot" style={{ background: '#3498db' }}></span>
          Flagship (Production Ready)
        </div>
        <div className="dd-legend-item">
          <span className="dd-legend-dot" style={{ background: '#9b59b6' }}></span>
          Research/Alpha
        </div>
        <div className="dd-legend-item">
          <span className="dd-legend-dot" style={{ background: '#e74c3c' }}></span>
          Final R&amp;D
        </div>
        <div className="dd-legend-item">
          <span className="dd-legend-dot" style={{ background: '#1abc9c' }}></span>
          Joint Venture
        </div>
        <div className="dd-legend-item">
          <span className="dd-legend-dot" style={{ background: '#27ae60' }}></span>
          Operational/Production
        </div>
      </div>

      {/* Modal */}
      {selectedVenture && getVentureData() && (
        <div className="dd-modal-overlay" onClick={closeModal}>
          <div className="dd-modal" onClick={(e) => e.stopPropagation()}>
            <div 
              className="dd-modal-header"
              style={{ background: getVentureData().color }}
            >
              <div className="dd-modal-icon">{getVentureData().icon}</div>
              <div className="dd-modal-title-section">
                <span className="dd-modal-status">{getVentureData().status}</span>
                <h2>{getVentureData().name}</h2>
              </div>
              <button className="dd-modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="dd-modal-body">
              <div className="dd-modal-section">
                <h4>💰 Valuation</h4>
                <div className="dd-modal-valuation">
                  <span className="dd-modal-val-amount">{getVentureData().valuation}</span>
                  <span className="dd-modal-val-note">{getVentureData().valuationNote}</span>
                </div>
              </div>
              <div className="dd-modal-section">
                <h4>📊 Key Metrics</h4>
                <ul className="dd-modal-metrics">
                  {getVentureData().keyMetrics.map((metric, i) => (
                    <li key={i}>{metric}</li>
                  ))}
                </ul>
              </div>
              <div className="dd-modal-section">
                <h4>🏆 Competitive Advantage</h4>
                <p>{getVentureData().competitiveAdvantage}</p>
              </div>
            </div>
            <div className="dd-modal-footer">
              <button className="dd-modal-btn secondary" onClick={closeModal}>Close</button>
              <Link to={getVentureData().link} className="dd-modal-btn primary">
                Full Due Diligence →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="dd-footer">
        <p>
          <strong>Yellow Mantis</strong> — Technology Investment Group<br />
          <span className="dd-footer-tagline">Building the future of technology</span>
        </p>
      </footer>
    </div>
  );
};

export default DueDiligenceSummary;
