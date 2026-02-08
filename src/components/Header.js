import React, { useState, useEffect } from 'react';
import MantisIcon from './MantisIcon';
import './Header.css';

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav-container">
        <a href="/" className="logo-container">
          <MantisIcon size={36} className="logo-icon" />
          <span className="logo-text">Yellow Mantis</span>
        </a>

        <div className="nav-cta">
          <a href="#contact" onClick={scrollToContact} className="btn btn-primary">
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
