import React from 'react';
import { Link } from 'react-router-dom';
import MantisIcon from '../components/MantisIcon';
import './QuantumForInvestors.css';

function QuantumForInvestors() {
  return (
    <div className="quantum-investors-page">
      {/* Hero */}
      <section className="quantum-hero">
        <div className="quantum-hero-bg"></div>
        <MantisIcon size={100} className="quantum-hero-logo" />
        <h1>Quantum Computing: The Barrier &amp; The Bridge</h1>
        <p className="quantum-subtitle">A Plain-English Guide for Investors</p>
      </section>

      {/* What is Quantum Computing */}
      <section className="quantum-section">
        <h2>What is Quantum Computing?</h2>
        
        <div className="intro-grid">
          <div className="intro-card">
            <div className="intro-icon">💻</div>
            <h3>Classical Computers</h3>
            <p>Every computer you've ever used processes information as <strong>bits</strong> — tiny switches that are either OFF (0) or ON (1). Every calculation, every email, every video is ultimately just billions of these 0s and 1s flipping back and forth.</p>
          </div>
          <div className="intro-card highlight">
            <div className="intro-icon">⚛️</div>
            <h3>Quantum Computers</h3>
            <p>Use <strong>qubits</strong> — which exploit a strange property of subatomic particles. A qubit can be 0, 1, or <em>both simultaneously</em>. This is called <strong>superposition</strong>.</p>
          </div>
        </div>

        <div className="comparison-example">
          <h3>Why Does This Matter?</h3>
          <p className="example-intro">Imagine you need to find the best route through 50 cities.</p>
          
          <div className="comparison-table-wrapper">
            <table className="quantum-table">
              <thead>
                <tr>
                  <th>Approach</th>
                  <th>How It Works</th>
                  <th>Time Required</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Classical Computer</strong></td>
                  <td>Tries each possible route one-by-one</td>
                  <td className="warning">Would take longer than the age of the universe</td>
                </tr>
                <tr className="highlight-row">
                  <td><strong>Quantum Computer</strong></td>
                  <td>Explores all routes <em>simultaneously</em></td>
                  <td className="success">Minutes to hours</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="key-insight">This is not incremental improvement. This is <strong>exponential acceleration</strong> for specific problem types.</p>
        </div>
      </section>

      {/* Observer Effect */}
      <section className="quantum-section alt-bg">
        <h2>The Observer Effect: The Counterintuitive Truth</h2>
        
        <blockquote className="investor-quote">
          "This changes when you look at it?" — Every investor's first reaction
        </blockquote>
        
        <p className="section-intro">Yes. And here's why it's not magic — it's physics.</p>

        <div className="concept-card">
          <h3>The Measurement Problem (Simple Version)</h3>
          <p>A qubit exists in superposition — it's exploring multiple possibilities at once. But the moment you <strong>measure</strong> it to read the answer, it "collapses" into just one definite state (0 or 1).</p>
          
          <div className="analogy-box">
            <h4>💡 Think of it like this:</h4>
            <p>Imagine a spinning coin. While it's spinning, it's neither heads nor tails — it contains the <em>potential</em> for both. The moment you slam your hand down to stop it, you force it to choose.</p>
            <p>Quantum computers are doing billions of calculations with "spinning coins." The challenge is extracting the right answer when the act of reading <em>forces</em> those coins to stop.</p>
          </div>
        </div>

        <div className="business-implications">
          <h3>Why This Matters for Business</h3>
          <p>This isn't mysticism — it's an engineering constraint that requires:</p>
          
          <div className="requirements-grid">
            <div className="requirement-item">
              <span className="req-number">1</span>
              <div className="req-content">
                <h4>Precise timing</h4>
                <p>Read at exactly the right moment</p>
              </div>
            </div>
            <div className="requirement-item">
              <span className="req-number">2</span>
              <div className="req-content">
                <h4>Statistical methods</h4>
                <p>Run the calculation thousands of times, aggregate the results</p>
              </div>
            </div>
            <div className="requirement-item">
              <span className="req-number">3</span>
              <div className="req-content">
                <h4>Error correction</h4>
                <p>Use redundancy to verify answers</p>
              </div>
            </div>
          </div>
          
          <p className="key-insight">These are solvable engineering problems. We know how to solve them. The hardware is just catching up.</p>
        </div>
      </section>

      {/* The "Impossible" Barrier */}
      <section className="quantum-section">
        <h2>The "Impossible" Barrier: Why Quantum Isn't Mainstream Yet</h2>
        
        <div className="era-badge">The NISQ Era (Where We Are Today)</div>
        <p className="era-description">We're in what physicists call the <strong>Noisy Intermediate-Scale Quantum</strong> era:</p>

        <div className="challenges-grid">
          <div className="challenge-card">
            <h4>🔊 Noise</h4>
            <p className="challenge-what">Qubits are extremely fragile. A passing truck's vibration can corrupt calculations.</p>
            <p className="challenge-impact">Error rates of 0.1-5% per operation</p>
          </div>
          <div className="challenge-card">
            <h4>⏱️ Coherence Time</h4>
            <p className="challenge-what">Qubits "decay" after microseconds to milliseconds</p>
            <p className="challenge-impact">Must complete calculations before qubits lose their state</p>
          </div>
          <div className="challenge-card">
            <h4>📏 Scale</h4>
            <p className="challenge-what">50-1,000 qubits available (need millions for general computing)</p>
            <p className="challenge-impact">Limited to specific problem types</p>
          </div>
          <div className="challenge-card">
            <h4>🔌 No Plug-and-Play</h4>
            <p className="challenge-what">Can't just "run software" on quantum hardware</p>
            <p className="challenge-impact">Requires PhD-level expertise to use</p>
          </div>
        </div>

        <div className="expertise-gap">
          <h3>The Real Barrier: The Expertise Gap</h3>
          <p>Today, to use a quantum computer, you need to:</p>
          
          <ol className="expertise-list">
            <li>Understand quantum mechanics</li>
            <li>Reformulate your problem into quantum-compatible format (QUBO, Ising models, etc.)</li>
            <li>Write quantum circuits or annealing schedules</li>
            <li>Manage error mitigation manually</li>
            <li>Interpret probabilistic results</li>
            <li>Handle failures gracefully</li>
          </ol>
          
          <div className="stat-callout">
            <span className="stat-number">~10,000</span>
            <span className="stat-label">people worldwide who can do this effectively</span>
          </div>
          
          <p className="key-insight"><strong>Result:</strong> Quantum computers exist. They work. But only a handful of organizations can actually use them.</p>
        </div>
      </section>

      {/* What Quantum CAN Do */}
      <section className="quantum-section alt-bg">
        <h2>What Quantum Computers CAN Do Today (And Can't)</h2>
        
        <div className="capabilities-split">
          <div className="can-do">
            <h3>✅ Production-Ready Applications</h3>
            <div className="capability-list">
              <div className="capability-item">
                <span className="cap-type">Optimization</span>
                <p className="cap-example">Find the best schedule for 10,000 deliveries</p>
                <p className="cap-advantage">Explores all combinations simultaneously</p>
              </div>
              <div className="capability-item">
                <span className="cap-type">Portfolio Optimization</span>
                <p className="cap-example">Balance risk/return across 500 assets</p>
                <p className="cap-advantage">Handles complex interdependencies</p>
              </div>
              <div className="capability-item">
                <span className="cap-type">Drug Discovery</span>
                <p className="cap-example">Simulate molecular interactions</p>
                <p className="cap-advantage">Models quantum effects natively</p>
              </div>
              <div className="capability-item">
                <span className="cap-type">Logistics</span>
                <p className="cap-example">Route 1,000 vehicles optimally</p>
                <p className="cap-advantage">Solves "traveling salesman" variants</p>
              </div>
              <div className="capability-item">
                <span className="cap-type">Test Selection</span>
                <p className="cap-example">Pick 200 tests from 10,000 that maximize coverage</p>
                <p className="cap-advantage">Combinatorial optimization</p>
              </div>
            </div>
          </div>
          
          <div className="cannot-do">
            <h3>❌ Not Ready Yet</h3>
            <div className="limitation-list">
              <div className="limitation-item">
                <span className="lim-type">General software execution</span>
                <span className="lim-reason">Quantum computers aren't general-purpose</span>
              </div>
              <div className="limitation-item">
                <span className="lim-type">Database queries</span>
                <span className="lim-reason">Not enough qubits for practical advantage</span>
              </div>
              <div className="limitation-item">
                <span className="lim-type">Real-time processing</span>
                <span className="lim-reason">Queue times + computation = latency</span>
              </div>
              <div className="limitation-item">
                <span className="lim-type">Cryptography breaking</span>
                <span className="lim-reason">Requires millions of error-corrected qubits (decades away)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Bridge */}
      <section className="quantum-section">
        <h2>🌉 The Bridge: What We're Building</h2>
        
        <div className="core-problem">
          <h3>The Core Problem We Solve</h3>
          <div className="problem-flow">
            <div className="flow-item problem">
              <span className="flow-label">TODAY</span>
              <p>Quantum hardware exists → but only PhDs can use it → <strong>99.9% of potential users locked out</strong></p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-item solution">
              <span className="flow-label">OUR SOLUTION</span>
              <p>An intelligent bridge that allows <strong>any developer</strong> to access quantum computing through simple API calls</p>
            </div>
          </div>
        </div>

        <div className="architecture-diagram">
          <h3>System Architecture</h3>
          <pre className="code-block">
{`┌─────────────────────────────────────────────────────────────────────┐
│                     YOUR APPLICATION                                 │
│          (Any software: Python, Ruby, Node.js, etc.)                │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    QUANTUM BRIDGE                                    │
│                                                                      │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐    │
│   │  CLASSIFY   │ →  │   ENCODE    │ →  │       ROUTE         │    │
│   │  "Is this   │    │  "Convert   │    │  "Send to best      │    │
│   │   quantum-  │    │   to QUBO   │    │   hardware or use   │    │
│   │   suitable?"│    │   format"   │    │   classical fallback"│   │
│   └─────────────┘    └─────────────┘    └─────────────────────┘    │
│                                                                      │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  RESULT: Clean answer + confidence score + cost tracking    │   │
│   └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────────┐
│   D-Wave        │    │   IBM Quantum   │    │  Classical Fallback │
│   (Optimization)│    │   (Gate-based)  │    │  (100% reliability) │
└─────────────────┘    └─────────────────┘    └─────────────────────┘`}
          </pre>
        </div>

        <div className="unique-capabilities">
          <h3>What We Do That Nobody Else Does</h3>
          <div className="capabilities-grid">
            <div className="cap-card">
              <h4>Problem Classification</h4>
              <p>Automatically determines if your problem benefits from quantum</p>
            </div>
            <div className="cap-card">
              <h4>Intelligent Encoding</h4>
              <p>Translates business problems into quantum format (QUBO, Ising)</p>
            </div>
            <div className="cap-card">
              <h4>Provider Routing</h4>
              <p>Selects optimal quantum hardware for each problem type</p>
            </div>
            <div className="cap-card">
              <h4>Cost Management</h4>
              <p>Budget controls, spend tracking, optimization strategies</p>
            </div>
            <div className="cap-card">
              <h4>Graceful Fallback</h4>
              <p>If quantum fails or exceeds budget, classical algorithms take over</p>
            </div>
            <div className="cap-card">
              <h4>Result Translation</h4>
              <p>Returns clean answers, not quantum states</p>
            </div>
          </div>
        </div>

        <div className="developer-experience">
          <h3>The Developer Experience</h3>
          <div className="dx-comparison">
            <div className="dx-before">
              <h4>Before Quantum Bridge:</h4>
              <pre className="code-block small">
{`# 200+ lines of quantum-specific code
# PhD required
# Weeks of development`}
              </pre>
            </div>
            <div className="dx-after">
              <h4>After Quantum Bridge:</h4>
              <pre className="code-block small">
{`from quantum_bridge import optimize

result = optimize.delivery_routes(
    vehicles=fleet,
    destinations=addresses,
    constraints={"max_time": "8 hours"}
)

print(result.solution)  # Clean answer
print(result.confidence)  # 97.3%
print(result.cost_usd)   # $0.08`}
              </pre>
            </div>
          </div>
          <p className="key-insight"><strong>Result:</strong> Any developer can leverage quantum computing. No physics degree required.</p>
        </div>
      </section>

      {/* Why Now */}
      <section className="quantum-section alt-bg">
        <h2>Why Now? The Market Timing</h2>
        
        <div className="timeline-section">
          <h3>The Inflection Point</h3>
          <div className="timeline">
            <div className="timeline-item">
              <span className="year">2019</span>
              <span className="status">"Quantum supremacy" demonstrated</span>
              <span className="access">Research labs only</span>
            </div>
            <div className="timeline-item">
              <span className="year">2020</span>
              <span className="status">Cloud quantum services launched (AWS, IBM)</span>
              <span className="access">Still requires expertise</span>
            </div>
            <div className="timeline-item">
              <span className="year">2021</span>
              <span className="status">100+ qubit machines available</span>
              <span className="access">Growing but fragmented</span>
            </div>
            <div className="timeline-item current">
              <span className="year">2024</span>
              <span className="status">1,000+ qubit machines, error rates improving</span>
              <span className="access highlight">Ready for bridge layer</span>
            </div>
            <div className="timeline-item future">
              <span className="year">2025+</span>
              <span className="status">Error correction maturing</span>
              <span className="access">Mass adoption begins</span>
            </div>
          </div>
        </div>

        <div className="timing-summary">
          <h3>We are at the precise moment where:</h3>
          <ul className="timing-points">
            <li>Hardware is capable enough to provide real value</li>
            <li>But software accessibility hasn't caught up</li>
            <li><strong>First-mover advantage for the bridge layer is now</strong></li>
          </ul>
        </div>

        <div className="market-opportunity">
          <h3>The Market Opportunity</h3>
          <div className="market-table-wrapper">
            <table className="quantum-table">
              <thead>
                <tr>
                  <th>Segment</th>
                  <th>Quantum-Suitable Problems</th>
                  <th>Current Quantum Adoption</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Logistics (FedEx, DHL, etc.)</td>
                  <td>Route optimization</td>
                  <td className="low">&lt;1%</td>
                </tr>
                <tr>
                  <td>Finance (banks, hedge funds)</td>
                  <td>Portfolio optimization</td>
                  <td className="medium">~5% (early adopters)</td>
                </tr>
                <tr>
                  <td>Pharma (drug discovery)</td>
                  <td>Molecular simulation</td>
                  <td className="medium">~10%</td>
                </tr>
                <tr>
                  <td>Manufacturing</td>
                  <td>Scheduling, resource allocation</td>
                  <td className="low">&lt;1%</td>
                </tr>
                <tr className="highlight-row">
                  <td>Software Development (Y-QA)</td>
                  <td>Test optimization</td>
                  <td className="us">We're building this</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="tam-callout">
            <span className="tam-value">$65B</span>
            <span className="tam-label">Total addressable market for quantum software by 2030 (McKinsey)</span>
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="quantum-section">
        <h2>🏆 Our Competitive Advantages</h2>
        
        <div className="advantages-list">
          <div className="advantage-block">
            <div className="advantage-number">1</div>
            <div className="advantage-content">
              <h3>Real-World Integration Path</h3>
              <p>We're not building in a vacuum. We have immediate integration with <strong>Y-QA</strong> (our QA testing company), providing:</p>
              <ul>
                <li>Real customer problems to solve</li>
                <li>Proof-of-concept with live production data</li>
                <li>Revenue from day one</li>
              </ul>
            </div>
          </div>
          
          <div className="advantage-block">
            <div className="advantage-number">2</div>
            <div className="advantage-content">
              <h3>Provider Agnostic</h3>
              <p>We're not locked to any single quantum hardware provider:</p>
              <div className="provider-pills">
                <span className="provider-pill">AWS Braket (D-Wave, IonQ, Rigetti)</span>
                <span className="provider-pill">IBM Quantum</span>
                <span className="provider-pill">Google (when available)</span>
                <span className="provider-pill">Emerging providers</span>
              </div>
              <p className="advantage-note">When better hardware emerges, we route to it automatically.</p>
            </div>
          </div>
          
          <div className="advantage-block">
            <div className="advantage-number">3</div>
            <div className="advantage-content">
              <h3>Classical Fallback = Zero Risk</h3>
              <p>Every quantum call has a classical backup. If quantum:</p>
              <ul>
                <li>Is unavailable</li>
                <li>Exceeds budget</li>
                <li>Returns low-confidence results</li>
              </ul>
              <p className="advantage-highlight">...the system automatically falls back to classical algorithms. <strong>100% reliability guaranteed.</strong></p>
            </div>
          </div>
          
          <div className="advantage-block">
            <div className="advantage-number">4</div>
            <div className="advantage-content">
              <h3>Cost Transparency</h3>
              <p>Built-in budget management:</p>
              <ul>
                <li>Per-query cost tracking</li>
                <li>Monthly spend limits</li>
                <li>ROI reporting (quantum improvement vs. classical baseline)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Thesis */}
      <section className="quantum-section alt-bg">
        <h2>💼 The Investment Thesis</h2>
        
        <div className="thesis-content">
          <div className="thesis-what">
            <h3>What We're Building</h3>
            <p className="thesis-statement">A <strong>universal translation layer</strong> between classical software and quantum hardware — the middleware that makes quantum computing accessible.</p>
          </div>
          
          <div className="thesis-why">
            <h3>Why It Will Win</h3>
            <div className="thesis-reasons">
              <div className="thesis-reason">
                <span className="reason-number">1</span>
                <div className="reason-content">
                  <h4>Timing</h4>
                  <p>Hardware is ready; accessibility isn't. We fill the gap.</p>
                </div>
              </div>
              <div className="thesis-reason">
                <span className="reason-number">2</span>
                <div className="reason-content">
                  <h4>Defensibility</h4>
                  <p>Expertise in encoding + routing creates compounding advantage.</p>
                </div>
              </div>
              <div className="thesis-reason">
                <span className="reason-number">3</span>
                <div className="reason-content">
                  <h4>Network effects</h4>
                  <p>More problems solved → better classification → better routing.</p>
                </div>
              </div>
              <div className="thesis-reason">
                <span className="reason-number">4</span>
                <div className="reason-content">
                  <h4>Revenue path</h4>
                  <p>Pay-per-query model with clear unit economics.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="risk-mitigation">
            <h3>Risk Mitigation</h3>
            <div className="risk-table-wrapper">
              <table className="quantum-table">
                <thead>
                  <tr>
                    <th>Risk</th>
                    <th>Mitigation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Quantum hardware doesn't improve</td>
                    <td>Classical fallback ensures product works regardless</td>
                  </tr>
                  <tr>
                    <td>Major tech company builds this</td>
                    <td>Our domain expertise (from Y-QA) + speed to market</td>
                  </tr>
                  <tr>
                    <td>Quantum proves less useful than expected</td>
                    <td>We discover this early with real customer problems</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="quantum-section summary-section">
        <h2>Summary</h2>
        
        <div className="summary-grid">
          <div className="summary-card">
            <h3>🚧 The "Impossible" State</h3>
            <ul>
              <li>Quantum computers work but require PhD-level expertise to use</li>
              <li>99.9% of potential users are locked out</li>
              <li>Observer effect and noise require sophisticated handling</li>
            </ul>
          </div>
          
          <div className="summary-card highlight">
            <h3>🌉 What We're Building</h3>
            <ul>
              <li>An intelligent bridge that classifies, encodes, routes, and translates</li>
              <li>Simple API for developers — complex quantum mechanics handled internally</li>
              <li>Classical fallback ensures 100% reliability</li>
            </ul>
          </div>
          
          <div className="summary-card">
            <h3>⏰ Why Now</h3>
            <ul>
              <li>Hardware has crossed the capability threshold</li>
              <li>Software accessibility is the bottleneck</li>
              <li>First-mover advantage for the bridge layer</li>
            </ul>
          </div>
          
          <div className="summary-card">
            <h3>🎯 The Result</h3>
            <ul>
              <li>Any developer can leverage quantum computing</li>
              <li>No physics degree required</li>
              <li>Pay-per-query with transparent costs</li>
            </ul>
          </div>
        </div>

        <blockquote className="closing-quote">
          "The best time to build the bridge was when we first saw both sides of the chasm. The second best time is now."
        </blockquote>
      </section>

      {/* Appendix */}
      <section className="quantum-section alt-bg appendix-section">
        <h2>📚 Appendix: Technical Deep-Dive</h2>
        <p className="appendix-intro">For investors wanting more technical detail, see:</p>
        
        <div className="appendix-links">
          <div className="appendix-link">
            <span className="doc-icon">📄</span>
            <div className="doc-info">
              <h4>QUANTUM_BRIDGE_MASTER_PLAN.md</h4>
              <p>Full architecture and implementation roadmap</p>
            </div>
          </div>
          <div className="appendix-link">
            <span className="doc-icon">📄</span>
            <div className="doc-info">
              <h4>WHY_IMPOSSIBLE_AND_HOW_TO_SOLVE_IT.md</h4>
              <p>Technical barriers and solutions</p>
            </div>
          </div>
          <div className="appendix-link">
            <span className="doc-icon">📄</span>
            <div className="doc-info">
              <h4>IMPLEMENTATION_ROADMAP.md</h4>
              <p>Week-by-week development plan</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="quantum-cta-section">
        <MantisIcon size={80} className="cta-logo" />
        <h2>Ready to Bridge the Quantum Gap?</h2>
        <p>Join us in making quantum computing accessible to everyone.</p>
        <div className="cta-buttons">
          <Link to="/pitch-deck" className="cta-button primary">
            📊 View Full Pitch Deck
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

export default QuantumForInvestors;
