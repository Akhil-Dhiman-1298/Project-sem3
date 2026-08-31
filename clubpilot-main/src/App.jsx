import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './clubpilot.css';

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

function App() {

  const handleLogin = (userRole) => {
    setRole(userRole);
    localStorage.setItem('userRole', userRole);
    setCurrentPage('landing');
  };


  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );
  const [currentPage, setCurrentPage] = useState('landing');
  const [role, setRole] = useState(null);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);


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
      time: '10:00 AM - 1:00 PM',
      venue: 'Room 101, Main Building',
      description: 'Join us for an exciting tech meetup with industry experts.',
      status: 'upcoming',
      category: 'tech',
      icon: '💻'
    },
    {
      id: 2,
      title: 'Annual Cultural Fest',
      date: '2026-09-05',
      time: '2:00 PM - 5:00 PM',
      venue: 'Seminar Hall',
      description: 'Plan the biggest cultural fest of the year.',
      status: 'upcoming',
      category: 'cultural',
      icon: '🎭'
    },
    {
      id: 3,
      title: 'Football Tournament',
      date: '2026-08-20',
      time: '8:00 AM - 6:00 PM',
      venue: 'Sports Ground',
      description: 'Inter-college football tournament with 8 teams.',
      status: 'ongoing',
      category: 'sports',
      icon: '⚽'
    },
    {
      id: 4,
      title: 'UI/UX Design Workshop',
      date: '2026-08-15',
      time: '11:00 AM - 3:00 PM',
      venue: 'Design Studio',
      description: 'Learn the basics of UI/UX design.',
      status: 'completed',
      category: 'workshop',
      icon: '📚'
    },
    {
      id: 5,
      title: 'Club Orientation Day',
      date: '2026-07-28',
      time: '9:00 AM - 12:00 PM',
      venue: 'Auditorium',
      description: 'Welcome new members to the club.',
      status: 'completed',
      category: 'social',
      icon: '🎉'
    },
    {
      id: 6,
      title: 'Guest Lecture: AI & ML',
      date: '2026-09-10',
      time: '3:00 PM - 5:00 PM',
      venue: 'Lecture Hall 2',
      description: 'Guest lecture on Artificial Intelligence.',
      status: 'upcoming',
      category: 'academic',
      icon: '🤖'
    },
    {
      id: 7,
      title: 'Dance Competition',
      date: '2026-08-10',
      time: '6:00 PM - 9:00 PM',
      venue: 'Auditorium',
      description: 'Inter-club dance competition.',
      status: 'cancelled',
      category: 'cultural',
      icon: '💃'
    },
    {
      id: 8,
      title: 'Coding Hackathon',
      date: '2026-09-15',
      time: '9:00 AM - 9:00 PM',
      venue: 'Computer Lab',
      description: '24-hour coding hackathon.',
      status: 'upcoming',
      category: 'tech',
      icon: '⌨️'
    }
  ];
});

  useEffect(() => {
  localStorage.setItem('events', JSON.stringify(events));
}, [events]);


  const initAOS = () => {
    AOS.init({
      once: false,
      mirror: true,
      duration: 600,
      easing: 'ease-out'
    });
    AOS.refresh();
  };  //AOS.refresh() DOM ko dobara scan karta hai aur har element ki nayi position calculate karta hai, taaki scroll ke hisaab se sahi element pe animation trigger ho."


  useEffect(() => {
    if (currentPage === 'landing') {
      initAOS();

      const scrollContainer = document.getElementById('mainContentScroll');
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', () => AOS.refresh());
      }

      return () => {
        if (scrollContainer) {
          scrollContainer.removeEventListener('scroll', () => AOS.refresh());
        }
      };
    }
  }, [currentPage]);



  const goToEvents = () => setCurrentPage('events');
  const goToLanding = () => setCurrentPage('landing');
  const goToLogin = () => setCurrentPage('login');


  if (currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} />; 
  }


  if (currentPage === 'events') {
    return (
      <div className={darkMode ? "main-layout dark" : "main-layout"}>
        <EventSidebar darkMode={darkMode} goToLanding={goToLanding} />
        <div className="content-area" style={{ paddingTop: '0px' }}>
          <EventPage darkMode={darkMode} role={role} events={events} setEvents={setEvents}/>
        </div>
      </div>
    );
  }


  return (
    <div className={darkMode ? "main-layout dark" : "main-layout"}>
      <Sidebar darkMode={darkMode} goToEvents={goToEvents} goToLogin={goToLogin}   />
      <main className="content-area" id="mainContentScroll">
        <Topbar 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          goToLogin={goToLogin}
        />
        <Hero darkMode={darkMode} />
        <Features />
        <Steps />
        <About />
        <BottomCTA />
        <Footer />
      </main>
    </div>
  );
}

export default App;