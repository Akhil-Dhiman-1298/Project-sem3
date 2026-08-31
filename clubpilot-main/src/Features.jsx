import React from 'react';

function Features() {
  return (
    <section className="features-section">
      <div className="container">
        <div className="features-header">
          <h2>Everything <span>Your Club Needs</span></h2>
          <p>Explore all the powerful features built for club leaders and admins.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card feature-card-1" data-aos="fade-right">
            <div className="feature-icon"><i className="fa-solid fa-users"></i></div>
            <h3>Member Management</h3>
            <p>Add, remove, and manage club members with roles &amp; permissions.</p>
          </div>

          <div className="feature-card feature-card-2" data-aos="fade-up">
            <div className="feature-icon"><i className="fa-regular fa-calendar-check"></i></div>
            <h3>Event Planning</h3>
            <p>Schedule events, track RSVPs, and manage budgets with ease.</p>
          </div>

          <div className="feature-card feature-card-3" data-aos="fade-left">
            <div className="feature-icon"><i className="fa-solid fa-credit-card"></i></div>
            <h3>Expense Tracking</h3>
            <p>Track club expenses, generate reports, and stay on budget.</p>
          </div>

          <div className="feature-card feature-card-4" data-aos="fade-right">
            <div className="feature-icon"><i className="fa-solid fa-chart-pie"></i></div>
            <h3>Club Overview</h3>
            <p>Track active members, view analytics, monitor growth &amp; attendance.</p>
          </div>

          <div className="feature-card feature-card-5" data-aos="fade-up">
            <div className="feature-icon"><i className="fa-solid fa-clipboard-check"></i></div>
            <h3>Attendance Management</h3>
            <p>Mark attendance, view history, track graphically &amp; generate reports.</p>
          </div>

          <div className="feature-card feature-card-6" data-aos="fade-left">
            <div className="feature-icon"><i className="fa-solid fa-calendar-days"></i></div>
            <h3>Event Calendar</h3>
            <p>Visual calendar view of all upcoming events, deadlines &amp; important dates.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;