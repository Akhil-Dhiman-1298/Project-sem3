export const members = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Team Head",
    club: "ACM",
    team: "Technical Team",
    email: "aarav@clubpilot.com",
    status: "Online",
    joinedDate: "2026",
    clubEstablished: "2022",
    clubDescription:
      "A student community focused on technology, programming and innovation.",
    clubLeader: "Alex Morgan",
    teamDescription:
      "Handles technical activities, workshops and development work.",
    tasksCompleted: 0,
    tasksPending: 5,
    eventsRegistered: 3
  },

  {
    id: 2,
    name: "Mehak Verma",
    role: "Team Head",
    club: "Club Reflection",
    team: "Creative Team",
    email: "mehak@clubpilot.com",
    status: "Online",
    joinedDate: "2026",
    clubEstablished: "2021",
    clubDescription:
      "A creative community focused on ideas, expression and student activities.",
    clubLeader: "Priya Mehta",
    teamDescription:
      "Handles creative ideas, visual content and club promotions.",
    tasksCompleted: 0,
    tasksPending: 1,
    eventsRegistered: 4
  },

  {
    id: 3,
    name: "Rohan Singh",
    role: "Team Head",
    club: "Club Tasveer",
    team: "Photography Team",
    email: "rohan@clubpilot.com",
    status: "Offline",
    joinedDate: "2026",
    clubEstablished: "2023",
    clubDescription:
      "A photography-focused club covering campus events and visual storytelling.",
    clubLeader: "Rahul Kapoor",
    teamDescription:
      "Handles photography, event coverage and visual documentation.",
    tasksCompleted: 1,
    tasksPending: 1,
    eventsRegistered: 2
  },

  {
    id: 4,
    name: "Ananya Kapoor",
    role: "Team Head",
    club: "Club NatSamrat",
    team: "Theatre Team",
    email: "ananya@clubpilot.com",
    status: "Online",
    joinedDate: "2026",
    clubEstablished: "2020",
    clubDescription:
      "A theatre community focused on stage performances and creative expression.",
    clubLeader: "Neha Arora",
    teamDescription:
      "Handles theatre performances, rehearsals and stage activities.",
    tasksCompleted: 1,
    tasksPending: 0,
    eventsRegistered: 5
  },

  {
    id: 5,
    name: "Karan Malhotra",
    role: "Team Head",
    club: "CSI Student Chapter",
    team: "Technology Team",
    email: "karan@clubpilot.com",
    status: "Online",
    joinedDate: "2026",
    clubEstablished: "2022",
    clubDescription:
      "A technology community focused on computing, workshops and technical activities.",
    clubLeader: "Vikram Singh",
    teamDescription:
      "Handles technical workshops, computing activities and technology events.",
    tasksCompleted: 2,
    tasksPending: 1,
    eventsRegistered: 4
  },

  {
    id: 6,
    name: "Simran Kaur",
    role: "Team Head",
    club: "Club Dhwani",
    team: "Music Team",
    email: "simran@clubpilot.com",
    status: "Offline",
    joinedDate: "2026",
    clubEstablished: "2021",
    clubDescription:
      "A music community focused on performances, events and musical activities.",
    clubLeader: "Simran Gill",
    teamDescription:
      "Handles musical performances, rehearsals and club music events.",
    tasksCompleted: 1,
    tasksPending: 2,
    eventsRegistered: 3
  }
];

export const memberStats = {
  totalMembers: members.length,

  onlineMembers: members.filter(
    (member) => member.status === "Online"
  ).length,

  totalTeams: new Set(
    members.map((member) => member.team)
  ).size,

  totalEventsRegistered: members.reduce(
    (total, member) =>
      total + member.eventsRegistered,
    0
  )
};