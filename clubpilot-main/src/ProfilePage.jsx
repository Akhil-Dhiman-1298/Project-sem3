import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { useTheme } from './ThemeContext';

function ProfilePage({ role, username, goToLanding }) {
  const { darkMode, setDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  
  // ✅ Naya State: Settings ke andar kaunsi sub-setting khuli hai
  const [activeSettingTab, setActiveSettingTab] = useState(null); // null | 'account' | 'notifications' | 'privacy' | 'security'

  const [activeModal, setActiveModal] = useState(null); 

  // Settings States
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  // User Data
  const currentRole = (role || 'user').toLowerCase();
  const currentUsername = username || currentRole;

  let displayName = currentUsername;
  if (currentRole === 'admin') displayName = 'Admin User';
  else if (currentRole === 'leader') displayName = 'Club Leader';
  else if (currentRole === 'core-member') displayName = 'Core Member';
  else if (currentUsername.includes('user') || currentUsername.includes('member')) {
    displayName = currentUsername.charAt(0).toUpperCase() + currentUsername.slice(1);
    if (displayName.includes('user')) displayName = displayName.replace('user', 'User ');
    if (displayName.includes('member')) displayName = displayName.replace('member', 'Member ');
  }

  const [userData, setUserData] = useState({
    name: displayName,
    email: currentRole === 'admin' ? 'admin@club.com' : currentRole === 'leader' ? 'leader@club.com' : `${currentUsername}@club.com`,
    role: currentRole === 'core-member' ? 'Core Member' : currentRole.charAt(0).toUpperCase() + currentRole.slice(1),
    bio: currentRole === 'admin' ? 'Club Administrator & Founder' : currentRole === 'leader' ? 'Event Organizer & Club Leader' : 'Active Club Member',
    location: 'New Delhi, India',
    eventsAttended: currentRole === 'admin' ? 24 : currentRole === 'leader' ? 18 : 7,
    eventsOrganized: currentRole === 'admin' ? 12 : currentRole === 'leader' ? 8 : 0,
    memberSince: 'Jan 2024',
  });

  useEffect(() => {
    if (!role) goToLanding();
  }, [role, goToLanding]);

  if (!role) return null;

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = () => {
    setActiveModal(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('currentMemberId');
    setActiveModal(null);
    goToLanding();
  };

  return (
    <div className={`profile-page ${darkMode ? 'dark-mode' : ''}`}>
      <div className="profile-container">
        
        {/* Header */}
        <div className="profile-header-top">
          <div className="profile-avatar">
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

        {/* Stats */}
        <div className="profile-stats">
          <div className="stat-item">
            <div className="stat-icon-wrap"><i className="fa-solid fa-calendar-check"></i></div>
            <span className="stat-number">{userData.eventsAttended}</span>
            <span className="stat-label">Events Attended</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-icon-wrap"><i className="fa-solid fa-calendar-plus"></i></div>
            <span className="stat-number">{userData.eventsOrganized}</span>
            <span className="stat-label">Events Organized</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-icon-wrap"><i className="fa-solid fa-clock"></i></div>
            <span className="stat-number">{userData.memberSince}</span>
            <span className="stat-label">Member Since</span>
          </div>
        </div>

        {/* Layout */}
        <div className="profile-layout">
          <div className="profile-sidebar">
            <button className={`sidebar-tab ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => { setActiveTab('profile'); setActiveSettingTab(null); }}>
              <i className="fa-regular fa-user"></i> Profile
            </button>
            <button className={`sidebar-tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => { setActiveTab('settings'); setActiveSettingTab(null); }}>
              <i className="fa-solid fa-gear"></i> Settings
            </button>
            <button className={`sidebar-tab ${activeTab === 'activity' ? 'active' : ''}`} onClick={() => { setActiveTab('activity'); setActiveSettingTab(null); }}>
              <i className="fa-regular fa-clock"></i> Activity
            </button>
          </div>

          <div className="profile-content">
            
            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="profile-info">
                <div className="profile-edit-btn-wrapper">
                  <button className="btn-edit-profile" onClick={() => setActiveModal('edit')}>
                    <i className="fa-solid fa-pen"></i> Edit Profile
                  </button>
                </div>
                <div className="info-item"><label>Full Name</label><p>{userData.name}</p></div>
                <div className="info-item"><label>Email</label><p>{userData.email}</p></div>
                <div className="info-item"><label>Bio</label><p>{userData.bio}</p></div>
                <div className="info-item"><label>Location</label><p><i className="fa-solid fa-location-dot"></i> {userData.location}</p></div>
              </div>
            )}

            {/* SETTINGS TAB (Discord Style Master-Detail) */}
            {activeTab === 'settings' && (
              <div className="settings-section">
                
                {/* 1. Main Menu */}
                {!activeSettingTab && (
                  <div className="settings-menu-list">
                    <div className="setting-item clickable" onClick={() => setActiveSettingTab('account')}>
                      <div className="setting-icon"><i className="fa-solid fa-user"></i></div>
                      <div className="setting-content"><h4>Account</h4><p>Theme, language, and personal info</p></div>
                      <i className="fa-solid fa-chevron-right setting-arrow"></i>
                    </div>

                    <div className="setting-item clickable" onClick={() => setActiveSettingTab('notifications')}>
                      <div className="setting-icon"><i className="fa-solid fa-bell"></i></div>
                      <div className="setting-content"><h4>Notifications</h4><p>Email and push alerts</p></div>
                      <i className="fa-solid fa-chevron-right setting-arrow"></i>
                    </div>

                    <div className="setting-item clickable" onClick={() => setActiveSettingTab('privacy')}>
                      <div className="setting-icon"><i className="fa-solid fa-shield"></i></div>
                      <div className="setting-content"><h4>Privacy & Safety</h4><p>Profile visibility</p></div>
                      <i className="fa-solid fa-chevron-right setting-arrow"></i>
                    </div>

                    <div className="setting-item clickable" onClick={() => setActiveSettingTab('security')}>
                      <div className="setting-icon"><i className="fa-solid fa-lock"></i></div>
                      <div className="setting-content"><h4>Security</h4><p>Password and logout</p></div>
                      <i className="fa-solid fa-chevron-right setting-arrow"></i>
                    </div>
                  </div>
                )}

                {/* 2. Sub-Setting: Account */}
                {activeSettingTab === 'account' && (
                  <div className="sub-setting-view">
                    <button className="btn-sub-back" onClick={() => setActiveSettingTab(null)}>
                      <i className="fa-solid fa-arrow-left"></i> Back to Settings
                    </button>
                    <h3>Account Settings</h3>
                    
                    {/* Personal Info */}
                    <div className="account-info-list">
                      <div className="account-info-row">
                        <span className="info-label">Display Name</span>
                        <span className="info-value">{userData.name}</span>
                      </div>
                      <div className="account-info-row">
                        <span className="info-label">Email Address</span>
                        <span className="info-value">{userData.email}</span>
                      </div>
                      <div className="account-info-row">
                        <span className="info-label">Account Type</span>
                        <span className="info-value">{userData.role}</span>
                      </div>
                    </div>

                    <div className="divider-line"></div>

                    {/* Dark Mode */}
                    <div className="setting-item">
                      <div className="setting-icon"><i className="fa-solid fa-moon"></i></div>
                      <div className="setting-content"><h4>Dark Mode</h4><p>Toggle dark mode theme</p></div>
                      <div className="setting-toggle">
                        <label className="toggle-switch">
                          <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Sub-Setting: Notifications */}
                {activeSettingTab === 'notifications' && (
                  <div className="sub-setting-view">
                    <button className="btn-sub-back" onClick={() => setActiveSettingTab(null)}>
                      <i className="fa-solid fa-arrow-left"></i> Back to Settings
                    </button>
                    <h3>Notifications</h3>
                    
                    <div className="setting-item">
                      <div className="setting-icon"><i className="fa-solid fa-envelope"></i></div>
                      <div className="setting-content"><h4>Email Alerts</h4><p>Get notified about new events via email</p></div>
                      <div className="setting-toggle">
                        <label className="toggle-switch">
                          <input type="checkbox" checked={emailAlerts} onChange={() => setEmailAlerts(!emailAlerts)} />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>
                    </div>

                    <div className="setting-item">
                      <div className="setting-icon"><i className="fa-solid fa-mobile-screen"></i></div>
                      <div className="setting-content"><h4>Push Notifications</h4><p>Get push alerts on your device</p></div>
                      <div className="setting-toggle">
                        <label className="toggle-switch">
                          <input type="checkbox" checked={pushNotifs} onChange={() => setPushNotifs(!pushNotifs)} />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Sub-Setting: Privacy */}
                {activeSettingTab === 'privacy' && (
                  <div className="sub-setting-view">
                    <button className="btn-sub-back" onClick={() => setActiveSettingTab(null)}>
                      <i className="fa-solid fa-arrow-left"></i> Back to Settings
                    </button>
                    <h3>Privacy & Safety</h3>
                    
                    <div className="setting-item">
                      <div className="setting-icon"><i className="fa-solid fa-eye-slash"></i></div>
                      <div className="setting-content"><h4>Private Profile</h4><p>Only approved people can see your details</p></div>
                      <div className="setting-toggle">
                        <label className="toggle-switch">
                          <input type="checkbox" checked={isPrivate} onChange={() => setIsPrivate(!isPrivate)} />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. Sub-Setting: Security */}
                {activeSettingTab === 'security' && (
                  <div className="sub-setting-view">
                    <button className="btn-sub-back" onClick={() => setActiveSettingTab(null)}>
                      <i className="fa-solid fa-arrow-left"></i> Back to Settings
                    </button>
                    <h3>Security</h3>
                    
                    <div className="setting-item">
                      <div className="setting-icon"><i className="fa-solid fa-key"></i></div>
                      <div className="setting-content"><h4>Change Password</h4><p>Update your account password</p></div>
                      <button className="setting-btn" onClick={() => setActiveModal('password')}>Update</button>
                    </div>

                    <div className="setting-item logout-setting-item">
                      <div className="setting-icon logout-icon"><i className="fa-solid fa-right-from-bracket"></i></div>
                      <div className="setting-content"><h4 className="logout-text">Logout</h4><p>Sign out of your account</p></div>
                      <button className="setting-btn logout-btn" onClick={() => setActiveModal('logout')}>Logout</button>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* ACTIVITY TAB */}
            {activeTab === 'activity' && (
              <div className="activity-section">
                <div className="activity-item">
                  <div className="activity-icon"><i className="fa-solid fa-calendar-check"></i></div>
                  <div className="activity-content"><h4>Joined Tech Meetup 2026</h4><p>2 days ago</p></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODALS */}
      {activeModal && (
        <div className="profile-modal-overlay" onClick={() => setActiveModal(null)}>
          {/* Edit Profile Modal */}
          {activeModal === 'edit' && (
            <div className="profile-modal-box" onClick={(e) => e.stopPropagation()}>
              <h3>Edit Profile</h3>
              <div className="modal-form-group"><label>Full Name</label><input type="text" name="name" value={userData.name} onChange={handleChange} className="modal-input" /></div>
              <div className="modal-form-group"><label>Email</label><input type="email" name="email" value={userData.email} onChange={handleChange} className="modal-input" /></div>
              <div className="modal-form-group"><label>Bio</label><textarea name="bio" value={userData.bio} onChange={handleChange} rows="3" className="modal-input modal-textarea" /></div>
              <div className="modal-form-group"><label>Location</label><input type="text" name="location" value={userData.location} onChange={handleChange} className="modal-input" /></div>
              <div className="modal-actions">
                <button className="modal-cancel" onClick={() => setActiveModal(null)}>Cancel</button>
                <button className="modal-save" onClick={handleSaveProfile}>Save Changes</button>
              </div>
            </div>
          )}

          {/* Password Modal */}
          {activeModal === 'password' && (
            <div className="profile-modal-box" onClick={(e) => e.stopPropagation()}>
              <h3>Change Password</h3>
              <div className="modal-form-group"><input type="password" placeholder="Current Password" className="modal-input" /></div>
              <div className="modal-form-group"><input type="password" placeholder="New Password" className="modal-input" /></div>
              <div className="modal-form-group"><input type="password" placeholder="Confirm New Password" className="modal-input" /></div>
              <div className="modal-actions">
                <button className="modal-cancel" onClick={() => setActiveModal(null)}>Cancel</button>
                <button className="modal-save" onClick={() => { setActiveModal(null); alert('Password updated (Demo)'); }}>Update</button>
              </div>
            </div>
          )}

          {/* Logout Modal */}
          {activeModal === 'logout' && (
            <div className="profile-modal-box" onClick={(e) => e.stopPropagation()}>
              <h3>Logout</h3>
              <p className="logout-message">Are you sure you want to logout?</p>
              <div className="confirm-actions">
                <button className="btn-confirm-cancel" onClick={() => setActiveModal(null)}>Cancel</button>
                <button className="btn-confirm-yes" onClick={handleLogout}>Yes, Logout</button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default ProfilePage;