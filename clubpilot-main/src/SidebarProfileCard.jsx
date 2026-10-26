import React from 'react';

function SidebarProfileCard({ goToProfile, role, username }) {
  let displayName = username;
  
  // ✅ Agar username nahi mila, toh role ke hisaab se naam do
  if (!displayName) {
    if (role === 'admin') displayName = 'Admin';
    else if (role === 'leader') displayName = 'Leader';
    else if (role === 'core-member') displayName = 'Core Member';
    else if (role === 'user') displayName = 'User';
    else displayName = 'Guest';
  }

  // Agar username hai (jaise user1, admin) toh usko capitalize karo
  if (displayName === 'admin') displayName = 'Admin';
  else if (displayName === 'leader') displayName = 'Leader';
  else if (displayName.includes('user')) {
    displayName = displayName.replace('user', 'User ');
  } else if (displayName.includes('member')) {
    displayName = displayName.replace('member', 'Member ');
  }

  const initial = displayName.charAt(0).toUpperCase();
  
  const roleDisplay = role ? role.toUpperCase().replace('-', ' ') : 'GUEST';
  const roleClass = role ? `role-${role.toLowerCase()}` : 'role-guest';

  return (
    <div className="sidebar-profile-card" onClick={goToProfile}>
      
      {/* Avatar Section */}
      <div className="spc-avatar-wrapper">
        <div className={`spc-avatar ${roleClass}`}>
          {initial}
        </div>
        <span className="spc-online-dot"></span>
      </div>

      {/* Info Section */}
      <div className="spc-info">
        <span className="spc-name">{displayName}</span>
        <span className={`spc-role ${roleClass}`}>
          {roleDisplay}
        </span>
      </div>

    </div>
  );
}

export default SidebarProfileCard;