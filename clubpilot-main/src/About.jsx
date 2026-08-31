import React from 'react';

function About() {
  return (
    <section className="about-section" id="about-section">
      <div className="container">
        <div className="about-header" data-aos="zoom-out">
          <h2>About <span>Club Pilot</span></h2>
          <p>We're on a mission to help college clubs across India streamline their operations, manage members effectively, and grow their communities with modern technology.</p>
        </div>

        <div className="about-grid">
          <div className="about-content" data-aos="fade-right" style={{ textAlign: 'left' }}>
            <h3>Our Mission</h3>
            <p>Club Pilot was born from a simple observation: college clubs across India were struggling with manual processes, scattered data, and inefficient management systems.</p>
            <p>We set out to create a comprehensive platform that would help club leaders focus on what they do best – building communities and organizing events – while we handle the administrative complexities.</p>
            <p>Today, we're proud to serve hundreds of clubs across India, helping them manage thousands of members and grow their communities with confidence.</p>
          </div>

          <div className="about-features" data-aos="fade-left" style={{ textAlign: 'left' }}>
            <h3>Why Club Pilot?</h3>
            <ul className="about-list">
              <li><i className="fa-solid fa-circle-check"></i> Built specifically for college clubs</li>
              <li><i className="fa-solid fa-circle-check"></i> Free for student clubs &amp; organizations</li>
              <li><i className="fa-solid fa-circle-check"></i> Complete member &amp; event management</li>
              <li><i className="fa-solid fa-circle-check"></i> Real-time analytics &amp; attendance tracking</li>
              <li><i className="fa-solid fa-circle-check"></i> Dedicated support for club leaders</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;