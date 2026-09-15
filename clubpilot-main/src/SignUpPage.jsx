import React, { useState } from 'react';
import './LoginPage.css';

function SignUpPage({ onSignUp, darkMode, goToLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (!username || !email || !password || !confirmPassword) {
      alert('Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    onSignUp('user');
  };

  return (
    <div className={`login-page ${darkMode ? 'dark-mode' : ''}`}>
      <div className="login-shell">

        {/* ================= LEFT SIDE ================= */}

        <div className="login-intro">
          <div className="login-intro-content" data-aos="fade-up" data-aos-delay="150">
            <div className="login-wordmark">
              Club<span>Pilot</span>
            </div>

            <h1>
              Join the <span>ClubPilot community.</span>
            </h1>

            <p>
              Create your account, join your club, and start managing your responsibilities today.
            </p>

            <div className="login-highlights">
              <div data-aos="fade-up" data-aos-delay="300">
                <strong>✓</strong>
                <span>Personal task tracking</span>
              </div>

              <div data-aos="fade-up" data-aos-delay="400">
                <strong>✓</strong>
                <span>Club events at a glance</span>
              </div>

              <div data-aos="fade-up" data-aos-delay="500">
                <strong>✓</strong>
                <span>Role-based experience</span>
              </div>
            </div>
          </div>
        </div>


        {/* ================= SIGNUP CARD ================= */}

        <div className="login-card" data-aos="fade-left" data-aos-duration="1000">

          <div className="login-card-header">
            <p className="login-kicker">GET STARTED</p>
            <h2>Create your account</h2>
            <p>Fill in your details to join ClubPilot.</p>
          </div>


          
          <input
            id="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
          />


          
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
          />


          
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
          />


          
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
          />


          <button className="login-submit" onClick={handleSignUp}>
            Sign Up <span>→</span>
          </button>


          <div className="login-footer">
            <p>
              Already have an account?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); goToLogin(); }}>
                Login
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SignUpPage;