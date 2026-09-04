import React from 'react';

function BottomCTA({ role, goToLogin, goToEvents }) {
  const handleClick = () => {
    if (role) {
      goToEvents(); 
    } else {
      goToLogin();  
    }
  };

  return (
    <section className="bottom-cta">
      <div className="bottom-cta-content" data-aos="zoom-in" data-aos-duration="800">
        <h2>{role ? 'Welcome back to ClubPilot!' : 'Ready to lead your club?'}</h2>
        <p>
          {role 
            ? 'Manage your events, members, and activities all in one place. Your club dashboard is waiting for you!' 
            : 'Empower your club leaders with the right tools. Start managing your club efficiently today.'}
        </p>
        <button className="btn" onClick={handleClick}>
          {role ? 'Go to Events' : 'Get Started Now'}
        </button>
      </div>
    </section>
  );
}

export default BottomCTA;