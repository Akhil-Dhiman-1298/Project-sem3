import React, { useState, useRef, useEffect } from 'react';
import './LoginPage.css';

function LoginPage({ onLogin, darkMode, goToSignUp }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const handleLogin = () => {
    let role = '';

    if (username === 'admin' && password === '686admin123') {
      role = 'admin';
    } else if (username === 'leader' && password === '686leader123') {
      role = 'leader';
    } else if (username === 'user' && password === '686user123') {
      role = 'user';
    } else {
      alert('Invalid username or password');
      return;
    }

    onLogin(role);
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
    <div className={`login-page ${darkMode ? 'dark-mode' : ''}`}>  {/* 🔥 FIX: "dark-mode" */}
      <div className="login-card">
        <h1>ClubPilot</h1>
        <p>Sign in to your account</p>

        <input
          ref={usernameRef}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleUsernameKeyDown}
        />

        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handlePasswordKeyDown}
        />

        <button onClick={handleLogin}>Sign In</button>

        <div className="login-footer">
          <p>
            Don't have an account?{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); goToSignUp(); }}>
              Sign Up
            </a>
          </p>
        </div>

        <div className="demo-creds">
          <p>Demo Credentials:</p>
          <span>admin / 686admin123</span>
          <span>leader / 686leader123</span>
          <span>user / 686user123</span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;