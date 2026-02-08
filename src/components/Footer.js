import React from 'react';
import MantisIcon from './MantisIcon';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <a href="/" className="footer-brand">
          <MantisIcon size={28} className="footer-logo" />
          <span className="footer-name">Yellow Mantis</span>
        </a>
        <p className="footer-copyright">
          © {currentYear} Yellow Mantis. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
