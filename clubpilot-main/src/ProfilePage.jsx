import React, { useState } from 'react';
import './ProfilePage.css';

function ProfilePage({ darkMode, role, goToLanding }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    name: role === 'admin' ? 'Admin User' : role === 'leader' ? 'Club Leader' : role === 'user' ? 'Club Member' : 'Guest',
    email: role === 'admin' ? 'admin@club.com' : role === 'leader' ? 'leader@club.com' : role === 'user' ? 'user@club.com' : 'guest@club.com',
    role: role || 'Guest',
    joinDate: '15 Jan 2024',
    bio: role === 'admin' ? 'Club Administrator & Founder' : role === 'leader' ? 'Event Organizer & Club Leader' : role === 'user' ? 'Active Club Member' : 'New Member',
    location: 'New Delhi, India',
    eventsAttended: role === 'admin' ? 24 : role === 'leader' ? 18 : 7,
    eventsOrganized: role === 'admin' ? 12 : role === 'leader' ? 8 : 0,
    memberSince: 'Jan 2024',
  });

  if (!role) {
    goToLanding();
    return null;
  }

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className={`profile-page ${darkMode ? 'dark-mode' : ''}`}>
      <div className="profile-container">
        {/* 🔥 Header */}
        <div className="profile-header-top">
          <div className="profile-avatar" onClick={() => setIsEditing(true)}>
            <span>{userData.name.charAt(0).toUpperCase()}</span>
          </div>
          <div className="profile-header-info">
            <h2>{userData.name}</h2>
            <p>
              <span className="role-badge">{userData.role}</span>
              <span className="profile-location">
                <i className="fa-solid fa-location-dot"></i> {userData.location}
              </span>
            </p>
          </div>
          <button className="btn-back" onClick={goToLanding}>
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>
        </div>

        {/* 🔥 Stats */}
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-number">{userData.eventsAttended}</span>
            <span className="stat-label">Events Attended</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">{userData.eventsOrganized}</span>
            <span className="stat-label">Events Organized</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">{userData.memberSince}</span>
            <span className="stat-label">Member Since</span>
          </div>
        </div>

        {/* 🔥 Sidebar + Content Layout */}
        <div className="profile-layout">
          {/* Sidebar */}
          <div className="profile-sidebar">
            <button 
              className={`sidebar-tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <i className="fa-regular fa-user"></i> Profile
            </button>
            <button 
              className={`sidebar-tab ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <i className="fa-solid fa-gear"></i> Settings
            </button>
            <button 
              className={`sidebar-tab ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              <i className="fa-regular fa-clock"></i> Activity
            </button>
          </div>

          {/* Content */}
          <div className="profile-content">
            {activeTab === 'profile' && (
              <div className="profile-info">
                <div className="info-item">
                  <label>Full Name</label>
                  {isEditing ? (
                    <input type="text" name="name" value={userData.name} onChange={handleChange} />
                  ) : (
                    <p>{userData.name}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Email</label>
                  {isEditing ? (
                    <input type="email" name="email" value={userData.email} onChange={handleChange} />
                  ) : (
                    <p>{userData.email}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Bio</label>
                  {isEditing ? (
                    <textarea name="bio" value={userData.bio} onChange={handleChange} rows="3" />
                  ) : (
                    <p>{userData.bio}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Location</label>
                  {isEditing ? (
                    <input type="text" name="location" value={userData.location} onChange={handleChange} />
                  ) : (
                    <p><i className="fa-solid fa-location-dot"></i> {userData.location}</p>
                  )}
                </div>
                {isEditing && (
                  <div className="profile-actions">
                    <button className="btn-save" onClick={handleSave}>
                      <i className="fa-regular fa-floppy-disk"></i> Save Changes
                    </button>
                    <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="settings-section">
                <div className="setting-item">
                  <div className="setting-icon"><i className="fa-solid fa-moon"></i></div>
                  <div className="setting-content">
                    <h4>Dark Mode</h4>
                    <p>Toggle dark mode theme</p>
                  </div>
                  <div className="setting-toggle">
                    <label className="toggle-switch">
                      <input type="checkbox" checked={darkMode} onChange={() => {}} />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
                <div className="setting-item">
                  <div className="setting-icon"><i className="fa-solid fa-bell"></i></div>
                  <div className="setting-content">
                    <h4>Notifications</h4>
                    <p>Manage notification preferences</p>
                  </div>
                  <button className="setting-btn">Manage</button>
                </div>
                <div className="setting-item">
                  <div className="setting-icon"><i className="fa-solid fa-shield"></i></div>
                  <div className="setting-content">
                    <h4>Privacy</h4>
                    <p>Control your privacy settings</p>
                  </div>
                  <button className="setting-btn">Manage</button>
                </div>
                <div className="setting-item">
                  <div className="setting-icon"><i className="fa-solid fa-key"></i></div>
                  <div className="setting-content">
                    <h4>Change Password</h4>
                    <p>Update your account password</p>
                  </div>
                  <button className="setting-btn">Change</button>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="activity-section">
                <div className="activity-item">
                  <div className="activity-icon"><i className="fa-solid fa-calendar-check"></i></div>
                  <div className="activity-content">
                    <h4>Joined Tech Meetup 2026</h4>
                    <p>2 days ago</p>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon"><i className="fa-solid fa-calendar-plus"></i></div>
                  <div className="activity-content">
                    <h4>Created Cultural Fest</h4>
                    <p>5 days ago</p>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon"><i className="fa-solid fa-user-plus"></i></div>
                  <div className="activity-content">
                    <h4>Joined Club Pilot</h4>
                    <p>2 months ago</p>
                  </div>
                </div>
                <div className="activity-empty">
                  <p>More activities coming soon...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;