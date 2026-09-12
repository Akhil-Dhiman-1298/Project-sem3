import React from 'react';
import heroImage from "./WhatsApp Image 2026-08-16 at 12.45.51 PM.jpeg";
import darkImage3 from "./watermarked_img_3266336707912256=.png" 
function Hero({ darkMode }) {
  return (
    <section className="page-intro">
      <div className="club-pilot-main-writing">
        <div className="hero-image-wrapper" data-aos="zoom-out">
          <img
            src={darkMode ? darkImage3 : heroImage}
            alt="Logo"
            className="hero-image-top"
          />
        </div>
        <div className="club-pilot-text">Club Pilot</div>

        <h1
          className="club-pilot-the-Complete-part"
          data-aos="fade-up"
          data-aos-duration="900"
          data-aos-delay="100"
        >
          The Complete <span>Club Management System.</span>
        </h1>

        <p
          className="club-pilot-para"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="200"
        >
          Manage members, events, finances &amp; approvals seamlessly. Built for admins and club leaders to work together efficiently.
        </p>
      </div>
    </section>
  );
}

export default Hero;