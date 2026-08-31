import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './clubpilot.css';

import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Hero from './Hero';
import Features from './Features';
import Steps from './Steps';
import About from './About';
import BottomCTA from './BottomCTA';
import Footer from './Footer';

function LandingPage({ role, onLogout, goToEvents }) {
  useEffect(() => {
    AOS.init({
      once: false,
      mirror: true,
      duration: 600,
      easing: 'ease-out'
    });

    const scrollContainer = document.getElementById('mainContentScroll');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', () => AOS.refresh());
    }

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function(e) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }, []);

  return (
    <div className="main-layout">
      <Sidebar goToEvents={goToEvents} />
      <main className="content-area" id="mainContentScroll">
        <Topbar role={role} onLogout={onLogout} />
        <Hero />
        <Features />
        <Steps />
        <About />
        <BottomCTA />
        <Footer />
      </main>
    </div>
  );
}

export default LandingPage;