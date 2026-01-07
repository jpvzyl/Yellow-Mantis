import React, { useState } from 'react';
import MantisIcon from '../components/MantisIcon';
import './Organogram.css';

const Organogram = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);

  const companies = {
    sarfat: {
      id: 'sarfat',
      name: 'SARFAT HOLDINGS',
      type: 'holding',
      shortDesc: 'Primary Holding Company',
      shareholding: [
        { name: 'JP van Zyl', percent: '100%' }
      ],
      color: '#F2D974',
      summary: `SARFAT Holdings is the primary investment vehicle overseeing a diverse portfolio of technology ventures. Our subsidiaries span AI-powered quality assurance (Y-QA), development consulting (Yellow Mantis), robotics (Qyvella), quantum computing research (QProteus), and autonomous financial systems (Boaz Holdings). Together, these companies represent a comprehensive technology ecosystem positioned for significant growth.`,
      capabilities: [
        'Strategic investment and capital allocation',
        'Portfolio company governance and oversight',
        'Intellectual property management',
        'Cross-venture synergy coordination',
        'Long-term vision and direction setting'
      ],
      icon: '🏛️'
    },
    yqa: {
      id: 'yqa',
      name: 'Y-QA',
      type: 'subsidiary',
      shortDesc: 'AI-Powered Quality Assurance',
      shareholding: [
        { name: 'SARFAT HOLDINGS', percent: '51%' },
        { name: 'JP van Zyl', percent: '49%' }
      ],
      color: '#3498db',
      summary: `Y-QA is revolutionising the quality assurance industry through artificial intelligence. Built on Ruby on Rails with a modern React frontend, Y-QA uses AI to automate test generation, execution, and analysis - reducing QA time by up to 70% while improving coverage and reliability.`,
      capabilities: [
        'AI-powered test case generation',
        'Automated regression testing',
        'Visual UI testing with AI comparison',
        'Performance monitoring and alerting',
        'CI/CD pipeline integration',
        'Real-time quality dashboards',
        'Natural language test specifications'
      ],
      tech: ['Ruby on Rails', 'React', 'PostgreSQL', 'Docker', 'AI/ML'],
      status: 'Rollout Q1 2026',
      valuation: 'R15M',
      icon: '🔬'
    },
    yellowmantis: {
      id: 'yellowmantis',
      name: 'YELLOW MANTIS',
      type: 'subsidiary',
      shortDesc: 'Dev & Consulting • POCs • AI Certification',
      shareholding: [
        { name: 'SARFAT HOLDINGS', percent: '51%' },
        { name: 'JP van Zyl', percent: '49%' }
      ],
      color: '#27ae60',
      summary: `Yellow Mantis is a boutique development and consulting firm specialising in rapid proof-of-concept development and AI certification services. We help enterprises validate ideas quickly and ensure their AI implementations meet emerging regulatory standards.`,
      capabilities: [
        'Rapid POC development (2-4 weeks)',
        'AI certification and compliance auditing',
        'Technical due diligence for investors',
        'Architecture consulting and review',
        'Full-stack development (Ruby, React, Python)',
        'Salesforce integration and consulting',
        'AI/ML implementation services'
      ],
      tech: ['Ruby on Rails', 'React', 'Python', 'Salesforce', 'AWS'],
      status: 'Active',
      icon: '🦗'
    },
    qyvella: {
      id: 'qyvella',
      name: 'QYVELLA',
      type: 'subsidiary',
      shortDesc: 'Robotics & AI Development',
      shareholding: [
        { name: 'SARFAT HOLDINGS', percent: '51%' },
        { name: 'JP van Zyl', percent: '49%' }
      ],
      color: '#e74c3c',
      summary: `Qyvella is pioneering affordable AI robotics for education and personal use. We're developing modular robotic platforms that make robotics accessible to everyone - from hobbyists to educational institutions.`,
      capabilities: [
        'Modular robotic arm systems',
        'AI-powered motion control',
        'Computer vision integration',
        'Educational robotics kits',
        'Web-based control interfaces',
        'Voice command integration',
        'Machine learning for adaptive grasping'
      ],
      tech: ['Python', 'Raspberry Pi', 'Flask', 'React', 'TensorFlow'],
      status: 'Final R&D',
      valuation: 'R5M - R7.5M',
      icon: '🤖'
    },
    qproteus: {
      id: 'qproteus',
      name: 'QPROTEUS',
      type: 'subsidiary',
      shortDesc: 'Quantum Computing Research & Development',
      shareholding: [
        { name: 'SARFAT HOLDINGS', percent: '51%' },
        { name: 'JP van Zyl', percent: '49%' }
      ],
      color: '#9b59b6',
      summary: `QProteus is building the bridge between classical software and quantum computing. Our Quantum Bridge framework makes quantum acceleration accessible to any developer through simple API calls.`,
      capabilities: [
        'Quantum-classical bridge API',
        'QUBO/Ising problem optimisation',
        'AWS Braket and D-Wave integration',
        'Classical fallback guarantees',
        'Budget management for quantum costs',
        'Route optimisation (TSP)',
        'Portfolio optimisation',
        'Quantum machine learning research'
      ],
      tech: ['Python', 'AWS Braket', 'D-Wave', 'IBM Quantum', 'FastAPI'],
      status: 'Research/Alpha',
      valuation: 'R7.5M - R12.5M',
      icon: '⚛️'
    },
    boaz: {
      id: 'boaz',
      name: 'BOAZ HOLDINGS',
      type: 'joint',
      shortDesc: 'AI-Driven Accounting Software',
      shareholding: [
        { name: 'SARFAT HOLDINGS', percent: '50%' },
        { name: 'Private Partner', percent: '50%' }
      ],
      color: '#1abc9c',
      summary: `Boaz Holdings is a joint venture developing Y-Accounting - the world's first autonomous financial management system. Our AI agents provide CFO-level strategic planning, 95% accurate forecasting, and predictive compliance monitoring.`,
      capabilities: [
        'Autonomous AI financial agents',
        '95% forecasting accuracy',
        '6-month compliance early warnings',
        'Multi-modal document processing',
        'Real-time market intelligence',
        'Autonomous supplier negotiations',
        'Blockchain audit trails',
        'Quantum-resistant security'
      ],
      tech: ['Python', 'FastAPI', 'React', 'PyTorch', 'LangChain', 'PostgreSQL'],
      status: 'Development',
      valuation: 'R2.5M - R5M (50% ownership)',
      icon: '📊'
    }
  };

  const closeModal = () => setSelectedCompany(null);

  const getCompanyData = () => companies[selectedCompany];

  return (
    <div className="organogram-page">
      {/* Hero Section */}
      <div className="organogram-hero">
        <div className="organogram-hero-bg"></div>
        <MantisIcon size={60} className="organogram-hero-logo" />
        <h1>SARFAT Group Structure</h1>
        <p className="organogram-subtitle">Investment Holdings & Technology Ventures</p>
      </div>

      {/* Organogram Container */}
      <div className="organogram-container">
        {/* Top Level - Holding Company */}
        <div className="org-level org-level-top">
          <div 
            className="org-card org-card-holding"
            onClick={() => setSelectedCompany('sarfat')}
            style={{ '--card-color': companies.sarfat.color }}
          >
            <div className="org-card-icon">{companies.sarfat.icon}</div>
            <div className="org-card-header">
              <span className="org-card-type">HOLDING COMPANY</span>
            </div>
            <h3 className="org-card-name">{companies.sarfat.name}</h3>
            <p className="org-card-desc">{companies.sarfat.shortDesc}</p>
            <div className="org-card-shareholding">
              {companies.sarfat.shareholding.map((s, i) => (
                <span key={i} className="shareholder-badge">
                  {s.name}: {s.percent}
                </span>
              ))}
            </div>
            <div className="org-card-cta">Click for details →</div>
          </div>
        </div>

        {/* Connection Lines */}
        <div className="org-connector-section">
          <div className="org-vertical-line"></div>
          <div className="org-horizontal-line"></div>
          <div className="org-drop-lines">
            <div className="org-drop-line"></div>
            <div className="org-drop-line"></div>
            <div className="org-drop-line"></div>
            <div className="org-drop-line"></div>
            <div className="org-drop-line"></div>
          </div>
        </div>

        {/* Subsidiaries Level */}
        <div className="org-level org-level-subsidiaries">
          {['yqa', 'yellowmantis', 'qyvella', 'qproteus', 'boaz'].map((key) => {
            const company = companies[key];
            return (
              <div 
                key={key}
                className={`org-card org-card-${company.type}`}
                onClick={() => setSelectedCompany(key)}
                style={{ '--card-color': company.color }}
              >
                <div className="org-card-icon">{company.icon}</div>
                <div className="org-card-header">
                  <span className="org-card-type">
                    {company.type === 'joint' ? 'JOINT VENTURE' : 'SUBSIDIARY'}
                  </span>
                </div>
                <h3 className="org-card-name">{company.name}</h3>
                <p className="org-card-desc">{company.shortDesc}</p>
                <div className="org-card-shareholding">
                  {company.shareholding.map((s, i) => (
                    <span key={i} className="shareholder-badge">
                      {s.name}: {s.percent}
                    </span>
                  ))}
                </div>
                {company.status && (
                  <div className="org-card-status">
                    <span className={`status-indicator ${company.status.includes('Active') ? 'active' : ''}`}></span>
                    {company.status}
                  </div>
                )}
                <div className="org-card-cta">Click for details →</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="organogram-legend">
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#F2D974' }}></span>
          Holding Company
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#3498db' }}></span>
          Subsidiary (51% Sarfat / 49% JP)
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#1abc9c' }}></span>
          Joint Venture (50/50)
        </div>
      </div>

      {/* Company Detail Modal */}
      {selectedCompany && getCompanyData() && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="company-modal" onClick={(e) => e.stopPropagation()}>
            <div 
              className="modal-header"
              style={{ background: getCompanyData().color }}
            >
              <div className="modal-icon">{getCompanyData().icon}</div>
              <div className="modal-title-section">
                <span className="modal-type">
                  {getCompanyData().type === 'holding' ? 'HOLDING COMPANY' : 
                   getCompanyData().type === 'joint' ? 'JOINT VENTURE' : 'SUBSIDIARY'}
                </span>
                <h2 className="modal-title">{getCompanyData().name}</h2>
              </div>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>

            <div className="modal-body">
              {/* Shareholding */}
              <div className="modal-section">
                <h4>📊 Shareholding Structure</h4>
                <div className="shareholding-grid">
                  {getCompanyData().shareholding.map((s, i) => (
                    <div key={i} className="shareholding-item">
                      <span className="sh-name">{s.name}</span>
                      <span className="sh-percent">{s.percent}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="modal-section">
                <h4>📝 About</h4>
                <p className="modal-summary">{getCompanyData().summary}</p>
              </div>

              {/* Capabilities */}
              <div className="modal-section">
                <h4>⚡ Capabilities</h4>
                <ul className="capabilities-list">
                  {getCompanyData().capabilities.map((cap, i) => (
                    <li key={i}>{cap}</li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              {getCompanyData().tech && (
                <div className="modal-section">
                  <h4>🛠️ Technology Stack</h4>
                  <div className="tech-tags">
                    {getCompanyData().tech.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Status & Valuation */}
              {(getCompanyData().status || getCompanyData().valuation) && (
                <div className="modal-section modal-section-stats">
                  {getCompanyData().status && (
                    <div className="stat-box">
                      <span className="stat-label">Status</span>
                      <span className="stat-value">{getCompanyData().status}</span>
                    </div>
                  )}
                  {getCompanyData().valuation && (
                    <div className="stat-box">
                      <span className="stat-label">Valuation</span>
                      <span className="stat-value">{getCompanyData().valuation}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="organogram-footer">
        <p>
          <strong>SARFAT Holdings</strong> — Technology Investment Group<br />
          <span className="footer-tagline">Building the future of technology</span>
        </p>
      </footer>
    </div>
  );
};

export default Organogram;

