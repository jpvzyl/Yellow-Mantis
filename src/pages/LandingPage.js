import React from 'react';
import MantisIcon from '../components/MantisIcon';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Hero */}
      <section className="landing-hero">
        <div className="landing-hero-glow" aria-hidden="true" />
        <MantisIcon size={100} className="landing-hero-logo" />
        <h1 className="landing-hero-title">Yellow Mantis</h1>
        <p className="landing-hero-tagline">Technology That Breaks Boundaries</p>
        <p className="landing-hero-subtitle">
          We build the software others call impossible: from classical–quantum bridges to AI-native robotics, 
          from autonomous financial systems to enterprise platforms at scale. No clients or projects named — 
          just capability, IP, and delivery.
        </p>
      </section>

      {/* What We Build */}
      <section className="landing-section">
        <h2 className="landing-section-title">What We Build</h2>
        <p className="landing-section-intro">
          Our IP spans full-stack systems, AI, and frontier R&D. Here’s the kind of ground we cover — 
          without naming products or customers.
        </p>
        <div className="landing-capabilities">
          <div className="landing-cap-card">
            <span className="landing-cap-icon" aria-hidden="true">⚛️</span>
            <h3>Quantum–Classical Bridges</h3>
            <p>Frameworks that let existing applications run on quantum hardware where it matters, with seamless fallbacks. Live demos on real quantum systems.</p>
          </div>
          <div className="landing-cap-card">
            <span className="landing-cap-icon" aria-hidden="true">🤖</span>
            <h3>AI-Native Robotics</h3>
            <p>Affordable, voice-controlled platforms with persistent AI personality, natural-language control, and hardware abstraction for simulation and real devices.</p>
          </div>
          <div className="landing-cap-card">
            <span className="landing-cap-icon" aria-hidden="true">🧪</span>
            <h3>AI-Powered Quality Assurance</h3>
            <p>Dual-model AI pipelines, application digital twins for risk-aware QA, and quantum-inspired test optimization — industry-first combinations.</p>
          </div>
          <div className="landing-cap-card">
            <span className="landing-cap-icon" aria-hidden="true">📊</span>
            <h3>Autonomous Financial Systems</h3>
            <p>Multi-agent AI for document intelligence, cash-flow forecasting, and CFO-level strategy. Built for accuracy and auditability.</p>
          </div>
          <div className="landing-cap-card">
            <span className="landing-cap-icon" aria-hidden="true">🔐</span>
            <h3>Compliant Fintech Engines</h3>
            <p>Full-stack lending and affordability logic built for strict regulation — from interest and fee rules to reckless-lending prevention.</p>
          </div>
          <div className="landing-cap-card">
            <span className="landing-cap-icon" aria-hidden="true">👤</span>
            <h3>Biometrics & Attendance</h3>
            <p>Face verification, location checks, and attendance flows for sites and events — kiosk and mobile, with offline support.</p>
          </div>
          <div className="landing-cap-card">
            <span className="landing-cap-icon" aria-hidden="true">🏢</span>
            <h3>Enterprise Platforms</h3>
            <p>Registration, timing, results, CRM, inventory, and integrations at scale — proven under high traffic and critical uptime.</p>
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="landing-section landing-section-dark">
        <h2 className="landing-section-title">By the Numbers</h2>
        <p className="landing-section-intro">
          Our portfolio of owned and delivered work speaks to depth and breadth. Conservative IP valuation across projects.
        </p>
        <div className="landing-metrics">
          <div className="landing-metric">
            <span className="landing-metric-value">10+</span>
            <span className="landing-metric-label">Technology Projects</span>
          </div>
          <div className="landing-metric">
            <span className="landing-metric-value">400k+</span>
            <span className="landing-metric-label">Lines of Code</span>
          </div>
          <div className="landing-metric">
            <span className="landing-metric-value">R19M – R29M</span>
            <span className="landing-metric-label">Conservative IP Valuation</span>
          </div>
          <div className="landing-metric">
            <span className="landing-metric-value">Full Stack</span>
            <span className="landing-metric-label">Web, Mobile, Cloud, AI</span>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="landing-contact">
        <h2 className="landing-contact-title">Get in Touch</h2>
        <p className="landing-contact-intro">
          For partnerships, build-for-hire, or investment in our capability and IP.
        </p>
        <div className="landing-contact-details">
          <a href="mailto:jp@yellow-mantis.com" className="landing-contact-link">
            jp@yellow-mantis.com
          </a>
          <a href="tel:+27764863294" className="landing-contact-link">
            +27 76 486 3294
          </a>
          <a href="https://yellow-mantis.com" className="landing-contact-link" rel="noopener noreferrer">
            yellow-mantis.com
          </a>
        </div>
        <p className="landing-contact-note">JP van Zyl — Founder</p>
      </section>
    </div>
  );
}

export default LandingPage;
