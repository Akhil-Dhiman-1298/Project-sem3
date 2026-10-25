// // // // // import React, { useEffect, useLayoutEffect, useState } from 'react';
// // // // // import { useNavigate, useLocation } from 'react-router-dom';
// // // // // import AOS from 'aos';
// // // // // import 'aos/dist/aos.css';
// // // // // import './clubpilot.css';
// // // // // import ProfilePage from './ProfilePage';
// // // // // import Sidebar from './Sidebar';
// // // // // import Topbar from './Topbar';
// // // // // import Hero from './Hero';
// // // // // import Features from './Features';
// // // // // import Steps from './Steps';
// // // // // import About from './About';
// // // // // import BottomCTA from './BottomCTA';
// // // // // import Footer from './Footer';
// // // // // import EventPage from './EventPage';
// // // // // import EventSidebar from './EventSidebar';
// // // // // import EventDetailPage from './EventDetailPage';
// // // // // import LoginPage from './LoginPage';
// // // // // import GuestSidebar from './GuestSidebar';
// // // // // import SignUpPage from './SignUpPage';
// // // // // import TaskPage from './TaskPage';
// // // // // import TaskSidebar from './TaskSidebar';
// // // // // import MembersDashboard from './Members/pages/MembersDashboard';
// // // // // import MemberSidebar from './MemberSidebar';
// // // // // import './Members/Members.css';
// // // // // import MemberPage from './MemberPage';
// // // // // import { initialTasks } from './Members/data/taskData';
// // // // // import Analytics from './Analytics';
// // // // // import { useTheme } from './ThemeContext'; 
// // // // // const PROTECTED_PATHS = [
// // // // //   '/events', '/tasks', '/members', '/analytics', '/profile',
// // // // //   '/member/dashboard', '/member/club', '/member/tasks', '/member/events',
// // // // // ];

// // // // // const isProtectedPath = (p) =>
// // // // //   /^\/events\/\d+$/.test(p) || PROTECTED_PATHS.includes(p);

// // // // // function App() {
// // // // //   const navigate = useNavigate();
// // // // //   const location = useLocation();
// // // // //   const path = location.pathname;
// // // // //   // const [darkMode, setDarkMode] = useState(
// // // // //   //   localStorage.getItem('darkMode') === 'true'
// // // // //   // );

// // // // //    const { darkMode, setDarkMode } = useTheme();

// // // // //   const [role, setRole] = useState(() => sessionStorage.getItem('userRole') || null);
// // // // //   const [currentMemberId, setCurrentMemberId] = useState(() => {
// // // // //     const v = sessionStorage.getItem('currentMemberId');
// // // // //     return v || null;
// // // // //   });

// // // // //   const [logoutModal, setLogoutModal] = useState(false);

// // // // //   const [tasks, setTasks] = useState(() => {
// // // // //     const saved = localStorage.getItem('tasks');
// // // // //     return saved ? JSON.parse(saved) : initialTasks;
// // // // //   });
// // // // //   useEffect(() => {
// // // // //     localStorage.setItem('tasks', JSON.stringify(tasks));
// // // // //   }, [tasks]);

// // // // //   const [events, setEvents] = useState(() => {
// // // // //     const savedEvents = localStorage.getItem('events');
// // // // //     if (savedEvents) return JSON.parse(savedEvents);
// // // // //     return [
// // // // //       { id: 1, title: 'Tech Meetup 2026', date: '2026-08-25', time: '10:00 - 13:00', venue: 'Room 101, Main Building', description: 'Join us for an exciting tech meetup with industry experts.', status: 'upcoming', category: 'tech', icon: '💻', capacity: 50, participants: 20, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
// // // // //       { id: 2, title: 'Annual Cultural Fest', date: '2026-09-05', time: '14:00 - 17:00', venue: 'Seminar Hall', description: 'Plan the biggest cultural fest of the year.', status: 'upcoming', category: 'cultural', icon: '🎭', capacity: 50, participants: 33, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
// // // // //       { id: 3, title: 'Football Tournament', date: '2026-08-20', time: '08:00 - 18:00', venue: 'Sports Ground', description: 'Inter-college football tournament with 8 teams.', status: 'ongoing', category: 'sports', icon: '⚽', capacity: 50, participants: 0, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
// // // // //       { id: 4, title: 'UI/UX Design Workshop', date: '2026-08-15', time: '11:00 - 15:00', venue: 'Design Studio', description: 'Learn the basics of UI/UX design.', status: 'completed', category: 'workshop', icon: '📚', capacity: 50, participants: 37, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
// // // // //       { id: 5, title: 'Club Orientation Day', date: '2026-07-28', time: '09:00 - 12:00', venue: 'Auditorium', description: 'Welcome new members to the club.', status: 'completed', category: 'social', icon: '🎉', capacity: 50, participants: 26, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
// // // // //       { id: 6, title: 'Guest Lecture: AI & ML', date: '2026-09-10', time: '15:00 - 17:00', venue: 'Lecture Hall 2', description: 'Guest lecture on Artificial Intelligence.', status: 'upcoming', category: 'academic', icon: '🤖', capacity: 50, participants: 29, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
// // // // //       { id: 7, title: 'Dance Competition', date: '2026-08-10', time: '18:00 - 21:00', venue: 'Auditorium', description: 'Inter-club dance competition.', status: 'cancelled', category: 'cultural', icon: '💃', capacity: 50, participants: 8, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
// // // // //       { id: 8, title: 'Coding Hackathon', date: '2026-09-15', time: '09:00 - 21:00', venue: 'Computer Lab', description: '24-hour coding hackathon.', status: 'ongoing', category: 'tech', icon: '⌨️', capacity: 50, participants: 40, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] }
// // // // //     ];
// // // // //   });

// // // // //   useEffect(() => {
// // // // //   localStorage.setItem('events', JSON.stringify(events));
// // // // // }, [events]);


// // // // // useEffect(() => {
// // // // //   const updateStatuses = () => {
// // // // //     const now = new Date();
// // // // //     setEvents(prev => {
// // // // //       let changed = false;
// // // // //       const next = prev.map(event => {
// // // // //         if (event.status === 'cancelled') return event;
// // // // //         const [startStr, endStr] = (event.time || '').split(' - ');
// // // // //         if (!event.date || !startStr || !endStr) return event;
// // // // //         const start = new Date(`${event.date}T${startStr}:00`);
// // // // //         const end = new Date(`${event.date}T${endStr}:00`);
// // // // //         let newStatus = event.status;
// // // // //         if (now >= start && now < end) newStatus = 'ongoing';
// // // // //         else if (now >= end) newStatus = 'completed';
// // // // //         else if (now < start) newStatus = 'upcoming';
// // // // //         if (newStatus !== event.status) {
// // // // //           changed = true;
// // // // //           return { ...event, status: newStatus };
// // // // //         }
// // // // //         return event;
// // // // //       });
// // // // //       return changed ? next : prev;
// // // // //     });
// // // // //   };

// // // // //   updateStatuses();
// // // // //   const t = setInterval(updateStatuses, 30000);
// // // // //   return () => clearInterval(t);
// // // // // }, []);

// // // // //   const isEventDetail = /^\/events\/\d+$/.test(path);
// // // // //   const selectedEventId = isEventDetail ? Number(path.split('/')[2]) : null;

// // // // //   useEffect(() => {
// // // // //     if (isProtectedPath(path) && !role) {
// // // // //       navigate('/login', { replace: true });
// // // // //     }
// // // // //   }, [path, role, navigate]);

// // // // //   // useEffect(() => {
// // // // //   //   localStorage.setItem('darkMode', darkMode);
// // // // //   // }, [darkMode]);

// // // // //   useLayoutEffect(() => {
// // // // //     let animId;
// // // // //     animId = requestAnimationFrame(() => {
// // // // //       requestAnimationFrame(() => {
// // // // //         AOS.init({ once: false, mirror: true, duration: 600, easing: 'ease-out' });
// // // // //         AOS.refresh();
// // // // //       });
// // // // //     });
// // // // //     const sc = document.getElementById('mainContentScroll');
// // // // //     const onScroll = () => AOS.refresh();
// // // // //     if (sc) sc.addEventListener('scroll', onScroll);
// // // // //     return () => {
// // // // //       if (animId) cancelAnimationFrame(animId);
// // // // //       if (sc) sc.removeEventListener('scroll', onScroll);
// // // // //     };
// // // // //   }, [path, location.key]);

// // // // //   const goToLanding = () => navigate('/');
// // // // //   const goToLogin = () => navigate('/login');
// // // // //   const goToSignUp = () => navigate('/signup');
// // // // //   const goToProfile = () => navigate('/profile');
// // // // //   const goToTasks = () => navigate('/tasks');
// // // // //   const goToMembers = () => navigate('/members');
// // // // //   const goToEvents = () => navigate('/events');
// // // // //   const goToAnalytics = () => navigate('/analytics');
// // // // //   const goToEventDetail = (id) => navigate(`/events/${id}`);

// // // // //   const handleSignUp = (userRole) => {
// // // // //     setRole(userRole);
// // // // //     sessionStorage.setItem('userRole', userRole);
// // // // //     navigate('/');
// // // // //   };


// // // // //   const handleLogin = (userRole, memberId = null) => {
// // // // //     setRole(userRole);
// // // // //     sessionStorage.setItem('userRole', userRole);

// // // // //     const finalId = (memberId !== null && memberId !== undefined && memberId !== '')
// // // // //       ? memberId
// // // // //       : `${userRole}_${Date.now()}`;

// // // // //     setCurrentMemberId(finalId);
// // // // //     sessionStorage.setItem('currentMemberId', String(finalId));

// // // // //     navigate('/', { replace: true });
// // // // //   };

// // // // //   const handleLogoutClick = () => setLogoutModal(true);
// // // // //   const confirmLogout = () => {
// // // // //     setLogoutModal(false);
// // // // //     setTimeout(() => {
// // // // //       setRole(null);
// // // // //       setCurrentMemberId(null);
// // // // //       sessionStorage.removeItem('userRole');
// // // // //       sessionStorage.removeItem('currentMemberId');
// // // // //       navigate('/', { replace: true });
// // // // //     }, 300);
// // // // //   };



// // // // //   if (path === '/login') {
// // // // //     return <LoginPage onLogin={handleLogin} darkMode={darkMode} goToSignUp={goToSignUp} />;
// // // // //   }

// // // // //   if (path === '/signup') {
// // // // //     return <SignUpPage onSignUp={handleSignUp} darkMode={darkMode} goToLogin={goToLogin} />;
// // // // //   }

// // // // //   if (path === '/events') {
// // // // //     return (
// // // // //       <div className={darkMode ? "main-layout dark" : "main-layout"}>
// // // // //         <EventSidebar darkMode={darkMode} goToLanding={goToLanding} goToProfile={goToProfile} role={role} goToLogin={goToLogin} goToTasks={goToTasks} goToMembers={goToMembers} />
// // // // //         <div className="content-area" style={{ paddingTop: '0px' }}>
// // // // //           <EventPage darkMode={darkMode} role={role} events={events} setEvents={setEvents} goToAnalytics={goToAnalytics} onEventClick={goToEventDetail} currentMemberId={currentMemberId} />
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (isEventDetail) {
// // // // //     const selectedEvent = events.find(e => e.id === selectedEventId);
// // // // //     return (
// // // // //       <div className={darkMode ? "main-layout dark" : "main-layout"}>
// // // // //         <EventSidebar darkMode={darkMode} goToLanding={goToLanding} goToProfile={goToProfile} role={role} goToLogin={goToLogin} goToTasks={goToTasks} goToMembers={goToMembers} />
// // // // //         <div className="content-area" style={{ paddingTop: '0px' }}>
// // // // //           <EventDetailPage event={selectedEvent} onBack={goToEvents} darkMode={darkMode} role={role} setEvents={setEvents} currentMemberId={currentMemberId} />
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (path === '/analytics') {
// // // // //     return (
// // // // //       <div className={darkMode ? "main-layout dark" : "main-layout"}>
// // // // //         <EventSidebar darkMode={darkMode} goToLanding={goToLanding} goToProfile={goToProfile} role={role} goToLogin={goToLogin} goToTasks={goToTasks} goToMembers={goToMembers} />
// // // // //         <div className="content-area" style={{ paddingTop: '0px' }}>
// // // // //           <Analytics darkMode={darkMode} role={role} events={events} onBack={goToEvents} />
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (['/member/dashboard', '/member/club', '/member/tasks', '/member/events'].includes(path)) {
// // // // //     const tab =
// // // // //       path === '/member/dashboard' ? 'hub' :
// // // // //       path === '/member/club' ? 'club' :
// // // // //       path === '/member/events' ? 'events' : 'tasks';
// // // // //     return (
// // // // //       <MemberPage
// // // // //         darkMode={darkMode}
// // // // //         currentMemberId={currentMemberId}
// // // // //         tasks={tasks} setTasks={setTasks}
// // // // //         events={events} setEvents={setEvents}
// // // // //         role={role}
// // // // //         initialTab={tab}
// // // // //         goToLanding={goToLanding}
// // // // //         goToProfile={goToProfile}
// // // // //       />
// // // // //     );
// // // // //   }

// // // // //   if (path === '/profile') {
// // // // //     if (!role) return null;
// // // // //     return <ProfilePage darkMode={darkMode} role={role} goToLanding={goToLanding} setDarkMode={setDarkMode} />;
// // // // //   }

// // // // //   if (path === '/tasks') {
// // // // //     return (
// // // // //       <div className={darkMode ? "main-layout dark" : "main-layout"}>
// // // // //         <TaskSidebar darkMode={darkMode} goToLanding={goToLanding} goToProfile={goToProfile} role={role} goToLogin={goToLogin} goToEvents={goToEvents} goToMembers={goToMembers} />
// // // // //         <div className="content-area" style={{ paddingTop: '0px' }}>
// // // // //           <TaskPage darkMode={darkMode} role={role} tasks={tasks} setTasks={setTasks} />
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (path === '/members') {
// // // // //     return (
// // // // //       <div className={darkMode ? "main-layout dark" : "main-layout"}>
// // // // //         <Sidebar darkMode={darkMode} goToEvents={goToEvents} goToLogin={goToLogin} goToLanding={goToLanding} role={role} goToProfile={goToProfile} goToTasks={goToTasks} goToMembers={goToMembers} currentPage="members" />
// // // // //         <div className="content-area" style={{ paddingTop: '0px' }}>
// // // // //           <MembersDashboard />
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className={darkMode ? "main-layout dark" : "main-layout"}>
// // // // //       {!role ? (
// // // // //         <GuestSidebar darkMode={darkMode} goToLogin={goToLogin} goToMembers={goToMembers} />
// // // // //       ) : role === 'core-member' ? (
// // // // //         <MemberSidebar
// // // // //           darkMode={darkMode}
// // // // //           goToHome={goToLanding}
// // // // //           goToCoreMember={() => navigate('/member/dashboard')}
// // // // //           goToCoreClub={() => navigate('/member/club')}
// // // // //           goToTasks={() => navigate('/member/tasks')}
// // // // //           goToEvents={() => navigate('/member/events')}
// // // // //           goToProfile={goToProfile}
// // // // //           currentPage="landing"
// // // // //         />
// // // // //       ) : (
// // // // //         <Sidebar darkMode={darkMode} goToEvents={goToEvents} goToLogin={goToLogin} goToLanding={goToLanding} role={role} goToProfile={goToProfile} goToTasks={goToTasks} goToMembers={goToMembers} currentPage="landing" />
// // // // //       )}
// // // // //       <main className="content-area" id="mainContentScroll">
// // // // //         <div id="top">
// // // // //           <Topbar darkMode={darkMode} setDarkMode={setDarkMode} goToLogin={goToLogin} role={role} onLogout={handleLogoutClick} goToSignUp={goToSignUp} />
// // // // //         </div>
// // // // //         <Hero darkMode={darkMode} key={path + location.key} />
// // // // //         <Features />
// // // // //         <Steps />
// // // // //         <About />
// // // // //         <BottomCTA role={role} goToLogin={goToLogin} goToEvents={goToEvents} />
// // // // //         <Footer />
// // // // //       </main>

// // // // //       {logoutModal && (
// // // // //         <div className="confirm-overlay" onClick={() => setLogoutModal(false)}>
// // // // //           <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
// // // // //             <h3>Logout</h3>
// // // // //             <p>Are you sure you want to logout?</p>
// // // // //             <div className="confirm-actions">
// // // // //               <button className="btn-confirm-cancel" onClick={() => setLogoutModal(false)}>Cancel</button>
// // // // //               <button className="btn-confirm-yes" onClick={confirmLogout}>Yes, Logout</button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default App;

// // // // import React, { useEffect, useLayoutEffect, useState } from 'react';
// // // // import { useNavigate, useLocation } from 'react-router-dom';
// // // // import AOS from 'aos';
// // // // import 'aos/dist/aos.css';
// // // // import './clubpilot.css';
// // // // import ProfilePage from './ProfilePage';
// // // // import Sidebar from './Sidebar';
// // // // import Topbar from './Topbar';
// // // // import Hero from './Hero';
// // // // import Features from './Features';
// // // // import Steps from './Steps';
// // // // import About from './About';
// // // // import BottomCTA from './BottomCTA';
// // // // import Footer from './Footer';
// // // // import EventPage from './EventPage';
// // // // import EventSidebar from './EventSidebar';
// // // // import EventDetailPage from './EventDetailPage';
// // // // import LoginPage from './LoginPage';
// // // // import GuestSidebar from './GuestSidebar';
// // // // import SignUpPage from './SignUpPage';
// // // // import TaskPage from './TaskPage';
// // // // import TaskSidebar from './TaskSidebar';
// // // // import MembersDashboard from './Members/pages/MembersDashboard';
// // // // import MemberSidebar from './MemberSidebar';
// // // // import './Members/Members.css';
// // // // import MemberPage from './MemberPage';
// // // // import { initialTasks } from './Members/data/taskData';
// // // // import Analytics from './Analytics';
// // // // import { useTheme } from './ThemeContext'; 

// // // // const PROTECTED_PATHS = [
// // // //   '/events', '/tasks', '/members', '/analytics', '/profile',
// // // //   '/member/dashboard', '/member/club', '/member/tasks', '/member/events',
// // // // ];

// // // // const isProtectedPath = (p) =>
// // // //   /^\/events\/\d+$/.test(p) || PROTECTED_PATHS.includes(p);

// // // // function App() {
// // // //   const navigate = useNavigate();
// // // //   const location = useLocation();
// // // //   const path = location.pathname;
  

// // // //   const { darkMode, setDarkMode } = useTheme();

// // // //   const [role, setRole] = useState(() => sessionStorage.getItem('userRole') || null);
// // // //   const [currentMemberId, setCurrentMemberId] = useState(() => {
// // // //     const v = sessionStorage.getItem('currentMemberId');
// // // //     return v || null;
// // // //   });

// // // //   const [logoutModal, setLogoutModal] = useState(false);

// // // //   const [tasks, setTasks] = useState(() => {
// // // //     const saved = localStorage.getItem('tasks');
// // // //     return saved ? JSON.parse(saved) : initialTasks;
// // // //   });
  
// // // //   useEffect(() => {
// // // //     localStorage.setItem('tasks', JSON.stringify(tasks));
// // // //   }, [tasks]);

// // // //   const [events, setEvents] = useState(() => {
// // // //     const savedEvents = localStorage.getItem('events');
// // // //     if (savedEvents) return JSON.parse(savedEvents);
// // // //     return [
// // // //       { id: 1, title: 'Tech Meetup 2026', date: '2026-08-25', time: '10:00 - 13:00', venue: 'Room 101, Main Building', description: 'Join us for an exciting tech meetup with industry experts.', status: 'upcoming', category: 'tech', icon: '💻', capacity: 50, participants: 20, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
// // // //       { id: 2, title: 'Annual Cultural Fest', date: '2026-09-05', time: '14:00 - 17:00', venue: 'Seminar Hall', description: 'Plan the biggest cultural fest of the year.', status: 'upcoming', category: 'cultural', icon: '🎭', capacity: 50, participants: 33, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
// // // //       { id: 3, title: 'Football Tournament', date: '2026-08-20', time: '08:00 - 18:00', venue: 'Sports Ground', description: 'Inter-college football tournament with 8 teams.', status: 'ongoing', category: 'sports', icon: '⚽', capacity: 50, participants: 0, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
// // // //       { id: 4, title: 'UI/UX Design Workshop', date: '2026-08-15', time: '11:00 - 15:00', venue: 'Design Studio', description: 'Learn the basics of UI/UX design.', status: 'completed', category: 'workshop', icon: '📚', capacity: 50, participants: 37, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
// // // //       { id: 5, title: 'Club Orientation Day', date: '2026-07-28', time: '09:00 - 12:00', venue: 'Auditorium', description: 'Welcome new members to the club.', status: 'completed', category: 'social', icon: '🎉', capacity: 50, participants: 26, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
// // // //       { id: 6, title: 'Guest Lecture: AI & ML', date: '2026-09-10', time: '15:00 - 17:00', venue: 'Lecture Hall 2', description: 'Guest lecture on Artificial Intelligence.', status: 'upcoming', category: 'academic', icon: '🤖', capacity: 50, participants: 29, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
// // // //       { id: 7, title: 'Dance Competition', date: '2026-08-10', time: '18:00 - 21:00', venue: 'Auditorium', description: 'Inter-club dance competition.', status: 'cancelled', category: 'cultural', icon: '💃', capacity: 50, participants: 8, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
// // // //       { id: 8, title: 'Coding Hackathon', date: '2026-09-15', time: '09:00 - 21:00', venue: 'Computer Lab', description: '24-hour coding hackathon.', status: 'ongoing', category: 'tech', icon: '⌨️', capacity: 50, participants: 40, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] }
// // // //     ];
// // // //   });

// // // //   useEffect(() => {
// // // //     localStorage.setItem('events', JSON.stringify(events));
// // // //   }, [events]);

// // // //   useEffect(() => {
// // // //     const updateStatuses = () => {
// // // //       const now = new Date();
// // // //       setEvents(prev => {
// // // //         let changed = false;
// // // //         const next = prev.map(event => {
// // // //           if (event.status === 'cancelled') return event;
// // // //           const [startStr, endStr] = (event.time || '').split(' - ');
// // // //           if (!event.date || !startStr || !endStr) return event;
// // // //           const start = new Date(`${event.date}T${startStr}:00`);
// // // //           const end = new Date(`${event.date}T${endStr}:00`);
// // // //           let newStatus = event.status;
// // // //           if (now >= start && now < end) newStatus = 'ongoing';
// // // //           else if (now >= end) newStatus = 'completed';
// // // //           else if (now < start) newStatus = 'upcoming';
// // // //           if (newStatus !== event.status) {
// // // //             changed = true;
// // // //             return { ...event, status: newStatus };
// // // //           }
// // // //           return event;
// // // //         });
// // // //         return changed ? next : prev;
// // // //       });
// // // //     };

// // // //     updateStatuses();
// // // //     const t = setInterval(updateStatuses, 30000);
// // // //     return () => clearInterval(t);
// // // //   }, []);

// // // //   const isEventDetail = /^\/events\/\d+$/.test(path);
// // // //   const selectedEventId = isEventDetail ? Number(path.split('/')[2]) : null;

// // // //   useEffect(() => {
// // // //     if (isProtectedPath(path) && !role) {
// // // //       navigate('/login', { replace: true });
// // // //     }
// // // //   }, [path, role, navigate]);

// // // //   useLayoutEffect(() => {
// // // //     let animId;
// // // //     animId = requestAnimationFrame(() => {
// // // //       requestAnimationFrame(() => {
// // // //         AOS.init({ once: false, mirror: true, duration: 600, easing: 'ease-out' });
// // // //         AOS.refresh();
// // // //       });
// // // //     });
// // // //     const sc = document.getElementById('mainContentScroll');
// // // //     const onScroll = () => AOS.refresh();
// // // //     if (sc) sc.addEventListener('scroll', onScroll);
// // // //     return () => {
// // // //       if (animId) cancelAnimationFrame(animId);
// // // //       if (sc) sc.removeEventListener('scroll', onScroll);
// // // //     };
// // // //   }, [path, location.key]);

// // // //   const goToLanding = () => navigate('/');
// // // //   const goToLogin = () => navigate('/login');
// // // //   const goToSignUp = () => navigate('/signup');
// // // //   const goToProfile = () => navigate('/profile');
// // // //   const goToTasks = () => navigate('/tasks');
// // // //   const goToMembers = () => navigate('/members');
// // // //   const goToEvents = () => navigate('/events');
// // // //   const goToAnalytics = () => navigate('/analytics');
// // // //   const goToEventDetail = (id) => navigate(`/events/${id}`);

// // // //   const handleSignUp = (userRole) => {
// // // //     setRole(userRole);
// // // //     sessionStorage.setItem('userRole', userRole);
// // // //     navigate('/');
// // // //   };

// // // //   const handleLogin = (userRole, memberId = null) => {
// // // //     setRole(userRole);
// // // //     sessionStorage.setItem('userRole', userRole);

// // // //     const finalId = (memberId !== null && memberId !== undefined && memberId !== '')
// // // //       ? memberId
// // // //       : `${userRole}_${Date.now()}`;

// // // //     setCurrentMemberId(finalId);
// // // //     sessionStorage.setItem('currentMemberId', String(finalId));

// // // //     navigate('/', { replace: true });
// // // //   };

// // // //   const handleLogoutClick = () => setLogoutModal(true);
  
// // // //   const confirmLogout = () => {
// // // //     setLogoutModal(false);
// // // //     setTimeout(() => {
// // // //       setRole(null);
// // // //       setCurrentMemberId(null);
// // // //       sessionStorage.removeItem('userRole');
// // // //       sessionStorage.removeItem('currentMemberId');
// // // //       navigate('/', { replace: true });
// // // //     }, 300);
// // // //   };

// // // //   if (path === '/login') {
// // // //     return <LoginPage onLogin={handleLogin} darkMode={darkMode} goToSignUp={goToSignUp} />;
// // // //   }

// // // //   if (path === '/signup') {
// // // //     return <SignUpPage onSignUp={handleSignUp} darkMode={darkMode} goToLogin={goToLogin} />;
// // // //   }

// // // //   if (path === '/events') {
// // // //     return (
// // // //       <div className={darkMode ? "main-layout dark" : "main-layout"}>
// // // //         <EventSidebar darkMode={darkMode} goToLanding={goToLanding} goToProfile={goToProfile} role={role} goToLogin={goToLogin} goToTasks={goToTasks} goToMembers={goToMembers} />
// // // //         <div className="content-area" style={{ paddingTop: '0px' }}>
// // // //           <EventPage darkMode={darkMode} role={role} events={events} setEvents={setEvents} goToAnalytics={goToAnalytics} onEventClick={goToEventDetail} currentMemberId={currentMemberId} />
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (isEventDetail) {
// // // //     const selectedEvent = events.find(e => e.id === selectedEventId);
// // // //     return (
// // // //       <div className={darkMode ? "main-layout dark" : "main-layout"}>
// // // //         <EventSidebar darkMode={darkMode} goToLanding={goToLanding} goToProfile={goToProfile} role={role} goToLogin={goToLogin} goToTasks={goToTasks} goToMembers={goToMembers} />
// // // //         <div className="content-area" style={{ paddingTop: '0px' }}>
// // // //           <EventDetailPage event={selectedEvent} onBack={goToEvents} darkMode={darkMode} role={role} setEvents={setEvents} currentMemberId={currentMemberId} />
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (path === '/analytics') {
// // // //     return (
// // // //       <div className={darkMode ? "main-layout dark" : "main-layout"}>
// // // //         <EventSidebar darkMode={darkMode} goToLanding={goToLanding} goToProfile={goToProfile} role={role} goToLogin={goToLogin} goToTasks={goToTasks} goToMembers={goToMembers} />
// // // //         <div className="content-area" style={{ paddingTop: '0px' }}>
// // // //           <Analytics darkMode={darkMode} role={role} events={events} onBack={goToEvents} />
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (['/member/dashboard', '/member/club', '/member/tasks', '/member/events'].includes(path)) {
// // // //     const tab =
// // // //       path === '/member/dashboard' ? 'hub' :
// // // //       path === '/member/club' ? 'club' :
// // // //       path === '/member/events' ? 'events' : 'tasks';
// // // //     return (
// // // //       <MemberPage
// // // //         darkMode={darkMode}
// // // //         currentMemberId={currentMemberId}
// // // //         tasks={tasks} setTasks={setTasks}
// // // //         events={events} setEvents={setEvents}
// // // //         role={role}
// // // //         initialTab={tab}
// // // //         goToLanding={goToLanding}
// // // //         goToProfile={goToProfile}
// // // //       />
// // // //     );
// // // //   }

// // // //   if (path === '/profile') {
// // // //     if (!role) return null;
// // // //     return <ProfilePage darkMode={darkMode} role={role} goToLanding={goToLanding} setDarkMode={setDarkMode} />;
// // // //   }

// // // //   if (path === '/tasks') {
// // // //     return (
// // // //       <div className={darkMode ? "main-layout dark" : "main-layout"}>
// // // //         <TaskSidebar darkMode={darkMode} goToLanding={goToLanding} goToProfile={goToProfile} role={role} goToLogin={goToLogin} goToEvents={goToEvents} goToMembers={goToMembers} />
// // // //         <div className="content-area" style={{ paddingTop: '0px' }}>
// // // //           <TaskPage darkMode={darkMode} role={role} tasks={tasks} setTasks={setTasks} />
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (path === '/members') {
// // // //     return (
// // // //       <div className={darkMode ? "main-layout dark" : "main-layout"}>
// // // //         <Sidebar darkMode={darkMode} goToEvents={goToEvents} goToLogin={goToLogin} goToLanding={goToLanding} role={role} goToProfile={goToProfile} goToTasks={goToTasks} goToMembers={goToMembers} currentPage="members" />
// // // //         <div className="content-area" style={{ paddingTop: '0px' }}>
// // // //           <MembersDashboard />
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className={darkMode ? "main-layout dark" : "main-layout"}>
// // // //       {!role ? (
// // // //         <GuestSidebar darkMode={darkMode} goToLogin={goToLogin} goToMembers={goToMembers} />
// // // //       ) : role === 'core-member' ? (
// // // //         <MemberSidebar
// // // //           darkMode={darkMode}
// // // //           goToHome={goToLanding}
// // // //           goToCoreMember={() => navigate('/member/dashboard')}
// // // //           goToCoreClub={() => navigate('/member/club')}
// // // //           goToTasks={() => navigate('/member/tasks')}
// // // //           goToEvents={() => navigate('/member/events')}
// // // //           goToProfile={goToProfile}
// // // //           currentPage="landing"
// // // //         />
// // // //       ) : (
// // // //         <Sidebar darkMode={darkMode} goToEvents={goToEvents} goToLogin={goToLogin} goToLanding={goToLanding} role={role} goToProfile={goToProfile} goToTasks={goToTasks} goToMembers={goToMembers} currentPage="landing" />
// // // //       )}
// // // //       <main className="content-area" id="mainContentScroll">
// // // //         <div id="top">
// // // //           <Topbar darkMode={darkMode} setDarkMode={setDarkMode} goToLogin={goToLogin} role={role} onLogout={handleLogoutClick} goToSignUp={goToSignUp} />
// // // //         </div>
// // // //         <Hero darkMode={darkMode} key={path + location.key} />
// // // //         <Features />
// // // //         <Steps />
// // // //         <About />
// // // //         <BottomCTA role={role} goToLogin={goToLogin} goToEvents={goToEvents} />
// // // //         <Footer />
// // // //       </main>

// // // //       {logoutModal && (
// // // //         <div className="confirm-overlay" onClick={() => setLogoutModal(false)}>
// // // //           <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
// // // //             <h3>Logout</h3>
// // // //             <p>Are you sure you want to logout?</p>
// // // //             <div className="confirm-actions">
// // // //               <button className="btn-confirm-cancel" onClick={() => setLogoutModal(false)}>Cancel</button>
// // // //               <button className="btn-confirm-yes" onClick={confirmLogout}>Yes, Logout</button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default App;

// // // import React, { useEffect, useLayoutEffect, useState } from 'react';
// // // import { useNavigate, useLocation } from 'react-router-dom';
// // // import AOS from 'aos';
// // // import 'aos/dist/aos.css';
// // // import './clubpilot.css';
// // // import ProfilePage from './ProfilePage';
// // // import Sidebar from './Sidebar';
// // // import Topbar from './Topbar';
// // // import Hero from './Hero';
// // // import Features from './Features';
// // // import Steps from './Steps';
// // // import About from './About';
// // // import BottomCTA from './BottomCTA';
// // // import Footer from './Footer';
// // // import EventPage from './EventPage';
// // // import EventSidebar from './EventSidebar';
// // // import EventDetailPage from './EventDetailPage';
// // // import LoginPage from './LoginPage';
// // // import GuestSidebar from './GuestSidebar';
// // // import SignUpPage from './SignUpPage';
// // // import TaskPage from './TaskPage';
// // // import TaskSidebar from './TaskSidebar';
// // // import MembersDashboard from './Members/pages/MembersDashboard';
// // // import MemberSidebar from './MemberSidebar';
// // // import './Members/Members.css';
// // // import MemberPage from './MemberPage';
// // // import { initialTasks } from './Members/data/taskData';
// // // import Analytics from './Analytics';

// // // import { useTheme } from './ThemeContext'; 

// // // const PROTECTED_PATHS = [
// // //   '/events', '/tasks', '/members', '/analytics', '/profile',
// // //   '/member/dashboard', '/member/club', '/member/tasks', '/member/events',
// // // ];

// // // const isProtectedPath = (p) =>
// // //   /^\/events\/\d+$/.test(p) || PROTECTED_PATHS.includes(p);

// // // function App() {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();
// // //   const path = location.pathname;
  
// // //   // ✅ Context se darkMode
// // //   const { darkMode } = useTheme();

// // //   const [role, setRole] = useState(() => sessionStorage.getItem('userRole') || null);
// // //   const [currentMemberId, setCurrentMemberId] = useState(() => {
// // //     const v = sessionStorage.getItem('currentMemberId');
// // //     return v || null;
// // //   });

// // //   const [logoutModal, setLogoutModal] = useState(false);

// // //   const [tasks, setTasks] = useState(() => {
// // //     const saved = localStorage.getItem('tasks');
// // //     return saved ? JSON.parse(saved) : initialTasks;
// // //   });
  
// // //   useEffect(() => {
// // //     localStorage.setItem('tasks', JSON.stringify(tasks));
// // //   }, [tasks]);

// // //   // ✅ Wapas normal useState for events
// // //   const [events, setEvents] = useState(() => {
// // //     const savedEvents = localStorage.getItem('events');
// // //     if (savedEvents) return JSON.parse(savedEvents);
// // //     return [
// // //       { id: 1, title: 'Tech Meetup 2026', date: '2026-08-25', time: '10:00 - 13:00', venue: 'Room 101, Main Building', description: 'Join us for an exciting tech meetup with industry experts.', status: 'upcoming', category: 'tech', icon: '💻', capacity: 50, participants: 20, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
// // //       { id: 2, title: 'Annual Cultural Fest', date: '2026-09-05', time: '14:00 - 17:00', venue: 'Seminar Hall', description: 'Plan the biggest cultural fest of the year.', status: 'upcoming', category: 'cultural', icon: '🎭', capacity: 50, participants: 33, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
// // //       { id: 3, title: 'Football Tournament', date: '2026-08-20', time: '08:00 - 18:00', venue: 'Sports Ground', description: 'Inter-college football tournament with 8 teams.', status: 'ongoing', category: 'sports', icon: '⚽', capacity: 50, participants: 0, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
// // //       { id: 4, title: 'UI/UX Design Workshop', date: '2026-08-15', time: '11:00 - 15:00', venue: 'Design Studio', description: 'Learn the basics of UI/UX design.', status: 'completed', category: 'workshop', icon: '📚', capacity: 50, participants: 37, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
// // //       { id: 5, title: 'Club Orientation Day', date: '2026-07-28', time: '09:00 - 12:00', venue: 'Auditorium', description: 'Welcome new members to the club.', status: 'completed', category: 'social', icon: '🎉', capacity: 50, participants: 26, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
// // //       { id: 6, title: 'Guest Lecture: AI & ML', date: '2026-09-10', time: '15:00 - 17:00', venue: 'Lecture Hall 2', description: 'Guest lecture on Artificial Intelligence.', status: 'upcoming', category: 'academic', icon: '🤖', capacity: 50, participants: 29, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
// // //       { id: 7, title: 'Dance Competition', date: '2026-08-10', time: '18:00 - 21:00', venue: 'Auditorium', description: 'Inter-club dance competition.', status: 'cancelled', category: 'cultural', icon: '💃', capacity: 50, participants: 8, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] },
// // //       { id: 8, title: 'Coding Hackathon', date: '2026-09-15', time: '09:00 - 21:00', venue: 'Computer Lab', description: '24-hour coding hackathon.', status: 'ongoing', category: 'tech', icon: '⌨️', capacity: 50, participants: 40, participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [] }
// // //     ];
// // //   });

// // //   useEffect(() => {
// // //     localStorage.setItem('events', JSON.stringify(events));
// // //   }, [events]);

// // //   // Real-time event status auto-update
// // //   useEffect(() => {
// // //     const updateStatuses = () => {
// // //       const now = new Date();
// // //       setEvents(prev => {
// // //         let changed = false;
// // //         const next = prev.map(event => {
// // //           if (event.status === 'cancelled') return event;
// // //           const [startStr, endStr] = (event.time || '').split(' - ');
// // //           if (!event.date || !startStr || !endStr) return event;
// // //           const start = new Date(`${event.date}T${startStr}:00`);
// // //           const end = new Date(`${event.date}T${endStr}:00`);
// // //           let newStatus = event.status;
// // //           if (now >= start && now < end) newStatus = 'ongoing';
// // //           else if (now >= end) newStatus = 'completed';
// // //           else if (now < start) newStatus = 'upcoming';
// // //           if (newStatus !== event.status) {
// // //             changed = true;
// // //             return { ...event, status: newStatus };
// // //           }
// // //           return event;
// // //         });
// // //         return changed ? next : prev;
// // //       });
// // //     };

// // //     updateStatuses();
// // //     const t = setInterval(updateStatuses, 30000);
// // //     return () => clearInterval(t);
// // //   }, []);

// // //   const isEventDetail = /^\/events\/\d+$/.test(path);
// // //   const selectedEventId = isEventDetail ? Number(path.split('/')[2]) : null;

// // //   useEffect(() => {
// // //     if (isProtectedPath(path) && !role) {
// // //       navigate('/login', { replace: true });
// // //     }
// // //   }, [path, role, navigate]);

// // //   useLayoutEffect(() => {
// // //     let animId;
// // //     animId = requestAnimationFrame(() => {
// // //       requestAnimationFrame(() => {
// // //         AOS.init({ once: false, mirror: true, duration: 600, easing: 'ease-out' });
// // //         AOS.refresh();
// // //       });
// // //     });
// // //     const sc = document.getElementById('mainContentScroll');
// // //     const onScroll = () => AOS.refresh();
// // //     if (sc) sc.addEventListener('scroll', onScroll);
// // //     return () => {
// // //       if (animId) cancelAnimationFrame(animId);
// // //       if (sc) sc.removeEventListener('scroll', onScroll);
// // //     };
// // //   }, [path, location.key]);

// // //   const goToLanding = () => navigate('/');
// // //   const goToLogin = () => navigate('/login');
// // //   const goToSignUp = () => navigate('/signup');
// // //   const goToProfile = () => navigate('/profile');
// // //   const goToTasks = () => navigate('/tasks');
// // //   const goToMembers = () => navigate('/members');
// // //   const goToEvents = () => navigate('/events');
// // //   const goToAnalytics = () => navigate('/analytics');
// // //   const goToEventDetail = (id) => navigate(`/events/${id}`);

// // //   const handleSignUp = (userRole) => {
// // //     setRole(userRole);
// // //     sessionStorage.setItem('userRole', userRole);
// // //     navigate('/');
// // //   };

// // //   const handleLogin = (userRole, memberId = null) => {
// // //     setRole(userRole);
// // //     sessionStorage.setItem('userRole', userRole);

// // //     const finalId = (memberId !== null && memberId !== undefined && memberId !== '')
// // //       ? memberId
// // //       : `${userRole}_${Date.now()}`;

// // //     setCurrentMemberId(finalId);
// // //     sessionStorage.setItem('currentMemberId', String(finalId));

// // //     navigate('/', { replace: true });
// // //   };

// // //   const handleLogoutClick = () => setLogoutModal(true);
  
// // //   const confirmLogout = () => {
// // //     setLogoutModal(false);
// // //     setTimeout(() => {
// // //       setRole(null);
// // //       setCurrentMemberId(null);
// // //       sessionStorage.removeItem('userRole');
// // //       sessionStorage.removeItem('currentMemberId');
// // //       navigate('/', { replace: true });
// // //     }, 300);
// // //   };

// // //   if (path === '/login') {
// // //     return <LoginPage onLogin={handleLogin} goToSignUp={goToSignUp} />;
// // //   }

// // //   if (path === '/signup') {
// // //     return <SignUpPage onSignUp={handleSignUp} goToLogin={goToLogin} />;
// // //   }

// // //   if (path === '/events') {
// // //     return (
// // //       <div className={darkMode ? "main-layout dark" : "main-layout"}>
// // //         <EventSidebar goToLanding={goToLanding} goToProfile={goToProfile} role={role} goToLogin={goToLogin} goToTasks={goToTasks} goToMembers={goToMembers} />
// // //         <div className="content-area" style={{ paddingTop: '0px' }}>
// // //           <EventPage role={role} events={events} setEvents={setEvents} goToAnalytics={goToAnalytics} onEventClick={goToEventDetail} currentMemberId={currentMemberId} />
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (isEventDetail) {
// // //     const selectedEvent = events.find(e => e.id === selectedEventId);
// // //     return (
// // //       <div className={darkMode ? "main-layout dark" : "main-layout"}>
// // //         <EventSidebar goToLanding={goToLanding} goToProfile={goToProfile} role={role} goToLogin={goToLogin} goToTasks={goToTasks} goToMembers={goToMembers} />
// // //         <div className="content-area" style={{ paddingTop: '0px' }}>
// // //           <EventDetailPage event={selectedEvent} onBack={goToEvents} role={role} setEvents={setEvents} currentMemberId={currentMemberId} />
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (path === '/analytics') {
// // //     return (
// // //       <div className={darkMode ? "main-layout dark" : "main-layout"}>
// // //         <EventSidebar goToLanding={goToLanding} goToProfile={goToProfile} role={role} goToLogin={goToLogin} goToTasks={goToTasks} goToMembers={goToMembers} />
// // //         <div className="content-area" style={{ paddingTop: '0px' }}>
// // //           <Analytics role={role} events={events} onBack={goToEvents} />
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (['/member/dashboard', '/member/club', '/member/tasks', '/member/events'].includes(path)) {
// // //     const tab =
// // //       path === '/member/dashboard' ? 'hub' :
// // //       path === '/member/club' ? 'club' :
// // //       path === '/member/events' ? 'events' : 'tasks';
// // //     return (
// // //       <MemberPage
// // //         currentMemberId={currentMemberId}
// // //         tasks={tasks} setTasks={setTasks}
// // //         events={events} setEvents={setEvents}
// // //         role={role}
// // //         initialTab={tab}
// // //         goToLanding={goToLanding}
// // //         goToProfile={goToProfile}
// // //       />
// // //     );
// // //   }

// // //   if (path === '/profile') {
// // //     if (!role) return null;
// // //     return <ProfilePage role={role} goToLanding={goToLanding} />;
// // //   }

// // //   if (path === '/tasks') {
// // //     return (
// // //       <div className={darkMode ? "main-layout dark" : "main-layout"}>
// // //         <TaskSidebar goToLanding={goToLanding} goToProfile={goToProfile} role={role} goToLogin={goToLogin} goToEvents={goToEvents} goToMembers={goToMembers} />
// // //         <div className="content-area" style={{ paddingTop: '0px' }}>
// // //           <TaskPage role={role} tasks={tasks} setTasks={setTasks} />
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (path === '/members') {
// // //     return (
// // //       <div className={darkMode ? "main-layout dark" : "main-layout"}>
// // //         <Sidebar goToEvents={goToEvents} goToLogin={goToLogin} goToLanding={goToLanding} role={role} goToProfile={goToProfile} goToTasks={goToTasks} goToMembers={goToMembers} currentPage="members" />
// // //         <div className="content-area" style={{ paddingTop: '0px' }}>
// // //           <MembersDashboard />
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className={darkMode ? "main-layout dark" : "main-layout"}>
// // //       {!role ? (
// // //         <GuestSidebar goToLogin={goToLogin} goToMembers={goToMembers} />
// // //       ) : role === 'core-member' ? (
// // //         <MemberSidebar
// // //           goToHome={goToLanding}
// // //           goToCoreMember={() => navigate('/member/dashboard')}
// // //           goToCoreClub={() => navigate('/member/club')}
// // //           goToTasks={() => navigate('/member/tasks')}
// // //           goToEvents={() => navigate('/member/events')}
// // //           goToProfile={goToProfile}
// // //           currentPage="landing"
// // //         />
// // //       ) : (
// // //         <Sidebar goToEvents={goToEvents} goToLogin={goToLogin} goToLanding={goToLanding} role={role} goToProfile={goToProfile} goToTasks={goToTasks} goToMembers={goToMembers} currentPage="landing" />
// // //       )}
// // //       <main className="content-area" id="mainContentScroll">
// // //         <div id="top">
// // //           <Topbar goToLogin={goToLogin} role={role} onLogout={handleLogoutClick} goToSignUp={goToSignUp} />
// // //         </div>
// // //         <Hero darkMode={darkMode} key={path + location.key} />
// // //         <Features />
// // //         <Steps />
// // //         <About />
// // //         <BottomCTA role={role} goToLogin={goToLogin} goToEvents={goToEvents} />
// // //         <Footer />
// // //       </main>

// // //       {logoutModal && (
// // //         <div className="confirm-overlay" onClick={() => setLogoutModal(false)}>
// // //           <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
// // //             <h3>Logout</h3>
// // //             <p>Are you sure you want to logout?</p>
// // //             <div className="confirm-actions">
// // //               <button className="btn-confirm-cancel" onClick={() => setLogoutModal(false)}>Cancel</button>
// // //               <button className="btn-confirm-yes" onClick={confirmLogout}>Yes, Logout</button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default App;

// // import React, { useEffect, useLayoutEffect, useReducer, useState } from 'react';
// // import { useNavigate, useLocation } from 'react-router-dom';
// // import AOS from 'aos';
// // import 'aos/dist/aos.css';
// // import './clubpilot.css';
// // import ProfilePage from './ProfilePage';
// // import Sidebar from './Sidebar';
// // import Topbar from './Topbar';
// // import Hero from './Hero';
// // import Features from './Features';
// // import Steps from './Steps';
// // import About from './About';
// // import BottomCTA from './BottomCTA';
// // import Footer from './Footer';
// // import EventPage from './EventPage';
// // import EventSidebar from './EventSidebar';
// // import EventDetailPage from './EventDetailPage';
// // import LoginPage from './LoginPage';
// // import GuestSidebar from './GuestSidebar';
// // import SignUpPage from './SignUpPage';
// // import TaskPage from './TaskPage';
// // import TaskSidebar from './TaskSidebar';
// // import MembersDashboard from './Members/pages/MembersDashboard';
// // import MemberSidebar from './MemberSidebar';
// // import './Members/Members.css';
// // import MemberPage from './MemberPage';
// // import { initialTasks } from './Members/data/taskData';
// // import Analytics from './Analytics';
// // import { useTheme } from './ThemeContext'; 
// // import { eventsReducer, initialEventsState } from './eventsReducer';

// // const PROTECTED_PATHS = [
// //   '/events', '/tasks', '/members', '/analytics', '/profile',
// //   '/member/dashboard', '/member/club', '/member/tasks', '/member/events',
// // ];

// // const isProtectedPath = (p) =>
// //   /^\/events\/\d+$/.test(p) || PROTECTED_PATHS.includes(p);

// // function App() {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const path = location.pathname;
  
// //   const { darkMode } = useTheme();

// //   const [role, setRole] = useState(() => sessionStorage.getItem('userRole') || null);
// //   const [currentMemberId, setCurrentMemberId] = useState(() => {
// //     const v = sessionStorage.getItem('currentMemberId');
// //     return v || null;
// //   });

// //   const [logoutModal, setLogoutModal] = useState(false);

// //   const [tasks, setTasks] = useState(() => {
// //     const saved = localStorage.getItem('tasks');
// //     return saved ? JSON.parse(saved) : initialTasks;
// //   });
  
// //   useEffect(() => {
// //     localStorage.setItem('tasks', JSON.stringify(tasks));
// //   }, [tasks]);


// //   const [events, dispatch] = useReducer(eventsReducer, null, () => {
// //     const savedEvents = localStorage.getItem('events');
// //     return savedEvents ? JSON.parse(savedEvents) : initialEventsState;
// //   });


// //   const setEvents = (updater) => {
// //     const nextEvents = typeof updater === 'function' ? updater(events) : updater;
// //     dispatch({ type: 'SET_EVENTS', payload: nextEvents });
// //   };


// //   useEffect(() => {
// //     localStorage.setItem('events', JSON.stringify(events));
// //   }, [events]);


// //   useEffect(() => {
// //     const updateStatuses = () => {
// //       const now = new Date();
// //       dispatch({
// //         type: 'SET_EVENTS',
// //         payload: events.map(event => {
// //           if (event.status === 'cancelled') return event;
// //           const [startStr, endStr] = (event.time || '').split(' - ');
// //           if (!event.date || !startStr || !endStr) return event;
// //           const start = new Date(`${event.date}T${startStr}:00`);
// //           const end = new Date(`${event.date}T${endStr}:00`);
// //           let newStatus = event.status;
// //           if (now >= start && now < end) newStatus = 'ongoing';
// //           else if (now >= end) newStatus = 'completed';
// //           else if (now < start) newStatus = 'upcoming';
// //           if (newStatus !== event.status) {
// //             return { ...event, status: newStatus };
// //           }
// //           return event;
// //         })
// //       });
// //     };

// //     const t = setInterval(updateStatuses, 30000);
// //     return () => clearInterval(t);
// //   }, [events]);

// //   const isEventDetail = /^\/events\/\d+$/.test(path);
// //   const selectedEventId = isEventDetail ? Number(path.split('/')[2]) : null;

// //   useEffect(() => {
// //     if (isProtectedPath(path) && !role) {
// //       navigate('/login', { replace: true });
// //     }
// //   }, [path, role, navigate]);

// //   useLayoutEffect(() => {
// //     let animId;
// //     animId = requestAnimationFrame(() => {
// //       requestAnimationFrame(() => {
// //         AOS.init({ once: false, mirror: true, duration: 600, easing: 'ease-out' });
// //         AOS.refresh();
// //       });
// //     });
// //     const sc = document.getElementById('mainContentScroll');
// //     const onScroll = () => AOS.refresh();
// //     if (sc) sc.addEventListener('scroll', onScroll);
// //     return () => {
// //       if (animId) cancelAnimationFrame(animId);
// //       if (sc) sc.removeEventListener('scroll', onScroll);
// //     };
// //   }, [path, location.key]);

// //   const goToLanding = () => navigate('/');
// //   const goToLogin = () => navigate('/login');
// //   const goToSignUp = () => navigate('/signup');
// //   const goToProfile = () => navigate('/profile');
// //   const goToTasks = () => navigate('/tasks');
// //   const goToMembers = () => navigate('/members');
// //   const goToEvents = () => navigate('/events');
// //   const goToAnalytics = () => navigate('/analytics');
// //   const goToEventDetail = (id) => navigate(`/events/${id}`);

// //   const handleSignUp = (userRole) => {
// //     setRole(userRole);
// //     sessionStorage.setItem('userRole', userRole);
// //     navigate('/');
// //   };

// //   const handleLogin = (userRole, memberId = null) => {
// //     setRole(userRole);
// //     sessionStorage.setItem('userRole', userRole);

// //     const finalId = (memberId !== null && memberId !== undefined && memberId !== '')
// //       ? memberId
// //       : `${userRole}_${Date.now()}`;

// //     setCurrentMemberId(finalId);
// //     sessionStorage.setItem('currentMemberId', String(finalId));

// //     navigate('/', { replace: true });
// //   };

// //   const handleLogoutClick = () => setLogoutModal(true);
  
// //   const confirmLogout = () => {
// //     setLogoutModal(false);
// //     setTimeout(() => {
// //       setRole(null);
// //       setCurrentMemberId(null);
// //       sessionStorage.removeItem('userRole');
// //       sessionStorage.removeItem('currentMemberId');
// //       navigate('/', { replace: true });
// //     }, 300);
// //   };

// //   if (path === '/login') {
// //     return <LoginPage onLogin={handleLogin} goToSignUp={goToSignUp} />;
// //   }

// //   if (path === '/signup') {
// //     return <SignUpPage onSignUp={handleSignUp} goToLogin={goToLogin} />;
// //   }

// //   if (path === '/events') {
// //     return (
// //       <div className={darkMode ? "main-layout dark" : "main-layout"}>
// //         <EventSidebar goToLanding={goToLanding} goToProfile={goToProfile} role={role} goToLogin={goToLogin} goToTasks={goToTasks} goToMembers={goToMembers} />
// //         <div className="content-area" style={{ paddingTop: '0px' }}>
// //           <EventPage role={role} events={events} setEvents={setEvents} goToAnalytics={goToAnalytics} onEventClick={goToEventDetail} currentMemberId={currentMemberId}  dispatch={dispatch} />
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (isEventDetail) {
// //     const selectedEvent = events.find(e => e.id === selectedEventId);
// //     return (
// //       <div className={darkMode ? "main-layout dark" : "main-layout"}>
// //         <EventSidebar goToLanding={goToLanding} goToProfile={goToProfile} role={role} goToLogin={goToLogin} goToTasks={goToTasks} goToMembers={goToMembers} />
// //         <div className="content-area" style={{ paddingTop: '0px' }}>
// //           <EventDetailPage event={selectedEvent} onBack={goToEvents} role={role} setEvents={setEvents} currentMemberId={currentMemberId} />
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (path === '/analytics') {
// //     return (
// //       <div className={darkMode ? "main-layout dark" : "main-layout"}>
// //         <EventSidebar goToLanding={goToLanding} goToProfile={goToProfile} role={role} goToLogin={goToLogin} goToTasks={goToTasks} goToMembers={goToMembers} />
// //         <div className="content-area" style={{ paddingTop: '0px' }}>
// //           <Analytics role={role} events={events} onBack={goToEvents} />
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (['/member/dashboard', '/member/club', '/member/tasks', '/member/events'].includes(path)) {
// //     const tab =
// //       path === '/member/dashboard' ? 'hub' :
// //       path === '/member/club' ? 'club' :
// //       path === '/member/events' ? 'events' : 'tasks';
// //     return (
// //       <MemberPage
// //         currentMemberId={currentMemberId}
// //         tasks={tasks} setTasks={setTasks}
// //         events={events} setEvents={setEvents}
// //         role={role}
// //         initialTab={tab}
// //         goToLanding={goToLanding}
// //         goToProfile={goToProfile}
// //       />
// //     );
// //   }

// //   if (path === '/profile') {
// //     if (!role) return null;
// //     return <ProfilePage role={role} goToLanding={goToLanding} />;
// //   }

// //   if (path === '/tasks') {
// //     return (
// //       <div className={darkMode ? "main-layout dark" : "main-layout"}>
// //         <TaskSidebar goToLanding={goToLanding} goToProfile={goToProfile} role={role} goToLogin={goToLogin} goToEvents={goToEvents} goToMembers={goToMembers} />
// //         <div className="content-area" style={{ paddingTop: '0px' }}>
// //           <TaskPage role={role} tasks={tasks} setTasks={setTasks} />
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (path === '/members') {
// //     return (
// //       <div className={darkMode ? "main-layout dark" : "main-layout"}>
// //         <Sidebar goToEvents={goToEvents} goToLogin={goToLogin} goToLanding={goToLanding} role={role} goToProfile={goToProfile} goToTasks={goToTasks} goToMembers={goToMembers} currentPage="members" />
// //         <div className="content-area" style={{ paddingTop: '0px' }}>
// //           <MembersDashboard />
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className={darkMode ? "main-layout dark" : "main-layout"}>
// //       {!role ? (
// //         <GuestSidebar goToLogin={goToLogin} goToMembers={goToMembers} />
// //       ) : role === 'core-member' ? (
// //         <MemberSidebar
// //           goToHome={goToLanding}
// //           goToCoreMember={() => navigate('/member/dashboard')}
// //           goToCoreClub={() => navigate('/member/club')}
// //           goToTasks={() => navigate('/member/tasks')}
// //           goToEvents={() => navigate('/member/events')}
// //           goToProfile={goToProfile}
// //           currentPage="landing"
// //         />
// //       ) : (
// //         <Sidebar goToEvents={goToEvents} goToLogin={goToLogin} goToLanding={goToLanding} role={role} goToProfile={goToProfile} goToTasks={goToTasks} goToMembers={goToMembers} currentPage="landing" />
// //       )}
// //       <main className="content-area" id="mainContentScroll">
// //         <div id="top">
// //           <Topbar goToLogin={goToLogin} role={role} onLogout={handleLogoutClick} goToSignUp={goToSignUp} />
// //         </div>
// //         <Hero darkMode={darkMode} key={path + location.key} />
// //         <Features />
// //         <Steps />
// //         <About />
// //         <BottomCTA role={role} goToLogin={goToLogin} goToEvents={goToEvents} />
// //         <Footer />
// //       </main>

// //       {logoutModal && (
// //         <div className="confirm-overlay" onClick={() => setLogoutModal(false)}>
// //           <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
// //             <h3>Logout</h3>
// //             <p>Are you sure you want to logout?</p>
// //             <div className="confirm-actions">
// //               <button className="btn-confirm-cancel" onClick={() => setLogoutModal(false)}>Cancel</button>
// //               <button className="btn-confirm-yes" onClick={confirmLogout}>Yes, Logout</button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default App;


// import React, { useEffect, useLayoutEffect, useReducer, useState } from 'react';
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
// import { useTheme } from './ThemeContext'; 
// import { eventsReducer, initialEventsState } from './eventsReducer';

// const PROTECTED_PATHS = [
//   '/events', '/tasks', '/members', '/analytics', '/profile',
//   '/member/dashboard', '/member/club', '/member/tasks', '/member/events',
// ];

// const isProtectedPath = (p) =>
//   /^\/events\/\d+$/.test(p) || PROTECTED_PATHS.includes(p);

// function App() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const path = location.pathname;
  
//   const { darkMode } = useTheme();

//   const [role, setRole] = useState(() => sessionStorage.getItem('userRole') || null);
//   const [currentMemberId, setCurrentMemberId] = useState(() => {
//     const v = sessionStorage.getItem('currentMemberId');
//     return v || null;
//   });

//   const [logoutModal, setLogoutModal] = useState(false);

//   const [tasks, setTasks] = useState(() => {
//     const saved = localStorage.getItem('tasks');
//     return saved ? JSON.parse(saved) : initialTasks;
//   });
  
//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);


//   const [events, dispatch] = useReducer(eventsReducer, null, () => {
//     const savedEvents = localStorage.getItem('events');
//     return savedEvents ? JSON.parse(savedEvents) : initialEventsState;
//   });

//   useEffect(() => {
//     localStorage.setItem('events', JSON.stringify(events));
//   }, [events]);


//   useEffect(() => {
//     const updateStatuses = () => {
//       const now = new Date();
//       dispatch({
//         type: 'SET_EVENTS',
//         payload: events.map(event => {
//           if (event.status === 'cancelled') return event;
//           const [startStr, endStr] = (event.time || '').split(' - ');
//           if (!event.date || !startStr || !endStr) return event;
//           const start = new Date(`${event.date}T${startStr}:00`);
//           const end = new Date(`${event.date}T${endStr}:00`);
//           let newStatus = event.status;
//           if (now >= start && now < end) newStatus = 'ongoing';
//           else if (now >= end) newStatus = 'completed';
//           else if (now < start) newStatus = 'upcoming';
//           if (newStatus !== event.status) {
//             return { ...event, status: newStatus };
//           }
//           return event;
//         })
//       });
//     };

//     const t = setInterval(updateStatuses, 30000);
//     return () => clearInterval(t);
//   }, [events]);

//   const isEventDetail = /^\/events\/\d+$/.test(path);
//   const selectedEventId = isEventDetail ? Number(path.split('/')[2]) : null;

//   useEffect(() => {
//     if (isProtectedPath(path) && !role) {
//       navigate('/login', { replace: true });
//     }
//   }, [path, role, navigate]);

//   useLayoutEffect(() => {
//     let animId;
//     animId = requestAnimationFrame(() => {
//       requestAnimationFrame(() => {
//         AOS.init({ once: false, mirror: true, duration: 600, easing: 'ease-out' });
//         AOS.refresh();
//       });
//     });
//     const sc = document.getElementById('mainContentScroll');
//     const onScroll = () => AOS.refresh();
//     if (sc) sc.addEventListener('scroll', onScroll);
//     return () => {
//       if (animId) cancelAnimationFrame(animId);
//       if (sc) sc.removeEventListener('scroll', onScroll);
//     };
//   }, [path, location.key]);

//   const goToLanding = () => navigate('/');
//   const goToLogin = () => navigate('/login');
//   const goToSignUp = () => navigate('/signup');
//   const goToProfile = () => navigate('/profile');
//   const goToTasks = () => navigate('/tasks');
//   const goToMembers = () => navigate('/members');
//   const goToEvents = () => navigate('/events');
//   const goToAnalytics = () => navigate('/analytics');
//   const goToEventDetail = (id) => navigate(`/events/${id}`);

//   const handleSignUp = (userRole) => {
//     setRole(userRole);
//     sessionStorage.setItem('userRole', userRole);
//     navigate('/');
//   };

//   const handleLogin = (userRole, memberId = null) => {
//     setRole(userRole);
//     sessionStorage.setItem('userRole', userRole);
//     const finalId = (memberId !== null && memberId !== undefined && memberId !== '')
//       ? memberId
//       : `${userRole}_${Date.now()}`;
//     setCurrentMemberId(finalId);
//     sessionStorage.setItem('currentMemberId', String(finalId));
//     navigate('/', { replace: true });
//   };

//   const handleLogoutClick = () => setLogoutModal(true);
  
//   const confirmLogout = () => {
//     setLogoutModal(false);
//     setTimeout(() => {
//       setRole(null);
//       setCurrentMemberId(null);
//       sessionStorage.removeItem('userRole');
//       sessionStorage.removeItem('currentMemberId');
//       navigate('/', { replace: true });
//     }, 300);
//   };

//   if (path === '/login') {
//     return <LoginPage onLogin={handleLogin} goToSignUp={goToSignUp} />;
//   }

//   if (path === '/signup') {
//     return <SignUpPage onSignUp={handleSignUp} goToLogin={goToLogin} />;
//   }

//   if (path === '/events') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <EventSidebar goToLanding={goToLanding} goToProfile={goToProfile} role={role} goToLogin={goToLogin} goToTasks={goToTasks} goToMembers={goToMembers} />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <EventPage 
//             role={role} 
//             events={events} 
//             dispatch={dispatch} 
//             goToAnalytics={goToAnalytics} 
//             onEventClick={goToEventDetail} 
//             currentMemberId={currentMemberId} 
//           />
//         </div>
//       </div>
//     );
//   }

//   if (isEventDetail) {
//     const selectedEvent = events.find(e => e.id === selectedEventId);
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <EventSidebar goToLanding={goToLanding} goToProfile={goToProfile} role={role} goToLogin={goToLogin} goToTasks={goToTasks} goToMembers={goToMembers} />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <EventDetailPage 
//             event={selectedEvent} 
//             onBack={goToEvents} 
//             role={role} 
//             dispatch={dispatch} 
//             currentMemberId={currentMemberId} 
//           />
//         </div>
//       </div>
//     );
//   }

//   if (path === '/analytics') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <EventSidebar goToLanding={goToLanding} goToProfile={goToProfile} role={role} goToLogin={goToLogin} goToTasks={goToTasks} goToMembers={goToMembers} />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <Analytics role={role} events={events} onBack={goToEvents} />
//         </div>
//       </div>
//     );
//   }

//   if (['/member/dashboard', '/member/club', '/member/tasks', '/member/events'].includes(path)) {
//     const tab =
//       path === '/member/dashboard' ? 'hub' :
//       path === '/member/club' ? 'club' :
//       path === '/member/events' ? 'events' : 'tasks';
//     return (
//       <MemberPage
//         currentMemberId={currentMemberId}
//         tasks={tasks} setTasks={setTasks}
//         events={events} 
//         dispatch={dispatch}
//         role={role}
//         initialTab={tab}
//         goToLanding={goToLanding}
//         goToProfile={goToProfile}
//       />
//     );
//   }

//   if (path === '/profile') {
//     if (!role) return null;
//     return <ProfilePage role={role} goToLanding={goToLanding} />;
//   }

//   if (path === '/tasks') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <TaskSidebar goToLanding={goToLanding} goToProfile={goToProfile} role={role} goToLogin={goToLogin} goToEvents={goToEvents} goToMembers={goToMembers} />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <TaskPage role={role} tasks={tasks} setTasks={setTasks} />
//         </div>
//       </div>
//     );
//   }

//   if (path === '/members') {
//     return (
//       <div className={darkMode ? "main-layout dark" : "main-layout"}>
//         <Sidebar goToEvents={goToEvents} goToLogin={goToLogin} goToLanding={goToLanding} role={role} goToProfile={goToProfile} goToTasks={goToTasks} goToMembers={goToMembers} currentPage="members" />
//         <div className="content-area" style={{ paddingTop: '0px' }}>
//           <MembersDashboard />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={darkMode ? "main-layout dark" : "main-layout"}>
//       {!role ? (
//         <GuestSidebar goToLogin={goToLogin} goToMembers={goToMembers} />
//       ) : role === 'core-member' ? (
//         <MemberSidebar
//           goToHome={goToLanding}
//           goToCoreMember={() => navigate('/member/dashboard')}
//           goToCoreClub={() => navigate('/member/club')}
//           goToTasks={() => navigate('/member/tasks')}
//           goToEvents={() => navigate('/member/events')}
//           goToProfile={goToProfile}
//           currentPage="landing"
//         />
//       ) : (
//         <Sidebar goToEvents={goToEvents} goToLogin={goToLogin} goToLanding={goToLanding} role={role} goToProfile={goToProfile} goToTasks={goToTasks} goToMembers={goToMembers} currentPage="landing" />
//       )}
//       <main className="content-area" id="mainContentScroll">
//         <div id="top">
//           <Topbar goToLogin={goToLogin} role={role} onLogout={handleLogoutClick} goToSignUp={goToSignUp} />
//         </div>
//         <Hero darkMode={darkMode} key={path + location.key} />
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

import React, { useEffect, useLayoutEffect, useReducer, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './clubpilot.css';
import AdminDashboard from './Admin/AdminDashboard';
import { AdminProvider } from './Admin/AdminContext';
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
import { useTheme } from './ThemeContext'; 
import { eventsReducer, initialEventsState } from './eventsReducer';

const PROTECTED_PATHS = [
  '/events', '/tasks', '/members', '/analytics', '/profile',
  '/member/dashboard', '/member/club', '/member/tasks', '/member/events', '/admin',
];

const isProtectedPath = (p) =>
  /^\/events\/\d+$/.test(p) || PROTECTED_PATHS.includes(p);

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  
  const { darkMode } = useTheme();

  const [role, setRole] = useState(() => sessionStorage.getItem('userRole') || null);
  const [currentMemberId, setCurrentMemberId] = useState(() => {
    const v = sessionStorage.getItem('currentMemberId');
    return v || null;
  });

  const [logoutModal, setLogoutModal] = useState(false);

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const [events, dispatch] = useReducer(eventsReducer, null, () => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : initialEventsState;
  });

  const setEvents = (updater) => {
    const nextEvents = typeof updater === 'function' ? updater(events) : updater;
    dispatch({ type: 'SET_EVENTS', payload: nextEvents });
  };

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    const updateStatuses = () => {
      const now = new Date();
      const next = events.map(event => {
        if (event.status === 'cancelled') return event;
        const [startStr, endStr] = (event.time || '').split(' - ');
        if (!event.date || !startStr || !endStr) return event;
        const start = new Date(`${event.date}T${startStr}:00`);
        const end = new Date(`${event.date}T${endStr}:00`);
        let newStatus = event.status;
        if (now >= start && now < end) newStatus = 'ongoing';
        else if (now >= end) newStatus = 'completed';
        else if (now < start) newStatus = 'upcoming';
        if (newStatus !== event.status) {
          return { ...event, status: newStatus };
        }
        return event;
      });
      
      const hasChanged = next.some((e, i) => e.status !== events[i].status);
      if (hasChanged) {
        dispatch({ type: 'SET_EVENTS', payload: next });
      }
    };

    const t = setInterval(updateStatuses, 30000);
    return () => clearInterval(t);
  }, [events]);

  const isEventDetail = /^\/events\/\d+$/.test(path);
  const selectedEventId = isEventDetail ? Number(path.split('/')[2]) : null;

  useEffect(() => {
    if (isProtectedPath(path) && !role) {
      navigate('/login', { replace: true });
      return;
    }
    if (path === '/admin' && role && role.toLowerCase() !== 'admin') {
      navigate('/', { replace: true });
    }
  }, [path, role, navigate]);

  useLayoutEffect(() => {
    let animId;
    animId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        AOS.init({ once: false, mirror: true, duration: 600, easing: 'ease-out' });
        AOS.refresh();
      });
    });
    const sc = document.getElementById('mainContentScroll');
    const onScroll = () => AOS.refresh();
    if (sc) sc.addEventListener('scroll', onScroll);
    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (sc) sc.removeEventListener('scroll', onScroll);
    };
  }, [path, location.key]);

  const goToLanding = () => navigate('/');
  const goToLogin = () => navigate('/login');
  const goToSignUp = () => navigate('/signup');
  const goToProfile = () => navigate('/profile');
  const goToTasks = () => navigate('/tasks');
  const goToMembers = () => navigate('/members');
  const goToEvents = () => navigate('/events');
  const goToAnalytics = () => navigate('/analytics');
  const goToEventDetail = (id) => navigate(`/events/${id}`);
  const goToAdmin = () => navigate('/admin');

  const handleSignUp = (userRole) => {
    setRole(userRole);
    sessionStorage.setItem('userRole', userRole);
    navigate('/');
  };

  const handleLogin = (userRole, memberId = null) => {
    setRole(userRole);
    sessionStorage.setItem('userRole', userRole);
    const finalId = (memberId !== null && memberId !== undefined && memberId !== '')
      ? memberId
      : `${userRole}_${Date.now()}`;
    setCurrentMemberId(finalId);
    sessionStorage.setItem('currentMemberId', String(finalId));
    navigate('/', { replace: true });
  };

  const handleLogoutClick = () => setLogoutModal(true);
  
  const confirmLogout = () => {
    setLogoutModal(false);
    setTimeout(() => {
      setRole(null);
      setCurrentMemberId(null);
      sessionStorage.removeItem('userRole');
      sessionStorage.removeItem('currentMemberId');
      navigate('/', { replace: true });
    }, 300);
  };



  if (path === '/login') {
    return <LoginPage onLogin={handleLogin} goToSignUp={goToSignUp} />;
  }

  if (path === '/signup') {
    return <SignUpPage onSignUp={handleSignUp} goToLogin={goToLogin} />;
  }

 
if (path === '/admin') {
  if (role?.toLowerCase() === 'admin') {
    return (
      <AdminProvider>
        <AdminDashboard onLogout={confirmLogout} />
      </AdminProvider>
    );
  }
  return null;
}

  if (path === '/events') {
    return (
      <div className={darkMode ? "main-layout dark" : "main-layout"}>
        <EventSidebar 
          goToLanding={goToLanding} 
          goToProfile={goToProfile} 
          role={role} 
          goToLogin={goToLogin} 
          goToTasks={goToTasks} 
          goToMembers={goToMembers} 
          goToAdmin={goToAdmin} 
        />
        <div className="content-area" style={{ paddingTop: '0px' }}>
          <EventPage 
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

  if (isEventDetail) {
    const selectedEvent = events.find(e => e.id === selectedEventId);
    return (
      <div className={darkMode ? "main-layout dark" : "main-layout"}>
        <EventSidebar 
          goToLanding={goToLanding} 
          goToProfile={goToProfile} 
          role={role} 
          goToLogin={goToLogin} 
          goToTasks={goToTasks} 
          goToMembers={goToMembers} 
          goToAdmin={goToAdmin} 
        />
        <div className="content-area" style={{ paddingTop: '0px' }}>
          <EventDetailPage 
            event={selectedEvent} 
            onBack={goToEvents} 
            role={role} 
            setEvents={setEvents} 
            currentMemberId={currentMemberId} 
          />
        </div>
      </div>
    );
  }

  if (path === '/analytics') {
    return (
      <div className={darkMode ? "main-layout dark" : "main-layout"}>
        <EventSidebar 
          goToLanding={goToLanding} 
          goToProfile={goToProfile} 
          role={role} 
          goToLogin={goToLogin} 
          goToTasks={goToTasks} 
          goToMembers={goToMembers} 
          goToAdmin={goToAdmin} 
        />
        <div className="content-area" style={{ paddingTop: '0px' }}>
          <Analytics role={role} events={events} onBack={goToEvents} />
        </div>
      </div>
    );
  }

  if (['/member/dashboard', '/member/club', '/member/tasks', '/member/events'].includes(path)) {
    const tab =
      path === '/member/dashboard' ? 'hub' :
      path === '/member/club' ? 'club' :
      path === '/member/events' ? 'events' : 'tasks';
    return (
      <MemberPage
        currentMemberId={currentMemberId}
        tasks={tasks} setTasks={setTasks}
        events={events} 
        setEvents={setEvents} 
        role={role}
        initialTab={tab}
        goToLanding={goToLanding}
        goToProfile={goToProfile}
      />
    );
  }

  if (path === '/profile') {
    if (!role) return null;
    return <ProfilePage role={role} goToLanding={goToLanding} />;
  }

  if (path === '/tasks') {
    return (
      <div className={darkMode ? "main-layout dark" : "main-layout"}>
        <TaskSidebar 
          goToLanding={goToLanding} 
          goToProfile={goToProfile} 
          role={role} 
          goToLogin={goToLogin} 
          goToEvents={goToEvents} 
          goToMembers={goToMembers} 
          goToAdmin={goToAdmin} 
        />
        <div className="content-area" style={{ paddingTop: '0px' }}>
          <TaskPage role={role} tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    );
  }

  if (path === '/members') {
    return (
      <div className={darkMode ? "main-layout dark" : "main-layout"}>
        <Sidebar 
          goToEvents={goToEvents} 
          goToLogin={goToLogin} 
          goToLanding={goToLanding} 
          role={role} 
          goToProfile={goToProfile} 
          goToTasks={goToTasks} 
          goToMembers={goToMembers} 
          currentPage="members" 
          goToAdmin={goToAdmin} 
        />
        <div className="content-area" style={{ paddingTop: '0px' }}>
          <MembersDashboard />
        </div>
      </div>
    );
  }


  return (
    <div className={darkMode ? "main-layout dark" : "main-layout"}>
      {!role ? (
        <GuestSidebar goToLogin={goToLogin} goToMembers={goToMembers} />
      ) : role === 'core-member' ? (
        <MemberSidebar
          goToHome={goToLanding}
          goToCoreMember={() => navigate('/member/dashboard')}
          goToCoreClub={() => navigate('/member/club')}
          goToTasks={() => navigate('/member/tasks')}
          goToEvents={() => navigate('/member/events')}
          goToProfile={goToProfile}
          currentPage="landing"
        />
      ) : (
        <Sidebar 
          goToEvents={goToEvents} 
          goToLogin={goToLogin} 
          goToLanding={goToLanding} 
          role={role} 
          goToProfile={goToProfile} 
          goToTasks={goToTasks} 
          goToMembers={goToMembers} 
          currentPage="landing" 
          goToAdmin={goToAdmin} 
        />
      )}
      <main className="content-area" id="mainContentScroll">
        <div id="top">
          <Topbar goToLogin={goToLogin} role={role} onLogout={handleLogoutClick} goToSignUp={goToSignUp} />
        </div>
        <Hero darkMode={darkMode} key={path + location.key} />
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
              <button className="btn-confirm-cancel" onClick={() => setLogoutModal(false)}>Cancel</button>
              <button className="btn-confirm-yes" onClick={confirmLogout}>Yes, Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;