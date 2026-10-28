import React, { useState } from 'react';
import './LoginPage.css';
import { useTheme } from './ThemeContext';

function SignUpPage({ onSignUp, goToLogin }) {
  const { darkMode } = useTheme();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // ✅ Errors State
  const [errors, setErrors] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '', 
    general: '' 
  });

  const handleSignUp = (e) => {
    if (e) e.preventDefault(); // ✅ Reload roko

    // ✅ Validation
    let newErrors = { username: '', email: '', password: '', confirmPassword: '', general: '' };
    let hasError = false;

    if (!username.trim()) {
      newErrors.username = 'Username is required';
      hasError = true;
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      hasError = true;
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
      hasError = true;
    }
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirm Password is required';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ ...newErrors, confirmPassword: 'Passwords do not match' });
      return;
    }

    // Agar sab sahi hai
    setErrors({ username: '', email: '', password: '', confirmPassword: '', general: '' });
    onSignUp('user');
  };

  return (
    <div className={`login-page ${darkMode ? 'dark-mode' : ''}`}>
      <div className="login-shell">

        <div className="login-intro">
          <div className="login-intro-content" data-aos="fade-up" data-aos-delay="150">
            <div className="login-wordmark">
              Club<span>Pilot</span>
            </div>
            <h1>Join the <span>ClubPilot community.</span></h1>
            <p>Create your account, join your club, and start managing your responsibilities today.</p>
            <div className="login-highlights">
              <div data-aos="fade-up" data-aos-delay="300"><strong>✓</strong><span>Personal task tracking</span></div>
              <div data-aos="fade-up" data-aos-delay="400"><strong>✓</strong><span>Club events at a glance</span></div>
              <div data-aos="fade-up" data-aos-delay="500"><strong>✓</strong><span>Role-based experience</span></div>
            </div>
          </div>
        </div>

        {/* ✅ Form tag me convert kiya */}
        <form className="login-card" onSubmit={handleSignUp} data-aos="fade-left" data-aos-duration="1000">
          <div className="login-card-header">
            <p className="login-kicker">GET STARTED</p>
            <h2>Create your account</h2>
            <p>Fill in your details to join ClubPilot.</p>
          </div>

          {/* Username */}
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (errors.username) setErrors({ ...errors, username: '' });
            }}
            className={errors.username ? 'input-error' : ''}
            style={{ marginTop: '16px' }}
          />
          <div className="error-space">
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>

          {/* Email */}
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            className={errors.email ? 'input-error' : ''}
          />
          <div className="error-space">
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          {/* Password */}
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
            className={errors.password ? 'input-error' : ''}
          />
          <div className="error-space">
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
            }}
            className={errors.confirmPassword ? 'input-error' : ''}
          />
          <div className="error-space">
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>

          <button className="login-submit" type="submit">
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

        </form>
      </div>
    </div>
  );
}

export default SignUpPage;