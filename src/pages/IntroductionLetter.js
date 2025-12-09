import React from 'react';
import { Link } from 'react-router-dom';
import MantisIcon from '../components/MantisIcon';
import './IntroductionLetter.css';

function IntroductionLetter() {
  return (
    <div className="intro-page">
      {/* Hero Section */}
      <section className="intro-hero">
        <div className="intro-hero-glow"></div>
        <MantisIcon size={120} className="intro-hero-logo" />
        <h1>Yellow Mantis</h1>
        <p className="intro-tagline">Technology That Breaks Boundaries</p>
        <p className="intro-subtitle">
          From quantum computing bridges to AI-powered robotics, from enterprise event platforms to revolutionary QA systems — we build what others call impossible.
        </p>
      </section>

      {/* The Vision */}
      <section className="intro-section">
        <h2>Our Vision</h2>
        <div className="vision-grid">
          <div className="vision-card">
            <span className="vision-icon">🔮</span>
            <h3>Quantum Computing</h3>
            <p>Bridging classical software with quantum hardware — making the "impossible" accessible to every developer.</p>
          </div>
          <div className="vision-card">
            <span className="vision-icon">🤖</span>
            <h3>AI Robotics</h3>
            <p>Bringing intelligent, voice-controlled robotics to education, makers, and enterprises at accessible price points.</p>
          </div>
          <div className="vision-card">
            <span className="vision-icon">📱</span>
            <h3>Race Tracking</h3>
            <p>Backend systems and mobile apps for live GPS tracking, results, and athlete data across cycling and road races.</p>
          </div>
          <div className="vision-card">
            <span className="vision-icon">🧪</span>
            <h3>AI Accounting</h3>
            <p>Autonomous financial management with 95%+ forecasting accuracy and multi-agent AI for CFO-level insights.</p>
          </div>
          <div className="vision-card">
            <div className="vision-icon">🧪</div>
            <h3>Quality Assurance</h3>
            <p>AI-powered test optimization using quantum algorithms to revolutionize software quality.</p>
          </div>
        </div>
      </section>

      {/* The Challenge We Solve */}
      <section className="intro-section dark-section">
        <h2>The Challenges We Solve</h2>
        <div className="challenges-container">
          <div className="challenge-item">
            <div className="challenge-before">
              <span className="challenge-label">BEFORE</span>
              <p>"Quantum computing is only for PhDs and billion-dollar labs"</p>
            </div>
            <div className="challenge-arrow">→</div>
            <div className="challenge-after">
              <span className="challenge-label">YELLOW MANTIS</span>
              <p>One decorator. Any Python code. Quantum acceleration invisible to developers.</p>
            </div>
          </div>
          <div className="challenge-item">
            <div className="challenge-before">
              <span className="challenge-label">BEFORE</span>
              <p>"AI robotics costs $50,000+ and requires specialized teams"</p>
            </div>
            <div className="challenge-arrow">→</div>
            <div className="challenge-after">
              <span className="challenge-label">YELLOW MANTIS</span>
              <p>Under $500. Voice control. Claude AI brain. Build it yourself in a weekend.</p>
            </div>
          </div>
          <div className="challenge-item">
            <div className="challenge-before">
              <span className="challenge-label">BEFORE</span>
              <p>"Race data is fragmented — timing, photos, results all separate"</p>
            </div>
            <div className="challenge-arrow">→</div>
            <div className="challenge-after">
              <span className="challenge-label">YELLOW MANTIS</span>
              <p>Complete athlete platform. Live GPS → Timing → Results → Photos → Mobile App.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Numbers */}
      <section className="intro-section">
        <h2>Proven Results</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <span className="metric-value">60,000+</span>
            <span className="metric-label">Event Participants Served</span>
          </div>
          <div className="metric-card">
            <span className="metric-value">&lt;10ms</span>
            <span className="metric-label">Webhook Processing Time</span>
          </div>
          <div className="metric-card">
            <span className="metric-value">99%</span>
            <span className="metric-label">iOS GPS Tracking Reliability</span>
          </div>
          <div className="metric-card">
            <span className="metric-value">√N</span>
            <span className="metric-label">Quantum Search Speedup</span>
          </div>
          <div className="metric-card">
            <span className="metric-value">5</span>
            <span className="metric-label">AI Personality Modes</span>
          </div>
          <div className="metric-card">
            <span className="metric-value">100%</span>
            <span className="metric-label">IP Ownership</span>
          </div>
        </div>
      </section>

      {/* Our Ventures */}
      <section className="intro-section dark-section">
        <h2>Our Ventures</h2>
        <div className="ventures-grid">
          <div className="venture-card quantum">
            <div className="venture-header">
              <span className="venture-icon">🔮</span>
              <h3>Quantum Bridge</h3>
              <span className="venture-status">Research & Development</span>
            </div>
            <p className="venture-tagline">"Breaking the Impossible"</p>
            <ul className="venture-features">
              <li>Seamless API for quantum acceleration</li>
              <li>QUBO encoding for optimization problems</li>
              <li>AWS Braket, D-Wave, IBM Quantum support</li>
              <li>Quantum-native data structures (novel)</li>
              <li>Auto-detection of quantum-suitable code</li>
            </ul>
            <div className="venture-tech">
              <span>Python</span>
              <span>FastAPI</span>
              <span>AWS Braket</span>
              <span>Qiskit</span>
            </div>
          </div>

          <div className="venture-card robotics">
            <div className="venture-header">
              <span className="venture-icon">🤖</span>
              <h3>Qyvella Robotics</h3>
              <span className="venture-status">Final R&D — Testing Soon</span>
            </div>
            <p className="venture-tagline">"AI Robotics for Everyone"</p>
            <ul className="venture-features">
              <li>4-DOF robotic arm with IK solver</li>
              <li>6-DOF AI head with OLED eyes</li>
              <li>Claude AI integration with tool calling</li>
              <li>Voice control & natural language</li>
              <li>5 AI personality modes</li>
            </ul>
            <div className="venture-tech">
              <span>Django</span>
              <span>Python</span>
              <span>Claude API</span>
              <span>Raspberry Pi</span>
            </div>
          </div>

          <div className="venture-card faces">
            <div className="venture-header">
              <span className="venture-icon">📱</span>
              <h3>Faces Group</h3>
              <span className="venture-status live">✓ Live in Production</span>
            </div>
            <p className="venture-tagline">"60,000+ Athletes Powered"</p>
            <ul className="venture-features">
              <li>947 Ride Joburg (15,000 cyclists)</li>
              <li>Cape Town Marathon (42,464 runners)</li>
              <li>React Native mobile app with GPS</li>
              <li>Salesforce + UltimateLive integration</li>
              <li>White-label event portals</li>
            </ul>
            <div className="venture-tech">
              <span>Rails</span>
              <span>React Native</span>
              <span>PostgreSQL</span>
              <span>Mapbox</span>
            </div>
          </div>

          <div className="venture-card yqa">
            <div className="venture-header">
              <span className="venture-icon">💰</span>
              <h3>Y-Accounting</h3>
              <span className="venture-note">(In conjunction with a third party)</span>
              <span className="venture-status">Rollout Q1 2026</span>
            </div>
            <p className="venture-tagline">"Autonomous Financial Intelligence"</p>
            <ul className="venture-features">
              <li>95%+ cash flow forecasting accuracy</li>
              <li>Multi-agent AI ecosystem</li>
              <li>Document Intelligence (OCR, PDF)</li>
              <li>CFO-level strategic insights</li>
              <li>Real-time financial dashboard</li>
            </ul>
            <div className="venture-tech">
              <span>FastAPI</span>
              <span>React</span>
              <span>PostgreSQL</span>
              <span>GPT-4</span>
              <span>Claude</span>
            </div>
          </div>

          <div className="venture-card yqa">
            <div className="venture-header">
              <span className="venture-icon">🧪</span>
              <h3>Y-QA</h3>
              <span className="venture-status">Rollout Q1 2026</span>
            </div>
            <p className="venture-tagline">"Quantum-Powered Testing"</p>
            <ul className="venture-features">
              <li>AI-powered test optimization</li>
              <li>Quantum Bridge integration</li>
              <li>Test suite selection via QUBO</li>
              <li>Coverage + Risk + Time weighting</li>
              <li>Enterprise dashboard</li>
            </ul>
            <div className="venture-tech">
              <span>Rails</span>
              <span>React</span>
              <span>PostgreSQL</span>
              <span>Quantum</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Now */}
      <section className="intro-section">
        <h2>Why Now?</h2>
        <div className="why-now-grid">
          <div className="why-now-card">
            <h3>🧠 AI Capabilities</h3>
            <p>Claude 3.5 Sonnet delivers best-in-class reasoning. Tool/function calling lets AI control hardware. Costs 90% cheaper than 2 years ago.</p>
          </div>
          <div className="why-now-card">
            <h3>⚛️ Quantum Accessibility</h3>
            <p>AWS Braket democratized access. D-Wave has 5,000+ qubits. IonQ achieves high fidelity. The hardware exists — we're building the bridge.</p>
          </div>
          <div className="why-now-card">
            <h3>🔧 Hardware Revolution</h3>
            <p>Raspberry Pi 5 delivers 3x performance. 3D printers under $200. Quality servos under $10. The maker movement is ready.</p>
          </div>
          <div className="why-now-card">
            <h3>📈 Market Demand</h3>
            <p>Developer interest in AI at all-time high. STEM education mandates globally. Labor shortages driving automation imperative.</p>
          </div>
        </div>
      </section>

      {/* The Team */}
      <section className="intro-section founder-section">
        <h2>Leadership</h2>
        <div className="founder-card">
          <div className="founder-info">
            <h3>JP van Zyl</h3>
            <p className="founder-title">Founder</p>
            <p className="founder-bio">
              Full-stack developer with 10+ years building enterprise platforms. 
              From Salesforce integrations to quantum computing research — 
              driven by the belief that the "impossible" is just the "not yet solved."
            </p>
            <div className="founder-links">
              <a href="mailto:jp@yellow-mantis.com">📧 jp@yellow-mantis.com</a>
              <a href="tel:+27764863294">📱 +27 76 486 3294</a>
              <a href="https://yellow-mantis.com">🌐 yellow-mantis.com</a>
            </div>
          </div>
          <div className="founder-quote">
            <blockquote>
              "I've spent a decade building software that solves real problems. 
              Now I'm building technology that changes what's possible."
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="intro-cta-section">
        <MantisIcon size={80} className="cta-logo" />
        <h2>Ready to See More?</h2>
        <p>Explore our complete pitch deck and full feature breakdown.</p>
        <div className="cta-buttons">
          <Link to="/pitch-deck" className="cta-button primary">
            📊 View Pitch Deck
          </Link>
          <Link to="/full-features" className="cta-button secondary">
            📋 Full Features
          </Link>
        </div>
      </section>
    </div>
  );
}

export default IntroductionLetter;
