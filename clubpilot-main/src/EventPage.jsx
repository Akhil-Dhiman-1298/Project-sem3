import React, { useState } from 'react';
import './EventPage.css';

function EventPage({ darkMode, role,events,setEvents }) {
  

  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  const categories = ['all', ...new Set(events.map(event => event.category))];

  const filteredEvents = events.filter(event => {
    const statusMatch = statusFilter === 'all' || event.status === statusFilter;
    const categoryMatch = categoryFilter === 'all' || event.category === categoryFilter;
    const searchMatch = searchTerm === '' ||
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && categoryMatch && searchMatch;
  });

  const totalEvents = events.length;
  const upcomingCount = events.filter(e => e.status === 'upcoming').length;
  const ongoingCount = events.filter(e => e.status === 'ongoing').length;
  const completedCount = events.filter(e => e.status === 'completed').length;

  const deleteEvent = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

const handleParticipate = (id) => {

  const event = events.find(e => e.id === id);

  if (!event) return;
  if (event.participantNames && event.participantNames.includes('user')) {
    alert('You have already participated in this event!');
    return;
  }

  if (!window.confirm('Do you want to participate in this event?')) {
    return;
  }


  setEvents(events.map(event => {
    if (event.id === id) {
      if (event.participants >= event.capacity) {
        alert('Event is full! No more participants allowed.');
        return event;
      }

      return {
        ...event,
        participants: event.participants + 1,
        participantNames: [...(event.participantNames || []), 'user']  
      };
    }
    return event;
  }));
};


 const updateStatus = (id, newStatus) => {
  let message = '';
  let confirmText = '';

  if (newStatus === 'completed') {
    message = ' Are you sure you want to mark this event as COMPLETED?';
    confirmText = 'Yes, Complete it!';
  } else if (newStatus === 'cancelled') {
    message = ' Are you sure you want to CANCEL this event?';
    confirmText = 'Yes, Cancel it!';
  } else {
    message = `Are you sure you want to change status to "${newStatus}"?`;
    confirmText = 'Yes';
  }

  if (window.confirm(message)) {
    setEvents(events.map(event => 
      event.id === id ? { ...event, status: newStatus } : event
    ));
  }
};

const [newEvent, setNewEvent] = useState({
  title: '',
  date: '',
  startTime: '',   
  endTime: '',     
  venue: '',
  description: '',
  status: 'upcoming',
  category: 'tech',
  capacity: 50,
  participants: 0
});

const convertToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + (minutes || 0);
};

const getTimeRange = (timeStr) => {
  if (!timeStr || !timeStr.includes(' - ')) {
    return { start: 0, end: 0 };
  }

  const [start, end] = timeStr.split(' - ');
  return {
    start: convertToMinutes(start.trim()),
    end: convertToMinutes(end.trim())
  };
};

const isOverlapping = (time1, time2) => {
  const t1 = getTimeRange(time1);
  const t2 = getTimeRange(time2);
  return t1.start < t2.end && t2.start < t1.end;
};

  const handleAddEvent = (e) => {
    e.preventDefault();
      const combinedTime = `${newEvent.startTime} - ${newEvent.endTime}`;

      const isClashing = events.some(event => 
        event.date === newEvent.date && 
        isOverlapping(event.time, combinedTime) && 
        event.venue.toLowerCase() === newEvent.venue.toLowerCase()
      );

      if (isClashing) {
        alert('This time slot is already booked! Please choose another date or time.');
        return;
      }

      const newEventData = {
        id: events.length + 1,
        ...newEvent,
        time: combinedTime,  
        capacity: newEvent.capacity || 50,
        participants: 0,
        icon: '📌'
      };

    setEvents([...events, newEventData]);
    setShowForm(false);
    setNewEvent({
      title: '',
      date: '',
      startTime: '',   
      endTime: '',     
      venue: '',
      description: '',
      status: 'upcoming',
      category: 'tech',
      capacity: 50,      
      participants: 0    
    });
  };

  return (
    <div className={`event-page ${darkMode ? 'dark-mode' : ''}`}>
      <div className="event-header">
        <div className="event-header-left">
          <h2>Events</h2>
          <p>Manage all your club events in one place.</p>
        </div>

        {role === 'admin'||role==='leader' ? (
          <button className="create-btn" onClick={() => setShowForm(true)}>
            <i className="fas fa-plus"></i> Create New Event
          </button>
        ) : (
          <button className="create-btn disabled" disabled>
            <i className="fas fa-lock"></i> Only Admin Can Create
          </button>
        )}
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-modal">
            <div className="form-header">
              <h2>Create New Event</h2>
              <button className="form-close" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <form onSubmit={handleAddEvent}>
              <div className="form-group">
                <label>Event Title</label>
                <input
                  type="text"
                  placeholder="Enter event title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Start Time</label>
                    <input
                      type="time"
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>End Time</label>
                    <input
                      type="time"
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Venue</label>
                <input
                  type="text"
                  placeholder="Enter venue"
                  value={newEvent.venue}
                  onChange={(e) => setNewEvent({...newEvent, venue: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  placeholder="Enter event description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={newEvent.status}
                    onChange={(e) => setNewEvent({...newEvent, status: e.target.value})}
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                  >
                    <option value="tech">Tech</option>
                    <option value="cultural">Cultural</option>
                    <option value="sports">Sports</option>
                    <option value="workshop">Workshop</option>
                    <option value="social">Social</option>
                    <option value="academic">Academic</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Event Capacity</label>
                <input
                  type="number"
                  placeholder="Max participants (e.g., 50)"
                  value={newEvent.capacity}
                  onChange={(e) => setNewEvent({...newEvent, capacity: Number(e.target.value)})}
                  required
                  min="1"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn-submit">Create Event</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Search events by title, category, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <span className="search-results">{filteredEvents.length} events found</span>
      </div>

      <div className="event-stats">
        <div className="stat-card">
          <span className="stat-number">{totalEvents}</span>
          <span className="stat-label">Total Events</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{upcomingCount}</span>
          <span className="stat-label">Upcoming</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{ongoingCount}</span>
          <span className="stat-label">Ongoing</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{completedCount}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Status:</label>
          <div className="filter-buttons">
            <button className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`} onClick={() => setStatusFilter('all')}>All</button>
            <button className={`filter-btn ${statusFilter === 'upcoming' ? 'active' : ''}`} onClick={() => setStatusFilter('upcoming')}>Upcoming</button>
            <button className={`filter-btn ${statusFilter === 'ongoing' ? 'active' : ''}`} onClick={() => setStatusFilter('ongoing')}>Ongoing</button>
            <button className={`filter-btn ${statusFilter === 'completed' ? 'active' : ''}`} onClick={() => setStatusFilter('completed')}>Completed</button>
            <button className={`filter-btn ${statusFilter === 'cancelled' ? 'active' : ''}`} onClick={() => setStatusFilter('cancelled')}>Cancelled</button>
          </div>
        </div>
        <div className="filter-group">
          <label>Category:</label>
          <div className="filter-buttons">
            <button className={`filter-btn ${categoryFilter === 'all' ? 'active' : ''}`} onClick={() => setCategoryFilter('all')}>All Categories</button>
            {categories.map((category) => (
              category !== 'all' && (
                <button key={category} className={`filter-btn ${categoryFilter === category ? 'active' : ''}`} onClick={() => setCategoryFilter(category)}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              )
            ))}
          </div>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📭</span>
          <h3>No Events Found</h3>
          <p>Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="events-grid">
          {filteredEvents.map((event) => (
            <div key={event.id} className={`event-card category-${event.category}`}>
              <div className="event-body">
                <div className="event-top">
                  <span className="event-icon">{event.icon}</span>
                  <span className={`event-status-badge ${event.status}`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </div>

                <h3>{event.title}</h3>
                <p className="event-desc">{event.description}</p>

                <span className="event-category-tag">
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </span>

                <div className="event-meta">
                  <span className="meta-item">
                    <i className="fa-regular fa-calendar"></i> {event.date}
                  </span>
                  <span className="meta-item">
                    <i className="fa-regular fa-clock"></i> {event.time}
                  </span>
                  <span className="meta-item">
                    <i className="fa-solid fa-location-dot"></i> {event.venue}
                  </span>

                    <span className="meta-item">
                      <i className="fa-solid fa-users"></i> {event.participants} / {event.capacity}
                    </span>
                </div>

                <div className="event-footer">
                    {role === 'user' && 
                      event.status === 'upcoming' && 
                      event.participants < event.capacity &&
                      !event.participantNames?.includes('user') && (
                        <button 
                          className="status-btn participate-btn" 
                          onClick={() => handleParticipate(event.id)}
                        >
                          <i className="fa-solid fa-user-plus"></i> Participate
                        </button>
                      )}

                      {role === 'user' && event.participantNames?.includes('user') && (
                        <span className="already-participated"> Already Participated</span>
                      )}

                  {role === 'user' && event.status === 'upcoming' && event.participants >= event.capacity && (
                    <span className="full-badge">🔴 Full</span>
                  )}

                  {role === 'admin' || role === 'leader' ? (
                    <div className="event-actions">
                      {event.status !== 'completed' && (
                        <button 
                          className="status-btn complete-btn" 
                          onClick={() => updateStatus(event.id, 'completed')}
                        >
                           Mark as Completed
                        </button>
                      )}
                      
                      {event.status !== 'cancelled' && event.status !== 'completed' && (
                        <button 
                          className="status-btn cancel-btn" 
                          onClick={() => updateStatus(event.id, 'cancelled')}
                        >
                           Cancel
                        </button>
                      )}

                      {role === 'admin' && (
                        <button className="delete-btn" onClick={() => {
                          if (window.confirm(' Are you sure you want to DELETE this event?')) {
                            deleteEvent(event.id);
                          }
                        }}>
                           Delete
                        </button>
                      )}
                    </div>
                  ) : (
                    <span className="event-id">ID: EV-{String(event.id).padStart(3, '0')}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventPage;