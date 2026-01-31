import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import BusinessCycle from './components/BusinessCycle';
import ProductsServices from './components/ProductsServices';
import Capabilities from './components/Capabilities';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import CustomCursor from './components/CustomCursor';
import './App.css';

function App() {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('section, nav, footer');
    elements.forEach(el => {
      el.classList.add('fade-section');
      observer.observe(el);
    });

    // Fallback to ensure visibility if observer fails or on specific browsers
    const fallbackTimeout = setTimeout(() => {
      elements.forEach(el => {
        if (!el.classList.contains('visible')) {
          el.classList.add('visible');
        }
      });
    }, 1000); // 1 second fallback

    return () => {
      elements.forEach(el => observer.unobserve(el));
      clearTimeout(fallbackTimeout);
    };
  }, []);

  return (
    <div className="app-container">
      <CustomCursor />
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <BusinessCycle />
        <ProductsServices />
        <Capabilities />
      </main>
      <Footer />
    </div>
  );
}

export default App;
