import React from 'react';
import { Link } from 'react-router-dom';
import MantisIcon from '../components/MantisIcon';
import './PitchDeck.css';

function PitchDeck() {
  return (
    <div className="pitch-page">
      {/* Hero */}
      <section className="pitch-hero">
        <div className="pitch-hero-bg"></div>
        <MantisIcon size={100} className="pitch-hero-logo" />
        <h1>Investor Pitch Deck</h1>
        <p className="pitch-subtitle">Four Ventures. One Vision. Infinite Potential.</p>
      </section>

      {/* Portfolio Overview */}
      <section className="pitch-section">
        <h2>The Yellow Mantis Portfolio</h2>
        <div className="portfolio-overview">
          <a href="#quantum-bridge" className="portfolio-card clickable">
            <div className="portfolio-icon">🔮</div>
            <h3>Quantum Bridge</h3>
            <p className="portfolio-stage">Research</p>
            <p className="portfolio-market">Revolutionary Technology</p>
            <p>Bridging classical and quantum computing</p>
          </a>
          <a href="#qyvella-robotics" className="portfolio-card clickable">
            <div className="portfolio-icon">🤖</div>
            <h3>Qyvella Robotics</h3>
            <p className="portfolio-stage">Final R&D Stage</p>
            <p className="portfolio-market">Accessible Innovation</p>
            <p>AI-powered accessible robotics</p>
          </a>
          <a href="#faces-group" className="portfolio-card production clickable">
            <div className="portfolio-icon">📱</div>
            <h3>Faces Group</h3>
            <p className="portfolio-stage live">✓ Production</p>
            <p className="portfolio-market">60,000+ Athletes</p>
            <p>Race tracking & athlete platforms</p>
          </a>
          <a href="#y-accounting" className="portfolio-card clickable">
            <div className="portfolio-icon">💰</div>
            <h3>Y-Accounting</h3>
            <p className="portfolio-note">(In conjunction with a third party)</p>
            <p className="portfolio-stage">Rollout Q1 2026</p>
            <p className="portfolio-market">AI-Native Platform</p>
            <p>Autonomous financial management</p>
          </a>
          <a href="#y-qa" className="portfolio-card clickable">
            <div className="portfolio-icon">🧪</div>
            <h3>Y-QA</h3>
            <p className="portfolio-stage">Rollout Q1 2026</p>
            <p className="portfolio-market">Quantum-Powered</p>
            <p>AI test optimization</p>
          </a>
        </div>
      </section>

      {/* QUANTUM BRIDGE Deep Dive */}
      <section id="quantum-bridge" className="pitch-section venture-deep-dive quantum-section">
        <div className="venture-badge">VENTURE 1</div>
        <h2>🔮 Quantum Bridge</h2>
        <p className="venture-tagline">"Breaking the Impossible"</p>
        
        <div className="venture-content">
          <div className="venture-problem">
            <h3>The Problem</h3>
            <p>"Running software on quantum computers is impossible" — because quantum and classical architectures are fundamentally incompatible:</p>
            <ul>
              <li>No persistent memory (decoherence in microseconds)</li>
              <li>Measuring data destroys quantum states</li>
              <li>All operations must be reversible</li>
              <li>Error rates 1 million times higher than classical</li>
            </ul>
          </div>
          
          <div className="venture-solution">
            <h3>Our Solution: Three Paths</h3>
            <div className="paths-grid">
              <div className="path-card">
                <span className="path-difficulty">Achievable</span>
                <h4>Seamless API</h4>
                <p>@quantum_accelerate decorator makes quantum invisible to developers — like GPU acceleration</p>
              </div>
              <div className="path-card">
                <span className="path-difficulty novel">Novel</span>
                <h4>Quantum-Native Data Structures</h4>
                <p>QuantumSet, QuantumGraph, QuantumDatabase — new abstractions that exploit superposition</p>
              </div>
              <div className="path-card">
                <span className="path-difficulty research">Research</span>
                <h4>Reversible Compiler</h4>
                <p>Auto-compile classical code to quantum circuits using Bennett's reversible computing</p>
              </div>
            </div>
          </div>

          <div className="tech-architecture">
            <h3>Built Infrastructure</h3>
            <pre className="code-block">
{`quantum_bridge/
├── core/
│   ├── bridge.py          ✅ Main orchestration
│   ├── orchestrator.py    ✅ Task routing
│   ├── classifier.py      ✅ Problem classification
│   └── budget_manager.py  ✅ Cost tracking
├── encoders/
│   └── qubo_encoder.py    ✅ QUBO/Ising encoding
├── providers/
│   ├── local_simulator.py ✅ Local testing
│   └── aws_braket.py      ✅ AWS integration
├── api/
│   └── rest_api.py        ✅ FastAPI endpoints
└── integrations/
    └── rails_adapter.py   ✅ Y-QA integration`}
            </pre>
          </div>

          <div className="venture-traction">
            <h3>Hardware Access</h3>
            <div className="traction-grid">
              <div className="traction-item">
                <span className="traction-value">1 hr/mo</span>
                <span className="traction-label">AWS Braket QPU</span>
              </div>
              <div className="traction-item">
                <span className="traction-value">5,000+</span>
                <span className="traction-label">D-Wave Qubits</span>
              </div>
              <div className="traction-item">
                <span className="traction-value">∞</span>
                <span className="traction-label">Local Simulation</span>
              </div>
              <div className="traction-item">
                <span className="traction-value">√N</span>
                <span className="traction-label">Grover Speedup</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NOVA ROBOTICS Deep Dive */}
      <section id="qyvella-robotics" className="pitch-section venture-deep-dive robotics-section">
        <div className="venture-badge">VENTURE 2</div>
        <h2>🤖 Qyvella Robotics</h2>
        <p className="venture-tagline">"AI-Powered Robotics for Everyone"</p>
        
        <div className="venture-content">
          <div className="venture-problem">
            <h3>The Problem</h3>
            <ul>
              <li>Industrial robots: $50,000-$500,000+</li>
              <li>Requires specialized engineering teams</li>
              <li>AI and robotics are separate disciplines</li>
              <li>No clear path from learning to deployment</li>
            </ul>
          </div>
          
          <div className="venture-solution">
            <h3>The Qyvella Platform</h3>
            <div className="robotics-architecture">
              <div className="arch-layer">
                <h4>🔧 Hardware Layer</h4>
                <ul>
                  <li>4-DOF Robotic Arm (MG996R servos)</li>
                  <li>6-DOF AI Head with OLED eyes</li>
                  <li>USB mic + speaker for voice</li>
                  <li>Pi Camera V2 for vision</li>
                  <li>3D printable components</li>
                </ul>
              </div>
              <div className="arch-layer">
                <h4>💻 Software Layer</h4>
                <ul>
                  <li>Django 5.0 Command Center</li>
                  <li>WebSocket real-time control</li>
                  <li>Inverse Kinematics solver</li>
                  <li>Movement recording/playback</li>
                  <li>Preset management system</li>
                </ul>
              </div>
              <div className="arch-layer highlight">
                <h4>🧠 AI Layer (Claude Integration)</h4>
                <ul>
                  <li>Natural language control</li>
                  <li>Function/tool calling for hardware</li>
                  <li>5 AI personality modes</li>
                  <li>Voice commands (Google Speech)</li>
                  <li>Emotion detection & expression</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="venture-market">
            <h3>Market Opportunity</h3>
            <div className="market-breakdown">
              <div className="market-segment">
                <span className="segment-name">AI-Integrated Personal Robotics</span>
                <span className="segment-value">$4.8B</span>
              </div>
              <div className="market-segment">
                <span className="segment-name">Educational Robotics (AI Curriculum)</span>
                <span className="segment-value">$1.1B</span>
              </div>
              <div className="market-segment">
                <span className="segment-name">DIY/Maker Market</span>
                <span className="segment-value">$2.4B</span>
              </div>
            </div>
          </div>

          <div className="venture-traction">
            <h3>Development Status</h3>
            <div className="progress-bars">
              <div className="progress-item">
                <span className="progress-label">Robotic Arm</span>
                <div className="progress-bar"><div className="progress-fill" style={{width: '100%'}}></div></div>
                <span className="progress-percent">100%</span>
              </div>
              <div className="progress-item">
                <span className="progress-label">AI Head</span>
                <div className="progress-bar"><div className="progress-fill" style={{width: '75%'}}></div></div>
                <span className="progress-percent">75%</span>
              </div>
              <div className="progress-item">
                <span className="progress-label">Command Center</span>
                <div className="progress-bar"><div className="progress-fill" style={{width: '85%'}}></div></div>
                <span className="progress-percent">85%</span>
              </div>
              <div className="progress-item">
                <span className="progress-label">AI Integration</span>
                <div className="progress-bar"><div className="progress-fill" style={{width: '100%'}}></div></div>
                <span className="progress-percent">100%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FACES GROUP Deep Dive */}
      <section id="faces-group" className="pitch-section venture-deep-dive faces-section">
        <div className="venture-badge live">VENTURE 3 • LIVE</div>
        <h2>📱 Faces Group</h2>
        <p className="venture-tagline">"60,000+ Athletes. Production Proven."</p>
        
        <div className="venture-content">
          <div className="events-showcase">
            <h3>Events We Power</h3>
            <div className="events-grid">
              <div className="event-card">
                <span className="event-icon">🚴</span>
                <h4>947 Ride Joburg</h4>
                <p className="event-stats">15,000+ cyclists</p>
                <p>South Africa's premier cycling event</p>
              </div>
              <div className="event-card">
                <span className="event-icon">🏃</span>
                <h4>Cape Town Marathon</h4>
                <p className="event-stats">42,464 runners</p>
                <p>Africa's only World Major candidate</p>
              </div>
              <div className="event-card">
                <span className="event-icon">🏔️</span>
                <h4>Otter Trail Run</h4>
                <p className="event-stats">500 athletes</p>
                <p>Iconic trail running experience</p>
              </div>
              <div className="event-card">
                <span className="event-icon">🌲</span>
                <h4>TrailSeeker Series</h4>
                <p className="event-stats">1,000 athletes</p>
                <p>Multi-event trail series</p>
              </div>
            </div>
          </div>

          <div className="tech-stack-showcase">
            <h3>Technology Stack</h3>
            <div className="stack-diagram">
              <div className="stack-row">
                <div className="stack-item mobile">
                  <h5>📱 Mobile Apps</h5>
                  <p>React Native + Expo</p>
                  <ul>
                    <li>18 dashboard screens</li>
                    <li>GPS live tracking</li>
                    <li>30-35% battery (4hr race)</li>
                    <li>99% iOS reliability</li>
                  </ul>
                </div>
                <div className="stack-item web">
                  <h5>🌐 Web Portals</h5>
                  <p>React + Rails</p>
                  <ul>
                    <li>Ride Joburg Portal</li>
                    <li>CTM Standalone</li>
                    <li>White-label engine</li>
                    <li>ID/Passport auth</li>
                  </ul>
                </div>
                <div className="stack-item backend">
                  <h5>⚙️ Backend</h5>
                  <p>Ruby on Rails 7.1</p>
                  <ul>
                    <li>28+ API endpoints</li>
                    <li>&lt;10ms webhooks</li>
                    <li>Sidekiq queues</li>
                    <li>3-tier caching</li>
                  </ul>
                </div>
              </div>
              <div className="integrations-row">
                <span className="integration">Salesforce</span>
                <span className="integration">UltimateLive</span>
                <span className="integration">AWS S3</span>
                <span className="integration">Mapbox</span>
              </div>
            </div>
          </div>

          <div className="venture-traction">
            <h3>Production Metrics</h3>
            <div className="traction-grid">
              <div className="traction-item">
                <span className="traction-value">&lt;10ms</span>
                <span className="traction-label">Webhook Capture</span>
              </div>
              <div className="traction-item">
                <span className="traction-value">&lt;100ms</span>
                <span className="traction-label">API Response (cached)</span>
              </div>
              <div className="traction-item">
                <span className="traction-value">99.9%</span>
                <span className="traction-label">Uptime (12 months)</span>
              </div>
              <div className="traction-item">
                <span className="traction-value">50K+</span>
                <span className="traction-label">Lines of Code</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Y-Accounting Deep Dive */}
      <section id="y-accounting" className="pitch-section venture-deep-dive yqa-section">
        <div className="venture-badge">VENTURE 4</div>
        <h2>💰 Y-Accounting</h2>
        <p className="venture-note-centered">(In conjunction with a third party)</p>
        <span className="status-badge" style={{marginBottom: '20px', display: 'inline-block'}}>Rollout Q1 2026</span>
        <p className="venture-tagline">"AI-Driven Autonomous Financial Management"</p>
        
        <div className="venture-content">
          <div className="venture-problem">
            <h3>The Problem</h3>
            <p>Traditional accounting is broken: 82% of small businesses fail due to cash flow problems. CFOs spend 60% of time on routine tasks. Financial data is siloed and reactive, not proactive.</p>
          </div>
          
          <div className="venture-solution">
            <h3>Multi-Agent AI Ecosystem</h3>
            <p>Revolutionary AI-driven platform with collaborative agents working together:</p>
            <div className="ai-agents-diagram">
              <div className="agent-card">
                <span className="agent-icon">📄</span>
                <h4>Document Intelligence</h4>
                <p>Multi-modal processing (PDF, OCR, images)</p>
                <p className="agent-stat">94% accuracy</p>
              </div>
              <div className="agent-card">
                <span className="agent-icon">💰</span>
                <h4>Cash Flow Optimizer</h4>
                <p>Pattern analysis + scenario modeling</p>
                <p className="agent-stat">95%+ forecast accuracy</p>
              </div>
              <div className="agent-card">
                <span className="agent-icon">🎯</span>
                <h4>Financial Strategist</h4>
                <p>CFO-level insights + risk assessment</p>
                <p className="agent-stat">ROI projections</p>
              </div>
            </div>
          </div>

          <div className="tech-architecture">
            <h3>AI Service Layer</h3>
            <pre className="code-block">
{`# Multi-Provider AI Architecture
class AIService:
    def __init__(self):
        # Primary: OpenAI GPT-4 Turbo
        self.openai = AsyncOpenAI(api_key=OPENAI_KEY)
        # Secondary: Anthropic Claude 3
        self.anthropic = AsyncAnthropic(api_key=ANTHROPIC_KEY)
    
    async def analyze_document(self, doc):
        # AI extracts: amounts, dates, parties
        # Auto-classifies: invoice, receipt, contract
        # Generates: business implications, risk score
        return await self.chat_completion(messages)
    
    async def forecast_cash_flow(self, transactions):
        # Pattern analysis + seasonal trends
        # Multi-scenario: conservative, base, optimistic
        # 90-day predictions with confidence scores
        return forecasts, recommendations`}
            </pre>
          </div>

          <div className="quantum-connection">
            <h3>Data Processing Pipeline</h3>
            <div className="connection-diagram">
              <div className="conn-step">Document Upload</div>
              <div className="conn-arrow">→</div>
              <div className="conn-step">AI Extraction</div>
              <div className="conn-arrow">→</div>
              <div className="conn-step highlight">Multi-Agent Analysis</div>
              <div className="conn-arrow">→</div>
              <div className="conn-step">Actionable Insights</div>
            </div>
            <p className="connection-desc">Upload any financial document. AI extracts data, classifies content, and generates strategic recommendations automatically.</p>
          </div>

          <div className="venture-traction">
            <h3>Platform Capabilities</h3>
            <div className="traction-grid">
              <div className="traction-item">
                <span className="traction-value">95%+</span>
                <span className="traction-label">Forecast Accuracy</span>
              </div>
              <div className="traction-item">
                <span className="traction-value">&lt;3s</span>
                <span className="traction-label">Document Processing</span>
              </div>
              <div className="traction-item">
                <span className="traction-value">6-mo</span>
                <span className="traction-label">Predictive Compliance</span>
              </div>
              <div className="traction-item">
                <span className="traction-value">24/7</span>
                <span className="traction-label">Autonomous Operation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Y-QA Platform Deep Dive */}
      <section id="y-qa" className="pitch-section venture-deep-dive yqa-section">
        <div className="venture-badge">VENTURE 5</div>
        <h2>🧪 Y-QA Platform</h2>
        <span className="status-badge" style={{marginBottom: '20px', display: 'inline-block'}}>Rollout Q1 2026</span>
        <p className="venture-tagline">"Quantum-Powered Quality Assurance"</p>

        <div className="venture-content">
          <div className="tech-highlight">
            <h3>Revolutionary Testing Platform</h3>
            <p>The world's first QA platform combining AI test generation with quantum computing optimization. 75+ features built over 12 months of intensive development.</p>
          </div>

          <div className="venture-grid">
            <div className="venture-feature">
              <h4>🤖 AI-Powered Testing</h4>
              <ul>
                <li>Multi-LLM support (GPT-4, Claude 3.5)</li>
                <li>AI test case generation</li>
                <li>Self-healing test scripts</li>
                <li>Intelligent defect prediction</li>
              </ul>
            </div>
            <div className="venture-feature">
              <h4>⚛️ Quantum Optimization</h4>
              <ul>
                <li>D-Wave & IBM Quantum integration</li>
                <li>Test suite prioritization</li>
                <li>Multi-objective optimization</li>
                <li>Quantum annealing for scheduling</li>
              </ul>
            </div>
            <div className="venture-feature">
              <h4>🔄 Digital Twin</h4>
              <ul>
                <li>Application modeling</li>
                <li>Component relationship mapping</li>
                <li>Impact analysis for code changes</li>
                <li>Test recommendation engine</li>
              </ul>
            </div>
            <div className="venture-feature">
              <h4>🔗 Deep Integrations</h4>
              <ul>
                <li>GitHub real-time monitoring</li>
                <li>Playwright browser automation</li>
                <li>Visual regression testing</li>
                <li>CI/CD pipeline ready</li>
              </ul>
            </div>
          </div>

          <div className="quantum-connection">
            <h3>The Quantum Advantage</h3>
            <div className="connection-diagram">
              <div className="conn-step">Test Suite</div>
              <div className="conn-arrow">→</div>
              <div className="conn-step">AI Analysis</div>
              <div className="conn-arrow">→</div>
              <div className="conn-step highlight">Quantum Optimization</div>
              <div className="conn-arrow">→</div>
              <div className="conn-step">Optimal Execution</div>
            </div>
            <p className="connection-desc">Quantum computers solve the NP-hard test prioritization problem, reducing test time by up to 60% while maintaining coverage.</p>
          </div>

          <div className="venture-traction">
            <h3>Platform Metrics</h3>
            <div className="traction-grid">
              <div className="traction-item">
                <span className="traction-value">75+</span>
                <span className="traction-label">Features Built</span>
              </div>
              <div className="traction-item">
                <span className="traction-value">60%</span>
                <span className="traction-label">Test Time Reduction</span>
              </div>
              <div className="traction-item">
                <span className="traction-value">R15M</span>
                <span className="traction-label">IP Valuation</span>
              </div>
              <div className="traction-item">
                <span className="traction-value">12mo</span>
                <span className="traction-label">Development</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Excellence - from TECHNICAL_DEEP_DIVE.md & FULL_FEATURE_LIST.md */}
      <section className="pitch-section venture-deep-dive tech-excellence-section">
        <div className="venture-badge">TECHNICAL EXCELLENCE</div>
        <h2>🏗️ Production-Grade Architecture</h2>
        <p className="venture-tagline">Built for scale. Proven in production.</p>
        
        <div className="venture-content">
          <div className="tech-stack-full">
            <h3>Complete Technology Stack</h3>
            <div className="stack-categories">
              <div className="stack-cat">
                <h4>Languages</h4>
                <div className="tech-pills">
                  <span>Python 3.11</span>
                  <span>Ruby 3.2</span>
                  <span>TypeScript</span>
                  <span>JavaScript</span>
                </div>
              </div>
              <div className="stack-cat">
                <h4>Frameworks</h4>
                <div className="tech-pills">
                  <span>Ruby on Rails 7.1</span>
                  <span>Django 5.0</span>
                  <span>FastAPI</span>
                  <span>React 18</span>
                  <span>React Native + Expo</span>
                </div>
              </div>
              <div className="stack-cat">
                <h4>AI & Quantum</h4>
                <div className="tech-pills highlight">
                  <span>OpenAI GPT-4 Turbo</span>
                  <span>Anthropic Claude 3</span>
                  <span>AWS Braket</span>
                  <span>D-Wave</span>
                </div>
              </div>
              <div className="stack-cat">
                <h4>Infrastructure</h4>
                <div className="tech-pills">
                  <span>PostgreSQL</span>
                  <span>Redis</span>
                  <span>AWS S3</span>
                  <span>Heroku</span>
                  <span>Sidekiq</span>
                </div>
              </div>
            </div>
          </div>

          <div className="architecture-diagram">
            <h3>System Architecture</h3>
            <pre className="code-block">
{`┌─────────────────────────────────────────────────────────────────────┐
│                     YELLOW MANTIS PLATFORM                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    FRONTEND LAYER                            │   │
│  │  React 18 │ React Native │ TypeScript │ Expo                │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              │                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    API GATEWAY                               │   │
│  │  Rails 7.1 │ FastAPI │ Django 5.0 │ REST + WebSocket        │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              │                                       │
│  ┌───────────────────────────┼───────────────────────────┐         │
│  │                           │                           │         │
│  ▼                           ▼                           ▼         │
│  ┌─────────────┐    ┌─────────────────┐    ┌─────────────┐        │
│  │  AI AGENTS  │    │ QUANTUM BRIDGE  │    │  SERVICES   │        │
│  │ GPT-4/Claude│    │  AWS Braket     │    │ Salesforce  │        │
│  └─────────────┘    └─────────────────┘    └─────────────┘        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘`}
            </pre>
          </div>

          <div className="performance-metrics">
            <h3>Performance Benchmarks</h3>
            <div className="metrics-grid">
              <div className="metric-card">
                <span className="metric-value">&lt;10ms</span>
                <span className="metric-label">Webhook Processing</span>
              </div>
              <div className="metric-card">
                <span className="metric-value">&lt;100ms</span>
                <span className="metric-label">API Response (p95)</span>
              </div>
              <div className="metric-card">
                <span className="metric-value">&lt;3s</span>
                <span className="metric-label">Document Analysis</span>
              </div>
              <div className="metric-card">
                <span className="metric-value">99.9%</span>
                <span className="metric-label">Uptime (12mo)</span>
              </div>
              <div className="metric-card">
                <span className="metric-value">95%+</span>
                <span className="metric-label">Forecast Accuracy</span>
              </div>
              <div className="metric-card">
                <span className="metric-value">94%</span>
                <span className="metric-label">Document Classification</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantage - from INVESTOR_PITCH_DECK.md */}
      <section className="pitch-section venture-deep-dive competitive-section">
        <div className="venture-badge">WHY WE WIN</div>
        <h2>🏆 Competitive Advantage</h2>
        
        <div className="venture-content">
          <div className="advantage-grid">
            <div className="advantage-card">
              <div className="advantage-icon">🧠</div>
              <h4>AI-Native Architecture</h4>
              <p>Unlike competitors who bolt AI onto legacy systems, we built <strong>AI-first from day one</strong>. Multi-agent collaboration, not single-point automation.</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">⚛️</div>
              <h4>Quantum Integration</h4>
              <p>Only platform with <strong>real quantum hardware access</strong>. AWS Braket, D-Wave, IonQ — not simulations, actual QPUs for NP-hard optimization.</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">📱</div>
              <h4>Production Proven</h4>
              <p><strong>60,000+ athletes</strong> across premier events. Not a prototype — battle-tested technology handling real scale, real pressure.</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">🔧</div>
              <h4>Full-Stack Ownership</h4>
              <p>Hardware to cloud, mobile to quantum. <strong>100% IP ownership</strong>. No vendor lock-in, complete technical control.</p>
            </div>
          </div>

          <div className="comparison-table">
            <h3>How We Compare</h3>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Capability</th>
                    <th className="us">Yellow Mantis</th>
                    <th>Traditional Solutions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>AI Integration</td>
                    <td className="us">✅ Multi-Agent Ecosystem</td>
                    <td>❌ Basic / None</td>
                  </tr>
                  <tr>
                    <td>Quantum Computing</td>
                    <td className="us">✅ Real Hardware (AWS Braket)</td>
                    <td>❌ None</td>
                  </tr>
                  <tr>
                    <td>Forecasting Accuracy</td>
                    <td className="us">✅ 95%+</td>
                    <td>60-70%</td>
                  </tr>
                  <tr>
                    <td>Document Processing</td>
                    <td className="us">✅ Multi-modal AI</td>
                    <td>Basic OCR</td>
                  </tr>
                  <tr>
                    <td>Autonomous Operations</td>
                    <td className="us">✅ 24/7 AI Agents</td>
                    <td>❌ Manual</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Case Study - from PORTFOLIO_CASE_STUDY.md */}
      <section className="pitch-section venture-deep-dive case-study-section">
        <div className="venture-badge">CASE STUDY</div>
        <h2>📊 Development Portfolio</h2>
        <p className="venture-tagline">Real code. Real results. Real impact.</p>
        
        <div className="venture-content">
          <div className="case-highlights">
            <div className="case-card">
              <h4>🎯 Project Scope</h4>
              <ul>
                <li>4 major ventures built simultaneously</li>
                <li>Full-stack development: mobile, web, backend, AI, quantum</li>
                <li>Production deployment on Heroku + AWS</li>
                <li>Enterprise integrations (Salesforce, UltimateLive)</li>
              </ul>
            </div>
            <div className="case-card">
              <h4>📈 Key Achievements</h4>
              <ul>
                <li>Multi-agent AI system with 95%+ accuracy</li>
                <li>Quantum hardware integration (AWS Braket)</li>
                <li>60,000+ users in production</li>
                <li>React Native app with 99% iOS reliability</li>
              </ul>
            </div>
            <div className="case-card">
              <h4>🔧 Technical Milestones</h4>
              <ul>
                <li>50,000+ lines of production code</li>
                <li>28+ REST API endpoints</li>
                <li>&lt;10ms webhook processing</li>
                <li>3-tier caching architecture</li>
              </ul>
            </div>
          </div>

          <div className="code-showcase">
            <h3>Sample: AI Agent Implementation</h3>
            <pre className="code-block">
{`class DocumentIntelligenceAgent:
    """
    Multi-modal AI agent for document processing
    Capabilities: PDF, OCR, classification, risk scoring
    """
    
    async def process_document(self, document, company_id):
        # Step 1: Extract text (PDF, OCR, multi-format)
        extracted_text = await self._extract_text_from_file(...)
        
        # Step 2: AI analysis with GPT-4/Claude
        ai_analysis = await ai_service.analyze_document_content(
            extracted_text,
            model="gpt-4-turbo-preview"
        )
        # Returns: document_type, confidence, extracted_data,
        #          business_implications, risk_score
        
        # Step 3: Generate actionable recommendations
        return await self._create_recommendations(ai_analysis)`}
            </pre>
          </div>
        </div>
      </section>

      {/* Financial Summary */}
      <section className="pitch-section financials-section">
        <h2>Investment Opportunity</h2>
        
        <div className="funding-overview">
          <div className="funding-card">
            <h3>Use of Funds</h3>
            <div className="funding-breakdown">
              <div className="funding-item">
                <span className="funding-percent">45%</span>
                <span className="funding-use">Engineering & Product</span>
              </div>
              <div className="funding-item">
                <span className="funding-percent">20%</span>
                <span className="funding-use">Manufacturing & Supply Chain</span>
              </div>
              <div className="funding-item">
                <span className="funding-percent">20%</span>
                <span className="funding-use">Sales & Marketing</span>
              </div>
              <div className="funding-item">
                <span className="funding-percent">15%</span>
                <span className="funding-use">Operations & Overhead</span>
              </div>
            </div>
          </div>
          
          <div className="valuation-card">
            <h3>Investment Highlights</h3>
            <div className="terms-grid">
              <div className="term-item">
                <span className="term-label">Instrument</span>
                <span className="term-value">SAFE / Priced</span>
              </div>
              <div className="term-item">
                <span className="term-label">Target Runway</span>
                <span className="term-value">18-24 months</span>
              </div>
              <div className="term-item">
                <span className="term-label">IP Ownership</span>
                <span className="term-value">100%</span>
              </div>
              <div className="term-item">
                <span className="term-label">Stage</span>
                <span className="term-value">Seed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pitch-cta-section">
        <MantisIcon size={80} className="cta-logo" />
        <h2>Let's Build the Future</h2>
        <p>Four ventures. Proven execution. Ready to scale.</p>
        <div className="cta-buttons">
          <Link to="/full-features" className="cta-button primary">
            📋 Full Feature List
          </Link>
          <a href="mailto:jp@yellow-mantis.com" className="cta-button secondary">
            📧 Contact Us
          </a>
        </div>
        <div className="contact-info">
          <p><strong>JP van Zyl</strong> — Founder</p>
          <p>📧 jp@yellow-mantis.com • 📱 +27 76 486 3294</p>
        </div>
      </section>
    </div>
  );
}

export default PitchDeck;
