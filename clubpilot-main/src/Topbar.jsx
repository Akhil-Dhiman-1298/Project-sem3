import React from 'react';

function Topbar({ darkMode, setDarkMode, role, goToLogin, goToSignUp, onLogout }) {
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
          <button className="topbar-btn" onClick={goToSignUp}>  {/* 🔥 onClick add */}
            Sign-Up
          </button>
        </>
      )}
    </div>
  );
}

export default Topbar;