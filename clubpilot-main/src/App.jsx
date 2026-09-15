import React, { useEffect, useState } from 'react';
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
import LoginPage from './LoginPage';
import GuestSidebar from './GuestSidebar';
import SignUpPage from './SignUpPage';
import TaskPage from './TaskPage';
import TaskSidebar from './TaskSidebar';
import MembersDashboard from './Members/pages/MembersDashboard';
import MemberSidebar from './MemberSidebar';
import './Members/Members.css';
import MemberPage from './MemberPage';

function App() {

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );
  // const [currentPage, setCurrentPage] = useState('landing');
  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem("currentPage") || "landing";
});

  // const [role, setRole] = useState(null);
  const [role, setRole] = useState(() => {
    return localStorage.getItem("userRole");
});
  const [currentMemberId, setCurrentMemberId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [logoutModal, setLogoutModal] = useState(false);
useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
}, [currentPage]);
  // ---- Navigation ----
  const goToProfile = () => setCurrentPage('profile');
  const goToSignUp = () => setCurrentPage('signup');
  const goToTasks = () => setCurrentPage('tasks');
  const goToMembers = () => setCurrentPage('members');
  const goToEvents = () => setCurrentPage('events');
  const goToLanding = () => setCurrentPage('landing');
  const goToLogin = () => setCurrentPage('login');

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
      {
        id: 1,
        title: 'Tech Meetup 2026',
        date: '2026-08-25',
        time: '10:00 - 13:00',
        venue: 'Room 101, Main Building',
        description: 'Join us for an exciting tech meetup with industry experts.',
        status: 'upcoming',
        category: 'tech',
        icon: '💻',
        capacity: 50,
        participants: 20,
        participantNames: []
      },
      {
        id: 2,
        title: 'Annual Cultural Fest',
        date: '2026-09-05',
        time: '14:00 - 17:00',
        venue: 'Seminar Hall',
        description: 'Plan the biggest cultural fest of the year.',
        status: 'upcoming',
        category: 'cultural',
        icon: '🎭',
        capacity: 50,
        participants: 33,
        participantNames: []
      },
      {
        id: 3,
        title: 'Football Tournament',
        date: '2026-08-20',
        time: '08:00 - 18:00',
        venue: 'Sports Ground',
        description: 'Inter-college football tournament with 8 teams.',
        status: 'ongoing',
        category: 'sports',
        icon: '⚽',
        capacity: 50,
        participants: 10,
        participantNames: []
      },
      {
        id: 4,
        title: 'UI/UX Design Workshop',
        date: '2026-08-15',
        time: '11:00 - 15:00',
        venue: 'Design Studio',
        description: 'Learn the basics of UI/UX design.',
        status: 'completed',
        category: 'workshop',
        icon: '📚',
        capacity: 50,
        participants: 37,
        participantNames: []
      },
      {
        id: 5,
        title: 'Club Orientation Day',
        date: '2026-07-28',
        time: '09:00 - 12:00',
        venue: 'Auditorium',
        description: 'Welcome new members to the club.',
        status: 'completed',
        category: 'social',
        icon: '🎉',
        capacity: 50,
        participants: 26,
        participantNames: []
      },
      {
        id: 6,
        title: 'Guest Lecture: AI & ML',
        date: '2026-09-10',
        time: '15:00 - 17:00',
        venue: 'Lecture Hall 2',
        description: 'Guest lecture on Artificial Intelligence.',
        status: 'upcoming',
        category: 'academic',
        icon: '🤖',
        capacity: 50,
        participants: 29,
        participantNames: []
      },
      {
        id: 7,
        title: 'Dance Competition',
        date: '2026-08-10',
        time: '18:00 - 21:00',
        venue: 'Auditorium',
        description: 'Inter-club dance competition.',
        status: 'cancelled',
        category: 'cultural',
        icon: '💃',
        capacity: 50,
        participants: 8,
        participantNames: []
      },
      {
        id: 8,
        title: 'Coding Hackathon',
        date: '2026-09-15',
        time: '09:00 - 21:00',
        venue: 'Computer Lab',
        description: '24-hour coding hackathon.',
        status: 'upcoming',
        category: 'tech',
        icon: '⌨️',
        capacity: 50,
        participants: 40,
        participantNames: []
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  // ---- AOS ----
  const initAOS = () => {
    AOS.init({
      once: false,
      mirror: true,
      duration: 600,
      easing: 'ease-out'
    });
    AOS.refresh();
  };

  useEffect(() => {
    if (currentPage === 'landing') {
      initAOS();

      const scrollContainer = document.getElementById('mainContentScroll');
      const onScroll = () => AOS.refresh();

      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', onScroll);
      }

      return () => {
        if (scrollContainer) {
          scrollContainer.removeEventListener('scroll', onScroll);
        }
      };
    }
  }, [currentPage]);

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
          <EventPage darkMode={darkMode} role={role} events={events} setEvents={setEvents} />
        </div>
      </div>
    );
  }

  if (['core-member', 'core-club', 'member-tasks'].includes(currentPage)) {
    const tab =
      currentPage === 'core-member' ? 'hub' :
      currentPage === 'core-club' ? 'club' : 'tasks';

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
          <TaskPage darkMode={darkMode} role={role} />
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

  // ---- Landing (default) ----
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
          goToEvents={goToEvents}
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
        <Topbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          goToLogin={goToLogin}
          role={role}
          onLogout={handleLogoutClick}
          goToSignUp={goToSignUp}
        />
        <Hero darkMode={darkMode} />
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