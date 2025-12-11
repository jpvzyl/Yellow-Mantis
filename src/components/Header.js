import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MantisIcon from './MantisIcon';
import './Header.css';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/introduction-letter', label: 'Introduction' },
    { path: '/pitch-deck', label: 'Pitch Deck' },
    { path: '/quantum-guide', label: 'Quantum Guide' },
    { path: '/full-features', label: 'Features' }
  ];

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav-container">
        <Link to="/" className="logo-container">
          <MantisIcon size={36} className="logo-icon" />
          <span className="logo-text">Yellow Mantis</span>
        </Link>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link 
                to={link.path} 
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-cta">
          <a href="mailto:jp@yellow-mantis.com" className="btn btn-primary">
            Contact Us
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;

