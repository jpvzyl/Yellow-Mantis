import React, { useState } from 'react';
import MantisIcon from '../components/MantisIcon';
import './FullFeatures.css';

function FullFeatures() {
  const [activeTab, setActiveTab] = useState('quantum');

  const tabs = [
    { id: 'quantum', label: '🔮 Quantum Bridge', color: '#9b59b6' },
    { id: 'robotics', label: '🤖 Qyvella Robotics', color: '#e74c3c' },
    { id: 'faces', label: '📱 Faces Group', color: '#27ae60' },
    { id: 'accounting', label: '💰 Y-Accounting', color: '#f39c12' },
    { id: 'yqa', label: '🧪 Y-QA', color: '#3498db' },
  ];

  return (
    <div className="features-page">
      {/* Hero */}
      <section className="features-hero">
        <MantisIcon size={80} className="features-hero-logo" />
        <h1>Full Feature List</h1>
        <p>Deep technical breakdown across all Yellow Mantis Group ventures</p>
      </section>

      {/* Tab Navigation */}
      <div className="feature-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`feature-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            style={{ '--tab-color': tab.color }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Quantum Bridge Features */}
      {activeTab === 'quantum' && (
        <section className="feature-content">
          <div className="venture-header-bar quantum">
            <h2>🔮 Quantum Bridge</h2>
            <span className="status-badge">Research & Development</span>
          </div>

          <div className="feature-category">
            <h3>Core Framework</h3>
            <div className="feature-grid">
              <div className="feature-card">
                <h4>QuantumBridge Class</h4>
                <p>Main orchestration layer for quantum/classical routing</p>
                <ul>
                  <li>Problem classification (QUBO, MaxCut, TSP, Scheduling)</li>
                  <li>Provider abstraction (AWS, D-Wave, IBM, Local)</li>
                  <li>Automatic fallback to classical solvers</li>
                  <li>Budget management with cost tracking</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>QUBO Encoder</h4>
                <p>Convert optimization problems to quantum-ready format</p>
                <ul>
                  <li>Matrix generation from constraints</li>
                  <li>Penalty weight optimization</li>
                  <li>Ising model translation</li>
                  <li>Hardware-aware encoding</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>Provider Layer</h4>
                <p>Multi-hardware quantum access</p>
                <ul>
                  <li>AWS Braket (D-Wave, IonQ, Rigetti)</li>
                  <li>Local simulator for development</li>
                  <li>Simulated annealing fallback</li>
                  <li>Classical optimizer fallback</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="feature-category">
            <h3>Three Research Paths</h3>
            <div className="path-details">
              <div className="path-detail-card">
                <div className="path-header">
                  <span className="path-num">1</span>
                  <h4>Seamless API</h4>
                  <span className="difficulty achievable">Achievable</span>
                </div>
                <p>Make quantum acceleration invisible to developers</p>
                <pre className="code-example">
{`@quantum_accelerate
def optimize_routes(cities, distances):
    # Classical code here
    # Framework auto-detects TSP pattern
    # Encodes to QUBO, solves on quantum
    return optimal_route`}
                </pre>
              </div>
              <div className="path-detail-card">
                <div className="path-header">
                  <span className="path-num">2</span>
                  <h4>Quantum-Native Data Structures</h4>
                  <span className="difficulty novel">Novel</span>
                </div>
                <p>New abstractions that exploit superposition</p>
                <pre className="code-example">
{`# QuantumSet - all 2^n subsets in superposition
qset = QuantumSet(["a", "b", "c", "d"])
optimal = qset.find_max(
    objective=lambda s: sum(values[x] for x in s),
    constraint=lambda s: len(s) <= 2
)  # O(√2^n) instead of O(2^n)`}
                </pre>
              </div>
              <div className="path-detail-card">
                <div className="path-header">
                  <span className="path-num">3</span>
                  <h4>Reversible Compiler</h4>
                  <span className="difficulty research">Research</span>
                </div>
                <p>Auto-compile classical code to quantum circuits</p>
                <pre className="code-example">
{`# Classical search → Grover's algorithm
def search(database, target):
    for item in database:
        if item == target:
            return True
# Compiler generates quantum oracle
# Executes with O(√N) complexity`}
                </pre>
              </div>
            </div>
          </div>

          <div className="feature-category">
            <h3>Technical Specifications</h3>
            <div className="specs-table">
              <table>
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Technology</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Framework Language</td>
                    <td>Python 3.11+</td>
                    <td className="status-done">✓</td>
                  </tr>
                  <tr>
                    <td>API Framework</td>
                    <td>FastAPI</td>
                    <td className="status-done">✓</td>
                  </tr>
                  <tr>
                    <td>AWS Braket SDK</td>
                    <td>amazon-braket-sdk</td>
                    <td className="status-done">✓</td>
                  </tr>
                  <tr>
                    <td>Local Simulator</td>
                    <td>Custom SA + Numpy</td>
                    <td className="status-done">✓</td>
                  </tr>
                  <tr>
                    <td>Y-QA Integration</td>
                    <td>Rails Adapter</td>
                    <td className="status-done">✓</td>
                  </tr>
                  <tr>
                    <td>Hardware Access</td>
                    <td>1 hr/month AWS Braket</td>
                    <td className="status-done">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Qyvella Robotics Features */}
      {activeTab === 'robotics' && (
        <section className="feature-content">
          <div className="venture-header-bar robotics">
            <h2>🤖 Qyvella Robotics</h2>
            <span className="status-badge">Final R&D — Testing Soon</span>
          </div>

          <div className="feature-category">
            <h3>Hardware Platform</h3>
            <div className="feature-grid">
              <div className="feature-card">
                <h4>4-DOF Robotic Arm</h4>
                <ul>
                  <li>MG996R servo motors (5x)</li>
                  <li>PCA9685 PWM controller</li>
                  <li>350mm reach, 200g payload</li>
                  <li>±2mm repeatability</li>
                  <li>3D printed components</li>
                  <li>Inverse Kinematics solver</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>AI Robot Head</h4>
                <ul>
                  <li>6-DOF articulation (pan, tilt, jaw, brows)</li>
                  <li>Dual OLED eye displays (128x64)</li>
                  <li>USB microphone + 3W speaker</li>
                  <li>Pi Camera V2 (8MP)</li>
                  <li>Expression animation system</li>
                  <li>Emotion detection via Claude Vision</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>Control Hardware</h4>
                <ul>
                  <li>Raspberry Pi 4 (4GB)</li>
                  <li>Custom PCB breakout boards</li>
                  <li>12V 5A power supply</li>
                  <li>GPIO expanders for sensors</li>
                  <li>LoRa module for remote (planned)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="feature-category">
            <h3>Software Platform</h3>
            <div className="feature-grid">
              <div className="feature-card">
                <h4>Django Command Center</h4>
                <ul>
                  <li>Django 5.0 backend</li>
                  <li>WebSocket real-time control</li>
                  <li>REST API for all operations</li>
                  <li>PostgreSQL database</li>
                  <li>Movement recording/playback</li>
                  <li>Preset management system</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>React Web Interface</h4>
                <ul>
                  <li>Real-time joint control sliders</li>
                  <li>XYZ coordinate positioning</li>
                  <li>Live camera feed</li>
                  <li>Expression editor</li>
                  <li>Voice command interface</li>
                  <li>Build guide tracker</li>
                </ul>
              </div>
              <div className="feature-card highlight">
                <h4>Claude AI Integration</h4>
                <ul>
                  <li>Anthropic Claude Sonnet 4 / Opus 4 API</li>
                  <li>Tool/function calling for hardware</li>
                  <li>Natural language control</li>
                  <li>5 AI personality modes</li>
                  <li>Voice commands (Google Speech)</li>
                  <li>Text-to-speech (gTTS)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="feature-category">
            <h3>AI Personality Modes</h3>
            <div className="personality-grid">
              <div className="personality-card">
                <span className="personality-icon">👨‍💻</span>
                <h4>Coding Mentor</h4>
                <p>Patient teacher, explains concepts step-by-step</p>
              </div>
              <div className="personality-card">
                <span className="personality-icon">🦆</span>
                <h4>Rubber Duck</h4>
                <p>Classic debugging companion, listens and asks questions</p>
              </div>
              <div className="personality-card">
                <span className="personality-icon">😄</span>
                <h4>Witty Companion</h4>
                <p>Humor-first, keeps things fun and engaging</p>
              </div>
              <div className="personality-card">
                <span className="personality-icon">🎯</span>
                <h4>Focused Coach</h4>
                <p>Task-oriented, keeps you on track</p>
              </div>
              <div className="personality-card">
                <span className="personality-icon">🤖</span>
                <h4>Robot Assistant</h4>
                <p>Formal, precise, efficient</p>
              </div>
            </div>
          </div>

          <div className="feature-category">
            <h3>Cost Analysis</h3>
            <div className="cost-breakdown">
              <div className="cost-item">
                <span className="cost-label">Starter Kit (Arm Only)</span>
                <span className="cost-value">~$275 (R5,000)</span>
              </div>
              <div className="cost-item">
                <span className="cost-label">Pro Kit (Arm + Head)</span>
                <span className="cost-value">~$550 (R10,000)</span>
              </div>
              <div className="cost-item">
                <span className="cost-label">Build Time</span>
                <span className="cost-value">6-8 weeks</span>
              </div>
              <div className="cost-item">
                <span className="cost-label">3D Print Time</span>
                <span className="cost-value">~40 hours</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Faces Group Features */}
      {activeTab === 'faces' && (
        <section className="feature-content">
          <div className="venture-header-bar faces">
            <h2>📱 Faces Group</h2>
            <span className="status-badge live">✓ Live in Production</span>
          </div>

          <div className="feature-category">
            <h3>Mobile App (React Native)</h3>
            <div className="screen-grid">
              {[
                { name: 'Dashboard Home', desc: 'Event overview, quick stats' },
                { name: 'Profile Screen', desc: 'Edit info, Salesforce sync' },
                { name: 'Live Tracking', desc: 'GPS sharing for spectators' },
                { name: 'My Results', desc: 'Historical race performance' },
                { name: 'My Events', desc: 'Registered & past events' },
                { name: 'Hall of Fame', desc: 'All-time leaderboard' },
                { name: 'Historic Results', desc: 'Browse all results' },
                { name: 'Riders Search', desc: 'Find participants' },
                { name: 'Pursuit Index', desc: 'Performance ranking' },
                { name: 'Live Standings', desc: 'Real-time leaderboard' },
                { name: 'Leaderboard', desc: 'Category leaders' },
                { name: 'Events Calendar', desc: 'Upcoming events' },
              ].map((screen) => (
                <div className="screen-card" key={screen.name}>
                  <h5>{screen.name}</h5>
                  <p>{screen.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="feature-category">
            <h3>GPS Tracking System</h3>
            <div className="feature-grid">
              <div className="feature-card">
                <h4>Battery Optimization</h4>
                <ul>
                  <li>3-tier adaptive tracking</li>
                  <li>60s default interval</li>
                  <li>30-35% battery over 4 hours</li>
                  <li>Auto-downgrade on low battery</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>iOS Background Solution</h4>
                <ul>
                  <li>Silent audio keepalive</li>
                  <li>Screen awake "nuclear mode"</li>
                  <li>Periodic notification reminders</li>
                  <li>99% tracking reliability</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>Spectator Experience</h4>
                <ul>
                  <li>Real-time Mapbox viewer</li>
                  <li>Green pulsing GPS markers</li>
                  <li>Split times at timing mats</li>
                  <li>30-second polling</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="feature-category">
            <h3>API Endpoints (28+)</h3>
            <div className="api-grid">
              <div className="api-group">
                <h4>Authentication (6)</h4>
                <ul>
                  <li>POST /api/v1/auth/salesforce-lookup</li>
                  <li>POST /api/v1/auth/register-with-password</li>
                  <li>POST /api/v1/auth/password-signin</li>
                  <li>POST /api/v1/auth/forgot-password</li>
                  <li>POST /api/v1/auth/verify-reset-code</li>
                  <li>POST /api/v1/auth/reset-password</li>
                </ul>
              </div>
              <div className="api-group">
                <h4>Profile (4)</h4>
                <ul>
                  <li>GET /api/v1/customer/profile</li>
                  <li>GET /api/v1/customer/profile/basic</li>
                  <li>PUT /api/v1/customer/profile</li>
                  <li>GET /api/v1/customer/participations</li>
                </ul>
              </div>
              <div className="api-group">
                <h4>Live Tracking (6)</h4>
                <ul>
                  <li>GET /rj-live-2025/live_data</li>
                  <li>GET /rj-live-2025/categories</li>
                  <li>GET /rj-live-2025/category_leaders</li>
                  <li>GET /rj-live-2025/gpx_route</li>
                  <li>POST /api/v1/tracking/update</li>
                  <li>GET /api/v1/tracking/all_active</li>
                </ul>
              </div>
              <div className="api-group">
                <h4>Webhooks (4)</h4>
                <ul>
                  <li>POST /api/v1/webhooks/receive</li>
                  <li>POST /api/v1/webhooks/receive-instant</li>
                  <li>POST /api/v1/contact/submit</li>
                  <li>GET /api/v1/mediclinic/eqres</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="feature-category">
            <h3>Integrations</h3>
            <div className="integration-cards">
              <div className="integration-card">
                <h4>Salesforce</h4>
                <p>Source of truth for all participant data. Real-time SOQL queries, OAuth 2.0 authentication.</p>
              </div>
              <div className="integration-card">
                <h4>UltimateLive</h4>
                <p>Professional timing API. Live splits, race positions, 42K+ participants tracked.</p>
              </div>
              <div className="integration-card">
                <h4>AWS S3</h4>
                <p>Photo storage with 3-tier caching (S3 → Redis → Generate). af-south-1 region.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Y-Accounting Features */}
      {activeTab === 'accounting' && (
        <section className="feature-content">
          <div className="venture-header-bar yqa">
            <h2>💰 Y-Accounting</h2>
            <span className="status-note">(In conjunction with a third party)</span>
            <span className="status-badge">Rollout Q1 2026</span>
          </div>

          <div className="feature-category">
            <h3>AI Agent Ecosystem</h3>
            <div className="feature-grid">
              <div className="feature-card">
                <h4>Document Intelligence Agent</h4>
                <p>Multi-modal document processing</p>
                <ul>
                  <li>PDF processing (PyMuPDF)</li>
                  <li>OCR integration (Tesseract)</li>
                  <li>Auto-classification (94% accuracy)</li>
                  <li>Risk scoring & assessment</li>
                  <li>Accounting treatment recommendations</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>Cash Flow Optimizer Agent</h4>
                <ul>
                  <li>95%+ forecasting accuracy</li>
                  <li>90-day predictions</li>
                  <li>Seasonal trend detection</li>
                  <li>Multi-scenario modeling</li>
                  <li>AI optimization recommendations</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>Financial Strategist Agent</h4>
                <ul>
                  <li>CFO-level strategic insights</li>
                  <li>Risk assessment</li>
                  <li>Growth opportunity analysis</li>
                  <li>ROI projections</li>
                  <li>Implementation roadmaps</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="feature-category">
            <h3>AI Service Layer</h3>
            <pre className="code-example">
{`# Multi-Provider AI Architecture

class AIService:
    def __init__(self):
        # Primary: Anthropic Claude (Sonnet 4 / Opus 4)
        self.anthropic = AsyncAnthropic(api_key=ANTHROPIC_KEY)
        # GPT-4 Compatible (not actively used)
        self.anthropic = AsyncAnthropic(api_key=ANTHROPIC_KEY)
    
    async def analyze_document(self, document_text, document_type):
        """Analyze document and extract business insights"""
        system_prompt = """You are an expert financial analyst AI.
        Extract: amounts, dates, parties, payment terms
        Classify: invoice, receipt, contract, statement
        Generate: business implications, risk score"""
        
        return await self.chat_completion(messages)
    
    async def forecast_cash_flow(self, transactions, days=90):
        """Generate multi-scenario cash flow forecast"""
        patterns = await self._analyze_patterns(transactions)
        return {
            "conservative": self._generate_forecast(patterns, 0.8),
            "base": self._generate_forecast(patterns, 1.0),
            "optimistic": self._generate_forecast(patterns, 1.2)
        }`}
            </pre>
          </div>

          <div className="feature-category">
            <h3>Platform Features</h3>
            <div className="feature-grid">
              <div className="feature-card">
                <h4>Data Ingestion</h4>
                <ul>
                  <li>Multi-source import</li>
                  <li>Bank API integration</li>
                  <li>CSV/Excel processing</li>
                  <li>Auto-categorization</li>
                  <li>Duplicate detection</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>Analytics Dashboard</h4>
                <ul>
                  <li>Real-time KPIs</li>
                  <li>Cash flow visualization</li>
                  <li>AI forecast overlays</li>
                  <li>Category breakdown</li>
                  <li>Trend analysis</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>Security</h4>
                <ul>
                  <li>JWT authentication</li>
                  <li>Role-based access (RBAC)</li>
                  <li>AES-256 encryption</li>
                  <li>Blockchain audit trail</li>
                  <li>SOC 2 ready</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Y-QA Features */}
      {activeTab === 'yqa' && (
        <section className="feature-content">
          <div className="venture-header-bar yqa">
            <h2>🧪 Y-QA Platform</h2>
            <span className="status-badge">Rollout Q1 2026</span>
          </div>

          <div className="feature-category">
            <h3>Quantum Test Optimization</h3>
            <div className="feature-grid">
              <div className="feature-card">
                <h4>QUBO Formulation</h4>
                <p>Convert test selection into quantum optimization</p>
                <ul>
                  <li>Coverage weight (default 35%)</li>
                  <li>Risk weight (default 35%)</li>
                  <li>Time constraint (default 20%)</li>
                  <li>Dependency handling (default 10%)</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>Quantum Execution</h4>
                <ul>
                  <li>Quantum Bridge integration</li>
                  <li>AWS Braket D-Wave solver</li>
                  <li>Automatic classical fallback</li>
                  <li>Result comparison analytics</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>Test Analytics</h4>
                <ul>
                  <li>Coverage metrics</li>
                  <li>Risk scoring</li>
                  <li>Execution time prediction</li>
                  <li>Historical trend analysis</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="feature-category">
            <h3>Quantum Bridge Connection</h3>
            <pre className="code-example">
{`# Y-QA QuantumOptimizationService Integration

class QuantumOptimizationService
  def optimize_test_suite(test_cases, params)
    # Build QUBO matrix from test metrics
    qubo_matrix = build_qubo(
      test_cases,
      weights: {
        coverage: params[:coverage_weight] || 0.35,
        risk: params[:risk_weight] || 0.35,
        time: params[:time_weight] || 0.2,
        dependency: params[:dependency_weight] || 0.1
      }
    )
    
    # Send to Quantum Bridge
    response = QuantumBridgeClient.solve_qubo(
      qubo_matrix,
      name: 'Y-QA Test Selection',
      provider: params[:provider] || 'auto'
    )
    
    # Decode solution to test IDs
    decode_solution(response.solution, test_cases)
  end
end`}
            </pre>
          </div>

          <div className="feature-category">
            <h3>Platform Features</h3>
            <div className="feature-grid">
              <div className="feature-card">
                <h4>Project Management</h4>
                <ul>
                  <li>Multi-project support</li>
                  <li>Test suite organization</li>
                  <li>Team collaboration</li>
                  <li>Permission management</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>CI/CD Integration</h4>
                <ul>
                  <li>GitHub Actions</li>
                  <li>GitLab CI</li>
                  <li>Jenkins</li>
                  <li>Webhook triggers</li>
                </ul>
              </div>
              <div className="feature-card">
                <h4>Reporting</h4>
                <ul>
                  <li>Optimization results</li>
                  <li>Coverage reports</li>
                  <li>Quantum vs classical comparison</li>
                  <li>Cost analytics</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Technology Stack Summary */}
      <section className="tech-stack-section">
        <h2>Complete Technology Stack</h2>
        <div className="stack-categories">
          <div className="stack-category">
            <h3>Languages</h3>
            <div className="tech-tags">
              <span>Python 3.11</span>
              <span>Ruby 3.2</span>
              <span>TypeScript</span>
              <span>JavaScript</span>
            </div>
          </div>
          <div className="stack-category">
            <h3>Frameworks</h3>
            <div className="tech-tags">
              <span>Ruby on Rails 7.1</span>
              <span>Django 5.0</span>
              <span>FastAPI</span>
              <span>React 18</span>
              <span>React Native</span>
              <span>Expo</span>
            </div>
          </div>
          <div className="stack-category">
            <h3>Databases</h3>
            <div className="tech-tags">
              <span>PostgreSQL</span>
              <span>Redis</span>
              <span>SQLite</span>
            </div>
          </div>
          <div className="stack-category">
            <h3>Cloud & Infrastructure</h3>
            <div className="tech-tags">
              <span>AWS Braket</span>
              <span>AWS S3</span>
              <span>Heroku</span>
              <span>Sidekiq</span>
            </div>
          </div>
          <div className="stack-category">
            <h3>AI & Quantum</h3>
            <div className="tech-tags">
              <span>Claude API</span>
              <span>D-Wave</span>
              <span>IonQ</span>
              <span>Qiskit</span>
              <span>OpenCV</span>
            </div>
          </div>
          <div className="stack-category">
            <h3>Integrations</h3>
            <div className="tech-tags">
              <span>Salesforce</span>
              <span>UltimateLive</span>
              <span>Mapbox</span>
              <span>Google Speech</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="features-cta-section">
        <MantisIcon size={70} className="cta-logo" />
        <h2>Ready to Learn More?</h2>
        <p>Contact us to discuss investment opportunities or partnerships.</p>
        <div className="cta-contact">
          <a href="mailto:jp@yellow-mantis.com" className="cta-button primary">
            📧 jp@yellow-mantis.com
          </a>
          <a href="tel:+27764863294" className="cta-button secondary">
            📱 +27 76 486 3294
          </a>
        </div>
      </section>
    </div>
  );
}

export default FullFeatures;
