import { useState } from "react";
import { members, memberStats } from "../data/memberData";
import MemberList from "../components/MemberList";
import "../Members.css";

function MembersDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("All");

  const filteredMembers = members.filter((member) => {
    const matchesSearch = member.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesTeam =
      selectedTeam === "All" || member.team === selectedTeam;

    return matchesSearch && matchesTeam
  });

  return (
    <div className="members-dashboard">
      <div className="members-header">
        <div>
          
          <h1>Your Club Members</h1>
          <p>View and keep track of the core members in your club.</p>
        </div>
      </div>

      <div className="members-stats">
        <div className="members-stat-card">
          <span>Total Members</span>
          <strong>{memberStats.totalMembers}</strong>
        </div>
        <div className="members-stat-card">
          <span>Online Members</span>
          <strong>{memberStats.onlineMembers}</strong>
        </div>
        <div className="members-stat-card">
          <span>Teams</span>
          <strong>{memberStats.totalTeams}</strong>
        </div>
        <div className="members-stat-card">
          <span>Event Registrations</span>
          <strong>{memberStats.totalEventsRegistered}</strong>
        </div>
      </div>

      <section className="members-section">
        <div className="members-section-header">
          <div>
            <h2>Core Members</h2>
            <p>Members currently active in the club.</p>
          </div>

          <div className="members-filters">
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            <select
              value={selectedTeam}
              onChange={(event) => setSelectedTeam(event.target.value)}
            >
              <option value="All">All Teams</option>
              {[...new Set(members.map((m) => m.team))].map((team) => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>
        </div>

        <MemberList members={filteredMembers} />
      </section>
    </div>
  );
}

export default MembersDashboard;