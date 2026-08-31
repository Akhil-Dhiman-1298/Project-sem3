import React from 'react';

function Topbar({ darkMode, setDarkMode, goToLogin }) {
  return (
    <div className={`topbar ${darkMode ? 'dark' : ''}`}>
      <button
        className="topbar-btn"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀ Light" : "🌙 Dark"}
      </button>

      {/* 🔥 FIX: onClick sahi se add karo */}
      <a 
        href="#" 
        className="topbar-btn" 
        onClick={(e) => {
          e.preventDefault();
          goToLogin();
        }}
      >
        Login
      </a>
      <button className="topbar-btn">Sign-Up</button>
    </div>
  );
}

export default Topbar;