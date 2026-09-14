import React, { useState, useRef, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './LoginPage.css';

function LoginPage({ onLogin, darkMode, goToSignUp }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    usernameRef.current?.focus();

    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
    });

    AOS.refresh();
  }, []);

  const handleLogin = () => {
    let role = '';
    let memberId = null;

    if (username === 'admin' && password === '686admin123') {
      role = 'admin';
    } else if (username === 'leader' && password === '686leader123') {
      role = 'leader';
    } else if (username === 'user' && password === '686user123') {
      role = 'user';
    } else if (username === 'member1' && password === '686member1') {
      role = 'core-member';
      memberId = 1;
    } else if (username === 'member2' && password === '686member2') {
      role = 'core-member';
      memberId = 2;
    } else if (username === 'member3' && password === '686member3') {
      role = 'core-member';
      memberId = 3;
    } else if (username === 'member4' && password === '686member4') {
      role = 'core-member';
      memberId = 4;
    } else {
      alert('Invalid username or password');
      return;
    }

    onLogin(role, memberId);
  };

  const handleUsernameKeyDown = (e) => {
    if (e.key === 'Enter') {
      passwordRef.current?.focus();
    }
  };

  const handlePasswordKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className={`login-page ${darkMode ? 'dark-mode' : ''}`}>
      <div className="login-shell">

        {/* ================= LEFT SIDE ================= */}

        <div className="login-intro">

          <div
            className="login-intro-content"
            data-aos="fade-up"
            data-aos-delay="150"
          >

            {/* Main wordmark */}
            <div className="login-wordmark">
              Club<span>Pilot</span>
            </div>

            {/* Heading */}
            <h1>
              Ready to <span>pilot your CLUB?</span>
            </h1>

            {/* Description */}
            <p>
              Stay connected with your club, keep track of your
              responsibilities, and know exactly what needs your attention.
            </p>

            {/* Highlights */}
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


        {/* ================= LOGIN CARD ================= */}

        <div
          className="login-card"
          data-aos="fade-left"
          data-aos-duration="1000"
        >

          <div className="login-card-header">
            <p className="login-kicker">WELCOME BACK</p>

            <h2>Sign in to ClubPilot</h2>

            <p>
              Use your account credentials to continue.
            </p>
          </div>


          <label htmlFor="username">
            Username
          </label>

          <input
            id="username"
            ref={usernameRef}
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleUsernameKeyDown}
          />


          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            ref={passwordRef}
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handlePasswordKeyDown}
          />


          <button
            className="login-submit"
            onClick={handleLogin}
          >
            Sign In <span>→</span>
          </button>


          <div className="login-footer">
            <p>
              Don't have an account?{' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goToSignUp();
                }}
              >
                Create one
              </a>
            </p>
          </div>


          {/* ================= DEMO CREDENTIALS ================= */}

          <div className="demo-creds">

            <div className="demo-title">
              <span>Demo access</span>
              <small>For project testing</small>
            </div>

            <div className="credential-row">
              <span>Admin</span>
              <code>admin / 686admin123</code>
            </div>

            <div className="credential-row">
              <span>Leader</span>
              <code>leader / 686leader123</code>
            </div>

            <div className="credential-row">
              <span>User</span>
              <code>user / 686user123</code>
            </div>

            <div className="credential-row">
              <span>Core Member 1</span>
              <code>member1 / 686member1</code>
            </div>

            <div className="credential-row">
              <span>Core Member 2</span>
              <code>member2 / 686member2</code>
            </div>

            <div className="credential-row">
              <span>Core Member 3</span>
              <code>member3 / 686member3</code>
            </div>

            <div className="credential-row">
              <span>Core Member 4</span>
              <code>member4 / 686member4</code>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;