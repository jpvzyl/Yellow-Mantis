import React from 'react';
import { Link } from 'react-router-dom';
import MantisIcon from './MantisIcon';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <MantisIcon size={28} className="footer-logo" />
          <span className="footer-name">Yellow Mantis</span>
        </div>
        
        <nav className="footer-nav">
          <Link to="/introduction-letter">Introduction</Link>
          <Link to="/pitch-deck">Pitch Deck</Link>
          <Link to="/full-features">Features</Link>
        </nav>
        
        <div className="footer-badges">
          <span className="footer-badge">🚀 Innovative</span>
          <span className="footer-badge">💡 Creative</span>
          <span className="footer-badge">⚡ Fast</span>
        </div>
        
        <p className="footer-copyright">
          © {currentYear} Yellow Mantis. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

