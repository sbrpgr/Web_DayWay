import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.logo} flicker glitch-text`}>DAYWAY</div>
      <ul className={styles.navLinks}>
        <li className="reveal-item" style={{ animationDelay: '0.1s' }} onClick={() => scrollToSection('about')}>
          <span className="glitch-text energy-line">About</span>
        </li>
        <li className="reveal-item" style={{ animationDelay: '0.3s' }} onClick={() => scrollToSection('products')}>
          <span className="glitch-text energy-line">Products</span>
        </li>
        <li className="reveal-item" style={{ animationDelay: '0.4s' }} onClick={() => scrollToSection('portfolio')}>
          <span className="glitch-text energy-line">Portfolio</span>
        </li>
        <li className="reveal-item" style={{ animationDelay: '0.5s' }} onClick={() => scrollToSection('contact')}>
          <span className="glitch-text energy-line">Contact</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
