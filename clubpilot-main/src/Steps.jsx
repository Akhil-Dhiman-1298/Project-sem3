import React from 'react';

function Steps() {
  return (
    <section className="steps-section">
      <div className="container">
        <div className="steps-header" data-aos="fade-up">
          <h2>Get Started in <span>3 Simple Steps</span></h2>
          <p>Set up your club on ClubPilot in minutes, not days.</p>
        </div>

        <div className="steps-grid">
          <div className="step-card" data-aos="fade-up" data-aos-delay="100">
            <div className="step-icon"><i className="fa-solid fa-building-columns"></i></div>
            <h3>Manage your club</h3>
            <p>Set up your club profile, add branches, and customize your settings.</p>
          </div>

          <div className="step-card" data-aos="fade-up" data-aos-delay="200">
            <div className="step-icon"><i className="fa-solid fa-user-plus"></i></div>
            <h3>Add Members &amp; Events</h3>
            <p>Create events, add members, and set up your club schedules.</p>
          </div>

          <div className="step-card" data-aos="fade-up" data-aos-delay="300">
            <div className="step-icon"><i className="fa-solid fa-rocket"></i></div>
            <h3>Grow your Club</h3>
            <p>Track performance, manage finances, and take your club to the next level.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Steps;