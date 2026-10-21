export const initialEventsState = [
  { id: 1, title: 'Tech Meetup 2026', date: '2026-08-25', time: '10:00 - 13:00', venue: 'Room 101, Main Building', description: 'Join us for an exciting tech meetup with industry experts.', status: 'upcoming', category: 'tech', icon: '💻', capacity: 50, participants: 20, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
  { id: 2, title: 'Annual Cultural Fest', date: '2026-09-05', time: '14:00 - 17:00', venue: 'Seminar Hall', description: 'Plan the biggest cultural fest of the year.', status: 'upcoming', category: 'cultural', icon: '🎭', capacity: 50, participants: 33, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
  { id: 3, title: 'Football Tournament', date: '2026-08-20', time: '08:00 - 18:00', venue: 'Sports Ground', description: 'Inter-college football tournament with 8 teams.', status: 'ongoing', category: 'sports', icon: '⚽', capacity: 50, participants: 0, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
  { id: 4, title: 'UI/UX Design Workshop', date: '2026-08-15', time: '11:00 - 15:00', venue: 'Design Studio', description: 'Learn the basics of UI/UX design.', status: 'completed', category: 'workshop', icon: '📚', capacity: 50, participants: 37, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
  { id: 5, title: 'Club Orientation Day', date: '2026-07-28', time: '09:00 - 12:00', venue: 'Auditorium', description: 'Welcome new members to the club.', status: 'completed', category: 'social', icon: '🎉', capacity: 50, participants: 26, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
  { id: 6, title: 'Guest Lecture: AI & ML', date: '2026-09-10', time: '15:00 - 17:00', venue: 'Lecture Hall 2', description: 'Guest lecture on Artificial Intelligence.', status: 'upcoming', category: 'academic', icon: '🤖', capacity: 50, participants: 29, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
  { id: 7, title: 'Dance Competition', date: '2026-08-10', time: '18:00 - 21:00', venue: 'Auditorium', description: 'Inter-club dance competition.', status: 'cancelled', category: 'cultural', icon: '💃', capacity: 50, participants: 8, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
  { id: 8, title: 'Coding Hackathon', date: '2026-09-15', time: '09:00 - 21:00', venue: 'Computer Lab', description: '24-hour coding hackathon.', status: 'ongoing', category: 'tech', icon: '⌨️', capacity: 50, participants: 40, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] }
];

export function eventsReducer(state, action) {
  switch (action.type) {
    case 'ADD_EVENT':
      return [...state, action.payload];
      
    case 'UPDATE_EVENT':
      return state.map(e => e.id === action.payload.id ? { ...e, ...action.payload.updates } : e);
      
    case 'DELETE_EVENT':
      return state.filter(e => e.id !== action.payload);
      
    case 'PARTICIPATE':
      return state.map(e => e.id === action.payload.id ? {
        ...e,
        participants: (e.participants || 0) + 1,
        participantNames: [...(e.participantNames || []), action.payload.userId]
      } : e);
      
    case 'CANCEL_PARTICIPATE':
      return state.map(e => e.id === action.payload.id ? {
        ...e,
        participants: Math.max(0, (e.participants || 0) - 1),
        participantNames: (e.participantNames || []).filter(n => n !== action.payload.userId),
        attendedBy: (e.attendedBy || []).filter(n => n !== action.payload.userId),
        pendingAttendance: (e.pendingAttendance || []).filter(n => n !== action.payload.userId),
        rejectedBy: (e.rejectedBy || []).filter(n => n !== action.payload.userId),
      } : e);

    case 'SET_EVENTS':
      return action.payload;
      
    default:
      return state;
  }
}