// // // import React, { useState, useRef, useEffect } from 'react';
// // // import './EventPage.css';
// // // import { useTheme } from './ThemeContext';
// // // function EventPage({ role, events, setEvents, onEventClick, currentMemberId, goToAnalytics }) {
// // //   const { darkMode } = useTheme();
// // //   const [statusFilter, setStatusFilter] = useState('all');
// // //   const [categoryFilter, setCategoryFilter] = useState('all');
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [showForm, setShowForm] = useState(false);

// // //   const [onlyMine, setOnlyMine] = useState(false);
// // //   const [sortBy, setSortBy] = useState('default');

// // //   const [viewMode, setViewMode] = useState('list');
// // //   const [currentMonth, setCurrentMonth] = useState(new Date());
// // //   const [selectedDate, setSelectedDate] = useState(null);

// // //   const searchInputRef = useRef(null);
// // //   const titleRef = useRef(null);

// // //   useEffect(() => {
// // //     searchInputRef.current?.focus();
// // //   }, []);

// // //   useEffect(() => {
// // //     if (showForm) {
// // //       setTimeout(() => {
// // //         titleRef.current?.focus();
// // //       }, 100);
// // //     }
// // //   }, [showForm]);

// // //   const [confirmModal, setConfirmModal] = useState(false);
// // //   const [participatingEventId, setParticipatingEventId] = useState(null);

// // //   const [cancelModal, setCancelModal] = useState(false);
// // //   const [cancellingEventId, setCancellingEventId] = useState(null);

// // //   const [actionModal, setActionModal] = useState(false);
// // //   const [actionEventId, setActionEventId] = useState(null);
// // //   const [actionType, setActionType] = useState('');

// // //   const [isAlertVisible, setIsAlertVisible] = useState(false);
// // //   const [alertText, setAlertText] = useState('');
// // //   const [alertHeading, setAlertHeading] = useState('');

// // //   const [showEditForm, setShowEditForm] = useState(false);
// // //   const [editEvent, setEditEvent] = useState(null);

// // //   const [selectedIds, setSelectedIds] = useState([]);
// // //   const [bulkActionModal, setBulkActionModal] = useState(false);
// // //   const [bulkActionType, setBulkActionType] = useState('');
// // //   const [bulkStatus, setBulkStatus] = useState('upcoming');
// // //   const [bulkCategory, setBulkCategory] = useState('tech');

// // //   const userId = (() => {
// // //     const mid = currentMemberId ?? sessionStorage.getItem('currentMemberId');
// // //     if (mid && role) return `${role}_${mid}`;
// // //     if (role) {
// // //       let sid = sessionStorage.getItem('__uid');
// // //       if (!sid) {
// // //         sid = String(Date.now());
// // //         sessionStorage.setItem('__uid', sid);
// // //       }
// // //       return `${role}_${sid}`;
// // //     }
// // //     return null;
// // //   })();

// // //   const categories = ['all', ...new Set(events.map(event => event.category))];

// // //   const filteredEvents = events.filter(event => {
// // //     const statusMatch = statusFilter === 'all' || event.status === statusFilter;
// // //     const categoryMatch = categoryFilter === 'all' || event.category === categoryFilter;
// // //     const searchMatch = searchTerm === '' ||
// // //       event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       event.description.toLowerCase().includes(searchTerm.toLowerCase());

// // //     const mineMatch =
// // //       !onlyMine ||
// // //       (userId && (event.participantNames || []).includes(userId));

// // //     return statusMatch && categoryMatch && searchMatch && mineMatch;
// // //   });

// // //   const sortedEvents = [...filteredEvents].sort((a, b) => {
// // //     if (sortBy === 'date-asc') {
// // //       return new Date(`${a.date}T${(a.time || '').split(' - ')[0] || '00:00'}`)
// // //            - new Date(`${b.date}T${(b.time || '').split(' - ')[0] || '00:00'}`);
// // //     }
// // //     if (sortBy === 'date-desc') {
// // //       return new Date(`${b.date}T${(b.time || '').split(' - ')[0] || '00:00'}`)
// // //            - new Date(`${a.date}T${(a.time || '').split(' - ')[0] || '00:00'}`);
// // //     }
// // //     if (sortBy === 'popular') {
// // //       return (b.participants || 0) - (a.participants || 0);
// // //     }
// // //     if (sortBy === 'upcoming-first') {
// // //       const order = { upcoming: 0, ongoing: 1, completed: 2, cancelled: 3 };
// // //       return (order[a.status] ?? 9) - (order[b.status] ?? 9);
// // //     }
// // //     return 0;
// // //   });

// // //   const totalEvents = events.length;
// // //   const upcomingCount = events.filter(e => e.status === 'upcoming').length;
// // //   const ongoingCount = events.filter(e => e.status === 'ongoing').length;
// // //   const completedCount = events.filter(e => e.status === 'completed').length;

// // //   const monthNames = [
// // //     'January', 'February', 'March', 'April', 'May', 'June',
// // //     'July', 'August', 'September', 'October', 'November', 'December'
// // //   ];
// // //   const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// // //   const getDaysInMonth = (date) => {
// // //     const year = date.getFullYear();
// // //     const month = date.getMonth();
// // //     const firstDay = new Date(year, month, 1).getDay();
// // //     const daysInMonth = new Date(year, month + 1, 0).getDate();

// // //     const days = [];
// // //     for (let i = 0; i < firstDay; i++) days.push(null);
// // //     for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));
// // //     return days;
// // //   };

// // //   const getEventsForDate = (date) => {
// // //     if (!date) return [];
// // //     const year = date.getFullYear();
// // //     const month = String(date.getMonth() + 1).padStart(2, '0');
// // //     const day = String(date.getDate()).padStart(2, '0');
// // //     const dateStr = `${year}-${month}-${day}`;
// // //     return sortedEvents.filter(e => e.date === dateStr);
// // //   };

// // //   const prevMonth = () => {
// // //     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
// // //     setSelectedDate(null);
// // //   };

// // //   const nextMonth = () => {
// // //     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
// // //     setSelectedDate(null);
// // //   };

// // //   const deleteEvent = (id) => {
// // //     setEvents(events.filter(event => event.id !== id));
// // //   };

// // //   const handleParticipate = (id) => {
// // //     const event = events.find(e => e.id === id);
// // //     if (!event) return;
// // //     if (!userId) {
// // //       showAlert('Please login to participate.', 'Login Required');
// // //       return;
// // //     }

// // //     if ((event.participantNames || []).includes(userId)) {
// // //       showAlert('You have already participated in this event!', 'Already Participated');
// // //       return;
// // //     }

// // //     if ((event.participants || 0) >= (event.capacity || 0)) {
// // //       showAlert('Event is full! No more participants allowed.', 'Event Full');
// // //       return;
// // //     }

// // //     setParticipatingEventId(id);
// // //     setConfirmModal(true);
// // //   };

// // //   const confirmParticipation = () => {
// // //     const id = participatingEventId;
// // //     const event = events.find(e => e.id === id);
// // //     if (!event) return;
// // //     if (!userId) return;

// // //     if ((event.participants || 0) >= (event.capacity || 0)) {
// // //       showAlert('Event is full! No more participants allowed.', 'Event Full');
// // //       setConfirmModal(false);
// // //       setParticipatingEventId(null);
// // //       return;
// // //     }

// // //     setEvents(events.map(ev => {
// // //       if (ev.id === id) {
// // //         return {
// // //           ...ev,
// // //           participants: (ev.participants || 0) + 1,
// // //           participantNames: [...(ev.participantNames || []), userId]
// // //         };
// // //       }
// // //       return ev;
// // //     }));

// // //     setConfirmModal(false);
// // //     setParticipatingEventId(null);
// // //     showAlert('You have successfully participated in this event!', 'Participated 🎉');
// // //   };

// // //   const handleCancelClick = (id) => {
// // //     const event = events.find(e => e.id === id);
// // //     if (!event) return;
// // //     if (!userId) return;
// // //     if (!(event.participantNames || []).includes(userId)) return;
// // //     if (event.status === 'ongoing') {
// // //       showAlert('Ongoing event se cancel nahi kar sakte.', 'Cannot Cancel');
// // //       return;
// // //     }
// // //     setCancellingEventId(id);
// // //     setCancelModal(true);
// // //   };

// // //   const confirmCancel = () => {
// // //     const id = cancellingEventId;
// // //     if (!id || !userId) return;

// // //     setEvents(events.map(e => {
// // //       if (e.id !== id) return e;
// // //       return {
// // //         ...e,
// // //         participants: Math.max(0, (e.participants || 0) - 1),
// // //         participantNames: (e.participantNames || []).filter(n => n !== userId),
// // //         attendedBy: (e.attendedBy || []).filter(n => n !== userId),
// // //         pendingAttendance: (e.pendingAttendance || []).filter(n => n !== userId),
// // //         rejectedBy: (e.rejectedBy || []).filter(n => n !== userId)
// // //       };
// // //     }));

// // //     setCancelModal(false);
// // //     setCancellingEventId(null);
// // //     showAlert('Participation cancelled.', 'Cancelled');
// // //   };

// // //   const handleAction = (id, type) => {
// // //     const event = events.find(e => e.id === id);
// // //     if (!event) return;

// // //     if (type === 'edit') {
// // //       const [startTime, endTime] = event.time
// // //         ? event.time.split(' - ')
// // //         : ['', ''];

// // //       setEditEvent({
// // //         id: event.id,
// // //         title: event.title,
// // //         date: event.date,
// // //         startTime: startTime || '',
// // //         endTime: endTime || '',
// // //         venue: event.venue,
// // //         description: event.description,
// // //         status: event.status,
// // //         category: event.category,
// // //         capacity: event.capacity
// // //       });
// // //       setShowEditForm(true);
// // //       return;
// // //     }

// // //     setActionEventId(id);
// // //     setActionType(type);
// // //     setActionModal(true);
// // //   };

// // //   const confirmAction = () => {
// // //     const id = actionEventId;
// // //     const type = actionType;

// // //     if (type === 'delete') {
// // //       deleteEvent(id);
// // //     } else if (type === 'complete') {
// // //       updateStatus(id, 'completed');
// // //     } else if (type === 'cancel') {
// // //       updateStatus(id, 'cancelled');
// // //     }

// // //     setActionModal(false);
// // //     setActionEventId(null);
// // //     setActionType('');
// // //   };

// // //   const updateStatus = (id, newStatus) => {
// // //     setEvents(events.map(event =>
// // //       event.id === id ? { ...event, status: newStatus } : event
// // //     ));
// // //   };

// // //   const handleSaveEdit = (e) => {
// // //     e.preventDefault();
// // //     const combinedTime = `${editEvent.startTime} - ${editEvent.endTime}`;

// // //     setEvents(events.map(event =>
// // //       event.id === editEvent.id
// // //         ? {
// // //             ...event,
// // //             title: editEvent.title,
// // //             date: editEvent.date,
// // //             time: combinedTime,
// // //             venue: editEvent.venue,
// // //             description: editEvent.description,
// // //             status: editEvent.status,
// // //             category: editEvent.category,
// // //             capacity: Number(editEvent.capacity)
// // //           }
// // //         : event
// // //     ));

// // //     setShowEditForm(false);
// // //     setEditEvent(null);
// // //   };

// // //   const showAlert = (message, title) => {
// // //     setAlertText(message);
// // //     setAlertHeading(title);
// // //     setIsAlertVisible(true);
// // //   };

// // //   const toggleSelect = (id) => {
// // //     setSelectedIds(prev =>
// // //       prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
// // //     );
// // //   };

// // //   const selectAll = () => {
// // //     setSelectedIds(sortedEvents.map(e => e.id));
// // //   };

// // //   const clearSelection = () => setSelectedIds([]);

// // //   const openBulkAction = (type) => {
// // //     if (selectedIds.length === 0) return;
// // //     setBulkActionType(type);
// // //     setBulkActionModal(true);
// // //   };

// // //   const confirmBulkAction = () => {
// // //     if (bulkActionType === 'delete') {
// // //       setEvents(events.filter(e => !selectedIds.includes(e.id)));
// // //     } else if (bulkActionType === 'status') {
// // //       setEvents(events.map(e =>
// // //         selectedIds.includes(e.id) ? { ...e, status: bulkStatus } : e
// // //       ));
// // //     } else if (bulkActionType === 'category') {
// // //       setEvents(events.map(e =>
// // //         selectedIds.includes(e.id) ? { ...e, category: bulkCategory } : e
// // //       ));
// // //     }
// // //     setBulkActionModal(false);
// // //     setBulkActionType('');
// // //     setSelectedIds([]);
// // //   };

// // //   const [newEvent, setNewEvent] = useState({
// // //     title: '',
// // //     date: '',
// // //     startTime: '',
// // //     endTime: '',
// // //     venue: '',
// // //     description: '',
// // //     status: 'upcoming',
// // //     category: 'tech',
// // //     capacity: 50,
// // //     participants: 0
// // //   });

// // //   const convertToMinutes = (timeStr) => {
// // //     if (!timeStr) return 0;
// // //     const [hours, minutes] = timeStr.split(':').map(Number);
// // //     return hours * 60 + (minutes || 0);
// // //   };

// // //   const getTimeRange = (timeStr) => {
// // //     if (!timeStr || !timeStr.includes(' - ')) {
// // //       return { start: 0, end: 0 };
// // //     }
// // //     const [start, end] = timeStr.split(' - ');
// // //     return {
// // //       start: convertToMinutes(start.trim()),
// // //       end: convertToMinutes(end.trim())
// // //     };
// // //   };

// // //   const isOverlapping = (time1, time2) => {
// // //     const t1 = getTimeRange(time1);
// // //     const t2 = getTimeRange(time2);
// // //     return t1.start < t2.end && t2.start < t1.end;
// // //   };

// // //   const handleAddEvent = (e) => {
// // //     e.preventDefault();
// // //     const combinedTime = `${newEvent.startTime} - ${newEvent.endTime}`;

// // //     const isClashing = events.some(event =>
// // //       event.date === newEvent.date &&
// // //       isOverlapping(event.time, combinedTime) &&
// // //       event.venue.toLowerCase() === newEvent.venue.toLowerCase()
// // //     );

// // //     if (isClashing) {
// // //       showAlert('This time slot is already booked! Please choose another date or time.', 'Time Clash');
// // //       return;
// // //     }

// // //     const newEventData = {
// // //       id: events.length + 1,
// // //       ...newEvent,
// // //       time: combinedTime,
// // //       capacity: newEvent.capacity || 50,
// // //       participants: 0,
// // //       participantNames: [],
// // //       attendedBy: [],
// // //       pendingAttendance: [],
// // //       rejectedBy: [],
// // //       icon: '📌'
// // //     };

// // //     setEvents([...events, newEventData]);
// // //     setShowForm(false);
// // //     setNewEvent({
// // //       title: '',
// // //       date: '',
// // //       startTime: '',
// // //       endTime: '',
// // //       venue: '',
// // //       description: '',
// // //       status: 'upcoming',
// // //       category: 'tech',
// // //       capacity: 50,
// // //       participants: 0
// // //     });
// // //   };

// // //   return (
// // //     <div className={`event-page ${darkMode ? 'dark-mode' : ''}`}>
// // //       <div className="event-header">
// // //         <div className={`event-header-left ${darkMode ? 'dark-mode' : ''}`}>
// // //           <h2>Events</h2>
// // //           <p>Manage all your club events in one place.</p>
// // //         </div>

// // //         <div className="event-header-actions">
// // //           {(role === 'admin' || role === 'leader') && (
// // //             <button className="analytics-btn" onClick={goToAnalytics}>
// // //               <i className="fa-solid fa-chart-line"></i> View Analytics
// // //             </button>
// // //           )}

// // //           {role === 'admin' || role === 'leader' ? (
// // //             <button className="create-btn" onClick={() => setShowForm(true)}>
// // //               <i className="fas fa-plus"></i> Create New Event
// // //             </button>
// // //           ) : (
// // //             <button className="create-btn disabled" disabled>
// // //               <i className="fas fa-lock"></i> Only Admin Can Create
// // //             </button>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {showForm && (
// // //         <div className="form-overlay">
// // //           <div className="form-modal">
// // //             <div className="form-header">
// // //               <h2>Create New Event</h2>
// // //               <button className="form-close" onClick={() => setShowForm(false)}>✕</button>
// // //             </div>
// // //             <form onSubmit={handleAddEvent}>
// // //               <div className="form-group">
// // //                 <label>Event Title</label>
// // //                 <input
// // //                   ref={titleRef}
// // //                   type="text"
// // //                   placeholder="Enter event title"
// // //                   value={newEvent.title}
// // //                   onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
// // //                   required
// // //                 />
// // //               </div>
// // //               <div className="form-row">
// // //                 <div className="form-group">
// // //                   <label>Date</label>
// // //                   <input
// // //                     type="date"
// // //                     value={newEvent.date}
// // //                     onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
// // //                     required
// // //                   />
// // //                 </div>
// // //                 <div className="form-row">
// // //                   <div className="form-group">
// // //                     <label>Start Time</label>
// // //                     <input
// // //                       type="time"
// // //                       value={newEvent.startTime}
// // //                       onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
// // //                       required
// // //                     />
// // //                   </div>
// // //                   <div className="form-group">
// // //                     <label>End Time</label>
// // //                     <input
// // //                       type="time"
// // //                       value={newEvent.endTime}
// // //                       onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
// // //                       required
// // //                     />
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //               <div className="form-group">
// // //                 <label>Venue</label>
// // //                 <input
// // //                   type="text"
// // //                   placeholder="Enter venue"
// // //                   value={newEvent.venue}
// // //                   onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
// // //                   required
// // //                 />
// // //               </div>
// // //               <div className="form-group">
// // //                 <label>Description</label>
// // //                 <textarea
// // //                   placeholder="Enter event description"
// // //                   value={newEvent.description}
// // //                   onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
// // //                   required
// // //                 />
// // //               </div>
// // //               <div className="form-row">
// // //                 <div className="form-group">
// // //                   <label>Status</label>
// // //                   <select
// // //                     value={newEvent.status}
// // //                     onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
// // //                   >
// // //                     <option value="upcoming">Upcoming</option>
// // //                     <option value="ongoing">Ongoing</option>
// // //                     <option value="completed">Completed</option>
// // //                     <option value="cancelled">Cancelled</option>
// // //                   </select>
// // //                 </div>
// // //                 <div className="form-group">
// // //                   <label>Category</label>
// // //                   <select
// // //                     value={newEvent.category}
// // //                     onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
// // //                   >
// // //                     <option value="tech">Tech</option>
// // //                     <option value="cultural">Cultural</option>
// // //                     <option value="sports">Sports</option>
// // //                     <option value="workshop">Workshop</option>
// // //                     <option value="social">Social</option>
// // //                     <option value="academic">Academic</option>
// // //                   </select>
// // //                 </div>
// // //               </div>
// // //               <div className="form-group">
// // //                 <label>Event Capacity</label>
// // //                 <input
// // //                   type="number"
// // //                   placeholder="Max participants (e.g., 50)"
// // //                   value={newEvent.capacity}
// // //                   onChange={(e) => setNewEvent({ ...newEvent, capacity: Number(e.target.value) })}
// // //                   required
// // //                   min="1"
// // //                 />
// // //               </div>
// // //               <div className="form-actions">
// // //                 <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>Cancel</button>
// // //                 <button type="submit" className="btn-submit">Create Event</button>
// // //               </div>
// // //             </form>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {showEditForm && editEvent && (
// // //         <div className="form-overlay">
// // //           <div className="form-modal">
// // //             <div className="form-header">
// // //               <h2>Edit Event</h2>
// // //               <button className="form-close" onClick={() => setShowEditForm(false)}>✕</button>
// // //             </div>
// // //             <form onSubmit={handleSaveEdit}>
// // //               <div className="form-group">
// // //                 <label>Event Title</label>
// // //                 <input
// // //                   type="text"
// // //                   value={editEvent.title}
// // //                   onChange={(e) => setEditEvent({ ...editEvent, title: e.target.value })}
// // //                   required
// // //                 />
// // //               </div>
// // //               <div className="form-row">
// // //                 <div className="form-group">
// // //                   <label>Date</label>
// // //                   <input
// // //                     type="date"
// // //                     value={editEvent.date}
// // //                     onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })}
// // //                     required
// // //                   />
// // //                 </div>
// // //                 <div className="form-row">
// // //                   <div className="form-group">
// // //                     <label>Start Time</label>
// // //                     <input
// // //                       type="time"
// // //                       value={editEvent.startTime}
// // //                       onChange={(e) => setEditEvent({ ...editEvent, startTime: e.target.value })}
// // //                       required
// // //                     />
// // //                   </div>
// // //                   <div className="form-group">
// // //                     <label>End Time</label>
// // //                     <input
// // //                       type="time"
// // //                       value={editEvent.endTime}
// // //                       onChange={(e) => setEditEvent({ ...editEvent, endTime: e.target.value })}
// // //                       required
// // //                     />
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //               <div className="form-group">
// // //                 <label>Venue</label>
// // //                 <input
// // //                   type="text"
// // //                   value={editEvent.venue}
// // //                   onChange={(e) => setEditEvent({ ...editEvent, venue: e.target.value })}
// // //                   required
// // //                 />
// // //               </div>
// // //               <div className="form-group">
// // //                 <label>Description</label>
// // //                 <textarea
// // //                   value={editEvent.description}
// // //                   onChange={(e) => setEditEvent({ ...editEvent, description: e.target.value })}
// // //                   required
// // //                 />
// // //               </div>
// // //               <div className="form-row">
// // //                 <div className="form-group">
// // //                   <label>Status</label>
// // //                   <select
// // //                     value={editEvent.status}
// // //                     onChange={(e) => setEditEvent({ ...editEvent, status: e.target.value })}
// // //                   >
// // //                     <option value="upcoming">Upcoming</option>
// // //                     <option value="ongoing">Ongoing</option>
// // //                     <option value="completed">Completed</option>
// // //                     <option value="cancelled">Cancelled</option>
// // //                   </select>
// // //                 </div>
// // //                 <div className="form-group">
// // //                   <label>Category</label>
// // //                   <select
// // //                     value={editEvent.category}
// // //                     onChange={(e) => setEditEvent({ ...editEvent, category: e.target.value })}
// // //                   >
// // //                     <option value="tech">Tech</option>
// // //                     <option value="cultural">Cultural</option>
// // //                     <option value="sports">Sports</option>
// // //                     <option value="workshop">Workshop</option>
// // //                     <option value="social">Social</option>
// // //                     <option value="academic">Academic</option>
// // //                   </select>
// // //                 </div>
// // //               </div>
// // //               <div className="form-group">
// // //                 <label>Event Capacity</label>
// // //                 <input
// // //                   type="number"
// // //                   value={editEvent.capacity}
// // //                   onChange={(e) => setEditEvent({ ...editEvent, capacity: e.target.value })}
// // //                   required
// // //                   min="1"
// // //                 />
// // //               </div>
// // //               <div className="form-actions">
// // //                 <button type="button" className="btn-cancel" onClick={() => setShowEditForm(false)}>Cancel</button>
// // //                 <button type="submit" className="btn-submit">Save Changes</button>
// // //               </div>
// // //             </form>
// // //           </div>
// // //         </div>
// // //       )}

// // //       <div className="search-section">
// // //         <div className="search-box">
// // //           <input
// // //             ref={searchInputRef}
// // //             type="text"
// // //             className="search-input"
// // //             placeholder="Search events by title, category, or description..."
// // //             value={searchTerm}
// // //             onChange={(e) => setSearchTerm(e.target.value)}
// // //           />
// // //         </div>
// // //         <span className="search-results">{sortedEvents.length} events found</span>
// // //         {(role === 'admin' || role === 'leader') && sortedEvents.length > 0 && (
// // //           <button
// // //             className="select-all-btn"
// // //             onClick={selectedIds.length === sortedEvents.length ? clearSelection : selectAll}
// // //           >
// // //             <i className={`fa-solid ${selectedIds.length === sortedEvents.length ? 'fa-square-check' : 'fa-square'}`}></i>
// // //             {selectedIds.length === sortedEvents.length ? 'Deselect All' : 'Select All'}
// // //           </button>
// // //         )}
// // //       </div>

// // //       <div className="event-stats">
// // //         <div className="stat-card">
// // //           <span className="stat-number">{totalEvents}</span>
// // //           <span className="stat-label">Total Events</span>
// // //         </div>
// // //         <div className="stat-card">
// // //           <span className="stat-number">{upcomingCount}</span>
// // //           <span className="stat-label">Upcoming</span>
// // //         </div>
// // //         <div className="stat-card">
// // //           <span className="stat-number">{ongoingCount}</span>
// // //           <span className="stat-label">Ongoing</span>
// // //         </div>
// // //         <div className="stat-card">
// // //           <span className="stat-number">{completedCount}</span>
// // //           <span className="stat-label">Completed</span>
// // //         </div>
// // //       </div>

// // //       <div className="filters-section">
// // //         <div className="filters-left">
// // //           <div className="filter-group">
// // //             <label>Status:</label>
// // //             <div className="filter-buttons">
// // //               <button className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`} onClick={() => setStatusFilter('all')}>All</button>
// // //               <button className={`filter-btn ${statusFilter === 'upcoming' ? 'active' : ''}`} onClick={() => setStatusFilter('upcoming')}>Upcoming</button>
// // //               <button className={`filter-btn ${statusFilter === 'ongoing' ? 'active' : ''}`} onClick={() => setStatusFilter('ongoing')}>Ongoing</button>
// // //               <button className={`filter-btn ${statusFilter === 'completed' ? 'active' : ''}`} onClick={() => setStatusFilter('completed')}>Completed</button>
// // //               <button className={`filter-btn ${statusFilter === 'cancelled' ? 'active' : ''}`} onClick={() => setStatusFilter('cancelled')}>Cancelled</button>
// // //             </div>
// // //           </div>
// // //           <div className="filter-group">
// // //             <label>Category:</label>
// // //             <div className="filter-buttons">
// // //               <button className={`filter-btn ${categoryFilter === 'all' ? 'active' : ''}`} onClick={() => setCategoryFilter('all')}>All Categories</button>
// // //               {categories.map((category) => (
// // //                 category !== 'all' && (
// // //                   <button key={category} className={`filter-btn ${categoryFilter === category ? 'active' : ''}`} onClick={() => setCategoryFilter(category)}>
// // //                     {category.charAt(0).toUpperCase() + category.slice(1)}
// // //                   </button>
// // //                 )
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="filters-right">
// // //           <label htmlFor="sort-select">Sort by:</label>
// // //           <select
// // //             id="sort-select"
// // //             className="sort-select"
// // //             value={sortBy}
// // //             onChange={(e) => setSortBy(e.target.value)}
// // //           >
// // //             <option value="default">Default</option>
// // //             <option value="upcoming-first">Upcoming First</option>
// // //             <option value="date-asc">Date (Oldest First)</option>
// // //             <option value="date-desc">Date (Newest First)</option>
// // //             <option value="popular">Most Popular</option>
// // //           </select>
// // //         </div>
// // //       </div>

// // //       {!(role === 'admin' || role === 'leader') && (
// // //         <div className="my-events-toggle">
// // //           <button
// // //             className={`my-events-btn ${!onlyMine ? 'active' : ''}`}
// // //             onClick={() => setOnlyMine(false)}
// // //           >
// // //             <i className="fa-solid fa-list"></i> All Events
// // //           </button>
// // //           <button
// // //             className={`my-events-btn ${onlyMine ? 'active' : ''}`}
// // //             onClick={() => setOnlyMine(true)}
// // //           >
// // //             <i className="fa-solid fa-user-check"></i> My Events
// // //           </button>
// // //         </div>
// // //       )}

// // //       <div className="view-toggle">
// // //         <button
// // //           className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
// // //           onClick={() => setViewMode('list')}
// // //         >
// // //           <i className="fa-solid fa-list"></i> List
// // //         </button>
// // //         <button
// // //           className={`view-btn ${viewMode === 'calendar' ? 'active' : ''}`}
// // //           onClick={() => setViewMode('calendar')}
// // //         >
// // //           <i className="fa-solid fa-calendar-days"></i> Calendar
// // //         </button>
// // //       </div>

// // //       {sortedEvents.length === 0 ? (
// // //         <div className="empty-state">
// // //           <span className="empty-icon">📭</span>
// // //           <h3>No Events Found</h3>
// // //           <p>Try adjusting your search or filters.</p>
// // //         </div>
// // //       ) : viewMode === 'list' ? (
// // //         <div className="events-grid">
// // //           {sortedEvents.map((event) => {
// // //             const isManager = role === 'admin' || role === 'leader';

// // //             const isLiveParticipated =
// // //               !isManager &&
// // //               event.status === 'ongoing' &&
// // //               userId &&
// // //               (event.participantNames || []).includes(userId);

// // //             const isAttended = !isManager && userId && (event.attendedBy || []).includes(userId);
// // //             const isPending = !isManager && userId && (event.pendingAttendance || []).includes(userId);

// // //             const hasParticipated = !isManager && userId && (event.participantNames || []).includes(userId);
// // //             const isFull = (event.participants || 0) >= (event.capacity || 0);

// // //             const showParticipate =
// // //               !isManager &&
// // //               userId &&
// // //               event.status === 'upcoming' &&
// // //               !isFull &&
// // //               !hasParticipated;

// // //             const showAlreadyParticipated =
// // //               !isManager &&
// // //               userId &&
// // //               hasParticipated &&
// // //               event.status !== 'ongoing';

// // //             const showFull =
// // //               !isManager &&
// // //               event.status === 'upcoming' &&
// // //               isFull &&
// // //               !hasParticipated;

// // //             return (
// // //               <div
// // //                 key={event.id}
// // //                 className={`event-card category-${event.category} ${isLiveParticipated ? 'live-participated' : ''} ${selectedIds.includes(event.id) ? 'selected' : ''}`}
// // //                 onClick={() => onEventClick && onEventClick(event.id)}
// // //                 style={{ cursor: 'pointer' }}
// // //               >
// // //                 {(role === 'admin' || role === 'leader') && (
// // //                   <div
// // //                     className="event-checkbox-wrap"
// // //                     onClick={(e) => { e.stopPropagation(); toggleSelect(event.id); }}
// // //                   >
// // //                     <div className={`event-checkbox ${selectedIds.includes(event.id) ? 'checked' : ''}`}>
// // //                       {selectedIds.includes(event.id) && <i className="fa-solid fa-check"></i>}
// // //                     </div>
// // //                   </div>
// // //                 )}

// // //                 <div className="event-body">
// // //                   <div className="event-top">
// // //                     {isLiveParticipated ? (
// // //                       <span className="live-badge">
// // //                         <span className="live-dot"></span> LIVE NOW
// // //                       </span>
// // //                     ) : (
// // //                       <span className={`event-status-badge ${event.status}`}>
// // //                         {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
// // //                       </span>
// // //                     )}
// // //                   </div>

// // //                   <h3>{event.title}</h3>
// // //                   <p className="event-desc">{event.description}</p>

// // //                   <span className="event-category-tag">
// // //                     {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
// // //                   </span>

// // //                   <div className="event-meta">
// // //                     <span className="meta-item">
// // //                       <i className="fa-regular fa-calendar"></i> {event.date}
// // //                     </span>
// // //                     <span className="meta-item">
// // //                       <i className="fa-regular fa-clock"></i> {event.time}
// // //                     </span>
// // //                     <span className="meta-item">
// // //                       <i className="fa-solid fa-location-dot"></i> {event.venue}
// // //                     </span>
// // //                     <span className="meta-item">
// // //                       <i className="fa-solid fa-users"></i> {event.participants} / {event.capacity}
// // //                     </span>
// // //                   </div>

// // //                   <div className="event-footer">
// // //                     {showParticipate && (
// // //                       <button
// // //                         className="status-btn participate-btn"
// // //                         onClick={(e) => { e.stopPropagation(); handleParticipate(event.id); }}
// // //                       >
// // //                         <i className="fa-solid fa-user-plus"></i> Participate
// // //                       </button>
// // //                     )}

// // //                     {showAlreadyParticipated && (
// // //                       <>
// // //                         <span className="already-participated">Already Participated</span>
// // //                         <button
// // //                           className="status-btn cancel-participation-btn"
// // //                           onClick={(e) => { e.stopPropagation(); handleCancelClick(event.id); }}
// // //                         >
// // //                           <i className="fa-solid fa-xmark"></i> Cancel
// // //                         </button>
// // //                       </>
// // //                     )}

// // //                     {!isManager && userId && event.status === 'ongoing' && hasParticipated && (
// // //                       <>
// // //                         {isAttended && (
// // //                           <span className="attendance-verified-badge">
// // //                             <i className="fa-solid fa-circle-check"></i> Attended
// // //                           </span>
// // //                         )}
// // //                         {isPending && (
// // //                           <span className="attendance-pending-badge">
// // //                             <i className="fa-solid fa-hourglass-half"></i> Pending
// // //                           </span>
// // //                         )}
// // //                         {!isAttended && !isPending && (
// // //                           <button
// // //                             className="status-btn mark-attendance-btn"
// // //                             onClick={(e) => { e.stopPropagation(); onEventClick(event.id); }}
// // //                           >
// // //                             <i className="fa-solid fa-hand"></i> Mark Attendance
// // //                           </button>
// // //                         )}
// // //                       </>
// // //                     )}

// // //                     {showFull && <span className="full-badge">Full</span>}

// // //                     {isManager && (
// // //                       <div className="event-actions">
// // //                         {role === 'admin' && (
// // //                           <button className="status-btn edit-btn" onClick={(e) => { e.stopPropagation(); handleAction(event.id, 'edit'); }}>
// // //                             <i className="fa-solid fa-pen"></i> Edit
// // //                           </button>
// // //                         )}
// // //                         {event.status !== 'completed' && (
// // //                           <button className="status-btn complete-btn" onClick={(e) => { e.stopPropagation(); handleAction(event.id, 'complete'); }}>
// // //                             Mark as Completed
// // //                           </button>
// // //                         )}
// // //                         {event.status !== 'cancelled' && event.status !== 'completed' && (
// // //                           <button className="status-btn cancel-btn" onClick={(e) => { e.stopPropagation(); handleAction(event.id, 'cancel'); }}>
// // //                             Cancel
// // //                           </button>
// // //                         )}
// // //                         {role === 'admin' && (
// // //                           <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleAction(event.id, 'delete'); }}>
// // //                             Delete
// // //                           </button>
// // //                         )}
// // //                       </div>
// // //                     )}

// // //                     {!isManager && (
// // //                       <span className="event-id">ID: EV-{String(event.id).padStart(3, '0')}</span>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             );
// // //           })}
// // //         </div>
// // //       ) : (
// // //         <div className="calendar-view">
// // //           <div className="calendar-header">
// // //             <button className="calendar-nav-btn" onClick={prevMonth}>
// // //               <i className="fa-solid fa-chevron-left"></i>
// // //             </button>
// // //             <h2 className="calendar-title">
// // //               {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
// // //             </h2>
// // //             <button className="calendar-nav-btn" onClick={nextMonth}>
// // //               <i className="fa-solid fa-chevron-right"></i>
// // //             </button>
// // //           </div>

// // //           <div className="calendar-days-header">
// // //             {dayNames.map(day => (
// // //               <div key={day} className="calendar-day-name">{day}</div>
// // //             ))}
// // //           </div>

// // //           <div className="calendar-grid">
// // //             {getDaysInMonth(currentMonth).map((date, idx) => {
// // //               if (!date) {
// // //                 return <div key={`empty-${idx}`} className="calendar-cell empty"></div>;
// // //               }
// // //               const eventsOnDay = getEventsForDate(date);
// // //               const isToday = date.toDateString() === new Date().toDateString();
// // //               const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

// // //               return (
// // //                 <div
// // //                   key={date.toISOString()}
// // //                   className={`calendar-cell ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${eventsOnDay.length > 0 ? 'has-events' : ''}`}
// // //                   onClick={() => setSelectedDate(date)}
// // //                 >
// // //                   <span className="calendar-date">{date.getDate()}</span>
// // //                   {eventsOnDay.length > 0 && (
// // //                     <div className="calendar-dots">
// // //                       {eventsOnDay.slice(0, 3).map((e, i) => (
// // //                         <span key={i} className={`calendar-dot ${e.category}`}></span>
// // //                       ))}
// // //                       {eventsOnDay.length > 3 && (
// // //                         <span className="calendar-dot-more">+{eventsOnDay.length - 3}</span>
// // //                       )}
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               );
// // //             })}
// // //           </div>

// // //           {selectedDate && (
// // //             <div className="calendar-events-panel">
// // //               <h3 className="calendar-panel-title">
// // //                 <i className="fa-solid fa-calendar-check"></i> Events on {selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
// // //               </h3>
// // //               {getEventsForDate(selectedDate).length > 0 ? (
// // //                 <div className="calendar-events-list">
// // //                   {getEventsForDate(selectedDate).map((event) => (
// // //                     <div
// // //                       key={event.id}
// // //                       className="calendar-event-item"
// // //                       onClick={() => onEventClick && onEventClick(event.id)}
// // //                     >
// // //                       <div className="calendar-event-info">
// // //                         <h4>{event.title}</h4>
// // //                         <p>{event.time} · {event.venue}</p>
// // //                       </div>
// // //                       <span className={`event-status-badge ${event.status}`}>
// // //                         {event.status}
// // //                       </span>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               ) : (
// // //                 <p className="calendar-empty">No events on this day.</p>
// // //               )}
// // //             </div>
// // //           )}
// // //         </div>
// // //       )}

// // //       {selectedIds.length > 0 && (role === 'admin' || role === 'leader') && (
// // //         <div className="bulk-action-bar">
// // //           <div className="bulk-left">
// // //             <span className="bulk-count">
// // //               <strong>{selectedIds.length}</strong> event{selectedIds.length > 1 ? 's' : ''} selected
// // //             </span>
// // //             <button className="bulk-clear" onClick={clearSelection}>
// // //               <i className="fa-solid fa-xmark"></i> Clear
// // //             </button>
// // //           </div>

// // //           <div className="bulk-actions">
// // //             <button className="bulk-btn bulk-status" onClick={() => openBulkAction('status')}>
// // //               <i className="fa-solid fa-arrows-rotate"></i> Change Status
// // //             </button>
// // //             <button className="bulk-btn bulk-category" onClick={() => openBulkAction('category')}>
// // //               <i className="fa-solid fa-tag"></i> Change Category
// // //             </button>
// // //             <button className="bulk-btn bulk-delete" onClick={() => openBulkAction('delete')}>
// // //               <i className="fa-solid fa-trash"></i> Delete
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {bulkActionModal && (
// // //         <div className="confirm-overlay">
// // //           <div className="confirm-modal bulk-modal" onClick={(e) => e.stopPropagation()}>
// // //             <h3>
// // //               {bulkActionType === 'delete' && 'Delete Events'}
// // //               {bulkActionType === 'status' && 'Change Status'}
// // //               {bulkActionType === 'category' && 'Change Category'}
// // //             </h3>

// // //             <p>
// // //               {bulkActionType === 'delete' &&
// // //                 `Are you sure you want to delete ${selectedIds.length} event${selectedIds.length > 1 ? 's' : ''}?`}
// // //               {bulkActionType === 'status' &&
// // //                 `Change status for ${selectedIds.length} event${selectedIds.length > 1 ? 's' : ''}:`}
// // //               {bulkActionType === 'category' &&
// // //                 `Change category for ${selectedIds.length} event${selectedIds.length > 1 ? 's' : ''}:`}
// // //             </p>

// // //             {bulkActionType === 'status' && (
// // //               <div className="bulk-select-wrap">
// // //                 <label>New Status</label>
// // //                 <select value={bulkStatus} onChange={(e) => setBulkStatus(e.target.value)}>
// // //                   <option value="upcoming">Upcoming</option>
// // //                   <option value="ongoing">Ongoing</option>
// // //                   <option value="completed">Completed</option>
// // //                   <option value="cancelled">Cancelled</option>
// // //                 </select>
// // //               </div>
// // //             )}

// // //             {bulkActionType === 'category' && (
// // //               <div className="bulk-select-wrap">
// // //                 <label>New Category</label>
// // //                 <select value={bulkCategory} onChange={(e) => setBulkCategory(e.target.value)}>
// // //                   <option value="tech">Tech</option>
// // //                   <option value="cultural">Cultural</option>
// // //                   <option value="sports">Sports</option>
// // //                   <option value="workshop">Workshop</option>
// // //                   <option value="social">Social</option>
// // //                   <option value="academic">Academic</option>
// // //                 </select>
// // //               </div>
// // //             )}

// // //             <div className="confirm-actions">
// // //               <button
// // //                 className="btn-confirm-cancel"
// // //                 onClick={() => {
// // //                   setBulkActionModal(false);
// // //                   setBulkActionType('');
// // //                 }}
// // //               >
// // //                 Cancel
// // //               </button>
// // //               <button
// // //                 className={`btn-confirm-yes ${bulkActionType === 'delete' ? 'btn-confirm-danger' : ''}`}
// // //                 onClick={confirmBulkAction}
// // //               >
// // //                 {bulkActionType === 'delete' ? 'Delete All' : 'Apply'}
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {confirmModal && (
// // //         <div className="confirm-overlay">
// // //           <div className="confirm-modal">
// // //             <h3>Confirm Participation</h3>
// // //             <p>Do you want to participate in this event?</p>
// // //             <div className="confirm-actions">
// // //               <button className="btn-confirm-cancel" onClick={() => {
// // //                 setConfirmModal(false);
// // //                 setParticipatingEventId(null);
// // //               }}>
// // //                 Cancel
// // //               </button>
// // //               <button className="btn-confirm-yes" onClick={confirmParticipation}>
// // //                 Yes, Participate
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {cancelModal && (
// // //         <div className="confirm-overlay">
// // //           <div className="confirm-modal">
// // //             <h3>Cancel Participation</h3>
// // //             <p>Are you sure you want to cancel your participation for this event?</p>
// // //             <div className="confirm-actions">
// // //               <button className="btn-confirm-cancel" onClick={() => {
// // //                 setCancelModal(false);
// // //                 setCancellingEventId(null);
// // //               }}>
// // //                 No
// // //               </button>
// // //               <button className="btn-confirm-yes btn-confirm-danger" onClick={confirmCancel}>
// // //                 Yes, Cancel
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {actionModal && (
// // //         <div className="confirm-overlay">
// // //           <div className="confirm-modal">
// // //             <h3>
// // //               {actionType === 'delete' && 'Delete Event'}
// // //               {actionType === 'complete' && 'Complete Event'}
// // //               {actionType === 'cancel' && 'Cancel Event'}
// // //             </h3>
// // //             <p>
// // //               {actionType === 'delete' && 'Are you sure you want to DELETE this event?'}
// // //               {actionType === 'complete' && 'Are you sure you want to mark this event as COMPLETED?'}
// // //               {actionType === 'cancel' && 'Are you sure you want to CANCEL this event?'}
// // //             </p>
// // //             <div className="confirm-actions">
// // //               <button className="btn-confirm-cancel" onClick={() => {
// // //                 setActionModal(false);
// // //                 setActionEventId(null);
// // //                 setActionType('');
// // //               }}>
// // //                 Cancel
// // //               </button>
// // //               <button className="btn-confirm-yes" onClick={confirmAction}>
// // //                 Yes, {actionType === 'delete' ? 'Delete' : actionType === 'complete' ? 'Complete' : 'Cancel'}
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {isAlertVisible && (
// // //         <div className="confirm-overlay" onClick={() => setIsAlertVisible(false)}>
// // //           <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
// // //             <h3>{alertHeading}</h3>
// // //             <p>{alertText}</p>
// // //             <div className="confirm-actions">
// // //               <button className="btn-confirm-yes" onClick={() => setIsAlertVisible(false)}>
// // //                 OK
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //     </div>
// // //   );
// // // }

// // // export default EventPage;


// // import React, { useState, useRef, useEffect } from 'react';
// // import './EventPage.css';
// // import { useTheme } from './ThemeContext';

// // function EventPage({ role, events, setEvents, dispatch, onEventClick, currentMemberId, goToAnalytics }) {
// //   const { darkMode } = useTheme();
// //   const [statusFilter, setStatusFilter] = useState('all');
// //   const [categoryFilter, setCategoryFilter] = useState('all');
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [showForm, setShowForm] = useState(false);

// //   const [onlyMine, setOnlyMine] = useState(false);
// //   const [sortBy, setSortBy] = useState('default');

// //   const [viewMode, setViewMode] = useState('list');
// //   const [currentMonth, setCurrentMonth] = useState(new Date());
// //   const [selectedDate, setSelectedDate] = useState(null);

// //   const searchInputRef = useRef(null);
// //   const titleRef = useRef(null);

// //   useEffect(() => {
// //     searchInputRef.current?.focus();
// //   }, []);

// //   useEffect(() => {
// //     if (showForm) {
// //       setTimeout(() => {
// //         titleRef.current?.focus();
// //       }, 100);
// //     }
// //   }, [showForm]);

// //   const [confirmModal, setConfirmModal] = useState(false);
// //   const [participatingEventId, setParticipatingEventId] = useState(null);

// //   const [cancelModal, setCancelModal] = useState(false);
// //   const [cancellingEventId, setCancellingEventId] = useState(null);

// //   const [actionModal, setActionModal] = useState(false);
// //   const [actionEventId, setActionEventId] = useState(null);
// //   const [actionType, setActionType] = useState('');

// //   const [isAlertVisible, setIsAlertVisible] = useState(false);
// //   const [alertText, setAlertText] = useState('');
// //   const [alertHeading, setAlertHeading] = useState('');

// //   const [showEditForm, setShowEditForm] = useState(false);
// //   const [editEvent, setEditEvent] = useState(null);

// //   const [selectedIds, setSelectedIds] = useState([]);
// //   const [bulkActionModal, setBulkActionModal] = useState(false);
// //   const [bulkActionType, setBulkActionType] = useState('');
// //   const [bulkStatus, setBulkStatus] = useState('upcoming');
// //   const [bulkCategory, setBulkCategory] = useState('tech');

// //   const userId = (() => {
// //     const mid = currentMemberId ?? sessionStorage.getItem('currentMemberId');
// //     if (mid && role) return `${role}_${mid}`;
// //     if (role) {
// //       let sid = sessionStorage.getItem('__uid');
// //       if (!sid) {
// //         sid = String(Date.now());
// //         sessionStorage.setItem('__uid', sid);
// //       }
// //       return `${role}_${sid}`;
// //     }
// //     return null;
// //   })();

// //   const categories = ['all', ...new Set(events.map(event => event.category))];

// //   const filteredEvents = events.filter(event => {
// //     const statusMatch = statusFilter === 'all' || event.status === statusFilter;
// //     const categoryMatch = categoryFilter === 'all' || event.category === categoryFilter;
// //     const searchMatch = searchTerm === '' ||
// //       event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       event.description.toLowerCase().includes(searchTerm.toLowerCase());

// //     const mineMatch =
// //       !onlyMine ||
// //       (userId && (event.participantNames || []).includes(userId));

// //     return statusMatch && categoryMatch && searchMatch && mineMatch;
// //   });

// //   const sortedEvents = [...filteredEvents].sort((a, b) => {
// //     if (sortBy === 'date-asc') {
// //       return new Date(`${a.date}T${(a.time || '').split(' - ')[0] || '00:00'}`)
// //            - new Date(`${b.date}T${(b.time || '').split(' - ')[0] || '00:00'}`);
// //     }
// //     if (sortBy === 'date-desc') {
// //       return new Date(`${b.date}T${(b.time || '').split(' - ')[0] || '00:00'}`)
// //            - new Date(`${a.date}T${(a.time || '').split(' - ')[0] || '00:00'}`);
// //     }
// //     if (sortBy === 'popular') {
// //       return (b.participants || 0) - (a.participants || 0);
// //     }
// //     if (sortBy === 'upcoming-first') {
// //       const order = { upcoming: 0, ongoing: 1, completed: 2, cancelled: 3 };
// //       return (order[a.status] ?? 9) - (order[b.status] ?? 9);
// //     }
// //     return 0;
// //   });

// //   const totalEvents = events.length;
// //   const upcomingCount = events.filter(e => e.status === 'upcoming').length;
// //   const ongoingCount = events.filter(e => e.status === 'ongoing').length;
// //   const completedCount = events.filter(e => e.status === 'completed').length;

// //   const monthNames = [
// //     'January', 'February', 'March', 'April', 'May', 'June',
// //     'July', 'August', 'September', 'October', 'November', 'December'
// //   ];
// //   const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// //   const getDaysInMonth = (date) => {
// //     const year = date.getFullYear();
// //     const month = date.getMonth();
// //     const firstDay = new Date(year, month, 1).getDay();
// //     const daysInMonth = new Date(year, month + 1, 0).getDate();

// //     const days = [];
// //     for (let i = 0; i < firstDay; i++) days.push(null);
// //     for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));
// //     return days;
// //   };

// //   const getEventsForDate = (date) => {
// //     if (!date) return [];
// //     const year = date.getFullYear();
// //     const month = String(date.getMonth() + 1).padStart(2, '0');
// //     const day = String(date.getDate()).padStart(2, '0');
// //     const dateStr = `${year}-${month}-${day}`;
// //     return sortedEvents.filter(e => e.date === dateStr);
// //   };

// //   const prevMonth = () => {
// //     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
// //     setSelectedDate(null);
// //   };

// //   const nextMonth = () => {
// //     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
// //     setSelectedDate(null);
// //   };

// //   // ✅ DISPATCH USE KIYA
// //   const deleteEvent = (id) => {
// //     if (dispatch) dispatch({ type: 'DELETE_EVENT', payload: id });
// //     else setEvents(events.filter(event => event.id !== id));
// //   };

// //   const handleParticipate = (id) => {
// //     const event = events.find(e => e.id === id);
// //     if (!event) return;
// //     if (!userId) {
// //       showAlert('Please login to participate.', 'Login Required');
// //       return;
// //     }

// //     if ((event.participantNames || []).includes(userId)) {
// //       showAlert('You have already participated in this event!', 'Already Participated');
// //       return;
// //     }

// //     if ((event.participants || 0) >= (event.capacity || 0)) {
// //       showAlert('Event is full! No more participants allowed.', 'Event Full');
// //       return;
// //     }

// //     setParticipatingEventId(id);
// //     setConfirmModal(true);
// //   };

// //   // ✅ DISPATCH USE KIYA
// //   const confirmParticipation = () => {
// //     const id = participatingEventId;
// //     const event = events.find(e => e.id === id);
// //     if (!event) return;
// //     if (!userId) return;

// //     if ((event.participants || 0) >= (event.capacity || 0)) {
// //       showAlert('Event is full! No more participants allowed.', 'Event Full');
// //       setConfirmModal(false);
// //       setParticipatingEventId(null);
// //       return;
// //     }

// //     if (dispatch) {
// //       dispatch({ type: 'PARTICIPATE', payload: { id, userId } });
// //     } else {
// //       setEvents(events.map(ev => {
// //         if (ev.id === id) {
// //           return { ...ev, participants: (ev.participants || 0) + 1, participantNames: [...(ev.participantNames || []), userId] };
// //         }
// //         return ev;
// //       }));
// //     }

// //     setConfirmModal(false);
// //     setParticipatingEventId(null);
// //     showAlert('You have successfully participated in this event!', 'Participated 🎉');
// //   };

// //   const handleCancelClick = (id) => {
// //     const event = events.find(e => e.id === id);
// //     if (!event) return;
// //     if (!userId) return;
// //     if (!(event.participantNames || []).includes(userId)) return;
// //     if (event.status === 'ongoing') {
// //       showAlert('Ongoing event se cancel nahi kar sakte.', 'Cannot Cancel');
// //       return;
// //     }
// //     setCancellingEventId(id);
// //     setCancelModal(true);
// //   };

// //   // ✅ DISPATCH USE KIYA
// //   const confirmCancel = () => {
// //     const id = cancellingEventId;
// //     if (!id || !userId) return;

// //     if (dispatch) {
// //       dispatch({ type: 'CANCEL_PARTICIPATE', payload: { id, userId } });
// //     } else {
// //       setEvents(events.map(e => {
// //         if (e.id !== id) return e;
// //         return {
// //           ...e,
// //           participants: Math.max(0, (e.participants || 0) - 1),
// //           participantNames: (e.participantNames || []).filter(n => n !== userId),
// //           attendedBy: (e.attendedBy || []).filter(n => n !== userId),
// //           pendingAttendance: (e.pendingAttendance || []).filter(n => n !== userId),
// //           rejectedBy: (e.rejectedBy || []).filter(n => n !== userId)
// //         };
// //       }));
// //     }

// //     setCancelModal(false);
// //     setCancellingEventId(null);
// //     showAlert('Participation cancelled.', 'Cancelled');
// //   };

// //   const handleAction = (id, type) => {
// //     const event = events.find(e => e.id === id);
// //     if (!event) return;

// //     if (type === 'edit') {
// //       const [startTime, endTime] = event.time ? event.time.split(' - ') : ['', ''];
// //       setEditEvent({
// //         id: event.id, title: event.title, date: event.date,
// //         startTime: startTime || '', endTime: endTime || '',
// //         venue: event.venue, description: event.description,
// //         status: event.status, category: event.category, capacity: event.capacity
// //       });
// //       setShowEditForm(true);
// //       return;
// //     }

// //     setActionEventId(id);
// //     setActionType(type);
// //     setActionModal(true);
// //   };

// //   const confirmAction = () => {
// //     const id = actionEventId;
// //     const type = actionType;

// //     if (type === 'delete') {
// //       deleteEvent(id);
// //     } else if (type === 'complete') {
// //       updateStatus(id, 'completed');
// //     } else if (type === 'cancel') {
// //       updateStatus(id, 'cancelled');
// //     }

// //     setActionModal(false);
// //     setActionEventId(null);
// //     setActionType('');
// //   };

// //   // ✅ DISPATCH USE KIYA
// //   const updateStatus = (id, newStatus) => {
// //     if (dispatch) {
// //       dispatch({ type: 'UPDATE_EVENT', payload: { id, updates: { status: newStatus } } });
// //     } else {
// //       setEvents(events.map(event => event.id === id ? { ...event, status: newStatus } : event));
// //     }
// //   };

// //   // ✅ DISPATCH USE KIYA
// //   const handleSaveEdit = (e) => {
// //     e.preventDefault();
// //     const combinedTime = `${editEvent.startTime} - ${editEvent.endTime}`;

// //     if (dispatch) {
// //       dispatch({
// //         type: 'UPDATE_EVENT',
// //         payload: {
// //           id: editEvent.id,
// //           updates: {
// //             title: editEvent.title, date: editEvent.date, time: combinedTime,
// //             venue: editEvent.venue, description: editEvent.description,
// //             status: editEvent.status, category: editEvent.category, capacity: Number(editEvent.capacity)
// //           }
// //         }
// //       });
// //     } else {
// //       setEvents(events.map(event =>
// //         event.id === editEvent.id
// //           ? { ...event, title: editEvent.title, date: editEvent.date, time: combinedTime, venue: editEvent.venue, description: editEvent.description, status: editEvent.status, category: editEvent.category, capacity: Number(editEvent.capacity) }
// //           : event
// //       ));
// //     }

// //     setShowEditForm(false);
// //     setEditEvent(null);
// //   };

// //   const showAlert = (message, title) => {
// //     setAlertText(message);
// //     setAlertHeading(title);
// //     setIsAlertVisible(true);
// //   };

// //   const toggleSelect = (id) => {
// //     setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
// //   };

// //   const selectAll = () => {
// //     setSelectedIds(sortedEvents.map(e => e.id));
// //   };

// //   const clearSelection = () => setSelectedIds([]);

// //   const openBulkAction = (type) => {
// //     if (selectedIds.length === 0) return;
// //     setBulkActionType(type);
// //     setBulkActionModal(true);
// //   };

// //   // ✅ DISPATCH USE KIYA
// //   const confirmBulkAction = () => {
// //     if (dispatch) {
// //       if (bulkActionType === 'delete') {
// //         dispatch({ type: 'SET_EVENTS', payload: events.filter(e => !selectedIds.includes(e.id)) });
// //       } else if (bulkActionType === 'status') {
// //         dispatch({ type: 'SET_EVENTS', payload: events.map(e => selectedIds.includes(e.id) ? { ...e, status: bulkStatus } : e) });
// //       } else if (bulkActionType === 'category') {
// //         dispatch({ type: 'SET_EVENTS', payload: events.map(e => selectedIds.includes(e.id) ? { ...e, category: bulkCategory } : e) });
// //       }
// //     } else {
// //       if (bulkActionType === 'delete') {
// //         setEvents(events.filter(e => !selectedIds.includes(e.id)));
// //       } else if (bulkActionType === 'status') {
// //         setEvents(events.map(e => selectedIds.includes(e.id) ? { ...e, status: bulkStatus } : e));
// //       } else if (bulkActionType === 'category') {
// //         setEvents(events.map(e => selectedIds.includes(e.id) ? { ...e, category: bulkCategory } : e));
// //       }
// //     }
// //     setBulkActionModal(false);
// //     setBulkActionType('');
// //     setSelectedIds([]);
// //   };

// //   const [newEvent, setNewEvent] = useState({
// //     title: '', date: '', startTime: '', endTime: '', venue: '', description: '', status: 'upcoming', category: 'tech', capacity: 50, participants: 0
// //   });

// //   const convertToMinutes = (timeStr) => {
// //     if (!timeStr) return 0;
// //     const [hours, minutes] = timeStr.split(':').map(Number);
// //     return hours * 60 + (minutes || 0);
// //   };

// //   const getTimeRange = (timeStr) => {
// //     if (!timeStr || !timeStr.includes(' - ')) return { start: 0, end: 0 };
// //     const [start, end] = timeStr.split(' - ');
// //     return { start: convertToMinutes(start.trim()), end: convertToMinutes(end.trim()) };
// //   };

// //   const isOverlapping = (time1, time2) => {
// //     const t1 = getTimeRange(time1);
// //     const t2 = getTimeRange(time2);
// //     return t1.start < t2.end && t2.start < t1.end;
// //   };

// //   // ✅ DISPATCH USE KIYA
// //   const handleAddEvent = (e) => {
// //     e.preventDefault();
// //     const combinedTime = `${newEvent.startTime} - ${newEvent.endTime}`;

// //     const isClashing = events.some(event =>
// //       event.date === newEvent.date && isOverlapping(event.time, combinedTime) && event.venue.toLowerCase() === newEvent.venue.toLowerCase()
// //     );

// //     if (isClashing) {
// //       showAlert('This time slot is already booked! Please choose another date or time.', 'Time Clash');
// //       return;
// //     }

// //     const newEventData = {
// //       id: events.length ? Math.max(...events.map(e => e.id)) + 1 : 1,
// //       ...newEvent, time: combinedTime,
// //       capacity: newEvent.capacity || 50, participants: 0,
// //       participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [], icon: '📌'
// //     };

// //     if (dispatch) {
// //       dispatch({ type: 'ADD_EVENT', payload: newEventData });
// //     } else {
// //       setEvents([...events, newEventData]);
// //     }

// //     setShowForm(false);
// //     setNewEvent({ title: '', date: '', startTime: '', endTime: '', venue: '', description: '', status: 'upcoming', category: 'tech', capacity: 50, participants: 0 });
// //   };

// //   // ... BAHAI TERA PURA JSX RETURN (bilkul same, ek line change nahi) ...
// //   return (
// //     <div className={`event-page ${darkMode ? 'dark-mode' : ''}`}>
// //       {/* Tera pura JSX copy-paste karega yahan, jo tune diya hai */}
// //       {/* ... */}
// //     </div>
// //   );
// // }

// // export default EventPage;

// import React, { useState, useRef, useEffect } from 'react';
// import './EventPage.css';
// import { useTheme } from './ThemeContext';

// function EventPage({ role, events, setEvents, dispatch, onEventClick, currentMemberId, goToAnalytics }) {
//   const { darkMode } = useTheme();
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [categoryFilter, setCategoryFilter] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showForm, setShowForm] = useState(false);

//   const [onlyMine, setOnlyMine] = useState(false);
//   const [sortBy, setSortBy] = useState('default');

//   const [viewMode, setViewMode] = useState('list');
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(null);

//   const searchInputRef = useRef(null);
//   const titleRef = useRef(null);

//   useEffect(() => {
//     searchInputRef.current?.focus();
//   }, []);

//   useEffect(() => {
//     if (showForm) {
//       setTimeout(() => {
//         titleRef.current?.focus();
//       }, 100);
//     }
//   }, [showForm]);

//   const [confirmModal, setConfirmModal] = useState(false);
//   const [participatingEventId, setParticipatingEventId] = useState(null);

//   const [cancelModal, setCancelModal] = useState(false);
//   const [cancellingEventId, setCancellingEventId] = useState(null);

//   const [actionModal, setActionModal] = useState(false);
//   const [actionEventId, setActionEventId] = useState(null);
//   const [actionType, setActionType] = useState('');

//   const [isAlertVisible, setIsAlertVisible] = useState(false);
//   const [alertText, setAlertText] = useState('');
//   const [alertHeading, setAlertHeading] = useState('');

//   const [showEditForm, setShowEditForm] = useState(false);
//   const [editEvent, setEditEvent] = useState(null);

//   const [selectedIds, setSelectedIds] = useState([]);
//   const [bulkActionModal, setBulkActionModal] = useState(false);
//   const [bulkActionType, setBulkActionType] = useState('');
//   const [bulkStatus, setBulkStatus] = useState('upcoming');
//   const [bulkCategory, setBulkCategory] = useState('tech');

//   const userId = (() => {
//     const mid = currentMemberId ?? sessionStorage.getItem('currentMemberId');
//     if (mid && role) return `${role}_${mid}`;
//     if (role) {
//       let sid = sessionStorage.getItem('__uid');
//       if (!sid) {
//         sid = String(Date.now());
//         sessionStorage.setItem('__uid', sid);
//       }
//       return `${role}_${sid}`;
//     }
//     return null;
//   })();

//   const categories = ['all', ...new Set(events.map(event => event.category))];

//   const filteredEvents = events.filter(event => {
//     const statusMatch = statusFilter === 'all' || event.status === statusFilter;
//     const categoryMatch = categoryFilter === 'all' || event.category === categoryFilter;
//     const searchMatch = searchTerm === '' ||
//       event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       event.description.toLowerCase().includes(searchTerm.toLowerCase());

//     const mineMatch =
//       !onlyMine ||
//       (userId && (event.participantNames || []).includes(userId));

//     return statusMatch && categoryMatch && searchMatch && mineMatch;
//   });

//   const sortedEvents = [...filteredEvents].sort((a, b) => {
//     if (sortBy === 'date-asc') {
//       return new Date(`${a.date}T${(a.time || '').split(' - ')[0] || '00:00'}`)
//            - new Date(`${b.date}T${(b.time || '').split(' - ')[0] || '00:00'}`);
//     }
//     if (sortBy === 'date-desc') {
//       return new Date(`${b.date}T${(b.time || '').split(' - ')[0] || '00:00'}`)
//            - new Date(`${a.date}T${(a.time || '').split(' - ')[0] || '00:00'}`);
//     }
//     if (sortBy === 'popular') {
//       return (b.participants || 0) - (a.participants || 0);
//     }
//     if (sortBy === 'upcoming-first') {
//       const order = { upcoming: 0, ongoing: 1, completed: 2, cancelled: 3 };
//       return (order[a.status] ?? 9) - (order[b.status] ?? 9);
//     }
//     return 0;
//   });

//   const totalEvents = events.length;
//   const upcomingCount = events.filter(e => e.status === 'upcoming').length;
//   const ongoingCount = events.filter(e => e.status === 'ongoing').length;
//   const completedCount = events.filter(e => e.status === 'completed').length;

//   const monthNames = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];
//   const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//   const getDaysInMonth = (date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const firstDay = new Date(year, month, 1).getDay();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();

//     const days = [];
//     for (let i = 0; i < firstDay; i++) days.push(null);
//     for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));
//     return days;
//   };

//   const getEventsForDate = (date) => {
//     if (!date) return [];
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     const dateStr = `${year}-${month}-${day}`;
//     return sortedEvents.filter(e => e.date === dateStr);
//   };

//   const prevMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
//     setSelectedDate(null);
//   };

//   const nextMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
//     setSelectedDate(null);
//   };

//   const deleteEvent = (id) => {
//     if (dispatch) dispatch({ type: 'DELETE_EVENT', payload: id });
//     else setEvents(events.filter(event => event.id !== id));
//   };

//   const handleParticipate = (id) => {
//     const event = events.find(e => e.id === id);
//     if (!event) return;
//     if (!userId) {
//       showAlert('Please login to participate.', 'Login Required');
//       return;
//     }

//     if ((event.participantNames || []).includes(userId)) {
//       showAlert('You have already participated in this event!', 'Already Participated');
//       return;
//     }

//     if ((event.participants || 0) >= (event.capacity || 0)) {
//       showAlert('Event is full! No more participants allowed.', 'Event Full');
//       return;
//     }

//     setParticipatingEventId(id);
//     setConfirmModal(true);
//   };

//   const confirmParticipation = () => {
//     const id = participatingEventId;
//     const event = events.find(e => e.id === id);
//     if (!event) return;
//     if (!userId) return;

//     if ((event.participants || 0) >= (event.capacity || 0)) {
//       showAlert('Event is full! No more participants allowed.', 'Event Full');
//       setConfirmModal(false);
//       setParticipatingEventId(null);
//       return;
//     }

//     if (dispatch) {
//       dispatch({ type: 'PARTICIPATE', payload: { id, userId } });
//     } else {
//       setEvents(events.map(ev => {
//         if (ev.id === id) {
//           return { ...ev, participants: (ev.participants || 0) + 1, participantNames: [...(ev.participantNames || []), userId] };
//         }
//         return ev;
//       }));
//     }

//     setConfirmModal(false);
//     setParticipatingEventId(null);
//     showAlert('You have successfully participated in this event!', 'Participated 🎉');
//   };

//   const handleCancelClick = (id) => {
//     const event = events.find(e => e.id === id);
//     if (!event) return;
//     if (!userId) return;
//     if (!(event.participantNames || []).includes(userId)) return;
//     if (event.status === 'ongoing') {
//       showAlert('Ongoing event se cancel nahi kar sakte.', 'Cannot Cancel');
//       return;
//     }
//     setCancellingEventId(id);
//     setCancelModal(true);
//   };

//   const confirmCancel = () => {
//     const id = cancellingEventId;
//     if (!id || !userId) return;

//     if (dispatch) {
//       dispatch({ type: 'CANCEL_PARTICIPATE', payload: { id, userId } });
//     } else {
//       setEvents(events.map(e => {
//         if (e.id !== id) return e;
//         return {
//           ...e,
//           participants: Math.max(0, (e.participants || 0) - 1),
//           participantNames: (e.participantNames || []).filter(n => n !== userId),
//           attendedBy: (e.attendedBy || []).filter(n => n !== userId),
//           pendingAttendance: (e.pendingAttendance || []).filter(n => n !== userId),
//           rejectedBy: (e.rejectedBy || []).filter(n => n !== userId)
//         };
//       }));
//     }

//     setCancelModal(false);
//     setCancellingEventId(null);
//     showAlert('Participation cancelled.', 'Cancelled');
//   };

//   const handleAction = (id, type) => {
//     const event = events.find(e => e.id === id);
//     if (!event) return;

//     if (type === 'edit') {
//       const [startTime, endTime] = event.time ? event.time.split(' - ') : ['', ''];
//       setEditEvent({
//         id: event.id, title: event.title, date: event.date,
//         startTime: startTime || '', endTime: endTime || '',
//         venue: event.venue, description: event.description,
//         status: event.status, category: event.category, capacity: event.capacity
//       });
//       setShowEditForm(true);
//       return;
//     }

//     setActionEventId(id);
//     setActionType(type);
//     setActionModal(true);
//   };

//   const confirmAction = () => {
//     const id = actionEventId;
//     const type = actionType;

//     if (type === 'delete') {
//       deleteEvent(id);
//     } else if (type === 'complete') {
//       updateStatus(id, 'completed');
//     } else if (type === 'cancel') {
//       updateStatus(id, 'cancelled');
//     }

//     setActionModal(false);
//     setActionEventId(null);
//     setActionType('');
//   };

//   const updateStatus = (id, newStatus) => {
//     if (dispatch) {
//       dispatch({ type: 'UPDATE_EVENT', payload: { id, updates: { status: newStatus } } });
//     } else {
//       setEvents(events.map(event => event.id === id ? { ...event, status: newStatus } : event));
//     }
//   };

//   const handleSaveEdit = (e) => {
//     e.preventDefault();
//     const combinedTime = `${editEvent.startTime} - ${editEvent.endTime}`;

//     if (dispatch) {
//       dispatch({
//         type: 'UPDATE_EVENT',
//         payload: {
//           id: editEvent.id,
//           updates: {
//             title: editEvent.title, date: editEvent.date, time: combinedTime,
//             venue: editEvent.venue, description: editEvent.description,
//             status: editEvent.status, category: editEvent.category, capacity: Number(editEvent.capacity)
//           }
//         }
//       });
//     } else {
//       setEvents(events.map(event =>
//         event.id === editEvent.id
//           ? { ...event, title: editEvent.title, date: editEvent.date, time: combinedTime, venue: editEvent.venue, description: editEvent.description, status: editEvent.status, category: editEvent.category, capacity: Number(editEvent.capacity) }
//           : event
//       ));
//     }

//     setShowEditForm(false);
//     setEditEvent(null);
//   };

//   const showAlert = (message, title) => {
//     setAlertText(message);
//     setAlertHeading(title);
//     setIsAlertVisible(true);
//   };

//   const toggleSelect = (id) => {
//     setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
//   };

//   const selectAll = () => {
//     setSelectedIds(sortedEvents.map(e => e.id));
//   };

//   const clearSelection = () => setSelectedIds([]);

//   const openBulkAction = (type) => {
//     if (selectedIds.length === 0) return;
//     setBulkActionType(type);
//     setBulkActionModal(true);
//   };

//   const confirmBulkAction = () => {
//     if (dispatch) {
//       if (bulkActionType === 'delete') {
//         dispatch({ type: 'SET_EVENTS', payload: events.filter(e => !selectedIds.includes(e.id)) });
//       } else if (bulkActionType === 'status') {
//         dispatch({ type: 'SET_EVENTS', payload: events.map(e => selectedIds.includes(e.id) ? { ...e, status: bulkStatus } : e) });
//       } else if (bulkActionType === 'category') {
//         dispatch({ type: 'SET_EVENTS', payload: events.map(e => selectedIds.includes(e.id) ? { ...e, category: bulkCategory } : e) });
//       }
//     } else {
//       if (bulkActionType === 'delete') {
//         setEvents(events.filter(e => !selectedIds.includes(e.id)));
//       } else if (bulkActionType === 'status') {
//         setEvents(events.map(e => selectedIds.includes(e.id) ? { ...e, status: bulkStatus } : e));
//       } else if (bulkActionType === 'category') {
//         setEvents(events.map(e => selectedIds.includes(e.id) ? { ...e, category: bulkCategory } : e));
//       }
//     }
//     setBulkActionModal(false);
//     setBulkActionType('');
//     setSelectedIds([]);
//   };

//   const [newEvent, setNewEvent] = useState({
//     title: '', date: '', startTime: '', endTime: '', venue: '', description: '', status: 'upcoming', category: 'tech', capacity: 50, participants: 0
//   });

//   const convertToMinutes = (timeStr) => {
//     if (!timeStr) return 0;
//     const [hours, minutes] = timeStr.split(':').map(Number);
//     return hours * 60 + (minutes || 0);
//   };

//   const getTimeRange = (timeStr) => {
//     if (!timeStr || !timeStr.includes(' - ')) return { start: 0, end: 0 };
//     const [start, end] = timeStr.split(' - ');
//     return { start: convertToMinutes(start.trim()), end: convertToMinutes(end.trim()) };
//   };

//   const isOverlapping = (time1, time2) => {
//     const t1 = getTimeRange(time1);
//     const t2 = getTimeRange(time2);
//     return t1.start < t2.end && t2.start < t1.end;
//   };

//   const handleAddEvent = (e) => {
//     e.preventDefault();
//     const combinedTime = `${newEvent.startTime} - ${newEvent.endTime}`;

//     const isClashing = events.some(event =>
//       event.date === newEvent.date && isOverlapping(event.time, combinedTime) && event.venue.toLowerCase() === newEvent.venue.toLowerCase()
//     );

//     if (isClashing) {
//       showAlert('This time slot is already booked! Please choose another date or time.', 'Time Clash');
//       return;
//     }

//     const newEventData = {
//       id: events.length ? Math.max(...events.map(e => e.id)) + 1 : 1,
//       ...newEvent, time: combinedTime,
//       capacity: newEvent.capacity || 50, participants: 0,
//       participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [], icon: '📌'
//     };

//     if (dispatch) {
//       dispatch({ type: 'ADD_EVENT', payload: newEventData });
//     } else {
//       setEvents([...events, newEventData]);
//     }

//     setShowForm(false);
//     setNewEvent({ title: '', date: '', startTime: '', endTime: '', venue: '', description: '', status: 'upcoming', category: 'tech', capacity: 50, participants: 0 });
//   };

//   return (
//     <div className={`event-page ${darkMode ? 'dark-mode' : ''}`}>
//       <div className="event-header">
//         <div className={`event-header-left ${darkMode ? 'dark-mode' : ''}`}>
//           <h2>Events</h2>
//           <p>Manage all your club events in one place.</p>
//         </div>

//         <div className="event-header-actions">
//           {(role === 'admin' || role === 'leader') && (
//             <button className="analytics-btn" onClick={goToAnalytics}>
//               <i className="fa-solid fa-chart-line"></i> View Analytics
//             </button>
//           )}

//           {role === 'admin' || role === 'leader' ? (
//             <button className="create-btn" onClick={() => setShowForm(true)}>
//               <i className="fas fa-plus"></i> Create New Event
//             </button>
//           ) : (
//             <button className="create-btn disabled" disabled>
//               <i className="fas fa-lock"></i> Only Admin Can Create
//             </button>
//           )}
//         </div>
//       </div>

//       {showForm && (
//         <div className="form-overlay">
//           <div className="form-modal">
//             <div className="form-header">
//               <h2>Create New Event</h2>
//               <button className="form-close" onClick={() => setShowForm(false)}>✕</button>
//             </div>
//             <form onSubmit={handleAddEvent}>
//               <div className="form-group">
//                 <label>Event Title</label>
//                 <input
//                   ref={titleRef}
//                   type="text"
//                   placeholder="Enter event title"
//                   value={newEvent.title}
//                   onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
//                   required
//                 />
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Date</label>
//                   <input
//                     type="date"
//                     value={newEvent.date}
//                     onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
//                     required
//                   />
//                 </div>
//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>Start Time</label>
//                     <input
//                       type="time"
//                       value={newEvent.startTime}
//                       onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>End Time</label>
//                     <input
//                       type="time"
//                       value={newEvent.endTime}
//                       onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Venue</label>
//                 <input
//                   type="text"
//                   placeholder="Enter venue"
//                   value={newEvent.venue}
//                   onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Description</label>
//                 <textarea
//                   placeholder="Enter event description"
//                   value={newEvent.description}
//                   onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
//                   required
//                 />
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Status</label>
//                   <select
//                     value={newEvent.status}
//                     onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
//                   >
//                     <option value="upcoming">Upcoming</option>
//                     <option value="ongoing">Ongoing</option>
//                     <option value="completed">Completed</option>
//                     <option value="cancelled">Cancelled</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Category</label>
//                   <select
//                     value={newEvent.category}
//                     onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
//                   >
//                     <option value="tech">Tech</option>
//                     <option value="cultural">Cultural</option>
//                     <option value="sports">Sports</option>
//                     <option value="workshop">Workshop</option>
//                     <option value="social">Social</option>
//                     <option value="academic">Academic</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Event Capacity</label>
//                 <input
//                   type="number"
//                   placeholder="Max participants (e.g., 50)"
//                   value={newEvent.capacity}
//                   onChange={(e) => setNewEvent({ ...newEvent, capacity: Number(e.target.value) })}
//                   required
//                   min="1"
//                 />
//               </div>
//               <div className="form-actions">
//                 <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>Cancel</button>
//                 <button type="submit" className="btn-submit">Create Event</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {showEditForm && editEvent && (
//         <div className="form-overlay">
//           <div className="form-modal">
//             <div className="form-header">
//               <h2>Edit Event</h2>
//               <button className="form-close" onClick={() => setShowEditForm(false)}>✕</button>
//             </div>
//             <form onSubmit={handleSaveEdit}>
//               <div className="form-group">
//                 <label>Event Title</label>
//                 <input
//                   type="text"
//                   value={editEvent.title}
//                   onChange={(e) => setEditEvent({ ...editEvent, title: e.target.value })}
//                   required
//                 />
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Date</label>
//                   <input
//                     type="date"
//                     value={editEvent.date}
//                     onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })}
//                     required
//                   />
//                 </div>
//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>Start Time</label>
//                     <input
//                       type="time"
//                       value={editEvent.startTime}
//                       onChange={(e) => setEditEvent({ ...editEvent, startTime: e.target.value })}
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>End Time</label>
//                     <input
//                       type="time"
//                       value={editEvent.endTime}
//                       onChange={(e) => setEditEvent({ ...editEvent, endTime: e.target.value })}
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Venue</label>
//                 <input
//                   type="text"
//                   value={editEvent.venue}
//                   onChange={(e) => setEditEvent({ ...editEvent, venue: e.target.value })}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Description</label>
//                 <textarea
//                   value={editEvent.description}
//                   onChange={(e) => setEditEvent({ ...editEvent, description: e.target.value })}
//                   required
//                 />
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Status</label>
//                   <select
//                     value={editEvent.status}
//                     onChange={(e) => setEditEvent({ ...editEvent, status: e.target.value })}
//                   >
//                     <option value="upcoming">Upcoming</option>
//                     <option value="ongoing">Ongoing</option>
//                     <option value="completed">Completed</option>
//                     <option value="cancelled">Cancelled</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Category</label>
//                   <select
//                     value={editEvent.category}
//                     onChange={(e) => setEditEvent({ ...editEvent, category: e.target.value })}
//                   >
//                     <option value="tech">Tech</option>
//                     <option value="cultural">Cultural</option>
//                     <option value="sports">Sports</option>
//                     <option value="workshop">Workshop</option>
//                     <option value="social">Social</option>
//                     <option value="academic">Academic</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Event Capacity</label>
//                 <input
//                   type="number"
//                   value={editEvent.capacity}
//                   onChange={(e) => setEditEvent({ ...editEvent, capacity: e.target.value })}
//                   required
//                   min="1"
//                 />
//               </div>
//               <div className="form-actions">
//                 <button type="button" className="btn-cancel" onClick={() => setShowEditForm(false)}>Cancel</button>
//                 <button type="submit" className="btn-submit">Save Changes</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className="search-section">
//         <div className="search-box">
//           <input
//             ref={searchInputRef}
//             type="text"
//             className="search-input"
//             placeholder="Search events by title, category, or description..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <span className="search-results">{sortedEvents.length} events found</span>
//         {(role === 'admin' || role === 'leader') && sortedEvents.length > 0 && (
//           <button
//             className="select-all-btn"
//             onClick={selectedIds.length === sortedEvents.length ? clearSelection : selectAll}
//           >
//             <i className={`fa-solid ${selectedIds.length === sortedEvents.length ? 'fa-square-check' : 'fa-square'}`}></i>
//             {selectedIds.length === sortedEvents.length ? 'Deselect All' : 'Select All'}
//           </button>
//         )}
//       </div>

//       <div className="event-stats">
//         <div className="stat-card">
//           <span className="stat-number">{totalEvents}</span>
//           <span className="stat-label">Total Events</span>
//         </div>
//         <div className="stat-card">
//           <span className="stat-number">{upcomingCount}</span>
//           <span className="stat-label">Upcoming</span>
//         </div>
//         <div className="stat-card">
//           <span className="stat-number">{ongoingCount}</span>
//           <span className="stat-label">Ongoing</span>
//         </div>
//         <div className="stat-card">
//           <span className="stat-number">{completedCount}</span>
//           <span className="stat-label">Completed</span>
//         </div>
//       </div>

//       <div className="filters-section">
//         <div className="filters-left">
//           <div className="filter-group">
//             <label>Status:</label>
//             <div className="filter-buttons">
//               <button className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`} onClick={() => setStatusFilter('all')}>All</button>
//               <button className={`filter-btn ${statusFilter === 'upcoming' ? 'active' : ''}`} onClick={() => setStatusFilter('upcoming')}>Upcoming</button>
//               <button className={`filter-btn ${statusFilter === 'ongoing' ? 'active' : ''}`} onClick={() => setStatusFilter('ongoing')}>Ongoing</button>
//               <button className={`filter-btn ${statusFilter === 'completed' ? 'active' : ''}`} onClick={() => setStatusFilter('completed')}>Completed</button>
//               <button className={`filter-btn ${statusFilter === 'cancelled' ? 'active' : ''}`} onClick={() => setStatusFilter('cancelled')}>Cancelled</button>
//             </div>
//           </div>
//           <div className="filter-group">
//             <label>Category:</label>
//             <div className="filter-buttons">
//               <button className={`filter-btn ${categoryFilter === 'all' ? 'active' : ''}`} onClick={() => setCategoryFilter('all')}>All Categories</button>
//               {categories.map((category) => (
//                 category !== 'all' && (
//                   <button key={category} className={`filter-btn ${categoryFilter === category ? 'active' : ''}`} onClick={() => setCategoryFilter(category)}>
//                     {category.charAt(0).toUpperCase() + category.slice(1)}
//                   </button>
//                 )
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="filters-right">
//           <label htmlFor="sort-select">Sort by:</label>
//           <select
//             id="sort-select"
//             className="sort-select"
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//           >
//             <option value="default">Default</option>
//             <option value="upcoming-first">Upcoming First</option>
//             <option value="date-asc">Date (Oldest First)</option>
//             <option value="date-desc">Date (Newest First)</option>
//             <option value="popular">Most Popular</option>
//           </select>
//         </div>
//       </div>

//       {!(role === 'admin' || role === 'leader') && (
//         <div className="my-events-toggle">
//           <button
//             className={`my-events-btn ${!onlyMine ? 'active' : ''}`}
//             onClick={() => setOnlyMine(false)}
//           >
//             <i className="fa-solid fa-list"></i> All Events
//           </button>
//           <button
//             className={`my-events-btn ${onlyMine ? 'active' : ''}`}
//             onClick={() => setOnlyMine(true)}
//           >
//             <i className="fa-solid fa-user-check"></i> My Events
//           </button>
//         </div>
//       )}

//       <div className="view-toggle">
//         <button
//           className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
//           onClick={() => setViewMode('list')}
//         >
//           <i className="fa-solid fa-list"></i> List
//         </button>
//         <button
//           className={`view-btn ${viewMode === 'calendar' ? 'active' : ''}`}
//           onClick={() => setViewMode('calendar')}
//         >
//           <i className="fa-solid fa-calendar-days"></i> Calendar
//         </button>
//       </div>

//       {sortedEvents.length === 0 ? (
//         <div className="empty-state">
//           <span className="empty-icon">📭</span>
//           <h3>No Events Found</h3>
//           <p>Try adjusting your search or filters.</p>
//         </div>
//       ) : viewMode === 'list' ? (
//         <div className="events-grid">
//           {sortedEvents.map((event) => {
//             const isManager = role === 'admin' || role === 'leader';

//             const isLiveParticipated =
//               !isManager &&
//               event.status === 'ongoing' &&
//               userId &&
//               (event.participantNames || []).includes(userId);

//             const isAttended = !isManager && userId && (event.attendedBy || []).includes(userId);
//             const isPending = !isManager && userId && (event.pendingAttendance || []).includes(userId);

//             const hasParticipated = !isManager && userId && (event.participantNames || []).includes(userId);
//             const isFull = (event.participants || 0) >= (event.capacity || 0);

//             const showParticipate =
//               !isManager &&
//               userId &&
//               event.status === 'upcoming' &&
//               !isFull &&
//               !hasParticipated;

//             const showAlreadyParticipated =
//               !isManager &&
//               userId &&
//               hasParticipated &&
//               event.status !== 'ongoing';

//             const showFull =
//               !isManager &&
//               event.status === 'upcoming' &&
//               isFull &&
//               !hasParticipated;

//             return (
//               <div
//                 key={event.id}
//                 className={`event-card category-${event.category} ${isLiveParticipated ? 'live-participated' : ''} ${selectedIds.includes(event.id) ? 'selected' : ''}`}
//                 onClick={() => onEventClick && onEventClick(event.id)}
//                 style={{ cursor: 'pointer' }}
//               >
//                 {(role === 'admin' || role === 'leader') && (
//                   <div
//                     className="event-checkbox-wrap"
//                     onClick={(e) => { e.stopPropagation(); toggleSelect(event.id); }}
//                   >
//                     <div className={`event-checkbox ${selectedIds.includes(event.id) ? 'checked' : ''}`}>
//                       {selectedIds.includes(event.id) && <i className="fa-solid fa-check"></i>}
//                     </div>
//                   </div>
//                 )}

//                 <div className="event-body">
//                   <div className="event-top">
//                     {isLiveParticipated ? (
//                       <span className="live-badge">
//                         <span className="live-dot"></span> LIVE NOW
//                       </span>
//                     ) : (
//                       <span className={`event-status-badge ${event.status}`}>
//                         {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
//                       </span>
//                     )}
//                   </div>

//                   <h3>{event.title}</h3>
//                   <p className="event-desc">{event.description}</p>

//                   <span className="event-category-tag">
//                     {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
//                   </span>

//                   <div className="event-meta">
//                     <span className="meta-item">
//                       <i className="fa-regular fa-calendar"></i> {event.date}
//                     </span>
//                     <span className="meta-item">
//                       <i className="fa-regular fa-clock"></i> {event.time}
//                     </span>
//                     <span className="meta-item">
//                       <i className="fa-solid fa-location-dot"></i> {event.venue}
//                     </span>
//                     <span className="meta-item">
//                       <i className="fa-solid fa-users"></i> {event.participants} / {event.capacity}
//                     </span>
//                   </div>

//                   <div className="event-footer">
//                     {showParticipate && (
//                       <button
//                         className="status-btn participate-btn"
//                         onClick={(e) => { e.stopPropagation(); handleParticipate(event.id); }}
//                       >
//                         <i className="fa-solid fa-user-plus"></i> Participate
//                       </button>
//                     )}

//                     {showAlreadyParticipated && (
//                       <>
//                         <span className="already-participated">Already Participated</span>
//                         <button
//                           className="status-btn cancel-participation-btn"
//                           onClick={(e) => { e.stopPropagation(); handleCancelClick(event.id); }}
//                         >
//                           <i className="fa-solid fa-xmark"></i> Cancel
//                         </button>
//                       </>
//                     )}

//                     {!isManager && userId && event.status === 'ongoing' && hasParticipated && (
//                       <>
//                         {isAttended && (
//                           <span className="attendance-verified-badge">
//                             <i className="fa-solid fa-circle-check"></i> Attended
//                           </span>
//                         )}
//                         {isPending && (
//                           <span className="attendance-pending-badge">
//                             <i className="fa-solid fa-hourglass-half"></i> Pending
//                           </span>
//                         )}
//                         {!isAttended && !isPending && (
//                           <button
//                             className="status-btn mark-attendance-btn"
//                             onClick={(e) => { e.stopPropagation(); onEventClick(event.id); }}
//                           >
//                             <i className="fa-solid fa-hand"></i> Mark Attendance
//                           </button>
//                         )}
//                       </>
//                     )}

//                     {showFull && <span className="full-badge">Full</span>}

//                     {isManager && (
//                       <div className="event-actions">
//                         {role === 'admin' && (
//                           <button className="status-btn edit-btn" onClick={(e) => { e.stopPropagation(); handleAction(event.id, 'edit'); }}>
//                             <i className="fa-solid fa-pen"></i> Edit
//                           </button>
//                         )}
//                         {event.status !== 'completed' && (
//                           <button className="status-btn complete-btn" onClick={(e) => { e.stopPropagation(); handleAction(event.id, 'complete'); }}>
//                             Mark as Completed
//                           </button>
//                         )}
//                         {event.status !== 'cancelled' && event.status !== 'completed' && (
//                           <button className="status-btn cancel-btn" onClick={(e) => { e.stopPropagation(); handleAction(event.id, 'cancel'); }}>
//                             Cancel
//                           </button>
//                         )}
//                         {role === 'admin' && (
//                           <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleAction(event.id, 'delete'); }}>
//                             Delete
//                           </button>
//                         )}
//                       </div>
//                     )}

//                     {!isManager && (
//                       <span className="event-id">ID: EV-{String(event.id).padStart(3, '0')}</span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <div className="calendar-view">
//           <div className="calendar-header">
//             <button className="calendar-nav-btn" onClick={prevMonth}>
//               <i className="fa-solid fa-chevron-left"></i>
//             </button>
//             <h2 className="calendar-title">
//               {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
//             </h2>
//             <button className="calendar-nav-btn" onClick={nextMonth}>
//               <i className="fa-solid fa-chevron-right"></i>
//             </button>
//           </div>

//           <div className="calendar-days-header">
//             {dayNames.map(day => (
//               <div key={day} className="calendar-day-name">{day}</div>
//             ))}
//           </div>

//           <div className="calendar-grid">
//             {getDaysInMonth(currentMonth).map((date, idx) => {
//               if (!date) {
//                 return <div key={`empty-${idx}`} className="calendar-cell empty"></div>;
//               }
//               const eventsOnDay = getEventsForDate(date);
//               const isToday = date.toDateString() === new Date().toDateString();
//               const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

//               return (
//                 <div
//                   key={date.toISOString()}
//                   className={`calendar-cell ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${eventsOnDay.length > 0 ? 'has-events' : ''}`}
//                   onClick={() => setSelectedDate(date)}
//                 >
//                   <span className="calendar-date">{date.getDate()}</span>
//                   {eventsOnDay.length > 0 && (
//                     <div className="calendar-dots">
//                       {eventsOnDay.slice(0, 3).map((e, i) => (
//                         <span key={i} className={`calendar-dot ${e.category}`}></span>
//                       ))}
//                       {eventsOnDay.length > 3 && (
//                         <span className="calendar-dot-more">+{eventsOnDay.length - 3}</span>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {selectedDate && (
//             <div className="calendar-events-panel">
//               <h3 className="calendar-panel-title">
//                 <i className="fa-solid fa-calendar-check"></i> Events on {selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
//               </h3>
//               {getEventsForDate(selectedDate).length > 0 ? (
//                 <div className="calendar-events-list">
//                   {getEventsForDate(selectedDate).map((event) => (
//                     <div
//                       key={event.id}
//                       className="calendar-event-item"
//                       onClick={() => onEventClick && onEventClick(event.id)}
//                     >
//                       <div className="calendar-event-info">
//                         <h4>{event.title}</h4>
//                         <p>{event.time} · {event.venue}</p>
//                       </div>
//                       <span className={`event-status-badge ${event.status}`}>
//                         {event.status}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="calendar-empty">No events on this day.</p>
//               )}
//             </div>
//           )}
//         </div>
//       )}

//       {selectedIds.length > 0 && (role === 'admin' || role === 'leader') && (
//         <div className="bulk-action-bar">
//           <div className="bulk-left">
//             <span className="bulk-count">
//               <strong>{selectedIds.length}</strong> event{selectedIds.length > 1 ? 's' : ''} selected
//             </span>
//             <button className="bulk-clear" onClick={clearSelection}>
//               <i className="fa-solid fa-xmark"></i> Clear
//             </button>
//           </div>

//           <div className="bulk-actions">
//             <button className="bulk-btn bulk-status" onClick={() => openBulkAction('status')}>
//               <i className="fa-solid fa-arrows-rotate"></i> Change Status
//             </button>
//             <button className="bulk-btn bulk-category" onClick={() => openBulkAction('category')}>
//               <i className="fa-solid fa-tag"></i> Change Category
//             </button>
//             <button className="bulk-btn bulk-delete" onClick={() => openBulkAction('delete')}>
//               <i className="fa-solid fa-trash"></i> Delete
//             </button>
//           </div>
//         </div>
//       )}

//       {bulkActionModal && (
//         <div className="confirm-overlay">
//           <div className="confirm-modal bulk-modal" onClick={(e) => e.stopPropagation()}>
//             <h3>
//               {bulkActionType === 'delete' && 'Delete Events'}
//               {bulkActionType === 'status' && 'Change Status'}
//               {bulkActionType === 'category' && 'Change Category'}
//             </h3>

//             <p>
//               {bulkActionType === 'delete' &&
//                 `Are you sure you want to delete ${selectedIds.length} event${selectedIds.length > 1 ? 's' : ''}?`}
//               {bulkActionType === 'status' &&
//                 `Change status for ${selectedIds.length} event${selectedIds.length > 1 ? 's' : ''}:`}
//               {bulkActionType === 'category' &&
//                 `Change category for ${selectedIds.length} event${selectedIds.length > 1 ? 's' : ''}:`}
//             </p>

//             {bulkActionType === 'status' && (
//               <div className="bulk-select-wrap">
//                 <label>New Status</label>
//                 <select value={bulkStatus} onChange={(e) => setBulkStatus(e.target.value)}>
//                   <option value="upcoming">Upcoming</option>
//                   <option value="ongoing">Ongoing</option>
//                   <option value="completed">Completed</option>
//                   <option value="cancelled">Cancelled</option>
//                 </select>
//               </div>
//             )}

//             {bulkActionType === 'category' && (
//               <div className="bulk-select-wrap">
//                 <label>New Category</label>
//                 <select value={bulkCategory} onChange={(e) => setBulkCategory(e.target.value)}>
//                   <option value="tech">Tech</option>
//                   <option value="cultural">Cultural</option>
//                   <option value="sports">Sports</option>
//                   <option value="workshop">Workshop</option>
//                   <option value="social">Social</option>
//                   <option value="academic">Academic</option>
//                 </select>
//               </div>
//             )}

//             <div className="confirm-actions">
//               <button
//                 className="btn-confirm-cancel"
//                 onClick={() => {
//                   setBulkActionModal(false);
//                   setBulkActionType('');
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 className={`btn-confirm-yes ${bulkActionType === 'delete' ? 'btn-confirm-danger' : ''}`}
//                 onClick={confirmBulkAction}
//               >
//                 {bulkActionType === 'delete' ? 'Delete All' : 'Apply'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {confirmModal && (
//         <div className="confirm-overlay">
//           <div className="confirm-modal">
//             <h3>Confirm Participation</h3>
//             <p>Do you want to participate in this event?</p>
//             <div className="confirm-actions">
//               <button className="btn-confirm-cancel" onClick={() => {
//                 setConfirmModal(false);
//                 setParticipatingEventId(null);
//               }}>
//                 Cancel
//               </button>
//               <button className="btn-confirm-yes" onClick={confirmParticipation}>
//                 Yes, Participate
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {cancelModal && (
//         <div className="confirm-overlay">
//           <div className="confirm-modal">
//             <h3>Cancel Participation</h3>
//             <p>Are you sure you want to cancel your participation for this event?</p>
//             <div className="confirm-actions">
//               <button className="btn-confirm-cancel" onClick={() => {
//                 setCancelModal(false);
//                 setCancellingEventId(null);
//               }}>
//                 No
//               </button>
//               <button className="btn-confirm-yes btn-confirm-danger" onClick={confirmCancel}>
//                 Yes, Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {actionModal && (
//         <div className="confirm-overlay">
//           <div className="confirm-modal">
//             <h3>
//               {actionType === 'delete' && 'Delete Event'}
//               {actionType === 'complete' && 'Complete Event'}
//               {actionType === 'cancel' && 'Cancel Event'}
//             </h3>
//             <p>
//               {actionType === 'delete' && 'Are you sure you want to DELETE this event?'}
//               {actionType === 'complete' && 'Are you sure you want to mark this event as COMPLETED?'}
//               {actionType === 'cancel' && 'Are you sure you want to CANCEL this event?'}
//             </p>
//             <div className="confirm-actions">
//               <button className="btn-confirm-cancel" onClick={() => {
//                 setActionModal(false);
//                 setActionEventId(null);
//                 setActionType('');
//               }}>
//                 Cancel
//               </button>
//               <button className="btn-confirm-yes" onClick={confirmAction}>
//                 Yes, {actionType === 'delete' ? 'Delete' : actionType === 'complete' ? 'Complete' : 'Cancel'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {isAlertVisible && (
//         <div className="confirm-overlay" onClick={() => setIsAlertVisible(false)}>
//           <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
//             <h3>{alertHeading}</h3>
//             <p>{alertText}</p>
//             <div className="confirm-actions">
//               <button className="btn-confirm-yes" onClick={() => setIsAlertVisible(false)}>
//                 OK
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

// export default EventPage;


import React, { useState, useRef, useEffect } from 'react';
import './EventPage.css';
import { useTheme } from './ThemeContext';

function EventPage({ role, events, dispatch, onEventClick, currentMemberId, goToAnalytics }) {
  const { darkMode } = useTheme();
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [onlyMine, setOnlyMine] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  const [viewMode, setViewMode] = useState('list');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const searchInputRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (showForm) {
      setTimeout(() => {
        titleRef.current?.focus();
      }, 100);
    }
  }, [showForm]);

  const [confirmModal, setConfirmModal] = useState(false);
  const [participatingEventId, setParticipatingEventId] = useState(null);

  const [cancelModal, setCancelModal] = useState(false);
  const [cancellingEventId, setCancellingEventId] = useState(null);

  const [actionModal, setActionModal] = useState(false);
  const [actionEventId, setActionEventId] = useState(null);
  const [actionType, setActionType] = useState('');

  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [alertHeading, setAlertHeading] = useState('');

  const [showEditForm, setShowEditForm] = useState(false);
  const [editEvent, setEditEvent] = useState(null);

  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkActionModal, setBulkActionModal] = useState(false);
  const [bulkActionType, setBulkActionType] = useState('');
  const [bulkStatus, setBulkStatus] = useState('upcoming');
  const [bulkCategory, setBulkCategory] = useState('tech');

  const userId = (() => {
    const mid = currentMemberId ?? sessionStorage.getItem('currentMemberId');
    if (mid && role) return `${role}_${mid}`;
    if (role) {
      let sid = sessionStorage.getItem('__uid');
      if (!sid) {
        sid = String(Date.now());
        sessionStorage.setItem('__uid', sid);
      }
      return `${role}_${sid}`;
    }
    return null;
  })();

  const categories = ['all', ...new Set(events.map(event => event.category))];

  const filteredEvents = events.filter(event => {
    const statusMatch = statusFilter === 'all' || event.status === statusFilter;
    const categoryMatch = categoryFilter === 'all' || event.category === categoryFilter;
    const searchMatch = searchTerm === '' ||
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());

    const mineMatch = !onlyMine || (userId && (event.participantNames || []).includes(userId));

    return statusMatch && categoryMatch && searchMatch && mineMatch;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'date-asc') {
      return new Date(`${a.date}T${(a.time || '').split(' - ')[0] || '00:00'}`)
           - new Date(`${b.date}T${(b.time || '').split(' - ')[0] || '00:00'}`);
    }
    if (sortBy === 'date-desc') {
      return new Date(`${b.date}T${(b.time || '').split(' - ')[0] || '00:00'}`)
           - new Date(`${a.date}T${(a.time || '').split(' - ')[0] || '00:00'}`);
    }
    if (sortBy === 'popular') {
      return (b.participants || 0) - (a.participants || 0);
    }
    if (sortBy === 'upcoming-first') {
      const order = { upcoming: 0, ongoing: 1, completed: 2, cancelled: 3 };
      return (order[a.status] ?? 9) - (order[b.status] ?? 9);
    }
    return 0;
  });

  const totalEvents = events.length;
  const upcomingCount = events.filter(e => e.status === 'upcoming').length;
  const ongoingCount = events.filter(e => e.status === 'ongoing').length;
  const completedCount = events.filter(e => e.status === 'completed').length;

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));
    return days;
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    return sortedEvents.filter(e => e.date === dateStr);
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const deleteEvent = (id) => {
    dispatch({ type: 'DELETE_EVENT', payload: id });
  };

  const handleParticipate = (id) => {
    const event = events.find(e => e.id === id);
    if (!event) return;
    if (!userId) {
      showAlert('Please login to participate.', 'Login Required');
      return;
    }

    if ((event.participantNames || []).includes(userId)) {
      showAlert('You have already participated in this event!', 'Already Participated');
      return;
    }

    if ((event.participants || 0) >= (event.capacity || 0)) {
      showAlert('Event is full! No more participants allowed.', 'Event Full');
      return;
    }

    setParticipatingEventId(id);
    setConfirmModal(true);
  };

  const confirmParticipation = () => {
    const id = participatingEventId;
    const event = events.find(e => e.id === id);
    if (!event) return;
    if (!userId) return;

    if ((event.participants || 0) >= (event.capacity || 0)) {
      showAlert('Event is full! No more participants allowed.', 'Event Full');
      setConfirmModal(false);
      setParticipatingEventId(null);
      return;
    }

    dispatch({ type: 'PARTICIPATE', payload: { id, userId } });

    setConfirmModal(false);
    setParticipatingEventId(null);
    showAlert('You have successfully participated in this event!', 'Participated 🎉');
  };

  const handleCancelClick = (id) => {
    const event = events.find(e => e.id === id);
    if (!event) return;
    if (!userId) return;
    if (!(event.participantNames || []).includes(userId)) return;
    if (event.status === 'ongoing') {
      showAlert('Ongoing event se cancel nahi kar sakte.', 'Cannot Cancel');
      return;
    }
    setCancellingEventId(id);
    setCancelModal(true);
  };

  const confirmCancel = () => {
    const id = cancellingEventId;
    if (!id || !userId) return;
    dispatch({ type: 'CANCEL_PARTICIPATE', payload: { id, userId } });
    setCancelModal(false);
    setCancellingEventId(null);
    showAlert('Participation cancelled.', 'Cancelled');
  };

  const handleAction = (id, type) => {
    const event = events.find(e => e.id === id);
    if (!event) return;

    if (type === 'edit') {
      const [startTime, endTime] = event.time ? event.time.split(' - ') : ['', ''];
      setEditEvent({
        id: event.id, title: event.title, date: event.date,
        startTime: startTime || '', endTime: endTime || '',
        venue: event.venue, description: event.description,
        status: event.status, category: event.category, capacity: event.capacity
      });
      setShowEditForm(true);
      return;
    }

    setActionEventId(id);
    setActionType(type);
    setActionModal(true);
  };

  const confirmAction = () => {
    const id = actionEventId;
    const type = actionType;

    if (type === 'delete') {
      deleteEvent(id);
    } else if (type === 'complete') {
      updateStatus(id, 'completed');
    } else if (type === 'cancel') {
      updateStatus(id, 'cancelled');
    }

    setActionModal(false);
    setActionEventId(null);
    setActionType('');
  };

  const updateStatus = (id, newStatus) => {
    dispatch({ type: 'UPDATE_EVENT', payload: { id, updates: { status: newStatus } } });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const combinedTime = `${editEvent.startTime} - ${editEvent.endTime}`;

    dispatch({
      type: 'UPDATE_EVENT',
      payload: {
        id: editEvent.id,
        updates: {
          title: editEvent.title, date: editEvent.date, time: combinedTime,
          venue: editEvent.venue, description: editEvent.description,
          status: editEvent.status, category: editEvent.category, capacity: Number(editEvent.capacity)
        }
      }
    });

    setShowEditForm(false);
    setEditEvent(null);
  };

  const showAlert = (message, title) => {
    setAlertText(message);
    setAlertHeading(title);
    setIsAlertVisible(true);
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const selectAll = () => {
    setSelectedIds(sortedEvents.map(e => e.id));
  };

  const clearSelection = () => setSelectedIds([]);

  const openBulkAction = (type) => {
    if (selectedIds.length === 0) return;
    setBulkActionType(type);
    setBulkActionModal(true);
  };

  const confirmBulkAction = () => {
    if (bulkActionType === 'delete') {
      dispatch({ type: 'SET_EVENTS', payload: events.filter(e => !selectedIds.includes(e.id)) });
    } else if (bulkActionType === 'status') {
      dispatch({ type: 'SET_EVENTS', payload: events.map(e => selectedIds.includes(e.id) ? { ...e, status: bulkStatus } : e) });
    } else if (bulkActionType === 'category') {
      dispatch({ type: 'SET_EVENTS', payload: events.map(e => selectedIds.includes(e.id) ? { ...e, category: bulkCategory } : e) });
    }
    setBulkActionModal(false);
    setBulkActionType('');
    setSelectedIds([]);
  };

  const [newEvent, setNewEvent] = useState({
    title: '', date: '', startTime: '', endTime: '', venue: '', description: '', status: 'upcoming', category: 'tech', capacity: 50, participants: 0
  });

  const convertToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + (minutes || 0);
  };

  const getTimeRange = (timeStr) => {
    if (!timeStr || !timeStr.includes(' - ')) return { start: 0, end: 0 };
    const [start, end] = timeStr.split(' - ');
    return { start: convertToMinutes(start.trim()), end: convertToMinutes(end.trim()) };
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
      event.date === newEvent.date && isOverlapping(event.time, combinedTime) && event.venue.toLowerCase() === newEvent.venue.toLowerCase()
    );

    if (isClashing) {
      showAlert('This time slot is already booked! Please choose another date or time.', 'Time Clash');
      return;
    }

    const newEventData = {
      id: events.length ? Math.max(...events.map(e => e.id)) + 1 : 1,
      ...newEvent, time: combinedTime,
      capacity: newEvent.capacity || 50, participants: 0,
      participantNames: [], attendedBy: [], pendingAttendance: [], rejectedBy: [], icon: '📌'
    };

    dispatch({ type: 'ADD_EVENT', payload: newEventData });

    setShowForm(false);
    setNewEvent({ title: '', date: '', startTime: '', endTime: '', venue: '', description: '', status: 'upcoming', category: 'tech', capacity: 50, participants: 0 });
  };

  return (
    <div className={`event-page ${darkMode ? 'dark-mode' : ''}`}>
      <div className="event-header">
        <div className={`event-header-left ${darkMode ? 'dark-mode' : ''}`}>
          <h2>Events</h2>
          <p>Manage all your club events in one place.</p>
        </div>

        <div className="event-header-actions">
          {(role === 'admin' || role === 'leader') && (
            <button className="analytics-btn" onClick={goToAnalytics}>
              <i className="fa-solid fa-chart-line"></i> View Analytics
            </button>
          )}

          {role === 'admin' || role === 'leader' ? (
            <button className="create-btn" onClick={() => setShowForm(true)}>
              <i className="fas fa-plus"></i> Create New Event
            </button>
          ) : (
            <button className="create-btn disabled" disabled>
              <i className="fas fa-lock"></i> Only Admin Can Create
            </button>
          )}
        </div>
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
                  ref={titleRef}
                  type="text"
                  placeholder="Enter event title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Start Time</label>
                    <input
                      type="time"
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>End Time</label>
                    <input
                      type="time"
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
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
                  onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  placeholder="Enter event description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={newEvent.status}
                    onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
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
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
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
                  onChange={(e) => setNewEvent({ ...newEvent, capacity: Number(e.target.value) })}
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

      {showEditForm && editEvent && (
        <div className="form-overlay">
          <div className="form-modal">
            <div className="form-header">
              <h2>Edit Event</h2>
              <button className="form-close" onClick={() => setShowEditForm(false)}>✕</button>
            </div>
            <form onSubmit={handleSaveEdit}>
              <div className="form-group">
                <label>Event Title</label>
                <input
                  type="text"
                  value={editEvent.title}
                  onChange={(e) => setEditEvent({ ...editEvent, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={editEvent.date}
                    onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Start Time</label>
                    <input
                      type="time"
                      value={editEvent.startTime}
                      onChange={(e) => setEditEvent({ ...editEvent, startTime: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>End Time</label>
                    <input
                      type="time"
                      value={editEvent.endTime}
                      onChange={(e) => setEditEvent({ ...editEvent, endTime: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Venue</label>
                <input
                  type="text"
                  value={editEvent.venue}
                  onChange={(e) => setEditEvent({ ...editEvent, venue: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={editEvent.description}
                  onChange={(e) => setEditEvent({ ...editEvent, description: e.target.value })}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={editEvent.status}
                    onChange={(e) => setEditEvent({ ...editEvent, status: e.target.value })}
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
                    value={editEvent.category}
                    onChange={(e) => setEditEvent({ ...editEvent, category: e.target.value })}
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
                  value={editEvent.capacity}
                  onChange={(e) => setEditEvent({ ...editEvent, capacity: e.target.value })}
                  required
                  min="1"
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowEditForm(false)}>Cancel</button>
                <button type="submit" className="btn-submit">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="search-section">
        <div className="search-box">
          <input
            ref={searchInputRef}
            type="text"
            className="search-input"
            placeholder="Search events by title, category, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <span className="search-results">{sortedEvents.length} events found</span>
        {(role === 'admin' || role === 'leader') && sortedEvents.length > 0 && (
          <button
            className="select-all-btn"
            onClick={selectedIds.length === sortedEvents.length ? clearSelection : selectAll}
          >
            <i className={`fa-solid ${selectedIds.length === sortedEvents.length ? 'fa-square-check' : 'fa-square'}`}></i>
            {selectedIds.length === sortedEvents.length ? 'Deselect All' : 'Select All'}
          </button>
        )}
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
        <div className="filters-left">
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

        <div className="filters-right">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="upcoming-first">Upcoming First</option>
            <option value="date-asc">Date (Oldest First)</option>
            <option value="date-desc">Date (Newest First)</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      {!(role === 'admin' || role === 'leader') && (
        <div className="my-events-toggle">
          <button
            className={`my-events-btn ${!onlyMine ? 'active' : ''}`}
            onClick={() => setOnlyMine(false)}
          >
            <i className="fa-solid fa-list"></i> All Events
          </button>
          <button
            className={`my-events-btn ${onlyMine ? 'active' : ''}`}
            onClick={() => setOnlyMine(true)}
          >
            <i className="fa-solid fa-user-check"></i> My Events
          </button>
        </div>
      )}

      <div className="view-toggle">
        <button
          className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
          onClick={() => setViewMode('list')}
        >
          <i className="fa-solid fa-list"></i> List
        </button>
        <button
          className={`view-btn ${viewMode === 'calendar' ? 'active' : ''}`}
          onClick={() => setViewMode('calendar')}
        >
          <i className="fa-solid fa-calendar-days"></i> Calendar
        </button>
      </div>

      {sortedEvents.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📭</span>
          <h3>No Events Found</h3>
          <p>Try adjusting your search or filters.</p>
        </div>
      ) : viewMode === 'list' ? (
        <div className="events-grid">
          {sortedEvents.map((event) => {
            const isManager = role === 'admin' || role === 'leader';

            const isLiveParticipated =
              !isManager &&
              event.status === 'ongoing' &&
              userId &&
              (event.participantNames || []).includes(userId);

            const isAttended = !isManager && userId && (event.attendedBy || []).includes(userId);
            const isPending = !isManager && userId && (event.pendingAttendance || []).includes(userId);

            const hasParticipated = !isManager && userId && (event.participantNames || []).includes(userId);
            const isFull = (event.participants || 0) >= (event.capacity || 0);

            const showParticipate =
              !isManager &&
              userId &&
              event.status === 'upcoming' &&
              !isFull &&
              !hasParticipated;

            const showAlreadyParticipated =
              !isManager &&
              userId &&
              hasParticipated &&
              event.status !== 'ongoing';

            const showFull =
              !isManager &&
              event.status === 'upcoming' &&
              isFull &&
              !hasParticipated;

            return (
              <div
                key={event.id}
                className={`event-card category-${event.category} ${isLiveParticipated ? 'live-participated' : ''} ${selectedIds.includes(event.id) ? 'selected' : ''}`}
                onClick={() => onEventClick && onEventClick(event.id)}
                style={{ cursor: 'pointer' }}
              >
              <div 
                className="event-checkbox-wrap" 
                onClick={(e) => e.stopPropagation()}
              >
                <input 
                  type="checkbox" 
                  className="native-checkbox"
                  checked={selectedIds.includes(event.id)}
                  onChange={() => toggleSelect(event.id)}
                />
              </div>
                <div className="event-body">
                  <div className="event-top">
                    {isLiveParticipated ? (
                      <span className="live-badge">
                        <span className="live-dot"></span> LIVE NOW
                      </span>
                    ) : (
                      <span className={`event-status-badge ${event.status}`}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                    )}
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
                    {showParticipate && (
                      <button
                        className="status-btn participate-btn"
                        onClick={(e) => { e.stopPropagation(); handleParticipate(event.id); }}
                      >
                        <i className="fa-solid fa-user-plus"></i> Participate
                      </button>
                    )}

                    {showAlreadyParticipated && (
                      <>
                        <span className="already-participated">Already Participated</span>
                        <button
                          className="status-btn cancel-participation-btn"
                          onClick={(e) => { e.stopPropagation(); handleCancelClick(event.id); }}
                        >
                          <i className="fa-solid fa-xmark"></i> Cancel
                        </button>
                      </>
                    )}

                    {!isManager && userId && event.status === 'ongoing' && hasParticipated && (
                      <>
                        {isAttended && (
                          <span className="attendance-verified-badge">
                            <i className="fa-solid fa-circle-check"></i> Attended
                          </span>
                        )}
                        {isPending && (
                          <span className="attendance-pending-badge">
                            <i className="fa-solid fa-hourglass-half"></i> Pending
                          </span>
                        )}
                        {!isAttended && !isPending && (
                          <button
                            className="status-btn mark-attendance-btn"
                            onClick={(e) => { e.stopPropagation(); onEventClick(event.id); }}
                          >
                            <i className="fa-solid fa-hand"></i> Mark Attendance
                          </button>
                        )}
                      </>
                    )}

                    {showFull && <span className="full-badge">Full</span>}

                    {isManager && (
                      <div className="event-actions">
                        {role === 'admin' && (
                          <button className="status-btn edit-btn" onClick={(e) => { e.stopPropagation(); handleAction(event.id, 'edit'); }}>
                            <i className="fa-solid fa-pen"></i> Edit
                          </button>
                        )}
                        {event.status !== 'completed' && (
                          <button className="status-btn complete-btn" onClick={(e) => { e.stopPropagation(); handleAction(event.id, 'complete'); }}>
                            Mark as Completed
                          </button>
                        )}
                        {event.status !== 'cancelled' && event.status !== 'completed' && (
                          <button className="status-btn cancel-btn" onClick={(e) => { e.stopPropagation(); handleAction(event.id, 'cancel'); }}>
                            Cancel
                          </button>
                        )}
                        {role === 'admin' && (
                          <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleAction(event.id, 'delete'); }}>
                            Delete
                          </button>
                        )}
                      </div>
                    )}

                    {!isManager && (
                      <span className="event-id">ID: EV-{String(event.id).padStart(3, '0')}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="calendar-view">
          <div className="calendar-header">
            <button className="calendar-nav-btn" onClick={prevMonth}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <h2 className="calendar-title">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <button className="calendar-nav-btn" onClick={nextMonth}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>

          <div className="calendar-days-header">
            {dayNames.map(day => (
              <div key={day} className="calendar-day-name">{day}</div>
            ))}
          </div>

          <div className="calendar-grid">
            {getDaysInMonth(currentMonth).map((date, idx) => {
              if (!date) {
                return <div key={`empty-${idx}`} className="calendar-cell empty"></div>;
              }
              const eventsOnDay = getEventsForDate(date);
              const isToday = date.toDateString() === new Date().toDateString();
              const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

              return (
                <div
                  key={date.toISOString()}
                  className={`calendar-cell ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${eventsOnDay.length > 0 ? 'has-events' : ''}`}
                  onClick={() => setSelectedDate(date)}
                >
                  <span className="calendar-date">{date.getDate()}</span>
                  {eventsOnDay.length > 0 && (
                    <div className="calendar-dots">
                      {eventsOnDay.slice(0, 3).map((e, i) => (
                        <span key={i} className={`calendar-dot ${e.category}`}></span>
                      ))}
                      {eventsOnDay.length > 3 && (
                        <span className="calendar-dot-more">+{eventsOnDay.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {selectedDate && (
            <div className="calendar-events-panel">
              <h3 className="calendar-panel-title">
                <i className="fa-solid fa-calendar-check"></i> Events on {selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
              </h3>
              {getEventsForDate(selectedDate).length > 0 ? (
                <div className="calendar-events-list">
                  {getEventsForDate(selectedDate).map((event) => (
                    <div
                      key={event.id}
                      className="calendar-event-item"
                      onClick={() => onEventClick && onEventClick(event.id)}
                    >
                      <div className="calendar-event-info">
                        <h4>{event.title}</h4>
                        <p>{event.time} · {event.venue}</p>
                      </div>
                      <span className={`event-status-badge ${event.status}`}>
                        {event.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="calendar-empty">No events on this day.</p>
              )}
            </div>
          )}
        </div>
      )}

      {selectedIds.length > 0 && (role === 'admin' || role === 'leader') && (
        <div className="bulk-action-bar">
          <div className="bulk-left">
            <span className="bulk-count">
              <strong>{selectedIds.length}</strong> event{selectedIds.length > 1 ? 's' : ''} selected
            </span>
            <button className="bulk-clear" onClick={clearSelection}>
              <i className="fa-solid fa-xmark"></i> Clear
            </button>
          </div>

          <div className="bulk-actions">
            <button className="bulk-btn bulk-status" onClick={() => openBulkAction('status')}>
              <i className="fa-solid fa-arrows-rotate"></i> Change Status
            </button>
            <button className="bulk-btn bulk-category" onClick={() => openBulkAction('category')}>
              <i className="fa-solid fa-tag"></i> Change Category
            </button>
            <button className="bulk-btn bulk-delete" onClick={() => openBulkAction('delete')}>
              <i className="fa-solid fa-trash"></i> Delete
            </button>
          </div>
        </div>
      )}

      {bulkActionModal && (
        <div className="confirm-overlay">
          <div className="confirm-modal bulk-modal" onClick={(e) => e.stopPropagation()}>
            <h3>
              {bulkActionType === 'delete' && 'Delete Events'}
              {bulkActionType === 'status' && 'Change Status'}
              {bulkActionType === 'category' && 'Change Category'}
            </h3>

            <p>
              {bulkActionType === 'delete' &&
                `Are you sure you want to delete ${selectedIds.length} event${selectedIds.length > 1 ? 's' : ''}?`}
              {bulkActionType === 'status' &&
                `Change status for ${selectedIds.length} event${selectedIds.length > 1 ? 's' : ''}:`}
              {bulkActionType === 'category' &&
                `Change category for ${selectedIds.length} event${selectedIds.length > 1 ? 's' : ''}:`}
            </p>

            {bulkActionType === 'status' && (
              <div className="bulk-select-wrap">
                <label>New Status</label>
                <select value={bulkStatus} onChange={(e) => setBulkStatus(e.target.value)}>
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            )}

            {bulkActionType === 'category' && (
              <div className="bulk-select-wrap">
                <label>New Category</label>
                <select value={bulkCategory} onChange={(e) => setBulkCategory(e.target.value)}>
                  <option value="tech">Tech</option>
                  <option value="cultural">Cultural</option>
                  <option value="sports">Sports</option>
                  <option value="workshop">Workshop</option>
                  <option value="social">Social</option>
                  <option value="academic">Academic</option>
                </select>
              </div>
            )}

            <div className="confirm-actions">
              <button
                className="btn-confirm-cancel"
                onClick={() => {
                  setBulkActionModal(false);
                  setBulkActionType('');
                }}
              >
                Cancel
              </button>
              <button
                className={`btn-confirm-yes ${bulkActionType === 'delete' ? 'btn-confirm-danger' : ''}`}
                onClick={confirmBulkAction}
              >
                {bulkActionType === 'delete' ? 'Delete All' : 'Apply'}
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmModal && (
        <div className="confirm-overlay">
          <div className="confirm-modal">
            <h3>Confirm Participation</h3>
            <p>Do you want to participate in this event?</p>
            <div className="confirm-actions">
              <button className="btn-confirm-cancel" onClick={() => {
                setConfirmModal(false);
                setParticipatingEventId(null);
              }}>
                Cancel
              </button>
              <button className="btn-confirm-yes" onClick={confirmParticipation}>
                Yes, Participate
              </button>
            </div>
          </div>
        </div>
      )}

      {cancelModal && (
        <div className="confirm-overlay">
          <div className="confirm-modal">
            <h3>Cancel Participation</h3>
            <p>Are you sure you want to cancel your participation for this event?</p>
            <div className="confirm-actions">
              <button className="btn-confirm-cancel" onClick={() => {
                setCancelModal(false);
                setCancellingEventId(null);
              }}>
                No
              </button>
              <button className="btn-confirm-yes btn-confirm-danger" onClick={confirmCancel}>
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {actionModal && (
        <div className="confirm-overlay">
          <div className="confirm-modal">
            <h3>
              {actionType === 'delete' && 'Delete Event'}
              {actionType === 'complete' && 'Complete Event'}
              {actionType === 'cancel' && 'Cancel Event'}
            </h3>
            <p>
              {actionType === 'delete' && 'Are you sure you want to DELETE this event?'}
              {actionType === 'complete' && 'Are you sure you want to mark this event as COMPLETED?'}
              {actionType === 'cancel' && 'Are you sure you want to CANCEL this event?'}
            </p>
            <div className="confirm-actions">
              <button className="btn-confirm-cancel" onClick={() => {
                setActionModal(false);
                setActionEventId(null);
                setActionType('');
              }}>
                Cancel
              </button>
              <button className="btn-confirm-yes" onClick={confirmAction}>
                Yes, {actionType === 'delete' ? 'Delete' : actionType === 'complete' ? 'Complete' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isAlertVisible && (
        <div className="confirm-overlay" onClick={() => setIsAlertVisible(false)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{alertHeading}</h3>
            <p>{alertText}</p>
            <div className="confirm-actions">
              <button className="btn-confirm-yes" onClick={() => setIsAlertVisible(false)}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default EventPage;