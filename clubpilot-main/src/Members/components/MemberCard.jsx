function MemberCard({ member }) {
  return (
    <div className="member-card">
      <div className="member-card-top">
        <div className="member-avatar">
          {member.name.charAt(0)}
        </div>

        <span className={`member-status ${member.status.toLowerCase()}`}>
          {member.status}
        </span>
      </div>

      <div className="member-card-info">
        <h3>{member.name}</h3>
        <p>{member.role}</p>
        <span>{member.team} Team</span>
      </div>

      <div className="member-card-stats">
        <div>
          <strong>{member.tasksCompleted}</strong>
          <small>Completed</small>
        </div>

        <div>
          <strong>{member.tasksPending}</strong>
          <small>Pending</small>
        </div>

        <div>
          <strong>{member.eventsRegistered}</strong>
          <small>Events</small>
        </div>
      </div>
    </div>
  );
}

export default MemberCard;