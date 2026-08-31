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
    time: '',
    venue: '',
    description: '',
    status: 'upcoming',
    category: 'tech'
  });

  const handleAddEvent = (e) => {
    e.preventDefault();
    const isClashing = events.some(event => 
      event.date === newEvent.date && 
      (event.time === newEvent.time || 
      event.time.toLowerCase() === newEvent.time.toLowerCase()) && 
      (event.venue === newEvent.venue || 
      event.venue.toLowerCase() === newEvent.venue.toLowerCase())
    );

    if (isClashing) {
    alert('This time slot is already booked! Please choose another date or time.');
    return;
    }

    const newEventData = {
      id: events.length + 1,
      ...newEvent,
      icon: '📌'
    };
    setEvents([...events, newEventData]);
    setShowForm(false);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      venue: '',
      description: '',
      status: 'upcoming',
      category: 'tech'
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
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="text"
                    placeholder="10:00 AM - 1:00 PM"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    required
                  />
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
                </div>

                <div className="event-footer">
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