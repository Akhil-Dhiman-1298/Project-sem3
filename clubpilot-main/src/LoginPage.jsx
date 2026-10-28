import React, { useState, useRef, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './LoginPage.css';
import { useTheme } from './ThemeContext';

function LoginPage({ onLogin, goToSignUp }) {
  const { darkMode } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [errors, setErrors] = useState({ username: '', password: '', general: '' });

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    usernameRef.current?.focus();
    AOS.init({ duration: 900, easing: 'ease-out-cubic', once: true });
  }, []);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();

    let newErrors = { username: '', password: '', general: '' };
    let hasError = false;

    if (!username.trim()) {
      newErrors.username = 'Username is required';
      hasError = true;
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setErrors({ username: '', password: '', general: '' });
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        setErrors({ username: '', password: '', general: 'Invalid username or password' });
        setLoading(false);
        return;
      }

      const user = await res.json();
      
      sessionStorage.setItem('username', user.username);
      sessionStorage.setItem('userRole', user.role);
      if (user.member_id) {
        sessionStorage.setItem('currentMemberId', user.member_id);
      }

      onLogin(user.role, user.member_id);

    } catch (err) {
      console.error(err);
      setErrors({ username: '', password: '', general: 'Server error. Backend is offline.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`login-page ${darkMode ? 'dark-mode' : ''}`}>
      <div className="login-shell">
        
        <div className="login-intro">
          <div className="login-intro-content" data-aos="fade-up" data-aos-delay="150">
            <div className="login-wordmark">Club<span>Pilot</span></div>
            <h1>Ready to <span>pilot your CLUB?</span></h1>
            <p>Stay connected with your club, keep track of your responsibilities, and know exactly what needs your attention.</p>
            <div className="login-highlights">
              <div data-aos="fade-up" data-aos-delay="300"><strong>✓</strong><span>Personal task tracking</span></div>
              <div data-aos="fade-up" data-aos-delay="400"><strong>✓</strong><span>Club events at a glance</span></div>
              <div data-aos="fade-up" data-aos-delay="500"><strong>✓</strong><span>Role-based experience</span></div>
            </div>
          </div>
        </div>

        <form className="login-card" onSubmit={handleLogin} data-aos="fade-left" data-aos-duration="1000">
          <div className="login-card-header">
            <p className="login-kicker">WELCOME BACK</p>
            <h2>Sign in to ClubPilot</h2>
            <p>Use your account credentials to continue.</p>
          </div>

          {/* ✅ Label hatadiya, sirf placeholder rakha */}
          <input
            id="username"
            ref={usernameRef}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (errors.username || errors.general) setErrors({ ...errors, username: '', general: '' });
            }}
            className={errors.username || errors.general ? 'input-error' : ''}
            style={{ marginTop: '16px' }} // Thoda gap diya header ke baad
          />
          <div className="error-space">
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>

          <input
            id="password"
            ref={passwordRef}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password || errors.general) setErrors({ ...errors, password: '', general: '' });
            }}
            className={errors.password || errors.general ? 'input-error' : ''}
          />
          <div className="error-space">
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div style={{ minHeight: '58px', display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            {errors.general && (
              <div className="general-error-box" style={{ width: '100%', margin: 0 }}>
                {errors.general}
              </div>
            )}
          </div>

          <button className="login-submit" type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'} <span>→</span>
          </button>

          <div className="login-footer">
            <p>
              Don't have an account?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); goToSignUp(); }}>
                Create one
              </a>
            </p>
          </div>

          <div className="demo-creds">
            <div className="demo-title">
              <span>Demo access</span>
              <small>For project testing</small>
            </div>
            <div className="credential-row"><span>Admin</span><code>admin / 686admin123</code></div>
            <div className="credential-row"><span>Leader</span><code>leader / 686leader123</code></div>
            <div className="credential-row"><span>User 1</span><code>user1 / 686user1</code></div>
            <div className="credential-row"><span>User 2</span><code>user2 / 686user2</code></div>
            <div className="credential-row"><span>Core Member 1</span><code>member1 / 686member1</code></div>
          </div>
        </form>

      </div>
    </div>
  );
}

export default LoginPage;