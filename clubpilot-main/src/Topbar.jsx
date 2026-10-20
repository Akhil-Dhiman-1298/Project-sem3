import React from 'react';
import { useTheme } from './ThemeContext';
function Topbar({ goToLogin, role, onLogout, goToSignUp }) {
  const { darkMode, setDarkMode, toggleTheme } = useTheme();
  return (
    <div className={`topbar ${darkMode ? 'dark' : ''}`}>
      <button className="topbar-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀ Light" : "🌙 Dark"}
      </button>

      {role ? (
        <button className="topbar-btn" onClick={onLogout}>
          Logout
        </button>
      ) : (
        <>
          <a href="#" className="topbar-btn" onClick={(e) => { e.preventDefault(); goToLogin(); }}>
            Login
          </a>
          <button className="topbar-btn" onClick={goToSignUp}> 
            Sign-Up
          </button>
        </>
      )}
    </div>
  );
}

export default Topbar;