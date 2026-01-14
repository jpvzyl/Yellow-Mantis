import React from 'react';
import { Link } from 'react-router-dom';
import './DueDiligence.css';

function DueDiligenceYellowMantis() {
  return (
    <div className="dd-page">
      {/* Hero Section */}
      <section className="dd-hero" style={{ '--dd-accent': '#27ae60' }}>
        <div className="dd-hero-bg"></div>
        <div className="dd-hero-badge">TECH DUE DILIGENCE</div>
        <div className="dd-hero-icon">🦗</div>
        <h1>Yellow Mantis / Faces Group</h1>
        <p className="dd-hero-tagline">Development, Consulting &amp; Production Event Platforms</p>
        <div className="dd-hero-valuation">
          <span className="dd-val-label">Operational Value</span>
          <span className="dd-val-amount">PRODUCTION ACTIVE</span>
          <span className="dd-val-basis">(60,000+ athletes served • Revenue generating)</span>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="dd-section">
        <h2>📋 Executive Summary</h2>
        <div className="dd-summary-grid">
          <div className="dd-summary-card production">
            <span className="dd-summary-icon">✓</span>
            <h4>Development Stage</h4>
            <p>LIVE IN PRODUCTION</p>
          </div>
          <div className="dd-summary-card">
            <span className="dd-summary-icon">👥</span>
            <h4>Athletes Served</h4>
            <p>60,000+ Participants</p>
          </div>
          <div className="dd-summary-card">
            <span className="dd-summary-icon">📱</span>
            <h4>Platforms Built</h4>
            <p>Mobile Apps + Web Portals</p>
          </div>
          <div className="dd-summary-card">
            <span className="dd-summary-icon">⏱️</span>
            <h4>Uptime</h4>
            <p>99.9% (12 months)</p>
          </div>
        </div>
      </section>

      {/* Events Powered */}
      <section className="dd-section dd-section-dark">
        <h2>🏆 Major Events Powered</h2>
        <div className="dd-events-grid">
          <div className="dd-event-card">
            <div className="dd-event-icon">🚴</div>
            <h4>947 Ride Joburg</h4>
            <div className="dd-event-stat">15,000+ cyclists</div>
            <p>South Africa's premier cycling event. Photos, results, live GPS tracking.</p>
          </div>
          <div className="dd-event-card">
            <div className="dd-event-icon">🏃</div>
            <h4>Cape Town Marathon</h4>
            <div className="dd-event-stat">42,464 runners</div>
            <p>Africa's only World Major candidate. UltimateLive timing integration.</p>
          </div>
          <div className="dd-event-card">
            <div className="dd-event-icon">🏔️</div>
            <h4>Otter Trail Run</h4>
            <div className="dd-event-stat">2,000+ athletes</div>
            <p>Iconic trail running experience. Trail maps, checkpoints.</p>
          </div>
          <div className="dd-event-card">
            <div className="dd-event-icon">🌲</div>
            <h4>TrailSeeker Series</h4>
            <div className="dd-event-stat">5,000+ athletes</div>
            <p>Multi-event trail series. Complete registration platform.</p>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="dd-section">
        <h2>🛠️ Technology Stack Analysis</h2>
        <div className="dd-tech-breakdown">
          <div className="dd-tech-category">
            <h4>Backend</h4>
            <div className="dd-tech-pills">
              <span className="dd-pill primary">Ruby on Rails 7.1</span>
              <span className="dd-pill">PostgreSQL 13+</span>
              <span className="dd-pill">Redis</span>
              <span className="dd-pill">Sidekiq</span>
            </div>
          </div>
          <div className="dd-tech-category">
            <h4>Mobile</h4>
            <div className="dd-tech-pills">
              <span className="dd-pill highlight">React Native</span>
              <span className="dd-pill highlight">Expo</span>
              <span className="dd-pill">TypeScript</span>
              <span className="dd-pill">Redux</span>
            </div>
          </div>
          <div className="dd-tech-category">
            <h4>Web Frontends</h4>
            <div className="dd-tech-pills">
              <span className="dd-pill">React 18</span>
              <span className="dd-pill">Mapbox GL</span>
              <span className="dd-pill">White-label Engine</span>
            </div>
          </div>
          <div className="dd-tech-category">
            <h4>Integrations</h4>
            <div className="dd-tech-pills">
              <span className="dd-pill">Salesforce</span>
              <span className="dd-pill">UltimateLive Timing</span>
              <span className="dd-pill">Howler Ticketing</span>
              <span className="dd-pill">AWS S3</span>
            </div>
          </div>
          <div className="dd-tech-category">
            <h4>Infrastructure</h4>
            <div className="dd-tech-pills">
              <span className="dd-pill">Heroku</span>
              <span className="dd-pill">AWS S3 (af-south-1)</span>
              <span className="dd-pill">Sidekiq Pro</span>
            </div>
          </div>
        </div>
      </section>

      {/* Production Metrics */}
      <section className="dd-section dd-section-dark">
        <h2>📊 Production Metrics</h2>
        <div className="dd-metrics-grid">
          <div className="dd-metric-card">
            <div className="dd-metric-value">&lt;10ms</div>
            <div className="dd-metric-label">Webhook Capture</div>
          </div>
          <div className="dd-metric-card">
            <div className="dd-metric-value">&lt;100ms</div>
            <div className="dd-metric-label">API Response (cached)</div>
          </div>
          <div className="dd-metric-card">
            <div className="dd-metric-value">99.9%</div>
            <div className="dd-metric-label">Uptime (12 months)</div>
          </div>
          <div className="dd-metric-card">
            <div className="dd-metric-value">50K+</div>
            <div className="dd-metric-label">Lines of Code</div>
          </div>
          <div className="dd-metric-card">
            <div className="dd-metric-value">28+</div>
            <div className="dd-metric-label">API Endpoints</div>
          </div>
          <div className="dd-metric-card">
            <div className="dd-metric-value">99%</div>
            <div className="dd-metric-label">iOS GPS Reliability</div>
          </div>
        </div>
      </section>

      {/* Mobile App Features */}
      <section className="dd-section">
        <h2>📱 Mobile App Features (18 Screens)</h2>
        <div className="dd-features-grid">
          <div className="dd-feature-category">
            <h4>Core Features</h4>
            <ul>
              <li>Dashboard Home</li>
              <li>Profile Management</li>
              <li>Live GPS Tracking</li>
              <li>My Results (Historical)</li>
              <li>My Events (Registered)</li>
            </ul>
          </div>
          <div className="dd-feature-category">
            <h4>Race Features</h4>
            <ul>
              <li>Live Standings</li>
              <li>Leaderboard</li>
              <li>Riders Search</li>
              <li>Who's Riding</li>
              <li>Pursuit Index</li>
            </ul>
          </div>
          <div className="dd-feature-category">
            <h4>History &amp; Records</h4>
            <ul>
              <li>Hall of Fame</li>
              <li>Historic Results</li>
              <li>Events Calendar</li>
              <li>Account Settings</li>
            </ul>
          </div>
          <div className="dd-feature-category">
            <h4>Technical Innovations</h4>
            <ul>
              <li>Silent Audio Keepalive (iOS)</li>
              <li>30-35% battery (4hr race)</li>
              <li>Offline-capable with retry</li>
              <li>7 Core Services</li>
            </ul>
          </div>
        </div>
      </section>

      {/* API Coverage */}
      <section className="dd-section dd-section-dark">
        <h2>🔌 Complete REST API (28+ Endpoints)</h2>
        <div className="dd-api-grid">
          <div className="dd-api-category">
            <h4>Authentication (6)</h4>
            <ul>
              <li>Salesforce lookup</li>
              <li>Password registration</li>
              <li>Password signin</li>
              <li>Forgot password</li>
              <li>Verify reset code</li>
              <li>Reset password</li>
            </ul>
          </div>
          <div className="dd-api-category">
            <h4>Profile (4)</h4>
            <ul>
              <li>Get profile</li>
              <li>Get profile basic</li>
              <li>Update profile</li>
              <li>Get participations</li>
            </ul>
          </div>
          <div className="dd-api-category">
            <h4>Rider Search (4)</h4>
            <ul>
              <li>Search riders</li>
              <li>Get batches</li>
              <li>Get categories</li>
              <li>Get genders</li>
            </ul>
          </div>
          <div className="dd-api-category">
            <h4>Live Tracking (5)</h4>
            <ul>
              <li>Live data stream</li>
              <li>Category leaders</li>
              <li>GPX route</li>
              <li>Tracking update</li>
              <li>All active riders</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Competitive Advantage */}
      <section className="dd-section">
        <h2>🏆 Competitive Advantage</h2>
        <div className="dd-advantages-grid">
          <div className="dd-advantage-card">
            <div className="dd-advantage-icon">🔗</div>
            <h4>Deep Integration Moat</h4>
            <p>Native Salesforce, UltimateLive timing, Howler ticketing integration. High switching costs.</p>
          </div>
          <div className="dd-advantage-card">
            <div className="dd-advantage-icon">📱</div>
            <h4>Mobile-Ready</h4>
            <p>iOS/Android apps in final beta. 99% GPS reliability solved for iOS background tracking.</p>
          </div>
          <div className="dd-advantage-card">
            <div className="dd-advantage-icon">📈</div>
            <h4>Network Effects</h4>
            <p>Every participant becomes a data point. Historical results create lifetime engagement.</p>
          </div>
          <div className="dd-advantage-card">
            <div className="dd-advantage-icon">🎯</div>
            <h4>White-Label Engine</h4>
            <p>Rapid deployment for new events. Consistent quality across all platforms.</p>
          </div>
        </div>
      </section>

      {/* Market Analysis */}
      <section className="dd-section dd-section-dark">
        <h2>📈 Market Position</h2>
        <div className="dd-market-grid">
          <div className="dd-market-card">
            <h4>SA Mass Participation Events</h4>
            <div className="dd-market-stat">
              <span className="dd-stat-value">R4.4B+</span>
              <span className="dd-stat-label">Total Market Value</span>
            </div>
            <p>660,000+ annual participants</p>
          </div>
          <div className="dd-market-card">
            <h4>Current Market Share</h4>
            <div className="dd-market-stat">
              <span className="dd-stat-value">60,000+</span>
              <span className="dd-stat-label">Athletes Served</span>
            </div>
            <p>~10% of major event market</p>
          </div>
          <div className="dd-market-card">
            <h4>Premier Events</h4>
            <div className="dd-market-stat">
              <span className="dd-stat-value">4+</span>
              <span className="dd-stat-label">Major Annual Events</span>
            </div>
            <p>Including SA's largest cycling &amp; running events</p>
          </div>
          <div className="dd-market-card highlight">
            <h4>Expansion Path</h4>
            <div className="dd-market-stat">
              <span className="dd-stat-value">AFRICA</span>
              <span className="dd-stat-label">Regional Expansion Ready</span>
            </div>
            <p>East Africa, triathlon, VIP ticketing</p>
          </div>
        </div>
      </section>

      {/* Consulting Services */}
      <section className="dd-section">
        <h2>💼 Yellow Mantis Consulting Services</h2>
        <div className="dd-services-grid">
          <div className="dd-service-card">
            <h4>Rapid POC Development</h4>
            <p>2-4 week proof-of-concept builds for enterprise validation</p>
          </div>
          <div className="dd-service-card">
            <h4>AI Certification</h4>
            <p>AI implementation auditing and regulatory compliance</p>
          </div>
          <div className="dd-service-card">
            <h4>Technical Due Diligence</h4>
            <p>Investor-grade technology assessment for acquisitions</p>
          </div>
          <div className="dd-service-card">
            <h4>Full-Stack Development</h4>
            <p>Ruby, React, Python, Salesforce integration expertise</p>
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
              <span>LIVE IN PRODUCTION - Revenue generating</span>
            </div>
            <div className="dd-highlight-item">
              <span className="dd-highlight-icon">✅</span>
              <span>60,000+ athletes served across premier events</span>
            </div>
            <div className="dd-highlight-item">
              <span className="dd-highlight-icon">✅</span>
              <span>99.9% uptime over 12 months</span>
            </div>
            <div className="dd-highlight-item">
              <span className="dd-highlight-icon">✅</span>
              <span>Mobile apps ready for app store submission</span>
            </div>
            <div className="dd-highlight-item">
              <span className="dd-highlight-icon">✅</span>
              <span>Proven enterprise integration capability</span>
            </div>
          </div>
          <div className="dd-valuation-box operational">
            <span className="dd-val-label">Status</span>
            <span className="dd-val-final">OPERATIONAL</span>
            <span className="dd-val-status">Production + Revenue</span>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="dd-navigation">
        <Link to="/due-diligence/boaz" className="dd-nav-btn">
          ← Previous: Boaz Holdings
        </Link>
        <Link to="/due-diligence" className="dd-nav-btn primary">
          View Summary →
        </Link>
      </section>
    </div>
  );
}

export default DueDiligenceYellowMantis;
