// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import './clubpilot.css';
// import ProfilePage from './ProfilePage';
// import Sidebar from './Sidebar';
// import Topbar from './Topbar';
// import Hero from './Hero';
// import Features from './Features';
// import Steps from './Steps';
// import About from './About';
// import BottomCTA from './BottomCTA';
// import Footer from './Footer';
// import EventPage from './EventPage';
// import EventSidebar from './EventSidebar';
// import EventDetailPage from './EventDetailPage';
// import LoginPage from './LoginPage';
// import GuestSidebar from './GuestSidebar';
// import SignUpPage from './SignUpPage';
// import TaskPage from './TaskPage';
// import TaskSidebar from './TaskSidebar';
// import MembersDashboard from './Members/pages/MembersDashboard';
// import MemberSidebar from './MemberSidebar';
// import './Members/Members.css';
// import MemberPage from './MemberPage';
// import { initialTasks } from './Members/data/taskData';

// // ✅ Analytics
// import Analytics from './Analytics';

// function App() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
//   const [currentPage, setCurrentPage] = useState('landing');
//   const [role, setRole] = useState(null);
//   const [currentMemberId, setCurrentMemberId] = useState(null);
//   const [logoutModal, setLogoutModal] = useState(false);
//   const [selectedEventId, setSelectedEventId] = useState(null);

//   // ---- URL → state sync ----
//   useEffect(() => {
//     const path = location.pathname;

//     if (path === '/' || path === '') setCurrentPage('landing');
//     else if (path === '/login') setCurrentPage('login');
//     else if (path === '/signup') setCurrentPage('signup');
//     else if (path === '/events') setCurrentPage('events');
//     else if (path.match(/^\/events\/\d+$/)) {
//       setSelectedEventId(Number(path.split('/')[2]));
//       setCurrentPage('event-detail');
//     }
//     else if (path === '/tasks') setCurrentPage('tasks');
//     else if (path === '/members') setCurrentPage('members');
//     else if (path === '/profile') setCurrentPage('profile');
//     else if (path === '/analytics') setCurrentPage('analytics');   // ✅
//     else if (path === '/member/dashboard') setCurrentPage('core-member');
//     else if (path === '/member/club') setCurrentPage('core-club');
//     else if (path === '/member/tasks') setCurrentPage('member-tasks');
//     else if (path === '/member/events') setCurrentPage('member-events');
//   }, [location.pathname]);

//   // ---- state → URL sync ----
//   useEffect(() => {
//     let path = '/';
//     if (currentPage === 'landing') path = '/';
//     else if (currentPage === 'login') path = '/login';
//     else if (currentPage === 'signup') path = '/signup';
//     else if (currentPage === 'events') path = '/events';
//     else if (currentPage === 'event-detail') path = `/events/${selectedEventId}`;
//     else if (currentPage === 'tasks') path = '/tasks';
//     else if (currentPage === 'members') path = '/members';
//     else if (currentPage === 'profile') path = '/profile';
//     else if (currentPage === 'analytics') path = '/analytics';   // ✅
//     else if (currentPage === 'core-member') path = '/member/dashboard';
//     else if (currentPage === 'core-club') path = '/member/club';
//     else if (currentPage === 'member-tasks') path = '/member/tasks';
//     else if (currentPage === 'member-events') path = '/member/events';

//     if (location.pathname !== path) navigate(path);
//   }, [currentPage, selectedEventId]);

//   const [tasks, setTasks] = useState(() => {
//     const saved = localStorage.getItem('tasks');
//     if (saved) {
//       try { return JSON.parse(saved); } catch (e) { return initialTasks; }
//     }
//     return initialTasks;
//   });

//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   const goToProfile = () => setCurrentPage('profile');
//   const goToSignUp = () => setCurrentPage('signup');
//   const goToTasks = () => setCurrentPage('tasks');
//   const goToMembers = () => setCurrentPage('members');
//   const goToEvents = () => setCurrentPage('events');
//   const goToLanding = () => setCurrentPage('landing');
//   const goToLogin = () => setCurrentPage('login');
//   const goToAnalytics = () => setCurrentPage('analytics');   // ✅

//   const goToEventDetail = (eventId) => {
//     setSelectedEventId(eventId);
//     setCurrentPage('event-detail');
//   };

//   const handleSignUp = (userRole) => {
//     setRole(userRole);
//     localStorage.setItem('userRole', userRole);
//     setCurrentPage('landing');
//   };

//   const handleLogin = (userRole, memberId = null) => {
//     setRole(userRole);
//     localStorage.setItem('userRole', userRole);

//     if (memberId) {
//       setCurrentMemberId(memberId);
//     } else {
//       setCurrentMemberId(null);
//     }
//     setCurrentPage('landing');
//   };

//   const handleLogoutClick = () => setLogoutModal(true);

//   const confirmLogout = () => {
//     setLogoutModal(false);
//     setTimeout(() => {
//       setRole(null);
//       setCurrentMemberId(null);
//       localStorage.removeItem('userRole');
//       setCurrentPage('landing');
//     }, 300);
//   };

//   useEffect(() => {
//     localStorage.setItem('darkMode', darkMode);
//   }, [darkMode]);

//   const [events, setEvents] = useState(() => {
//     const savedEvents = localStorage.getItem('events');
//     if (savedEvents) return JSON.parse(savedEvents);
//     return [
//       { id: 1, title: 'Tech Meetup 2026', date: '2026-08-25', time: '10:00 - 13:00', venue: 'Room 101, Main Building', description: 'Join us for an exciting tech meetup with industry experts.', status: 'upcoming', category: 'tech', icon: '💻', capacity: 50, participants: 20, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 2, title: 'Annual Cultural Fest', date: '2026-09-05', time: '14:00 - 17:00', venue: 'Seminar Hall', description: 'Plan the biggest cultural fest of the year.', status: 'upcoming', category: 'cultural', icon: '🎭', capacity: 50, participants: 33, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 3, title: 'Football Tournament', date: '2026-08-20', time: '08:00 - 18:00', venue: 'Sports Ground', description: 'Inter-college football tournament with 8 teams.', status: 'ongoing', category: 'sports', icon: '⚽', capacity: 50, participants: 0, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 4, title: 'UI/UX Design Workshop', date: '2026-08-15', time: '11:00 - 15:00', venue: 'Design Studio', description: 'Learn the basics of UI/UX design.', status: 'completed', category: 'workshop', icon: '📚', capacity: 50, participants: 37, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 5, title: 'Club Orientation Day', date: '2026-07-28', time: '09:00 - 12:00', venue: 'Auditorium', description: 'Welcome new members to the club.', status: 'completed', category: 'social', icon: '🎉', capacity: 50, participants: 26, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 6, title: 'Guest Lecture: AI & ML', date: '2026-09-10', time: '15:00 - 17:00', venue: 'Lecture Hall 2', description: 'Guest lecture on Artificial Intelligence.', status: 'upcoming', category: 'academic', icon: '🤖', capacity: 50, participants: 29, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 7, title: 'Dance Competition', date: '2026-08-10', time: '18:00 - 21:00', venue: 'Auditorium', description: 'Inter-club dance competition.', status: 'cancelled', category: 'cultural', icon: '💃', capacity: 50, participants: 8, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 8, title: 'Coding Hackathon', date: '2026-09-15', time: '09:00 - 21:00', venue: 'Computer Lab', description: '24-hour coding hackathon.', status: 'ongoing', category: 'tech', icon: '⌨️', capacity: 50, participants: 0, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] }
//     ];
//   });

//   useEffect(() => {
//     localStorage.setItem('events', JSON.stringify(events));
//   }, [events]);

//   const initAOS = () => {
//     AOS.init({ once: false, mirror: true, duration: 600, easing: 'ease-out' });
//     AOS.refresh();
//   };

//   useEffect(() => {
//     if (currentPage === 'landing') {
//       initAOS();
//       const scrollContainer = document.getElementById('mainContentScroll');
//       const onScroll = () => AOS.refresh();
//       if (scrollContainer) scrollContainer.addEventListener('scroll', onScroll);
//       return () => {
//         if (scrollContainer) scrollContainer.removeEventListener('scroll', onScroll);
//       };
//     }
//   }, [currentPage]);

//   if (currentPage === 'login') {
//     return <LoginPage onLogin={handleLogin} darkMode={darkMode} goToSignUp={goToSignUp} />;
//   }

//   if (currentPage === 'events') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <EventSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <EventPage
//             darkMode={darkMode}
//             role={role}
//             events={events}
//             setEvents={setEvents}
//             onEventClick={goToEventDetail}
//             currentMemberId={currentMemberId}
//             goToAnalytics={goToAnalytics}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (currentPage === 'event-detail') {
//     const selectedEvent = events.find(e => e.id === selectedEventId);
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <EventSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <EventDetailPage event={selectedEvent} onBack={() => setCurrentPage('events')} darkMode={darkMode} role={role} setEvents={setEvents} currentMemberId={currentMemberId} />
//         </div>
//       </div>
//     );
//   }

//   // ✅ Analytics page
//   if (currentPage === 'analytics') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <EventSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <Analytics
//             darkMode={darkMode}
//             role={role}
//             events={events}
//             onBack={() => setCurrentPage('events')}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (['core-member', 'core-club', 'member-tasks', 'member-events'].includes(currentPage)) {
//     const tab = currentPage === 'core-member' ? 'hub' : currentPage === 'core-club' ? 'club' : currentPage === 'member-events' ? 'events' : 'tasks';
//     return (
//       <MemberPage darkMode={darkMode} currentMemberId={currentMemberId} tasks={tasks} setTasks={setTasks} events={events} setEvents={setEvents} role={role} initialTab={tab} goToLanding={goToLanding} goToProfile={goToProfile} />
//     );
//   }

//   if (currentPage === 'signup') {
//     return <SignUpPage onSignUp={handleSignUp} darkMode={darkMode} goToLogin={goToLogin} />;
//   }

//   if (currentPage === 'profile') {
//     if (!role) return null;
//     return <ProfilePage darkMode={darkMode} role={role} goToLanding={goToLanding} setDarkMode={setDarkMode} />;
//   }

//   if (currentPage === 'tasks') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <TaskSidebar darkMode={darkMode} goToLanding={goToLanding} goToProfile={goToProfile} role={role} goToLogin={goToLogin} goToEvents={goToEvents} goToMembers={goToMembers} />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <TaskPage darkMode={darkMode} role={role} tasks={tasks} setTasks={setTasks} />
//         </div>
//       </div>
//     );
//   }

//   if (currentPage === 'members') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <Sidebar darkMode={darkMode} goToEvents={goToEvents} goToLogin={goToLogin} goToLanding={goToLanding} role={role} goToProfile={goToProfile} goToTasks={goToTasks} goToMembers={goToMembers} currentPage={currentPage} />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <MembersDashboard />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={darkMode ? "main-layout dark" : "main-layout"}>
//       {!role ? (
//         <GuestSidebar darkMode={darkMode} goToLogin={goToLogin} goToMembers={goToMembers} />
//       ) : role === 'core-member' ? (
//         <MemberSidebar darkMode={darkMode} goToHome={goToLanding} goToCoreMember={() => setCurrentPage('core-member')} goToCoreClub={() => setCurrentPage('core-club')} goToTasks={() => setCurrentPage('member-tasks')} goToEvents={() => setCurrentPage('member-events')} goToProfile={goToProfile} currentPage={currentPage} />
//       ) : (
//         <Sidebar darkMode={darkMode} goToEvents={goToEvents} goToLogin={goToLogin} goToLanding={goToLanding} role={role} goToProfile={goToProfile} goToTasks={goToTasks} goToMembers={goToMembers} currentPage={currentPage} />
//       )}
//       <main className="content-area" id="mainContentScroll">
//         <div id="top"></div>
//         <Topbar darkMode={darkMode} setDarkMode={setDarkMode} goToLogin={goToLogin} role={role} onLogout={handleLogoutClick} goToSignUp={goToSignUp} />
//         <Hero darkMode={darkMode} />
//         <Features />
//         <Steps />
//         <About />
//         <BottomCTA role={role} goToLogin={goToLogin} goToEvents={goToEvents} />
//         <Footer />
//       </main>

//       {logoutModal && (
//         <div className="confirm-overlay" onClick={() => setLogoutModal(false)}>
//           <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
//             <h3>Logout</h3>
//             <p>Are you sure you want to logout?</p>
//             <div className="confirm-actions">
//               <button className="btn-confirm-cancel" onClick={() => setLogoutModal(false)}>Cancel</button>
//               <button className="btn-confirm-yes" onClick={confirmLogout}>Yes, Logout</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import './clubpilot.css';
// import ProfilePage from './ProfilePage';
// import Sidebar from './Sidebar';
// import Topbar from './Topbar';
// import Hero from './Hero';
// import Features from './Features';
// import Steps from './Steps';
// import About from './About';
// import BottomCTA from './BottomCTA';
// import Footer from './Footer';
// import EventPage from './EventPage';
// import EventSidebar from './EventSidebar';
// import EventDetailPage from './EventDetailPage';
// import LoginPage from './LoginPage';
// import GuestSidebar from './GuestSidebar';
// import SignUpPage from './SignUpPage';
// import TaskPage from './TaskPage';
// import TaskSidebar from './TaskSidebar';
// import MembersDashboard from './Members/pages/MembersDashboard';
// import MemberSidebar from './MemberSidebar';
// import './Members/Members.css';
// import MemberPage from './MemberPage';
// import { initialTasks } from './Members/data/taskData';

// // ✅ Analytics
// import Analytics from './Analytics';

// function App() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
//   const [currentPage, setCurrentPage] = useState('landing');
//   const [role, setRole] = useState(null);
//   const [currentMemberId, setCurrentMemberId] = useState(null);
//   const [logoutModal, setLogoutModal] = useState(false);
//   const [selectedEventId, setSelectedEventId] = useState(null);

//   // ---- URL → state sync ----
//   useEffect(() => {
//     const path = location.pathname;

//     if (path === '/' || path === '') setCurrentPage('landing');
//     else if (path === '/login') setCurrentPage('login');
//     else if (path === '/signup') setCurrentPage('signup');
//     else if (path === '/events') setCurrentPage('events');
//     else if (path.match(/^\/events\/\d+$/)) {
//       setSelectedEventId(Number(path.split('/')[2]));
//       setCurrentPage('event-detail');
//     }
//     else if (path === '/tasks') setCurrentPage('tasks');
//     else if (path === '/members') setCurrentPage('members');
//     else if (path === '/profile') setCurrentPage('profile');
//     else if (path === '/analytics') setCurrentPage('analytics');
//     else if (path === '/member/dashboard') setCurrentPage('core-member');
//     else if (path === '/member/club') setCurrentPage('core-club');
//     else if (path === '/member/tasks') setCurrentPage('member-tasks');
//     else if (path === '/member/events') setCurrentPage('member-events');
//   }, [location.pathname]);

//   // ---- state → URL sync ----
//   useEffect(() => {
//     let path = '/';
//     if (currentPage === 'landing') path = '/';
//     else if (currentPage === 'login') path = '/login';
//     else if (currentPage === 'signup') path = '/signup';
//     else if (currentPage === 'events') path = '/events';
//     else if (currentPage === 'event-detail') path = `/events/${selectedEventId}`;
//     else if (currentPage === 'tasks') path = '/tasks';
//     else if (currentPage === 'members') path = '/members';
//     else if (currentPage === 'profile') path = '/profile';
//     else if (currentPage === 'analytics') path = '/analytics';
//     else if (currentPage === 'core-member') path = '/member/dashboard';
//     else if (currentPage === 'core-club') path = '/member/club';
//     else if (currentPage === 'member-tasks') path = '/member/tasks';
//     else if (currentPage === 'member-events') path = '/member/events';

//     if (location.pathname !== path) navigate(path);
//   }, [currentPage, selectedEventId]);

//   const [tasks, setTasks] = useState(() => {
//     const saved = localStorage.getItem('tasks');
//     if (saved) {
//       try { return JSON.parse(saved); } catch (e) { return initialTasks; }
//     }
//     return initialTasks;
//   });

//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   const goToProfile = () => setCurrentPage('profile');
//   const goToSignUp = () => setCurrentPage('signup');
//   const goToTasks = () => setCurrentPage('tasks');
//   const goToMembers = () => setCurrentPage('members');
//   const goToEvents = () => setCurrentPage('events');
//   const goToLanding = () => setCurrentPage('landing');
//   const goToLogin = () => setCurrentPage('login');
//   const goToAnalytics = () => setCurrentPage('analytics');

//   const goToEventDetail = (eventId) => {
//     setSelectedEventId(eventId);
//     setCurrentPage('event-detail');
//   };

//   const handleSignUp = (userRole) => {
//     setRole(userRole);
//     localStorage.setItem('userRole', userRole);
//     setCurrentPage('landing');
//   };

//   const handleLogin = (userRole, memberId = null) => {
//     setRole(userRole);
//     localStorage.setItem('userRole', userRole);

//     if (memberId) {
//       setCurrentMemberId(memberId);
//     } else {
//       setCurrentMemberId(null);
//     }
//     setCurrentPage('landing');
//   };

//   const handleLogoutClick = () => setLogoutModal(true);

//   const confirmLogout = () => {
//     setLogoutModal(false);
//     setTimeout(() => {
//       setRole(null);
//       setCurrentMemberId(null);
//       localStorage.removeItem('userRole');
//       setCurrentPage('landing');
//     }, 300);
//   };

//   useEffect(() => {
//     localStorage.setItem('darkMode', darkMode);
//   }, [darkMode]);

//   const [events, setEvents] = useState(() => {
//     const savedEvents = localStorage.getItem('events');
//     if (savedEvents) return JSON.parse(savedEvents);
//     return [
//       { id: 1, title: 'Tech Meetup 2026', date: '2026-08-25', time: '10:00 - 13:00', venue: 'Room 101, Main Building', description: 'Join us for an exciting tech meetup with industry experts.', status: 'upcoming', category: 'tech', icon: '💻', capacity: 50, participants: 20, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 2, title: 'Annual Cultural Fest', date: '2026-09-05', time: '14:00 - 17:00', venue: 'Seminar Hall', description: 'Plan the biggest cultural fest of the year.', status: 'upcoming', category: 'cultural', icon: '🎭', capacity: 50, participants: 33, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 3, title: 'Football Tournament', date: '2026-08-20', time: '08:00 - 18:00', venue: 'Sports Ground', description: 'Inter-college football tournament with 8 teams.', status: 'ongoing', category: 'sports', icon: '⚽', capacity: 50, participants: 0, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 4, title: 'UI/UX Design Workshop', date: '2026-08-15', time: '11:00 - 15:00', venue: 'Design Studio', description: 'Learn the basics of UI/UX design.', status: 'completed', category: 'workshop', icon: '📚', capacity: 50, participants: 37, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 5, title: 'Club Orientation Day', date: '2026-07-28', time: '09:00 - 12:00', venue: 'Auditorium', description: 'Welcome new members to the club.', status: 'completed', category: 'social', icon: '🎉', capacity: 50, participants: 26, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 6, title: 'Guest Lecture: AI & ML', date: '2026-09-10', time: '15:00 - 17:00', venue: 'Lecture Hall 2', description: 'Guest lecture on Artificial Intelligence.', status: 'upcoming', category: 'academic', icon: '🤖', capacity: 50, participants: 29, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 7, title: 'Dance Competition', date: '2026-08-10', time: '18:00 - 21:00', venue: 'Auditorium', description: 'Inter-club dance competition.', status: 'cancelled', category: 'cultural', icon: '💃', capacity: 50, participants: 8, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 8, title: 'Coding Hackathon', date: '2026-09-15', time: '09:00 - 21:00', venue: 'Computer Lab', description: '24-hour coding hackathon.', status: 'ongoing', category: 'tech', icon: '⌨️', capacity: 50, participants: 0, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] }
//     ];
//   });

//   useEffect(() => {
//     localStorage.setItem('events', JSON.stringify(events));
//   }, [events]);

//   const initAOS = () => {
//     AOS.init({ once: false, mirror: true, duration: 600, easing: 'ease-out' });
//     AOS.refresh();
//   };

//   useEffect(() => {
//     if (currentPage === 'landing') {
//       initAOS();
//       const scrollContainer = document.getElementById('mainContentScroll');
//       const onScroll = () => AOS.refresh();
//       if (scrollContainer) scrollContainer.addEventListener('scroll', onScroll);
//       return () => {
//         if (scrollContainer) scrollContainer.removeEventListener('scroll', onScroll);
//       };
//     }
//   }, [currentPage]);

//   if (currentPage === 'login') {
//     return <LoginPage onLogin={handleLogin} darkMode={darkMode} goToSignUp={goToSignUp} />;
//   }

//   if (currentPage === 'events') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <EventSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <EventPage
//             darkMode={darkMode}
//             role={role}
//             events={events}
//             setEvents={setEvents}
//             onEventClick={goToEventDetail}
//             currentMemberId={currentMemberId}
//             goToAnalytics={goToAnalytics}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (currentPage === 'event-detail') {
//     const selectedEvent = events.find(e => e.id === selectedEventId);
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <EventSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <EventDetailPage event={selectedEvent} onBack={() => setCurrentPage('events')} darkMode={darkMode} role={role} setEvents={setEvents} currentMemberId={currentMemberId} />
//         </div>
//       </div>
//     );
//   }

//   // ✅ Analytics page
//   if (currentPage === 'analytics') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <EventSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <Analytics
//             darkMode={darkMode}
//             role={role}
//             events={events}
//             onBack={() => setCurrentPage('events')}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (['core-member', 'core-club', 'member-tasks', 'member-events'].includes(currentPage)) {
//     const tab = currentPage === 'core-member' ? 'hub' : currentPage === 'core-club' ? 'club' : currentPage === 'member-events' ? 'events' : 'tasks';
//     return (
//       <MemberPage darkMode={darkMode} currentMemberId={currentMemberId} tasks={tasks} setTasks={setTasks} events={events} setEvents={setEvents} role={role} initialTab={tab} goToLanding={goToLanding} goToProfile={goToProfile} />
//     );
//   }

//   if (currentPage === 'signup') {
//     return <SignUpPage onSignUp={handleSignUp} darkMode={darkMode} goToLogin={goToLogin} />;
//   }

//   if (currentPage === 'profile') {
//     if (!role) return null;
//     return <ProfilePage darkMode={darkMode} role={role} goToLanding={goToLanding} setDarkMode={setDarkMode} />;
//   }

//   if (currentPage === 'tasks') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <TaskSidebar darkMode={darkMode} goToLanding={goToLanding} goToProfile={goToProfile} role={role} goToLogin={goToLogin} goToEvents={goToEvents} goToMembers={goToMembers} />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <TaskPage darkMode={darkMode} role={role} tasks={tasks} setTasks={setTasks} />
//         </div>
//       </div>
//     );
//   }

//   if (currentPage === 'members') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <Sidebar darkMode={darkMode} goToEvents={goToEvents} goToLogin={goToLogin} goToLanding={goToLanding} role={role} goToProfile={goToProfile} goToTasks={goToTasks} goToMembers={goToMembers} currentPage={currentPage} />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <MembersDashboard />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={darkMode ? "main-layout dark" : "main-layout"}>
//       {!role ? (
//         <GuestSidebar darkMode={darkMode} goToLogin={goToLogin} goToMembers={goToMembers} />
//       ) : role === 'core-member' ? (
//         <MemberSidebar darkMode={darkMode} goToHome={goToLanding} goToCoreMember={() => setCurrentPage('core-member')} goToCoreClub={() => setCurrentPage('core-club')} goToTasks={() => setCurrentPage('member-tasks')} goToEvents={() => setCurrentPage('member-events')} goToProfile={goToProfile} currentPage={currentPage} />
//       ) : (
//         <Sidebar darkMode={darkMode} goToEvents={goToEvents} goToLogin={goToLogin} goToLanding={goToLanding} role={role} goToProfile={goToProfile} goToTasks={goToTasks} goToMembers={goToMembers} currentPage={currentPage} />
//       )}
//       <main className="content-area" id="mainContentScroll">
//         <Topbar darkMode={darkMode} setDarkMode={setDarkMode} goToLogin={goToLogin} role={role} onLogout={handleLogoutClick} goToSignUp={goToSignUp} />
//         <Hero darkMode={darkMode} />
//         <Features />
//         <Steps />
//         <About />
//         <BottomCTA role={role} goToLogin={goToLogin} goToEvents={goToEvents} />
//         <Footer />
//       </main>

//       {logoutModal && (
//         <div className="confirm-overlay" onClick={() => setLogoutModal(false)}>
//           <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
//             <h3>Logout</h3>
//             <p>Are you sure you want to logout?</p>
//             <div className="confirm-actions">
//               <button className="btn-confirm-cancel" onClick={() => setLogoutModal(false)}>Cancel</button>
//               <button className="btn-confirm-yes" onClick={confirmLogout}>Yes, Logout</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import './clubpilot.css';
// import ProfilePage from './ProfilePage';
// import Sidebar from './Sidebar';
// import Topbar from './Topbar';
// import Hero from './Hero';
// import Features from './Features';
// import Steps from './Steps';
// import About from './About';
// import BottomCTA from './BottomCTA';
// import Footer from './Footer';
// import EventPage from './EventPage';
// import EventSidebar from './EventSidebar';
// import LoginPage from './LoginPage';
// import GuestSidebar from './GuestSidebar';
// import SignUpPage from './SignUpPage';
// import TaskPage from './TaskPage';
// import TaskSidebar from './TaskSidebar';
// import MembersDashboard from './Members/pages/MembersDashboard';
// import MemberSidebar from './MemberSidebar';
// import './Members/Members.css';
// import MemberPage from './MemberPage';
// import { initialTasks } from './Members/data/taskData';
// import Analytics from './Analytics';

// function App() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem('darkMode') === 'true'
//   );
//   const [currentPage, setCurrentPage] = useState('landing');
//   const [role, setRole] = useState(null);
//   const [currentMemberId, setCurrentMemberId] = useState(null);
//   const [logoutModal, setLogoutModal] = useState(false);

//   const [tasks, setTasks] = useState(() => {
//     const saved = localStorage.getItem('tasks');
//     if (saved) {
//       return JSON.parse(saved);
//     }
//     return initialTasks;
//   });

//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   // ---- URL → state sync ----
//   useEffect(() => {
//     const path = location.pathname;

//     if (path === '/' || path === '') setCurrentPage('landing');
//     else if (path === '/login') setCurrentPage('login');
//     else if (path === '/signup') setCurrentPage('signup');
//     else if (path === '/events') setCurrentPage('events');
//     else if (path === '/tasks') setCurrentPage('tasks');
//     else if (path === '/members') setCurrentPage('members');
//     else if (path === '/profile') setCurrentPage('profile');
//     else if (path === '/analytics') setCurrentPage('analytics');
//     else if (path === '/member/dashboard') setCurrentPage('core-member');
//     else if (path === '/member/club') setCurrentPage('core-club');
//     else if (path === '/member/tasks') setCurrentPage('member-tasks');
//     else if (path === '/member/events') setCurrentPage('member-events');
//   }, [location.pathname]);

//   // ---- state → URL sync ----
//   useEffect(() => {
//     let path = '/';
//     if (currentPage === 'landing') path = '/';
//     else if (currentPage === 'login') path = '/login';
//     else if (currentPage === 'signup') path = '/signup';
//     else if (currentPage === 'events') path = '/events';
//     else if (currentPage === 'tasks') path = '/tasks';
//     else if (currentPage === 'members') path = '/members';
//     else if (currentPage === 'profile') path = '/profile';
//     else if (currentPage === 'analytics') path = '/analytics';
//     else if (currentPage === 'core-member') path = '/member/dashboard';
//     else if (currentPage === 'core-club') path = '/member/club';
//     else if (currentPage === 'member-tasks') path = '/member/tasks';
//     else if (currentPage === 'member-events') path = '/member/events';

//     if (location.pathname !== path) navigate(path);
//   }, [currentPage]);

//   // ---- Navigation ----
//   const goToProfile = () => setCurrentPage('profile');
//   const goToSignUp = () => setCurrentPage('signup');
//   const goToTasks = () => setCurrentPage('tasks');
//   const goToMembers = () => setCurrentPage('members');
//   const goToEvents = () => setCurrentPage('events');
//   const goToLanding = () => setCurrentPage('landing');
//   const goToLogin = () => setCurrentPage('login');
//   const goToAnalytics = () => setCurrentPage('analytics');

//   // ---- Auth ----
//   const handleSignUp = (userRole) => {
//     setRole(userRole);
//     localStorage.setItem('userRole', userRole);
//     setCurrentPage('landing');
//   };

//   const handleLogin = (userRole, memberId = null) => {
//     setRole(userRole);
//     localStorage.setItem('userRole', userRole);

//     if (userRole === 'core-member' && memberId) {
//       setCurrentMemberId(memberId);
//     }
//     setCurrentPage('landing');
//   };

//   const handleLogoutClick = () => {
//     setLogoutModal(true);
//   };

//   const confirmLogout = () => {
//     setLogoutModal(false);
//     setTimeout(() => {
//       setRole(null);
//       localStorage.removeItem('userRole');
//       setCurrentPage('landing');
//     }, 300);
//   };

//   // ---- Dark mode persistence ----
//   useEffect(() => {
//     localStorage.setItem('darkMode', darkMode);
//   }, [darkMode]);

//   // ---- Events ----
//   const [events, setEvents] = useState(() => {
//     const savedEvents = localStorage.getItem('events');
//     if (savedEvents) {
//       return JSON.parse(savedEvents);
//     }
//     return [
//       { id: 1, title: 'Tech Meetup 2026', date: '2026-08-25', time: '10:00 - 13:00', venue: 'Room 101, Main Building', description: 'Join us for an exciting tech meetup with industry experts.', status: 'upcoming', category: 'tech', icon: '💻', capacity: 50, participants: 20, participantNames: [] },
//       { id: 2, title: 'Annual Cultural Fest', date: '2026-09-05', time: '14:00 - 17:00', venue: 'Seminar Hall', description: 'Plan the biggest cultural fest of the year.', status: 'upcoming', category: 'cultural', icon: '🎭', capacity: 50, participants: 33, participantNames: [] },
//       { id: 3, title: 'Football Tournament', date: '2026-08-20', time: '08:00 - 18:00', venue: 'Sports Ground', description: 'Inter-college football tournament with 8 teams.', status: 'ongoing', category: 'sports', icon: '⚽', capacity: 50, participants: 10, participantNames: [] },
//       { id: 4, title: 'UI/UX Design Workshop', date: '2026-08-15', time: '11:00 - 15:00', venue: 'Design Studio', description: 'Learn the basics of UI/UX design.', status: 'completed', category: 'workshop', icon: '📚', capacity: 50, participants: 37, participantNames: [] },
//       { id: 5, title: 'Club Orientation Day', date: '2026-07-28', time: '09:00 - 12:00', venue: 'Auditorium', description: 'Welcome new members to the club.', status: 'completed', category: 'social', icon: '🎉', capacity: 50, participants: 26, participantNames: [] },
//       { id: 6, title: 'Guest Lecture: AI & ML', date: '2026-09-10', time: '15:00 - 17:00', venue: 'Lecture Hall 2', description: 'Guest lecture on Artificial Intelligence.', status: 'upcoming', category: 'academic', icon: '🤖', capacity: 50, participants: 29, participantNames: [] },
//       { id: 7, title: 'Dance Competition', date: '2026-08-10', time: '18:00 - 21:00', venue: 'Auditorium', description: 'Inter-club dance competition.', status: 'cancelled', category: 'cultural', icon: '💃', capacity: 50, participants: 8, participantNames: [] },
//       { id: 8, title: 'Coding Hackathon', date: '2026-09-15', time: '09:00 - 21:00', venue: 'Computer Lab', description: '24-hour coding hackathon.', status: 'upcoming', category: 'tech', icon: '⌨️', capacity: 50, participants: 40, participantNames: [] }
//     ];
//   });

//   useEffect(() => {
//     localStorage.setItem('events', JSON.stringify(events));
//   }, [events]);

//   // ---- AOS ----
//   const initAOS = () => {
//     AOS.init({
//       once: false,
//       mirror: true,
//       duration: 600,
//       easing: 'ease-out'
//     });
//     AOS.refresh();
//   };

//   useEffect(() => {
//     if (currentPage === 'landing') {
//       initAOS();

//       const scrollContainer = document.getElementById('mainContentScroll');
//       const onScroll = () => AOS.refresh();

//       if (scrollContainer) {
//         scrollContainer.addEventListener('scroll', onScroll);
//       }

//       return () => {
//         if (scrollContainer) {
//           scrollContainer.removeEventListener('scroll', onScroll);
//         }
//       };
//     }
//   }, [currentPage]);

//   // ---- Page Routes ----

//   if (currentPage === 'login') {
//     return <LoginPage onLogin={handleLogin} darkMode={darkMode} goToSignUp={goToSignUp} />;
//   }

//   if (currentPage === 'events') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <EventSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <EventPage
//             darkMode={darkMode}
//             role={role}
//             events={events}
//             setEvents={setEvents}
//             goToAnalytics={goToAnalytics}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (currentPage === 'analytics') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <EventSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <Analytics
//             darkMode={darkMode}
//             role={role}
//             events={events}
//             onBack={goToEvents}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (['core-member', 'core-club', 'member-tasks', 'member-events'].includes(currentPage)) {
//     const tab =
//       currentPage === 'core-member' ? 'hub' :
//       currentPage === 'core-club' ? 'club' :
//       currentPage === 'member-events' ? 'events' : 'tasks';

//     return (
//       <MemberPage
//         darkMode={darkMode}
//         currentMemberId={currentMemberId}
//         tasks={tasks}
//         setTasks={setTasks}
//         events={events}
//         setEvents={setEvents}
//         role={role}
//         initialTab={tab}
//         goToLanding={goToLanding}
//         goToProfile={goToProfile}
//       />
//     );
//   }

//   if (currentPage === 'signup') {
//     return <SignUpPage onSignUp={handleSignUp} darkMode={darkMode} goToLogin={goToLogin} />;
//   }

//   if (currentPage === 'profile') {
//     if (!role) {
//       return null;
//     }
//     return (
//       <ProfilePage
//         darkMode={darkMode}
//         role={role}
//         goToLanding={goToLanding}
//         setDarkMode={setDarkMode}
//       />
//     );
//   }

//   if (currentPage === 'tasks') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <TaskSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToEvents={goToEvents}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <TaskPage
//             darkMode={darkMode}
//             role={role}
//             tasks={tasks}
//             setTasks={setTasks}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (currentPage === 'members') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <Sidebar
//           darkMode={darkMode}
//           goToEvents={goToEvents}
//           goToLogin={goToLogin}
//           goToLanding={goToLanding}
//           role={role}
//           goToProfile={goToProfile}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//           currentPage={currentPage}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <MembersDashboard />
//         </div>
//       </div>
//     );
//   }

//   // ---- Landing (default) ----
//   return (
//     <div className={darkMode ? "main-layout dark" : "main-layout"}>
//       {!role ? (
//         <GuestSidebar darkMode={darkMode} goToLogin={goToLogin} goToMembers={goToMembers} />
//       ) : role === 'core-member' ? (
//         <MemberSidebar
//           darkMode={darkMode}
//           goToHome={goToLanding}
//           goToCoreMember={() => setCurrentPage('core-member')}
//           goToCoreClub={() => setCurrentPage('core-club')}
//           goToTasks={() => setCurrentPage('member-tasks')}
//           goToEvents={() => setCurrentPage('member-events')}
//           goToProfile={goToProfile}
//           currentPage={currentPage}
//         />
//       ) : (
//         <Sidebar
//           darkMode={darkMode}
//           goToEvents={goToEvents}
//           goToLogin={goToLogin}
//           goToLanding={goToLanding}
//           role={role}
//           goToProfile={goToProfile}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//           currentPage={currentPage}
//         />
//       )}
//       <main className="content-area" id="mainContentScroll">
//         <Topbar
//           darkMode={darkMode}
//           setDarkMode={setDarkMode}
//           goToLogin={goToLogin}
//           role={role}
//           onLogout={handleLogoutClick}
//           goToSignUp={goToSignUp}
//         />
//         <Hero darkMode={darkMode} />
//         <Features />
//         <Steps />
//         <About />
//         <BottomCTA role={role} goToLogin={goToLogin} goToEvents={goToEvents} />
//         <Footer />
//       </main>

//       {logoutModal && (
//         <div className="confirm-overlay" onClick={() => setLogoutModal(false)}>
//           <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
//             <h3>Logout</h3>
//             <p>Are you sure you want to logout?</p>
//             <div className="confirm-actions">
//               <button className="btn-confirm-cancel" onClick={() => setLogoutModal(false)}>
//                 Cancel
//               </button>
//               <button className="btn-confirm-yes" onClick={confirmLogout}>
//                 Yes, Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useLayoutEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import './clubpilot.css';
// import ProfilePage from './ProfilePage';
// import Sidebar from './Sidebar';
// import Topbar from './Topbar';
// import Hero from './Hero';
// import Features from './Features';
// import Steps from './Steps';
// import About from './About';
// import BottomCTA from './BottomCTA';
// import Footer from './Footer';
// import EventPage from './EventPage';
// import EventSidebar from './EventSidebar';
// import EventDetailPage from './EventDetailPage';
// import LoginPage from './LoginPage';
// import GuestSidebar from './GuestSidebar';
// import SignUpPage from './SignUpPage';
// import TaskPage from './TaskPage';
// import TaskSidebar from './TaskSidebar';
// import MembersDashboard from './Members/pages/MembersDashboard';
// import MemberSidebar from './MemberSidebar';
// import './Members/Members.css';
// import MemberPage from './MemberPage';
// import { initialTasks } from './Members/data/taskData';
// import Analytics from './Analytics';

// function App() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem('darkMode') === 'true'
//   );
//   const [currentPage, setCurrentPage] = useState('landing');
//   const [role, setRole] = useState(null);
//   const [currentMemberId, setCurrentMemberId] = useState(null);
//   const [logoutModal, setLogoutModal] = useState(false);
//   const [selectedEventId, setSelectedEventId] = useState(null);

//   const [tasks, setTasks] = useState(() => {
//     const saved = localStorage.getItem('tasks');
//     if (saved) {
//       return JSON.parse(saved);
//     }
//     return initialTasks;
//   });

//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   // ---- URL → state sync ----
//   useEffect(() => {
//     const path = location.pathname;

//     if (path === '/' || path === '') setCurrentPage('landing');
//     else if (path === '/login') setCurrentPage('login');
//     else if (path === '/signup') setCurrentPage('signup');
//     else if (path === '/events') setCurrentPage('events');
//     else if (path === '/tasks') setCurrentPage('tasks');
//     else if (path === '/members') setCurrentPage('members');
//     else if (path === '/profile') setCurrentPage('profile');
//     else if (path === '/analytics') setCurrentPage('analytics');
//     else if (path === '/member/dashboard') setCurrentPage('core-member');
//     else if (path === '/member/club') setCurrentPage('core-club');
//     else if (path === '/member/tasks') setCurrentPage('member-tasks');
//     else if (path === '/member/events') setCurrentPage('member-events');
//   }, [location.pathname]);

//   // ---- state → URL sync ----
//   useEffect(() => {
//     let path = '/';
//     if (currentPage === 'landing') path = '/';
//     else if (currentPage === 'login') path = '/login';
//     else if (currentPage === 'signup') path = '/signup';
//     else if (currentPage === 'events') path = '/events';
//     else if (currentPage === 'tasks') path = '/tasks';
//     else if (currentPage === 'members') path = '/members';
//     else if (currentPage === 'profile') path = '/profile';
//     else if (currentPage === 'analytics') path = '/analytics';
//     else if (currentPage === 'core-member') path = '/member/dashboard';
//     else if (currentPage === 'core-club') path = '/member/club';
//     else if (currentPage === 'member-tasks') path = '/member/tasks';
//     else if (currentPage === 'member-events') path = '/member/events';

//     if (location.pathname !== path) navigate(path);
//   }, [currentPage]);

//   // ---- Navigation ----
//   const goToProfile = () => setCurrentPage('profile');
//   const goToSignUp = () => setCurrentPage('signup');
//   const goToTasks = () => setCurrentPage('tasks');
//   const goToMembers = () => setCurrentPage('members');
//   const goToEvents = () => setCurrentPage('events');
//   const goToLanding = () => setCurrentPage('landing');
//   const goToLogin = () => setCurrentPage('login');
//   const goToAnalytics = () => setCurrentPage('analytics');
//   const goToEventDetail = (eventId) => {
//     setSelectedEventId(eventId);
//     setCurrentPage('event-detail');
//   };

//   // ---- Auth ----
//   const handleSignUp = (userRole) => {
//     setRole(userRole);
//     localStorage.setItem('userRole', userRole);
//     setCurrentPage('landing');
//   };

//   const handleLogin = (userRole, memberId = null) => {
//     setRole(userRole);
//     localStorage.setItem('userRole', userRole);

//     if (userRole === 'core-member' && memberId) {
//       setCurrentMemberId(memberId);
//     }
//     setCurrentPage('landing');
//   };

//   const handleLogoutClick = () => {
//     setLogoutModal(true);
//   };

//   const confirmLogout = () => {
//     setLogoutModal(false);
//     setTimeout(() => {
//       setRole(null);
//       localStorage.removeItem('userRole');
//       setCurrentPage('landing');
//     }, 300);
//   };

//   // ---- Dark mode persistence ----
//   useEffect(() => {
//     localStorage.setItem('darkMode', darkMode);
//   }, [darkMode]);

//   // ---- Events ----
//   const [events, setEvents] = useState(() => {
//     const savedEvents = localStorage.getItem('events');
//     if (savedEvents) {
//       return JSON.parse(savedEvents);
//     }
//     return [
//       { id: 1, title: 'Tech Meetup 2026', date: '2026-08-25', time: '10:00 - 13:00', venue: 'Room 101, Main Building', description: 'Join us for an exciting tech meetup with industry experts.', status: 'upcoming', category: 'tech', icon: '💻', capacity: 50, participants: 20, participantNames: [] },
//       { id: 2, title: 'Annual Cultural Fest', date: '2026-09-05', time: '14:00 - 17:00', venue: 'Seminar Hall', description: 'Plan the biggest cultural fest of the year.', status: 'upcoming', category: 'cultural', icon: '🎭', capacity: 50, participants: 33, participantNames: [] },
//       { id: 3, title: 'Football Tournament', date: '2026-08-20', time: '08:00 - 18:00', venue: 'Sports Ground', description: 'Inter-college football tournament with 8 teams.', status: 'ongoing', category: 'sports', icon: '⚽', capacity: 50, participants: 10, participantNames: [] },
//       { id: 4, title: 'UI/UX Design Workshop', date: '2026-08-15', time: '11:00 - 15:00', venue: 'Design Studio', description: 'Learn the basics of UI/UX design.', status: 'completed', category: 'workshop', icon: '📚', capacity: 50, participants: 37, participantNames: [] },
//       { id: 5, title: 'Club Orientation Day', date: '2026-07-28', time: '09:00 - 12:00', venue: 'Auditorium', description: 'Welcome new members to the club.', status: 'completed', category: 'social', icon: '🎉', capacity: 50, participants: 26, participantNames: [] },
//       { id: 6, title: 'Guest Lecture: AI & ML', date: '2026-09-10', time: '15:00 - 17:00', venue: 'Lecture Hall 2', description: 'Guest lecture on Artificial Intelligence.', status: 'upcoming', category: 'academic', icon: '🤖', capacity: 50, participants: 29, participantNames: [] },
//       { id: 7, title: 'Dance Competition', date: '2026-08-10', time: '18:00 - 21:00', venue: 'Auditorium', description: 'Inter-club dance competition.', status: 'cancelled', category: 'cultural', icon: '💃', capacity: 50, participants: 8, participantNames: [] },
//       { id: 8, title: 'Coding Hackathon', date: '2026-09-15', time: '09:00 - 21:00', venue: 'Computer Lab', description: '24-hour coding hackathon.', status: 'upcoming', category: 'tech', icon: '⌨️', capacity: 50, participants: 40, participantNames: [] }
//     ];
//   });

//   useEffect(() => {
//     localStorage.setItem('events', JSON.stringify(events));
//   }, [events]);

//   // ---- AOS Initialization (Fixed for fresh tab/page load) ----
//   useLayoutEffect(() => {
//     let animId;
//     animId = requestAnimationFrame(() => {
//       requestAnimationFrame(() => {
//         AOS.init({
//           once: false,
//           mirror: true,
//           duration: 600,
//           easing: 'ease-out',
//           startEvent: 'DOMContentLoaded',
//         });
//         AOS.refresh();
//       });
//     });

//     const scrollContainer = document.getElementById('mainContentScroll');
//     const onScroll = () => AOS.refresh();

//     if (scrollContainer) {
//       scrollContainer.addEventListener('scroll', onScroll);
//     }

//     return () => {
//       if (animId) cancelAnimationFrame(animId);
//       if (scrollContainer) {
//         scrollContainer.removeEventListener('scroll', onScroll);
//       }
//     };
//   }, [currentPage]);

//   // ---- Page Routes ----

//   if (currentPage === 'login') {
//     return <LoginPage onLogin={handleLogin} darkMode={darkMode} goToSignUp={goToSignUp} />;
//   }

//   if (currentPage === 'events') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <EventSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <EventPage
//             darkMode={darkMode}
//             role={role}
//             events={events}
//             setEvents={setEvents}
//             goToAnalytics={goToAnalytics}
//             onEventClick={goToEventDetail}
//             currentMemberId={currentMemberId}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (currentPage === 'event-detail') {
//     const selectedEvent = events.find(e => e.id === selectedEventId);
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <EventSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <EventDetailPage
//             event={selectedEvent}
//             onBack={goToEvents}
//             darkMode={darkMode}
//             role={role}
//             setEvents={setEvents}
//             currentMemberId={currentMemberId}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (currentPage === 'analytics') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <EventSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <Analytics
//             darkMode={darkMode}
//             role={role}
//             events={events}
//             onBack={goToEvents}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (['core-member', 'core-club', 'member-tasks', 'member-events'].includes(currentPage)) {
//     const tab =
//       currentPage === 'core-member' ? 'hub' :
//       currentPage === 'core-club' ? 'club' :
//       currentPage === 'member-events' ? 'events' : 'tasks';

//     return (
//       <MemberPage
//         darkMode={darkMode}
//         currentMemberId={currentMemberId}
//         tasks={tasks}
//         setTasks={setTasks}
//         events={events}
//         setEvents={setEvents}
//         role={role}
//         initialTab={tab}
//         goToLanding={goToLanding}
//         goToProfile={goToProfile}
//       />
//     );
//   }

//   if (currentPage === 'signup') {
//     return <SignUpPage onSignUp={handleSignUp} darkMode={darkMode} goToLogin={goToLogin} />;
//   }

//   if (currentPage === 'profile') {
//     if (!role) {
//       return null;
//     }
//     return (
//       <ProfilePage
//         darkMode={darkMode}
//         role={role}
//         goToLanding={goToLanding}
//         setDarkMode={setDarkMode}
//       />
//     );
//   }

//   if (currentPage === 'tasks') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <TaskSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToEvents={goToEvents}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <TaskPage
//             darkMode={darkMode}
//             role={role}
//             tasks={tasks}
//             setTasks={setTasks}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (currentPage === 'members') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <Sidebar
//           darkMode={darkMode}
//           goToEvents={goToEvents}
//           goToLogin={goToLogin}
//           goToLanding={goToLanding}
//           role={role}
//           goToProfile={goToProfile}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//           currentPage={currentPage}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <MembersDashboard />
//         </div>
//       </div>
//     );
//   }

//   // ---- Landing (default) ----
//   return (
//     <div className={darkMode ? "main-layout dark" : "main-layout"}>
//       {!role ? (
//         <GuestSidebar darkMode={darkMode} goToLogin={goToLogin} goToMembers={goToMembers} />
//       ) : role === 'core-member' ? (
//         <MemberSidebar
//           darkMode={darkMode}
//           goToHome={goToLanding}
//           goToCoreMember={() => setCurrentPage('core-member')}
//           goToCoreClub={() => setCurrentPage('core-club')}
//           goToTasks={() => setCurrentPage('member-tasks')}
//           goToEvents={() => setCurrentPage('member-events')}
//           goToProfile={goToProfile}
//           currentPage={currentPage}
//         />
//       ) : (
//         <Sidebar
//           darkMode={darkMode}
//           goToEvents={goToEvents}
//           goToLogin={goToLogin}
//           goToLanding={goToLanding}
//           role={role}
//           goToProfile={goToProfile}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//           currentPage={currentPage}
//         />
//       )}
//       <main className="content-area" id="mainContentScroll">
//         <Topbar
//           darkMode={darkMode}
//           setDarkMode={setDarkMode}
//           goToLogin={goToLogin}
//           role={role}
//           onLogout={handleLogoutClick}
//           goToSignUp={goToSignUp}
//         />
//         <Hero darkMode={darkMode} />
//         <Features />
//         <Steps />
//         <About />
//         <BottomCTA role={role} goToLogin={goToLogin} goToEvents={goToEvents} />
//         <Footer />
//       </main>

//       {logoutModal && (
//         <div className="confirm-overlay" onClick={() => setLogoutModal(false)}>
//           <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
//             <h3>Logout</h3>
//             <p>Are you sure you want to logout?</p>
//             <div className="confirm-actions">
//               <button className="btn-confirm-cancel" onClick={() => setLogoutModal(false)}>
//                 Cancel
//               </button>
//               <button className="btn-confirm-yes" onClick={confirmLogout}>
//                 Yes, Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


// import React, { useEffect, useLayoutEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import './clubpilot.css';
// import ProfilePage from './ProfilePage';
// import Sidebar from './Sidebar';
// import Topbar from './Topbar';
// import Hero from './Hero';
// import Features from './Features';
// import Steps from './Steps';
// import About from './About';
// import BottomCTA from './BottomCTA';
// import Footer from './Footer';
// import EventPage from './EventPage';
// import EventSidebar from './EventSidebar';
// import EventDetailPage from './EventDetailPage';
// import LoginPage from './LoginPage';
// import GuestSidebar from './GuestSidebar';
// import SignUpPage from './SignUpPage';
// import TaskPage from './TaskPage';
// import TaskSidebar from './TaskSidebar';
// import MembersDashboard from './Members/pages/MembersDashboard';
// import MemberSidebar from './MemberSidebar';
// import './Members/Members.css';
// import MemberPage from './MemberPage';
// import { initialTasks } from './Members/data/taskData';
// import Analytics from './Analytics';

// function App() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem('darkMode') === 'true'
//   );
//   const [currentPage, setCurrentPage] = useState('landing');
//   const [role, setRole] = useState(null);
//   const [currentMemberId, setCurrentMemberId] = useState(null);
//   const [logoutModal, setLogoutModal] = useState(false);
//   const [selectedEventId, setSelectedEventId] = useState(null);

//   const [tasks, setTasks] = useState(() => {
//     const saved = localStorage.getItem('tasks');
//     if (saved) {
//       return JSON.parse(saved);
//     }
//     return initialTasks;
//   });

//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   // ---- URL → state sync ----
//   useEffect(() => {
//     const path = location.pathname;

//     if (path === '/' || path === '') setCurrentPage('landing');
//     else if (path === '/login') setCurrentPage('login');
//     else if (path === '/signup') setCurrentPage('signup');
//     else if (path === '/events') setCurrentPage('events');
//     else if (path.match(/^\/events\/\d+$/)) {
//       setSelectedEventId(Number(path.split('/')[2]));
//       setCurrentPage('event-detail');
//     }
//     else if (path === '/tasks') setCurrentPage('tasks');
//     else if (path === '/members') setCurrentPage('members');
//     else if (path === '/profile') setCurrentPage('profile');
//     else if (path === '/analytics') setCurrentPage('analytics');
//     else if (path === '/member/dashboard') setCurrentPage('core-member');
//     else if (path === '/member/club') setCurrentPage('core-club');
//     else if (path === '/member/tasks') setCurrentPage('member-tasks');
//     else if (path === '/member/events') setCurrentPage('member-events');
//   }, [location.pathname]);

//   // ---- state → URL sync ----
//   useEffect(() => {
//     let path = '/';
//     if (currentPage === 'landing') path = '/';
//     else if (currentPage === 'login') path = '/login';
//     else if (currentPage === 'signup') path = '/signup';
//     else if (currentPage === 'events') path = '/events';
//     else if (currentPage === 'event-detail') path = `/events/${selectedEventId}`;
//     else if (currentPage === 'tasks') path = '/tasks';
//     else if (currentPage === 'members') path = '/members';
//     else if (currentPage === 'profile') path = '/profile';
//     else if (currentPage === 'analytics') path = '/analytics';
//     else if (currentPage === 'core-member') path = '/member/dashboard';
//     else if (currentPage === 'core-club') path = '/member/club';
//     else if (currentPage === 'member-tasks') path = '/member/tasks';
//     else if (currentPage === 'member-events') path = '/member/events';

//     if (location.pathname !== path) navigate(path);
//   }, [currentPage, selectedEventId]);

//   // ---- Navigation ----
//   const goToProfile = () => setCurrentPage('profile');
//   const goToSignUp = () => setCurrentPage('signup');
//   const goToTasks = () => setCurrentPage('tasks');
//   const goToMembers = () => setCurrentPage('members');
//   const goToEvents = () => setCurrentPage('events');
//   const goToLanding = () => setCurrentPage('landing');
//   const goToLogin = () => setCurrentPage('login');
//   const goToAnalytics = () => setCurrentPage('analytics');
//   const goToEventDetail = (eventId) => {
//     setSelectedEventId(eventId);
//     setCurrentPage('event-detail');
//   };

//   // ---- Auth ----
//   const handleSignUp = (userRole) => {
//     setRole(userRole);
//     localStorage.setItem('userRole', userRole);
//     setCurrentPage('landing');
//   };

//   const handleLogin = (userRole, memberId = null) => {
//     setRole(userRole);
//     localStorage.setItem('userRole', userRole);

//     if (userRole === 'core-member' && memberId) {
//       setCurrentMemberId(memberId);
//     }
//     setCurrentPage('landing');
//   };

//   const handleLogoutClick = () => {
//     setLogoutModal(true);
//   };

//   const confirmLogout = () => {
//     setLogoutModal(false);
//     setTimeout(() => {
//       setRole(null);
//       localStorage.removeItem('userRole');
//       setCurrentPage('landing');
//     }, 300);
//   };

//   // ---- Dark mode persistence ----
//   useEffect(() => {
//     localStorage.setItem('darkMode', darkMode);
//   }, [darkMode]);

//   // ---- Events ----
//   const [events, setEvents] = useState(() => {
//     const savedEvents = localStorage.getItem('events');
//     if (savedEvents) {
//       return JSON.parse(savedEvents);
//     }
//     return [
//       { id: 1, title: 'Tech Meetup 2026', date: '2026-08-25', time: '10:00 - 13:00', venue: 'Room 101, Main Building', description: 'Join us for an exciting tech meetup with industry experts.', status: 'upcoming', category: 'tech', icon: '💻', capacity: 50, participants: 20, participantNames: [] },
//       { id: 2, title: 'Annual Cultural Fest', date: '2026-09-05', time: '14:00 - 17:00', venue: 'Seminar Hall', description: 'Plan the biggest cultural fest of the year.', status: 'upcoming', category: 'cultural', icon: '🎭', capacity: 50, participants: 33, participantNames: [] },
//       { id: 3, title: 'Football Tournament', date: '2026-08-20', time: '08:00 - 18:00', venue: 'Sports Ground', description: 'Inter-college football tournament with 8 teams.', status: 'ongoing', category: 'sports', icon: '⚽', capacity: 50, participants: 10, participantNames: [] },
//       { id: 4, title: 'UI/UX Design Workshop', date: '2026-08-15', time: '11:00 - 15:00', venue: 'Design Studio', description: 'Learn the basics of UI/UX design.', status: 'completed', category: 'workshop', icon: '📚', capacity: 50, participants: 37, participantNames: [] },
//       { id: 5, title: 'Club Orientation Day', date: '2026-07-28', time: '09:00 - 12:00', venue: 'Auditorium', description: 'Welcome new members to the club.', status: 'completed', category: 'social', icon: '🎉', capacity: 50, participants: 26, participantNames: [] },
//       { id: 6, title: 'Guest Lecture: AI & ML', date: '2026-09-10', time: '15:00 - 17:00', venue: 'Lecture Hall 2', description: 'Guest lecture on Artificial Intelligence.', status: 'upcoming', category: 'academic', icon: '🤖', capacity: 50, participants: 29, participantNames: [] },
//       { id: 7, title: 'Dance Competition', date: '2026-08-10', time: '18:00 - 21:00', venue: 'Auditorium', description: 'Inter-club dance competition.', status: 'cancelled', category: 'cultural', icon: '💃', capacity: 50, participants: 8, participantNames: [] },
//       { id: 8, title: 'Coding Hackathon', date: '2026-09-15', time: '09:00 - 21:00', venue: 'Computer Lab', description: '24-hour coding hackathon.', status: 'upcoming', category: 'tech', icon: '⌨️', capacity: 50, participants: 40, participantNames: [] }
//     ];
//   });

//   useEffect(() => {
//     localStorage.setItem('events', JSON.stringify(events));
//   }, [events]);

//   // ---- AOS Initialization (from Code 1 — KEPT AS-IS) ----
//   useLayoutEffect(() => {
//     let animId;
//     animId = requestAnimationFrame(() => {
//       requestAnimationFrame(() => {
//         AOS.init({
//           once: false,
//           mirror: true,
//           duration: 600,
//           easing: 'ease-out',
//           startEvent: 'DOMContentLoaded',
//         });
//         AOS.refresh();
//       });
//     });

//     const scrollContainer = document.getElementById('mainContentScroll');
//     const onScroll = () => AOS.refresh();

//     if (scrollContainer) {
//       scrollContainer.addEventListener('scroll', onScroll);
//     }

//     return () => {
//       if (animId) cancelAnimationFrame(animId);
//       if (scrollContainer) {
//         scrollContainer.removeEventListener('scroll', onScroll);
//       }
//     };
//   }, [currentPage]);

//   // ---- Page Routes ----

//   if (currentPage === 'login') {
//     return <LoginPage onLogin={handleLogin} darkMode={darkMode} goToSignUp={goToSignUp} />;
//   }

//   if (currentPage === 'events') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <EventSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <EventPage
//             darkMode={darkMode}
//             role={role}
//             events={events}
//             setEvents={setEvents}
//             goToAnalytics={goToAnalytics}
//             onEventClick={goToEventDetail}
//             currentMemberId={currentMemberId}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (currentPage === 'event-detail') {
//     const selectedEvent = events.find(e => e.id === selectedEventId);
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <EventSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <EventDetailPage
//             event={selectedEvent}
//             onBack={goToEvents}
//             darkMode={darkMode}
//             role={role}
//             setEvents={setEvents}
//             currentMemberId={currentMemberId}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (currentPage === 'analytics') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <EventSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <Analytics
//             darkMode={darkMode}
//             role={role}
//             events={events}
//             onBack={goToEvents}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (['core-member', 'core-club', 'member-tasks', 'member-events'].includes(currentPage)) {
//     const tab =
//       currentPage === 'core-member' ? 'hub' :
//       currentPage === 'core-club' ? 'club' :
//       currentPage === 'member-events' ? 'events' : 'tasks';

//     return (
//       <MemberPage
//         darkMode={darkMode}
//         currentMemberId={currentMemberId}
//         tasks={tasks}
//         setTasks={setTasks}
//         events={events}
//         setEvents={setEvents}
//         role={role}
//         initialTab={tab}
//         goToLanding={goToLanding}
//         goToProfile={goToProfile}
//       />
//     );
//   }

//   if (currentPage === 'signup') {
//     return <SignUpPage onSignUp={handleSignUp} darkMode={darkMode} goToLogin={goToLogin} />;
//   }

//   if (currentPage === 'profile') {
//     if (!role) {
//       return null;
//     }
//     return (
//       <ProfilePage
//         darkMode={darkMode}
//         role={role}
//         goToLanding={goToLanding}
//         setDarkMode={setDarkMode}
//       />
//     );
//   }

//   if (currentPage === 'tasks') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <TaskSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToEvents={goToEvents}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <TaskPage
//             darkMode={darkMode}
//             role={role}
//             tasks={tasks}
//             setTasks={setTasks}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (currentPage === 'members') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <Sidebar
//           darkMode={darkMode}
//           goToEvents={goToEvents}
//           goToLogin={goToLogin}
//           goToLanding={goToLanding}
//           role={role}
//           goToProfile={goToProfile}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//           currentPage={currentPage}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <MembersDashboard />
//         </div>
//       </div>
//     );
//   }

//   // ---- Landing (default) ----
//   return (
//     <div className={darkMode ? "main-layout dark" : "main-layout"}>
//       {!role ? (
//         <GuestSidebar darkMode={darkMode} goToLogin={goToLogin} goToMembers={goToMembers} />
//       ) : role === 'core-member' ? (
//         <MemberSidebar
//           darkMode={darkMode}
//           goToHome={goToLanding}
//           goToCoreMember={() => setCurrentPage('core-member')}
//           goToCoreClub={() => setCurrentPage('core-club')}
//           goToTasks={() => setCurrentPage('member-tasks')}
//           goToEvents={() => setCurrentPage('member-events')}
//           goToProfile={goToProfile}
//           currentPage={currentPage}
//         />
//       ) : (
//         <Sidebar
//           darkMode={darkMode}
//           goToEvents={goToEvents}
//           goToLogin={goToLogin}
//           goToLanding={goToLanding}
//           role={role}
//           goToProfile={goToProfile}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//           currentPage={currentPage}
//         />
//       )}
//       <main className="content-area" id="mainContentScroll">
//         <Topbar
//           darkMode={darkMode}
//           setDarkMode={setDarkMode}
//           goToLogin={goToLogin}
//           role={role}
//           onLogout={handleLogoutClick}
//           goToSignUp={goToSignUp}
//         />
//         <Hero darkMode={darkMode} />
//         <Features />
//         <Steps />
//         <About />
//         <BottomCTA role={role} goToLogin={goToLogin} goToEvents={goToEvents} />
//         <Footer />
//       </main>

//       {logoutModal && (
//         <div className="confirm-overlay" onClick={() => setLogoutModal(false)}>
//           <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
//             <h3>Logout</h3>
//             <p>Are you sure you want to logout?</p>
//             <div className="confirm-actions">
//               <button className="btn-confirm-cancel" onClick={() => setLogoutModal(false)}>
//                 Cancel
//               </button>
//               <button className="btn-confirm-yes" onClick={confirmLogout}>
//                 Yes, Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import './clubpilot.css';
// import ProfilePage from './ProfilePage';
// import Sidebar from './Sidebar';
// import Topbar from './Topbar';
// import Hero from './Hero';
// import Features from './Features';
// import Steps from './Steps';
// import About from './About';
// import BottomCTA from './BottomCTA';
// import Footer from './Footer';
// import EventPage from './EventPage';
// import EventSidebar from './EventSidebar';
// import EventDetailPage from './EventDetailPage';
// import LoginPage from './LoginPage';
// import GuestSidebar from './GuestSidebar';
// import SignUpPage from './SignUpPage';
// import TaskPage from './TaskPage';
// import TaskSidebar from './TaskSidebar';
// import MembersDashboard from './Members/pages/MembersDashboard';
// import MemberSidebar from './MemberSidebar';
// import './Members/Members.css';
// import MemberPage from './MemberPage';
// import { initialTasks } from './Members/data/taskData';
// import Analytics from './Analytics';

// function App() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem('darkMode') === 'true'
//   );
//   const [currentPage, setCurrentPage] = useState('landing');
//   const [role, setRole] = useState(null);
//   const [currentMemberId, setCurrentMemberId] = useState(null);
//   const [logoutModal, setLogoutModal] = useState(false);
//   const [selectedEventId, setSelectedEventId] = useState(null);

//   const [tasks, setTasks] = useState(() => {
//     const saved = localStorage.getItem('tasks');
//     if (saved) {
//       return JSON.parse(saved);
//     }
//     return initialTasks;
//   });

//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   // ---- URL → state sync ----
//   useEffect(() => {
//     const path = location.pathname;

//     if (path === '/' || path === '') setCurrentPage('landing');
//     else if (path === '/login') setCurrentPage('login');
//     else if (path === '/signup') setCurrentPage('signup');
//     else if (path === '/events') setCurrentPage('events');
//     else if (path.match(/^\/events\/\d+$/)) {
//       setSelectedEventId(Number(path.split('/')[2]));
//       setCurrentPage('event-detail');
//     }
//     else if (path === '/tasks') setCurrentPage('tasks');
//     else if (path === '/members') setCurrentPage('members');
//     else if (path === '/profile') setCurrentPage('profile');
//     else if (path === '/analytics') setCurrentPage('analytics');
//     else if (path === '/member/dashboard') setCurrentPage('core-member');
//     else if (path === '/member/club') setCurrentPage('core-club');
//     else if (path === '/member/tasks') setCurrentPage('member-tasks');
//     else if (path === '/member/events') setCurrentPage('member-events');
//   }, [location.pathname]);

//   // ---- state → URL sync ----
//   useEffect(() => {
//     let path = '/';
//     if (currentPage === 'landing') path = '/';
//     else if (currentPage === 'login') path = '/login';
//     else if (currentPage === 'signup') path = '/signup';
//     else if (currentPage === 'events') path = '/events';
//     else if (currentPage === 'event-detail') path = `/events/${selectedEventId}`;
//     else if (currentPage === 'tasks') path = '/tasks';
//     else if (currentPage === 'members') path = '/members';
//     else if (currentPage === 'profile') path = '/profile';
//     else if (currentPage === 'analytics') path = '/analytics';
//     else if (currentPage === 'core-member') path = '/member/dashboard';
//     else if (currentPage === 'core-club') path = '/member/club';
//     else if (currentPage === 'member-tasks') path = '/member/tasks';
//     else if (currentPage === 'member-events') path = '/member/events';

//     if (location.pathname !== path) navigate(path);
//   }, [currentPage, selectedEventId]);

//   // ---- Navigation ----
//   const goToProfile = () => setCurrentPage('profile');
//   const goToSignUp = () => setCurrentPage('signup');
//   const goToTasks = () => setCurrentPage('tasks');
//   const goToMembers = () => setCurrentPage('members');
//   const goToEvents = () => setCurrentPage('events');
//   const goToLanding = () => setCurrentPage('landing');
//   const goToLogin = () => setCurrentPage('login');
//   const goToAnalytics = () => setCurrentPage('analytics');
//   const goToEventDetail = (eventId) => {
//     setSelectedEventId(eventId);
//     setCurrentPage('event-detail');
//   };

//   // ---- Auth ----
//   const handleSignUp = (userRole) => {
//     setRole(userRole);
//     localStorage.setItem('userRole', userRole);
//     setCurrentPage('landing');
//   };

//   const handleLogin = (userRole, memberId = null) => {
//     setRole(userRole);
//     localStorage.setItem('userRole', userRole);

//     if (userRole === 'core-member' && memberId) {
//       setCurrentMemberId(memberId);
//     }
//     setCurrentPage('landing');
//   };

//   const handleLogoutClick = () => {
//     setLogoutModal(true);
//   };

//   const confirmLogout = () => {
//     setLogoutModal(false);
//     setTimeout(() => {
//       setRole(null);
//       localStorage.removeItem('userRole');
//       setCurrentPage('landing');
//     }, 300);
//   };

//   // ---- Dark mode persistence ----
//   useEffect(() => {
//     localStorage.setItem('darkMode', darkMode);
//   }, [darkMode]);

//   // ---- Events ----
//   const [events, setEvents] = useState(() => {
//     const savedEvents = localStorage.getItem('events');
//     if (savedEvents) {
//       return JSON.parse(savedEvents);
//     }
//     return [
//       { id: 1, title: 'Tech Meetup 2026', date: '2026-08-25', time: '10:00 - 13:00', venue: 'Room 101, Main Building', description: 'Join us for an exciting tech meetup with industry experts.', status: 'upcoming', category: 'tech', icon: '💻', capacity: 50, participants: 20, participantNames: [] },
//       { id: 2, title: 'Annual Cultural Fest', date: '2026-09-05', time: '14:00 - 17:00', venue: 'Seminar Hall', description: 'Plan the biggest cultural fest of the year.', status: 'upcoming', category: 'cultural', icon: '🎭', capacity: 50, participants: 33, participantNames: [] },
//       { id: 3, title: 'Football Tournament', date: '2026-08-20', time: '08:00 - 18:00', venue: 'Sports Ground', description: 'Inter-college football tournament with 8 teams.', status: 'ongoing', category: 'sports', icon: '⚽', capacity: 50, participants: 10, participantNames: [] },
//       { id: 4, title: 'UI/UX Design Workshop', date: '2026-08-15', time: '11:00 - 15:00', venue: 'Design Studio', description: 'Learn the basics of UI/UX design.', status: 'completed', category: 'workshop', icon: '📚', capacity: 50, participants: 37, participantNames: [] },
//       { id: 5, title: 'Club Orientation Day', date: '2026-07-28', time: '09:00 - 12:00', venue: 'Auditorium', description: 'Welcome new members to the club.', status: 'completed', category: 'social', icon: '🎉', capacity: 50, participants: 26, participantNames: [] },
//       { id: 6, title: 'Guest Lecture: AI & ML', date: '2026-09-10', time: '15:00 - 17:00', venue: 'Lecture Hall 2', description: 'Guest lecture on Artificial Intelligence.', status: 'upcoming', category: 'academic', icon: '🤖', capacity: 50, participants: 29, participantNames: [] },
//       { id: 7, title: 'Dance Competition', date: '2026-08-10', time: '18:00 - 21:00', venue: 'Auditorium', description: 'Inter-club dance competition.', status: 'cancelled', category: 'cultural', icon: '💃', capacity: 50, participants: 8, participantNames: [] },
//       { id: 8, title: 'Coding Hackathon', date: '2026-09-15', time: '09:00 - 21:00', venue: 'Computer Lab', description: '24-hour coding hackathon.', status: 'upcoming', category: 'tech', icon: '⌨️️', capacity: 50, participants: 40, participantNames: [] }
//     ];
//   });

//   useEffect(() => {
//     localStorage.setItem('events', JSON.stringify(events));
//   }, [events]);

//   // ---- AOS Initialization with useEffect triggered on currentPage ----
//   useEffect(() => {
//     // Initialize AOS settings
//     AOS.init({
//       once: false,
//       mirror: true,
//       duration: 600,
//       easing: 'ease-out',
//     });

//     // Timeout ensures DOM elements are rendered after route/page change
//     const timer = setTimeout(() => {
//       AOS.refreshHard();
//     }, 100);

//     const scrollContainer = document.getElementById('mainContentScroll');
//     const onScroll = () => AOS.refresh();

//     if (scrollContainer) {
//       scrollContainer.addEventListener('scroll', onScroll);
//     }

//     return () => {
//       clearTimeout(timer);
//       if (scrollContainer) {
//         scrollContainer.removeEventListener('scroll', onScroll);
//       }
//     };
//   }, [currentPage]);

//   // ---- Page Routes ----

//   if (currentPage === 'login') {
//     return <LoginPage onLogin={handleLogin} darkMode={darkMode} goToSignUp={goToSignUp} />;
//   }

//   if (currentPage === 'events') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <EventSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <EventPage
//             darkMode={darkMode}
//             role={role}
//             events={events}
//             setEvents={setEvents}
//             goToAnalytics={goToAnalytics}
//             onEventClick={goToEventDetail}
//             currentMemberId={currentMemberId}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (currentPage === 'event-detail') {
//     const selectedEvent = events.find(e => e.id === selectedEventId);
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <EventSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <EventDetailPage
//             event={selectedEvent}
//             onBack={goToEvents}
//             darkMode={darkMode}
//             role={role}
//             setEvents={setEvents}
//             currentMemberId={currentMemberId}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (currentPage === 'analytics') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <EventSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <Analytics
//             darkMode={darkMode}
//             role={role}
//             events={events}
//             onBack={goToEvents}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (['core-member', 'core-club', 'member-tasks', 'member-events'].includes(currentPage)) {
//     const tab =
//       currentPage === 'core-member' ? 'hub' :
//       currentPage === 'core-club' ? 'club' :
//       currentPage === 'member-events' ? 'events' : 'tasks';

//     return (
//       <MemberPage
//         darkMode={darkMode}
//         currentMemberId={currentMemberId}
//         tasks={tasks}
//         setTasks={setTasks}
//         events={events}
//         setEvents={setEvents}
//         role={role}
//         initialTab={tab}
//         goToLanding={goToLanding}
//         goToProfile={goToProfile}
//       />
//     );
//   }

//   if (currentPage === 'signup') {
//     return <SignUpPage onSignUp={handleSignUp} darkMode={darkMode} goToLogin={goToLogin} />;
//   }

//   if (currentPage === 'profile') {
//     if (!role) {
//       return null;
//     }
//     return (
//       <ProfilePage
//         darkMode={darkMode}
//         role={role}
//         goToLanding={goToLanding}
//         setDarkMode={setDarkMode}
//       />
//     );
//   }

//   if (currentPage === 'tasks') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <TaskSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToEvents={goToEvents}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <TaskPage
//             darkMode={darkMode}
//             role={role}
//             tasks={tasks}
//             setTasks={setTasks}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (currentPage === 'members') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <Sidebar
//           darkMode={darkMode}
//           goToEvents={goToEvents}
//           goToLogin={goToLogin}
//           goToLanding={goToLanding}
//           role={role}
//           goToProfile={goToProfile}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//           currentPage={currentPage}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <MembersDashboard />
//         </div>
//       </div>
//     );
//   }

//   // ---- Landing (default) ----
//   return (
//     <div className={darkMode ? "main-layout dark" : "main-layout"}>
//       {!role ? (
//         <GuestSidebar darkMode={darkMode} goToLogin={goToLogin} goToMembers={goToMembers} />
//       ) : role === 'core-member' ? (
//         <MemberSidebar
//           darkMode={darkMode}
//           goToHome={goToLanding}
//           goToCoreMember={() => setCurrentPage('core-member')}
//           goToCoreClub={() => setCurrentPage('core-club')}
//           goToTasks={() => setCurrentPage('member-tasks')}
//           goToEvents={() => setCurrentPage('member-events')}
//           goToProfile={goToProfile}
//           currentPage={currentPage}
//         />
//       ) : (
//         <Sidebar
//           darkMode={darkMode}
//           goToEvents={goToEvents}
//           goToLogin={goToLogin}
//           goToLanding={goToLanding}
//           role={role}
//           goToProfile={goToProfile}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//           currentPage={currentPage}
//         />
//       )}
//       <main className="content-area" id="mainContentScroll">
//         <Topbar
//           darkMode={darkMode}
//           setDarkMode={setDarkMode}
//           goToLogin={goToLogin}
//           role={role}
//           onLogout={handleLogoutClick}
//           goToSignUp={goToSignUp}
//         />
//         <Hero darkMode={darkMode} />
//         <Features />
//         <Steps />
//         <About />
//         <BottomCTA role={role} goToLogin={goToLogin} goToEvents={goToEvents} />
//         <Footer />
//       </main>

//       {logoutModal && (
//         <div className="confirm-overlay" onClick={() => setLogoutModal(false)}>
//           <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
//             <h3>Logout</h3>
//             <p>Are you sure you want to logout?</p>
//             <div className="confirm-actions">
//               <button className="btn-confirm-cancel" onClick={() => setLogoutModal(false)}>
//                 Cancel
//               </button>
//               <button className="btn-confirm-yes" onClick={confirmLogout}>
//                 Yes, Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useLayoutEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import './clubpilot.css';
// import ProfilePage from './ProfilePage';
// import Sidebar from './Sidebar';
// import Topbar from './Topbar';
// import Hero from './Hero';
// import Features from './Features';
// import Steps from './Steps';
// import About from './About';
// import BottomCTA from './BottomCTA';
// import Footer from './Footer';
// import EventPage from './EventPage';
// import EventSidebar from './EventSidebar';
// import EventDetailPage from './EventDetailPage';
// import LoginPage from './LoginPage';
// import GuestSidebar from './GuestSidebar';
// import SignUpPage from './SignUpPage';
// import TaskPage from './TaskPage';
// import TaskSidebar from './TaskSidebar';
// import MembersDashboard from './Members/pages/MembersDashboard';
// import MemberSidebar from './MemberSidebar';
// import './Members/Members.css';
// import MemberPage from './MemberPage';
// import { initialTasks } from './Members/data/taskData';
// import Analytics from './Analytics';

// function App() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem('darkMode') === 'true'
//   );
//   const [currentPage, setCurrentPage] = useState('landing');
//   const [role, setRole] = useState(null);
//   const [currentMemberId, setCurrentMemberId] = useState(null);
//   const [logoutModal, setLogoutModal] = useState(false);
//   const [selectedEventId, setSelectedEventId] = useState(null);

//   const [tasks, setTasks] = useState(() => {
//     const saved = localStorage.getItem('tasks');
//     if (saved) {
//       return JSON.parse(saved);
//     }
//     return initialTasks;
//   });

//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   // ---- URL → state sync ----
//   useEffect(() => {
//     const path = location.pathname;

//     if (path === '/' || path === '') setCurrentPage('landing');
//     else if (path === '/login') setCurrentPage('login');
//     else if (path === '/signup') setCurrentPage('signup');
//     else if (path === '/events') setCurrentPage('events');
//     else if (path === '/tasks') setCurrentPage('tasks');
//     else if (path === '/members') setCurrentPage('members');
//     else if (path === '/profile') setCurrentPage('profile');
//     else if (path === '/analytics') setCurrentPage('analytics');
//     else if (path === '/member/dashboard') setCurrentPage('core-member');
//     else if (path === '/member/club') setCurrentPage('core-club');
//     else if (path === '/member/tasks') setCurrentPage('member-tasks');
//     else if (path === '/member/events') setCurrentPage('member-events');
//   }, [location.pathname]);

//   // ---- state → URL sync ----
//   useEffect(() => {
//     let path = '/';
//     if (currentPage === 'landing') path = '/';
//     else if (currentPage === 'login') path = '/login';
//     else if (currentPage === 'signup') path = '/signup';
//     else if (currentPage === 'events') path = '/events';
//     else if (currentPage === 'tasks') path = '/tasks';
//     else if (currentPage === 'members') path = '/members';
//     else if (currentPage === 'profile') path = '/profile';
//     else if (currentPage === 'analytics') path = '/analytics';
//     else if (currentPage === 'core-member') path = '/member/dashboard';
//     else if (currentPage === 'core-club') path = '/member/club';
//     else if (currentPage === 'member-tasks') path = '/member/tasks';
//     else if (currentPage === 'member-events') path = '/member/events';

//     if (location.pathname !== path) navigate(path);
//   }, [currentPage]);

//   // ---- Navigation ----
//   const goToProfile = () => setCurrentPage('profile');
//   const goToSignUp = () => setCurrentPage('signup');
//   const goToTasks = () => setCurrentPage('tasks');
//   const goToMembers = () => setCurrentPage('members');
//   const goToEvents = () => setCurrentPage('events');
//   const goToLanding = () => setCurrentPage('landing');
//   const goToLogin = () => setCurrentPage('login');
//   const goToAnalytics = () => setCurrentPage('analytics');
//   const goToEventDetail = (eventId) => {
//     setSelectedEventId(eventId);
//     setCurrentPage('event-detail');
//   };

//   // ---- Auth ----
//   const handleSignUp = (userRole) => {
//     setRole(userRole);
//     localStorage.setItem('userRole', userRole);
//     setCurrentPage('landing');
//   };

//   const handleLogin = (userRole, memberId = null) => {
//     setRole(userRole);
//     localStorage.setItem('userRole', userRole);

//     if (userRole === 'core-member' && memberId) {
//       setCurrentMemberId(memberId);
//     }
//     setCurrentPage('landing');
//   };

//   const handleLogoutClick = () => {
//     setLogoutModal(true);
//   };

//   const confirmLogout = () => {
//     setLogoutModal(false);
//     setTimeout(() => {
//       setRole(null);
//       localStorage.removeItem('userRole');
//       setCurrentPage('landing');
//     }, 300);
//   };

//   // ---- Dark mode persistence ----
//   useEffect(() => {
//     localStorage.setItem('darkMode', darkMode);
//   }, [darkMode]);

//   // ---- Events ----
//   const [events, setEvents] = useState(() => {
//     const savedEvents = localStorage.getItem('events');
//     if (savedEvents) {
//       return JSON.parse(savedEvents);
//     }
//     return [
//       { id: 1, title: 'Tech Meetup 2026', date: '2026-08-25', time: '10:00 - 13:00', venue: 'Room 101, Main Building', description: 'Join us for an exciting tech meetup with industry experts.', status: 'upcoming', category: 'tech', icon: '💻', capacity: 50, participants: 20, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 2, title: 'Annual Cultural Fest', date: '2026-09-05', time: '14:00 - 17:00', venue: 'Seminar Hall', description: 'Plan the biggest cultural fest of the year.', status: 'upcoming', category: 'cultural', icon: '🎭', capacity: 50, participants: 33, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 3, title: 'Football Tournament', date: '2026-08-20', time: '08:00 - 18:00', venue: 'Sports Ground', description: 'Inter-college football tournament with 8 teams.', status: 'ongoing', category: 'sports', icon: '⚽', capacity: 50, participants: 0, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 4, title: 'UI/UX Design Workshop', date: '2026-08-15', time: '11:00 - 15:00', venue: 'Design Studio', description: 'Learn the basics of UI/UX design.', status: 'completed', category: 'workshop', icon: '📚', capacity: 50, participants: 37, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 5, title: 'Club Orientation Day', date: '2026-07-28', time: '09:00 - 12:00', venue: 'Auditorium', description: 'Welcome new members to the club.', status: 'completed', category: 'social', icon: '🎉', capacity: 50, participants: 26, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 6, title: 'Guest Lecture: AI & ML', date: '2026-09-10', time: '15:00 - 17:00', venue: 'Lecture Hall 2', description: 'Guest lecture on Artificial Intelligence.', status: 'upcoming', category: 'academic', icon: '🤖', capacity: 50, participants: 29, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 7, title: 'Dance Competition', date: '2026-08-10', time: '18:00 - 21:00', venue: 'Auditorium', description: 'Inter-club dance competition.', status: 'cancelled', category: 'cultural', icon: '💃', capacity: 50, participants: 8, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 8, title: 'Coding Hackathon', date: '2026-09-15', time: '09:00 - 21:00', venue: 'Computer Lab', description: '24-hour coding hackathon.', status: 'ongoing', category: 'tech', icon: '⌨️', capacity: 50, participants: 40, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] }
//     ];
//   });

//   useEffect(() => {
//     localStorage.setItem('events', JSON.stringify(events));
//   }, [events]);

//   // ---- AOS Initialization ----
//   useLayoutEffect(() => {
//     let animId;
//     animId = requestAnimationFrame(() => {
//       requestAnimationFrame(() => {
//         AOS.init({
//           once: false,
//           mirror: true,
//           duration: 600,
//           easing: 'ease-out',
//           startEvent: 'DOMContentLoaded',
//         });
//         AOS.refresh();
//       });
//     });

//     const scrollContainer = document.getElementById('mainContentScroll');
//     const onScroll = () => AOS.refresh();

//     if (scrollContainer) {
//       scrollContainer.addEventListener('scroll', onScroll);
//     }

//     return () => {
//       if (animId) cancelAnimationFrame(animId);
//       if (scrollContainer) {
//         scrollContainer.removeEventListener('scroll', onScroll);
//       }
//     };
//   }, [currentPage, location.key]);   // ✅ location.key added

//   // ---- Page Routes ----

//   if (currentPage === 'login') {
//     return <LoginPage onLogin={handleLogin} darkMode={darkMode} goToSignUp={goToSignUp} />;
//   }

//   if (currentPage === 'events') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <EventSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <EventPage
//             darkMode={darkMode}
//             role={role}
//             events={events}
//             setEvents={setEvents}
//             goToAnalytics={goToAnalytics}
//             onEventClick={goToEventDetail}
//             currentMemberId={currentMemberId}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (currentPage === 'event-detail') {
//     const selectedEvent = events.find(e => e.id === selectedEventId);
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <EventSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <EventDetailPage
//             event={selectedEvent}
//             onBack={goToEvents}
//             darkMode={darkMode}
//             role={role}
//             setEvents={setEvents}
//             currentMemberId={currentMemberId}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (currentPage === 'analytics') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <EventSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <Analytics
//             darkMode={darkMode}
//             role={role}
//             events={events}
//             onBack={goToEvents}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (['core-member', 'core-club', 'member-tasks', 'member-events'].includes(currentPage)) {
//     const tab =
//       currentPage === 'core-member' ? 'hub' :
//       currentPage === 'core-club' ? 'club' :
//       currentPage === 'member-events' ? 'events' : 'tasks';

//     return (
//       <MemberPage
//         darkMode={darkMode}
//         currentMemberId={currentMemberId}
//         tasks={tasks}
//         setTasks={setTasks}
//         events={events}
//         setEvents={setEvents}
//         role={role}
//         initialTab={tab}
//         goToLanding={goToLanding}
//         goToProfile={goToProfile}
//       />
//     );
//   }

//   if (currentPage === 'signup') {
//     return <SignUpPage onSignUp={handleSignUp} darkMode={darkMode} goToLogin={goToLogin} />;
//   }

//   if (currentPage === 'profile') {
//     if (!role) {
//       return null;
//     }
//     return (
//       <ProfilePage
//         darkMode={darkMode}
//         role={role}
//         goToLanding={goToLanding}
//         setDarkMode={setDarkMode}
//       />
//     );
//   }

//   if (currentPage === 'tasks') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <TaskSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToEvents={goToEvents}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <TaskPage
//             darkMode={darkMode}
//             role={role}
//             tasks={tasks}
//             setTasks={setTasks}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (currentPage === 'members') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <Sidebar
//           darkMode={darkMode}
//           goToEvents={goToEvents}
//           goToLogin={goToLogin}
//           goToLanding={goToLanding}
//           role={role}
//           goToProfile={goToProfile}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//           currentPage={currentPage}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <MembersDashboard />
//         </div>
//       </div>
//     );
//   }

//   // ---- Landing (default) ----
//   return (
//     <div className={darkMode ? "main-layout dark" : "main-layout"}>
//       {!role ? (
//         <GuestSidebar darkMode={darkMode} goToLogin={goToLogin} goToMembers={goToMembers} />
//       ) : role === 'core-member' ? (
//         <MemberSidebar
//           darkMode={darkMode}
//           goToHome={goToLanding}
//           goToCoreMember={() => setCurrentPage('core-member')}
//           goToCoreClub={() => setCurrentPage('core-club')}
//           goToTasks={() => setCurrentPage('member-tasks')}
//           goToEvents={() => setCurrentPage('member-events')}
//           goToProfile={goToProfile}
//           currentPage={currentPage}
//         />
//       ) : (
//         <Sidebar
//           darkMode={darkMode}
//           goToEvents={goToEvents}
//           goToLogin={goToLogin}
//           goToLanding={goToLanding}
//           role={role}
//           goToProfile={goToProfile}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//           currentPage={currentPage}
//         />
//       )}
//       <main className="content-area" id="mainContentScroll">
//         <Topbar
//           darkMode={darkMode}
//           setDarkMode={setDarkMode}
//           goToLogin={goToLogin}
//           role={role}
//           onLogout={handleLogoutClick}
//           goToSignUp={goToSignUp}
//         />
//         <Hero darkMode={darkMode} />
//         <Features />
//         <Steps />
//         <About />
//         <BottomCTA role={role} goToLogin={goToLogin} goToEvents={goToEvents} />
//         <Footer />
//       </main>

//       {logoutModal && (
//         <div className="confirm-overlay" onClick={() => setLogoutModal(false)}>
//           <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
//             <h3>Logout</h3>
//             <p>Are you sure you want to logout?</p>
//             <div className="confirm-actions">
//               <button className="btn-confirm-cancel" onClick={() => setLogoutModal(false)}>
//                 Cancel
//               </button>
//               <button className="btn-confirm-yes" onClick={confirmLogout}>
//                 Yes, Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useLayoutEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import './clubpilot.css';
// import ProfilePage from './ProfilePage';
// import Sidebar from './Sidebar';
// import Topbar from './Topbar';
// import Hero from './Hero';
// import Features from './Features';
// import Steps from './Steps';
// import About from './About';
// import BottomCTA from './BottomCTA';
// import Footer from './Footer';
// import EventPage from './EventPage';
// import EventSidebar from './EventSidebar';
// import EventDetailPage from './EventDetailPage';
// import LoginPage from './LoginPage';
// import GuestSidebar from './GuestSidebar';
// import SignUpPage from './SignUpPage';
// import TaskPage from './TaskPage';
// import TaskSidebar from './TaskSidebar';
// import MembersDashboard from './Members/pages/MembersDashboard';
// import MemberSidebar from './MemberSidebar';
// import './Members/Members.css';
// import MemberPage from './MemberPage';
// import { initialTasks } from './Members/data/taskData';
// import Analytics from './Analytics';

// function App() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem('darkMode') === 'true'
//   );
//   const [currentPage, setCurrentPage] = useState('landing');
//   const [role, setRole] = useState(null);
//   const [currentMemberId, setCurrentMemberId] = useState(null);
//   const [logoutModal, setLogoutModal] = useState(false);
//   const [selectedEventId, setSelectedEventId] = useState(null);

//   const [tasks, setTasks] = useState(() => {
//     const saved = localStorage.getItem('tasks');
//     if (saved) {
//       return JSON.parse(saved);
//     }
//     return initialTasks;
//   });

//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   // ---- URL → state sync ----
//   useEffect(() => {
//     const path = location.pathname;

//     if (path === '/' || path === '') setCurrentPage('landing');
//     else if (path === '/login') setCurrentPage('login');
//     else if (path === '/signup') setCurrentPage('signup');
//     else if (path === '/events') setCurrentPage('events');
//     else if (path === '/tasks') setCurrentPage('tasks');
//     else if (path === '/members') setCurrentPage('members');
//     else if (path === '/profile') setCurrentPage('profile');
//     else if (path === '/analytics') setCurrentPage('analytics');
//     else if (path === '/member/dashboard') setCurrentPage('core-member');
//     else if (path === '/member/club') setCurrentPage('core-club');
//     else if (path === '/member/tasks') setCurrentPage('member-tasks');
//     else if (path === '/member/events') setCurrentPage('member-events');
//   }, [location.pathname]);

//   // ---- state → URL sync ----
//   useEffect(() => {
//     let path = '/';
//     if (currentPage === 'landing') path = '/';
//     else if (currentPage === 'login') path = '/login';
//     else if (currentPage === 'signup') path = '/signup';
//     else if (currentPage === 'events') path = '/events';
//     else if (currentPage === 'tasks') path = '/tasks';
//     else if (currentPage === 'members') path = '/members';
//     else if (currentPage === 'profile') path = '/profile';
//     else if (currentPage === 'analytics') path = '/analytics';
//     else if (currentPage === 'core-member') path = '/member/dashboard';
//     else if (currentPage === 'core-club') path = '/member/club';
//     else if (currentPage === 'member-tasks') path = '/member/tasks';
//     else if (currentPage === 'member-events') path = '/member/events';

//     if (location.pathname !== path) navigate(path);
//   }, [currentPage]);

//   // ---- Navigation ----
//   const goToProfile = () => setCurrentPage('profile');
//   const goToSignUp = () => setCurrentPage('signup');
//   const goToTasks = () => setCurrentPage('tasks');
//   const goToMembers = () => setCurrentPage('members');
//   const goToEvents = () => setCurrentPage('events');
//   const goToLanding = () => setCurrentPage('landing');
//   const goToLogin = () => setCurrentPage('login');
//   const goToAnalytics = () => setCurrentPage('analytics');
//   const goToEventDetail = (eventId) => {
//     setSelectedEventId(eventId);
//     setCurrentPage('event-detail');
//   };

//   // ---- Auth ----
//   const handleSignUp = (userRole) => {
//     setRole(userRole);
//     localStorage.setItem('userRole', userRole);
//     setCurrentPage('landing');
//   };

//   const handleLogin = (userRole, memberId = null) => {
//     setRole(userRole);
//     localStorage.setItem('userRole', userRole);

//     if (userRole === 'core-member' && memberId) {
//       setCurrentMemberId(memberId);
//     }
//     setCurrentPage('landing');
//   };

//   const handleLogoutClick = () => {
//     setLogoutModal(true);
//   };

//   const confirmLogout = () => {
//     setLogoutModal(false);
//     setTimeout(() => {
//       setRole(null);
//       localStorage.removeItem('userRole');
//       setCurrentPage('landing');
//     }, 300);
//   };

//   // ---- Dark mode persistence ----
//   useEffect(() => {
//     localStorage.setItem('darkMode', darkMode);
//   }, [darkMode]);

//   // ---- Events ----
//   const [events, setEvents] = useState(() => {
//     const savedEvents = localStorage.getItem('events');
//     if (savedEvents) {
//       return JSON.parse(savedEvents);
//     }
//     return [
//       { id: 1, title: 'Tech Meetup 2026', date: '2026-08-25', time: '10:00 - 13:00', venue: 'Room 101, Main Building', description: 'Join us for an exciting tech meetup with industry experts.', status: 'upcoming', category: 'tech', icon: '💻', capacity: 50, participants: 20, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 2, title: 'Annual Cultural Fest', date: '2026-09-05', time: '14:00 - 17:00', venue: 'Seminar Hall', description: 'Plan the biggest cultural fest of the year.', status: 'upcoming', category: 'cultural', icon: '🎭', capacity: 50, participants: 33, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 3, title: 'Football Tournament', date: '2026-08-20', time: '08:00 - 18:00', venue: 'Sports Ground', description: 'Inter-college football tournament with 8 teams.', status: 'ongoing', category: 'sports', icon: '⚽', capacity: 50, participants: 0, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 4, title: 'UI/UX Design Workshop', date: '2026-08-15', time: '11:00 - 15:00', venue: 'Design Studio', description: 'Learn the basics of UI/UX design.', status: 'completed', category: 'workshop', icon: '📚', capacity: 50, participants: 37, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 5, title: 'Club Orientation Day', date: '2026-07-28', time: '09:00 - 12:00', venue: 'Auditorium', description: 'Welcome new members to the club.', status: 'completed', category: 'social', icon: '🎉', capacity: 50, participants: 26, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 6, title: 'Guest Lecture: AI & ML', date: '2026-09-10', time: '15:00 - 17:00', venue: 'Lecture Hall 2', description: 'Guest lecture on Artificial Intelligence.', status: 'upcoming', category: 'academic', icon: '🤖', capacity: 50, participants: 29, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 7, title: 'Dance Competition', date: '2026-08-10', time: '18:00 - 21:00', venue: 'Auditorium', description: 'Inter-club dance competition.', status: 'cancelled', category: 'cultural', icon: '💃', capacity: 50, participants: 8, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
//       { id: 8, title: 'Coding Hackathon', date: '2026-09-15', time: '09:00 - 21:00', venue: 'Computer Lab', description: '24-hour coding hackathon.', status: 'ongoing', category: 'tech', icon: '⌨️', capacity: 50, participants: 40, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] }
//     ];
//   });

//   useEffect(() => {
//     localStorage.setItem('events', JSON.stringify(events));
//   }, [events]);

//   // ---- AOS Initialization ----
//   useLayoutEffect(() => {
//     let animId;
//     animId = requestAnimationFrame(() => {
//       requestAnimationFrame(() => {
//         AOS.init({
//           once: false,
//           mirror: true,
//           duration: 600,
//           easing: 'ease-out',
//           startEvent: 'DOMContentLoaded',
//         });
//         AOS.refresh();
//       });
//     });

//     const scrollContainer = document.getElementById('mainContentScroll');
//     const onScroll = () => AOS.refresh();

//     if (scrollContainer) {
//       scrollContainer.addEventListener('scroll', onScroll);
//     }

//     return () => {
//       if (animId) cancelAnimationFrame(animId);
//       if (scrollContainer) {
//         scrollContainer.removeEventListener('scroll', onScroll);
//       }
//     };
//   }, [currentPage, location.key]);

//   // ---- Page Routes ----

//   if (currentPage === 'login') {
//     return <LoginPage onLogin={handleLogin} darkMode={darkMode} goToSignUp={goToSignUp} />;
//   }

//   if (currentPage === 'events') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <EventSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <EventPage
//             darkMode={darkMode}
//             role={role}
//             events={events}
//             setEvents={setEvents}
//             goToAnalytics={goToAnalytics}
//             onEventClick={goToEventDetail}
//             currentMemberId={currentMemberId}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (currentPage === 'event-detail') {
//     const selectedEvent = events.find(e => e.id === selectedEventId);
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <EventSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <EventDetailPage
//             event={selectedEvent}
//             onBack={goToEvents}
//             darkMode={darkMode}
//             role={role}
//             setEvents={setEvents}
//             currentMemberId={currentMemberId}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (currentPage === 'analytics') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <EventSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <Analytics
//             darkMode={darkMode}
//             role={role}
//             events={events}
//             onBack={goToEvents}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (['core-member', 'core-club', 'member-tasks', 'member-events'].includes(currentPage)) {
//     const tab =
//       currentPage === 'core-member' ? 'hub' :
//       currentPage === 'core-club' ? 'club' :
//       currentPage === 'member-events' ? 'events' : 'tasks';

//     return (
//       <MemberPage
//         darkMode={darkMode}
//         currentMemberId={currentMemberId}
//         tasks={tasks}
//         setTasks={setTasks}
//         events={events}
//         setEvents={setEvents}
//         role={role}
//         initialTab={tab}
//         goToLanding={goToLanding}
//         goToProfile={goToProfile}
//       />
//     );
//   }

//   if (currentPage === 'signup') {
//     return <SignUpPage onSignUp={handleSignUp} darkMode={darkMode} goToLogin={goToLogin} />;
//   }

//   if (currentPage === 'profile') {
//     if (!role) {
//       return null;
//     }
//     return (
//       <ProfilePage
//         darkMode={darkMode}
//         role={role}
//         goToLanding={goToLanding}
//         setDarkMode={setDarkMode}
//       />
//     );
//   }

//   if (currentPage === 'tasks') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <TaskSidebar
//           darkMode={darkMode}
//           goToLanding={goToLanding}
//           goToProfile={goToProfile}
//           role={role}
//           goToLogin={goToLogin}
//           goToEvents={goToEvents}
//           goToMembers={goToMembers}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <TaskPage
//             darkMode={darkMode}
//             role={role}
//             tasks={tasks}
//             setTasks={setTasks}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (currentPage === 'members') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <Sidebar
//           darkMode={darkMode}
//           goToEvents={goToEvents}
//           goToLogin={goToLogin}
//           goToLanding={goToLanding}
//           role={role}
//           goToProfile={goToProfile}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//           currentPage={currentPage}
//         />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <MembersDashboard />
//         </div>
//       </div>
//     );
//   }

//   // ---- Landing (default) ----
//   return (
//     <div className={darkMode ? "main-layout dark" : "main-layout"}>
//       {!role ? (
//         <GuestSidebar darkMode={darkMode} goToLogin={goToLogin} goToMembers={goToMembers} />
//       ) : role === 'core-member' ? (
//         <MemberSidebar
//           darkMode={darkMode}
//           goToHome={goToLanding}
//           goToCoreMember={() => setCurrentPage('core-member')}
//           goToCoreClub={() => setCurrentPage('core-club')}
//           goToTasks={() => setCurrentPage('member-tasks')}
//           goToEvents={() => setCurrentPage('member-events')}
//           goToProfile={goToProfile}
//           currentPage={currentPage}
//         />
//       ) : (
//         <Sidebar
//           darkMode={darkMode}
//           goToEvents={goToEvents}
//           goToLogin={goToLogin}
//           goToLanding={goToLanding}
//           role={role}
//           goToProfile={goToProfile}
//           goToTasks={goToTasks}
//           goToMembers={goToMembers}
//           currentPage={currentPage}
//         />
//       )}
//       <main className="content-area" id="mainContentScroll">
//         <Topbar
//           darkMode={darkMode}
//           setDarkMode={setDarkMode}
//           goToLogin={goToLogin}
//           role={role}
//           onLogout={handleLogoutClick}
//           goToSignUp={goToSignUp}
//         />
//         <Hero darkMode={darkMode} key={currentPage + location.key} />
//         <Features />
//         <Steps />
//         <About />
//         <BottomCTA role={role} goToLogin={goToLogin} goToEvents={goToEvents} />
//         <Footer />
//       </main>

//       {logoutModal && (
//         <div className="confirm-overlay" onClick={() => setLogoutModal(false)}>
//           <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
//             <h3>Logout</h3>
//             <p>Are you sure you want to logout?</p>
//             <div className="confirm-actions">
//               <button className="btn-confirm-cancel" onClick={() => setLogoutModal(false)}>
//                 Cancel
//               </button>
//               <button className="btn-confirm-yes" onClick={confirmLogout}>
//                 Yes, Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './clubpilot.css';
import ProfilePage from './ProfilePage';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Hero from './Hero';
import Features from './Features';
import Steps from './Steps';
import About from './About';
import BottomCTA from './BottomCTA';
import Footer from './Footer';
import EventPage from './EventPage';
import EventSidebar from './EventSidebar';
import EventDetailPage from './EventDetailPage';
import LoginPage from './LoginPage';
import GuestSidebar from './GuestSidebar';
import SignUpPage from './SignUpPage';
import TaskPage from './TaskPage';
import TaskSidebar from './TaskSidebar';
import MembersDashboard from './Members/pages/MembersDashboard';
import MemberSidebar from './MemberSidebar';
import './Members/Members.css';
import MemberPage from './MemberPage';
import { initialTasks } from './Members/data/taskData';
import Analytics from './Analytics';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );
  const [currentPage, setCurrentPage] = useState('landing');
  const [role, setRole] = useState(null);
  const [currentMemberId, setCurrentMemberId] = useState(null);
  const [logoutModal, setLogoutModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      return JSON.parse(saved);
    }
    return initialTasks;
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // ---- URL → state sync ----
  useEffect(() => {
    const path = location.pathname;

    if (path === '/' || path === '') setCurrentPage('landing');
    else if (path === '/login') setCurrentPage('login');
    else if (path === '/signup') setCurrentPage('signup');
    else if (path === '/events') setCurrentPage('events');
    else if (path.match(/^\/events\/\d+$/)) {                    // ✅ ROUTING
      setSelectedEventId(Number(path.split('/')[2]));           // ✅ ROUTING
      setCurrentPage('event-detail');                            // ✅ ROUTING
    }                                                            // ✅ ROUTING
    else if (path === '/tasks') setCurrentPage('tasks');
    else if (path === '/members') setCurrentPage('members');
    else if (path === '/profile') setCurrentPage('profile');
    else if (path === '/analytics') setCurrentPage('analytics');
    else if (path === '/member/dashboard') setCurrentPage('core-member');
    else if (path === '/member/club') setCurrentPage('core-club');
    else if (path === '/member/tasks') setCurrentPage('member-tasks');
    else if (path === '/member/events') setCurrentPage('member-events');
  }, [location.pathname]);

  // ---- state → URL sync ----
  useEffect(() => {
    let path = '/';
    if (currentPage === 'landing') path = '/';
    else if (currentPage === 'login') path = '/login';
    else if (currentPage === 'signup') path = '/signup';
    else if (currentPage === 'events') path = '/events';
    else if (currentPage === 'event-detail') path = `/events/${selectedEventId}`;   // ✅ ROUTING
    else if (currentPage === 'tasks') path = '/tasks';
    else if (currentPage === 'members') path = '/members';
    else if (currentPage === 'profile') path = '/profile';
    else if (currentPage === 'analytics') path = '/analytics';
    else if (currentPage === 'core-member') path = '/member/dashboard';
    else if (currentPage === 'core-club') path = '/member/club';
    else if (currentPage === 'member-tasks') path = '/member/tasks';
    else if (currentPage === 'member-events') path = '/member/events';

    if (location.pathname !== path) navigate(path);
  }, [currentPage, selectedEventId]);   // ✅ ROUTING (selectedEventId added)

  // ---- Navigation ----
  const goToProfile = () => setCurrentPage('profile');
  const goToSignUp = () => setCurrentPage('signup');
  const goToTasks = () => setCurrentPage('tasks');
  const goToMembers = () => setCurrentPage('members');
  const goToEvents = () => setCurrentPage('events');
  const goToLanding = () => setCurrentPage('landing');
  const goToLogin = () => setCurrentPage('login');
  const goToAnalytics = () => setCurrentPage('analytics');
  const goToEventDetail = (eventId) => {
    setSelectedEventId(eventId);
    setCurrentPage('event-detail');
  };

  // ---- Auth ----
  const handleSignUp = (userRole) => {
    setRole(userRole);
    localStorage.setItem('userRole', userRole);
    setCurrentPage('landing');
  };

  const handleLogin = (userRole, memberId = null) => {
    setRole(userRole);
    localStorage.setItem('userRole', userRole);

    if (userRole === 'core-member' && memberId) {
      setCurrentMemberId(memberId);
    }
    setCurrentPage('landing');
  };

  const handleLogoutClick = () => {
    setLogoutModal(true);
  };

  const confirmLogout = () => {
    setLogoutModal(false);
    setTimeout(() => {
      setRole(null);
      localStorage.removeItem('userRole');
      setCurrentPage('landing');
    }, 300);
  };

  // ---- Dark mode persistence ----
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // ---- Events ----
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      return JSON.parse(savedEvents);
    }
    return [
      { id: 1, title: 'Tech Meetup 2026', date: '2026-08-25', time: '10:00 - 13:00', venue: 'Room 101, Main Building', description: 'Join us for an exciting tech meetup with industry experts.', status: 'upcoming', category: 'tech', icon: '💻', capacity: 50, participants: 20, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
      { id: 2, title: 'Annual Cultural Fest', date: '2026-09-05', time: '14:00 - 17:00', venue: 'Seminar Hall', description: 'Plan the biggest cultural fest of the year.', status: 'upcoming', category: 'cultural', icon: '🎭', capacity: 50, participants: 33, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
      { id: 3, title: 'Football Tournament', date: '2026-08-20', time: '08:00 - 18:00', venue: 'Sports Ground', description: 'Inter-college football tournament with 8 teams.', status: 'ongoing', category: 'sports', icon: '⚽', capacity: 50, participants: 0, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
      { id: 4, title: 'UI/UX Design Workshop', date: '2026-08-15', time: '11:00 - 15:00', venue: 'Design Studio', description: 'Learn the basics of UI/UX design.', status: 'completed', category: 'workshop', icon: '📚', capacity: 50, participants: 37, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
      { id: 5, title: 'Club Orientation Day', date: '2026-07-28', time: '09:00 - 12:00', venue: 'Auditorium', description: 'Welcome new members to the club.', status: 'completed', category: 'social', icon: '🎉', capacity: 50, participants: 26, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
      { id: 6, title: 'Guest Lecture: AI & ML', date: '2026-09-10', time: '15:00 - 17:00', venue: 'Lecture Hall 2', description: 'Guest lecture on Artificial Intelligence.', status: 'upcoming', category: 'academic', icon: '🤖', capacity: 50, participants: 29, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
      { id: 7, title: 'Dance Competition', date: '2026-08-10', time: '18:00 - 21:00', venue: 'Auditorium', description: 'Inter-club dance competition.', status: 'cancelled', category: 'cultural', icon: '💃', capacity: 50, participants: 8, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
      { id: 8, title: 'Coding Hackathon', date: '2026-09-15', time: '09:00 - 21:00', venue: 'Computer Lab', description: '24-hour coding hackathon.', status: 'ongoing', category: 'tech', icon: '⌨️', capacity: 50, participants: 40, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] }
    ];
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  // ---- AOS Initialization ---- (ANIMATION CODE — as-is)
  useLayoutEffect(() => {
    let animId;
    animId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        AOS.init({
          once: false,
          mirror: true,
          duration: 600,
          easing: 'ease-out',
          startEvent: 'DOMContentLoaded',
        });
        AOS.refresh();
      });
    });

    const scrollContainer = document.getElementById('mainContentScroll');
    const onScroll = () => AOS.refresh();

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', onScroll);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', onScroll);
      }
    };
  }, [currentPage, location.key]);

  // ---- Page Routes ----

  if (currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} darkMode={darkMode} goToSignUp={goToSignUp} />;
  }

  if (currentPage === 'events') {
    return (
      <div className={darkMode ? "main-layout dark" : "main-layout"}>
        <EventSidebar
          darkMode={darkMode}
          goToLanding={goToLanding}
          goToProfile={goToProfile}
          role={role}
          goToLogin={goToLogin}
          goToTasks={goToTasks}
          goToMembers={goToMembers}
        />
        <div className="content-area" style={{ paddingTop: '0px' }}>
          <EventPage
            darkMode={darkMode}
            role={role}
            events={events}
            setEvents={setEvents}
            goToAnalytics={goToAnalytics}
            onEventClick={goToEventDetail}
            currentMemberId={currentMemberId}
          />
        </div>
      </div>
    );
  }

  if (currentPage === 'event-detail') {
    const selectedEvent = events.find(e => e.id === selectedEventId);
    return (
      <div className={darkMode ? "main-layout dark" : "main-layout"}>
        <EventSidebar
          darkMode={darkMode}
          goToLanding={goToLanding}
          goToProfile={goToProfile}
          role={role}
          goToLogin={goToLogin}
          goToTasks={goToTasks}
          goToMembers={goToMembers}
        />
        <div className="content-area" style={{ paddingTop: '0px' }}>
          <EventDetailPage
            event={selectedEvent}
            onBack={goToEvents}
            darkMode={darkMode}
            role={role}
            setEvents={setEvents}
            currentMemberId={currentMemberId}
          />
        </div>
      </div>
    );
  }

  if (currentPage === 'analytics') {
    return (
      <div className={darkMode ? "main-layout dark" : "main-layout"}>
        <EventSidebar
          darkMode={darkMode}
          goToLanding={goToLanding}
          goToProfile={goToProfile}
          role={role}
          goToLogin={goToLogin}
          goToTasks={goToTasks}
          goToMembers={goToMembers}
        />
        <div className="content-area" style={{ paddingTop: '0px' }}>
          <Analytics
            darkMode={darkMode}
            role={role}
            events={events}
            onBack={goToEvents}
          />
        </div>
      </div>
    );
  }

  if (['core-member', 'core-club', 'member-tasks', 'member-events'].includes(currentPage)) {
    const tab =
      currentPage === 'core-member' ? 'hub' :
      currentPage === 'core-club' ? 'club' :
      currentPage === 'member-events' ? 'events' : 'tasks';

    return (
      <MemberPage
        darkMode={darkMode}
        currentMemberId={currentMemberId}
        tasks={tasks}
        setTasks={setTasks}
        events={events}
        setEvents={setEvents}
        role={role}
        initialTab={tab}
        goToLanding={goToLanding}
        goToProfile={goToProfile}
      />
    );
  }

  if (currentPage === 'signup') {
    return <SignUpPage onSignUp={handleSignUp} darkMode={darkMode} goToLogin={goToLogin} />;
  }

  if (currentPage === 'profile') {
    if (!role) {
      return null;
    }
    return (
      <ProfilePage
        darkMode={darkMode}
        role={role}
        goToLanding={goToLanding}
        setDarkMode={setDarkMode}
      />
    );
  }

  if (currentPage === 'tasks') {
    return (
      <div className={darkMode ? "main-layout dark" : "main-layout"}>
        <TaskSidebar
          darkMode={darkMode}
          goToLanding={goToLanding}
          goToProfile={goToProfile}
          role={role}
          goToLogin={goToLogin}
          goToEvents={goToEvents}
          goToMembers={goToMembers}
        />
        <div className="content-area" style={{ paddingTop: '0px' }}>
          <TaskPage
            darkMode={darkMode}
            role={role}
            tasks={tasks}
            setTasks={setTasks}
          />
        </div>
      </div>
    );
  }

  if (currentPage === 'members') {
    return (
      <div className={darkMode ? "main-layout dark" : "main-layout"}>
        <Sidebar
          darkMode={darkMode}
          goToEvents={goToEvents}
          goToLogin={goToLogin}
          goToLanding={goToLanding}
          role={role}
          goToProfile={goToProfile}
          goToTasks={goToTasks}
          goToMembers={goToMembers}
          currentPage={currentPage}
        />
        <div className="content-area" style={{ paddingTop: '0px' }}>
          <MembersDashboard />
        </div>
      </div>
    );
  }

  // ---- Landing (default) ---- (ANIMATION CODE — key RAKHA)
  return (
    <div className={darkMode ? "main-layout dark" : "main-layout"}>
      {!role ? (
        <GuestSidebar darkMode={darkMode} goToLogin={goToLogin} goToMembers={goToMembers} />
      ) : role === 'core-member' ? (
        <MemberSidebar
          darkMode={darkMode}
          goToHome={goToLanding}
          goToCoreMember={() => setCurrentPage('core-member')}
          goToCoreClub={() => setCurrentPage('core-club')}
          goToTasks={() => setCurrentPage('member-tasks')}
          goToEvents={() => setCurrentPage('member-events')}
          goToProfile={goToProfile}
          currentPage={currentPage}
        />
      ) : (
        <Sidebar
          darkMode={darkMode}
          goToEvents={goToEvents}
          goToLogin={goToLogin}
          goToLanding={goToLanding}
          role={role}
          goToProfile={goToProfile}
          goToTasks={goToTasks}
          goToMembers={goToMembers}
          currentPage={currentPage}
        />
      )}
      <main className="content-area" id="mainContentScroll">
      <div id="top">
        <Topbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          goToLogin={goToLogin}
          role={role}
          onLogout={handleLogoutClick}
          goToSignUp={goToSignUp}
        />
      </div>
        <Hero darkMode={darkMode} key={currentPage + location.key} />
        <Features />
        <Steps />
        <About />
        <BottomCTA role={role} goToLogin={goToLogin} goToEvents={goToEvents} />
        <Footer />
      </main>

      {logoutModal && (
        <div className="confirm-overlay" onClick={() => setLogoutModal(false)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="confirm-actions">
              <button className="btn-confirm-cancel" onClick={() => setLogoutModal(false)}>
                Cancel
              </button>
              <button className="btn-confirm-yes" onClick={confirmLogout}>
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

