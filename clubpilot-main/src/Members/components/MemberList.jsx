import MemberCard from "./MemberCard";

function MemberList({ members }) {
  return (
    <div className="member-list">
      {members.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  );
}

export default MemberList;