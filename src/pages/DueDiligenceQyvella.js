import React from 'react';
import { Link } from 'react-router-dom';
import './DueDiligence.css';

function DueDiligenceQyvella() {
  return (
    <div className="dd-page">
      {/* Hero Section */}
      <section className="dd-hero" style={{ '--dd-accent': '#e74c3c' }}>
        <div className="dd-hero-bg"></div>
        <div className="dd-hero-badge">TECH DUE DILIGENCE</div>
        <div className="dd-hero-icon">🤖</div>
        <h1>Qyvella Robotics</h1>
        <p className="dd-hero-tagline">AI-Powered Robotics for Everyone</p>
        <div className="dd-hero-valuation">
          <span className="dd-val-label">IP Valuation Range</span>
          <span className="dd-val-amount">R5,000,000 - R7,500,000</span>
          <span className="dd-val-basis">(Based on hardware + AI integration value)</span>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="dd-section">
        <h2>📋 Executive Summary</h2>
        <div className="dd-summary-grid">
          <div className="dd-summary-card">
            <span className="dd-summary-icon">🔧</span>
            <h4>Development Stage</h4>
            <p>Final R&amp;D - Hardware Testing</p>
          </div>
          <div className="dd-summary-card">
            <span className="dd-summary-icon">🦾</span>
            <h4>Hardware Components</h4>
            <p>4-DOF Arm + 6-DOF AI Head</p>
          </div>
          <div className="dd-summary-card">
            <span className="dd-summary-icon">🧠</span>
            <h4>AI Integration</h4>
            <p>Claude Sonnet 4 + Voice</p>
          </div>
          <div className="dd-summary-card">
            <span className="dd-summary-icon">💰</span>
            <h4>Unit Cost</h4>
            <p>~R5,000 ($275) per unit</p>
          </div>
        </div>
      </section>

      {/* Product Architecture */}
      <section className="dd-section dd-section-dark">
        <h2>🏗️ Three-Tier Platform Architecture</h2>
        <div className="dd-architecture-grid">
          <div className="dd-arch-layer">
            <div className="dd-arch-icon">🔧</div>
            <h4>Hardware Layer</h4>
            <ul>
              <li>4-DOF Robotic Arm (MG996R servos)</li>
              <li>6-DOF AI Head with articulation</li>
              <li>Dual OLED Eye Displays</li>
              <li>USB Microphone + Speaker</li>
              <li>Pi Camera V2 for vision</li>
              <li>3D printable components</li>
              <li>PCA9685 PWM Controller</li>
            </ul>
          </div>
          <div className="dd-arch-layer">
            <div className="dd-arch-icon">💻</div>
            <h4>Software Layer</h4>
            <ul>
              <li>Django 5.0 Command Center</li>
              <li>WebSocket Real-Time Control</li>
              <li>Inverse Kinematics Solver</li>
              <li>Movement Recording/Playback</li>
              <li>Preset Management System</li>
              <li>Hardware Abstraction Layer</li>
              <li>Simulation Mode for Dev</li>
            </ul>
          </div>
          <div className="dd-arch-layer highlight">
            <div className="dd-arch-icon">🧠</div>
            <h4>AI Layer (Claude Integration)</h4>
            <ul>
              <li>Natural Language Control</li>
              <li>Function/Tool Calling for Hardware</li>
              <li>5 AI Personality Modes</li>
              <li>Voice Commands (Google Speech)</li>
              <li>Emotion Detection &amp; Expression</li>
              <li>Text-to-Speech (gTTS)</li>
              <li>Streaming Responses</li>
            </ul>
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
              <span className="dd-pill primary">Django 5.0</span>
              <span className="dd-pill">Python 3.11+</span>
              <span className="dd-pill">Django Channels (WebSocket)</span>
              <span className="dd-pill">SQLite/PostgreSQL</span>
            </div>
          </div>
          <div className="dd-tech-category">
            <h4>Hardware Control</h4>
            <div className="dd-tech-pills">
              <span className="dd-pill">Raspberry Pi 4/5</span>
              <span className="dd-pill">Adafruit PCA9685</span>
              <span className="dd-pill">ServoKit Library</span>
              <span className="dd-pill">I2C Protocol</span>
            </div>
          </div>
          <div className="dd-tech-category">
            <h4>AI Integration</h4>
            <div className="dd-tech-pills">
              <span className="dd-pill highlight">Claude Sonnet 4</span>
              <span className="dd-pill highlight">Claude Opus 4</span>
              <span className="dd-pill">Google Speech Recognition</span>
              <span className="dd-pill">gTTS Text-to-Speech</span>
            </div>
          </div>
          <div className="dd-tech-category">
            <h4>Vision &amp; Rendering</h4>
            <div className="dd-tech-pills">
              <span className="dd-pill">OpenCV</span>
              <span className="dd-pill">Godot Engine (3D)</span>
              <span className="dd-pill">Blender (Modeling)</span>
              <span className="dd-pill">OLED SSD1306</span>
            </div>
          </div>
        </div>
      </section>

      {/* AI Capabilities */}
      <section className="dd-section dd-section-dark">
        <h2>🧠 AI Capabilities Matrix</h2>
        <div className="dd-capabilities-table-wrapper">
          <table className="dd-capabilities-table">
            <thead>
              <tr>
                <th>Capability</th>
                <th>Technology</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Conversation</td>
                <td>Claude API</td>
                <td className="status-production">✅ Production</td>
              </tr>
              <tr>
                <td>Voice Commands</td>
                <td>Google Speech API</td>
                <td className="status-production">✅ Production</td>
              </tr>
              <tr>
                <td>Text-to-Speech</td>
                <td>gTTS + pygame</td>
                <td className="status-production">✅ Production</td>
              </tr>
              <tr>
                <td>Robot Control</td>
                <td>Tool Use / Function Calling</td>
                <td className="status-production">✅ Production</td>
              </tr>
              <tr>
                <td>Emotion Detection</td>
                <td>Claude Vision</td>
                <td className="status-beta">🔄 Beta</td>
              </tr>
              <tr>
                <td>Face Tracking</td>
                <td>OpenCV</td>
                <td className="status-dev">⚙️ Development</td>
              </tr>
              <tr>
                <td>Object Detection</td>
                <td>YOLOv8</td>
                <td className="status-planned">📋 Planned</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Development Progress */}
      <section className="dd-section">
        <h2>📊 Development Progress</h2>
        <div className="dd-progress-grid">
          <div className="dd-progress-item">
            <div className="dd-progress-header">
              <span>Robotic Arm</span>
              <span className="dd-progress-percent">100%</span>
            </div>
            <div className="dd-progress-bar">
              <div className="dd-progress-fill" style={{width: '100%'}}></div>
            </div>
            <p>Complete: Mechanical, servo control, IK solver, web interface, pick-and-place</p>
          </div>
          <div className="dd-progress-item">
            <div className="dd-progress-header">
              <span>AI Head</span>
              <span className="dd-progress-percent">75%</span>
            </div>
            <div className="dd-progress-bar">
              <div className="dd-progress-fill" style={{width: '75%'}}></div>
            </div>
            <p>Complete: Expression system, voice recognition, Claude integration, personalities</p>
          </div>
          <div className="dd-progress-item">
            <div className="dd-progress-header">
              <span>Command Center</span>
              <span className="dd-progress-percent">85%</span>
            </div>
            <div className="dd-progress-bar">
              <div className="dd-progress-fill" style={{width: '85%'}}></div>
            </div>
            <p>Complete: Django backend, WebSocket, build guide, parts tracking</p>
          </div>
          <div className="dd-progress-item">
            <div className="dd-progress-header">
              <span>AI Integration</span>
              <span className="dd-progress-percent">100%</span>
            </div>
            <div className="dd-progress-bar">
              <div className="dd-progress-fill" style={{width: '100%'}}></div>
            </div>
            <p>Complete: Claude client, tool calling, streaming, 5 personalities, emotion</p>
          </div>
        </div>
      </section>

      {/* Competitive Analysis */}
      <section className="dd-section dd-section-dark">
        <h2>🏆 Competitive Advantage Analysis</h2>
        <div className="dd-comparison-table-wrapper">
          <table className="dd-comparison-table">
            <thead>
              <tr>
                <th>Factor</th>
                <th className="competitor">VEX/LEGO</th>
                <th className="competitor">Universal Robots</th>
                <th className="us">Qyvella Robotics</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Price Point</td>
                <td className="competitor">$200-$600</td>
                <td className="competitor">$20,000+</td>
                <td className="us">✅ $300-$5,000</td>
              </tr>
              <tr>
                <td>AI Integration</td>
                <td className="competitor">❌ None</td>
                <td className="competitor">⚠️ Basic</td>
                <td className="us">✅ Native Claude AI</td>
              </tr>
              <tr>
                <td>Voice Control</td>
                <td className="competitor">❌ No</td>
                <td className="competitor">⚠️ Limited</td>
                <td className="us">✅ Full NLP</td>
              </tr>
              <tr>
                <td>Programming</td>
                <td className="competitor">Block-based</td>
                <td className="competitor">URScript</td>
                <td className="us">✅ Python + AI</td>
              </tr>
              <tr>
                <td>Personality/Emotion</td>
                <td className="competitor">❌ No</td>
                <td className="competitor">❌ No</td>
                <td className="us">✅ 5 AI Personalities</td>
              </tr>
              <tr>
                <td>Open Source</td>
                <td className="competitor">❌ No</td>
                <td className="competitor">❌ No</td>
                <td className="us">✅ Core Platform</td>
              </tr>
              <tr>
                <td>Maker Friendly</td>
                <td className="competitor">✅ Yes</td>
                <td className="competitor">❌ No</td>
                <td className="us">✅ 3D Printable</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Market Analysis */}
      <section className="dd-section">
        <h2>📈 Market Position &amp; Size</h2>
        <div className="dd-market-grid">
          <div className="dd-market-card">
            <h4>AI-Integrated Personal Robotics</h4>
            <div className="dd-market-stat">
              <span className="dd-stat-value">$4.8B</span>
              <span className="dd-stat-label">Global Market (USD)</span>
            </div>
            <p>Growing segment with AI adoption acceleration</p>
          </div>
          <div className="dd-market-card">
            <h4>Educational Robotics (AI)</h4>
            <div className="dd-market-stat">
              <span className="dd-stat-value">$1.1B</span>
              <span className="dd-stat-label">AI Curriculum Segment</span>
            </div>
            <p>STEM mandates driving institutional adoption</p>
          </div>
          <div className="dd-market-card">
            <h4>DIY/Maker Market</h4>
            <div className="dd-market-stat">
              <span className="dd-stat-value">$2.4B</span>
              <span className="dd-stat-label">Global Maker Economy</span>
            </div>
            <p>20M+ active hobbyists worldwide</p>
          </div>
          <div className="dd-market-card highlight">
            <h4>Unique Position</h4>
            <div className="dd-market-stat">
              <span className="dd-stat-value">FIRST</span>
              <span className="dd-stat-label">AI-Native Affordable Robotics</span>
            </div>
            <p>"Raspberry Pi of AI Robotics"</p>
          </div>
        </div>
      </section>

      {/* IP Valuation */}
      <section className="dd-section dd-section-dark">
        <h2>💰 IP Valuation Analysis</h2>
        <div className="dd-valuation-breakdown">
          <div className="dd-val-header">
            <span className="dd-val-total">R5,000,000 - R7,500,000</span>
            <span className="dd-val-basis-text">Based on hardware development stage &amp; AI integration value</span>
          </div>
          
          <div className="dd-val-components">
            <div className="dd-val-item">
              <div className="dd-val-item-header">
                <span className="dd-val-item-name">AI Integration Layer (Claude)</span>
                <span className="dd-val-item-amount">R2,500,000</span>
              </div>
              <p>Tool calling, personalities, voice control, emotion detection</p>
              <div className="dd-val-bar"><div className="dd-val-fill" style={{width: '35%'}}></div></div>
            </div>
            
            <div className="dd-val-item">
              <div className="dd-val-item-header">
                <span className="dd-val-item-name">Command Center Platform</span>
                <span className="dd-val-item-amount">R1,500,000</span>
              </div>
              <p>Django backend, WebSocket control, recording/playback, presets</p>
              <div className="dd-val-bar"><div className="dd-val-fill" style={{width: '21%'}}></div></div>
            </div>
            
            <div className="dd-val-item">
              <div className="dd-val-item-header">
                <span className="dd-val-item-name">Hardware Designs &amp; IK Solver</span>
                <span className="dd-val-item-amount">R1,500,000</span>
              </div>
              <p>3D printable designs, inverse kinematics, servo control</p>
              <div className="dd-val-bar"><div className="dd-val-fill" style={{width: '21%'}}></div></div>
            </div>
            
            <div className="dd-val-item">
              <div className="dd-val-item-header">
                <span className="dd-val-item-name">Educational Curriculum &amp; Docs</span>
                <span className="dd-val-item-amount">R1,000,000</span>
              </div>
              <p>Build guides, tutorials, assembly documentation</p>
              <div className="dd-val-bar"><div className="dd-val-fill" style={{width: '14%'}}></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="dd-section">
        <h2>💼 Revenue Model</h2>
        <div className="dd-revenue-grid">
          <div className="dd-revenue-card">
            <div className="dd-revenue-percent">40%</div>
            <h4>Hardware Kits</h4>
            <ul>
              <li>Starter Kit: R5,500 ($299)</li>
              <li>Pro Kit: R14,700 ($799)</li>
              <li>Enterprise: R46,000 ($2,499)</li>
            </ul>
          </div>
          <div className="dd-revenue-card">
            <div className="dd-revenue-percent">35%</div>
            <h4>SaaS Subscription</h4>
            <ul>
              <li>Free: Limited features</li>
              <li>Pro: R550/mo ($29)</li>
              <li>Team: R1,850/mo ($99)</li>
            </ul>
          </div>
          <div className="dd-revenue-card">
            <div className="dd-revenue-percent">20%</div>
            <h4>Education Licenses</h4>
            <ul>
              <li>Per-seat licensing</li>
              <li>Curriculum packages</li>
              <li>Teacher training</li>
            </ul>
          </div>
          <div className="dd-revenue-card">
            <div className="dd-revenue-percent">5%</div>
            <h4>Services</h4>
            <ul>
              <li>Custom development</li>
              <li>Integration services</li>
              <li>Enterprise support</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="dd-section dd-section-dark dd-summary-section">
        <h2>📊 Investment Summary</h2>
        <div className="dd-final-summary">
          <div className="dd-summary-highlights">
            <div className="dd-highlight-item">
              <span className="dd-highlight-icon">✅</span>
              <span>Working prototypes: 4-DOF arm + AI head</span>
            </div>
            <div className="dd-highlight-item">
              <span className="dd-highlight-icon">✅</span>
              <span>Full Claude AI integration with tool calling</span>
            </div>
            <div className="dd-highlight-item">
              <span className="dd-highlight-icon">✅</span>
              <span>Sub-$500 unit cost achievable</span>
            </div>
            <div className="dd-highlight-item">
              <span className="dd-highlight-icon">✅</span>
              <span>$8.3B addressable market</span>
            </div>
            <div className="dd-highlight-item">
              <span className="dd-highlight-icon">✅</span>
              <span>First-mover in AI-native affordable robotics</span>
            </div>
          </div>
          <div className="dd-valuation-box">
            <span className="dd-val-label">IP Valuation Range</span>
            <span className="dd-val-final">R5M - R7.5M</span>
            <span className="dd-val-status">Final R&amp;D Stage</span>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="dd-navigation">
        <Link to="/due-diligence/qproteus" className="dd-nav-btn">
          ← Previous: QProteus
        </Link>
        <Link to="/due-diligence/boaz" className="dd-nav-btn primary">
          Next: Boaz Holdings →
        </Link>
      </section>
    </div>
  );
}

export default DueDiligenceQyvella;
