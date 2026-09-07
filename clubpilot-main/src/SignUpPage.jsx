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
    <div className={`login-page ${darkMode ? 'dark-mode' : ''}`}>  {/* 🔥 darkMode class */}
      <div className="login-card">
        <h1>ClubPilot</h1>
        <p>Create your account</p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
        />

        <button onClick={handleSignUp}>Sign Up</button>

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
  );
}

export default SignUpPage;