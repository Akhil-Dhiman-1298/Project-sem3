import { members } from "../data/memberData";
import "../Members.css";
import "./CoreMemberClub.css";

function CoreMemberClub({ memberId }) {
  const currentMember = members.find(
    (member) => member.id === memberId
  );

  console.log("Current Member ID:", memberId);
console.log("Current Member:", currentMember);

  if (!currentMember) {
    return (
      <div className="core-club-page">
        <h1>My Club</h1>
        <p>Club information could not be found.</p>
      </div>
    );
  }

  return (
    <div className="core-club-page">

      {/* ================= CLUB HERO ================= */}

      <section className="core-club-hero">

        <div className="core-club-logo">
          {currentMember.club.substring(0, 2).toUpperCase()}
        </div>

        <div className="core-club-hero-content">
          <p className="core-club-eyebrow">MY CLUB</p>

          <h1>{currentMember.club}</h1>

          <p className="core-club-description">
            {currentMember.clubDescription}
          </p>
        </div>

        

      </section>


      {/* ================= CLUB DETAILS ================= */}

      <section className="core-club-info-grid">

        <div className="core-club-info-card">
          <span>Club Leader</span>
          <strong>{currentMember.clubLeader}</strong>
        </div>

        <div className="core-club-info-card">
          <span>Established</span>
          <strong>{currentMember.clubEstablished}</strong>
        </div>

        <div className="core-club-info-card">
          <span>Member Since</span>
          <strong>{currentMember.joinedDate}</strong>
        </div>

      </section>


      {/* ================= YOUR TEAM ================= */}

      <section className="core-club-team-card">

        <div className="core-club-section-heading">
          <div>
            <p className="core-club-eyebrow">YOUR TEAM</p>
            <h2>{currentMember.team}</h2>
          </div>

          <span className="core-club-team-badge">
            Team Head
          </span>
        </div>

        <p className="core-club-team-description">
          {currentMember.teamDescription}
        </p>

        <div className="core-club-team-person">

          <div className="core-club-person-avatar">
            {currentMember.name.charAt(0)}
          </div>

          <div>
            <span>Team Head</span>
            <strong>{currentMember.name}</strong>
          </div>

        </div>

      </section>


      {/* ================= CLUB STRUCTURE ================= */}

      <section className="core-club-structure">

        <div className="core-club-section-heading">
          <div>
            <p className="core-club-eyebrow">ORGANIZATION</p>
            <h2>Club Structure</h2>
          </div>
        </div>

        <div className="core-club-structure-flow">

          <div className="core-club-structure-card">

            <div className="core-club-structure-icon">
              <i className="fa-solid fa-crown"></i>
            </div>

            <div>
              <span>CLUB LEADER</span>
              <strong>{currentMember.clubLeader}</strong>
              <small>Leads the club</small>
            </div>

          </div>


          <div className="core-club-flow-line">
            ↓
          </div>


          <div className="core-club-structure-card highlighted">

            <div className="core-club-structure-icon">
              <i className="fa-solid fa-users"></i>
            </div>

            <div>
              <span>TEAM HEAD</span>
              <strong>{currentMember.name}</strong>
              <small>{currentMember.team}</small>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default CoreMemberClub;