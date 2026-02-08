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
        <p className="landing-hero-tagline">Technology Development Company</p>
        <p className="landing-hero-subtitle">
          We design, build, and operate full-stack software across web, mobile, cloud, and frontier R&D.
          We build and own IP — from quantum–classical computing bridges to AI-native robotics, from autonomous
          financial systems to enterprise platforms at scale. We take ideas from concept through to production
          and maintain the codebases.
        </p>
      </section>

      {/* Summary: What We Do */}
      <section className="landing-section">
        <h2 className="landing-section-title">What We Do</h2>
        <p className="landing-section-intro">
          We are a full-stack development company that spans every layer — backend APIs and services, web and mobile
          front ends, AI/ML integration, quantum hardware integration, biometrics, regulatory-compliant fintech, and
          cloud infrastructure. We prove at scale and cover many domains.
        </p>
        <div className="landing-capabilities">
          <div className="landing-cap-card">
            <span className="landing-cap-icon" aria-hidden="true">⚛️</span>
            <h3>Quantum–Classical Bridges</h3>
            <p>Working bridge between classical software and quantum hardware, with live demos on real quantum systems. Automatic problem classification, graceful fallback to classical solvers.</p>
          </div>
          <div className="landing-cap-card">
            <span className="landing-cap-icon" aria-hidden="true">🤖</span>
            <h3>AI Consciousness & Robotics</h3>
            <p>Persistent AI personality with memory, self-reflection, and emotional state. Natural-language and voice control for robot actions. Hardware abstraction for simulation and real devices.</p>
          </div>
          <div className="landing-cap-card">
            <span className="landing-cap-icon" aria-hidden="true">🧪</span>
            <h3>Dual-Model AI QA</h3>
            <p>One model for analysis, another for validation. Application digital twin for risk-aware QA. Quantum-inspired test optimization and codebase-aware test generation.</p>
          </div>
          <div className="landing-cap-card">
            <span className="landing-cap-icon" aria-hidden="true">📊</span>
            <h3>Multi-Agent Financial Systems</h3>
            <p>Specialized AI agents for document intelligence, cash-flow optimization, and strategic recommendation. Multi-provider LLM support, accuracy and auditability from day one.</p>
          </div>
          <div className="landing-cap-card">
            <span className="landing-cap-icon" aria-hidden="true">🔐</span>
            <h3>NCA-Compliant Lending</h3>
            <p>Full lending logic aligned with National Credit Act–style rules: interest caps, affordability assessment, reckless-lending prevention. Mandate and payment architecture ready for PASA-style integration.</p>
          </div>
          <div className="landing-cap-card">
            <span className="landing-cap-icon" aria-hidden="true">👤</span>
            <h3>Biometrics & Attendance</h3>
            <p>Face-based verification, location verification, kiosk and mobile flows. End-to-end backend, mobile app, and web admin with offline support.</p>
          </div>
          <div className="landing-cap-card">
            <span className="landing-cap-icon" aria-hidden="true">🏢</span>
            <h3>Enterprise Platforms</h3>
            <p>Large-scale participant systems, CRM/ERP-style systems, event and participant platforms. High reliability, deep integrations, production at scale.</p>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="landing-section landing-section-dark">
        <h2 className="landing-section-title">What Sets Us Apart</h2>
        <div className="landing-differentiators">
          <div className="landing-diff-card">
            <h3>Frontier R&D and Production</h3>
            <p>We combine “impossible” R&D with “boring, reliable” production — quantum computing, AI robotics, and enterprise platforms at scale in one house.</p>
          </div>
          <div className="landing-diff-card">
            <h3>Compliance Built In</h3>
            <p>Regulatory and compliance as core logic, not an afterthought. Lending, affordability, payment readiness, and audit-friendly design from day one.</p>
          </div>
          <div className="landing-diff-card">
            <h3>AI as Architecture</h3>
            <p>AI in the architecture — agents, pipelines, and control flows — not a single chatbot. Dual-model QA, multi-agent systems, natural-language control.</p>
          </div>
          <div className="landing-diff-card">
            <h3>Full Ownership of the Stack</h3>
            <p>Backend, frontend, mobile, cloud, and where applicable hardware. One team that owns the entire chain from database to UI to quantum hardware.</p>
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="landing-section">
        <h2 className="landing-section-title">By the Numbers</h2>
        <p className="landing-section-intro">
          Our portfolio of owned and delivered work. Conservative IP valuation across projects.
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

      {/* Contact Us */}
      <section id="contact" className="landing-contact">
        <h2 className="landing-contact-title">Contact Us</h2>
        <div className="landing-contact-block">
          <p className="landing-contact-role">Founder</p>
          <p className="landing-contact-name">Jp van Zyl</p>
          <a href="mailto:Jp@yellow-mantis.com" className="landing-contact-email">
            Jp@yellow-mantis.com
          </a>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
