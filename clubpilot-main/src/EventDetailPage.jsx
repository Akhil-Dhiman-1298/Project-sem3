// // // // // // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // // // // // import "./EventDetailPage.css";
// // // // // // // // // // // // // import { useTheme } from './ThemeContext';
// // // // // // // // // // // // // import QRCode from 'react-qr-code';

// // // // // // // // // // // // // const fixEventStatus = (event) => {
// // // // // // // // // // // // //   if (!event) return 'upcoming';
// // // // // // // // // // // // //   if (event.status === 'cancelled' || event.status === 'completed') return event.status;
// // // // // // // // // // // // //   const now = new Date();
// // // // // // // // // // // // //   const [startStr, endStr] = (event.time || '').split(' - ');
// // // // // // // // // // // // //   if (!event.date || !startStr || !endStr) return event.status;
  
// // // // // // // // // // // // //   const start = new Date(`${event.date}T${startStr.trim()}:00`);
// // // // // // // // // // // // //   const end = new Date(`${event.date}T${endStr.trim()}:00`);
  
// // // // // // // // // // // // //   if (now >= start && now < end) return 'ongoing';
// // // // // // // // // // // // //   if (now >= end) return 'completed';
// // // // // // // // // // // // //   return 'upcoming';
// // // // // // // // // // // // // };

// // // // // // // // // // // // // const formatDate = (dateString) => {
// // // // // // // // // // // // //   if (!dateString) return '';
// // // // // // // // // // // // //   const d = new Date(dateString);
// // // // // // // // // // // // //   if (isNaN(d.getTime())) return dateString; 
// // // // // // // // // // // // //   const year = d.getFullYear();
// // // // // // // // // // // // //   const month = String(d.getMonth() + 1).padStart(2, '0');
// // // // // // // // // // // // //   const day = String(d.getDate()).padStart(2, '0');
// // // // // // // // // // // // //   return `${year}-${month}-${day}`;
// // // // // // // // // // // // // };

// // // // // // // // // // // // // function EventDetailPage({ eventId, onBack, role, currentMemberId, dispatch }) {
// // // // // // // // // // // // //   const { darkMode } = useTheme();
// // // // // // // // // // // // //   const [event, setEvent] = useState(null);
// // // // // // // // // // // // //   const [loading, setLoading] = useState(true);
  
// // // // // // // // // // // // //   const [showTicket, setShowTicket] = useState(false);
// // // // // // // // // // // // //   const [showNotifDropdown, setShowNotifDropdown] = useState(false);
// // // // // // // // // // // // //   const [showOtpModal, setShowOtpModal] = useState(false);
  
// // // // // // // // // // // // //   const [otpInput, setOtpInput] = useState('');
// // // // // // // // // // // // //   const [generatedOtp, setGeneratedOtp] = useState('');
// // // // // // // // // // // // //   const [otpError, setOtpError] = useState('');

// // // // // // // // // // // // //   const [isAlertVisible, setIsAlertVisible] = useState(false);
// // // // // // // // // // // // //   const [alertText, setAlertText] = useState('');
// // // // // // // // // // // // //   const [alertHeading, setAlertHeading] = useState('');

// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     const fetchEvent = async () => {
// // // // // // // // // // // // //       try {
// // // // // // // // // // // // //         const res = await fetch('http://localhost:5000/api/events');
// // // // // // // // // // // // //         if (!res.ok) throw new Error("Backend error");
        
// // // // // // // // // // // // //         const allEvents = await res.json();
// // // // // // // // // // // // //         if (Array.isArray(allEvents)) {
// // // // // // // // // // // // //           const found = allEvents.find(e => String(e.id) === String(eventId));
// // // // // // // // // // // // //           if (found) setEvent(found);
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //       } catch (err) {
// // // // // // // // // // // // //         console.error("🔥 FETCH EVENT ERROR:", err.message);
// // // // // // // // // // // // //       } finally {
// // // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     };
// // // // // // // // // // // // //     fetchEvent();
// // // // // // // // // // // // //   }, [eventId]);

// // // // // // // // // // // // //   if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading event details...</div>;

// // // // // // // // // // // // //   if (!event) {
// // // // // // // // // // // // //     return (
// // // // // // // // // // // // //       <div className="edp-wrap">
// // // // // // // // // // // // //         <button className="edp-back" onClick={onBack}>
// // // // // // // // // // // // //           <i className="fa-solid fa-arrow-left"></i> Back to Events
// // // // // // // // // // // // //         </button>
// // // // // // // // // // // // //         <div className="edp-notfound">
// // // // // // // // // // // // //           <h1>Event Not Found</h1>
// // // // // // // // // // // // //           <p>The event you are looking for does not exist or backend is down.</p>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //       </div>
// // // // // // // // // // // // //     );
// // // // // // // // // // // // //   }

// // // // // // // // // // // // //   const actualStatus = fixEventStatus(event);
// // // // // // // // // // // // //   const capacity = event.capacity || 50;
// // // // // // // // // // // // //   const participants = event.participants || 0;
// // // // // // // // // // // // //   const percentage = Math.round((participants / capacity) * 100);
// // // // // // // // // // // // //   const seatsLeft = capacity - participants;
  
// // // // // // // // // // // // //   const userId = (() => {
// // // // // // // // // // // // //     const mid = currentMemberId ?? sessionStorage.getItem('currentMemberId');
// // // // // // // // // // // // //     if (mid && role) return `${role}_${mid}`;
// // // // // // // // // // // // //     if (role) {
// // // // // // // // // // // // //       let sid = sessionStorage.getItem('__uid');
// // // // // // // // // // // // //       if (!sid) {
// // // // // // // // // // // // //         sid = String(Date.now());
// // // // // // // // // // // // //         sessionStorage.setItem('__uid', sid);
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //       return `${role}_${sid}`;
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //     return null;
// // // // // // // // // // // // //   })();

// // // // // // // // // // // // //   const attendedBy = event.attendedBy || [];
// // // // // // // // // // // // //   const pendingAttendance = event.pendingAttendance || [];
// // // // // // // // // // // // //   const rejectedBy = event.rejectedBy || [];
// // // // // // // // // // // // //   const participantNames = event.participantNames || [];

// // // // // // // // // // // // //   const isRegistered = userId ? participantNames.includes(userId) : false;
// // // // // // // // // // // // //   const isUserAttended = userId ? attendedBy.includes(userId) : false;
// // // // // // // // // // // // //   const isUserPending = userId ? pendingAttendance.includes(userId) : false;
// // // // // // // // // // // // //   const isUserRejected = userId ? rejectedBy.includes(userId) : false;

// // // // // // // // // // // // //   const nonPendingParticipants = participantNames.filter(
// // // // // // // // // // // // //     (name) => !pendingAttendance.includes(name)
// // // // // // // // // // // // //   );

// // // // // // // // // // // // //   const getStatusClass = (status) => status.toLowerCase().replace(/ /g, "-");

// // // // // // // // // // // // //   const formatName = (name) => {
// // // // // // // // // // // // //     if (name.startsWith("user_")) return `User ${name.slice(5)}`;
// // // // // // // // // // // // //     if (name.startsWith("core-member_")) return `Core Member ${name.slice(12)}`;
// // // // // // // // // // // // //     if (name.startsWith("admin")) return "Admin";
// // // // // // // // // // // // //     if (name.startsWith("leader")) return "Leader";
// // // // // // // // // // // // //     if (name.startsWith("user")) return `User ${name.replace("user", "")}`;
// // // // // // // // // // // // //     if (name.startsWith("member")) return `Member ${name.replace("member", "")}`;
// // // // // // // // // // // // //     return name;
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const ticketUrl = `${window.location.origin}/events/${event.id}`;

// // // // // // // // // // // // //   const updateDB = async (updatedFields) => {
// // // // // // // // // // // // //     const bodyData = {
// // // // // // // // // // // // //       participant_names: updatedFields.participantNames ?? participantNames,
// // // // // // // // // // // // //       attended_by: updatedFields.attendedBy ?? attendedBy,
// // // // // // // // // // // // //       pending_attendance: updatedFields.pendingAttendance ?? pendingAttendance,
// // // // // // // // // // // // //       participants: updatedFields.participants ?? participants,
// // // // // // // // // // // // //       status: updatedFields.status ?? event.status,
// // // // // // // // // // // // //       rejected_by: updatedFields.rejectedBy ?? rejectedBy,
// // // // // // // // // // // // //     };

// // // // // // // // // // // // //     await fetch(`http://localhost:5000/api/events/${event.id}`, {
// // // // // // // // // // // // //       method: 'PATCH',
// // // // // // // // // // // // //       headers: { 'Content-Type': 'application/json' },
// // // // // // // // // // // // //       body: JSON.stringify(bodyData)
// // // // // // // // // // // // //     });
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleRequestAttendance = async () => {
// // // // // // // // // // // // //     if (!userId) return;
// // // // // // // // // // // // //     if (actualStatus !== "ongoing") return;
// // // // // // // // // // // // //     if (!isRegistered) return;
// // // // // // // // // // // // //     if (isUserAttended || isUserPending) return;

// // // // // // // // // // // // //     const newPending = [...pendingAttendance, userId];
// // // // // // // // // // // // //     const newRejected = rejectedBy.filter((n) => n !== userId);

// // // // // // // // // // // // //     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // // // // // // // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleApprove = async (name) => {
// // // // // // // // // // // // //     const newPending = pendingAttendance.filter((n) => n !== name);
// // // // // // // // // // // // //     const newAttended = [...attendedBy, name];
    
// // // // // // // // // // // // //     await updateDB({ pendingAttendance: newPending, attendedBy: newAttended });
// // // // // // // // // // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, attendedBy: newAttended }));
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleReject = async (name) => {
// // // // // // // // // // // // //     const newPending = pendingAttendance.filter((n) => n !== name);
// // // // // // // // // // // // //     const newRejected = [...rejectedBy, name];

// // // // // // // // // // // // //     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // // // // // // // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleToggleAttendance = async (name) => {
// // // // // // // // // // // // //     const present = attendedBy.includes(name);
// // // // // // // // // // // // //     const updatedAttended = present ? attendedBy.filter((n) => n !== name) : [...attendedBy, name];

// // // // // // // // // // // // //     await updateDB({ attendedBy: updatedAttended });
// // // // // // // // // // // // //     setEvent(prev => ({ ...prev, attendedBy: updatedAttended }));
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleRegister = async () => {
// // // // // // // // // // // // //     if (actualStatus !== "upcoming") return;
// // // // // // // // // // // // //     if (participants >= capacity) return;
// // // // // // // // // // // // //     if (isRegistered) return;

// // // // // // // // // // // // //     const updatedParticipantNames = [...participantNames, userId];
// // // // // // // // // // // // //     const updatedParticipants = Number(participants) + 1;

// // // // // // // // // // // // //     await updateDB({ participantNames: updatedParticipantNames, participants: updatedParticipants });
// // // // // // // // // // // // //     setEvent(prev => ({ ...prev, participantNames: updatedParticipantNames, participants: updatedParticipants }));
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <div className="edp-wrap">
// // // // // // // // // // // // //       <div className="edp-hero">
// // // // // // // // // // // // //         <div className="edp-hero-bg"></div>
// // // // // // // // // // // // //         <button className="edp-back" onClick={onBack}>
// // // // // // // // // // // // //           <i className="fa-solid fa-arrow-left"></i> Back
// // // // // // // // // // // // //         </button>
// // // // // // // // // // // // //         <div className="edp-hero-inner">
// // // // // // // // // // // // //           <div className="edp-hero-info">
// // // // // // // // // // // // //             <div className="edp-badges">
// // // // // // // // // // // // //               <span className="edp-badge-category">{event.category}</span>
// // // // // // // // // // // // //               <span className={`edp-badge-status ${getStatusClass(actualStatus)}`}>
// // // // // // // // // // // // //                 <span className="dot"></span>
// // // // // // // // // // // // //                 {actualStatus}
// // // // // // // // // // // // //               </span>
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //             <h1>{event.title}</h1>
// // // // // // // // // // // // //             <p>{event.description}</p>
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //       </div>

// // // // // // // // // // // // //       <div className="edp-stats">
// // // // // // // // // // // // //         <div className="edp-stat">
// // // // // // // // // // // // //           <div className="edp-stat-icon"><i className="fa-regular fa-calendar"></i></div>
// // // // // // // // // // // // //           <div><span>Date</span><strong>{formatDate(event.date)}</strong></div>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //         <div className="edp-stat">
// // // // // // // // // // // // //           <div className="edp-stat-icon"><i className="fa-regular fa-clock"></i></div>
// // // // // // // // // // // // //           <div><span>Time</span><strong>{event.time}</strong></div>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //         <div className="edp-stat">
// // // // // // // // // // // // //           <div className="edp-stat-icon"><i className="fa-solid fa-location-dot"></i></div>
// // // // // // // // // // // // //           <div><span>Venue</span><strong>{event.venue}</strong></div>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //         <div className="edp-stat">
// // // // // // // // // // // // //           <div className="edp-stat-icon"><i className="fa-solid fa-users"></i></div>
// // // // // // // // // // // // //           <div><span>Participants</span><strong>{participants} / {capacity}</strong></div>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //       </div>

// // // // // // // // // // // // //       <div className="edp-grid">
// // // // // // // // // // // // //         <div className="edp-main">
// // // // // // // // // // // // //           <div className="edp-card">
// // // // // // // // // // // // //             <div className="edp-card-head">
// // // // // // // // // // // // //               <div className="edp-accent"></div>
// // // // // // // // // // // // //               <h2>About This Event</h2>
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //             <p className="edp-body-text">{event.description}</p>
// // // // // // // // // // // // //           </div>

// // // // // // // // // // // // //           <div className="edp-card">
// // // // // // // // // // // // //             <div className="edp-card-head">
// // // // // // // // // // // // //               <div className="edp-accent"></div>
// // // // // // // // // // // // //               <h2>Registration Progress</h2>
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //             <div className="edp-capacity-top">
// // // // // // // // // // // // //               <div>
// // // // // // // // // // // // //                 <span className="edp-cap-label">Filled</span>
// // // // // // // // // // // // //                 <strong className="edp-cap-percent">{percentage}%</strong>
// // // // // // // // // // // // //               </div>
// // // // // // // // // // // // //               <div className="edp-cap-right">
// // // // // // // // // // // // //                 <span className="edp-cap-label">Seats Left</span>
// // // // // // // // // // // // //                 <strong className="edp-cap-seats">{seatsLeft}</strong>
// // // // // // // // // // // // //               </div>
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //             <div className="edp-bar">
// // // // // // // // // // // // //               <div className="edp-bar-fill" style={{ width: `${percentage}%` }}></div>
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //             <div className="edp-capacity-bottom">
// // // // // // // // // // // // //               <span>{participants} registered</span>
// // // // // // // // // // // // //               <span>{capacity} total capacity</span>
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //           </div>

// // // // // // // // // // // // //           {actualStatus === "ongoing" && (
// // // // // // // // // // // // //             <div className="edp-card">
// // // // // // // // // // // // //               <div className="edp-card-head">
// // // // // // // // // // // // //                 <div className="edp-accent"></div>
// // // // // // // // // // // // //                 <h2>Attendance</h2>
// // // // // // // // // // // // //                 <span className="edp-attend-count">
// // // // // // // // // // // // //                   {attendedBy.length} / {participantNames.length} verified
// // // // // // // // // // // // //                 </span>
// // // // // // // // // // // // //               </div>

// // // // // // // // // // // // //               {role === "user" && isRegistered && (
// // // // // // // // // // // // //                 <div className="edp-user-attendance">
// // // // // // // // // // // // //                   {isUserAttended ? (
// // // // // // // // // // // // //                     <div className="edp-attendance-marked">
// // // // // // // // // // // // //                       <i className="fa-solid fa-circle-check"></i>
// // // // // // // // // // // // //                       <span>Your attendance is verified by Admin</span>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                   ) : isUserPending ? (
// // // // // // // // // // // // //                     <div className="edp-attendance-pending" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
// // // // // // // // // // // // //                       <i className="fa-solid fa-clock" style={{ fontSize: '20px' }}></i>
// // // // // // // // // // // // //                       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
// // // // // // // // // // // // //                         <strong style={{ fontSize: '14px' }}>Attendance Recorded</strong>
// // // // // // // // // // // // //                         <span style={{ fontSize: '13px', opacity: 0.8 }}>Pending verification from the organizer.</span>
// // // // // // // // // // // // //                       </div>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                   ) : isUserRejected ? (
// // // // // // // // // // // // //                     <div className="edp-attendance-rejected">
// // // // // // // // // // // // //                       <i className="fa-solid fa-circle-xmark"></i>
// // // // // // // // // // // // //                       <div>
// // // // // // // // // // // // //                         <span>Your request was rejected</span>
// // // // // // // // // // // // //                         <small>You can request again</small>
// // // // // // // // // // // // //                       </div>
// // // // // // // // // // // // //                       <button className="edp-btn edp-btn-primary" onClick={handleRequestAttendance}>
// // // // // // // // // // // // //                         <i className="fa-solid fa-rotate-right"></i> Request Again
// // // // // // // // // // // // //                       </button>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                   ) : (
// // // // // // // // // // // // //                     <button 
// // // // // // // // // // // // //                       className="edp-btn edp-btn-primary" 
// // // // // // // // // // // // //                       onClick={() => {
// // // // // // // // // // // // //                         const code = Math.floor(1000 + Math.random() * 9000).toString();
// // // // // // // // // // // // //                         setGeneratedOtp(code);
// // // // // // // // // // // // //                         setShowNotifDropdown(true);
// // // // // // // // // // // // //                       }}
// // // // // // // // // // // // //                     >
// // // // // // // // // // // // //                       <i className="fa-solid fa-hand"></i> Mark Attendance
// // // // // // // // // // // // //                     </button>
// // // // // // // // // // // // //                   )}
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //               )}

// // // // // // // // // // // // //               {(role === "admin" || role === "leader") && (
// // // // // // // // // // // // //                 <>
// // // // // // // // // // // // //                   <div className="edp-verified-section">
// // // // // // // // // // // // //                     <div className="edp-verified-head">
// // // // // // // // // // // // //                       <h3><i className="fa-solid fa-users"></i> All Participants</h3>
// // // // // // // // // // // // //                       <span className="edp-verified-count">{nonPendingParticipants.length}</span>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                     <div className="edp-attendance-list">
// // // // // // // // // // // // //                       {nonPendingParticipants.length > 0 ? (
// // // // // // // // // // // // //                         nonPendingParticipants.map((name) => {
// // // // // // // // // // // // //                           const present = attendedBy.includes(name);
// // // // // // // // // // // // //                           return (
// // // // // // // // // // // // //                             <div key={name} className={`edp-attend-row ${present ? "present" : ""}`}>
// // // // // // // // // // // // //                               <div className="edp-attend-user">
// // // // // // // // // // // // //                                 <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
// // // // // // // // // // // // //                                 <span>{formatName(name)}</span>
// // // // // // // // // // // // //                               </div>
// // // // // // // // // // // // //                               <button className={`edp-attend-toggle ${present ? "present" : ""}`} onClick={() => handleToggleAttendance(name)}>
// // // // // // // // // // // // //                                 {present ? (<><i className="fa-solid fa-check"></i> Present</>) : (<><i className="fa-regular fa-circle"></i> Absent</>)}
// // // // // // // // // // // // //                               </button>
// // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // //                           );
// // // // // // // // // // // // //                         })
// // // // // // // // // // // // //                       ) : (
// // // // // // // // // // // // //                         <p className="edp-attend-empty">No participants yet.</p>
// // // // // // // // // // // // //                       )}
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                   </div>

// // // // // // // // // // // // //                   {pendingAttendance.length > 0 && (
// // // // // // // // // // // // //                     <div className="edp-pending-section">
// // // // // // // // // // // // //                       <div className="edp-pending-head">
// // // // // // // // // // // // //                         <h3><i className="fa-solid fa-bell"></i> Pending Approval Requests</h3>
// // // // // // // // // // // // //                         <span className="edp-pending-badge">{pendingAttendance.length}</span>
// // // // // // // // // // // // //                       </div>
// // // // // // // // // // // // //                       <div className="edp-attendance-list">
// // // // // // // // // // // // //                         {pendingAttendance.map((name) => (
// // // // // // // // // // // // //                           <div key={name} className="edp-attend-row pending">
// // // // // // // // // // // // //                             <div className="edp-attend-user">
// // // // // // // // // // // // //                               <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
// // // // // // // // // // // // //                               <span>{formatName(name)}</span>
// // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // //                             <div className="edp-approval-actions">
// // // // // // // // // // // // //                               <button className="edp-approve-btn" onClick={() => handleApprove(name)}>
// // // // // // // // // // // // //                                 <i className="fa-solid fa-check"></i> Approve
// // // // // // // // // // // // //                               </button>
// // // // // // // // // // // // //                               <button className="edp-reject-btn" onClick={() => handleReject(name)}>
// // // // // // // // // // // // //                                 <i className="fa-solid fa-xmark"></i> Reject
// // // // // // // // // // // // //                               </button>
// // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // //                           </div>
// // // // // // // // // // // // //                         ))}
// // // // // // // // // // // // //                       </div>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                   )}
// // // // // // // // // // // // //                 </>
// // // // // // // // // // // // //               )}

// // // // // // // // // // // // //               {role === "core-member" && (
// // // // // // // // // // // // //                 <p className="edp-attend-empty">Attendance is managed by admin/leader.</p>
// // // // // // // // // // // // //               )}
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //           )}
// // // // // // // // // // // // //         </div>

// // // // // // // // // // // // //         <div className="edp-side">
// // // // // // // // // // // // //           <div className="notif-bell-container">
// // // // // // // // // // // // //             <button 
// // // // // // // // // // // // //               className={`notif-bell-btn ${generatedOtp ? 'has-notif' : ''}`}
// // // // // // // // // // // // //               onClick={() => setShowNotifDropdown(!showNotifDropdown)}
// // // // // // // // // // // // //             >
// // // // // // // // // // // // //               <i className="fa-solid fa-bell"></i>
// // // // // // // // // // // // //               {generatedOtp && <span className="notif-dot"></span>}
// // // // // // // // // // // // //             </button>

// // // // // // // // // // // // //             {showNotifDropdown && (
// // // // // // // // // // // // //               <div className="notif-dropdown">
// // // // // // // // // // // // //                 <div className="notif-header">
// // // // // // // // // // // // //                   <h4>Notifications</h4>
// // // // // // // // // // // // //                   <button onClick={() => setShowNotifDropdown(false)}><i className="fa-solid fa-xmark"></i></button>
// // // // // // // // // // // // //                 </div>
                
// // // // // // // // // // // // //                 <div className="notif-body">
// // // // // // // // // // // // //                   {generatedOtp ? (
// // // // // // // // // // // // //                     <div className="notif-item">
// // // // // // // // // // // // //                       <div className="notif-icon">
// // // // // // // // // // // // //                         <i className="fa-solid fa-shield-halved"></i>
// // // // // // // // // // // // //                       </div>
// // // // // // // // // // // // //                       <div className="notif-text">
// // // // // // // // // // // // //                         <p>Attendance Verification Code is ready.</p>
                        
// // // // // // // // // // // // //                         <div className="otp-display-box">
// // // // // // // // // // // // //                           <strong>{generatedOtp}</strong>
// // // // // // // // // // // // //                         </div>
                        
// // // // // // // // // // // // //                         <button 
// // // // // // // // // // // // //                           className="notif-action-btn"
// // // // // // // // // // // // //                           onClick={() => {
// // // // // // // // // // // // //                             setShowNotifDropdown(false);
// // // // // // // // // // // // //                             setShowOtpModal(true);
// // // // // // // // // // // // //                           }}
// // // // // // // // // // // // //                         >
// // // // // // // // // // // // //                           Enter Code Now <i className="fa-solid fa-arrow-right"></i>
// // // // // // // // // // // // //                         </button>
// // // // // // // // // // // // //                       </div>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                   ) : (
// // // // // // // // // // // // //                     <p className="no-notif">No new notifications</p>
// // // // // // // // // // // // //                   )}
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //               </div>
// // // // // // // // // // // // //             )}
// // // // // // // // // // // // //           </div>

// // // // // // // // // // // // //           {role === "user" && (
// // // // // // // // // // // // //             <div className="edp-side-card">
// // // // // // // // // // // // //               <h3>Quick Actions</h3>
              
// // // // // // // // // // // // //               {isRegistered ? (
// // // // // // // // // // // // //                 <button className="edp-btn edp-btn-primary" onClick={() => setShowTicket(true)} style={{ background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none' }}>
// // // // // // // // // // // // //                   <i className="fa-solid fa-ticket"></i> View Ticket
// // // // // // // // // // // // //                 </button>
// // // // // // // // // // // // //               ) : actualStatus === "upcoming" && participants < capacity ? (
// // // // // // // // // // // // //                 <button className="edp-btn edp-btn-primary" onClick={handleRegister}>
// // // // // // // // // // // // //                   <i className="fa-solid fa-user-plus"></i> Participate Now
// // // // // // // // // // // // //                 </button>
// // // // // // // // // // // // //               ) : actualStatus === "ongoing" ? (
// // // // // // // // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // // // // // // // //                   <i className="fa-solid fa-spinner"></i> Event In Progress
// // // // // // // // // // // // //                 </button>
// // // // // // // // // // // // //               ) : actualStatus === "completed" ? (
// // // // // // // // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // // // // // // // //                   <i className="fa-solid fa-circle-check"></i> Event Completed
// // // // // // // // // // // // //                 </button>
// // // // // // // // // // // // //               ) : actualStatus === "cancelled" ? (
// // // // // // // // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // // // // // // // //                   <i className="fa-solid fa-circle-xmark"></i> Event Cancelled
// // // // // // // // // // // // //                 </button>
// // // // // // // // // // // // //               ) : (
// // // // // // // // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // // // // // // // //                   <i className="fa-solid fa-ban"></i> Event Full
// // // // // // // // // // // // //                 </button>
// // // // // // // // // // // // //               )}
// // // // // // // // // // // // //               <button className="edp-btn edp-btn-ghost" onClick={onBack}>
// // // // // // // // // // // // //                 <i className="fa-solid fa-arrow-left"></i> Back to Events
// // // // // // // // // // // // //               </button>
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //           )}

// // // // // // // // // // // // //           <div className="edp-side-card">
// // // // // // // // // // // // //             <h3>Event Details</h3>
// // // // // // // // // // // // //             <div className="edp-detail-row"><span>Category</span><strong>{event.category}</strong></div>
// // // // // // // // // // // // //             <div className="edp-detail-row"><span>Status</span><strong className={`edp-status-text ${getStatusClass(actualStatus)}`}>{actualStatus}</strong></div>
// // // // // // // // // // // // //             <div className="edp-detail-row"><span>Event ID</span><strong>EV-{String(event.id).padStart(3, "0")}</strong></div>
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //       </div>

// // // // // // // // // // // // //       {/* 🔥 VIRTUAL TICKET MODAL */}
// // // // // // // // // // // // //       {showTicket && (
// // // // // // // // // // // // //         <div className="ticket-overlay" onClick={() => setShowTicket(false)}>
// // // // // // // // // // // // //           <div className="ticket-card" onClick={(e) => e.stopPropagation()}>
            
// // // // // // // // // // // // //             <div className="ticket-header">
// // // // // // // // // // // // //               <div className="ticket-logo">
// // // // // // // // // // // // //                 <i className="fa-solid fa-plane"></i> ClubPilot
// // // // // // // // // // // // //               </div>
// // // // // // // // // // // // //               <h2>{event.title}</h2>
// // // // // // // // // // // // //               <span className="ticket-status">{actualStatus.toUpperCase()}</span>
// // // // // // // // // // // // //             </div>
            
// // // // // // // // // // // // //             <div className="ticket-divider">
// // // // // // // // // // // // //               <div className="cutout left"></div>
// // // // // // // // // // // // //               <div className="dashed-line"></div>
// // // // // // // // // // // // //               <div className="cutout right"></div>
// // // // // // // // // // // // //             </div>
            
// // // // // // // // // // // // //             <div className="ticket-body">
// // // // // // // // // // // // //               <div className="ticket-info">
// // // // // // // // // // // // //                 <div className="info-group">
// // // // // // // // // // // // //                   <span className="info-label">Attendee Name</span>
// // // // // // // // // // // // //                   <span className="info-value">{userId ? formatName(userId) : 'Guest'}</span>
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //                 <div className="info-group">
// // // // // // // // // // // // //                   <span className="info-label">Date</span>
// // // // // // // // // // // // //                   <span className="info-value">{formatDate(event.date)}</span>
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //                 <div className="info-group">
// // // // // // // // // // // // //                   <span className="info-label">Time</span>
// // // // // // // // // // // // //                   <span className="info-value">{event.time}</span>
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //                 <div className="info-group">
// // // // // // // // // // // // //                   <span className="info-label">Venue</span>
// // // // // // // // // // // // //                   <span className="info-value">{event.venue}</span>
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //               </div>

// // // // // // // // // // // // //               <div className="ticket-qr-section">
// // // // // // // // // // // // //                 <div className="ticket-id-container">
// // // // // // // // // // // // //                   <span className="ticket-label">PASS ID</span>
// // // // // // // // // // // // //                   <span className="ticket-number">#EV-{String(event.id).padStart(3, '0')}-{userId ? userId.split('_')[1] : '00'}</span>
// // // // // // // // // // // // //                 </div>
                
// // // // // // // // // // // // //                 <div className="qr-frame">
// // // // // // // // // // // // //                   <QRCode 
// // // // // // // // // // // // //                     value={ticketUrl} 
// // // // // // // // // // // // //                     size={130} 
// // // // // // // // // // // // //                     bgColor="#ffffff"
// // // // // // // // // // // // //                     fgColor="#1e293b"
// // // // // // // // // // // // //                   />
// // // // // // // // // // // // //                 </div>
                
// // // // // // // // // // // // //                 <p className="scan-instruction">
// // // // // // // // // // // // //                   <i className="fa-solid fa-camera"></i> Scan to view event details
// // // // // // // // // // // // //                 </p>
// // // // // // // // // // // // //               </div>
// // // // // // // // // // // // //             </div>

// // // // // // // // // // // // //             <div className="ticket-footer">
// // // // // // // // // // // // //               <button className="ticket-close-btn" onClick={() => setShowTicket(false)}>
// // // // // // // // // // // // //                 Close Ticket
// // // // // // // // // // // // //               </button>
// // // // // // // // // // // // //             </div>

// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //       )}

// // // // // // // // // // // // //       {/* 🔥 OTP VERIFICATION MODAL */}
// // // // // // // // // // // // //       {showOtpModal && (
// // // // // // // // // // // // //         <div className="ticket-overlay" onClick={() => setShowOtpModal(false)}>
// // // // // // // // // // // // //           <div className="ticket-card" style={{ maxWidth: '350px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            
// // // // // // // // // // // // //             <div className="ticket-header" style={{ background: '#1e293b' }}>
// // // // // // // // // // // // //               <h2 style={{ fontSize: '20px' }}>Verify Attendance</h2>
// // // // // // // // // // // // //               <p style={{ fontSize: '12px', marginTop: '5px', color: '#94a3b8' }}>Enter the code from notification</p>
// // // // // // // // // // // // //             </div>
            
// // // // // // // // // // // // //             <div className="ticket-body" style={{ padding: '30px 24px' }}>
// // // // // // // // // // // // //               <input 
// // // // // // // // // // // // //                 type="text" 
// // // // // // // // // // // // //                 maxLength={4}
// // // // // // // // // // // // //                 placeholder="----"
// // // // // // // // // // // // //                 value={otpInput}
// // // // // // // // // // // // //                 onChange={(e) => {
// // // // // // // // // // // // //                   setOtpInput(e.target.value.replace(/\D/g, ''));
// // // // // // // // // // // // //                   setOtpError('');
// // // // // // // // // // // // //                 }}
// // // // // // // // // // // // //                 style={{ 
// // // // // // // // // // // // //                   width: '100%', fontSize: '32px', textAlign: 'center', letterSpacing: '10px', 
// // // // // // // // // // // // //                   padding: '10px', borderRadius: '12px', border: '2px solid #e2e8f0', outline: 'none',
// // // // // // // // // // // // //                   fontWeight: 'bold', color: '#1e293b'
// // // // // // // // // // // // //                 }}
// // // // // // // // // // // // //               />
              
// // // // // // // // // // // // //               {otpError && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '10px', fontWeight: 'bold' }}>{otpError}</p>}

// // // // // // // // // // // // //               <button 
// // // // // // // // // // // // //                 className="ticket-close-btn" 
// // // // // // // // // // // // //                 style={{ marginTop: '20px', background: '#6366f1', color: 'white' }}
// // // // // // // // // // // // //                 onClick={async () => {
// // // // // // // // // // // // //                   if (otpInput === generatedOtp && generatedOtp !== '') {
// // // // // // // // // // // // //                     const newPending = [...pendingAttendance, userId];
// // // // // // // // // // // // //                     const newRejected = rejectedBy.filter((n) => n !== userId);
                    
// // // // // // // // // // // // //                     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // // // // // // // // // //                     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
                    
// // // // // // // // // // // // //                     setShowOtpModal(false);
                    
// // // // // // // // // // // // //                     setAlertHeading("Attendance Recorded");
// // // // // // // // // // // // //                     setAlertText("Your attendance has been successfully marked. The organizer will verify it shortly.");
// // // // // // // // // // // // //                     setIsAlertVisible(true);
                    
// // // // // // // // // // // // //                   } else {
// // // // // // // // // // // // //                     setOtpError("Invalid code. Please check the notification.");
// // // // // // // // // // // // //                   }
// // // // // // // // // // // // //                 }}
// // // // // // // // // // // // //               >
// // // // // // // // // // // // //                 Verify & Send Request
// // // // // // // // // // // // //               </button>
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //       )}

// // // // // // // // // // // // //       {/* 🔥 CUSTOM SUCCESS ALERT MODAL */}
// // // // // // // // // // // // //       {isAlertVisible && (
// // // // // // // // // // // // //         <div className="ticket-overlay" onClick={() => setIsAlertVisible(false)}>
// // // // // // // // // // // // //           <div className="ticket-card" style={{ maxWidth: '340px', padding: '32px 24px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
// // // // // // // // // // // // //             <div style={{ width: '70px', height: '70px', background: '#ecfdf5', color: '#10b981', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px', margin: '0 auto 20px' }}>
// // // // // // // // // // // // //               <i className="fa-solid fa-check"></i>
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //             <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#1e293b' }}>{alertHeading}</h3>
// // // // // // // // // // // // //             <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>{alertText}</p>
// // // // // // // // // // // // //             <button className="ticket-close-btn" style={{ background: '#10b981', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', width: '100%' }} onClick={() => setIsAlertVisible(false)}>
// // // // // // // // // // // // //               Understood
// // // // // // // // // // // // //             </button>
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //       )}

// // // // // // // // // // // // //     </div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // }

// // // // // // // // // // // // // export default EventDetailPage;

// // // // // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // // // // import "./EventDetailPage.css";
// // // // // // // // // // // // import { useTheme } from './ThemeContext';
// // // // // // // // // // // // import QRCode from 'react-qr-code';

// // // // // // // // // // // // const fixEventStatus = (event) => {
// // // // // // // // // // // //   if (!event) return 'upcoming';
// // // // // // // // // // // //   if (event.status === 'cancelled' || event.status === 'completed') return event.status;
// // // // // // // // // // // //   const now = new Date();
// // // // // // // // // // // //   const [startStr, endStr] = (event.time || '').split(' - ');
// // // // // // // // // // // //   if (!event.date || !startStr || !endStr) return event.status;
  
// // // // // // // // // // // //   const start = new Date(`${event.date}T${startStr.trim()}:00`);
// // // // // // // // // // // //   const end = new Date(`${event.date}T${endStr.trim()}:00`);
  
// // // // // // // // // // // //   if (now >= start && now < end) return 'ongoing';
// // // // // // // // // // // //   if (now >= end) return 'completed';
// // // // // // // // // // // //   return 'upcoming';
// // // // // // // // // // // // };

// // // // // // // // // // // // const formatDate = (dateString) => {
// // // // // // // // // // // //   if (!dateString) return '';
// // // // // // // // // // // //   const d = new Date(dateString);
// // // // // // // // // // // //   if (isNaN(d.getTime())) return dateString; 
// // // // // // // // // // // //   const year = d.getFullYear();
// // // // // // // // // // // //   const month = String(d.getMonth() + 1).padStart(2, '0');
// // // // // // // // // // // //   const day = String(d.getDate()).padStart(2, '0');
// // // // // // // // // // // //   return `${year}-${month}-${day}`;
// // // // // // // // // // // // };

// // // // // // // // // // // // function EventDetailPage({ eventId, onBack, role, currentMemberId, dispatch }) {
// // // // // // // // // // // //   const { darkMode } = useTheme();
// // // // // // // // // // // //   const [event, setEvent] = useState(null);
// // // // // // // // // // // //   const [loading, setLoading] = useState(true);
  
// // // // // // // // // // // //   const [showTicket, setShowTicket] = useState(false);
// // // // // // // // // // // //   const [showNotifDropdown, setShowNotifDropdown] = useState(false);
// // // // // // // // // // // //   const [showOtpModal, setShowOtpModal] = useState(false);
  
// // // // // // // // // // // //   const [otpInput, setOtpInput] = useState('');
// // // // // // // // // // // //   const [generatedOtp, setGeneratedOtp] = useState('');
// // // // // // // // // // // //   const [otpError, setOtpError] = useState('');

// // // // // // // // // // // //   const [isAlertVisible, setIsAlertVisible] = useState(false);
// // // // // // // // // // // //   const [alertText, setAlertText] = useState('');
// // // // // // // // // // // //   const [alertHeading, setAlertHeading] = useState('');

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     const fetchEvent = async () => {
// // // // // // // // // // // //       try {
// // // // // // // // // // // //         const res = await fetch('http://localhost:5000/api/events');
// // // // // // // // // // // //         if (!res.ok) throw new Error("Backend error");
        
// // // // // // // // // // // //         const allEvents = await res.json();
// // // // // // // // // // // //         if (Array.isArray(allEvents)) {
// // // // // // // // // // // //           const found = allEvents.find(e => String(e.id) === String(eventId));
// // // // // // // // // // // //           if (found) setEvent(found);
// // // // // // // // // // // //         }
// // // // // // // // // // // //       } catch (err) {
// // // // // // // // // // // //         console.error("🔥 FETCH EVENT ERROR:", err.message);
// // // // // // // // // // // //       } finally {
// // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // //       }
// // // // // // // // // // // //     };
// // // // // // // // // // // //     fetchEvent();
// // // // // // // // // // // //   }, [eventId]);

// // // // // // // // // // // //   if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading event details...</div>;

// // // // // // // // // // // //   if (!event) {
// // // // // // // // // // // //     return (
// // // // // // // // // // // //       <div className="edp-wrap">
// // // // // // // // // // // //         <button className="edp-back" onClick={onBack}>
// // // // // // // // // // // //           <i className="fa-solid fa-arrow-left"></i> Back to Events
// // // // // // // // // // // //         </button>
// // // // // // // // // // // //         <div className="edp-notfound">
// // // // // // // // // // // //           <h1>Event Not Found</h1>
// // // // // // // // // // // //           <p>The event you are looking for does not exist or backend is down.</p>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     );
// // // // // // // // // // // //   }

// // // // // // // // // // // //   const actualStatus = fixEventStatus(event);
// // // // // // // // // // // //   const capacity = event.capacity || 50;
// // // // // // // // // // // //   const participants = event.participants || 0;
// // // // // // // // // // // //   const percentage = Math.round((participants / capacity) * 100);
// // // // // // // // // // // //   const seatsLeft = capacity - participants;
  
// // // // // // // // // // // //   const userId = (() => {
// // // // // // // // // // // //     const mid = currentMemberId ?? sessionStorage.getItem('currentMemberId');
// // // // // // // // // // // //     if (mid && role) return `${role}_${mid}`;
// // // // // // // // // // // //     if (role) {
// // // // // // // // // // // //       let sid = sessionStorage.getItem('__uid');
// // // // // // // // // // // //       if (!sid) {
// // // // // // // // // // // //         sid = String(Date.now());
// // // // // // // // // // // //         sessionStorage.setItem('__uid', sid);
// // // // // // // // // // // //       }
// // // // // // // // // // // //       return `${role}_${sid}`;
// // // // // // // // // // // //     }
// // // // // // // // // // // //     return null;
// // // // // // // // // // // //   })();

// // // // // // // // // // // //   const attendedBy = event.attendedBy || [];
// // // // // // // // // // // //   const pendingAttendance = event.pendingAttendance || [];
// // // // // // // // // // // //   const rejectedBy = event.rejectedBy || [];
// // // // // // // // // // // //   const participantNames = event.participantNames || [];

// // // // // // // // // // // //   // 🔥 FIX: String conversion for safe matching
// // // // // // // // // // // //   const isRegistered = userId ? participantNames.map(String).includes(String(userId)) : false;
// // // // // // // // // // // //   const isUserAttended = userId ? attendedBy.map(String).includes(String(userId)) : false;
// // // // // // // // // // // //   const isUserPending = userId ? pendingAttendance.map(String).includes(String(userId)) : false;
// // // // // // // // // // // //   const isUserRejected = userId ? rejectedBy.map(String).includes(String(userId)) : false;

// // // // // // // // // // // //   const nonPendingParticipants = participantNames.filter(
// // // // // // // // // // // //     (name) => !pendingAttendance.map(String).includes(String(name))
// // // // // // // // // // // //   );

// // // // // // // // // // // //   const getStatusClass = (status) => status.toLowerCase().replace(/ /g, "-");

// // // // // // // // // // // //   const formatName = (name) => {
// // // // // // // // // // // //     if (name.startsWith("user_")) return `User ${name.slice(5)}`;
// // // // // // // // // // // //     if (name.startsWith("core-member_")) return `Core Member ${name.slice(12)}`;
// // // // // // // // // // // //     if (name.startsWith("admin")) return "Admin";
// // // // // // // // // // // //     if (name.startsWith("leader")) return "Leader";
// // // // // // // // // // // //     if (name.startsWith("user")) return `User ${name.replace("user", "")}`;
// // // // // // // // // // // //     if (name.startsWith("member")) return `Member ${name.replace("member", "")}`;
// // // // // // // // // // // //     return name;
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const ticketUrl = `${window.location.origin}/events/${event.id}`;

// // // // // // // // // // // //   const updateDB = async (updatedFields) => {
// // // // // // // // // // // //     const bodyData = {
// // // // // // // // // // // //       participant_names: updatedFields.participantNames ?? participantNames,
// // // // // // // // // // // //       attended_by: updatedFields.attendedBy ?? attendedBy,
// // // // // // // // // // // //       pending_attendance: updatedFields.pendingAttendance ?? pendingAttendance,
// // // // // // // // // // // //       participants: updatedFields.participants ?? participants,
// // // // // // // // // // // //       status: updatedFields.status ?? event.status,
// // // // // // // // // // // //       rejected_by: updatedFields.rejectedBy ?? rejectedBy,
// // // // // // // // // // // //     };

// // // // // // // // // // // //     await fetch(`http://localhost:5000/api/events/${event.id}`, {
// // // // // // // // // // // //       method: 'PATCH',
// // // // // // // // // // // //       headers: { 'Content-Type': 'application/json' },
// // // // // // // // // // // //       body: JSON.stringify(bodyData)
// // // // // // // // // // // //     });
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleRequestAttendance = async () => {
// // // // // // // // // // // //     if (!userId) return;
// // // // // // // // // // // //     if (actualStatus !== "ongoing") return;
// // // // // // // // // // // //     if (!isRegistered) return;
// // // // // // // // // // // //     if (isUserAttended || isUserPending) return;

// // // // // // // // // // // //     const newPending = [...pendingAttendance, userId];
// // // // // // // // // // // //     const newRejected = rejectedBy.filter((n) => n !== userId);

// // // // // // // // // // // //     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // // // // // // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleApprove = async (name) => {
// // // // // // // // // // // //     const newPending = pendingAttendance.filter((n) => n !== name);
// // // // // // // // // // // //     const newAttended = [...attendedBy, name];
    
// // // // // // // // // // // //     await updateDB({ pendingAttendance: newPending, attendedBy: newAttended });
// // // // // // // // // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, attendedBy: newAttended }));
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleReject = async (name) => {
// // // // // // // // // // // //     const newPending = pendingAttendance.filter((n) => n !== name);
// // // // // // // // // // // //     const newRejected = [...rejectedBy, name];

// // // // // // // // // // // //     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // // // // // // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleToggleAttendance = async (name) => {
// // // // // // // // // // // //     // 🔥 FIX: String conversion
// // // // // // // // // // // //     const present = attendedBy.map(String).includes(String(name));
// // // // // // // // // // // //     const updatedAttended = present ? attendedBy.filter((n) => n !== name) : [...attendedBy, name];

// // // // // // // // // // // //     await updateDB({ attendedBy: updatedAttended });
// // // // // // // // // // // //     setEvent(prev => ({ ...prev, attendedBy: updatedAttended }));
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleRegister = async () => {
// // // // // // // // // // // //     if (actualStatus !== "upcoming") return;
// // // // // // // // // // // //     if (participants >= capacity) return;
// // // // // // // // // // // //     if (isRegistered) return;

// // // // // // // // // // // //     const updatedParticipantNames = [...participantNames, userId];
// // // // // // // // // // // //     const updatedParticipants = Number(participants) + 1;

// // // // // // // // // // // //     await updateDB({ participantNames: updatedParticipantNames, participants: updatedParticipants });
// // // // // // // // // // // //     setEvent(prev => ({ ...prev, participantNames: updatedParticipantNames, participants: updatedParticipants }));
// // // // // // // // // // // //   };

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div className="edp-wrap">
// // // // // // // // // // // //       <div className="edp-hero">
// // // // // // // // // // // //         <div className="edp-hero-bg"></div>
// // // // // // // // // // // //         <button className="edp-back" onClick={onBack}>
// // // // // // // // // // // //           <i className="fa-solid fa-arrow-left"></i> Back
// // // // // // // // // // // //         </button>
// // // // // // // // // // // //         <div className="edp-hero-inner">
// // // // // // // // // // // //           <div className="edp-hero-info">
// // // // // // // // // // // //             <div className="edp-badges">
// // // // // // // // // // // //               <span className="edp-badge-category">{event.category}</span>
// // // // // // // // // // // //               <span className={`edp-badge-status ${getStatusClass(actualStatus)}`}>
// // // // // // // // // // // //                 <span className="dot"></span>
// // // // // // // // // // // //                 {actualStatus}
// // // // // // // // // // // //               </span>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //             <h1>{event.title}</h1>
// // // // // // // // // // // //             <p>{event.description}</p>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       </div>

// // // // // // // // // // // //       <div className="edp-stats">
// // // // // // // // // // // //         <div className="edp-stat">
// // // // // // // // // // // //           <div className="edp-stat-icon"><i className="fa-regular fa-calendar"></i></div>
// // // // // // // // // // // //           <div><span>Date</span><strong>{formatDate(event.date)}</strong></div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //         <div className="edp-stat">
// // // // // // // // // // // //           <div className="edp-stat-icon"><i className="fa-regular fa-clock"></i></div>
// // // // // // // // // // // //           <div><span>Time</span><strong>{event.time}</strong></div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //         <div className="edp-stat">
// // // // // // // // // // // //           <div className="edp-stat-icon"><i className="fa-solid fa-location-dot"></i></div>
// // // // // // // // // // // //           <div><span>Venue</span><strong>{event.venue}</strong></div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //         <div className="edp-stat">
// // // // // // // // // // // //           <div className="edp-stat-icon"><i className="fa-solid fa-users"></i></div>
// // // // // // // // // // // //           <div><span>Participants</span><strong>{participants} / {capacity}</strong></div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       </div>

// // // // // // // // // // // //       <div className="edp-grid">
// // // // // // // // // // // //         <div className="edp-main">
// // // // // // // // // // // //           <div className="edp-card">
// // // // // // // // // // // //             <div className="edp-card-head">
// // // // // // // // // // // //               <div className="edp-accent"></div>
// // // // // // // // // // // //               <h2>About This Event</h2>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //             <p className="edp-body-text">{event.description}</p>
// // // // // // // // // // // //           </div>

// // // // // // // // // // // //           <div className="edp-card">
// // // // // // // // // // // //             <div className="edp-card-head">
// // // // // // // // // // // //               <div className="edp-accent"></div>
// // // // // // // // // // // //               <h2>Registration Progress</h2>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //             <div className="edp-capacity-top">
// // // // // // // // // // // //               <div>
// // // // // // // // // // // //                 <span className="edp-cap-label">Filled</span>
// // // // // // // // // // // //                 <strong className="edp-cap-percent">{percentage}%</strong>
// // // // // // // // // // // //               </div>
// // // // // // // // // // // //               <div className="edp-cap-right">
// // // // // // // // // // // //                 <span className="edp-cap-label">Seats Left</span>
// // // // // // // // // // // //                 <strong className="edp-cap-seats">{seatsLeft}</strong>
// // // // // // // // // // // //               </div>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //             <div className="edp-bar">
// // // // // // // // // // // //               <div className="edp-bar-fill" style={{ width: `${percentage}%` }}></div>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //             <div className="edp-capacity-bottom">
// // // // // // // // // // // //               <span>{participants} registered</span>
// // // // // // // // // // // //               <span>{capacity} total capacity</span>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           </div>

// // // // // // // // // // // //           {actualStatus === "ongoing" && (
// // // // // // // // // // // //             <div className="edp-card">
// // // // // // // // // // // //               <div className="edp-card-head">
// // // // // // // // // // // //                 <div className="edp-accent"></div>
// // // // // // // // // // // //                 <h2>Attendance</h2>
// // // // // // // // // // // //                 <span className="edp-attend-count">
// // // // // // // // // // // //                   {attendedBy.length} / {participantNames.length} verified
// // // // // // // // // // // //                 </span>
// // // // // // // // // // // //               </div>

// // // // // // // // // // // //               {role === "user" && isRegistered && (
// // // // // // // // // // // //                 <div className="edp-user-attendance">
// // // // // // // // // // // //                   {isUserAttended ? (
// // // // // // // // // // // //                     <div className="edp-attendance-marked">
// // // // // // // // // // // //                       <i className="fa-solid fa-circle-check"></i>
// // // // // // // // // // // //                       <span>Your attendance is verified by Admin</span>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                   ) : isUserPending ? (
// // // // // // // // // // // //                     <div className="edp-attendance-pending" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
// // // // // // // // // // // //                       <i className="fa-solid fa-clock" style={{ fontSize: '20px' }}></i>
// // // // // // // // // // // //                       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
// // // // // // // // // // // //                         <strong style={{ fontSize: '14px' }}>Attendance Recorded</strong>
// // // // // // // // // // // //                         <span style={{ fontSize: '13px', opacity: 0.8 }}>Pending verification from the organizer.</span>
// // // // // // // // // // // //                       </div>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                   ) : isUserRejected ? (
// // // // // // // // // // // //                     <div className="edp-attendance-rejected">
// // // // // // // // // // // //                       <i className="fa-solid fa-circle-xmark"></i>
// // // // // // // // // // // //                       <div>
// // // // // // // // // // // //                         <span>Your request was rejected</span>
// // // // // // // // // // // //                         <small>You can request again</small>
// // // // // // // // // // // //                       </div>
// // // // // // // // // // // //                       <button className="edp-btn edp-btn-primary" onClick={handleRequestAttendance}>
// // // // // // // // // // // //                         <i className="fa-solid fa-rotate-right"></i> Request Again
// // // // // // // // // // // //                       </button>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                   ) : (
// // // // // // // // // // // //                     <button 
// // // // // // // // // // // //                       className="edp-btn edp-btn-primary" 
// // // // // // // // // // // //                       onClick={() => {
// // // // // // // // // // // //                         const code = Math.floor(1000 + Math.random() * 9000).toString();
// // // // // // // // // // // //                         setGeneratedOtp(code);
// // // // // // // // // // // //                         setShowNotifDropdown(true);
// // // // // // // // // // // //                       }}
// // // // // // // // // // // //                     >
// // // // // // // // // // // //                       <i className="fa-solid fa-hand"></i> Mark Attendance
// // // // // // // // // // // //                     </button>
// // // // // // // // // // // //                   )}
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //               )}

// // // // // // // // // // // //               {(role === "admin" || role === "leader") && (
// // // // // // // // // // // //                 <>
// // // // // // // // // // // //                   <div className="edp-verified-section">
// // // // // // // // // // // //                     <div className="edp-verified-head">
// // // // // // // // // // // //                       <h3><i className="fa-solid fa-users"></i> All Participants</h3>
// // // // // // // // // // // //                       <span className="edp-verified-count">{nonPendingParticipants.length}</span>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                     <div className="edp-attendance-list">
// // // // // // // // // // // //                       {nonPendingParticipants.length > 0 ? (
// // // // // // // // // // // //                         nonPendingParticipants.map((name) => {
// // // // // // // // // // // //                           const present = attendedBy.map(String).includes(String(name));
// // // // // // // // // // // //                           return (
// // // // // // // // // // // //                             <div key={name} className={`edp-attend-row ${present ? "present" : ""}`}>
// // // // // // // // // // // //                               <div className="edp-attend-user">
// // // // // // // // // // // //                                 <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
// // // // // // // // // // // //                                 <span>{formatName(name)}</span>
// // // // // // // // // // // //                               </div>
// // // // // // // // // // // //                               <button className={`edp-attend-toggle ${present ? "present" : ""}`} onClick={() => handleToggleAttendance(name)}>
// // // // // // // // // // // //                                 {present ? (<><i className="fa-solid fa-check"></i> Present</>) : (<><i className="fa-regular fa-circle"></i> Absent</>)}
// // // // // // // // // // // //                               </button>
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                           );
// // // // // // // // // // // //                         })
// // // // // // // // // // // //                       ) : (
// // // // // // // // // // // //                         <p className="edp-attend-empty">No participants yet.</p>
// // // // // // // // // // // //                       )}
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                   </div>

// // // // // // // // // // // //                   {pendingAttendance.length > 0 && (
// // // // // // // // // // // //                     <div className="edp-pending-section">
// // // // // // // // // // // //                       <div className="edp-pending-head">
// // // // // // // // // // // //                         <h3><i className="fa-solid fa-bell"></i> Pending Approval Requests</h3>
// // // // // // // // // // // //                         <span className="edp-pending-badge">{pendingAttendance.length}</span>
// // // // // // // // // // // //                       </div>
// // // // // // // // // // // //                       <div className="edp-attendance-list">
// // // // // // // // // // // //                         {pendingAttendance.map((name) => (
// // // // // // // // // // // //                           <div key={name} className="edp-attend-row pending">
// // // // // // // // // // // //                             <div className="edp-attend-user">
// // // // // // // // // // // //                               <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
// // // // // // // // // // // //                               <span>{formatName(name)}</span>
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                             <div className="edp-approval-actions">
// // // // // // // // // // // //                               <button className="edp-approve-btn" onClick={() => handleApprove(name)}>
// // // // // // // // // // // //                                 <i className="fa-solid fa-check"></i> Approve
// // // // // // // // // // // //                               </button>
// // // // // // // // // // // //                               <button className="edp-reject-btn" onClick={() => handleReject(name)}>
// // // // // // // // // // // //                                 <i className="fa-solid fa-xmark"></i> Reject
// // // // // // // // // // // //                               </button>
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                           </div>
// // // // // // // // // // // //                         ))}
// // // // // // // // // // // //                       </div>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                   )}
// // // // // // // // // // // //                 </>
// // // // // // // // // // // //               )}

// // // // // // // // // // // //               {role === "core-member" && (
// // // // // // // // // // // //                 <p className="edp-attend-empty">Attendance is managed by admin/leader.</p>
// // // // // // // // // // // //               )}
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           )}
// // // // // // // // // // // //         </div>

// // // // // // // // // // // //         <div className="edp-side">
// // // // // // // // // // // //           <div className="notif-bell-container">
// // // // // // // // // // // //             <button 
// // // // // // // // // // // //               className={`notif-bell-btn ${generatedOtp ? 'has-notif' : ''}`}
// // // // // // // // // // // //               onClick={() => setShowNotifDropdown(!showNotifDropdown)}
// // // // // // // // // // // //             >
// // // // // // // // // // // //               <i className="fa-solid fa-bell"></i>
// // // // // // // // // // // //               {generatedOtp && <span className="notif-dot"></span>}
// // // // // // // // // // // //             </button>

// // // // // // // // // // // //             {showNotifDropdown && (
// // // // // // // // // // // //               <div className="notif-dropdown">
// // // // // // // // // // // //                 <div className="notif-header">
// // // // // // // // // // // //                   <h4>Notifications</h4>
// // // // // // // // // // // //                   <button onClick={() => setShowNotifDropdown(false)}><i className="fa-solid fa-xmark"></i></button>
// // // // // // // // // // // //                 </div>
                
// // // // // // // // // // // //                 <div className="notif-body">
// // // // // // // // // // // //                   {generatedOtp ? (
// // // // // // // // // // // //                     <div className="notif-item">
// // // // // // // // // // // //                       <div className="notif-icon">
// // // // // // // // // // // //                         <i className="fa-solid fa-shield-halved"></i>
// // // // // // // // // // // //                       </div>
// // // // // // // // // // // //                       <div className="notif-text">
// // // // // // // // // // // //                         <p>Attendance Verification Code is ready.</p>
                        
// // // // // // // // // // // //                         <div className="otp-display-box">
// // // // // // // // // // // //                           <strong>{generatedOtp}</strong>
// // // // // // // // // // // //                         </div>
                        
// // // // // // // // // // // //                         <button 
// // // // // // // // // // // //                           className="notif-action-btn"
// // // // // // // // // // // //                           onClick={() => {
// // // // // // // // // // // //                             setShowNotifDropdown(false);
// // // // // // // // // // // //                             setShowOtpModal(true);
// // // // // // // // // // // //                           }}
// // // // // // // // // // // //                         >
// // // // // // // // // // // //                           Enter Code Now <i className="fa-solid fa-arrow-right"></i>
// // // // // // // // // // // //                         </button>
// // // // // // // // // // // //                       </div>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                   ) : (
// // // // // // // // // // // //                     <p className="no-notif">No new notifications</p>
// // // // // // // // // // // //                   )}
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //               </div>
// // // // // // // // // // // //             )}
// // // // // // // // // // // //           </div>

// // // // // // // // // // // //           {role === "user" && (
// // // // // // // // // // // //             <div className="edp-side-card">
// // // // // // // // // // // //               <h3>Quick Actions</h3>
              
// // // // // // // // // // // //               {isRegistered ? (
// // // // // // // // // // // //                 <button className="edp-btn edp-btn-primary" onClick={() => setShowTicket(true)} style={{ background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none' }}>
// // // // // // // // // // // //                   <i className="fa-solid fa-ticket"></i> View Ticket
// // // // // // // // // // // //                 </button>
// // // // // // // // // // // //               ) : actualStatus === "upcoming" && participants < capacity ? (
// // // // // // // // // // // //                 <button className="edp-btn edp-btn-primary" onClick={handleRegister}>
// // // // // // // // // // // //                   <i className="fa-solid fa-user-plus"></i> Participate Now
// // // // // // // // // // // //                 </button>
// // // // // // // // // // // //               ) : actualStatus === "ongoing" ? (
// // // // // // // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // // // // // // //                   <i className="fa-solid fa-spinner"></i> Event In Progress
// // // // // // // // // // // //                 </button>
// // // // // // // // // // // //               ) : actualStatus === "completed" ? (
// // // // // // // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // // // // // // //                   <i className="fa-solid fa-circle-check"></i> Event Completed
// // // // // // // // // // // //                 </button>
// // // // // // // // // // // //               ) : actualStatus === "cancelled" ? (
// // // // // // // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // // // // // // //                   <i className="fa-solid fa-circle-xmark"></i> Event Cancelled
// // // // // // // // // // // //                 </button>
// // // // // // // // // // // //               ) : (
// // // // // // // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // // // // // // //                   <i className="fa-solid fa-ban"></i> Event Full
// // // // // // // // // // // //                 </button>
// // // // // // // // // // // //               )}
// // // // // // // // // // // //               <button className="edp-btn edp-btn-ghost" onClick={onBack}>
// // // // // // // // // // // //                 <i className="fa-solid fa-arrow-left"></i> Back to Events
// // // // // // // // // // // //               </button>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           )}

// // // // // // // // // // // //           <div className="edp-side-card">
// // // // // // // // // // // //             <h3>Event Details</h3>
// // // // // // // // // // // //             <div className="edp-detail-row"><span>Category</span><strong>{event.category}</strong></div>
// // // // // // // // // // // //             <div className="edp-detail-row"><span>Status</span><strong className={`edp-status-text ${getStatusClass(actualStatus)}`}>{actualStatus}</strong></div>
// // // // // // // // // // // //             <div className="edp-detail-row"><span>Event ID</span><strong>EV-{String(event.id).padStart(3, "0")}</strong></div>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       </div>

// // // // // // // // // // // //       {/* 🔥 VIRTUAL TICKET MODAL */}
// // // // // // // // // // // //       {showTicket && (
// // // // // // // // // // // //         <div className="ticket-overlay" onClick={() => setShowTicket(false)}>
// // // // // // // // // // // //           <div className="ticket-card" onClick={(e) => e.stopPropagation()}>
            
// // // // // // // // // // // //             <div className="ticket-header">
// // // // // // // // // // // //               <div className="ticket-logo">
// // // // // // // // // // // //                 <i className="fa-solid fa-plane"></i> ClubPilot
// // // // // // // // // // // //               </div>
// // // // // // // // // // // //               <h2>{event.title}</h2>
// // // // // // // // // // // //               <span className="ticket-status">{actualStatus.toUpperCase()}</span>
// // // // // // // // // // // //             </div>
            
// // // // // // // // // // // //             <div className="ticket-divider">
// // // // // // // // // // // //               <div className="cutout left"></div>
// // // // // // // // // // // //               <div className="dashed-line"></div>
// // // // // // // // // // // //               <div className="cutout right"></div>
// // // // // // // // // // // //             </div>
            
// // // // // // // // // // // //             <div className="ticket-body">
// // // // // // // // // // // //               <div className="ticket-info">
// // // // // // // // // // // //                 <div className="info-group">
// // // // // // // // // // // //                   <span className="info-label">Attendee Name</span>
// // // // // // // // // // // //                   <span className="info-value">{userId ? formatName(userId) : 'Guest'}</span>
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //                 <div className="info-group">
// // // // // // // // // // // //                   <span className="info-label">Date</span>
// // // // // // // // // // // //                   <span className="info-value">{formatDate(event.date)}</span>
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //                 <div className="info-group">
// // // // // // // // // // // //                   <span className="info-label">Time</span>
// // // // // // // // // // // //                   <span className="info-value">{event.time}</span>
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //                 <div className="info-group">
// // // // // // // // // // // //                   <span className="info-label">Venue</span>
// // // // // // // // // // // //                   <span className="info-value">{event.venue}</span>
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //               </div>

// // // // // // // // // // // //               <div className="ticket-qr-section">
// // // // // // // // // // // //                 <div className="ticket-id-container">
// // // // // // // // // // // //                   <span className="ticket-label">PASS ID</span>
// // // // // // // // // // // //                   <span className="ticket-number">#EV-{String(event.id).padStart(3, '0')}-{userId ? userId.split('_')[1] : '00'}</span>
// // // // // // // // // // // //                 </div>
                
// // // // // // // // // // // //                 <div className="qr-frame">
// // // // // // // // // // // //                   <QRCode 
// // // // // // // // // // // //                     value={ticketUrl} 
// // // // // // // // // // // //                     size={130} 
// // // // // // // // // // // //                     bgColor="#ffffff"
// // // // // // // // // // // //                     fgColor="#1e293b"
// // // // // // // // // // // //                   />
// // // // // // // // // // // //                 </div>
                
// // // // // // // // // // // //                 <p className="scan-instruction">
// // // // // // // // // // // //                   <i className="fa-solid fa-camera"></i> Scan to view event details
// // // // // // // // // // // //                 </p>
// // // // // // // // // // // //               </div>
// // // // // // // // // // // //             </div>

// // // // // // // // // // // //             <div className="ticket-footer">
// // // // // // // // // // // //               <button className="ticket-close-btn" onClick={() => setShowTicket(false)}>
// // // // // // // // // // // //                 Close Ticket
// // // // // // // // // // // //               </button>
// // // // // // // // // // // //             </div>

// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       )}

// // // // // // // // // // // //       {/* 🔥 OTP VERIFICATION MODAL */}
// // // // // // // // // // // //       {showOtpModal && (
// // // // // // // // // // // //         <div className="ticket-overlay" onClick={() => setShowOtpModal(false)}>
// // // // // // // // // // // //           <div className="ticket-card" style={{ maxWidth: '350px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            
// // // // // // // // // // // //             <div className="ticket-header" style={{ background: '#1e293b' }}>
// // // // // // // // // // // //               <h2 style={{ fontSize: '20px' }}>Verify Attendance</h2>
// // // // // // // // // // // //               <p style={{ fontSize: '12px', marginTop: '5px', color: '#94a3b8' }}>Enter the code from notification</p>
// // // // // // // // // // // //             </div>
            
// // // // // // // // // // // //             <div className="ticket-body" style={{ padding: '30px 24px' }}>
// // // // // // // // // // // //               <input 
// // // // // // // // // // // //                 type="text" 
// // // // // // // // // // // //                 maxLength={4}
// // // // // // // // // // // //                 placeholder="----"
// // // // // // // // // // // //                 value={otpInput}
// // // // // // // // // // // //                 onChange={(e) => {
// // // // // // // // // // // //                   setOtpInput(e.target.value.replace(/\D/g, ''));
// // // // // // // // // // // //                   setOtpError('');
// // // // // // // // // // // //                 }}
// // // // // // // // // // // //                 style={{ 
// // // // // // // // // // // //                   width: '100%', fontSize: '32px', textAlign: 'center', letterSpacing: '10px', 
// // // // // // // // // // // //                   padding: '10px', borderRadius: '12px', border: '2px solid #e2e8f0', outline: 'none',
// // // // // // // // // // // //                   fontWeight: 'bold', color: '#1e293b'
// // // // // // // // // // // //                 }}
// // // // // // // // // // // //               />
              
// // // // // // // // // // // //               {otpError && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '10px', fontWeight: 'bold' }}>{otpError}</p>}

// // // // // // // // // // // //               <button 
// // // // // // // // // // // //                 className="ticket-close-btn" 
// // // // // // // // // // // //                 style={{ marginTop: '20px', background: '#6366f1', color: 'white' }}
// // // // // // // // // // // //                 onClick={async () => {
// // // // // // // // // // // //                   if (otpInput === generatedOtp && generatedOtp !== '') {
// // // // // // // // // // // //                     const newPending = [...pendingAttendance, userId];
// // // // // // // // // // // //                     const newRejected = rejectedBy.filter((n) => n !== userId);
                    
// // // // // // // // // // // //                     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // // // // // // // // //                     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
                    
// // // // // // // // // // // //                     setShowOtpModal(false);
                    
// // // // // // // // // // // //                     setAlertHeading("Attendance Recorded");
// // // // // // // // // // // //                     setAlertText("Your attendance has been successfully marked. The organizer will verify it shortly.");
// // // // // // // // // // // //                     setIsAlertVisible(true);
                    
// // // // // // // // // // // //                   } else {
// // // // // // // // // // // //                     setOtpError("Invalid code. Please check the notification.");
// // // // // // // // // // // //                   }
// // // // // // // // // // // //                 }}
// // // // // // // // // // // //               >
// // // // // // // // // // // //                 Verify & Send Request
// // // // // // // // // // // //               </button>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       )}

// // // // // // // // // // // //       {/* 🔥 CUSTOM SUCCESS ALERT MODAL */}
// // // // // // // // // // // //       {isAlertVisible && (
// // // // // // // // // // // //         <div className="ticket-overlay" onClick={() => setIsAlertVisible(false)}>
// // // // // // // // // // // //           <div className="ticket-card" style={{ maxWidth: '340px', padding: '32px 24px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
// // // // // // // // // // // //             <div style={{ width: '70px', height: '70px', background: '#ecfdf5', color: '#10b981', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px', margin: '0 auto 20px' }}>
// // // // // // // // // // // //               <i className="fa-solid fa-check"></i>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //             <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#1e293b' }}>{alertHeading}</h3>
// // // // // // // // // // // //             <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>{alertText}</p>
// // // // // // // // // // // //             <button className="ticket-close-btn" style={{ background: '#10b981', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', width: '100%' }} onClick={() => setIsAlertVisible(false)}>
// // // // // // // // // // // //               Understood
// // // // // // // // // // // //             </button>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       )}

// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }

// // // // // // // // // // // // export default EventDetailPage;

// // // // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // // // import "./EventDetailPage.css";
// // // // // // // // // // // import { useTheme } from './ThemeContext';
// // // // // // // // // // // import QRCode from 'react-qr-code';

// // // // // // // // // // // const fixEventStatus = (event) => {
// // // // // // // // // // //   if (!event) return 'upcoming';
// // // // // // // // // // //   if (event.status === 'cancelled' || event.status === 'completed') return event.status;
// // // // // // // // // // //   const now = new Date();
// // // // // // // // // // //   const [startStr, endStr] = (event.time || '').split(' - ');
// // // // // // // // // // //   if (!event.date || !startStr || !endStr) return event.status;
  
// // // // // // // // // // //   const start = new Date(`${event.date}T${startStr.trim()}:00`);
// // // // // // // // // // //   const end = new Date(`${event.date}T${endStr.trim()}:00`);
  
// // // // // // // // // // //   if (now >= start && now < end) return 'ongoing';
// // // // // // // // // // //   if (now >= end) return 'completed';
// // // // // // // // // // //   return 'upcoming';
// // // // // // // // // // // };

// // // // // // // // // // // const formatDate = (dateString) => {
// // // // // // // // // // //   if (!dateString) return '';
// // // // // // // // // // //   const d = new Date(dateString);
// // // // // // // // // // //   if (isNaN(d.getTime())) return dateString; 
// // // // // // // // // // //   const year = d.getFullYear();
// // // // // // // // // // //   const month = String(d.getMonth() + 1).padStart(2, '0');
// // // // // // // // // // //   const day = String(d.getDate()).padStart(2, '0');
// // // // // // // // // // //   return `${year}-${month}-${day}`;
// // // // // // // // // // // };

// // // // // // // // // // // function EventDetailPage({ eventId, onBack, role, currentMemberId, dispatch }) {
// // // // // // // // // // //   const { darkMode } = useTheme();
// // // // // // // // // // //   const [event, setEvent] = useState(null);
// // // // // // // // // // //   const [loading, setLoading] = useState(true);
  
// // // // // // // // // // //   const [showTicket, setShowTicket] = useState(false);
// // // // // // // // // // //   const [showNotifDropdown, setShowNotifDropdown] = useState(false);
// // // // // // // // // // //   const [showOtpModal, setShowOtpModal] = useState(false);
  
// // // // // // // // // // //   const [otpInput, setOtpInput] = useState('');
// // // // // // // // // // //   const [generatedOtp, setGeneratedOtp] = useState('');
// // // // // // // // // // //   const [otpError, setOtpError] = useState('');

// // // // // // // // // // //   // 🔥 NAYA STATE: OTP verify hote hi screen change karne ke liye
// // // // // // // // // // //   const [localPending, setLocalPending] = useState(false); 

// // // // // // // // // // //   const [isAlertVisible, setIsAlertVisible] = useState(false);
// // // // // // // // // // //   const [alertText, setAlertText] = useState('');
// // // // // // // // // // //   const [alertHeading, setAlertHeading] = useState('');

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     const fetchEvent = async () => {
// // // // // // // // // // //       try {
// // // // // // // // // // //         const res = await fetch('http://localhost:5000/api/events');
// // // // // // // // // // //         if (!res.ok) throw new Error("Backend error");
        
// // // // // // // // // // //         const allEvents = await res.json();
// // // // // // // // // // //         if (Array.isArray(allEvents)) {
// // // // // // // // // // //           const found = allEvents.find(e => String(e.id) === String(eventId));
// // // // // // // // // // //           if (found) setEvent(found);
// // // // // // // // // // //         }
// // // // // // // // // // //       } catch (err) {
// // // // // // // // // // //         console.error("🔥 FETCH EVENT ERROR:", err.message);
// // // // // // // // // // //       } finally {
// // // // // // // // // // //         setLoading(false);
// // // // // // // // // // //       }
// // // // // // // // // // //     };
// // // // // // // // // // //     fetchEvent();
// // // // // // // // // // //   }, [eventId]);

// // // // // // // // // // //   if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading event details...</div>;

// // // // // // // // // // //   if (!event) {
// // // // // // // // // // //     return (
// // // // // // // // // // //       <div className="edp-wrap">
// // // // // // // // // // //         <button className="edp-back" onClick={onBack}>
// // // // // // // // // // //           <i className="fa-solid fa-arrow-left"></i> Back to Events
// // // // // // // // // // //         </button>
// // // // // // // // // // //         <div className="edp-notfound">
// // // // // // // // // // //           <h1>Event Not Found</h1>
// // // // // // // // // // //           <p>The event you are looking for does not exist or backend is down.</p>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     );
// // // // // // // // // // //   }

// // // // // // // // // // //   const actualStatus = fixEventStatus(event);
// // // // // // // // // // //   const capacity = event.capacity || 50;
// // // // // // // // // // //   const participants = event.participants || 0;
// // // // // // // // // // //   const percentage = Math.round((participants / capacity) * 100);
// // // // // // // // // // //   const seatsLeft = capacity - participants;
  
// // // // // // // // // // //   const userId = (() => {
// // // // // // // // // // //     const mid = currentMemberId ?? sessionStorage.getItem('currentMemberId');
// // // // // // // // // // //     if (mid && role) return `${role}_${mid}`;
// // // // // // // // // // //     if (role) {
// // // // // // // // // // //       let sid = sessionStorage.getItem('__uid');
// // // // // // // // // // //       if (!sid) {
// // // // // // // // // // //         sid = String(Date.now());
// // // // // // // // // // //         sessionStorage.setItem('__uid', sid);
// // // // // // // // // // //       }
// // // // // // // // // // //       return `${role}_${sid}`;
// // // // // // // // // // //     }
// // // // // // // // // // //     return null;
// // // // // // // // // // //   })();

// // // // // // // // // // //   const attendedBy = event.attendedBy || [];
// // // // // // // // // // //   const pendingAttendance = event.pendingAttendance || [];
// // // // // // // // // // //   const rejectedBy = event.rejectedBy || [];
// // // // // // // // // // //   const participantNames = event.participantNames || [];

// // // // // // // // // // //   const isRegistered = userId ? participantNames.map(String).includes(String(userId)) : false;
// // // // // // // // // // //   const isUserAttended = userId ? attendedBy.map(String).includes(String(userId)) : false;
  
// // // // // // // // // // //   // 🔥 Yahan localPending add kiya hai
// // // // // // // // // // //   const isUserPending = userId ? (pendingAttendance.map(String).includes(String(userId)) || localPending) : false; 
  
// // // // // // // // // // //   const isUserRejected = userId ? rejectedBy.map(String).includes(String(userId)) : false;

// // // // // // // // // // //   const nonPendingParticipants = participantNames.filter(
// // // // // // // // // // //     (name) => !pendingAttendance.map(String).includes(String(name))
// // // // // // // // // // //   );

// // // // // // // // // // //   const getStatusClass = (status) => status.toLowerCase().replace(/ /g, "-");

// // // // // // // // // // //   const formatName = (name) => {
// // // // // // // // // // //     if (name.startsWith("user_")) return `User ${name.slice(5)}`;
// // // // // // // // // // //     if (name.startsWith("core-member_")) return `Core Member ${name.slice(12)}`;
// // // // // // // // // // //     if (name.startsWith("admin")) return "Admin";
// // // // // // // // // // //     if (name.startsWith("leader")) return "Leader";
// // // // // // // // // // //     if (name.startsWith("user")) return `User ${name.replace("user", "")}`;
// // // // // // // // // // //     if (name.startsWith("member")) return `Member ${name.replace("member", "")}`;
// // // // // // // // // // //     return name;
// // // // // // // // // // //   };

// // // // // // // // // // //   const ticketUrl = `${window.location.origin}/events/${event.id}`;

// // // // // // // // // // //   const updateDB = async (updatedFields) => {
// // // // // // // // // // //     const bodyData = {
// // // // // // // // // // //       participant_names: updatedFields.participantNames ?? participantNames,
// // // // // // // // // // //       attended_by: updatedFields.attendedBy ?? attendedBy,
// // // // // // // // // // //       pending_attendance: updatedFields.pendingAttendance ?? pendingAttendance,
// // // // // // // // // // //       participants: updatedFields.participants ?? participants,
// // // // // // // // // // //       status: updatedFields.status ?? event.status,
// // // // // // // // // // //       rejected_by: updatedFields.rejectedBy ?? rejectedBy,
// // // // // // // // // // //     };

// // // // // // // // // // //     await fetch(`http://localhost:5000/api/events/${event.id}`, {
// // // // // // // // // // //       method: 'PATCH',
// // // // // // // // // // //       headers: { 'Content-Type': 'application/json' },
// // // // // // // // // // //       body: JSON.stringify(bodyData)
// // // // // // // // // // //     });
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleRequestAttendance = async () => {
// // // // // // // // // // //     if (!userId) return;
// // // // // // // // // // //     if (actualStatus !== "ongoing") return;
// // // // // // // // // // //     if (!isRegistered) return;
// // // // // // // // // // //     if (isUserAttended || isUserPending) return;

// // // // // // // // // // //     const newPending = [...pendingAttendance, userId];
// // // // // // // // // // //     const newRejected = rejectedBy.filter((n) => n !== userId);

// // // // // // // // // // //     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // // // // // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
// // // // // // // // // // //     setLocalPending(true); // Request again pe bhi local pending true kar do
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleApprove = async (name) => {
// // // // // // // // // // //     const newPending = pendingAttendance.filter((n) => n !== name);
// // // // // // // // // // //     const newAttended = [...attendedBy, name];
    
// // // // // // // // // // //     await updateDB({ pendingAttendance: newPending, attendedBy: newAttended });
// // // // // // // // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, attendedBy: newAttended }));
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleReject = async (name) => {
// // // // // // // // // // //     const newPending = pendingAttendance.filter((n) => n !== name);
// // // // // // // // // // //     const newRejected = [...rejectedBy, name];

// // // // // // // // // // //     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // // // // // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleToggleAttendance = async (name) => {
// // // // // // // // // // //     const present = attendedBy.map(String).includes(String(name));
// // // // // // // // // // //     const updatedAttended = present ? attendedBy.filter((n) => n !== name) : [...attendedBy, name];

// // // // // // // // // // //     await updateDB({ attendedBy: updatedAttended });
// // // // // // // // // // //     setEvent(prev => ({ ...prev, attendedBy: updatedAttended }));
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleRegister = async () => {
// // // // // // // // // // //     if (actualStatus !== "upcoming") return;
// // // // // // // // // // //     if (participants >= capacity) return;
// // // // // // // // // // //     if (isRegistered) return;

// // // // // // // // // // //     const updatedParticipantNames = [...participantNames, userId];
// // // // // // // // // // //     const updatedParticipants = Number(participants) + 1;

// // // // // // // // // // //     await updateDB({ participantNames: updatedParticipantNames, participants: updatedParticipants });
// // // // // // // // // // //     setEvent(prev => ({ ...prev, participantNames: updatedParticipantNames, participants: updatedParticipants }));
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="edp-wrap">
// // // // // // // // // // //       <div className="edp-hero">
// // // // // // // // // // //         <div className="edp-hero-bg"></div>
// // // // // // // // // // //         <button className="edp-back" onClick={onBack}>
// // // // // // // // // // //           <i className="fa-solid fa-arrow-left"></i> Back
// // // // // // // // // // //         </button>
// // // // // // // // // // //         <div className="edp-hero-inner">
// // // // // // // // // // //           <div className="edp-hero-info">
// // // // // // // // // // //             <div className="edp-badges">
// // // // // // // // // // //               <span className="edp-badge-category">{event.category}</span>
// // // // // // // // // // //               <span className={`edp-badge-status ${getStatusClass(actualStatus)}`}>
// // // // // // // // // // //                 <span className="dot"></span>
// // // // // // // // // // //                 {actualStatus}
// // // // // // // // // // //               </span>
// // // // // // // // // // //             </div>
// // // // // // // // // // //             <h1>{event.title}</h1>
// // // // // // // // // // //             <p>{event.description}</p>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>

// // // // // // // // // // //       <div className="edp-stats">
// // // // // // // // // // //         <div className="edp-stat">
// // // // // // // // // // //           <div className="edp-stat-icon"><i className="fa-regular fa-calendar"></i></div>
// // // // // // // // // // //           <div><span>Date</span><strong>{formatDate(event.date)}</strong></div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //         <div className="edp-stat">
// // // // // // // // // // //           <div className="edp-stat-icon"><i className="fa-regular fa-clock"></i></div>
// // // // // // // // // // //           <div><span>Time</span><strong>{event.time}</strong></div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //         <div className="edp-stat">
// // // // // // // // // // //           <div className="edp-stat-icon"><i className="fa-solid fa-location-dot"></i></div>
// // // // // // // // // // //           <div><span>Venue</span><strong>{event.venue}</strong></div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //         <div className="edp-stat">
// // // // // // // // // // //           <div className="edp-stat-icon"><i className="fa-solid fa-users"></i></div>
// // // // // // // // // // //           <div><span>Participants</span><strong>{participants} / {capacity}</strong></div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>

// // // // // // // // // // //       <div className="edp-grid">
// // // // // // // // // // //         <div className="edp-main">
// // // // // // // // // // //           <div className="edp-card">
// // // // // // // // // // //             <div className="edp-card-head">
// // // // // // // // // // //               <div className="edp-accent"></div>
// // // // // // // // // // //               <h2>About This Event</h2>
// // // // // // // // // // //             </div>
// // // // // // // // // // //             <p className="edp-body-text">{event.description}</p>
// // // // // // // // // // //           </div>

// // // // // // // // // // //           <div className="edp-card">
// // // // // // // // // // //             <div className="edp-card-head">
// // // // // // // // // // //               <div className="edp-accent"></div>
// // // // // // // // // // //               <h2>Registration Progress</h2>
// // // // // // // // // // //             </div>
// // // // // // // // // // //             <div className="edp-capacity-top">
// // // // // // // // // // //               <div>
// // // // // // // // // // //                 <span className="edp-cap-label">Filled</span>
// // // // // // // // // // //                 <strong className="edp-cap-percent">{percentage}%</strong>
// // // // // // // // // // //               </div>
// // // // // // // // // // //               <div className="edp-cap-right">
// // // // // // // // // // //                 <span className="edp-cap-label">Seats Left</span>
// // // // // // // // // // //                 <strong className="edp-cap-seats">{seatsLeft}</strong>
// // // // // // // // // // //               </div>
// // // // // // // // // // //             </div>
// // // // // // // // // // //             <div className="edp-bar">
// // // // // // // // // // //               <div className="edp-bar-fill" style={{ width: `${percentage}%` }}></div>
// // // // // // // // // // //             </div>
// // // // // // // // // // //             <div className="edp-capacity-bottom">
// // // // // // // // // // //               <span>{participants} registered</span>
// // // // // // // // // // //               <span>{capacity} total capacity</span>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </div>

// // // // // // // // // // //           {actualStatus === "ongoing" && (
// // // // // // // // // // //             <div className="edp-card">
// // // // // // // // // // //               <div className="edp-card-head">
// // // // // // // // // // //                 <div className="edp-accent"></div>
// // // // // // // // // // //                 <h2>Attendance</h2>
// // // // // // // // // // //                 <span className="edp-attend-count">
// // // // // // // // // // //                   {attendedBy.length} / {participantNames.length} verified
// // // // // // // // // // //                 </span>
// // // // // // // // // // //               </div>

// // // // // // // // // // //               {role === "user" && isRegistered && (
// // // // // // // // // // //                 <div className="edp-user-attendance">
// // // // // // // // // // //                   {isUserAttended ? (
// // // // // // // // // // //                     <div className="edp-attendance-marked">
// // // // // // // // // // //                       <i className="fa-solid fa-circle-check"></i>
// // // // // // // // // // //                       <span>Your attendance is verified by Admin</span>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                   ) : isUserPending ? (
// // // // // // // // // // //                     <div className="edp-attendance-pending" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
// // // // // // // // // // //                       <i className="fa-solid fa-clock" style={{ fontSize: '20px' }}></i>
// // // // // // // // // // //                       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
// // // // // // // // // // //                         <strong style={{ fontSize: '14px' }}>Attendance Recorded</strong>
// // // // // // // // // // //                         <span style={{ fontSize: '13px', opacity: 0.8 }}>Pending verification from the organizer.</span>
// // // // // // // // // // //                       </div>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                   ) : isUserRejected ? (
// // // // // // // // // // //                     <div className="edp-attendance-rejected">
// // // // // // // // // // //                       <i className="fa-solid fa-circle-xmark"></i>
// // // // // // // // // // //                       <div>
// // // // // // // // // // //                         <span>Your request was rejected</span>
// // // // // // // // // // //                         <small>You can request again</small>
// // // // // // // // // // //                       </div>
// // // // // // // // // // //                       <button className="edp-btn edp-btn-primary" onClick={handleRequestAttendance}>
// // // // // // // // // // //                         <i className="fa-solid fa-rotate-right"></i> Request Again
// // // // // // // // // // //                       </button>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                   ) : (
// // // // // // // // // // //                     <button 
// // // // // // // // // // //                       className="edp-btn edp-btn-primary" 
// // // // // // // // // // //                       onClick={() => {
// // // // // // // // // // //                         const code = Math.floor(1000 + Math.random() * 9000).toString();
// // // // // // // // // // //                         setGeneratedOtp(code);
// // // // // // // // // // //                         setShowNotifDropdown(true);
// // // // // // // // // // //                       }}
// // // // // // // // // // //                     >
// // // // // // // // // // //                       <i className="fa-solid fa-hand"></i> Mark Attendance
// // // // // // // // // // //                     </button>
// // // // // // // // // // //                   )}
// // // // // // // // // // //                 </div>
// // // // // // // // // // //               )}

// // // // // // // // // // //               {(role === "admin" || role === "leader") && (
// // // // // // // // // // //                 <>
// // // // // // // // // // //                   <div className="edp-verified-section">
// // // // // // // // // // //                     <div className="edp-verified-head">
// // // // // // // // // // //                       <h3><i className="fa-solid fa-users"></i> All Participants</h3>
// // // // // // // // // // //                       <span className="edp-verified-count">{nonPendingParticipants.length}</span>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div className="edp-attendance-list">
// // // // // // // // // // //                       {nonPendingParticipants.length > 0 ? (
// // // // // // // // // // //                         nonPendingParticipants.map((name) => {
// // // // // // // // // // //                           const present = attendedBy.map(String).includes(String(name));
// // // // // // // // // // //                           return (
// // // // // // // // // // //                             <div key={name} className={`edp-attend-row ${present ? "present" : ""}`}>
// // // // // // // // // // //                               <div className="edp-attend-user">
// // // // // // // // // // //                                 <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
// // // // // // // // // // //                                 <span>{formatName(name)}</span>
// // // // // // // // // // //                               </div>
// // // // // // // // // // //                               <button className={`edp-attend-toggle ${present ? "present" : ""}`} onClick={() => handleToggleAttendance(name)}>
// // // // // // // // // // //                                 {present ? (<><i className="fa-solid fa-check"></i> Present</>) : (<><i className="fa-regular fa-circle"></i> Absent</>)}
// // // // // // // // // // //                               </button>
// // // // // // // // // // //                             </div>
// // // // // // // // // // //                           );
// // // // // // // // // // //                         })
// // // // // // // // // // //                       ) : (
// // // // // // // // // // //                         <p className="edp-attend-empty">No participants yet.</p>
// // // // // // // // // // //                       )}
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                   </div>

// // // // // // // // // // //                   {pendingAttendance.length > 0 && (
// // // // // // // // // // //                     <div className="edp-pending-section">
// // // // // // // // // // //                       <div className="edp-pending-head">
// // // // // // // // // // //                         <h3><i className="fa-solid fa-bell"></i> Pending Approval Requests</h3>
// // // // // // // // // // //                         <span className="edp-pending-badge">{pendingAttendance.length}</span>
// // // // // // // // // // //                       </div>
// // // // // // // // // // //                       <div className="edp-attendance-list">
// // // // // // // // // // //                         {pendingAttendance.map((name) => (
// // // // // // // // // // //                           <div key={name} className="edp-attend-row pending">
// // // // // // // // // // //                             <div className="edp-attend-user">
// // // // // // // // // // //                               <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
// // // // // // // // // // //                               <span>{formatName(name)}</span>
// // // // // // // // // // //                             </div>
// // // // // // // // // // //                             <div className="edp-approval-actions">
// // // // // // // // // // //                               <button className="edp-approve-btn" onClick={() => handleApprove(name)}>
// // // // // // // // // // //                                 <i className="fa-solid fa-check"></i> Approve
// // // // // // // // // // //                               </button>
// // // // // // // // // // //                               <button className="edp-reject-btn" onClick={() => handleReject(name)}>
// // // // // // // // // // //                                 <i className="fa-solid fa-xmark"></i> Reject
// // // // // // // // // // //                               </button>
// // // // // // // // // // //                             </div>
// // // // // // // // // // //                           </div>
// // // // // // // // // // //                         ))}
// // // // // // // // // // //                       </div>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                   )}
// // // // // // // // // // //                 </>
// // // // // // // // // // //               )}

// // // // // // // // // // //               {role === "core-member" && (
// // // // // // // // // // //                 <p className="edp-attend-empty">Attendance is managed by admin/leader.</p>
// // // // // // // // // // //               )}
// // // // // // // // // // //             </div>
// // // // // // // // // // //           )}
// // // // // // // // // // //         </div>

// // // // // // // // // // //         <div className="edp-side">
// // // // // // // // // // //           <div className="notif-bell-container">
// // // // // // // // // // //             <button 
// // // // // // // // // // //               className={`notif-bell-btn ${generatedOtp ? 'has-notif' : ''}`}
// // // // // // // // // // //               onClick={() => setShowNotifDropdown(!showNotifDropdown)}
// // // // // // // // // // //             >
// // // // // // // // // // //               <i className="fa-solid fa-bell"></i>
// // // // // // // // // // //               {generatedOtp && <span className="notif-dot"></span>}
// // // // // // // // // // //             </button>

// // // // // // // // // // //             {showNotifDropdown && (
// // // // // // // // // // //               <div className="notif-dropdown">
// // // // // // // // // // //                 <div className="notif-header">
// // // // // // // // // // //                   <h4>Notifications</h4>
// // // // // // // // // // //                   <button onClick={() => setShowNotifDropdown(false)}><i className="fa-solid fa-xmark"></i></button>
// // // // // // // // // // //                 </div>
                
// // // // // // // // // // //                 <div className="notif-body">
// // // // // // // // // // //                   {generatedOtp ? (
// // // // // // // // // // //                     <div className="notif-item">
// // // // // // // // // // //                       <div className="notif-icon">
// // // // // // // // // // //                         <i className="fa-solid fa-shield-halved"></i>
// // // // // // // // // // //                       </div>
// // // // // // // // // // //                       <div className="notif-text">
// // // // // // // // // // //                         <p>Attendance Verification Code is ready.</p>
                        
// // // // // // // // // // //                         <div className="otp-display-box">
// // // // // // // // // // //                           <strong>{generatedOtp}</strong>
// // // // // // // // // // //                         </div>
                        
// // // // // // // // // // //                         <button 
// // // // // // // // // // //                           className="notif-action-btn"
// // // // // // // // // // //                           onClick={() => {
// // // // // // // // // // //                             setShowNotifDropdown(false);
// // // // // // // // // // //                             setShowOtpModal(true);
// // // // // // // // // // //                           }}
// // // // // // // // // // //                         >
// // // // // // // // // // //                           Enter Code Now <i className="fa-solid fa-arrow-right"></i>
// // // // // // // // // // //                         </button>
// // // // // // // // // // //                       </div>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                   ) : (
// // // // // // // // // // //                     <p className="no-notif">No new notifications</p>
// // // // // // // // // // //                   )}
// // // // // // // // // // //                 </div>
// // // // // // // // // // //               </div>
// // // // // // // // // // //             )}
// // // // // // // // // // //           </div>

// // // // // // // // // // //           {role === "user" && (
// // // // // // // // // // //             <div className="edp-side-card">
// // // // // // // // // // //               <h3>Quick Actions</h3>
              
// // // // // // // // // // //               {isRegistered ? (
// // // // // // // // // // //                 <button className="edp-btn edp-btn-primary" onClick={() => setShowTicket(true)} style={{ background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none' }}>
// // // // // // // // // // //                   <i className="fa-solid fa-ticket"></i> View Ticket
// // // // // // // // // // //                 </button>
// // // // // // // // // // //               ) : actualStatus === "upcoming" && participants < capacity ? (
// // // // // // // // // // //                 <button className="edp-btn edp-btn-primary" onClick={handleRegister}>
// // // // // // // // // // //                   <i className="fa-solid fa-user-plus"></i> Participate Now
// // // // // // // // // // //                 </button>
// // // // // // // // // // //               ) : actualStatus === "ongoing" ? (
// // // // // // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // // // // // //                   <i className="fa-solid fa-spinner"></i> Event In Progress
// // // // // // // // // // //                 </button>
// // // // // // // // // // //               ) : actualStatus === "completed" ? (
// // // // // // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // // // // // //                   <i className="fa-solid fa-circle-check"></i> Event Completed
// // // // // // // // // // //                 </button>
// // // // // // // // // // //               ) : actualStatus === "cancelled" ? (
// // // // // // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // // // // // //                   <i className="fa-solid fa-circle-xmark"></i> Event Cancelled
// // // // // // // // // // //                 </button>
// // // // // // // // // // //               ) : (
// // // // // // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // // // // // //                   <i className="fa-solid fa-ban"></i> Event Full
// // // // // // // // // // //                 </button>
// // // // // // // // // // //               )}
// // // // // // // // // // //               <button className="edp-btn edp-btn-ghost" onClick={onBack}>
// // // // // // // // // // //                 <i className="fa-solid fa-arrow-left"></i> Back to Events
// // // // // // // // // // //               </button>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           )}

// // // // // // // // // // //           <div className="edp-side-card">
// // // // // // // // // // //             <h3>Event Details</h3>
// // // // // // // // // // //             <div className="edp-detail-row"><span>Category</span><strong>{event.category}</strong></div>
// // // // // // // // // // //             <div className="edp-detail-row"><span>Status</span><strong className={`edp-status-text ${getStatusClass(actualStatus)}`}>{actualStatus}</strong></div>
// // // // // // // // // // //             <div className="edp-detail-row"><span>Event ID</span><strong>EV-{String(event.id).padStart(3, "0")}</strong></div>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>

// // // // // // // // // // //       {/* 🔥 VIRTUAL TICKET MODAL */}
// // // // // // // // // // //       {showTicket && (
// // // // // // // // // // //         <div className="ticket-overlay" onClick={() => setShowTicket(false)}>
// // // // // // // // // // //           <div className="ticket-card" onClick={(e) => e.stopPropagation()}>
            
// // // // // // // // // // //             <div className="ticket-header">
// // // // // // // // // // //               <div className="ticket-logo">
// // // // // // // // // // //                 <i className="fa-solid fa-plane"></i> ClubPilot
// // // // // // // // // // //               </div>
// // // // // // // // // // //               <h2>{event.title}</h2>
// // // // // // // // // // //               <span className="ticket-status">{actualStatus.toUpperCase()}</span>
// // // // // // // // // // //             </div>
            
// // // // // // // // // // //             <div className="ticket-divider">
// // // // // // // // // // //               <div className="cutout left"></div>
// // // // // // // // // // //               <div className="dashed-line"></div>
// // // // // // // // // // //               <div className="cutout right"></div>
// // // // // // // // // // //             </div>
            
// // // // // // // // // // //             <div className="ticket-body">
// // // // // // // // // // //               <div className="ticket-info">
// // // // // // // // // // //                 <div className="info-group">
// // // // // // // // // // //                   <span className="info-label">Attendee Name</span>
// // // // // // // // // // //                   <span className="info-value">{userId ? formatName(userId) : 'Guest'}</span>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //                 <div className="info-group">
// // // // // // // // // // //                   <span className="info-label">Date</span>
// // // // // // // // // // //                   <span className="info-value">{formatDate(event.date)}</span>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //                 <div className="info-group">
// // // // // // // // // // //                   <span className="info-label">Time</span>
// // // // // // // // // // //                   <span className="info-value">{event.time}</span>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //                 <div className="info-group">
// // // // // // // // // // //                   <span className="info-label">Venue</span>
// // // // // // // // // // //                   <span className="info-value">{event.venue}</span>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //               </div>

// // // // // // // // // // //               <div className="ticket-qr-section">
// // // // // // // // // // //                 <div className="ticket-id-container">
// // // // // // // // // // //                   <span className="ticket-label">PASS ID</span>
// // // // // // // // // // //                   <span className="ticket-number">#EV-{String(event.id).padStart(3, '0')}-{userId ? userId.split('_')[1] : '00'}</span>
// // // // // // // // // // //                 </div>
                
// // // // // // // // // // //                 <div className="qr-frame">
// // // // // // // // // // //                   <QRCode 
// // // // // // // // // // //                     value={ticketUrl} 
// // // // // // // // // // //                     size={130} 
// // // // // // // // // // //                     bgColor="#ffffff"
// // // // // // // // // // //                     fgColor="#1e293b"
// // // // // // // // // // //                   />
// // // // // // // // // // //                 </div>
                
// // // // // // // // // // //                 <p className="scan-instruction">
// // // // // // // // // // //                   <i className="fa-solid fa-camera"></i> Scan to view event details
// // // // // // // // // // //                 </p>
// // // // // // // // // // //               </div>
// // // // // // // // // // //             </div>

// // // // // // // // // // //             <div className="ticket-footer">
// // // // // // // // // // //               <button className="ticket-close-btn" onClick={() => setShowTicket(false)}>
// // // // // // // // // // //                 Close Ticket
// // // // // // // // // // //               </button>
// // // // // // // // // // //             </div>

// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       )}

// // // // // // // // // // //       {/* 🔥 OTP VERIFICATION MODAL */}
// // // // // // // // // // //       {showOtpModal && (
// // // // // // // // // // //         <div className="ticket-overlay" onClick={() => setShowOtpModal(false)}>
// // // // // // // // // // //           <div className="ticket-card" style={{ maxWidth: '350px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            
// // // // // // // // // // //             <div className="ticket-header" style={{ background: '#1e293b' }}>
// // // // // // // // // // //               <h2 style={{ fontSize: '20px' }}>Verify Attendance</h2>
// // // // // // // // // // //               <p style={{ fontSize: '12px', marginTop: '5px', color: '#94a3b8' }}>Enter the code from notification</p>
// // // // // // // // // // //             </div>
            
// // // // // // // // // // //             <div className="ticket-body" style={{ padding: '30px 24px' }}>
// // // // // // // // // // //               <input 
// // // // // // // // // // //                 type="text" 
// // // // // // // // // // //                 maxLength={4}
// // // // // // // // // // //                 placeholder="----"
// // // // // // // // // // //                 value={otpInput}
// // // // // // // // // // //                 onChange={(e) => {
// // // // // // // // // // //                   setOtpInput(e.target.value.replace(/\D/g, ''));
// // // // // // // // // // //                   setOtpError('');
// // // // // // // // // // //                 }}
// // // // // // // // // // //                 style={{ 
// // // // // // // // // // //                   width: '100%', fontSize: '32px', textAlign: 'center', letterSpacing: '10px', 
// // // // // // // // // // //                   padding: '10px', borderRadius: '12px', border: '2px solid #e2e8f0', outline: 'none',
// // // // // // // // // // //                   fontWeight: 'bold', color: '#1e293b'
// // // // // // // // // // //                 }}
// // // // // // // // // // //               />
              
// // // // // // // // // // //               {otpError && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '10px', fontWeight: 'bold' }}>{otpError}</p>}

// // // // // // // // // // //               <button 
// // // // // // // // // // //                 className="ticket-close-btn" 
// // // // // // // // // // //                 style={{ marginTop: '20px', background: '#6366f1', color: 'white' }}
// // // // // // // // // // //                 onClick={async () => {
// // // // // // // // // // //                   if (otpInput === generatedOtp && generatedOtp !== '') {
// // // // // // // // // // //                     // 🔥 YAHAN LOCAL PENDING TRUE KAR RAHE HAIN
// // // // // // // // // // //                     setLocalPending(true); 
                    
// // // // // // // // // // //                     const newPending = [...pendingAttendance, userId];
// // // // // // // // // // //                     const newRejected = rejectedBy.filter((n) => n !== userId);
                    
// // // // // // // // // // //                     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // // // // // // // //                     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
                    
// // // // // // // // // // //                     setShowOtpModal(false);
                    
// // // // // // // // // // //                     setAlertHeading("Attendance Recorded");
// // // // // // // // // // //                     setAlertText("Your attendance has been successfully marked. The organizer will verify it shortly.");
// // // // // // // // // // //                     setIsAlertVisible(true);
                    
// // // // // // // // // // //                   } else {
// // // // // // // // // // //                     setOtpError("Invalid code. Please check the notification.");
// // // // // // // // // // //                   }
// // // // // // // // // // //                 }}
// // // // // // // // // // //               >
// // // // // // // // // // //                 Verify & Send Request
// // // // // // // // // // //               </button>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       )}

// // // // // // // // // // //       {/* 🔥 CUSTOM SUCCESS ALERT MODAL */}
// // // // // // // // // // //       {isAlertVisible && (
// // // // // // // // // // //         <div className="ticket-overlay" onClick={() => setIsAlertVisible(false)}>
// // // // // // // // // // //           <div className="ticket-card" style={{ maxWidth: '340px', padding: '32px 24px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
// // // // // // // // // // //             <div style={{ width: '70px', height: '70px', background: '#ecfdf5', color: '#10b981', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px', margin: '0 auto 20px' }}>
// // // // // // // // // // //               <i className="fa-solid fa-check"></i>
// // // // // // // // // // //             </div>
// // // // // // // // // // //             <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#1e293b' }}>{alertHeading}</h3>
// // // // // // // // // // //             <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>{alertText}</p>
// // // // // // // // // // //             <button className="ticket-close-btn" style={{ background: '#10b981', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', width: '100%' }} onClick={() => setIsAlertVisible(false)}>
// // // // // // // // // // //               Understood
// // // // // // // // // // //             </button>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       )}

// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // }

// // // // // // // // // // // export default EventDetailPage;

// // // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // // import "./EventDetailPage.css";
// // // // // // // // // // import { useTheme } from './ThemeContext';
// // // // // // // // // // import QRCode from 'react-qr-code';

// // // // // // // // // // const fixEventStatus = (event) => {
// // // // // // // // // //   if (!event) return 'upcoming';
// // // // // // // // // //   if (event.status === 'cancelled' || event.status === 'completed') return event.status;
// // // // // // // // // //   const now = new Date();
// // // // // // // // // //   const [startStr, endStr] = (event.time || '').split(' - ');
// // // // // // // // // //   if (!event.date || !startStr || !endStr) return event.status;
  
// // // // // // // // // //   const start = new Date(`${event.date}T${startStr.trim()}:00`);
// // // // // // // // // //   const end = new Date(`${event.date}T${endStr.trim()}:00`);
  
// // // // // // // // // //   if (now >= start && now < end) return 'ongoing';
// // // // // // // // // //   if (now >= end) return 'completed';
// // // // // // // // // //   return 'upcoming';
// // // // // // // // // // };

// // // // // // // // // // const formatDate = (dateString) => {
// // // // // // // // // //   if (!dateString) return '';
// // // // // // // // // //   const d = new Date(dateString);
// // // // // // // // // //   if (isNaN(d.getTime())) return dateString; 
// // // // // // // // // //   const year = d.getFullYear();
// // // // // // // // // //   const month = String(d.getMonth() + 1).padStart(2, '0');
// // // // // // // // // //   const day = String(d.getDate()).padStart(2, '0');
// // // // // // // // // //   return `${year}-${month}-${day}`;
// // // // // // // // // // };

// // // // // // // // // // function EventDetailPage({ eventId, onBack, role, currentMemberId, dispatch }) {
// // // // // // // // // //   const { darkMode } = useTheme();
// // // // // // // // // //   const [event, setEvent] = useState(null);
// // // // // // // // // //   const [loading, setLoading] = useState(true);
  
// // // // // // // // // //   const [showTicket, setShowTicket] = useState(false);
// // // // // // // // // //   const [showNotifDropdown, setShowNotifDropdown] = useState(false);
// // // // // // // // // //   const [showOtpModal, setShowOtpModal] = useState(false);
  
// // // // // // // // // //   const [otpInput, setOtpInput] = useState('');
// // // // // // // // // //   const [generatedOtp, setGeneratedOtp] = useState('');
// // // // // // // // // //   const [otpError, setOtpError] = useState('');

// // // // // // // // // //   // 🔥 NAYA STATE: Local Storage se persistent check
// // // // // // // // // //   const storageKey = `clubpilot_pending_${eventId}`;
// // // // // // // // // //   const [localPending, setLocalPending] = useState(() => {
// // // // // // // // // //     return localStorage.getItem(storageKey) === 'true';
// // // // // // // // // //   });

// // // // // // // // // //   const [isAlertVisible, setIsAlertVisible] = useState(false);
// // // // // // // // // //   const [alertText, setAlertText] = useState('');
// // // // // // // // // //   const [alertHeading, setAlertHeading] = useState('');

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     const fetchEvent = async () => {
// // // // // // // // // //       try {
// // // // // // // // // //         const res = await fetch('http://localhost:5000/api/events');
// // // // // // // // // //         if (!res.ok) throw new Error("Backend error");
        
// // // // // // // // // //         const allEvents = await res.json();
// // // // // // // // // //         if (Array.isArray(allEvents)) {
// // // // // // // // // //           const found = allEvents.find(e => String(e.id) === String(eventId));
// // // // // // // // // //           if (found) setEvent(found);
// // // // // // // // // //         }
// // // // // // // // // //       } catch (err) {
// // // // // // // // // //         console.error("🔥 FETCH EVENT ERROR:", err.message);
// // // // // // // // // //       } finally {
// // // // // // // // // //         setLoading(false);
// // // // // // // // // //       }
// // // // // // // // // //     };
// // // // // // // // // //     fetchEvent();
// // // // // // // // // //   }, [eventId]);

// // // // // // // // // //   if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading event details...</div>;

// // // // // // // // // //   if (!event) {
// // // // // // // // // //     return (
// // // // // // // // // //       <div className="edp-wrap">
// // // // // // // // // //         <button className="edp-back" onClick={onBack}>
// // // // // // // // // //           <i className="fa-solid fa-arrow-left"></i> Back to Events
// // // // // // // // // //         </button>
// // // // // // // // // //         <div className="edp-notfound">
// // // // // // // // // //           <h1>Event Not Found</h1>
// // // // // // // // // //           <p>The event you are looking for does not exist or backend is down.</p>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //     );
// // // // // // // // // //   }

// // // // // // // // // //   const actualStatus = fixEventStatus(event);
// // // // // // // // // //   const capacity = event.capacity || 50;
// // // // // // // // // //   const participants = event.participants || 0;
// // // // // // // // // //   const percentage = Math.round((participants / capacity) * 100);
// // // // // // // // // //   const seatsLeft = capacity - participants;
  
// // // // // // // // // //   const userId = (() => {
// // // // // // // // // //     const mid = currentMemberId ?? sessionStorage.getItem('currentMemberId');
// // // // // // // // // //     if (mid && role) return `${role}_${mid}`;
// // // // // // // // // //     if (role) {
// // // // // // // // // //       let sid = sessionStorage.getItem('__uid');
// // // // // // // // // //       if (!sid) {
// // // // // // // // // //         sid = String(Date.now());
// // // // // // // // // //         sessionStorage.setItem('__uid', sid);
// // // // // // // // // //       }
// // // // // // // // // //       return `${role}_${sid}`;
// // // // // // // // // //     }
// // // // // // // // // //     return null;
// // // // // // // // // //   })();

// // // // // // // // // //   const attendedBy = event.attendedBy || [];
// // // // // // // // // //   const pendingAttendance = event.pendingAttendance || [];
// // // // // // // // // //   const rejectedBy = event.rejectedBy || [];
// // // // // // // // // //   const participantNames = event.participantNames || [];

// // // // // // // // // //   const isRegistered = userId ? participantNames.map(String).includes(String(userId)) : false;
// // // // // // // // // //   const isUserAttended = userId ? attendedBy.map(String).includes(String(userId)) : false;
  
// // // // // // // // // //   // 🔥 LocalStorage ya backend dono mein se kahin bhi true ho toh Pending dikhayega
// // // // // // // // // //   const isUserPending = userId ? (pendingAttendance.map(String).includes(String(userId)) || localPending) : false; 
  
// // // // // // // // // //   const isUserRejected = userId ? rejectedBy.map(String).includes(String(userId)) : false;

// // // // // // // // // //   const nonPendingParticipants = participantNames.filter(
// // // // // // // // // //     (name) => !pendingAttendance.map(String).includes(String(name))
// // // // // // // // // //   );

// // // // // // // // // //   const getStatusClass = (status) => status.toLowerCase().replace(/ /g, "-");

// // // // // // // // // //   const formatName = (name) => {
// // // // // // // // // //     if (name.startsWith("user_")) return `User ${name.slice(5)}`;
// // // // // // // // // //     if (name.startsWith("core-member_")) return `Core Member ${name.slice(12)}`;
// // // // // // // // // //     if (name.startsWith("admin")) return "Admin";
// // // // // // // // // //     if (name.startsWith("leader")) return "Leader";
// // // // // // // // // //     if (name.startsWith("user")) return `User ${name.replace("user", "")}`;
// // // // // // // // // //     if (name.startsWith("member")) return `Member ${name.replace("member", "")}`;
// // // // // // // // // //     return name;
// // // // // // // // // //   };

// // // // // // // // // //   const ticketUrl = `${window.location.origin}/events/${event.id}`;

// // // // // // // // // //   const updateDB = async (updatedFields) => {
// // // // // // // // // //     const bodyData = {
// // // // // // // // // //       participant_names: updatedFields.participantNames ?? participantNames,
// // // // // // // // // //       attended_by: updatedFields.attendedBy ?? attendedBy,
// // // // // // // // // //       pending_attendance: updatedFields.pendingAttendance ?? pendingAttendance,
// // // // // // // // // //       participants: updatedFields.participants ?? participants,
// // // // // // // // // //       status: updatedFields.status ?? event.status,
// // // // // // // // // //       rejected_by: updatedFields.rejectedBy ?? rejectedBy,
// // // // // // // // // //     };

// // // // // // // // // //     await fetch(`http://localhost:5000/api/events/${event.id}`, {
// // // // // // // // // //       method: 'PATCH',
// // // // // // // // // //       headers: { 'Content-Type': 'application/json' },
// // // // // // // // // //       body: JSON.stringify(bodyData)
// // // // // // // // // //     });
// // // // // // // // // //   };

// // // // // // // // // //   const handleRequestAttendance = async () => {
// // // // // // // // // //     if (!userId) return;
// // // // // // // // // //     if (actualStatus !== "ongoing") return;
// // // // // // // // // //     if (!isRegistered) return;
// // // // // // // // // //     if (isUserAttended || isUserPending) return;

// // // // // // // // // //     const newPending = [...pendingAttendance, userId];
// // // // // // // // // //     const newRejected = rejectedBy.filter((n) => n !== userId);

// // // // // // // // // //     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // // // // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
// // // // // // // // // //     setLocalPending(true);
// // // // // // // // // //     localStorage.setItem(storageKey, 'true');
// // // // // // // // // //   };

// // // // // // // // // //   const handleApprove = async (name) => {
// // // // // // // // // //     const newPending = pendingAttendance.filter((n) => n !== name);
// // // // // // // // // //     const newAttended = [...attendedBy, name];
    
// // // // // // // // // //     await updateDB({ pendingAttendance: newPending, attendedBy: newAttended });
// // // // // // // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, attendedBy: newAttended }));
// // // // // // // // // //   };

// // // // // // // // // //   const handleReject = async (name) => {
// // // // // // // // // //     const newPending = pendingAttendance.filter((n) => n !== name);
// // // // // // // // // //     const newRejected = [...rejectedBy, name];

// // // // // // // // // //     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // // // // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
// // // // // // // // // //   };

// // // // // // // // // //   const handleToggleAttendance = async (name) => {
// // // // // // // // // //     const present = attendedBy.map(String).includes(String(name));
// // // // // // // // // //     const updatedAttended = present ? attendedBy.filter((n) => n !== name) : [...attendedBy, name];

// // // // // // // // // //     await updateDB({ attendedBy: updatedAttended });
// // // // // // // // // //     setEvent(prev => ({ ...prev, attendedBy: updatedAttended }));
// // // // // // // // // //   };

// // // // // // // // // //   const handleRegister = async () => {
// // // // // // // // // //     if (actualStatus !== "upcoming") return;
// // // // // // // // // //     if (participants >= capacity) return;
// // // // // // // // // //     if (isRegistered) return;

// // // // // // // // // //     const updatedParticipantNames = [...participantNames, userId];
// // // // // // // // // //     const updatedParticipants = Number(participants) + 1;

// // // // // // // // // //     await updateDB({ participantNames: updatedParticipantNames, participants: updatedParticipants });
// // // // // // // // // //     setEvent(prev => ({ ...prev, participantNames: updatedParticipantNames, participants: updatedParticipants }));
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="edp-wrap">
// // // // // // // // // //       <div className="edp-hero">
// // // // // // // // // //         <div className="edp-hero-bg"></div>
// // // // // // // // // //         <button className="edp-back" onClick={onBack}>
// // // // // // // // // //           <i className="fa-solid fa-arrow-left"></i> Back
// // // // // // // // // //         </button>
// // // // // // // // // //         <div className="edp-hero-inner">
// // // // // // // // // //           <div className="edp-hero-info">
// // // // // // // // // //             <div className="edp-badges">
// // // // // // // // // //               <span className="edp-badge-category">{event.category}</span>
// // // // // // // // // //               <span className={`edp-badge-status ${getStatusClass(actualStatus)}`}>
// // // // // // // // // //                 <span className="dot"></span>
// // // // // // // // // //                 {actualStatus}
// // // // // // // // // //               </span>
// // // // // // // // // //             </div>
// // // // // // // // // //             <h1>{event.title}</h1>
// // // // // // // // // //             <p>{event.description}</p>
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>

// // // // // // // // // //       <div className="edp-stats">
// // // // // // // // // //         <div className="edp-stat">
// // // // // // // // // //           <div className="edp-stat-icon"><i className="fa-regular fa-calendar"></i></div>
// // // // // // // // // //           <div><span>Date</span><strong>{formatDate(event.date)}</strong></div>
// // // // // // // // // //         </div>
// // // // // // // // // //         <div className="edp-stat">
// // // // // // // // // //           <div className="edp-stat-icon"><i className="fa-regular fa-clock"></i></div>
// // // // // // // // // //           <div><span>Time</span><strong>{event.time}</strong></div>
// // // // // // // // // //         </div>
// // // // // // // // // //         <div className="edp-stat">
// // // // // // // // // //           <div className="edp-stat-icon"><i className="fa-solid fa-location-dot"></i></div>
// // // // // // // // // //           <div><span>Venue</span><strong>{event.venue}</strong></div>
// // // // // // // // // //         </div>
// // // // // // // // // //         <div className="edp-stat">
// // // // // // // // // //           <div className="edp-stat-icon"><i className="fa-solid fa-users"></i></div>
// // // // // // // // // //           <div><span>Participants</span><strong>{participants} / {capacity}</strong></div>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>

// // // // // // // // // //       <div className="edp-grid">
// // // // // // // // // //         <div className="edp-main">
// // // // // // // // // //           <div className="edp-card">
// // // // // // // // // //             <div className="edp-card-head">
// // // // // // // // // //               <div className="edp-accent"></div>
// // // // // // // // // //               <h2>About This Event</h2>
// // // // // // // // // //             </div>
// // // // // // // // // //             <p className="edp-body-text">{event.description}</p>
// // // // // // // // // //           </div>

// // // // // // // // // //           <div className="edp-card">
// // // // // // // // // //             <div className="edp-card-head">
// // // // // // // // // //               <div className="edp-accent"></div>
// // // // // // // // // //               <h2>Registration Progress</h2>
// // // // // // // // // //             </div>
// // // // // // // // // //             <div className="edp-capacity-top">
// // // // // // // // // //               <div>
// // // // // // // // // //                 <span className="edp-cap-label">Filled</span>
// // // // // // // // // //                 <strong className="edp-cap-percent">{percentage}%</strong>
// // // // // // // // // //               </div>
// // // // // // // // // //               <div className="edp-cap-right">
// // // // // // // // // //                 <span className="edp-cap-label">Seats Left</span>
// // // // // // // // // //                 <strong className="edp-cap-seats">{seatsLeft}</strong>
// // // // // // // // // //               </div>
// // // // // // // // // //             </div>
// // // // // // // // // //             <div className="edp-bar">
// // // // // // // // // //               <div className="edp-bar-fill" style={{ width: `${percentage}%` }}></div>
// // // // // // // // // //             </div>
// // // // // // // // // //             <div className="edp-capacity-bottom">
// // // // // // // // // //               <span>{participants} registered</span>
// // // // // // // // // //               <span>{capacity} total capacity</span>
// // // // // // // // // //             </div>
// // // // // // // // // //           </div>

// // // // // // // // // //           {actualStatus === "ongoing" && (
// // // // // // // // // //             <div className="edp-card">
// // // // // // // // // //               <div className="edp-card-head">
// // // // // // // // // //                 <div className="edp-accent"></div>
// // // // // // // // // //                 <h2>Attendance</h2>
// // // // // // // // // //                 <span className="edp-attend-count">
// // // // // // // // // //                   {attendedBy.length} / {participantNames.length} verified
// // // // // // // // // //                 </span>
// // // // // // // // // //               </div>

// // // // // // // // // //               {role === "user" && isRegistered && (
// // // // // // // // // //                 <div className="edp-user-attendance">
// // // // // // // // // //                   {isUserAttended ? (
// // // // // // // // // //                     <div className="edp-attendance-marked">
// // // // // // // // // //                       <i className="fa-solid fa-circle-check"></i>
// // // // // // // // // //                       <span>Your attendance is verified by Admin</span>
// // // // // // // // // //                     </div>
// // // // // // // // // //                   ) : isUserPending ? (
// // // // // // // // // //                     <div className="edp-attendance-pending" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
// // // // // // // // // //                       <i className="fa-solid fa-clock" style={{ fontSize: '20px' }}></i>
// // // // // // // // // //                       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
// // // // // // // // // //                         <strong style={{ fontSize: '14px' }}>Attendance Recorded</strong>
// // // // // // // // // //                         <span style={{ fontSize: '13px', opacity: 0.8 }}>Pending verification from the organizer.</span>
// // // // // // // // // //                       </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                   ) : isUserRejected ? (
// // // // // // // // // //                     <div className="edp-attendance-rejected">
// // // // // // // // // //                       <i className="fa-solid fa-circle-xmark"></i>
// // // // // // // // // //                       <div>
// // // // // // // // // //                         <span>Your request was rejected</span>
// // // // // // // // // //                         <small>You can request again</small>
// // // // // // // // // //                       </div>
// // // // // // // // // //                       <button className="edp-btn edp-btn-primary" onClick={handleRequestAttendance}>
// // // // // // // // // //                         <i className="fa-solid fa-rotate-right"></i> Request Again
// // // // // // // // // //                       </button>
// // // // // // // // // //                     </div>
// // // // // // // // // //                   ) : (
// // // // // // // // // //                     <button 
// // // // // // // // // //                       className="edp-btn edp-btn-primary" 
// // // // // // // // // //                       onClick={() => {
// // // // // // // // // //                         const code = Math.floor(1000 + Math.random() * 9000).toString();
// // // // // // // // // //                         setGeneratedOtp(code);
// // // // // // // // // //                         setShowNotifDropdown(true);
// // // // // // // // // //                       }}
// // // // // // // // // //                     >
// // // // // // // // // //                       <i className="fa-solid fa-hand"></i> Mark Attendance
// // // // // // // // // //                     </button>
// // // // // // // // // //                   )}
// // // // // // // // // //                 </div>
// // // // // // // // // //               )}

// // // // // // // // // //               {(role === "admin" || role === "leader") && (
// // // // // // // // // //                 <>
// // // // // // // // // //                   <div className="edp-verified-section">
// // // // // // // // // //                     <div className="edp-verified-head">
// // // // // // // // // //                       <h3><i className="fa-solid fa-users"></i> All Participants</h3>
// // // // // // // // // //                       <span className="edp-verified-count">{nonPendingParticipants.length}</span>
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div className="edp-attendance-list">
// // // // // // // // // //                       {nonPendingParticipants.length > 0 ? (
// // // // // // // // // //                         nonPendingParticipants.map((name) => {
// // // // // // // // // //                           const present = attendedBy.map(String).includes(String(name));
// // // // // // // // // //                           return (
// // // // // // // // // //                             <div key={name} className={`edp-attend-row ${present ? "present" : ""}`}>
// // // // // // // // // //                               <div className="edp-attend-user">
// // // // // // // // // //                                 <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
// // // // // // // // // //                                 <span>{formatName(name)}</span>
// // // // // // // // // //                               </div>
// // // // // // // // // //                               <button className={`edp-attend-toggle ${present ? "present" : ""}`} onClick={() => handleToggleAttendance(name)}>
// // // // // // // // // //                                 {present ? (<><i className="fa-solid fa-check"></i> Present</>) : (<><i className="fa-regular fa-circle"></i> Absent</>)}
// // // // // // // // // //                               </button>
// // // // // // // // // //                             </div>
// // // // // // // // // //                           );
// // // // // // // // // //                         })
// // // // // // // // // //                       ) : (
// // // // // // // // // //                         <p className="edp-attend-empty">No participants yet.</p>
// // // // // // // // // //                       )}
// // // // // // // // // //                     </div>
// // // // // // // // // //                   </div>

// // // // // // // // // //                   {pendingAttendance.length > 0 && (
// // // // // // // // // //                     <div className="edp-pending-section">
// // // // // // // // // //                       <div className="edp-pending-head">
// // // // // // // // // //                         <h3><i className="fa-solid fa-bell"></i> Pending Approval Requests</h3>
// // // // // // // // // //                         <span className="edp-pending-badge">{pendingAttendance.length}</span>
// // // // // // // // // //                       </div>
// // // // // // // // // //                       <div className="edp-attendance-list">
// // // // // // // // // //                         {pendingAttendance.map((name) => (
// // // // // // // // // //                           <div key={name} className="edp-attend-row pending">
// // // // // // // // // //                             <div className="edp-attend-user">
// // // // // // // // // //                               <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
// // // // // // // // // //                               <span>{formatName(name)}</span>
// // // // // // // // // //                             </div>
// // // // // // // // // //                             <div className="edp-approval-actions">
// // // // // // // // // //                               <button className="edp-approve-btn" onClick={() => handleApprove(name)}>
// // // // // // // // // //                                 <i className="fa-solid fa-check"></i> Approve
// // // // // // // // // //                               </button>
// // // // // // // // // //                               <button className="edp-reject-btn" onClick={() => handleReject(name)}>
// // // // // // // // // //                                 <i className="fa-solid fa-xmark"></i> Reject
// // // // // // // // // //                               </button>
// // // // // // // // // //                             </div>
// // // // // // // // // //                           </div>
// // // // // // // // // //                         ))}
// // // // // // // // // //                       </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                   )}
// // // // // // // // // //                 </>
// // // // // // // // // //               )}

// // // // // // // // // //               {role === "core-member" && (
// // // // // // // // // //                 <p className="edp-attend-empty">Attendance is managed by admin/leader.</p>
// // // // // // // // // //               )}
// // // // // // // // // //             </div>
// // // // // // // // // //           )}
// // // // // // // // // //         </div>

// // // // // // // // // //         <div className="edp-side">
// // // // // // // // // //           <div className="notif-bell-container">
// // // // // // // // // //             <button 
// // // // // // // // // //               className={`notif-bell-btn ${generatedOtp ? 'has-notif' : ''}`}
// // // // // // // // // //               onClick={() => setShowNotifDropdown(!showNotifDropdown)}
// // // // // // // // // //             >
// // // // // // // // // //               <i className="fa-solid fa-bell"></i>
// // // // // // // // // //               {generatedOtp && <span className="notif-dot"></span>}
// // // // // // // // // //             </button>

// // // // // // // // // //             {showNotifDropdown && (
// // // // // // // // // //               <div className="notif-dropdown">
// // // // // // // // // //                 <div className="notif-header">
// // // // // // // // // //                   <h4>Notifications</h4>
// // // // // // // // // //                   <button onClick={() => setShowNotifDropdown(false)}><i className="fa-solid fa-xmark"></i></button>
// // // // // // // // // //                 </div>
                
// // // // // // // // // //                 <div className="notif-body">
// // // // // // // // // //                   {generatedOtp ? (
// // // // // // // // // //                     <div className="notif-item">
// // // // // // // // // //                       <div className="notif-icon">
// // // // // // // // // //                         <i className="fa-solid fa-shield-halved"></i>
// // // // // // // // // //                       </div>
// // // // // // // // // //                       <div className="notif-text">
// // // // // // // // // //                         <p>Attendance Verification Code is ready.</p>
                        
// // // // // // // // // //                         <div className="otp-display-box">
// // // // // // // // // //                           <strong>{generatedOtp}</strong>
// // // // // // // // // //                         </div>
                        
// // // // // // // // // //                         <button 
// // // // // // // // // //                           className="notif-action-btn"
// // // // // // // // // //                           onClick={() => {
// // // // // // // // // //                             setShowNotifDropdown(false);
// // // // // // // // // //                             setShowOtpModal(true);
// // // // // // // // // //                           }}
// // // // // // // // // //                         >
// // // // // // // // // //                           Enter Code Now <i className="fa-solid fa-arrow-right"></i>
// // // // // // // // // //                         </button>
// // // // // // // // // //                       </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                   ) : (
// // // // // // // // // //                     <p className="no-notif">No new notifications</p>
// // // // // // // // // //                   )}
// // // // // // // // // //                 </div>
// // // // // // // // // //               </div>
// // // // // // // // // //             )}
// // // // // // // // // //           </div>

// // // // // // // // // //           {role === "user" && (
// // // // // // // // // //             <div className="edp-side-card">
// // // // // // // // // //               <h3>Quick Actions</h3>
              
// // // // // // // // // //               {isRegistered ? (
// // // // // // // // // //                 <button className="edp-btn edp-btn-primary" onClick={() => setShowTicket(true)} style={{ background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none' }}>
// // // // // // // // // //                   <i className="fa-solid fa-ticket"></i> View Ticket
// // // // // // // // // //                 </button>
// // // // // // // // // //               ) : actualStatus === "upcoming" && participants < capacity ? (
// // // // // // // // // //                 <button className="edp-btn edp-btn-primary" onClick={handleRegister}>
// // // // // // // // // //                   <i className="fa-solid fa-user-plus"></i> Participate Now
// // // // // // // // // //                 </button>
// // // // // // // // // //               ) : actualStatus === "ongoing" ? (
// // // // // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // // // // //                   <i className="fa-solid fa-spinner"></i> Event In Progress
// // // // // // // // // //                 </button>
// // // // // // // // // //               ) : actualStatus === "completed" ? (
// // // // // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // // // // //                   <i className="fa-solid fa-circle-check"></i> Event Completed
// // // // // // // // // //                 </button>
// // // // // // // // // //               ) : actualStatus === "cancelled" ? (
// // // // // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // // // // //                   <i className="fa-solid fa-circle-xmark"></i> Event Cancelled
// // // // // // // // // //                 </button>
// // // // // // // // // //               ) : (
// // // // // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // // // // //                   <i className="fa-solid fa-ban"></i> Event Full
// // // // // // // // // //                 </button>
// // // // // // // // // //               )}
// // // // // // // // // //               <button className="edp-btn edp-btn-ghost" onClick={onBack}>
// // // // // // // // // //                 <i className="fa-solid fa-arrow-left"></i> Back to Events
// // // // // // // // // //               </button>
// // // // // // // // // //             </div>
// // // // // // // // // //           )}

// // // // // // // // // //           <div className="edp-side-card">
// // // // // // // // // //             <h3>Event Details</h3>
// // // // // // // // // //             <div className="edp-detail-row"><span>Category</span><strong>{event.category}</strong></div>
// // // // // // // // // //             <div className="edp-detail-row"><span>Status</span><strong className={`edp-status-text ${getStatusClass(actualStatus)}`}>{actualStatus}</strong></div>
// // // // // // // // // //             <div className="edp-detail-row"><span>Event ID</span><strong>EV-{String(event.id).padStart(3, "0")}</strong></div>
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* 🔥 VIRTUAL TICKET MODAL */}
// // // // // // // // // //       {showTicket && (
// // // // // // // // // //         <div className="ticket-overlay" onClick={() => setShowTicket(false)}>
// // // // // // // // // //           <div className="ticket-card" onClick={(e) => e.stopPropagation()}>
            
// // // // // // // // // //             <div className="ticket-header">
// // // // // // // // // //               <div className="ticket-logo">
// // // // // // // // // //                 <i className="fa-solid fa-plane"></i> ClubPilot
// // // // // // // // // //               </div>
// // // // // // // // // //               <h2>{event.title}</h2>
// // // // // // // // // //               <span className="ticket-status">{actualStatus.toUpperCase()}</span>
// // // // // // // // // //             </div>
            
// // // // // // // // // //             <div className="ticket-divider">
// // // // // // // // // //               <div className="cutout left"></div>
// // // // // // // // // //               <div className="dashed-line"></div>
// // // // // // // // // //               <div className="cutout right"></div>
// // // // // // // // // //             </div>
            
// // // // // // // // // //             <div className="ticket-body">
// // // // // // // // // //               <div className="ticket-info">
// // // // // // // // // //                 <div className="info-group">
// // // // // // // // // //                   <span className="info-label">Attendee Name</span>
// // // // // // // // // //                   <span className="info-value">{userId ? formatName(userId) : 'Guest'}</span>
// // // // // // // // // //                 </div>
// // // // // // // // // //                 <div className="info-group">
// // // // // // // // // //                   <span className="info-label">Date</span>
// // // // // // // // // //                   <span className="info-value">{formatDate(event.date)}</span>
// // // // // // // // // //                 </div>
// // // // // // // // // //                 <div className="info-group">
// // // // // // // // // //                   <span className="info-label">Time</span>
// // // // // // // // // //                   <span className="info-value">{event.time}</span>
// // // // // // // // // //                 </div>
// // // // // // // // // //                 <div className="info-group">
// // // // // // // // // //                   <span className="info-label">Venue</span>
// // // // // // // // // //                   <span className="info-value">{event.venue}</span>
// // // // // // // // // //                 </div>
// // // // // // // // // //               </div>

// // // // // // // // // //               <div className="ticket-qr-section">
// // // // // // // // // //                 <div className="ticket-id-container">
// // // // // // // // // //                   <span className="ticket-label">PASS ID</span>
// // // // // // // // // //                   <span className="ticket-number">#EV-{String(event.id).padStart(3, '0')}-{userId ? userId.split('_')[1] : '00'}</span>
// // // // // // // // // //                 </div>
                
// // // // // // // // // //                 <div className="qr-frame">
// // // // // // // // // //                   <QRCode 
// // // // // // // // // //                     value={ticketUrl} 
// // // // // // // // // //                     size={130} 
// // // // // // // // // //                     bgColor="#ffffff"
// // // // // // // // // //                     fgColor="#1e293b"
// // // // // // // // // //                   />
// // // // // // // // // //                 </div>
                
// // // // // // // // // //                 <p className="scan-instruction">
// // // // // // // // // //                   <i className="fa-solid fa-camera"></i> Scan to view event details
// // // // // // // // // //                 </p>
// // // // // // // // // //               </div>
// // // // // // // // // //             </div>

// // // // // // // // // //             <div className="ticket-footer">
// // // // // // // // // //               <button className="ticket-close-btn" onClick={() => setShowTicket(false)}>
// // // // // // // // // //                 Close Ticket
// // // // // // // // // //               </button>
// // // // // // // // // //             </div>

// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //       )}

// // // // // // // // // //       {/* 🔥 OTP VERIFICATION MODAL */}
// // // // // // // // // //       {showOtpModal && (
// // // // // // // // // //         <div className="ticket-overlay" onClick={() => setShowOtpModal(false)}>
// // // // // // // // // //           <div className="ticket-card" style={{ maxWidth: '350px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            
// // // // // // // // // //             <div className="ticket-header" style={{ background: '#1e293b' }}>
// // // // // // // // // //               <h2 style={{ fontSize: '20px' }}>Verify Attendance</h2>
// // // // // // // // // //               <p style={{ fontSize: '12px', marginTop: '5px', color: '#94a3b8' }}>Enter the code from notification</p>
// // // // // // // // // //             </div>
            
// // // // // // // // // //             <div className="ticket-body" style={{ padding: '30px 24px' }}>
// // // // // // // // // //               <input 
// // // // // // // // // //                 type="text" 
// // // // // // // // // //                 maxLength={4}
// // // // // // // // // //                 placeholder="----"
// // // // // // // // // //                 value={otpInput}
// // // // // // // // // //                 onChange={(e) => {
// // // // // // // // // //                   setOtpInput(e.target.value.replace(/\D/g, ''));
// // // // // // // // // //                   setOtpError('');
// // // // // // // // // //                 }}
// // // // // // // // // //                 style={{ 
// // // // // // // // // //                   width: '100%', fontSize: '32px', textAlign: 'center', letterSpacing: '10px', 
// // // // // // // // // //                   padding: '10px', borderRadius: '12px', border: '2px solid #e2e8f0', outline: 'none',
// // // // // // // // // //                   fontWeight: 'bold', color: '#1e293b'
// // // // // // // // // //                 }}
// // // // // // // // // //               />
              
// // // // // // // // // //               {otpError && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '10px', fontWeight: 'bold' }}>{otpError}</p>}

// // // // // // // // // //               <button 
// // // // // // // // // //                 className="ticket-close-btn" 
// // // // // // // // // //                 style={{ marginTop: '20px', background: '#6366f1', color: 'white' }}
// // // // // // // // // //                 onClick={async () => {
// // // // // // // // // //                   if (otpInput === generatedOtp && generatedOtp !== '') {
// // // // // // // // // //                     // 🔥 Yahan LocalStorage mein save kar liya taaki state reset na ho
// // // // // // // // // //                     setLocalPending(true);
// // // // // // // // // //                     localStorage.setItem(storageKey, 'true');
                    
// // // // // // // // // //                     const newPending = [...pendingAttendance, userId];
// // // // // // // // // //                     const newRejected = rejectedBy.filter((n) => n !== userId);
                    
// // // // // // // // // //                     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // // // // // // //                     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
                    
// // // // // // // // // //                     setShowOtpModal(false);
                    
// // // // // // // // // //                     setAlertHeading("Attendance Recorded");
// // // // // // // // // //                     setAlertText("Your attendance has been successfully marked. The organizer will verify it shortly.");
// // // // // // // // // //                     setIsAlertVisible(true);
                    
// // // // // // // // // //                   } else {
// // // // // // // // // //                     setOtpError("Invalid code. Please check the notification.");
// // // // // // // // // //                   }
// // // // // // // // // //                 }}
// // // // // // // // // //               >
// // // // // // // // // //                 Verify & Send Request
// // // // // // // // // //               </button>
// // // // // // // // // //             </div>
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //       )}

// // // // // // // // // //       {/* 🔥 CUSTOM SUCCESS ALERT MODAL */}
// // // // // // // // // //       {isAlertVisible && (
// // // // // // // // // //         <div className="ticket-overlay" onClick={() => setIsAlertVisible(false)}>
// // // // // // // // // //           <div className="ticket-card" style={{ maxWidth: '340px', padding: '32px 24px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
// // // // // // // // // //             <div style={{ width: '70px', height: '70px', background: '#ecfdf5', color: '#10b981', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px', margin: '0 auto 20px' }}>
// // // // // // // // // //               <i className="fa-solid fa-check"></i>
// // // // // // // // // //             </div>
// // // // // // // // // //             <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#1e293b' }}>{alertHeading}</h3>
// // // // // // // // // //             <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>{alertText}</p>
// // // // // // // // // //             <button className="ticket-close-btn" style={{ background: '#10b981', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', width: '100%' }} onClick={() => setIsAlertVisible(false)}>
// // // // // // // // // //               Understood
// // // // // // // // // //             </button>
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //       )}

// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }

// // // // // // // // // // export default EventDetailPage;

// // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // import "./EventDetailPage.css";
// // // // // // // // // import { useTheme } from './ThemeContext';
// // // // // // // // // import QRCode from 'react-qr-code';

// // // // // // // // // const fixEventStatus = (event) => {
// // // // // // // // //   if (!event) return 'upcoming';
// // // // // // // // //   if (event.status === 'cancelled' || event.status === 'completed') return event.status;
// // // // // // // // //   const now = new Date();
// // // // // // // // //   const [startStr, endStr] = (event.time || '').split(' - ');
// // // // // // // // //   if (!event.date || !startStr || !endStr) return event.status;
  
// // // // // // // // //   const start = new Date(`${event.date}T${startStr.trim()}:00`);
// // // // // // // // //   const end = new Date(`${event.date}T${endStr.trim()}:00`);
  
// // // // // // // // //   if (now >= start && now < end) return 'ongoing';
// // // // // // // // //   if (now >= end) return 'completed';
// // // // // // // // //   return 'upcoming';
// // // // // // // // // };

// // // // // // // // // const formatDate = (dateString) => {
// // // // // // // // //   if (!dateString) return '';
// // // // // // // // //   const d = new Date(dateString);
// // // // // // // // //   if (isNaN(d.getTime())) return dateString; 
// // // // // // // // //   const year = d.getFullYear();
// // // // // // // // //   const month = String(d.getMonth() + 1).padStart(2, '0');
// // // // // // // // //   const day = String(d.getDate()).padStart(2, '0');
// // // // // // // // //   return `${year}-${month}-${day}`;
// // // // // // // // // };

// // // // // // // // // function EventDetailPage({ eventId, onBack, role, currentMemberId, dispatch }) {
// // // // // // // // //   const { darkMode } = useTheme();
// // // // // // // // //   const [event, setEvent] = useState(null);
// // // // // // // // //   const [loading, setLoading] = useState(true);
  
// // // // // // // // //   const [showTicket, setShowTicket] = useState(false);
// // // // // // // // //   const [showNotifDropdown, setShowNotifDropdown] = useState(false);
// // // // // // // // //   const [showOtpModal, setShowOtpModal] = useState(false);
  
// // // // // // // // //   const [otpInput, setOtpInput] = useState('');
// // // // // // // // //   const [generatedOtp, setGeneratedOtp] = useState('');
// // // // // // // // //   const [otpError, setOtpError] = useState('');

// // // // // // // // //   // 🔥 Local Storage se persistent check
// // // // // // // // //   const storageKey = `clubpilot_pending_${eventId}`;
// // // // // // // // //   const [localPending, setLocalPending] = useState(() => {
// // // // // // // // //     return localStorage.getItem(storageKey) === 'true';
// // // // // // // // //   });

// // // // // // // // //   const [isAlertVisible, setIsAlertVisible] = useState(false);
// // // // // // // // //   const [alertText, setAlertText] = useState('');
// // // // // // // // //   const [alertHeading, setAlertHeading] = useState('');

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const fetchEvent = async () => {
// // // // // // // // //       try {
// // // // // // // // //         const res = await fetch('http://localhost:5000/api/events');
// // // // // // // // //         if (!res.ok) throw new Error("Backend error");
        
// // // // // // // // //         const allEvents = await res.json();
// // // // // // // // //         if (Array.isArray(allEvents)) {
// // // // // // // // //           const found = allEvents.find(e => String(e.id) === String(eventId));
// // // // // // // // //           if (found) setEvent(found);
// // // // // // // // //         }
// // // // // // // // //       } catch (err) {
// // // // // // // // //         console.error("🔥 FETCH EVENT ERROR:", err.message);
// // // // // // // // //       } finally {
// // // // // // // // //         setLoading(false);
// // // // // // // // //       }
// // // // // // // // //     };
// // // // // // // // //     fetchEvent();
// // // // // // // // //   }, [eventId]);

// // // // // // // // //   if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading event details...</div>;

// // // // // // // // //   if (!event) {
// // // // // // // // //     return (
// // // // // // // // //       <div className="edp-wrap">
// // // // // // // // //         <button className="edp-back" onClick={onBack}>
// // // // // // // // //           <i className="fa-solid fa-arrow-left"></i> Back to Events
// // // // // // // // //         </button>
// // // // // // // // //         <div className="edp-notfound">
// // // // // // // // //           <h1>Event Not Found</h1>
// // // // // // // // //           <p>The event you are looking for does not exist or backend is down.</p>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     );
// // // // // // // // //   }

// // // // // // // // //   const actualStatus = fixEventStatus(event);
// // // // // // // // //   const capacity = event.capacity || 50;
// // // // // // // // //   const participants = event.participants || 0;
// // // // // // // // //   const percentage = Math.round((participants / capacity) * 100);
// // // // // // // // //   const seatsLeft = capacity - participants;
  
// // // // // // // // //   const userId = (() => {
// // // // // // // // //     const mid = currentMemberId ?? sessionStorage.getItem('currentMemberId');
// // // // // // // // //     if (mid && role) return `${role}_${mid}`;
// // // // // // // // //     if (role) {
// // // // // // // // //       let sid = sessionStorage.getItem('__uid');
// // // // // // // // //       if (!sid) {
// // // // // // // // //         sid = String(Date.now());
// // // // // // // // //         sessionStorage.setItem('__uid', sid);
// // // // // // // // //       }
// // // // // // // // //       return `${role}_${sid}`;
// // // // // // // // //     }
// // // // // // // // //     return null;
// // // // // // // // //   })();

// // // // // // // // //   const attendedBy = event.attendedBy || [];
// // // // // // // // //   const pendingAttendance = event.pendingAttendance || [];
// // // // // // // // //   const rejectedBy = event.rejectedBy || [];
// // // // // // // // //   const participantNames = event.participantNames || [];

// // // // // // // // //   const isRegistered = userId ? participantNames.map(String).includes(String(userId)) : false;
// // // // // // // // //   const isUserAttended = userId ? attendedBy.map(String).includes(String(userId)) : false;
  
// // // // // // // // //   // 🔥 LocalStorage ya backend dono mein se kahin bhi true ho toh Pending dikhayega
// // // // // // // // //   const isUserPending = userId ? (pendingAttendance.map(String).includes(String(userId)) || localPending) : false; 
  
// // // // // // // // //   const isUserRejected = userId ? rejectedBy.map(String).includes(String(userId)) : false;

// // // // // // // // //   const getStatusClass = (status) => status.toLowerCase().replace(/ /g, "-");

// // // // // // // // //   const formatName = (name) => {
// // // // // // // // //     if (name.startsWith("user_")) return `User ${name.slice(5)}`;
// // // // // // // // //     if (name.startsWith("core-member_")) return `Core Member ${name.slice(12)}`;
// // // // // // // // //     if (name.startsWith("admin")) return "Admin";
// // // // // // // // //     if (name.startsWith("leader")) return "Leader";
// // // // // // // // //     if (name.startsWith("user")) return `User ${name.replace("user", "")}`;
// // // // // // // // //     if (name.startsWith("member")) return `Member ${name.replace("member", "")}`;
// // // // // // // // //     return name;
// // // // // // // // //   };

// // // // // // // // //   const ticketUrl = `${window.location.origin}/events/${event.id}`;

// // // // // // // // //   const updateDB = async (updatedFields) => {
// // // // // // // // //     const bodyData = {
// // // // // // // // //       participant_names: updatedFields.participantNames ?? participantNames,
// // // // // // // // //       attended_by: updatedFields.attendedBy ?? attendedBy,
// // // // // // // // //       pending_attendance: updatedFields.pendingAttendance ?? pendingAttendance,
// // // // // // // // //       participants: updatedFields.participants ?? participants,
// // // // // // // // //       status: updatedFields.status ?? event.status,
// // // // // // // // //       rejected_by: updatedFields.rejectedBy ?? rejectedBy,
// // // // // // // // //     };

// // // // // // // // //     await fetch(`http://localhost:5000/api/events/${event.id}`, {
// // // // // // // // //       method: 'PATCH',
// // // // // // // // //       headers: { 'Content-Type': 'application/json' },
// // // // // // // // //       body: JSON.stringify(bodyData)
// // // // // // // // //     });
// // // // // // // // //   };

// // // // // // // // //   const handleRequestAttendance = async () => {
// // // // // // // // //     if (!userId) return;
// // // // // // // // //     if (actualStatus !== "ongoing") return;
// // // // // // // // //     if (!isRegistered) return;
// // // // // // // // //     if (isUserAttended || isUserPending) return;

// // // // // // // // //     const newPending = [...pendingAttendance, userId];
// // // // // // // // //     const newRejected = rejectedBy.filter((n) => n !== userId);

// // // // // // // // //     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // // // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
// // // // // // // // //     setLocalPending(true);
// // // // // // // // //     localStorage.setItem(storageKey, 'true');
// // // // // // // // //   };

// // // // // // // // //   const handleApprove = async (name) => {
// // // // // // // // //     const newPending = pendingAttendance.filter((n) => n !== name);
// // // // // // // // //     const newAttended = [...attendedBy, name];
    
// // // // // // // // //     await updateDB({ pendingAttendance: newPending, attendedBy: newAttended });
// // // // // // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, attendedBy: newAttended }));
// // // // // // // // //   };

// // // // // // // // //   const handleReject = async (name) => {
// // // // // // // // //     const newPending = pendingAttendance.filter((n) => n !== name);
// // // // // // // // //     const newRejected = [...rejectedBy, name];

// // // // // // // // //     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // // // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
// // // // // // // // //   };

// // // // // // // // //   const handleToggleAttendance = async (name) => {
// // // // // // // // //     const present = attendedBy.map(String).includes(String(name));
// // // // // // // // //     const updatedAttended = present ? attendedBy.filter((n) => n !== name) : [...attendedBy, name];

// // // // // // // // //     await updateDB({ attendedBy: updatedAttended });
// // // // // // // // //     setEvent(prev => ({ ...prev, attendedBy: updatedAttended }));
// // // // // // // // //   };

// // // // // // // // //   const handleRegister = async () => {
// // // // // // // // //     if (actualStatus !== "upcoming") return;
// // // // // // // // //     if (participants >= capacity) return;
// // // // // // // // //     if (isRegistered) return;

// // // // // // // // //     const updatedParticipantNames = [...participantNames, userId];
// // // // // // // // //     const updatedParticipants = Number(participants) + 1;

// // // // // // // // //     await updateDB({ participantNames: updatedParticipantNames, participants: updatedParticipants });
// // // // // // // // //     setEvent(prev => ({ ...prev, participantNames: updatedParticipantNames, participants: updatedParticipants }));
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div className="edp-wrap">
// // // // // // // // //       <div className="edp-hero">
// // // // // // // // //         <div className="edp-hero-bg"></div>
// // // // // // // // //         <button className="edp-back" onClick={onBack}>
// // // // // // // // //           <i className="fa-solid fa-arrow-left"></i> Back
// // // // // // // // //         </button>
// // // // // // // // //         <div className="edp-hero-inner">
// // // // // // // // //           <div className="edp-hero-info">
// // // // // // // // //             <div className="edp-badges">
// // // // // // // // //               <span className="edp-badge-category">{event.category}</span>
// // // // // // // // //               <span className={`edp-badge-status ${getStatusClass(actualStatus)}`}>
// // // // // // // // //                 <span className="dot"></span>
// // // // // // // // //                 {actualStatus}
// // // // // // // // //               </span>
// // // // // // // // //             </div>
// // // // // // // // //             <h1>{event.title}</h1>
// // // // // // // // //             <p>{event.description}</p>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       <div className="edp-stats">
// // // // // // // // //         <div className="edp-stat">
// // // // // // // // //           <div className="edp-stat-icon"><i className="fa-regular fa-calendar"></i></div>
// // // // // // // // //           <div><span>Date</span><strong>{formatDate(event.date)}</strong></div>
// // // // // // // // //         </div>
// // // // // // // // //         <div className="edp-stat">
// // // // // // // // //           <div className="edp-stat-icon"><i className="fa-regular fa-clock"></i></div>
// // // // // // // // //           <div><span>Time</span><strong>{event.time}</strong></div>
// // // // // // // // //         </div>
// // // // // // // // //         <div className="edp-stat">
// // // // // // // // //           <div className="edp-stat-icon"><i className="fa-solid fa-location-dot"></i></div>
// // // // // // // // //           <div><span>Venue</span><strong>{event.venue}</strong></div>
// // // // // // // // //         </div>
// // // // // // // // //         <div className="edp-stat">
// // // // // // // // //           <div className="edp-stat-icon"><i className="fa-solid fa-users"></i></div>
// // // // // // // // //           <div><span>Participants</span><strong>{participants} / {capacity}</strong></div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       <div className="edp-grid">
// // // // // // // // //         <div className="edp-main">
// // // // // // // // //           <div className="edp-card">
// // // // // // // // //             <div className="edp-card-head">
// // // // // // // // //               <div className="edp-accent"></div>
// // // // // // // // //               <h2>About This Event</h2>
// // // // // // // // //             </div>
// // // // // // // // //             <p className="edp-body-text">{event.description}</p>
// // // // // // // // //           </div>

// // // // // // // // //           <div className="edp-card">
// // // // // // // // //             <div className="edp-card-head">
// // // // // // // // //               <div className="edp-accent"></div>
// // // // // // // // //               <h2>Registration Progress</h2>
// // // // // // // // //             </div>
// // // // // // // // //             <div className="edp-capacity-top">
// // // // // // // // //               <div>
// // // // // // // // //                 <span className="edp-cap-label">Filled</span>
// // // // // // // // //                 <strong className="edp-cap-percent">{percentage}%</strong>
// // // // // // // // //               </div>
// // // // // // // // //               <div className="edp-cap-right">
// // // // // // // // //                 <span className="edp-cap-label">Seats Left</span>
// // // // // // // // //                 <strong className="edp-cap-seats">{seatsLeft}</strong>
// // // // // // // // //               </div>
// // // // // // // // //             </div>
// // // // // // // // //             <div className="edp-bar">
// // // // // // // // //               <div className="edp-bar-fill" style={{ width: `${percentage}%` }}></div>
// // // // // // // // //             </div>
// // // // // // // // //             <div className="edp-capacity-bottom">
// // // // // // // // //               <span>{participants} registered</span>
// // // // // // // // //               <span>{capacity} total capacity</span>
// // // // // // // // //             </div>
// // // // // // // // //           </div>

// // // // // // // // //           {actualStatus === "ongoing" && (
// // // // // // // // //             <div className="edp-card">
// // // // // // // // //               <div className="edp-card-head">
// // // // // // // // //                 <div className="edp-accent"></div>
// // // // // // // // //                 <h2>Attendance</h2>
// // // // // // // // //                 <span className="edp-attend-count">
// // // // // // // // //                   {attendedBy.length} / {participantNames.length} verified
// // // // // // // // //                 </span>
// // // // // // // // //               </div>

// // // // // // // // //               {role === "user" && isRegistered && (
// // // // // // // // //                 <div className="edp-user-attendance">
// // // // // // // // //                   {isUserAttended ? (
// // // // // // // // //                     <div className="edp-attendance-marked">
// // // // // // // // //                       <i className="fa-solid fa-circle-check"></i>
// // // // // // // // //                       <span>Your attendance is verified by Admin</span>
// // // // // // // // //                     </div>
// // // // // // // // //                   ) : isUserPending ? (
// // // // // // // // //                     <div className="edp-attendance-pending" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
// // // // // // // // //                       <i className="fa-solid fa-clock" style={{ fontSize: '20px' }}></i>
// // // // // // // // //                       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
// // // // // // // // //                         <strong style={{ fontSize: '14px' }}>Attendance Recorded</strong>
// // // // // // // // //                         <span style={{ fontSize: '13px', opacity: 0.8 }}>Pending verification from the organizer.</span>
// // // // // // // // //                       </div>
// // // // // // // // //                     </div>
// // // // // // // // //                   ) : isUserRejected ? (
// // // // // // // // //                     <div className="edp-attendance-rejected">
// // // // // // // // //                       <i className="fa-solid fa-circle-xmark"></i>
// // // // // // // // //                       <div>
// // // // // // // // //                         <span>Your request was rejected</span>
// // // // // // // // //                         <small>You can request again</small>
// // // // // // // // //                       </div>
// // // // // // // // //                       <button className="edp-btn edp-btn-primary" onClick={handleRequestAttendance}>
// // // // // // // // //                         <i className="fa-solid fa-rotate-right"></i> Request Again
// // // // // // // // //                       </button>
// // // // // // // // //                     </div>
// // // // // // // // //                   ) : (
// // // // // // // // //                     <button 
// // // // // // // // //                       className="edp-btn edp-btn-primary" 
// // // // // // // // //                       onClick={() => {
// // // // // // // // //                         const code = Math.floor(1000 + Math.random() * 9000).toString();
// // // // // // // // //                         setGeneratedOtp(code);
// // // // // // // // //                         setShowNotifDropdown(true);
// // // // // // // // //                       }}
// // // // // // // // //                     >
// // // // // // // // //                       <i className="fa-solid fa-hand"></i> Mark Attendance
// // // // // // // // //                     </button>
// // // // // // // // //                   )}
// // // // // // // // //                 </div>
// // // // // // // // //               )}

// // // // // // // // //               {/* 🔥 ADMIN PANEL FIX: Saare participants ek list mein + Pending Status */}
// // // // // // // // //               {(role === "admin" || role === "leader") && (
// // // // // // // // //                 <div className="edp-verified-section" style={{ marginTop: '20px' }}>
// // // // // // // // //                   <div className="edp-verified-head">
// // // // // // // // //                     <h3><i className="fa-solid fa-users"></i> All Participants</h3>
// // // // // // // // //                     <span className="edp-verified-count">{participantNames.length}</span>
// // // // // // // // //                   </div>
// // // // // // // // //                   <div className="edp-attendance-list">
// // // // // // // // //                     {participantNames.length > 0 ? (
// // // // // // // // //                       participantNames.map((name) => {
// // // // // // // // //                         const isPresent = attendedBy.map(String).includes(String(name));
// // // // // // // // //                         const isPending = pendingAttendance.map(String).includes(String(name));
                        
// // // // // // // // //                         return (
// // // // // // // // //                           <div key={name} className={`edp-attend-row ${isPresent ? "present" : ""}`}>
// // // // // // // // //                             <div className="edp-attend-user">
// // // // // // // // //                               <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
// // // // // // // // //                               <div style={{ display: 'flex', flexDirection: 'column' }}>
// // // // // // // // //                                 <span>{formatName(name)}</span>
// // // // // // // // //                                 {isPending && <small style={{ color: '#d97706', fontWeight: 'bold' }}>Pending Request</small>}
// // // // // // // // //                                 {isPresent && <small style={{ color: '#059669', fontWeight: 'bold' }}>Present</small>}
// // // // // // // // //                               </div>
// // // // // // // // //                             </div>
                            
// // // // // // // // //                             {isPending ? (
// // // // // // // // //                               <div className="edp-approval-actions" style={{ display: 'flex', gap: '8px' }}>
// // // // // // // // //                                 <button className="edp-approve-btn" onClick={() => handleApprove(name)}>
// // // // // // // // //                                   <i className="fa-solid fa-check"></i> Approve
// // // // // // // // //                                 </button>
// // // // // // // // //                                 <button className="edp-reject-btn" onClick={() => handleReject(name)}>
// // // // // // // // //                                   <i className="fa-solid fa-xmark"></i> Reject
// // // // // // // // //                                 </button>
// // // // // // // // //                               </div>
// // // // // // // // //                             ) : (
// // // // // // // // //                               <button className={`edp-attend-toggle ${isPresent ? "present" : ""}`} onClick={() => handleToggleAttendance(name)}>
// // // // // // // // //                                 {isPresent ? (<><i className="fa-solid fa-check"></i> Present</>) : (<><i className="fa-regular fa-circle"></i> Absent</>)}
// // // // // // // // //                               </button>
// // // // // // // // //                             )}
// // // // // // // // //                           </div>
// // // // // // // // //                         );
// // // // // // // // //                       })
// // // // // // // // //                     ) : (
// // // // // // // // //                       <p className="edp-attend-empty">No participants yet.</p>
// // // // // // // // //                     )}
// // // // // // // // //                   </div>
// // // // // // // // //                 </div>
// // // // // // // // //               )}

// // // // // // // // //               {role === "core-member" && (
// // // // // // // // //                 <p className="edp-attend-empty">Attendance is managed by admin/leader.</p>
// // // // // // // // //               )}
// // // // // // // // //             </div>
// // // // // // // // //           )}
// // // // // // // // //         </div>

// // // // // // // // //         <div className="edp-side">
// // // // // // // // //           <div className="notif-bell-container">
// // // // // // // // //             <button 
// // // // // // // // //               className={`notif-bell-btn ${generatedOtp ? 'has-notif' : ''}`}
// // // // // // // // //               onClick={() => setShowNotifDropdown(!showNotifDropdown)}
// // // // // // // // //             >
// // // // // // // // //               <i className="fa-solid fa-bell"></i>
// // // // // // // // //               {generatedOtp && <span className="notif-dot"></span>}
// // // // // // // // //             </button>

// // // // // // // // //             {showNotifDropdown && (
// // // // // // // // //               <div className="notif-dropdown">
// // // // // // // // //                 <div className="notif-header">
// // // // // // // // //                   <h4>Notifications</h4>
// // // // // // // // //                   <button onClick={() => setShowNotifDropdown(false)}><i className="fa-solid fa-xmark"></i></button>
// // // // // // // // //                 </div>
                
// // // // // // // // //                 <div className="notif-body">
// // // // // // // // //                   {generatedOtp ? (
// // // // // // // // //                     <div className="notif-item">
// // // // // // // // //                       <div className="notif-icon">
// // // // // // // // //                         <i className="fa-solid fa-shield-halved"></i>
// // // // // // // // //                       </div>
// // // // // // // // //                       <div className="notif-text">
// // // // // // // // //                         <p>Attendance Verification Code is ready.</p>
                        
// // // // // // // // //                         <div className="otp-display-box">
// // // // // // // // //                           <strong>{generatedOtp}</strong>
// // // // // // // // //                         </div>
                        
// // // // // // // // //                         <button 
// // // // // // // // //                           className="notif-action-btn"
// // // // // // // // //                           onClick={() => {
// // // // // // // // //                             setShowNotifDropdown(false);
// // // // // // // // //                             setShowOtpModal(true);
// // // // // // // // //                           }}
// // // // // // // // //                         >
// // // // // // // // //                           Enter Code Now <i className="fa-solid fa-arrow-right"></i>
// // // // // // // // //                         </button>
// // // // // // // // //                       </div>
// // // // // // // // //                     </div>
// // // // // // // // //                   ) : (
// // // // // // // // //                     <p className="no-notif">No new notifications</p>
// // // // // // // // //                   )}
// // // // // // // // //                 </div>
// // // // // // // // //               </div>
// // // // // // // // //             )}
// // // // // // // // //           </div>

// // // // // // // // //           {role === "user" && (
// // // // // // // // //             <div className="edp-side-card">
// // // // // // // // //               <h3>Quick Actions</h3>
              
// // // // // // // // //               {isRegistered ? (
// // // // // // // // //                 <button className="edp-btn edp-btn-primary" onClick={() => setShowTicket(true)} style={{ background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none' }}>
// // // // // // // // //                   <i className="fa-solid fa-ticket"></i> View Ticket
// // // // // // // // //                 </button>
// // // // // // // // //               ) : actualStatus === "upcoming" && participants < capacity ? (
// // // // // // // // //                 <button className="edp-btn edp-btn-primary" onClick={handleRegister}>
// // // // // // // // //                   <i className="fa-solid fa-user-plus"></i> Participate Now
// // // // // // // // //                 </button>
// // // // // // // // //               ) : actualStatus === "ongoing" ? (
// // // // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // // // //                   <i className="fa-solid fa-spinner"></i> Event In Progress
// // // // // // // // //                 </button>
// // // // // // // // //               ) : actualStatus === "completed" ? (
// // // // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // // // //                   <i className="fa-solid fa-circle-check"></i> Event Completed
// // // // // // // // //                 </button>
// // // // // // // // //               ) : actualStatus === "cancelled" ? (
// // // // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // // // //                   <i className="fa-solid fa-circle-xmark"></i> Event Cancelled
// // // // // // // // //                 </button>
// // // // // // // // //               ) : (
// // // // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // // // //                   <i className="fa-solid fa-ban"></i> Event Full
// // // // // // // // //                 </button>
// // // // // // // // //               )}
// // // // // // // // //               <button className="edp-btn edp-btn-ghost" onClick={onBack}>
// // // // // // // // //                 <i className="fa-solid fa-arrow-left"></i> Back to Events
// // // // // // // // //               </button>
// // // // // // // // //             </div>
// // // // // // // // //           )}

// // // // // // // // //           <div className="edp-side-card">
// // // // // // // // //             <h3>Event Details</h3>
// // // // // // // // //             <div className="edp-detail-row"><span>Category</span><strong>{event.category}</strong></div>
// // // // // // // // //             <div className="edp-detail-row"><span>Status</span><strong className={`edp-status-text ${getStatusClass(actualStatus)}`}>{actualStatus}</strong></div>
// // // // // // // // //             <div className="edp-detail-row"><span>Event ID</span><strong>EV-{String(event.id).padStart(3, "0")}</strong></div>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       {/* 🔥 VIRTUAL TICKET MODAL */}
// // // // // // // // //       {showTicket && (
// // // // // // // // //         <div className="ticket-overlay" onClick={() => setShowTicket(false)}>
// // // // // // // // //           <div className="ticket-card" onClick={(e) => e.stopPropagation()}>
            
// // // // // // // // //             <div className="ticket-header">
// // // // // // // // //               <div className="ticket-logo">
// // // // // // // // //                 <i className="fa-solid fa-plane"></i> ClubPilot
// // // // // // // // //               </div>
// // // // // // // // //               <h2>{event.title}</h2>
// // // // // // // // //               <span className="ticket-status">{actualStatus.toUpperCase()}</span>
// // // // // // // // //             </div>
            
// // // // // // // // //             <div className="ticket-divider">
// // // // // // // // //               <div className="cutout left"></div>
// // // // // // // // //               <div className="dashed-line"></div>
// // // // // // // // //               <div className="cutout right"></div>
// // // // // // // // //             </div>
            
// // // // // // // // //             <div className="ticket-body">
// // // // // // // // //               <div className="ticket-info">
// // // // // // // // //                 <div className="info-group">
// // // // // // // // //                   <span className="info-label">Attendee Name</span>
// // // // // // // // //                   <span className="info-value">{userId ? formatName(userId) : 'Guest'}</span>
// // // // // // // // //                 </div>
// // // // // // // // //                 <div className="info-group">
// // // // // // // // //                   <span className="info-label">Date</span>
// // // // // // // // //                   <span className="info-value">{formatDate(event.date)}</span>
// // // // // // // // //                 </div>
// // // // // // // // //                 <div className="info-group">
// // // // // // // // //                   <span className="info-label">Time</span>
// // // // // // // // //                   <span className="info-value">{event.time}</span>
// // // // // // // // //                 </div>
// // // // // // // // //                 <div className="info-group">
// // // // // // // // //                   <span className="info-label">Venue</span>
// // // // // // // // //                   <span className="info-value">{event.venue}</span>
// // // // // // // // //                 </div>
// // // // // // // // //               </div>

// // // // // // // // //               <div className="ticket-qr-section">
// // // // // // // // //                 <div className="ticket-id-container">
// // // // // // // // //                   <span className="ticket-label">PASS ID</span>
// // // // // // // // //                   <span className="ticket-number">#EV-{String(event.id).padStart(3, '0')}-{userId ? userId.split('_')[1] : '00'}</span>
// // // // // // // // //                 </div>
                
// // // // // // // // //                 <div className="qr-frame">
// // // // // // // // //                   <QRCode 
// // // // // // // // //                     value={ticketUrl} 
// // // // // // // // //                     size={130} 
// // // // // // // // //                     bgColor="#ffffff"
// // // // // // // // //                     fgColor="#1e293b"
// // // // // // // // //                   />
// // // // // // // // //                 </div>
                
// // // // // // // // //                 <p className="scan-instruction">
// // // // // // // // //                   <i className="fa-solid fa-camera"></i> Scan to view event details
// // // // // // // // //                 </p>
// // // // // // // // //               </div>
// // // // // // // // //             </div>

// // // // // // // // //             <div className="ticket-footer">
// // // // // // // // //               <button className="ticket-close-btn" onClick={() => setShowTicket(false)}>
// // // // // // // // //                 Close Ticket
// // // // // // // // //               </button>
// // // // // // // // //             </div>

// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       )}

// // // // // // // // //       {/* 🔥 OTP VERIFICATION MODAL */}
// // // // // // // // //       {showOtpModal && (
// // // // // // // // //         <div className="ticket-overlay" onClick={() => setShowOtpModal(false)}>
// // // // // // // // //           <div className="ticket-card" style={{ maxWidth: '350px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            
// // // // // // // // //             <div className="ticket-header" style={{ background: '#1e293b' }}>
// // // // // // // // //               <h2 style={{ fontSize: '20px' }}>Verify Attendance</h2>
// // // // // // // // //               <p style={{ fontSize: '12px', marginTop: '5px', color: '#94a3b8' }}>Enter the code from notification</p>
// // // // // // // // //             </div>
            
// // // // // // // // //             <div className="ticket-body" style={{ padding: '30px 24px' }}>
// // // // // // // // //               <input 
// // // // // // // // //                 type="text" 
// // // // // // // // //                 maxLength={4}
// // // // // // // // //                 placeholder="----"
// // // // // // // // //                 value={otpInput}
// // // // // // // // //                 onChange={(e) => {
// // // // // // // // //                   setOtpInput(e.target.value.replace(/\D/g, ''));
// // // // // // // // //                   setOtpError('');
// // // // // // // // //                 }}
// // // // // // // // //                 style={{ 
// // // // // // // // //                   width: '100%', fontSize: '32px', textAlign: 'center', letterSpacing: '10px', 
// // // // // // // // //                   padding: '10px', borderRadius: '12px', border: '2px solid #e2e8f0', outline: 'none',
// // // // // // // // //                   fontWeight: 'bold', color: '#1e293b'
// // // // // // // // //                 }}
// // // // // // // // //               />
              
// // // // // // // // //               {otpError && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '10px', fontWeight: 'bold' }}>{otpError}</p>}

// // // // // // // // //               <button 
// // // // // // // // //                 className="ticket-close-btn" 
// // // // // // // // //                 style={{ marginTop: '20px', background: '#6366f1', color: 'white' }}
// // // // // // // // //                 onClick={async () => {
// // // // // // // // //                   if (otpInput === generatedOtp && generatedOtp !== '') {
// // // // // // // // //                     // 🔥 Yahan LocalStorage mein save kar liya taaki state reset na ho
// // // // // // // // //                     setLocalPending(true);
// // // // // // // // //                     localStorage.setItem(storageKey, 'true');
                    
// // // // // // // // //                     const newPending = [...pendingAttendance, userId];
// // // // // // // // //                     const newRejected = rejectedBy.filter((n) => n !== userId);
                    
// // // // // // // // //                     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // // // // // //                     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
                    
// // // // // // // // //                     setShowOtpModal(false);
                    
// // // // // // // // //                     setAlertHeading("Attendance Recorded");
// // // // // // // // //                     setAlertText("Your attendance has been successfully marked. The organizer will verify it shortly.");
// // // // // // // // //                     setIsAlertVisible(true);
                    
// // // // // // // // //                   } else {
// // // // // // // // //                     setOtpError("Invalid code. Please check the notification.");
// // // // // // // // //                   }
// // // // // // // // //                 }}
// // // // // // // // //               >
// // // // // // // // //                 Verify & Send Request
// // // // // // // // //               </button>
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       )}

// // // // // // // // //       {/* 🔥 CUSTOM SUCCESS ALERT MODAL */}
// // // // // // // // //       {isAlertVisible && (
// // // // // // // // //         <div className="ticket-overlay" onClick={() => setIsAlertVisible(false)}>
// // // // // // // // //           <div className="ticket-card" style={{ maxWidth: '340px', padding: '32px 24px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
// // // // // // // // //             <div style={{ width: '70px', height: '70px', background: '#ecfdf5', color: '#10b981', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px', margin: '0 auto 20px' }}>
// // // // // // // // //               <i className="fa-solid fa-check"></i>
// // // // // // // // //             </div>
// // // // // // // // //             <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#1e293b' }}>{alertHeading}</h3>
// // // // // // // // //             <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>{alertText}</p>
// // // // // // // // //             <button className="ticket-close-btn" style={{ background: '#10b981', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', width: '100%' }} onClick={() => setIsAlertVisible(false)}>
// // // // // // // // //               Understood
// // // // // // // // //             </button>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       )}

// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // export default EventDetailPage;

// // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // import "./EventDetailPage.css";
// // // // // // // // import { useTheme } from './ThemeContext';
// // // // // // // // import QRCode from 'react-qr-code';

// // // // // // // // const fixEventStatus = (event) => {
// // // // // // // //   if (!event) return 'upcoming';
// // // // // // // //   if (event.status === 'cancelled' || event.status === 'completed') return event.status;
// // // // // // // //   const now = new Date();
// // // // // // // //   const [startStr, endStr] = (event.time || '').split(' - ');
// // // // // // // //   if (!event.date || !startStr || !endStr) return event.status;
  
// // // // // // // //   const start = new Date(`${event.date}T${startStr.trim()}:00`);
// // // // // // // //   const end = new Date(`${event.date}T${endStr.trim()}:00`);
  
// // // // // // // //   if (now >= start && now < end) return 'ongoing';
// // // // // // // //   if (now >= end) return 'completed';
// // // // // // // //   return 'upcoming';
// // // // // // // // };

// // // // // // // // const formatDate = (dateString) => {
// // // // // // // //   if (!dateString) return '';
// // // // // // // //   const d = new Date(dateString);
// // // // // // // //   if (isNaN(d.getTime())) return dateString; 
// // // // // // // //   const year = d.getFullYear();
// // // // // // // //   const month = String(d.getMonth() + 1).padStart(2, '0');
// // // // // // // //   const day = String(d.getDate()).padStart(2, '0');
// // // // // // // //   return `${year}-${month}-${day}`;
// // // // // // // // };

// // // // // // // // function EventDetailPage({ eventId, onBack, role, currentMemberId, dispatch }) {
// // // // // // // //   const { darkMode } = useTheme();
// // // // // // // //   const [event, setEvent] = useState(null);
// // // // // // // //   const [loading, setLoading] = useState(true);
  
// // // // // // // //   const [showTicket, setShowTicket] = useState(false);
// // // // // // // //   const [showNotifDropdown, setShowNotifDropdown] = useState(false);
// // // // // // // //   const [showOtpModal, setShowOtpModal] = useState(false);
  
// // // // // // // //   const [otpInput, setOtpInput] = useState('');
// // // // // // // //   const [generatedOtp, setGeneratedOtp] = useState('');
// // // // // // // //   const [otpError, setOtpError] = useState('');

// // // // // // // //   const storageKey = `clubpilot_pending_${eventId}`;
// // // // // // // //   const [localPending, setLocalPending] = useState(() => {
// // // // // // // //     return localStorage.getItem(storageKey) === 'true';
// // // // // // // //   });

// // // // // // // //   const [isAlertVisible, setIsAlertVisible] = useState(false);
// // // // // // // //   const [alertText, setAlertText] = useState('');
// // // // // // // //   const [alertHeading, setAlertHeading] = useState('');

// // // // // // // //   useEffect(() => {
// // // // // // // //     const fetchEvent = async () => {
// // // // // // // //       try {
// // // // // // // //         const res = await fetch('http://localhost:5000/api/events');
// // // // // // // //         if (!res.ok) throw new Error("Backend error");
        
// // // // // // // //         const allEvents = await res.json();
// // // // // // // //         if (Array.isArray(allEvents)) {
// // // // // // // //           const found = allEvents.find(e => String(e.id) === String(eventId));
// // // // // // // //           if (found) setEvent(found);
// // // // // // // //         }
// // // // // // // //       } catch (err) {
// // // // // // // //         console.error("🔥 FETCH EVENT ERROR:", err.message);
// // // // // // // //       } finally {
// // // // // // // //         setLoading(false);
// // // // // // // //       }
// // // // // // // //     };
// // // // // // // //     fetchEvent();
// // // // // // // //   }, [eventId]);

// // // // // // // //   if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading event details...</div>;

// // // // // // // //   if (!event) {
// // // // // // // //     return (
// // // // // // // //       <div className="edp-wrap">
// // // // // // // //         <button className="edp-back" onClick={onBack}>
// // // // // // // //           <i className="fa-solid fa-arrow-left"></i> Back to Events
// // // // // // // //         </button>
// // // // // // // //         <div className="edp-notfound">
// // // // // // // //           <h1>Event Not Found</h1>
// // // // // // // //           <p>The event you are looking for does not exist or backend is down.</p>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   const actualStatus = fixEventStatus(event);
// // // // // // // //   const capacity = event.capacity || 50;
// // // // // // // //   const participants = event.participants || 0;
// // // // // // // //   const percentage = Math.round((participants / capacity) * 100);
// // // // // // // //   const seatsLeft = capacity - participants;
  
// // // // // // // //   const userId = (() => {
// // // // // // // //     const mid = currentMemberId ?? sessionStorage.getItem('currentMemberId');
// // // // // // // //     if (mid && role) return `${role}_${mid}`;
// // // // // // // //     if (role) {
// // // // // // // //       let sid = sessionStorage.getItem('__uid');
// // // // // // // //       if (!sid) {
// // // // // // // //         sid = String(Date.now());
// // // // // // // //         sessionStorage.setItem('__uid', sid);
// // // // // // // //       }
// // // // // // // //       return `${role}_${sid}`;
// // // // // // // //     }
// // // // // // // //     return null;
// // // // // // // //   })();

// // // // // // // //   const attendedBy = event.attendedBy || [];
  
// // // // // // // //   // 🔥 Backend + LocalStorage pending lists ko combine kar diya hai taaki Admin ko turant dikhe
// // // // // // // //   const backendPending = event.pendingAttendance || [];
// // // // // // // //   const pendingAttendance = localPending && userId && !backendPending.includes(userId) 
// // // // // // // //     ? [...backendPending, userId] 
// // // // // // // //     : backendPending;

// // // // // // // //   const rejectedBy = event.rejectedBy || [];
// // // // // // // //   const participantNames = event.participantNames || [];

// // // // // // // //   const isRegistered = userId ? participantNames.map(String).includes(String(userId)) : false;
// // // // // // // //   const isUserAttended = userId ? attendedBy.map(String).includes(String(userId)) : false;
// // // // // // // //   const isUserPending = userId ? (pendingAttendance.map(String).includes(String(userId)) || localPending) : false; 
// // // // // // // //   const isUserRejected = userId ? rejectedBy.map(String).includes(String(userId)) : false;

// // // // // // // //   const getStatusClass = (status) => status.toLowerCase().replace(/ /g, "-");

// // // // // // // //   const formatName = (name) => {
// // // // // // // //     if (name.startsWith("user_")) return `User ${name.slice(5)}`;
// // // // // // // //     if (name.startsWith("core-member_")) return `Core Member ${name.slice(12)}`;
// // // // // // // //     if (name.startsWith("admin")) return "Admin";
// // // // // // // //     if (name.startsWith("leader")) return "Leader";
// // // // // // // //     if (name.startsWith("user")) return `User ${name.replace("user", "")}`;
// // // // // // // //     if (name.startsWith("member")) return `Member ${name.replace("member", "")}`;
// // // // // // // //     return name;
// // // // // // // //   };

// // // // // // // //   const ticketUrl = `${window.location.origin}/events/${event.id}`;

// // // // // // // //   const updateDB = async (updatedFields) => {
// // // // // // // //     const bodyData = {
// // // // // // // //       participant_names: updatedFields.participantNames ?? participantNames,
// // // // // // // //       attended_by: updatedFields.attendedBy ?? attendedBy,
// // // // // // // //       pending_attendance: updatedFields.pendingAttendance ?? pendingAttendance,
// // // // // // // //       participants: updatedFields.participants ?? participants,
// // // // // // // //       status: updatedFields.status ?? event.status,
// // // // // // // //       rejected_by: updatedFields.rejectedBy ?? rejectedBy,
// // // // // // // //     };

// // // // // // // //     await fetch(`http://localhost:5000/api/events/${event.id}`, {
// // // // // // // //       method: 'PATCH',
// // // // // // // //       headers: { 'Content-Type': 'application/json' },
// // // // // // // //       body: JSON.stringify(bodyData)
// // // // // // // //     });
// // // // // // // //   };

// // // // // // // //   const handleRequestAttendance = async () => {
// // // // // // // //     if (!userId) return;
// // // // // // // //     if (actualStatus !== "ongoing") return;
// // // // // // // //     if (!isRegistered) return;
// // // // // // // //     if (isUserAttended || isUserPending) return;

// // // // // // // //     const newPending = [...pendingAttendance, userId];
// // // // // // // //     const newRejected = rejectedBy.filter((n) => n !== userId);

// // // // // // // //     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
// // // // // // // //     setLocalPending(true);
// // // // // // // //     localStorage.setItem(storageKey, 'true');
// // // // // // // //   };

// // // // // // // //   const handleApprove = async (name) => {
// // // // // // // //     const newPending = pendingAttendance.filter((n) => n !== name);
// // // // // // // //     const newAttended = [...attendedBy, name];
    
// // // // // // // //     // Agar ye local user tha toh localStorage clear kar do
// // // // // // // //     if (String(name) === String(userId)) {
// // // // // // // //       setLocalPending(false);
// // // // // // // //       localStorage.removeItem(storageKey);
// // // // // // // //     }

// // // // // // // //     await updateDB({ pendingAttendance: newPending, attendedBy: newAttended });
// // // // // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, attendedBy: newAttended }));
// // // // // // // //   };

// // // // // // // //   const handleReject = async (name) => {
// // // // // // // //     const newPending = pendingAttendance.filter((n) => n !== name);
// // // // // // // //     const newRejected = [...rejectedBy, name];
    
// // // // // // // //     if (String(name) === String(userId)) {
// // // // // // // //       setLocalPending(false);
// // // // // // // //       localStorage.removeItem(storageKey);
// // // // // // // //     }

// // // // // // // //     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
// // // // // // // //   };

// // // // // // // //   const handleToggleAttendance = async (name) => {
// // // // // // // //     const present = attendedBy.map(String).includes(String(name));
// // // // // // // //     const updatedAttended = present ? attendedBy.filter((n) => n !== name) : [...attendedBy, name];

// // // // // // // //     await updateDB({ attendedBy: updatedAttended });
// // // // // // // //     setEvent(prev => ({ ...prev, attendedBy: updatedAttended }));
// // // // // // // //   };

// // // // // // // //   const handleRegister = async () => {
// // // // // // // //     if (actualStatus !== "upcoming") return;
// // // // // // // //     if (participants >= capacity) return;
// // // // // // // //     if (isRegistered) return;

// // // // // // // //     const updatedParticipantNames = [...participantNames, userId];
// // // // // // // //     const updatedParticipants = Number(participants) + 1;

// // // // // // // //     await updateDB({ participantNames: updatedParticipantNames, participants: updatedParticipants });
// // // // // // // //     setEvent(prev => ({ ...prev, participantNames: updatedParticipantNames, participants: updatedParticipants }));
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className="edp-wrap">
// // // // // // // //       <div className="edp-hero">
// // // // // // // //         <div className="edp-hero-bg"></div>
// // // // // // // //         <button className="edp-back" onClick={onBack}>
// // // // // // // //           <i className="fa-solid fa-arrow-left"></i> Back
// // // // // // // //         </button>
// // // // // // // //         <div className="edp-hero-inner">
// // // // // // // //           <div className="edp-hero-info">
// // // // // // // //             <div className="edp-badges">
// // // // // // // //               <span className="edp-badge-category">{event.category}</span>
// // // // // // // //               <span className={`edp-badge-status ${getStatusClass(actualStatus)}`}>
// // // // // // // //                 <span className="dot"></span>
// // // // // // // //                 {actualStatus}
// // // // // // // //               </span>
// // // // // // // //             </div>
// // // // // // // //             <h1>{event.title}</h1>
// // // // // // // //             <p>{event.description}</p>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       <div className="edp-stats">
// // // // // // // //         <div className="edp-stat">
// // // // // // // //           <div className="edp-stat-icon"><i className="fa-regular fa-calendar"></i></div>
// // // // // // // //           <div><span>Date</span><strong>{formatDate(event.date)}</strong></div>
// // // // // // // //         </div>
// // // // // // // //         <div className="edp-stat">
// // // // // // // //           <div className="edp-stat-icon"><i className="fa-regular fa-clock"></i></div>
// // // // // // // //           <div><span>Time</span><strong>{event.time}</strong></div>
// // // // // // // //         </div>
// // // // // // // //         <div className="edp-stat">
// // // // // // // //           <div className="edp-stat-icon"><i className="fa-solid fa-location-dot"></i></div>
// // // // // // // //           <div><span>Venue</span><strong>{event.venue}</strong></div>
// // // // // // // //         </div>
// // // // // // // //         <div className="edp-stat">
// // // // // // // //           <div className="edp-stat-icon"><i className="fa-solid fa-users"></i></div>
// // // // // // // //           <div><span>Participants</span><strong>{participants} / {capacity}</strong></div>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       <div className="edp-grid">
// // // // // // // //         <div className="edp-main">
// // // // // // // //           <div className="edp-card">
// // // // // // // //             <div className="edp-card-head">
// // // // // // // //               <div className="edp-accent"></div>
// // // // // // // //               <h2>About This Event</h2>
// // // // // // // //             </div>
// // // // // // // //             <p className="edp-body-text">{event.description}</p>
// // // // // // // //           </div>

// // // // // // // //           <div className="edp-card">
// // // // // // // //             <div className="edp-card-head">
// // // // // // // //               <div className="edp-accent"></div>
// // // // // // // //               <h2>Registration Progress</h2>
// // // // // // // //             </div>
// // // // // // // //             <div className="edp-capacity-top">
// // // // // // // //               <div>
// // // // // // // //                 <span className="edp-cap-label">Filled</span>
// // // // // // // //                 <strong className="edp-cap-percent">{percentage}%</strong>
// // // // // // // //               </div>
// // // // // // // //               <div className="edp-cap-right">
// // // // // // // //                 <span className="edp-cap-label">Seats Left</span>
// // // // // // // //                 <strong className="edp-cap-seats">{seatsLeft}</strong>
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //             <div className="edp-bar">
// // // // // // // //               <div className="edp-bar-fill" style={{ width: `${percentage}%` }}></div>
// // // // // // // //             </div>
// // // // // // // //             <div className="edp-capacity-bottom">
// // // // // // // //               <span>{participants} registered</span>
// // // // // // // //               <span>{capacity} total capacity</span>
// // // // // // // //             </div>
// // // // // // // //           </div>

// // // // // // // //           {actualStatus === "ongoing" && (
// // // // // // // //             <div className="edp-card">
// // // // // // // //               <div className="edp-card-head">
// // // // // // // //                 <div className="edp-accent"></div>
// // // // // // // //                 <h2>Attendance</h2>
// // // // // // // //                 <span className="edp-attend-count">
// // // // // // // //                   {attendedBy.length} / {participantNames.length} verified
// // // // // // // //                 </span>
// // // // // // // //               </div>

// // // // // // // //               {role === "user" && isRegistered && (
// // // // // // // //                 <div className="edp-user-attendance">
// // // // // // // //                   {isUserAttended ? (
// // // // // // // //                     <div className="edp-attendance-marked">
// // // // // // // //                       <i className="fa-solid fa-circle-check"></i>
// // // // // // // //                       <span>Your attendance is verified by Admin</span>
// // // // // // // //                     </div>
// // // // // // // //                   ) : isUserPending ? (
// // // // // // // //                     <div className="edp-attendance-pending" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
// // // // // // // //                       <i className="fa-solid fa-clock" style={{ fontSize: '20px' }}></i>
// // // // // // // //                       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
// // // // // // // //                         <strong style={{ fontSize: '14px' }}>Attendance Recorded</strong>
// // // // // // // //                         <span style={{ fontSize: '13px', opacity: 0.8 }}>Pending verification from the organizer.</span>
// // // // // // // //                       </div>
// // // // // // // //                     </div>
// // // // // // // //                   ) : isUserRejected ? (
// // // // // // // //                     <div className="edp-attendance-rejected">
// // // // // // // //                       <i className="fa-solid fa-circle-xmark"></i>
// // // // // // // //                       <div>
// // // // // // // //                         <span>Your request was rejected</span>
// // // // // // // //                         <small>You can request again</small>
// // // // // // // //                       </div>
// // // // // // // //                       <button className="edp-btn edp-btn-primary" onClick={handleRequestAttendance}>
// // // // // // // //                         <i className="fa-solid fa-rotate-right"></i> Request Again
// // // // // // // //                       </button>
// // // // // // // //                     </div>
// // // // // // // //                   ) : (
// // // // // // // //                     <button 
// // // // // // // //                       className="edp-btn edp-btn-primary" 
// // // // // // // //                       onClick={() => {
// // // // // // // //                         const code = Math.floor(1000 + Math.random() * 9000).toString();
// // // // // // // //                         setGeneratedOtp(code);
// // // // // // // //                         setShowNotifDropdown(true);
// // // // // // // //                       }}
// // // // // // // //                     >
// // // // // // // //                       <i className="fa-solid fa-hand"></i> Mark Attendance
// // // // // // // //                     </button>
// // // // // // // //                   )}
// // // // // // // //                 </div>
// // // // // // // //               )}

// // // // // // // //               {/* 🔥 ADMIN PANEL: Participants + Pending Approval List */}
// // // // // // // //               {(role === "admin" || role === "leader") && (
// // // // // // // //                 <>
// // // // // // // //                   <div className="edp-verified-section" style={{ marginTop: '20px' }}>
// // // // // // // //                     <div className="edp-verified-head">
// // // // // // // //                       <h3><i className="fa-solid fa-users"></i> All Participants</h3>
// // // // // // // //                       <span className="edp-verified-count">{participantNames.length}</span>
// // // // // // // //                     </div>
// // // // // // // //                     <div className="edp-attendance-list">
// // // // // // // //                       {participantNames.length > 0 ? (
// // // // // // // //                         participantNames.map((name) => {
// // // // // // // //                           const present = attendedBy.map(String).includes(String(name));
// // // // // // // //                           return (
// // // // // // // //                             <div key={name} className={`edp-attend-row ${present ? "present" : ""}`}>
// // // // // // // //                               <div className="edp-attend-user">
// // // // // // // //                                 <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
// // // // // // // //                                 <span>{formatName(name)}</span>
// // // // // // // //                               </div>
// // // // // // // //                               <button className={`edp-attend-toggle ${present ? "present" : ""}`} onClick={() => handleToggleAttendance(name)}>
// // // // // // // //                                 {present ? (<><i className="fa-solid fa-check"></i> Present</>) : (<><i className="fa-regular fa-circle"></i> Absent</>)}
// // // // // // // //                               </button>
// // // // // // // //                             </div>
// // // // // // // //                           );
// // // // // // // //                         })
// // // // // // // //                       ) : (
// // // // // // // //                         <p className="edp-attend-empty">No participants yet.</p>
// // // // // // // //                       )}
// // // // // // // //                     </div>
// // // // // // // //                   </div>

// // // // // // // //                   {pendingAttendance.length > 0 && (
// // // // // // // //                     <div className="edp-pending-section" style={{ marginTop: '20px' }}>
// // // // // // // //                       <div className="edp-pending-head">
// // // // // // // //                         <h3><i className="fa-solid fa-bell"></i> Pending Approval Requests</h3>
// // // // // // // //                         <span className="edp-pending-badge">{pendingAttendance.length}</span>
// // // // // // // //                       </div>
// // // // // // // //                       <div className="edp-attendance-list">
// // // // // // // //                         {pendingAttendance.map((name) => (
// // // // // // // //                           <div key={name} className="edp-attend-row pending">
// // // // // // // //                             <div className="edp-attend-user">
// // // // // // // //                               <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
// // // // // // // //                               <span>{formatName(name)}</span>
// // // // // // // //                             </div>
// // // // // // // //                             <div className="edp-approval-actions">
// // // // // // // //                               <button className="edp-approve-btn" onClick={() => handleApprove(name)}>
// // // // // // // //                                 <i className="fa-solid fa-check"></i> Approve
// // // // // // // //                               </button>
// // // // // // // //                               <button className="edp-reject-btn" onClick={() => handleReject(name)}>
// // // // // // // //                                 <i className="fa-solid fa-xmark"></i> Reject
// // // // // // // //                               </button>
// // // // // // // //                             </div>
// // // // // // // //                           </div>
// // // // // // // //                         ))}
// // // // // // // //                       </div>
// // // // // // // //                     </div>
// // // // // // // //                   )}
// // // // // // // //                 </>
// // // // // // // //               )}

// // // // // // // //               {role === "core-member" && (
// // // // // // // //                 <p className="edp-attend-empty">Attendance is managed by admin/leader.</p>
// // // // // // // //               )}
// // // // // // // //             </div>
// // // // // // // //           )}
// // // // // // // //         </div>

// // // // // // // //         <div className="edp-side">
// // // // // // // //           <div className="notif-bell-container">
// // // // // // // //             <button 
// // // // // // // //               className={`notif-bell-btn ${generatedOtp ? 'has-notif' : ''}`}
// // // // // // // //               onClick={() => setShowNotifDropdown(!showNotifDropdown)}
// // // // // // // //             >
// // // // // // // //               <i className="fa-solid fa-bell"></i>
// // // // // // // //               {generatedOtp && <span className="notif-dot"></span>}
// // // // // // // //             </button>

// // // // // // // //             {showNotifDropdown && (
// // // // // // // //               <div className="notif-dropdown">
// // // // // // // //                 <div className="notif-header">
// // // // // // // //                   <h4>Notifications</h4>
// // // // // // // //                   <button onClick={() => setShowNotifDropdown(false)}><i className="fa-solid fa-xmark"></i></button>
// // // // // // // //                 </div>
                
// // // // // // // //                 <div className="notif-body">
// // // // // // // //                   {generatedOtp ? (
// // // // // // // //                     <div className="notif-item">
// // // // // // // //                       <div className="notif-icon">
// // // // // // // //                         <i className="fa-solid fa-shield-halved"></i>
// // // // // // // //                       </div>
// // // // // // // //                       <div className="notif-text">
// // // // // // // //                         <p>Attendance Verification Code is ready.</p>
                        
// // // // // // // //                         <div className="otp-display-box">
// // // // // // // //                           <strong>{generatedOtp}</strong>
// // // // // // // //                         </div>
                        
// // // // // // // //                         <button 
// // // // // // // //                           className="notif-action-btn"
// // // // // // // //                           onClick={() => {
// // // // // // // //                             setShowNotifDropdown(false);
// // // // // // // //                             setShowOtpModal(true);
// // // // // // // //                           }}
// // // // // // // //                         >
// // // // // // // //                           Enter Code Now <i className="fa-solid fa-arrow-right"></i>
// // // // // // // //                         </button>
// // // // // // // //                       </div>
// // // // // // // //                     </div>
// // // // // // // //                   ) : (
// // // // // // // //                     <p className="no-notif">No new notifications</p>
// // // // // // // //                   )}
// // // // // // // //                 </div>
// // // // // // // //               </div>
// // // // // // // //             )}
// // // // // // // //           </div>

// // // // // // // //           {role === "user" && (
// // // // // // // //             <div className="edp-side-card">
// // // // // // // //               <h3>Quick Actions</h3>
              
// // // // // // // //               {isRegistered ? (
// // // // // // // //                 <button className="edp-btn edp-btn-primary" onClick={() => setShowTicket(true)} style={{ background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none' }}>
// // // // // // // //                   <i className="fa-solid fa-ticket"></i> View Ticket
// // // // // // // //                 </button>
// // // // // // // //               ) : actualStatus === "upcoming" && participants < capacity ? (
// // // // // // // //                 <button className="edp-btn edp-btn-primary" onClick={handleRegister}>
// // // // // // // //                   <i className="fa-solid fa-user-plus"></i> Participate Now
// // // // // // // //                 </button>
// // // // // // // //               ) : actualStatus === "ongoing" ? (
// // // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // // //                   <i className="fa-solid fa-spinner"></i> Event In Progress
// // // // // // // //                 </button>
// // // // // // // //               ) : actualStatus === "completed" ? (
// // // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // // //                   <i className="fa-solid fa-circle-check"></i> Event Completed
// // // // // // // //                 </button>
// // // // // // // //               ) : actualStatus === "cancelled" ? (
// // // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // // //                   <i className="fa-solid fa-circle-xmark"></i> Event Cancelled
// // // // // // // //                 </button>
// // // // // // // //               ) : (
// // // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // // //                   <i className="fa-solid fa-ban"></i> Event Full
// // // // // // // //                 </button>
// // // // // // // //               )}
// // // // // // // //               <button className="edp-btn edp-btn-ghost" onClick={onBack}>
// // // // // // // //                 <i className="fa-solid fa-arrow-left"></i> Back to Events
// // // // // // // //               </button>
// // // // // // // //             </div>
// // // // // // // //           )}

// // // // // // // //           <div className="edp-side-card">
// // // // // // // //             <h3>Event Details</h3>
// // // // // // // //             <div className="edp-detail-row"><span>Category</span><strong>{event.category}</strong></div>
// // // // // // // //             <div className="edp-detail-row"><span>Status</span><strong className={`edp-status-text ${getStatusClass(actualStatus)}`}>{actualStatus}</strong></div>
// // // // // // // //             <div className="edp-detail-row"><span>Event ID</span><strong>EV-{String(event.id).padStart(3, "0")}</strong></div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* 🔥 VIRTUAL TICKET MODAL */}
// // // // // // // //       {showTicket && (
// // // // // // // //         <div className="ticket-overlay" onClick={() => setShowTicket(false)}>
// // // // // // // //           <div className="ticket-card" onClick={(e) => e.stopPropagation()}>
            
// // // // // // // //             <div className="ticket-header">
// // // // // // // //               <div className="ticket-logo">
// // // // // // // //                 <i className="fa-solid fa-plane"></i> ClubPilot
// // // // // // // //               </div>
// // // // // // // //               <h2>{event.title}</h2>
// // // // // // // //               <span className="ticket-status">{actualStatus.toUpperCase()}</span>
// // // // // // // //             </div>
            
// // // // // // // //             <div className="ticket-divider">
// // // // // // // //               <div className="cutout left"></div>
// // // // // // // //               <div className="dashed-line"></div>
// // // // // // // //               <div className="cutout right"></div>
// // // // // // // //             </div>
            
// // // // // // // //             <div className="ticket-body">
// // // // // // // //               <div className="ticket-info">
// // // // // // // //                 <div className="info-group">
// // // // // // // //                   <span className="info-label">Attendee Name</span>
// // // // // // // //                   <span className="info-value">{userId ? formatName(userId) : 'Guest'}</span>
// // // // // // // //                 </div>
// // // // // // // //                 <div className="info-group">
// // // // // // // //                   <span className="info-label">Date</span>
// // // // // // // //                   <span className="info-value">{formatDate(event.date)}</span>
// // // // // // // //                 </div>
// // // // // // // //                 <div className="info-group">
// // // // // // // //                   <span className="info-label">Time</span>
// // // // // // // //                   <span className="info-value">{event.time}</span>
// // // // // // // //                 </div>
// // // // // // // //                 <div className="info-group">
// // // // // // // //                   <span className="info-label">Venue</span>
// // // // // // // //                   <span className="info-value">{event.venue}</span>
// // // // // // // //                 </div>
// // // // // // // //               </div>

// // // // // // // //               <div className="ticket-qr-section">
// // // // // // // //                 <div className="ticket-id-container">
// // // // // // // //                   <span className="ticket-label">PASS ID</span>
// // // // // // // //                   <span className="ticket-number">#EV-{String(event.id).padStart(3, '0')}-{userId ? userId.split('_')[1] : '00'}</span>
// // // // // // // //                 </div>
                
// // // // // // // //                 <div className="qr-frame">
// // // // // // // //                   <QRCode 
// // // // // // // //                     value={ticketUrl} 
// // // // // // // //                     size={130} 
// // // // // // // //                     bgColor="#ffffff"
// // // // // // // //                     fgColor="#1e293b"
// // // // // // // //                   />
// // // // // // // //                 </div>
                
// // // // // // // //                 <p className="scan-instruction">
// // // // // // // //                   <i className="fa-solid fa-camera"></i> Scan to view event details
// // // // // // // //                 </p>
// // // // // // // //               </div>
// // // // // // // //             </div>

// // // // // // // //             <div className="ticket-footer">
// // // // // // // //               <button className="ticket-close-btn" onClick={() => setShowTicket(false)}>
// // // // // // // //                 Close Ticket
// // // // // // // //               </button>
// // // // // // // //             </div>

// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       )}

// // // // // // // //       {/* 🔥 OTP VERIFICATION MODAL */}
// // // // // // // //       {showOtpModal && (
// // // // // // // //         <div className="ticket-overlay" onClick={() => setShowOtpModal(false)}>
// // // // // // // //           <div className="ticket-card" style={{ maxWidth: '350px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            
// // // // // // // //             <div className="ticket-header" style={{ background: '#1e293b' }}>
// // // // // // // //               <h2 style={{ fontSize: '20px' }}>Verify Attendance</h2>
// // // // // // // //               <p style={{ fontSize: '12px', marginTop: '5px', color: '#94a3b8' }}>Enter the code from notification</p>
// // // // // // // //             </div>
            
// // // // // // // //             <div className="ticket-body" style={{ padding: '30px 24px' }}>
// // // // // // // //               <input 
// // // // // // // //                 type="text" 
// // // // // // // //                 maxLength={4}
// // // // // // // //                 placeholder="----"
// // // // // // // //                 value={otpInput}
// // // // // // // //                 onChange={(e) => {
// // // // // // // //                   setOtpInput(e.target.value.replace(/\D/g, ''));
// // // // // // // //                   setOtpError('');
// // // // // // // //                 }}
// // // // // // // //                 style={{ 
// // // // // // // //                   width: '100%', fontSize: '32px', textAlign: 'center', letterSpacing: '10px', 
// // // // // // // //                   padding: '10px', borderRadius: '12px', border: '2px solid #e2e8f0', outline: 'none',
// // // // // // // //                   fontWeight: 'bold', color: '#1e293b'
// // // // // // // //                 }}
// // // // // // // //               />
              
// // // // // // // //               {otpError && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '10px', fontWeight: 'bold' }}>{otpError}</p>}

// // // // // // // //               <button 
// // // // // // // //                 className="ticket-close-btn" 
// // // // // // // //                 style={{ marginTop: '20px', background: '#6366f1', color: 'white' }}
// // // // // // // //                 onClick={async () => {
// // // // // // // //                   if (otpInput === generatedOtp && generatedOtp !== '') {
// // // // // // // //                     setLocalPending(true);
// // // // // // // //                     localStorage.setItem(storageKey, 'true');
                    
// // // // // // // //                     const newPending = [...pendingAttendance, userId];
// // // // // // // //                     const newRejected = rejectedBy.filter((n) => n !== userId);
                    
// // // // // // // //                     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // // // // //                     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
                    
// // // // // // // //                     setShowOtpModal(false);
                    
// // // // // // // //                     setAlertHeading("Attendance Recorded");
// // // // // // // //                     setAlertText("Your attendance has been successfully marked. The organizer will verify it shortly.");
// // // // // // // //                     setIsAlertVisible(true);
                    
// // // // // // // //                   } else {
// // // // // // // //                     setOtpError("Invalid code. Please check the notification.");
// // // // // // // //                   }
// // // // // // // //                 }}
// // // // // // // //               >
// // // // // // // //                 Verify & Send Request
// // // // // // // //               </button>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       )}

// // // // // // // //       {/* 🔥 CUSTOM SUCCESS ALERT MODAL */}
// // // // // // // //       {isAlertVisible && (
// // // // // // // //         <div className="ticket-overlay" onClick={() => setIsAlertVisible(false)}>
// // // // // // // //           <div className="ticket-card" style={{ maxWidth: '340px', padding: '32px 24px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
// // // // // // // //             <div style={{ width: '70px', height: '70px', background: '#ecfdf5', color: '#10b981', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px', margin: '0 auto 20px' }}>
// // // // // // // //               <i className="fa-solid fa-check"></i>
// // // // // // // //             </div>
// // // // // // // //             <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#1e293b' }}>{alertHeading}</h3>
// // // // // // // //             <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>{alertText}</p>
// // // // // // // //             <button className="ticket-close-btn" style={{ background: '#10b981', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', width: '100%' }} onClick={() => setIsAlertVisible(false)}>
// // // // // // // //               Understood
// // // // // // // //             </button>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       )}

// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // export default EventDetailPage;

// // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // import "./EventDetailPage.css";
// // // // // // // import { useTheme } from './ThemeContext';
// // // // // // // import QRCode from 'react-qr-code';

// // // // // // // const fixEventStatus = (event) => {
// // // // // // //   if (!event) return 'upcoming';
// // // // // // //   if (event.status === 'cancelled' || event.status === 'completed') return event.status;
// // // // // // //   const now = new Date();
// // // // // // //   const [startStr, endStr] = (event.time || '').split(' - ');
// // // // // // //   if (!event.date || !startStr || !endStr) return event.status;
  
// // // // // // //   const start = new Date(`${event.date}T${startStr.trim()}:00`);
// // // // // // //   const end = new Date(`${event.date}T${endStr.trim()}:00`);
  
// // // // // // //   if (now >= start && now < end) return 'ongoing';
// // // // // // //   if (now >= end) return 'completed';
// // // // // // //   return 'upcoming';
// // // // // // // };

// // // // // // // const formatDate = (dateString) => {
// // // // // // //   if (!dateString) return '';
// // // // // // //   const d = new Date(dateString);
// // // // // // //   if (isNaN(d.getTime())) return dateString; 
// // // // // // //   const year = d.getFullYear();
// // // // // // //   const month = String(d.getMonth() + 1).padStart(2, '0');
// // // // // // //   const day = String(d.getDate()).padStart(2, '0');
// // // // // // //   return `${year}-${month}-${day}`;
// // // // // // // };

// // // // // // // function EventDetailPage({ eventId, onBack, role, currentMemberId, dispatch }) {
// // // // // // //   const { darkMode } = useTheme();
// // // // // // //   const [event, setEvent] = useState(null);
// // // // // // //   const [loading, setLoading] = useState(true);
  
// // // // // // //   const [showTicket, setShowTicket] = useState(false);
// // // // // // //   const [showNotifDropdown, setShowNotifDropdown] = useState(false);
// // // // // // //   const [showOtpModal, setShowOtpModal] = useState(false);
  
// // // // // // //   const [otpInput, setOtpInput] = useState('');
// // // // // // //   const [generatedOtp, setGeneratedOtp] = useState('');
// // // // // // //   const [otpError, setOtpError] = useState('');

// // // // // // //   const [isAlertVisible, setIsAlertVisible] = useState(false);
// // // // // // //   const [alertText, setAlertText] = useState('');
// // // // // // //   const [alertHeading, setAlertHeading] = useState('');

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchEvent = async () => {
// // // // // // //       try {
// // // // // // //         const res = await fetch('http://localhost:5000/api/events');
// // // // // // //         if (!res.ok) throw new Error("Backend error");
        
// // // // // // //         const allEvents = await res.json();
// // // // // // //         if (Array.isArray(allEvents)) {
// // // // // // //           const found = allEvents.find(e => String(e.id) === String(eventId));
// // // // // // //           if (found) setEvent(found);
// // // // // // //         }
// // // // // // //       } catch (err) {
// // // // // // //         console.error("🔥 FETCH EVENT ERROR:", err.message);
// // // // // // //       } finally {
// // // // // // //         setLoading(false);
// // // // // // //       }
// // // // // // //     };
// // // // // // //     fetchEvent();
// // // // // // //   }, [eventId]);

// // // // // // //   if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading event details...</div>;

// // // // // // //   if (!event) {
// // // // // // //     return (
// // // // // // //       <div className="edp-wrap">
// // // // // // //         <button className="edp-back" onClick={onBack}>
// // // // // // //           <i className="fa-solid fa-arrow-left"></i> Back to Events
// // // // // // //         </button>
// // // // // // //         <div className="edp-notfound">
// // // // // // //           <h1>Event Not Found</h1>
// // // // // // //           <p>The event you are looking for does not exist or backend is down.</p>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   const actualStatus = fixEventStatus(event);
// // // // // // //   const capacity = event.capacity || 50;
// // // // // // //   const participants = event.participants || 0;
// // // // // // //   const percentage = Math.round((participants / capacity) * 100);
// // // // // // //   const seatsLeft = capacity - participants;
  
// // // // // // //   const userId = (() => {
// // // // // // //     const mid = currentMemberId ?? sessionStorage.getItem('currentMemberId');
// // // // // // //     if (mid && role) return `${role}_${mid}`;
// // // // // // //     if (role) {
// // // // // // //       let sid = sessionStorage.getItem('__uid');
// // // // // // //       if (!sid) {
// // // // // // //         sid = String(Date.now());
// // // // // // //         sessionStorage.setItem('__uid', sid);
// // // // // // //       }
// // // // // // //       return `${role}_${sid}`;
// // // // // // //     }
// // // // // // //     return null;
// // // // // // //   })();

// // // // // // //   const attendedBy = event.attendedBy || [];
// // // // // // //   const pendingAttendance = event.pendingAttendance || [];
// // // // // // //   const rejectedBy = event.rejectedBy || [];
// // // // // // //   const participantNames = event.participantNames || [];

// // // // // // //   const isRegistered = userId ? participantNames.map(String).includes(String(userId)) : false;
// // // // // // //   const isUserAttended = userId ? attendedBy.map(String).includes(String(userId)) : false;
// // // // // // //   const isUserPending = userId ? pendingAttendance.map(String).includes(String(userId)) : false; 
// // // // // // //   const isUserRejected = userId ? rejectedBy.map(String).includes(String(userId)) : false;

// // // // // // //   const getStatusClass = (status) => status.toLowerCase().replace(/ /g, "-");

// // // // // // //   const formatName = (name) => {
// // // // // // //     if (name.startsWith("user_")) return `User ${name.slice(5)}`;
// // // // // // //     if (name.startsWith("core-member_")) return `Core Member ${name.slice(12)}`;
// // // // // // //     if (name.startsWith("admin")) return "Admin";
// // // // // // //     if (name.startsWith("leader")) return "Leader";
// // // // // // //     if (name.startsWith("user")) return `User ${name.replace("user", "")}`;
// // // // // // //     if (name.startsWith("member")) return `Member ${name.replace("member", "")}`;
// // // // // // //     return name;
// // // // // // //   };

// // // // // // //   const ticketUrl = `${window.location.origin}/events/${event.id}`;

// // // // // // //   const updateDB = async (updatedFields) => {
// // // // // // //     const bodyData = {
// // // // // // //       participant_names: updatedFields.participantNames ?? participantNames,
// // // // // // //       attended_by: updatedFields.attendedBy ?? attendedBy,
// // // // // // //       pending_attendance: updatedFields.pendingAttendance ?? pendingAttendance,
// // // // // // //       participants: updatedFields.participants ?? participants,
// // // // // // //       status: updatedFields.status ?? event.status,
// // // // // // //       rejected_by: updatedFields.rejectedBy ?? rejectedBy,
// // // // // // //     };

// // // // // // //     await fetch(`http://localhost:5000/api/events/${event.id}`, {
// // // // // // //       method: 'PATCH',
// // // // // // //       headers: { 'Content-Type': 'application/json' },
// // // // // // //       body: JSON.stringify(bodyData)
// // // // // // //     });
// // // // // // //   };

// // // // // // //   const handleRequestAttendance = async () => {
// // // // // // //     if (!userId) return;
// // // // // // //     if (actualStatus !== "ongoing") return;
// // // // // // //     if (!isRegistered) return;
// // // // // // //     if (isUserAttended || isUserPending) return;

// // // // // // //     const newPending = [...pendingAttendance, userId];
// // // // // // //     const newRejected = rejectedBy.filter((n) => n !== userId);

// // // // // // //     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
// // // // // // //   };

// // // // // // //   const handleApprove = async (name) => {
// // // // // // //     const newPending = pendingAttendance.filter((n) => n !== name);
// // // // // // //     const newAttended = [...attendedBy, name];
    
// // // // // // //     await updateDB({ pendingAttendance: newPending, attendedBy: newAttended });
// // // // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, attendedBy: newAttended }));
// // // // // // //   };

// // // // // // //   const handleReject = async (name) => {
// // // // // // //     const newPending = pendingAttendance.filter((n) => n !== name);
// // // // // // //     const newRejected = [...rejectedBy, name];

// // // // // // //     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
// // // // // // //   };

// // // // // // //   const handleToggleAttendance = async (name) => {
// // // // // // //     const present = attendedBy.map(String).includes(String(name));
// // // // // // //     const updatedAttended = present ? attendedBy.filter((n) => n !== name) : [...attendedBy, name];

// // // // // // //     await updateDB({ attendedBy: updatedAttended });
// // // // // // //     setEvent(prev => ({ ...prev, attendedBy: updatedAttended }));
// // // // // // //   };

// // // // // // //   const handleRegister = async () => {
// // // // // // //     if (actualStatus !== "upcoming") return;
// // // // // // //     if (participants >= capacity) return;
// // // // // // //     if (isRegistered) return;

// // // // // // //     const updatedParticipantNames = [...participantNames, userId];
// // // // // // //     const updatedParticipants = Number(participants) + 1;

// // // // // // //     await updateDB({ participantNames: updatedParticipantNames, participants: updatedParticipants });
// // // // // // //     setEvent(prev => ({ ...prev, participantNames: updatedParticipantNames, participants: updatedParticipants }));
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="edp-wrap">
// // // // // // //       <div className="edp-hero">
// // // // // // //         <div className="edp-hero-bg"></div>
// // // // // // //         <button className="edp-back" onClick={onBack}>
// // // // // // //           <i className="fa-solid fa-arrow-left"></i> Back
// // // // // // //         </button>
// // // // // // //         <div className="edp-hero-inner">
// // // // // // //           <div className="edp-hero-info">
// // // // // // //             <div className="edp-badges">
// // // // // // //               <span className="edp-badge-category">{event.category}</span>
// // // // // // //               <span className={`edp-badge-status ${getStatusClass(actualStatus)}`}>
// // // // // // //                 <span className="dot"></span>
// // // // // // //                 {actualStatus}
// // // // // // //               </span>
// // // // // // //             </div>
// // // // // // //             <h1>{event.title}</h1>
// // // // // // //             <p>{event.description}</p>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       <div className="edp-stats">
// // // // // // //         <div className="edp-stat">
// // // // // // //           <div className="edp-stat-icon"><i className="fa-regular fa-calendar"></i></div>
// // // // // // //           <div><span>Date</span><strong>{formatDate(event.date)}</strong></div>
// // // // // // //         </div>
// // // // // // //         <div className="edp-stat">
// // // // // // //           <div className="edp-stat-icon"><i className="fa-regular fa-clock"></i></div>
// // // // // // //           <div><span>Time</span><strong>{event.time}</strong></div>
// // // // // // //         </div>
// // // // // // //         <div className="edp-stat">
// // // // // // //           <div className="edp-stat-icon"><i className="fa-solid fa-location-dot"></i></div>
// // // // // // //           <div><span>Venue</span><strong>{event.venue}</strong></div>
// // // // // // //         </div>
// // // // // // //         <div className="edp-stat">
// // // // // // //           <div className="edp-stat-icon"><i className="fa-solid fa-users"></i></div>
// // // // // // //           <div><span>Participants</span><strong>{participants} / {capacity}</strong></div>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       <div className="edp-grid">
// // // // // // //         <div className="edp-main">
// // // // // // //           <div className="edp-card">
// // // // // // //             <div className="edp-card-head">
// // // // // // //               <div className="edp-accent"></div>
// // // // // // //               <h2>About This Event</h2>
// // // // // // //             </div>
// // // // // // //             <p className="edp-body-text">{event.description}</p>
// // // // // // //           </div>

// // // // // // //           <div className="edp-card">
// // // // // // //             <div className="edp-card-head">
// // // // // // //               <div className="edp-accent"></div>
// // // // // // //               <h2>Registration Progress</h2>
// // // // // // //             </div>
// // // // // // //             <div className="edp-capacity-top">
// // // // // // //               <div>
// // // // // // //                 <span className="edp-cap-label">Filled</span>
// // // // // // //                 <strong className="edp-cap-percent">{percentage}%</strong>
// // // // // // //               </div>
// // // // // // //               <div className="edp-cap-right">
// // // // // // //                 <span className="edp-cap-label">Seats Left</span>
// // // // // // //                 <strong className="edp-cap-seats">{seatsLeft}</strong>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //             <div className="edp-bar">
// // // // // // //               <div className="edp-bar-fill" style={{ width: `${percentage}%` }}></div>
// // // // // // //             </div>
// // // // // // //             <div className="edp-capacity-bottom">
// // // // // // //               <span>{participants} registered</span>
// // // // // // //               <span>{capacity} total capacity</span>
// // // // // // //             </div>
// // // // // // //           </div>

// // // // // // //           {actualStatus === "ongoing" && (
// // // // // // //             <div className="edp-card">
// // // // // // //               <div className="edp-card-head">
// // // // // // //                 <div className="edp-accent"></div>
// // // // // // //                 <h2>Attendance</h2>
// // // // // // //                 <span className="edp-attend-count">
// // // // // // //                   {attendedBy.length} / {participantNames.length} verified
// // // // // // //                 </span>
// // // // // // //               </div>

// // // // // // //               {role === "user" && isRegistered && (
// // // // // // //                 <div className="edp-user-attendance">
// // // // // // //                   {isUserAttended ? (
// // // // // // //                     <div className="edp-attendance-marked">
// // // // // // //                       <i className="fa-solid fa-circle-check"></i>
// // // // // // //                       <span>Your attendance is verified by Admin</span>
// // // // // // //                     </div>
// // // // // // //                   ) : isUserPending ? (
// // // // // // //                     <div className="edp-attendance-pending" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
// // // // // // //                       <i className="fa-solid fa-clock" style={{ fontSize: '20px' }}></i>
// // // // // // //                       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
// // // // // // //                         <strong style={{ fontSize: '14px' }}>Attendance Recorded</strong>
// // // // // // //                         <span style={{ fontSize: '13px', opacity: 0.8 }}>Pending verification from the organizer.</span>
// // // // // // //                       </div>
// // // // // // //                     </div>
// // // // // // //                   ) : isUserRejected ? (
// // // // // // //                     <div className="edp-attendance-rejected">
// // // // // // //                       <i className="fa-solid fa-circle-xmark"></i>
// // // // // // //                       <div>
// // // // // // //                         <span>Your request was rejected</span>
// // // // // // //                         <small>You can request again</small>
// // // // // // //                       </div>
// // // // // // //                       <button className="edp-btn edp-btn-primary" onClick={handleRequestAttendance}>
// // // // // // //                         <i className="fa-solid fa-rotate-right"></i> Request Again
// // // // // // //                       </button>
// // // // // // //                     </div>
// // // // // // //                   ) : (
// // // // // // //                     <button 
// // // // // // //                       className="edp-btn edp-btn-primary" 
// // // // // // //                       onClick={() => {
// // // // // // //                         const code = Math.floor(1000 + Math.random() * 9000).toString();
// // // // // // //                         setGeneratedOtp(code);
// // // // // // //                         setShowNotifDropdown(true);
// // // // // // //                       }}
// // // // // // //                     >
// // // // // // //                       <i className="fa-solid fa-hand"></i> Mark Attendance
// // // // // // //                     </button>
// // // // // // //                   )}
// // // // // // //                 </div>
// // // // // // //               )}

// // // // // // //               {(role === "admin" || role === "leader") && (
// // // // // // //                 <>
// // // // // // //                   <div className="edp-verified-section">
// // // // // // //                     <div className="edp-verified-head">
// // // // // // //                       <h3><i className="fa-solid fa-users"></i> All Participants</h3>
// // // // // // //                       <span className="edp-verified-count">{participantNames.length}</span>
// // // // // // //                     </div>
// // // // // // //                     <div className="edp-attendance-list">
// // // // // // //                       {participantNames.length > 0 ? (
// // // // // // //                         participantNames.map((name) => {
// // // // // // //                           const present = attendedBy.map(String).includes(String(name));
// // // // // // //                           return (
// // // // // // //                             <div key={name} className={`edp-attend-row ${present ? "present" : ""}`}>
// // // // // // //                               <div className="edp-attend-user">
// // // // // // //                                 <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
// // // // // // //                                 <span>{formatName(name)}</span>
// // // // // // //                               </div>
// // // // // // //                               <button className={`edp-attend-toggle ${present ? "present" : ""}`} onClick={() => handleToggleAttendance(name)}>
// // // // // // //                                 {present ? (<><i className="fa-solid fa-check"></i> Present</>) : (<><i className="fa-regular fa-circle"></i> Absent</>)}
// // // // // // //                               </button>
// // // // // // //                             </div>
// // // // // // //                           );
// // // // // // //                         })
// // // // // // //                       ) : (
// // // // // // //                         <p className="edp-attend-empty">No participants yet.</p>
// // // // // // //                       )}
// // // // // // //                     </div>
// // // // // // //                   </div>

// // // // // // //                   {pendingAttendance.length > 0 && (
// // // // // // //                     <div className="edp-pending-section">
// // // // // // //                       <div className="edp-pending-head">
// // // // // // //                         <h3><i className="fa-solid fa-bell"></i> Pending Approval Requests</h3>
// // // // // // //                         <span className="edp-pending-badge">{pendingAttendance.length}</span>
// // // // // // //                       </div>
// // // // // // //                       <div className="edp-attendance-list">
// // // // // // //                         {pendingAttendance.map((name) => (
// // // // // // //                           <div key={name} className="edp-attend-row pending">
// // // // // // //                             <div className="edp-attend-user">
// // // // // // //                               <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
// // // // // // //                               <span>{formatName(name)}</span>
// // // // // // //                             </div>
// // // // // // //                             <div className="edp-approval-actions">
// // // // // // //                               <button className="edp-approve-btn" onClick={() => handleApprove(name)}>
// // // // // // //                                 <i className="fa-solid fa-check"></i> Approve
// // // // // // //                               </button>
// // // // // // //                               <button className="edp-reject-btn" onClick={() => handleReject(name)}>
// // // // // // //                                 <i className="fa-solid fa-xmark"></i> Reject
// // // // // // //                               </button>
// // // // // // //                             </div>
// // // // // // //                           </div>
// // // // // // //                         ))}
// // // // // // //                       </div>
// // // // // // //                     </div>
// // // // // // //                   )}
// // // // // // //                 </>
// // // // // // //               )}

// // // // // // //               {role === "core-member" && (
// // // // // // //                 <p className="edp-attend-empty">Attendance is managed by admin/leader.</p>
// // // // // // //               )}
// // // // // // //             </div>
// // // // // // //           )}
// // // // // // //         </div>

// // // // // // //         <div className="edp-side">
// // // // // // //           <div className="notif-bell-container">
// // // // // // //             <button 
// // // // // // //               className={`notif-bell-btn ${generatedOtp ? 'has-notif' : ''}`}
// // // // // // //               onClick={() => setShowNotifDropdown(!showNotifDropdown)}
// // // // // // //             >
// // // // // // //               <i className="fa-solid fa-bell"></i>
// // // // // // //               {generatedOtp && <span className="notif-dot"></span>}
// // // // // // //             </button>

// // // // // // //             {showNotifDropdown && (
// // // // // // //               <div className="notif-dropdown">
// // // // // // //                 <div className="notif-header">
// // // // // // //                   <h4>Notifications</h4>
// // // // // // //                   <button onClick={() => setShowNotifDropdown(false)}><i className="fa-solid fa-xmark"></i></button>
// // // // // // //                 </div>
                
// // // // // // //                 <div className="notif-body">
// // // // // // //                   {generatedOtp ? (
// // // // // // //                     <div className="notif-item">
// // // // // // //                       <div className="notif-icon">
// // // // // // //                         <i className="fa-solid fa-shield-halved"></i>
// // // // // // //                       </div>
// // // // // // //                       <div className="notif-text">
// // // // // // //                         <p>Attendance Verification Code is ready.</p>
                        
// // // // // // //                         <div className="otp-display-box">
// // // // // // //                           <strong>{generatedOtp}</strong>
// // // // // // //                         </div>
                        
// // // // // // //                         <button 
// // // // // // //                           className="notif-action-btn"
// // // // // // //                           onClick={() => {
// // // // // // //                             setShowNotifDropdown(false);
// // // // // // //                             setShowOtpModal(true);
// // // // // // //                           }}
// // // // // // //                         >
// // // // // // //                           Enter Code Now <i className="fa-solid fa-arrow-right"></i>
// // // // // // //                         </button>
// // // // // // //                       </div>
// // // // // // //                     </div>
// // // // // // //                   ) : (
// // // // // // //                     <p className="no-notif">No new notifications</p>
// // // // // // //                   )}
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             )}
// // // // // // //           </div>

// // // // // // //           {role === "user" && (
// // // // // // //             <div className="edp-side-card">
// // // // // // //               <h3>Quick Actions</h3>
              
// // // // // // //               {isRegistered ? (
// // // // // // //                 <button className="edp-btn edp-btn-primary" onClick={() => setShowTicket(true)} style={{ background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none' }}>
// // // // // // //                   <i className="fa-solid fa-ticket"></i> View Ticket
// // // // // // //                 </button>
// // // // // // //               ) : actualStatus === "upcoming" && participants < capacity ? (
// // // // // // //                 <button className="edp-btn edp-btn-primary" onClick={handleRegister}>
// // // // // // //                   <i className="fa-solid fa-user-plus"></i> Participate Now
// // // // // // //                 </button>
// // // // // // //               ) : actualStatus === "ongoing" ? (
// // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // //                   <i className="fa-solid fa-spinner"></i> Event In Progress
// // // // // // //                 </button>
// // // // // // //               ) : actualStatus === "completed" ? (
// // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // //                   <i className="fa-solid fa-circle-check"></i> Event Completed
// // // // // // //                 </button>
// // // // // // //               ) : actualStatus === "cancelled" ? (
// // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // //                   <i className="fa-solid fa-circle-xmark"></i> Event Cancelled
// // // // // // //                 </button>
// // // // // // //               ) : (
// // // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // // //                   <i className="fa-solid fa-ban"></i> Event Full
// // // // // // //                 </button>
// // // // // // //               )}
// // // // // // //               <button className="edp-btn edp-btn-ghost" onClick={onBack}>
// // // // // // //                 <i className="fa-solid fa-arrow-left"></i> Back to Events
// // // // // // //               </button>
// // // // // // //             </div>
// // // // // // //           )}

// // // // // // //           <div className="edp-side-card">
// // // // // // //             <h3>Event Details</h3>
// // // // // // //             <div className="edp-detail-row"><span>Category</span><strong>{event.category}</strong></div>
// // // // // // //             <div className="edp-detail-row"><span>Status</span><strong className={`edp-status-text ${getStatusClass(actualStatus)}`}>{actualStatus}</strong></div>
// // // // // // //             <div className="edp-detail-row"><span>Event ID</span><strong>EV-{String(event.id).padStart(3, "0")}</strong></div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* 🔥 VIRTUAL TICKET MODAL */}
// // // // // // //       {showTicket && (
// // // // // // //         <div className="ticket-overlay" onClick={() => setShowTicket(false)}>
// // // // // // //           <div className="ticket-card" onClick={(e) => e.stopPropagation()}>
            
// // // // // // //             <div className="ticket-header">
// // // // // // //               <div className="ticket-logo">
// // // // // // //                 <i className="fa-solid fa-plane"></i> ClubPilot
// // // // // // //               </div>
// // // // // // //               <h2>{event.title}</h2>
// // // // // // //               <span className="ticket-status">{actualStatus.toUpperCase()}</span>
// // // // // // //             </div>
            
// // // // // // //             <div className="ticket-divider">
// // // // // // //               <div className="cutout left"></div>
// // // // // // //               <div className="dashed-line"></div>
// // // // // // //               <div className="cutout right"></div>
// // // // // // //             </div>
            
// // // // // // //             <div className="ticket-body">
// // // // // // //               <div className="ticket-info">
// // // // // // //                 <div className="info-group">
// // // // // // //                   <span className="info-label">Attendee Name</span>
// // // // // // //                   <span className="info-value">{userId ? formatName(userId) : 'Guest'}</span>
// // // // // // //                 </div>
// // // // // // //                 <div className="info-group">
// // // // // // //                   <span className="info-label">Date</span>
// // // // // // //                   <span className="info-value">{formatDate(event.date)}</span>
// // // // // // //                 </div>
// // // // // // //                 <div className="info-group">
// // // // // // //                   <span className="info-label">Time</span>
// // // // // // //                   <span className="info-value">{event.time}</span>
// // // // // // //                 </div>
// // // // // // //                 <div className="info-group">
// // // // // // //                   <span className="info-label">Venue</span>
// // // // // // //                   <span className="info-value">{event.venue}</span>
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //               <div className="ticket-qr-section">
// // // // // // //                 <div className="ticket-id-container">
// // // // // // //                   <span className="ticket-label">PASS ID</span>
// // // // // // //                   <span className="ticket-number">#EV-{String(event.id).padStart(3, '0')}-{userId ? userId.split('_')[1] : '00'}</span>
// // // // // // //                 </div>
                
// // // // // // //                 <div className="qr-frame">
// // // // // // //                   <QRCode 
// // // // // // //                     value={ticketUrl} 
// // // // // // //                     size={130} 
// // // // // // //                     bgColor="#ffffff"
// // // // // // //                     fgColor="#1e293b"
// // // // // // //                   />
// // // // // // //                 </div>
                
// // // // // // //                 <p className="scan-instruction">
// // // // // // //                   <i className="fa-solid fa-camera"></i> Scan to view event details
// // // // // // //                 </p>
// // // // // // //               </div>
// // // // // // //             </div>

// // // // // // //             <div className="ticket-footer">
// // // // // // //               <button className="ticket-close-btn" onClick={() => setShowTicket(false)}>
// // // // // // //                 Close Ticket
// // // // // // //               </button>
// // // // // // //             </div>

// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       )}

// // // // // // //       {/* 🔥 OTP VERIFICATION MODAL */}
// // // // // // //       {showOtpModal && (
// // // // // // //         <div className="ticket-overlay" onClick={() => setShowOtpModal(false)}>
// // // // // // //           <div className="ticket-card" style={{ maxWidth: '350px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            
// // // // // // //             <div className="ticket-header" style={{ background: '#1e293b' }}>
// // // // // // //               <h2 style={{ fontSize: '20px' }}>Verify Attendance</h2>
// // // // // // //               <p style={{ fontSize: '12px', marginTop: '5px', color: '#94a3b8' }}>Enter the code from notification</p>
// // // // // // //             </div>
            
// // // // // // //             <div className="ticket-body" style={{ padding: '30px 24px' }}>
// // // // // // //               <input 
// // // // // // //                 type="text" 
// // // // // // //                 maxLength={4}
// // // // // // //                 placeholder="----"
// // // // // // //                 value={otpInput}
// // // // // // //                 onChange={(e) => {
// // // // // // //                   setOtpInput(e.target.value.replace(/\D/g, ''));
// // // // // // //                   setOtpError('');
// // // // // // //                 }}
// // // // // // //                 style={{ 
// // // // // // //                   width: '100%', fontSize: '32px', textAlign: 'center', letterSpacing: '10px', 
// // // // // // //                   padding: '10px', borderRadius: '12px', border: '2px solid #e2e8f0', outline: 'none',
// // // // // // //                   fontWeight: 'bold', color: '#1e293b'
// // // // // // //                 }}
// // // // // // //               />
              
// // // // // // //               {otpError && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '10px', fontWeight: 'bold' }}>{otpError}</p>}

// // // // // // //               <button 
// // // // // // //                 className="ticket-close-btn" 
// // // // // // //                 style={{ marginTop: '20px', background: '#6366f1', color: 'white' }}
// // // // // // //                 onClick={async () => {
// // // // // // //                   if (otpInput === generatedOtp && generatedOtp !== '') {
                    
// // // // // // //                     const newPending = [...pendingAttendance, userId];
// // // // // // //                     const newRejected = rejectedBy.filter((n) => n !== userId);
                    
// // // // // // //                     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // // // //                     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
                    
// // // // // // //                     setShowOtpModal(false);
                    
// // // // // // //                     setAlertHeading("Attendance Recorded");
// // // // // // //                     setAlertText("Your attendance has been successfully marked. The organizer will verify it shortly.");
// // // // // // //                     setIsAlertVisible(true);
                    
// // // // // // //                   } else {
// // // // // // //                     setOtpError("Invalid code. Please check the notification.");
// // // // // // //                   }
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 Verify & Send Request
// // // // // // //               </button>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       )}

// // // // // // //       {/* 🔥 CUSTOM SUCCESS ALERT MODAL */}
// // // // // // //       {isAlertVisible && (
// // // // // // //         <div className="ticket-overlay" onClick={() => setIsAlertVisible(false)}>
// // // // // // //           <div className="ticket-card" style={{ maxWidth: '340px', padding: '32px 24px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
// // // // // // //             <div style={{ width: '70px', height: '70px', background: '#ecfdf5', color: '#10b981', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px', margin: '0 auto 20px' }}>
// // // // // // //               <i className="fa-solid fa-check"></i>
// // // // // // //             </div>
// // // // // // //             <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#1e293b' }}>{alertHeading}</h3>
// // // // // // //             <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>{alertText}</p>
// // // // // // //             <button className="ticket-close-btn" style={{ background: '#10b981', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', width: '100%' }} onClick={() => setIsAlertVisible(false)}>
// // // // // // //               Understood
// // // // // // //             </button>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       )}

// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // export default EventDetailPage;

// // // // // // import React, { useState, useEffect } from "react";
// // // // // // import "./EventDetailPage.css";
// // // // // // import { useTheme } from './ThemeContext';
// // // // // // import QRCode from 'react-qr-code';

// // // // // // const fixEventStatus = (event) => {
// // // // // //   if (!event) return 'upcoming';
// // // // // //   if (event.status === 'cancelled' || event.status === 'completed') return event.status;
// // // // // //   const now = new Date();
// // // // // //   const [startStr, endStr] = (event.time || '').split(' - ');
// // // // // //   if (!event.date || !startStr || !endStr) return event.status;
  
// // // // // //   const start = new Date(`${event.date}T${startStr.trim()}:00`);
// // // // // //   const end = new Date(`${event.date}T${endStr.trim()}:00`);
  
// // // // // //   if (now >= start && now < end) return 'ongoing';
// // // // // //   if (now >= end) return 'completed';
// // // // // //   return 'upcoming';
// // // // // // };

// // // // // // const formatDate = (dateString) => {
// // // // // //   if (!dateString) return '';
// // // // // //   const d = new Date(dateString);
// // // // // //   if (isNaN(d.getTime())) return dateString; 
// // // // // //   const year = d.getFullYear();
// // // // // //   const month = String(d.getMonth() + 1).padStart(2, '0');
// // // // // //   const day = String(d.getDate()).padStart(2, '0');
// // // // // //   return `${year}-${month}-${day}`;
// // // // // // };

// // // // // // function EventDetailPage({ eventId, onBack, role, currentMemberId, dispatch }) {
// // // // // //   const { darkMode } = useTheme();
// // // // // //   const [event, setEvent] = useState(null);
// // // // // //   const [loading, setLoading] = useState(true);
  
// // // // // //   const [showTicket, setShowTicket] = useState(false);
// // // // // //   const [showNotifDropdown, setShowNotifDropdown] = useState(false);
// // // // // //   const [showOtpModal, setShowOtpModal] = useState(false);
  
// // // // // //   const [otpInput, setOtpInput] = useState('');
// // // // // //   const [generatedOtp, setGeneratedOtp] = useState('');
// // // // // //   const [otpError, setOtpError] = useState('');

// // // // // //   const [isAlertVisible, setIsAlertVisible] = useState(false);
// // // // // //   const [alertText, setAlertText] = useState('');
// // // // // //   const [alertHeading, setAlertHeading] = useState('');

// // // // // //   useEffect(() => {
// // // // // //     const fetchEvent = async () => {
// // // // // //       try {
// // // // // //         const res = await fetch('http://localhost:5000/api/events');
// // // // // //         if (!res.ok) throw new Error("Backend error");
        
// // // // // //         const allEvents = await res.json();
// // // // // //         if (Array.isArray(allEvents)) {
// // // // // //           const found = allEvents.find(e => String(e.id) === String(eventId));
// // // // // //           if (found) setEvent(found);
// // // // // //         }
// // // // // //       } catch (err) {
// // // // // //         console.error("🔥 FETCH EVENT ERROR:", err.message);
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     };
// // // // // //     fetchEvent();
// // // // // //   }, [eventId]);

// // // // // //   if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading event details...</div>;

// // // // // //   if (!event) {
// // // // // //     return (
// // // // // //       <div className="edp-wrap">
// // // // // //         <button className="edp-back" onClick={onBack}>
// // // // // //           <i className="fa-solid fa-arrow-left"></i> Back to Events
// // // // // //         </button>
// // // // // //         <div className="edp-notfound">
// // // // // //           <h1>Event Not Found</h1>
// // // // // //           <p>The event you are looking for does not exist or backend is down.</p>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   const actualStatus = fixEventStatus(event);
// // // // // //   const capacity = event.capacity || 50;
// // // // // //   const participants = event.participants || 0;
// // // // // //   const percentage = Math.round((participants / capacity) * 100);
// // // // // //   const seatsLeft = capacity - participants;
  
// // // // // //   const userId = (() => {
// // // // // //     const mid = currentMemberId ?? sessionStorage.getItem('currentMemberId');
// // // // // //     if (mid && role) return `${role}_${mid}`;
// // // // // //     if (role) {
// // // // // //       let sid = sessionStorage.getItem('__uid');
// // // // // //       if (!sid) {
// // // // // //         sid = String(Date.now());
// // // // // //         sessionStorage.setItem('__uid', sid);
// // // // // //       }
// // // // // //       return `${role}_${sid}`;
// // // // // //     }
// // // // // //     return null;
// // // // // //   })();

// // // // // //   const attendedBy = event.attendedBy || [];
// // // // // //   const pendingAttendance = event.pendingAttendance || [];
// // // // // //   const rejectedBy = event.rejectedBy || [];
// // // // // //   const participantNames = event.participantNames || [];

// // // // // //   const isRegistered = userId ? participantNames.map(String).includes(String(userId)) : false;
// // // // // //   const isUserAttended = userId ? attendedBy.map(String).includes(String(userId)) : false;
// // // // // //   const isUserPending = userId ? pendingAttendance.map(String).includes(String(userId)) : false; 
// // // // // //   const isUserRejected = userId ? rejectedBy.map(String).includes(String(userId)) : false;

// // // // // //   const getStatusClass = (status) => status.toLowerCase().replace(/ /g, "-");

// // // // // //   const formatName = (name) => {
// // // // // //     if (name.startsWith("user_")) return `User ${name.slice(5)}`;
// // // // // //     if (name.startsWith("core-member_")) return `Core Member ${name.slice(12)}`;
// // // // // //     if (name.startsWith("admin")) return "Admin";
// // // // // //     if (name.startsWith("leader")) return "Leader";
// // // // // //     if (name.startsWith("user")) return `User ${name.replace("user", "")}`;
// // // // // //     if (name.startsWith("member")) return `Member ${name.replace("member", "")}`;
// // // // // //     return name;
// // // // // //   };

// // // // // //   const ticketUrl = `${window.location.origin}/events/${event.id}`;

// // // // // //   const updateDB = async (updatedFields) => {
// // // // // //     const bodyData = {
// // // // // //       participant_names: updatedFields.participantNames ?? participantNames,
// // // // // //       attended_by: updatedFields.attendedBy ?? attendedBy,
// // // // // //       pending_attendance: updatedFields.pendingAttendance ?? pendingAttendance,
// // // // // //       participants: updatedFields.participants ?? participants,
// // // // // //       status: updatedFields.status ?? event.status,
// // // // // //       rejected_by: updatedFields.rejectedBy ?? rejectedBy,
// // // // // //     };

// // // // // //     await fetch(`http://localhost:5000/api/events/${event.id}`, {
// // // // // //       method: 'PATCH',
// // // // // //       headers: { 'Content-Type': 'application/json' },
// // // // // //       body: JSON.stringify(bodyData)
// // // // // //     });
// // // // // //   };

// // // // // //   const handleRequestAttendance = async () => {
// // // // // //     if (!userId) return;
// // // // // //     if (actualStatus !== "ongoing") return;
// // // // // //     if (!isRegistered) return;
// // // // // //     if (isUserAttended || isUserPending) return;

// // // // // //     const newPending = [...pendingAttendance, userId];
// // // // // //     const newRejected = rejectedBy.filter((n) => n !== userId);

// // // // // //     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
// // // // // //   };

// // // // // //   const handleApprove = async (name) => {
// // // // // //     const newPending = pendingAttendance.filter((n) => n !== name);
// // // // // //     const newAttended = [...attendedBy, name];
    
// // // // // //     await updateDB({ pendingAttendance: newPending, attendedBy: newAttended });
// // // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, attendedBy: newAttended }));
// // // // // //   };

// // // // // //   const handleReject = async (name) => {
// // // // // //     const newPending = pendingAttendance.filter((n) => n !== name);
// // // // // //     const newRejected = [...rejectedBy, name];

// // // // // //     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
// // // // // //   };

// // // // // //   const handleToggleAttendance = async (name) => {
// // // // // //     const present = attendedBy.map(String).includes(String(name));
// // // // // //     const updatedAttended = present ? attendedBy.filter((n) => n !== name) : [...attendedBy, name];

// // // // // //     await updateDB({ attendedBy: updatedAttended });
// // // // // //     setEvent(prev => ({ ...prev, attendedBy: updatedAttended }));
// // // // // //   };

// // // // // //   const handleRegister = async () => {
// // // // // //     if (actualStatus !== "upcoming") return;
// // // // // //     if (participants >= capacity) return;
// // // // // //     if (isRegistered) return;

// // // // // //     const updatedParticipantNames = [...participantNames, userId];
// // // // // //     const updatedParticipants = Number(participants) + 1;

// // // // // //     await updateDB({ participantNames: updatedParticipantNames, participants: updatedParticipants });
// // // // // //     setEvent(prev => ({ ...prev, participantNames: updatedParticipantNames, participants: updatedParticipants }));
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="edp-wrap">
// // // // // //       <div className="edp-hero">
// // // // // //         <div className="edp-hero-bg"></div>
// // // // // //         <button className="edp-back" onClick={onBack}>
// // // // // //           <i className="fa-solid fa-arrow-left"></i> Back
// // // // // //         </button>
// // // // // //         <div className="edp-hero-inner">
// // // // // //           <div className="edp-hero-info">
// // // // // //             <div className="edp-badges">
// // // // // //               <span className="edp-badge-category">{event.category}</span>
// // // // // //               <span className={`edp-badge-status ${getStatusClass(actualStatus)}`}>
// // // // // //                 <span className="dot"></span>
// // // // // //                 {actualStatus}
// // // // // //               </span>
// // // // // //             </div>
// // // // // //             <h1>{event.title}</h1>
// // // // // //             <p>{event.description}</p>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <div className="edp-stats">
// // // // // //         <div className="edp-stat">
// // // // // //           <div className="edp-stat-icon"><i className="fa-regular fa-calendar"></i></div>
// // // // // //           <div><span>Date</span><strong>{formatDate(event.date)}</strong></div>
// // // // // //         </div>
// // // // // //         <div className="edp-stat">
// // // // // //           <div className="edp-stat-icon"><i className="fa-regular fa-clock"></i></div>
// // // // // //           <div><span>Time</span><strong>{event.time}</strong></div>
// // // // // //         </div>
// // // // // //         <div className="edp-stat">
// // // // // //           <div className="edp-stat-icon"><i className="fa-solid fa-location-dot"></i></div>
// // // // // //           <div><span>Venue</span><strong>{event.venue}</strong></div>
// // // // // //         </div>
// // // // // //         <div className="edp-stat">
// // // // // //           <div className="edp-stat-icon"><i className="fa-solid fa-users"></i></div>
// // // // // //           <div><span>Participants</span><strong>{participants} / {capacity}</strong></div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <div className="edp-grid">
// // // // // //         <div className="edp-main">
// // // // // //           <div className="edp-card">
// // // // // //             <div className="edp-card-head">
// // // // // //               <div className="edp-accent"></div>
// // // // // //               <h2>About This Event</h2>
// // // // // //             </div>
// // // // // //             <p className="edp-body-text">{event.description}</p>
// // // // // //           </div>

// // // // // //           <div className="edp-card">
// // // // // //             <div className="edp-card-head">
// // // // // //               <div className="edp-accent"></div>
// // // // // //               <h2>Registration Progress</h2>
// // // // // //             </div>
// // // // // //             <div className="edp-capacity-top">
// // // // // //               <div>
// // // // // //                 <span className="edp-cap-label">Filled</span>
// // // // // //                 <strong className="edp-cap-percent">{percentage}%</strong>
// // // // // //               </div>
// // // // // //               <div className="edp-cap-right">
// // // // // //                 <span className="edp-cap-label">Seats Left</span>
// // // // // //                 <strong className="edp-cap-seats">{seatsLeft}</strong>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //             <div className="edp-bar">
// // // // // //               <div className="edp-bar-fill" style={{ width: `${percentage}%` }}></div>
// // // // // //             </div>
// // // // // //             <div className="edp-capacity-bottom">
// // // // // //               <span>{participants} registered</span>
// // // // // //               <span>{capacity} total capacity</span>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {actualStatus === "ongoing" && (
// // // // // //             <div className="edp-card">
// // // // // //               <div className="edp-card-head">
// // // // // //                 <div className="edp-accent"></div>
// // // // // //                 <h2>Attendance</h2>
// // // // // //                 <span className="edp-attend-count">
// // // // // //                   {attendedBy.length} / {participantNames.length} verified
// // // // // //                 </span>
// // // // // //               </div>

// // // // // //               {role === "user" && isRegistered && (
// // // // // //                 <div className="edp-user-attendance">
// // // // // //                   {isUserAttended ? (
// // // // // //                     <div className="edp-attendance-marked">
// // // // // //                       <i className="fa-solid fa-circle-check"></i>
// // // // // //                       <span>Your attendance is verified by Admin</span>
// // // // // //                     </div>
// // // // // //                   ) : isUserPending ? (
// // // // // //                     <div className="edp-attendance-pending" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
// // // // // //                       <i className="fa-solid fa-clock" style={{ fontSize: '20px' }}></i>
// // // // // //                       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
// // // // // //                         <strong style={{ fontSize: '14px' }}>Attendance Recorded</strong>
// // // // // //                         <span style={{ fontSize: '13px', opacity: 0.8 }}>Pending verification from the organizer.</span>
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   ) : isUserRejected ? (
// // // // // //                     <div className="edp-attendance-rejected">
// // // // // //                       <i className="fa-solid fa-circle-xmark"></i>
// // // // // //                       <div>
// // // // // //                         <span>Your request was rejected</span>
// // // // // //                         <small>You can request again</small>
// // // // // //                       </div>
// // // // // //                       <button className="edp-btn edp-btn-primary" onClick={handleRequestAttendance}>
// // // // // //                         <i className="fa-solid fa-rotate-right"></i> Request Again
// // // // // //                       </button>
// // // // // //                     </div>
// // // // // //                   ) : (
// // // // // //                     <button 
// // // // // //                       className="edp-btn edp-btn-primary" 
// // // // // //                       onClick={() => {
// // // // // //                         const code = Math.floor(1000 + Math.random() * 9000).toString();
// // // // // //                         setGeneratedOtp(code);
// // // // // //                         setShowNotifDropdown(true);
// // // // // //                       }}
// // // // // //                     >
// // // // // //                       <i className="fa-solid fa-hand"></i> Mark Attendance
// // // // // //                     </button>
// // // // // //                   )}
// // // // // //                 </div>
// // // // // //               )}

// // // // // //               {(role === "admin" || role === "leader") && (
// // // // // //                 <>
// // // // // //                   <div className="edp-verified-section">
// // // // // //                     <div className="edp-verified-head">
// // // // // //                       <h3><i className="fa-solid fa-users"></i> All Participants</h3>
// // // // // //                       <span className="edp-verified-count">{participantNames.length}</span>
// // // // // //                     </div>
// // // // // //                     <div className="edp-attendance-list">
// // // // // //                       {participantNames.length > 0 ? (
// // // // // //                         participantNames.map((name) => {
// // // // // //                           const present = attendedBy.map(String).includes(String(name));
// // // // // //                           return (
// // // // // //                             <div key={name} className={`edp-attend-row ${present ? "present" : ""}`}>
// // // // // //                               <div className="edp-attend-user">
// // // // // //                                 <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
// // // // // //                                 <span>{formatName(name)}</span>
// // // // // //                               </div>
// // // // // //                               <button className={`edp-attend-toggle ${present ? "present" : ""}`} onClick={() => handleToggleAttendance(name)}>
// // // // // //                                 {present ? (<><i className="fa-solid fa-check"></i> Present</>) : (<><i className="fa-regular fa-circle"></i> Absent</>)}
// // // // // //                               </button>
// // // // // //                             </div>
// // // // // //                           );
// // // // // //                         })
// // // // // //                       ) : (
// // // // // //                         <p className="edp-attend-empty">No participants yet.</p>
// // // // // //                       )}
// // // // // //                     </div>
// // // // // //                   </div>

// // // // // //                   {pendingAttendance.length > 0 && (
// // // // // //                     <div className="edp-pending-section">
// // // // // //                       <div className="edp-pending-head">
// // // // // //                         <h3><i className="fa-solid fa-bell"></i> Pending Approval Requests</h3>
// // // // // //                         <span className="edp-pending-badge">{pendingAttendance.length}</span>
// // // // // //                       </div>
// // // // // //                       <div className="edp-attendance-list">
// // // // // //                         {pendingAttendance.map((name) => (
// // // // // //                           <div key={name} className="edp-attend-row pending">
// // // // // //                             <div className="edp-attend-user">
// // // // // //                               <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
// // // // // //                               <span>{formatName(name)}</span>
// // // // // //                             </div>
// // // // // //                             <div className="edp-approval-actions">
// // // // // //                               <button className="edp-approve-btn" onClick={() => handleApprove(name)}>
// // // // // //                                 <i className="fa-solid fa-check"></i> Approve
// // // // // //                               </button>
// // // // // //                               <button className="edp-reject-btn" onClick={() => handleReject(name)}>
// // // // // //                                 <i className="fa-solid fa-xmark"></i> Reject
// // // // // //                               </button>
// // // // // //                             </div>
// // // // // //                           </div>
// // // // // //                         ))}
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   )}
// // // // // //                 </>
// // // // // //               )}

// // // // // //               {role === "core-member" && (
// // // // // //                 <p className="edp-attend-empty">Attendance is managed by admin/leader.</p>
// // // // // //               )}
// // // // // //             </div>
// // // // // //           )}
// // // // // //         </div>

// // // // // //         <div className="edp-side">
// // // // // //           <div className="notif-bell-container">
// // // // // //             <button 
// // // // // //               className={`notif-bell-btn ${generatedOtp ? 'has-notif' : ''}`}
// // // // // //               onClick={() => setShowNotifDropdown(!showNotifDropdown)}
// // // // // //             >
// // // // // //               <i className="fa-solid fa-bell"></i>
// // // // // //               {generatedOtp && <span className="notif-dot"></span>}
// // // // // //             </button>

// // // // // //             {showNotifDropdown && (
// // // // // //               <div className="notif-dropdown">
// // // // // //                 <div className="notif-header">
// // // // // //                   <h4>Notifications</h4>
// // // // // //                   <button onClick={() => setShowNotifDropdown(false)}><i className="fa-solid fa-xmark"></i></button>
// // // // // //                 </div>
                
// // // // // //                 <div className="notif-body">
// // // // // //                   {generatedOtp ? (
// // // // // //                     <div className="notif-item">
// // // // // //                       <div className="notif-icon">
// // // // // //                         <i className="fa-solid fa-shield-halved"></i>
// // // // // //                       </div>
// // // // // //                       <div className="notif-text">
// // // // // //                         <p>Attendance Verification Code is ready.</p>
                        
// // // // // //                         <div className="otp-display-box">
// // // // // //                           <strong>{generatedOtp}</strong>
// // // // // //                         </div>
                        
// // // // // //                         <button 
// // // // // //                           className="notif-action-btn"
// // // // // //                           onClick={() => {
// // // // // //                             setShowNotifDropdown(false);
// // // // // //                             setShowOtpModal(true);
// // // // // //                           }}
// // // // // //                         >
// // // // // //                           Enter Code Now <i className="fa-solid fa-arrow-right"></i>
// // // // // //                         </button>
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   ) : (
// // // // // //                     <p className="no-notif">No new notifications</p>
// // // // // //                   )}
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </div>

// // // // // //           {role === "user" && (
// // // // // //             <div className="edp-side-card">
// // // // // //               <h3>Quick Actions</h3>
              
// // // // // //               {isRegistered ? (
// // // // // //                 <button className="edp-btn edp-btn-primary" onClick={() => setShowTicket(true)} style={{ background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none' }}>
// // // // // //                   <i className="fa-solid fa-ticket"></i> View Ticket
// // // // // //                 </button>
// // // // // //               ) : actualStatus === "upcoming" && participants < capacity ? (
// // // // // //                 <button className="edp-btn edp-btn-primary" onClick={handleRegister}>
// // // // // //                   <i className="fa-solid fa-user-plus"></i> Participate Now
// // // // // //                 </button>
// // // // // //               ) : actualStatus === "ongoing" ? (
// // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // //                   <i className="fa-solid fa-spinner"></i> Event In Progress
// // // // // //                 </button>
// // // // // //               ) : actualStatus === "completed" ? (
// // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // //                   <i className="fa-solid fa-circle-check"></i> Event Completed
// // // // // //                 </button>
// // // // // //               ) : actualStatus === "cancelled" ? (
// // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // //                   <i className="fa-solid fa-circle-xmark"></i> Event Cancelled
// // // // // //                 </button>
// // // // // //               ) : (
// // // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // // //                   <i className="fa-solid fa-ban"></i> Event Full
// // // // // //                 </button>
// // // // // //               )}
// // // // // //               <button className="edp-btn edp-btn-ghost" onClick={onBack}>
// // // // // //                 <i className="fa-solid fa-arrow-left"></i> Back to Events
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           )}

// // // // // //           <div className="edp-side-card">
// // // // // //             <h3>Event Details</h3>
// // // // // //             <div className="edp-detail-row"><span>Category</span><strong>{event.category}</strong></div>
// // // // // //             <div className="edp-detail-row"><span>Status</span><strong className={`edp-status-text ${getStatusClass(actualStatus)}`}>{actualStatus}</strong></div>
// // // // // //             <div className="edp-detail-row"><span>Event ID</span><strong>EV-{String(event.id).padStart(3, "0")}</strong></div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {showTicket && (
// // // // // //         <div className="ticket-overlay" onClick={() => setShowTicket(false)}>
// // // // // //           <div className="ticket-card" onClick={(e) => e.stopPropagation()}>
// // // // // //             <div className="ticket-header">
// // // // // //               <div className="ticket-logo">
// // // // // //                 <i className="fa-solid fa-plane"></i> ClubPilot
// // // // // //               </div>
// // // // // //               <h2>{event.title}</h2>
// // // // // //               <span className="ticket-status">{actualStatus.toUpperCase()}</span>
// // // // // //             </div>
            
// // // // // //             <div className="ticket-divider">
// // // // // //               <div className="cutout left"></div>
// // // // // //               <div className="dashed-line"></div>
// // // // // //               <div className="cutout right"></div>
// // // // // //             </div>
            
// // // // // //             <div className="ticket-body">
// // // // // //               <div className="ticket-info">
// // // // // //                 <div className="info-group">
// // // // // //                   <span className="info-label">Attendee Name</span>
// // // // // //                   <span className="info-value">{userId ? formatName(userId) : 'Guest'}</span>
// // // // // //                 </div>
// // // // // //                 <div className="info-group">
// // // // // //                   <span className="info-label">Date</span>
// // // // // //                   <span className="info-value">{formatDate(event.date)}</span>
// // // // // //                 </div>
// // // // // //                 <div className="info-group">
// // // // // //                   <span className="info-label">Time</span>
// // // // // //                   <span className="info-value">{event.time}</span>
// // // // // //                 </div>
// // // // // //                 <div className="info-group">
// // // // // //                   <span className="info-label">Venue</span>
// // // // // //                   <span className="info-value">{event.venue}</span>
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               <div className="ticket-qr-section">
// // // // // //                 <div className="ticket-id-container">
// // // // // //                   <span className="ticket-label">PASS ID</span>
// // // // // //                   <span className="ticket-number">#EV-{String(event.id).padStart(3, '0')}-{userId ? userId.split('_')[1] : '00'}</span>
// // // // // //                 </div>
                
// // // // // //                 <div className="qr-frame">
// // // // // //                   <QRCode 
// // // // // //                     value={ticketUrl} 
// // // // // //                     size={130} 
// // // // // //                     bgColor="#ffffff"
// // // // // //                     fgColor="#1e293b"
// // // // // //                   />
// // // // // //                 </div>
                
// // // // // //                 <p className="scan-instruction">
// // // // // //                   <i className="fa-solid fa-camera"></i> Scan to view event details
// // // // // //                 </p>
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             <div className="ticket-footer">
// // // // // //               <button className="ticket-close-btn" onClick={() => setShowTicket(false)}>
// // // // // //                 Close Ticket
// // // // // //               </button>
// // // // // //             </div>

// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {showOtpModal && (
// // // // // //         <div className="ticket-overlay" onClick={() => setShowOtpModal(false)}>
// // // // // //           <div className="ticket-card" style={{ maxWidth: '350px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            
// // // // // //             <div className="ticket-header" style={{ background: '#1e293b' }}>
// // // // // //               <h2 style={{ fontSize: '20px' }}>Verify Attendance</h2>
// // // // // //               <p style={{ fontSize: '12px', marginTop: '5px', color: '#94a3b8' }}>Enter the code from notification</p>
// // // // // //             </div>
            
// // // // // //             <div className="ticket-body" style={{ padding: '30px 24px' }}>
// // // // // //               <input 
// // // // // //                 type="text" 
// // // // // //                 maxLength={4}
// // // // // //                 placeholder="----"
// // // // // //                 value={otpInput}
// // // // // //                 onChange={(e) => {
// // // // // //                   setOtpInput(e.target.value.replace(/\D/g, ''));
// // // // // //                   setOtpError('');
// // // // // //                 }}
// // // // // //                 style={{ 
// // // // // //                   width: '100%', fontSize: '32px', textAlign: 'center', letterSpacing: '10px', 
// // // // // //                   padding: '10px', borderRadius: '12px', border: '2px solid #e2e8f0', outline: 'none',
// // // // // //                   fontWeight: 'bold', color: '#1e293b'
// // // // // //                 }}
// // // // // //               />
              
// // // // // //               {otpError && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '10px', fontWeight: 'bold' }}>{otpError}</p>}

// // // // // //               <button 
// // // // // //                 className="ticket-close-btn" 
// // // // // //                 style={{ marginTop: '20px', background: '#6366f1', color: 'white' }}
// // // // // //                 onClick={async () => {
// // // // // //                   if (otpInput === generatedOtp && generatedOtp !== '') {
                    
// // // // // //                     const newPending = [...pendingAttendance, userId];
// // // // // //                     const newRejected = rejectedBy.filter((n) => n !== userId);
                    
// // // // // //                     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // // //                     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
                    
// // // // // //                     setShowOtpModal(false);
                    
// // // // // //                     setAlertHeading("Attendance Recorded");
// // // // // //                     setAlertText("Your attendance has been successfully marked. The organizer will verify it shortly.");
// // // // // //                     setIsAlertVisible(true);
                    
// // // // // //                   } else {
// // // // // //                     setOtpError("Invalid code. Please check the notification.");
// // // // // //                   }
// // // // // //                 }}
// // // // // //               >
// // // // // //                 Verify & Send Request
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {isAlertVisible && (
// // // // // //         <div className="ticket-overlay" onClick={() => setIsAlertVisible(false)}>
// // // // // //           <div className="ticket-card" style={{ maxWidth: '340px', padding: '32px 24px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
// // // // // //             <div style={{ width: '70px', height: '70px', background: '#ecfdf5', color: '#10b981', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px', margin: '0 auto 20px' }}>
// // // // // //               <i className="fa-solid fa-check"></i>
// // // // // //             </div>
// // // // // //             <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#1e293b' }}>{alertHeading}</h3>
// // // // // //             <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>{alertText}</p>
// // // // // //             <button className="ticket-close-btn" style={{ background: '#10b981', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', width: '100%' }} onClick={() => setIsAlertVisible(false)}>
// // // // // //               Understood
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}

// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default EventDetailPage;

// // // // // import React, { useState, useEffect } from "react";
// // // // // import "./EventDetailPage.css";
// // // // // import { useTheme } from './ThemeContext';
// // // // // import QRCode from 'react-qr-code';

// // // // // const fixEventStatus = (event) => {
// // // // //   if (!event) return 'upcoming';
// // // // //   if (event.status === 'cancelled' || event.status === 'completed') return event.status;
// // // // //   const now = new Date();
// // // // //   const [startStr, endStr] = (event.time || '').split(' - ');
// // // // //   if (!event.date || !startStr || !endStr) return event.status;
  
// // // // //   const start = new Date(`${event.date}T${startStr.trim()}:00`);
// // // // //   const end = new Date(`${event.date}T${endStr.trim()}:00`);
  
// // // // //   if (now >= start && now < end) return 'ongoing';
// // // // //   if (now >= end) return 'completed';
// // // // //   return 'upcoming';
// // // // // };

// // // // // const formatDate = (dateString) => {
// // // // //   if (!dateString) return '';
// // // // //   const d = new Date(dateString);
// // // // //   if (isNaN(d.getTime())) return dateString; 
// // // // //   const year = d.getFullYear();
// // // // //   const month = String(d.getMonth() + 1).padStart(2, '0');
// // // // //   const day = String(d.getDate()).padStart(2, '0');
// // // // //   return `${year}-${month}-${day}`;
// // // // // };

// // // // // function EventDetailPage({ eventId, onBack, role, currentMemberId, dispatch }) {
// // // // //   const { darkMode } = useTheme();
// // // // //   const [event, setEvent] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);
  
// // // // //   const [showTicket, setShowTicket] = useState(false);
// // // // //   const [showNotifDropdown, setShowNotifDropdown] = useState(false);
// // // // //   const [showOtpModal, setShowOtpModal] = useState(false);
  
// // // // //   const [otpInput, setOtpInput] = useState('');
// // // // //   const [generatedOtp, setGeneratedOtp] = useState('');
// // // // //   const [otpError, setOtpError] = useState('');

// // // // //   const [isAlertVisible, setIsAlertVisible] = useState(false);
// // // // //   const [alertText, setAlertText] = useState('');
// // // // //   const [alertHeading, setAlertHeading] = useState('');

// // // // //   useEffect(() => {
// // // // //     const fetchEvent = async () => {
// // // // //       try {
// // // // //         const res = await fetch('http://localhost:5000/api/events');
// // // // //         if (!res.ok) throw new Error("Backend error");
        
// // // // //         const allEvents = await res.json();
// // // // //         if (Array.isArray(allEvents)) {
// // // // //           const found = allEvents.find(e => String(e.id) === String(eventId));
// // // // //           if (found) setEvent(found);
// // // // //         }
// // // // //       } catch (err) {
// // // // //         console.error("🔥 FETCH EVENT ERROR:", err.message);
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };
// // // // //     fetchEvent();
// // // // //   }, [eventId]);

// // // // //   if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading event details...</div>;

// // // // //   if (!event) {
// // // // //     return (
// // // // //       <div className="edp-wrap">
// // // // //         <button className="edp-back" onClick={onBack}>
// // // // //           <i className="fa-solid fa-arrow-left"></i> Back to Events
// // // // //         </button>
// // // // //         <div className="edp-notfound">
// // // // //           <h1>Event Not Found</h1>
// // // // //           <p>The event you are looking for does not exist or backend is down.</p>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   const actualStatus = fixEventStatus(event);
// // // // //   const capacity = event.capacity || 50;
// // // // //   const participants = event.participants || 0;
// // // // //   const percentage = Math.round((participants / capacity) * 100);
// // // // //   const seatsLeft = capacity - participants;
  
// // // // //   const userId = (() => {
// // // // //     const mid = currentMemberId ?? sessionStorage.getItem('currentMemberId');
// // // // //     if (mid && role) return `${role}_${mid}`;
// // // // //     if (role) {
// // // // //       let sid = sessionStorage.getItem('__uid');
// // // // //       if (!sid) {
// // // // //         sid = String(Date.now());
// // // // //         sessionStorage.setItem('__uid', sid);
// // // // //       }
// // // // //       return `${role}_${sid}`;
// // // // //     }
// // // // //     return null;
// // // // //   })();

// // // // //   const attendedBy = event.attendedBy || [];
// // // // //   const pendingAttendance = event.pendingAttendance || [];
// // // // //   const rejectedBy = event.rejectedBy || [];
// // // // //   const participantNames = event.participantNames || [];

// // // // //   const isRegistered = userId ? participantNames.map(String).includes(String(userId)) : false;
// // // // //   const isUserAttended = userId ? attendedBy.map(String).includes(String(userId)) : false;
// // // // //   const isUserPending = userId ? pendingAttendance.map(String).includes(String(userId)) : false; 
// // // // //   const isUserRejected = userId ? rejectedBy.map(String).includes(String(userId)) : false;

// // // // //   const getStatusClass = (status) => status.toLowerCase().replace(/ /g, "-");

// // // // //   const formatName = (name) => {
// // // // //     if (name.startsWith("user_")) return `User ${name.slice(5)}`;
// // // // //     if (name.startsWith("core-member_")) return `Core Member ${name.slice(12)}`;
// // // // //     if (name.startsWith("admin")) return "Admin";
// // // // //     if (name.startsWith("leader")) return "Leader";
// // // // //     if (name.startsWith("user")) return `User ${name.replace("user", "")}`;
// // // // //     if (name.startsWith("member")) return `Member ${name.replace("member", "")}`;
// // // // //     return name;
// // // // //   };

// // // // //   const ticketUrl = `${window.location.origin}/events/${event.id}`;

// // // // //   const updateDB = async (updatedFields) => {
// // // // //     const bodyData = {
// // // // //       participant_names: updatedFields.participantNames ?? participantNames,
// // // // //       attended_by: updatedFields.attendedBy ?? attendedBy,
// // // // //       pending_attendance: updatedFields.pendingAttendance ?? pendingAttendance,
// // // // //       participants: updatedFields.participants ?? participants,
// // // // //       status: updatedFields.status ?? event.status,
// // // // //       rejected_by: updatedFields.rejectedBy ?? rejectedBy,
// // // // //     };

// // // // //     await fetch(`http://localhost:5000/api/events/${event.id}`, {
// // // // //       method: 'PATCH',
// // // // //       headers: { 'Content-Type': 'application/json' },
// // // // //       body: JSON.stringify(bodyData)
// // // // //     });
// // // // //   };

// // // // //   const handleRequestAttendance = async () => {
// // // // //     if (!userId) return;
// // // // //     if (actualStatus !== "ongoing") return;
// // // // //     if (!isRegistered) return;
// // // // //     if (isUserAttended || isUserPending) return;

// // // // //     const newPending = [...pendingAttendance, userId];
// // // // //     const newRejected = rejectedBy.filter((n) => n !== userId);

// // // // //     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
// // // // //   };

// // // // //   const handleApprove = async (name) => {
// // // // //     const newPending = pendingAttendance.filter((n) => n !== name);
// // // // //     const newAttended = [...attendedBy, name];
    
// // // // //     await updateDB({ pendingAttendance: newPending, attendedBy: newAttended });
// // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, attendedBy: newAttended }));
// // // // //   };

// // // // //   const handleReject = async (name) => {
// // // // //     const newPending = pendingAttendance.filter((n) => n !== name);
// // // // //     const newRejected = [...rejectedBy, name];

// // // // //     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
// // // // //   };

// // // // //   const handleToggleAttendance = async (name) => {
// // // // //     const present = attendedBy.map(String).includes(String(name));
// // // // //     const updatedAttended = present ? attendedBy.filter((n) => n !== name) : [...attendedBy, name];

// // // // //     await updateDB({ attendedBy: updatedAttended });
// // // // //     setEvent(prev => ({ ...prev, attendedBy: updatedAttended }));
// // // // //   };

// // // // //   const handleRegister = async () => {
// // // // //     if (actualStatus !== "upcoming") return;
// // // // //     if (participants >= capacity) return;
// // // // //     if (isRegistered) return;

// // // // //     const updatedParticipantNames = [...participantNames, userId];
// // // // //     const updatedParticipants = Number(participants) + 1;

// // // // //     await updateDB({ participantNames: updatedParticipantNames, participants: updatedParticipants });
// // // // //     setEvent(prev => ({ ...prev, participantNames: updatedParticipantNames, participants: updatedParticipants }));
// // // // //   };

// // // // //   return (
// // // // //     <div className="edp-wrap">
// // // // //       <div className="edp-hero">
// // // // //         <div className="edp-hero-bg"></div>
// // // // //         <button className="edp-back" onClick={onBack}>
// // // // //           <i className="fa-solid fa-arrow-left"></i> Back
// // // // //         </button>
// // // // //         <div className="edp-hero-inner">
// // // // //           <div className="edp-hero-info">
// // // // //             <div className="edp-badges">
// // // // //               <span className="edp-badge-category">{event.category}</span>
// // // // //               <span className={`edp-badge-status ${getStatusClass(actualStatus)}`}>
// // // // //                 <span className="dot"></span>
// // // // //                 {actualStatus}
// // // // //               </span>
// // // // //             </div>
// // // // //             <h1>{event.title}</h1>
// // // // //             <p>{event.description}</p>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className="edp-stats">
// // // // //         <div className="edp-stat">
// // // // //           <div className="edp-stat-icon"><i className="fa-regular fa-calendar"></i></div>
// // // // //           <div><span>Date</span><strong>{formatDate(event.date)}</strong></div>
// // // // //         </div>
// // // // //         <div className="edp-stat">
// // // // //           <div className="edp-stat-icon"><i className="fa-regular fa-clock"></i></div>
// // // // //           <div><span>Time</span><strong>{event.time}</strong></div>
// // // // //         </div>
// // // // //         <div className="edp-stat">
// // // // //           <div className="edp-stat-icon"><i className="fa-solid fa-location-dot"></i></div>
// // // // //           <div><span>Venue</span><strong>{event.venue}</strong></div>
// // // // //         </div>
// // // // //         <div className="edp-stat">
// // // // //           <div className="edp-stat-icon"><i className="fa-solid fa-users"></i></div>
// // // // //           <div><span>Participants</span><strong>{participants} / {capacity}</strong></div>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className="edp-grid">
// // // // //         <div className="edp-main">
// // // // //           <div className="edp-card">
// // // // //             <div className="edp-card-head">
// // // // //               <div className="edp-accent"></div>
// // // // //               <h2>About This Event</h2>
// // // // //             </div>
// // // // //             <p className="edp-body-text">{event.description}</p>
// // // // //           </div>

// // // // //           <div className="edp-card">
// // // // //             <div className="edp-card-head">
// // // // //               <div className="edp-accent"></div>
// // // // //               <h2>Registration Progress</h2>
// // // // //             </div>
// // // // //             <div className="edp-capacity-top">
// // // // //               <div>
// // // // //                 <span className="edp-cap-label">Filled</span>
// // // // //                 <strong className="edp-cap-percent">{percentage}%</strong>
// // // // //               </div>
// // // // //               <div className="edp-cap-right">
// // // // //                 <span className="edp-cap-label">Seats Left</span>
// // // // //                 <strong className="edp-cap-seats">{seatsLeft}</strong>
// // // // //               </div>
// // // // //             </div>
// // // // //             <div className="edp-bar">
// // // // //               <div className="edp-bar-fill" style={{ width: `${percentage}%` }}></div>
// // // // //             </div>
// // // // //             <div className="edp-capacity-bottom">
// // // // //               <span>{participants} registered</span>
// // // // //               <span>{capacity} total capacity</span>
// // // // //             </div>
// // // // //           </div>

// // // // //           {actualStatus === "ongoing" && (
// // // // //             <div className="edp-card">
// // // // //               <div className="edp-card-head">
// // // // //                 <div className="edp-accent"></div>
// // // // //                 <h2>Attendance</h2>
// // // // //                 <span className="edp-attend-count">
// // // // //                   {attendedBy.length} / {participantNames.length} verified
// // // // //                 </span>
// // // // //               </div>

// // // // //               {role === "user" && isRegistered && (
// // // // //                 <div className="edp-user-attendance">
// // // // //                   {isUserAttended ? (
// // // // //                     <div className="edp-attendance-marked">
// // // // //                       <i className="fa-solid fa-circle-check"></i>
// // // // //                       <span>Your attendance is verified by Admin</span>
// // // // //                     </div>
// // // // //                   ) : isUserPending ? (
// // // // //                     <div className="edp-attendance-pending" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
// // // // //                       <i className="fa-solid fa-clock" style={{ fontSize: '20px' }}></i>
// // // // //                       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
// // // // //                         <strong style={{ fontSize: '14px' }}>Attendance Recorded</strong>
// // // // //                         <span style={{ fontSize: '13px', opacity: 0.8 }}>Pending verification from the organizer.</span>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   ) : isUserRejected ? (
// // // // //                     <div className="edp-attendance-rejected">
// // // // //                       <i className="fa-solid fa-circle-xmark"></i>
// // // // //                       <div>
// // // // //                         <span>Your request was rejected</span>
// // // // //                         <small>You can request again</small>
// // // // //                       </div>
// // // // //                       <button className="edp-btn edp-btn-primary" onClick={handleRequestAttendance}>
// // // // //                         <i className="fa-solid fa-rotate-right"></i> Request Again
// // // // //                       </button>
// // // // //                     </div>
// // // // //                   ) : (
// // // // //                     <button 
// // // // //                       className="edp-btn edp-btn-primary" 
// // // // //                       onClick={() => {
// // // // //                         const code = Math.floor(1000 + Math.random() * 9000).toString();
// // // // //                         setGeneratedOtp(code);
// // // // //                         setShowNotifDropdown(true);
// // // // //                       }}
// // // // //                     >
// // // // //                       <i className="fa-solid fa-hand"></i> Mark Attendance
// // // // //                     </button>
// // // // //                   )}
// // // // //                 </div>
// // // // //               )}

// // // // //               {(role === "admin" || role === "leader") && (
// // // // //                 <>
// // // // //                   <div className="edp-verified-section">
// // // // //                     <div className="edp-verified-head">
// // // // //                       <h3><i className="fa-solid fa-users"></i> All Participants</h3>
// // // // //                       <span className="edp-verified-count">{participantNames.length}</span>
// // // // //                     </div>
// // // // //                     <div className="edp-attendance-list">
// // // // //                       {participantNames.length > 0 ? (
// // // // //                         participantNames.map((name) => {
// // // // //                           const present = attendedBy.map(String).includes(String(name));
// // // // //                           return (
// // // // //                             <div key={name} className={`edp-attend-row ${present ? "present" : ""}`}>
// // // // //                               <div className="edp-attend-user">
// // // // //                                 <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
// // // // //                                 <span>{formatName(name)}</span>
// // // // //                               </div>
// // // // //                               <button className={`edp-attend-toggle ${present ? "present" : ""}`} onClick={() => handleToggleAttendance(name)}>
// // // // //                                 {present ? (<><i className="fa-solid fa-check"></i> Present</>) : (<><i className="fa-regular fa-circle"></i> Absent</>)}
// // // // //                               </button>
// // // // //                             </div>
// // // // //                           );
// // // // //                         })
// // // // //                       ) : (
// // // // //                         <p className="edp-attend-empty">No participants yet.</p>
// // // // //                       )}
// // // // //                     </div>
// // // // //                   </div>

// // // // //                   {pendingAttendance.length > 0 && (
// // // // //                     <div className="edp-pending-section">
// // // // //                       <div className="edp-pending-head">
// // // // //                         <h3><i className="fa-solid fa-bell"></i> Pending Approval Requests</h3>
// // // // //                         <span className="edp-pending-badge">{pendingAttendance.length}</span>
// // // // //                       </div>
// // // // //                       <div className="edp-attendance-list">
// // // // //                         {pendingAttendance.map((name) => (
// // // // //                           <div key={name} className="edp-attend-row pending">
// // // // //                             <div className="edp-attend-user">
// // // // //                               <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
// // // // //                               <span>{formatName(name)}</span>
// // // // //                             </div>
// // // // //                             <div className="edp-approval-actions">
// // // // //                               <button className="edp-approve-btn" onClick={() => handleApprove(name)}>
// // // // //                                 <i className="fa-solid fa-check"></i> Approve
// // // // //                               </button>
// // // // //                               <button className="edp-reject-btn" onClick={() => handleReject(name)}>
// // // // //                                 <i className="fa-solid fa-xmark"></i> Reject
// // // // //                               </button>
// // // // //                             </div>
// // // // //                           </div>
// // // // //                         ))}
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   )}
// // // // //                 </>
// // // // //               )}

// // // // //               {role === "core-member" && (
// // // // //                 <p className="edp-attend-empty">Attendance is managed by admin/leader.</p>
// // // // //               )}
// // // // //             </div>
// // // // //           )}
// // // // //         </div>

// // // // //         <div className="edp-side">
// // // // //           <div className="notif-bell-container">
// // // // //             <button 
// // // // //               className={`notif-bell-btn ${generatedOtp ? 'has-notif' : ''}`}
// // // // //               onClick={() => setShowNotifDropdown(!showNotifDropdown)}
// // // // //             >
// // // // //               <i className="fa-solid fa-bell"></i>
// // // // //               {generatedOtp && <span className="notif-dot"></span>}
// // // // //             </button>

// // // // //             {showNotifDropdown && (
// // // // //               <div className="notif-dropdown">
// // // // //                 <div className="notif-header">
// // // // //                   <h4>Notifications</h4>
// // // // //                   <button onClick={() => setShowNotifDropdown(false)}><i className="fa-solid fa-xmark"></i></button>
// // // // //                 </div>
                
// // // // //                 <div className="notif-body">
// // // // //                   {generatedOtp ? (
// // // // //                     <div className="notif-item">
// // // // //                       <div className="notif-icon">
// // // // //                         <i className="fa-solid fa-shield-halved"></i>
// // // // //                       </div>
// // // // //                       <div className="notif-text">
// // // // //                         <p>Attendance Verification Code is ready.</p>
                        
// // // // //                         <div className="otp-display-box">
// // // // //                           <strong>{generatedOtp}</strong>
// // // // //                         </div>
                        
// // // // //                         <button 
// // // // //                           className="notif-action-btn"
// // // // //                           onClick={() => {
// // // // //                             setShowNotifDropdown(false);
// // // // //                             setShowOtpModal(true);
// // // // //                           }}
// // // // //                         >
// // // // //                           Enter Code Now <i className="fa-solid fa-arrow-right"></i>
// // // // //                         </button>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   ) : (
// // // // //                     <p className="no-notif">No new notifications</p>
// // // // //                   )}
// // // // //                 </div>
// // // // //               </div>
// // // // //             )}
// // // // //           </div>

// // // // //           {role === "user" && (
// // // // //             <div className="edp-side-card">
// // // // //               <h3>Quick Actions</h3>
              
// // // // //               {isRegistered ? (
// // // // //                 <button className="edp-btn edp-btn-primary" onClick={() => setShowTicket(true)} style={{ background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none' }}>
// // // // //                   <i className="fa-solid fa-ticket"></i> View Ticket
// // // // //                 </button>
// // // // //               ) : actualStatus === "upcoming" && participants < capacity ? (
// // // // //                 <button className="edp-btn edp-btn-primary" onClick={handleRegister}>
// // // // //                   <i className="fa-solid fa-user-plus"></i> Participate Now
// // // // //                 </button>
// // // // //               ) : actualStatus === "ongoing" ? (
// // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // //                   <i className="fa-solid fa-spinner"></i> Event In Progress
// // // // //                 </button>
// // // // //               ) : actualStatus === "completed" ? (
// // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // //                   <i className="fa-solid fa-circle-check"></i> Event Completed
// // // // //                 </button>
// // // // //               ) : actualStatus === "cancelled" ? (
// // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // //                   <i className="fa-solid fa-circle-xmark"></i> Event Cancelled
// // // // //                 </button>
// // // // //               ) : (
// // // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // // //                   <i className="fa-solid fa-ban"></i> Event Full
// // // // //                 </button>
// // // // //               )}
// // // // //               <button className="edp-btn edp-btn-ghost" onClick={onBack}>
// // // // //                 <i className="fa-solid fa-arrow-left"></i> Back to Events
// // // // //               </button>
// // // // //             </div>
// // // // //           )}

// // // // //           <div className="edp-side-card">
// // // // //             <h3>Event Details</h3>
// // // // //             <div className="edp-detail-row"><span>Category</span><strong>{event.category}</strong></div>
// // // // //             <div className="edp-detail-row"><span>Status</span><strong className={`edp-status-text ${getStatusClass(actualStatus)}`}>{actualStatus}</strong></div>
// // // // //             <div className="edp-detail-row"><span>Event ID</span><strong>EV-{String(event.id).padStart(3, "0")}</strong></div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {showTicket && (
// // // // //         <div className="ticket-overlay" onClick={() => setShowTicket(false)}>
// // // // //           <div className="ticket-card" onClick={(e) => e.stopPropagation()}>
// // // // //             <div className="ticket-header">
// // // // //               <div className="ticket-logo">
// // // // //                 <i className="fa-solid fa-plane"></i> ClubPilot
// // // // //               </div>
// // // // //               <h2>{event.title}</h2>
// // // // //               <span className="ticket-status">{actualStatus.toUpperCase()}</span>
// // // // //             </div>
            
// // // // //             <div className="ticket-divider">
// // // // //               <div className="cutout left"></div>
// // // // //               <div className="dashed-line"></div>
// // // // //               <div className="cutout right"></div>
// // // // //             </div>
            
// // // // //             <div className="ticket-body">
// // // // //               <div className="ticket-info">
// // // // //                 <div className="info-group">
// // // // //                   <span className="info-label">Attendee Name</span>
// // // // //                   <span className="info-value">{userId ? formatName(userId) : 'Guest'}</span>
// // // // //                 </div>
// // // // //                 <div className="info-group">
// // // // //                   <span className="info-label">Date</span>
// // // // //                   <span className="info-value">{formatDate(event.date)}</span>
// // // // //                 </div>
// // // // //                 <div className="info-group">
// // // // //                   <span className="info-label">Time</span>
// // // // //                   <span className="info-value">{event.time}</span>
// // // // //                 </div>
// // // // //                 <div className="info-group">
// // // // //                   <span className="info-label">Venue</span>
// // // // //                   <span className="info-value">{event.venue}</span>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="ticket-qr-section">
// // // // //                 <div className="ticket-id-container">
// // // // //                   <span className="ticket-label">PASS ID</span>
// // // // //                   <span className="ticket-number">#EV-{String(event.id).padStart(3, '0')}-{userId ? userId.split('_')[1] : '00'}</span>
// // // // //                 </div>
                
// // // // //                 <div className="qr-frame">
// // // // //                   <QRCode 
// // // // //                     value={ticketUrl} 
// // // // //                     size={130} 
// // // // //                     bgColor="#ffffff"
// // // // //                     fgColor="#1e293b"
// // // // //                   />
// // // // //                 </div>
                
// // // // //                 <p className="scan-instruction">
// // // // //                   <i className="fa-solid fa-camera"></i> Scan to view event details
// // // // //                 </p>
// // // // //               </div>
// // // // //             </div>

// // // // //             <div className="ticket-footer">
// // // // //               <button className="ticket-close-btn" onClick={() => setShowTicket(false)}>
// // // // //                 Close Ticket
// // // // //               </button>
// // // // //             </div>

// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {showOtpModal && (
// // // // //         <div className="ticket-overlay" onClick={() => setShowOtpModal(false)}>
// // // // //           <div className="ticket-card" style={{ maxWidth: '350px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            
// // // // //             <div className="ticket-header" style={{ background: '#1e293b' }}>
// // // // //               <h2 style={{ fontSize: '20px' }}>Verify Attendance</h2>
// // // // //               <p style={{ fontSize: '12px', marginTop: '5px', color: '#94a3b8' }}>Enter the code from notification</p>
// // // // //             </div>
            
// // // // //             <div className="ticket-body" style={{ padding: '30px 24px' }}>
// // // // //               <input 
// // // // //                 type="text" 
// // // // //                 maxLength={4}
// // // // //                 placeholder="----"
// // // // //                 value={otpInput}
// // // // //                 onChange={(e) => {
// // // // //                   setOtpInput(e.target.value.replace(/\D/g, ''));
// // // // //                   setOtpError('');
// // // // //                 }}
// // // // //                 style={{ 
// // // // //                   width: '100%', fontSize: '32px', textAlign: 'center', letterSpacing: '10px', 
// // // // //                   padding: '10px', borderRadius: '12px', border: '2px solid #e2e8f0', outline: 'none',
// // // // //                   fontWeight: 'bold', color: '#1e293b'
// // // // //                 }}
// // // // //               />
              
// // // // //               {otpError && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '10px', fontWeight: 'bold' }}>{otpError}</p>}

// // // // //               <button 
// // // // //                 className="ticket-close-btn" 
// // // // //                 style={{ marginTop: '20px', background: '#6366f1', color: 'white' }}
// // // // //                 onClick={async () => {
// // // // //                   if (otpInput === generatedOtp && generatedOtp !== '') {
                    
// // // // //                     const newPending = [...pendingAttendance, userId];
// // // // //                     const newRejected = rejectedBy.filter((n) => n !== userId);
                    
// // // // //                     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // // //                     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
                    
// // // // //                     setShowOtpModal(false);
                    
// // // // //                     setAlertHeading("Attendance Recorded");
// // // // //                     setAlertText("Your attendance has been successfully marked. The organizer will verify it shortly.");
// // // // //                     setIsAlertVisible(true);
                    
// // // // //                   } else {
// // // // //                     setOtpError("Invalid code. Please check the notification.");
// // // // //                   }
// // // // //                 }}
// // // // //               >
// // // // //                 Verify & Send Request
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {isAlertVisible && (
// // // // //         <div className="ticket-overlay" onClick={() => setIsAlertVisible(false)}>
// // // // //           <div className="ticket-card" style={{ maxWidth: '340px', padding: '32px 24px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
// // // // //             <div style={{ width: '70px', height: '70px', background: '#ecfdf5', color: '#10b981', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px', margin: '0 auto 20px' }}>
// // // // //               <i className="fa-solid fa-check"></i>
// // // // //             </div>
// // // // //             <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#1e293b' }}>{alertHeading}</h3>
// // // // //             <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>{alertText}</p>
// // // // //             <button className="ticket-close-btn" style={{ background: '#10b981', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', width: '100%' }} onClick={() => setIsAlertVisible(false)}>
// // // // //               Understood
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default EventDetailPage;

// // // // import React, { useState, useEffect } from "react";
// // // // import "./EventDetailPage.css";
// // // // import { useTheme } from './ThemeContext';
// // // // import QRCode from 'react-qr-code';

// // // // const fixEventStatus = (event) => {
// // // //   if (!event) return 'upcoming';
// // // //   if (event.status === 'cancelled' || event.status === 'completed') return event.status;
// // // //   const now = new Date();
// // // //   const [startStr, endStr] = (event.time || '').split(' - ');
// // // //   if (!event.date || !startStr || !endStr) return event.status;
  
// // // //   const start = new Date(`${event.date}T${startStr.trim()}:00`);
// // // //   const end = new Date(`${event.date}T${endStr.trim()}:00`);
  
// // // //   if (now >= start && now < end) return 'ongoing';
// // // //   if (now >= end) return 'completed';
// // // //   return 'upcoming';
// // // // };

// // // // const formatDate = (dateString) => {
// // // //   if (!dateString) return '';
// // // //   const d = new Date(dateString);
// // // //   if (isNaN(d.getTime())) return dateString; 
// // // //   const year = d.getFullYear();
// // // //   const month = String(d.getMonth() + 1).padStart(2, '0');
// // // //   const day = String(d.getDate()).padStart(2, '0');
// // // //   return `${year}-${month}-${day}`;
// // // // };

// // // // function EventDetailPage({ eventId, onBack, role, currentMemberId, dispatch }) {
// // // //   const { darkMode } = useTheme();
// // // //   const [event, setEvent] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
  
// // // //   const [showTicket, setShowTicket] = useState(false);
// // // //   const [showNotifDropdown, setShowNotifDropdown] = useState(false);
// // // //   const [showOtpModal, setShowOtpModal] = useState(false);
  
// // // //   const [otpInput, setOtpInput] = useState('');
// // // //   const [generatedOtp, setGeneratedOtp] = useState('');
// // // //   const [otpError, setOtpError] = useState('');

// // // //   const [isAlertVisible, setIsAlertVisible] = useState(false);
// // // //   const [alertText, setAlertText] = useState('');
// // // //   const [alertHeading, setAlertHeading] = useState('');

// // // //   useEffect(() => {
// // // //     const fetchEvent = async () => {
// // // //       try {
// // // //         const res = await fetch('http://localhost:5000/api/events');
// // // //         if (!res.ok) throw new Error("Backend error");
        
// // // //         const allEvents = await res.json();
// // // //         if (Array.isArray(allEvents)) {
// // // //           const found = allEvents.find(e => String(e.id) === String(eventId));
// // // //           if (found) setEvent(found);
// // // //         }
// // // //       } catch (err) {
// // // //         console.error("🔥 FETCH EVENT ERROR:", err.message);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };
// // // //     fetchEvent();
// // // //   }, [eventId]);

// // // //   if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading event details...</div>;

// // // //   if (!event) {
// // // //     return (
// // // //       <div className="edp-wrap">
// // // //         <button className="edp-back" onClick={onBack}>
// // // //           <i className="fa-solid fa-arrow-left"></i> Back to Events
// // // //         </button>
// // // //         <div className="edp-notfound">
// // // //           <h1>Event Not Found</h1>
// // // //           <p>The event you are looking for does not exist or backend is down.</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   const actualStatus = fixEventStatus(event);
// // // //   const capacity = event.capacity || 50;
// // // //   const participants = event.participants || 0;
// // // //   const percentage = Math.round((participants / capacity) * 100);
// // // //   const seatsLeft = capacity - participants;
  
// // // //   const userId = (() => {
// // // //     const mid = currentMemberId ?? sessionStorage.getItem('currentMemberId');
// // // //     if (mid && role) return `${role}_${mid}`;
// // // //     if (role) {
// // // //       let sid = sessionStorage.getItem('__uid');
// // // //       if (!sid) {
// // // //         sid = String(Date.now());
// // // //         sessionStorage.setItem('__uid', sid);
// // // //       }
// // // //       return `${role}_${sid}`;
// // // //     }
// // // //     return null;
// // // //   })();

// // // //   const attendedBy = event.attendedBy || [];
// // // //   const pendingAttendance = event.pendingAttendance || [];
// // // //   const rejectedBy = event.rejectedBy || [];
// // // //   const participantNames = event.participantNames || [];

// // // //   const isRegistered = userId ? participantNames.map(String).includes(String(userId)) : false;
// // // //   const isUserAttended = userId ? attendedBy.map(String).includes(String(userId)) : false;
// // // //   const isUserPending = userId ? pendingAttendance.map(String).includes(String(userId)) : false; 
// // // //   const isUserRejected = userId ? rejectedBy.map(String).includes(String(userId)) : false;

// // // //   const getStatusClass = (status) => status.toLowerCase().replace(/ /g, "-");

// // // //   const formatName = (name) => {
// // // //     if (name.startsWith("user_")) return `User ${name.slice(5)}`;
// // // //     if (name.startsWith("core-member_")) return `Core Member ${name.slice(12)}`;
// // // //     if (name.startsWith("admin")) return "Admin";
// // // //     if (name.startsWith("leader")) return "Leader";
// // // //     if (name.startsWith("user")) return `User ${name.replace("user", "")}`;
// // // //     if (name.startsWith("member")) return `Member ${name.replace("member", "")}`;
// // // //     return name;
// // // //   };

// // // //   const ticketUrl = `${window.location.origin}/events/${event.id}`;

// // // //   const updateDB = async (updatedFields) => {
// // // //     const bodyData = {
// // // //       participant_names: updatedFields.participantNames ?? participantNames,
// // // //       attended_by: updatedFields.attendedBy ?? attendedBy,
// // // //       pending_attendance: updatedFields.pendingAttendance ?? pendingAttendance,
// // // //       participants: updatedFields.participants ?? participants,
// // // //       status: updatedFields.status ?? event.status,
// // // //       rejected_by: updatedFields.rejectedBy ?? rejectedBy,
// // // //     };

// // // //     await fetch(`http://localhost:5000/api/events/${event.id}`, {
// // // //       method: 'PATCH',
// // // //       headers: { 'Content-Type': 'application/json' },
// // // //       body: JSON.stringify(bodyData)
// // // //     });
// // // //   };

// // // //   const handleRequestAttendance = async () => {
// // // //     if (!userId) return;
// // // //     if (actualStatus !== "ongoing") return;
// // // //     if (!isRegistered) return;
// // // //     if (isUserAttended || isUserPending) return;

// // // //     const newPending = [...pendingAttendance, userId];
// // // //     const newRejected = rejectedBy.filter((n) => n !== userId);

// // // //     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
// // // //   };

// // // //   const handleApprove = async (name) => {
// // // //     const newPending = pendingAttendance.filter((n) => n !== name);
// // // //     const newAttended = [...attendedBy, name];
    
// // // //     await updateDB({ pendingAttendance: newPending, attendedBy: newAttended });
// // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, attendedBy: newAttended }));
// // // //   };

// // // //   const handleReject = async (name) => {
// // // //     const newPending = pendingAttendance.filter((n) => n !== name);
// // // //     const newRejected = [...rejectedBy, name];

// // // //     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
// // // //   };

// // // //   const handleToggleAttendance = async (name) => {
// // // //     const present = attendedBy.map(String).includes(String(name));
// // // //     const updatedAttended = present ? attendedBy.filter((n) => n !== name) : [...attendedBy, name];

// // // //     await updateDB({ attendedBy: updatedAttended });
// // // //     setEvent(prev => ({ ...prev, attendedBy: updatedAttended }));
// // // //   };

// // // //   const handleRegister = async () => {
// // // //     if (actualStatus !== "upcoming") return;
// // // //     if (participants >= capacity) return;
// // // //     if (isRegistered) return;

// // // //     const updatedParticipantNames = [...participantNames, userId];
// // // //     const updatedParticipants = Number(participants) + 1;

// // // //     await updateDB({ participantNames: updatedParticipantNames, participants: updatedParticipants });
// // // //     setEvent(prev => ({ ...prev, participantNames: updatedParticipantNames, participants: updatedParticipants }));
// // // //   };

// // // //   return (
// // // //     <div className="edp-wrap">
// // // //       <div className="edp-hero">
// // // //         <div className="edp-hero-bg"></div>
// // // //         <button className="edp-back" onClick={onBack}>
// // // //           <i className="fa-solid fa-arrow-left"></i> Back
// // // //         </button>
// // // //         <div className="edp-hero-inner">
// // // //           <div className="edp-hero-info">
// // // //             <div className="edp-badges">
// // // //               <span className="edp-badge-category">{event.category}</span>
// // // //               <span className={`edp-badge-status ${getStatusClass(actualStatus)}`}>
// // // //                 <span className="dot"></span>
// // // //                 {actualStatus}
// // // //               </span>
// // // //             </div>
// // // //             <h1>{event.title}</h1>
// // // //             <p>{event.description}</p>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <div className="edp-stats">
// // // //         <div className="edp-stat">
// // // //           <div className="edp-stat-icon"><i className="fa-regular fa-calendar"></i></div>
// // // //           <div><span>Date</span><strong>{formatDate(event.date)}</strong></div>
// // // //         </div>
// // // //         <div className="edp-stat">
// // // //           <div className="edp-stat-icon"><i className="fa-regular fa-clock"></i></div>
// // // //           <div><span>Time</span><strong>{event.time}</strong></div>
// // // //         </div>
// // // //         <div className="edp-stat">
// // // //           <div className="edp-stat-icon"><i className="fa-solid fa-location-dot"></i></div>
// // // //           <div><span>Venue</span><strong>{event.venue}</strong></div>
// // // //         </div>
// // // //         <div className="edp-stat">
// // // //           <div className="edp-stat-icon"><i className="fa-solid fa-users"></i></div>
// // // //           <div><span>Participants</span><strong>{participants} / {capacity}</strong></div>
// // // //         </div>
// // // //       </div>

// // // //       <div className="edp-grid">
// // // //         <div className="edp-main">
// // // //           <div className="edp-card">
// // // //             <div className="edp-card-head">
// // // //               <div className="edp-accent"></div>
// // // //               <h2>About This Event</h2>
// // // //             </div>
// // // //             <p className="edp-body-text">{event.description}</p>
// // // //           </div>

// // // //           <div className="edp-card">
// // // //             <div className="edp-card-head">
// // // //               <div className="edp-accent"></div>
// // // //               <h2>Registration Progress</h2>
// // // //             </div>
// // // //             <div className="edp-capacity-top">
// // // //               <div>
// // // //                 <span className="edp-cap-label">Filled</span>
// // // //                 <strong className="edp-cap-percent">{percentage}%</strong>
// // // //               </div>
// // // //               <div className="edp-cap-right">
// // // //                 <span className="edp-cap-label">Seats Left</span>
// // // //                 <strong className="edp-cap-seats">{seatsLeft}</strong>
// // // //               </div>
// // // //             </div>
// // // //             <div className="edp-bar">
// // // //               <div className="edp-bar-fill" style={{ width: `${percentage}%` }}></div>
// // // //             </div>
// // // //             <div className="edp-capacity-bottom">
// // // //               <span>{participants} registered</span>
// // // //               <span>{capacity} total capacity</span>
// // // //             </div>
// // // //           </div>

// // // //           {actualStatus === "ongoing" && (
// // // //             <div className="edp-card">
// // // //               <div className="edp-card-head">
// // // //                 <div className="edp-accent"></div>
// // // //                 <h2>Attendance</h2>
// // // //                 <span className="edp-attend-count">
// // // //                   {attendedBy.length} / {participantNames.length} verified
// // // //                 </span>
// // // //               </div>

// // // //               {role === "user" && isRegistered && (
// // // //                 <div className="edp-user-attendance">
// // // //                   {isUserAttended ? (
// // // //                     <div className="edp-attendance-marked">
// // // //                       <i className="fa-solid fa-circle-check"></i>
// // // //                       <span>Your attendance is verified by Admin</span>
// // // //                     </div>
// // // //                   ) : isUserPending ? (
// // // //                     <div className="edp-attendance-pending" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
// // // //                       <i className="fa-solid fa-clock" style={{ fontSize: '20px' }}></i>
// // // //                       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
// // // //                         <strong style={{ fontSize: '14px' }}>Attendance Recorded</strong>
// // // //                         <span style={{ fontSize: '13px', opacity: 0.8 }}>Pending verification from the organizer.</span>
// // // //                       </div>
// // // //                     </div>
// // // //                   ) : isUserRejected ? (
// // // //                     <div className="edp-attendance-rejected">
// // // //                       <i className="fa-solid fa-circle-xmark"></i>
// // // //                       <div>
// // // //                         <span>Your request was rejected</span>
// // // //                         <small>You can request again</small>
// // // //                       </div>
// // // //                       <button className="edp-btn edp-btn-primary" onClick={handleRequestAttendance}>
// // // //                         <i className="fa-solid fa-rotate-right"></i> Request Again
// // // //                       </button>
// // // //                     </div>
// // // //                   ) : (
// // // //                     <button 
// // // //                       className="edp-btn edp-btn-primary" 
// // // //                       onClick={() => {
// // // //                         const code = Math.floor(1000 + Math.random() * 9000).toString();
// // // //                         setGeneratedOtp(code);
// // // //                         setShowNotifDropdown(true);
// // // //                       }}
// // // //                     >
// // // //                       <i className="fa-solid fa-hand"></i> Mark Attendance
// // // //                     </button>
// // // //                   )}
// // // //                 </div>
// // // //               )}

// // // //               {(role === "admin" || role === "leader") && (
// // // //                 <>
// // // //                   <div className="edp-verified-section">
// // // //                     <div className="edp-verified-head">
// // // //                       <h3><i className="fa-solid fa-users"></i> All Participants</h3>
// // // //                       <span className="edp-verified-count">{participantNames.length}</span>
// // // //                     </div>
// // // //                     <div className="edp-attendance-list">
// // // //                       {participantNames.length > 0 ? (
// // // //                         participantNames.map((name) => {
// // // //                           const present = attendedBy.map(String).includes(String(name));
// // // //                           return (
// // // //                             <div key={name} className={`edp-attend-row ${present ? "present" : ""}`}>
// // // //                               <div className="edp-attend-user">
// // // //                                 <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
// // // //                                 <span>{formatName(name)}</span>
// // // //                               </div>
// // // //                               <button className={`edp-attend-toggle ${present ? "present" : ""}`} onClick={() => handleToggleAttendance(name)}>
// // // //                                 {present ? (<><i className="fa-solid fa-check"></i> Present</>) : (<><i className="fa-regular fa-circle"></i> Absent</>)}
// // // //                               </button>
// // // //                             </div>
// // // //                           );
// // // //                         })
// // // //                       ) : (
// // // //                         <p className="edp-attend-empty">No participants yet.</p>
// // // //                       )}
// // // //                     </div>
// // // //                   </div>

// // // //                   {pendingAttendance.length > 0 && (
// // // //                     <div className="edp-pending-section">
// // // //                       <div className="edp-pending-head">
// // // //                         <h3><i className="fa-solid fa-bell"></i> Pending Approval Requests</h3>
// // // //                         <span className="edp-pending-badge">{pendingAttendance.length}</span>
// // // //                       </div>
// // // //                       <div className="edp-attendance-list">
// // // //                         {pendingAttendance.map((name) => (
// // // //                           <div key={name} className="edp-attend-row pending">
// // // //                             <div className="edp-attend-user">
// // // //                               <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
// // // //                               <span>{formatName(name)}</span>
// // // //                             </div>
// // // //                             <div className="edp-approval-actions">
// // // //                               <button className="edp-approve-btn" onClick={() => handleApprove(name)}>
// // // //                                 <i className="fa-solid fa-check"></i> Approve
// // // //                               </button>
// // // //                               <button className="edp-reject-btn" onClick={() => handleReject(name)}>
// // // //                                 <i className="fa-solid fa-xmark"></i> Reject
// // // //                               </button>
// // // //                             </div>
// // // //                           </div>
// // // //                         ))}
// // // //                       </div>
// // // //                     </div>
// // // //                   )}
// // // //                 </>
// // // //               )}

// // // //               {role === "core-member" && (
// // // //                 <p className="edp-attend-empty">Attendance is managed by admin/leader.</p>
// // // //               )}
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         <div className="edp-side">
// // // //           <div className="notif-bell-container">
// // // //             <button 
// // // //               className={`notif-bell-btn ${generatedOtp ? 'has-notif' : ''}`}
// // // //               onClick={() => setShowNotifDropdown(!showNotifDropdown)}
// // // //             >
// // // //               <i className="fa-solid fa-bell"></i>
// // // //               {generatedOtp && <span className="notif-dot"></span>}
// // // //             </button>

// // // //             {showNotifDropdown && (
// // // //               <div className="notif-dropdown">
// // // //                 <div className="notif-header">
// // // //                   <h4>Notifications</h4>
// // // //                   <button onClick={() => setShowNotifDropdown(false)}><i className="fa-solid fa-xmark"></i></button>
// // // //                 </div>
                
// // // //                 <div className="notif-body">
// // // //                   {generatedOtp ? (
// // // //                     <div className="notif-item">
// // // //                       <div className="notif-icon">
// // // //                         <i className="fa-solid fa-shield-halved"></i>
// // // //                       </div>
// // // //                       <div className="notif-text">
// // // //                         <p>Attendance Verification Code is ready.</p>
                        
// // // //                         <div className="otp-display-box">
// // // //                           <strong>{generatedOtp}</strong>
// // // //                         </div>
                        
// // // //                         <button 
// // // //                           className="notif-action-btn"
// // // //                           onClick={() => {
// // // //                             setShowNotifDropdown(false);
// // // //                             setShowOtpModal(true);
// // // //                           }}
// // // //                         >
// // // //                           Enter Code Now <i className="fa-solid fa-arrow-right"></i>
// // // //                         </button>
// // // //                       </div>
// // // //                     </div>
// // // //                   ) : (
// // // //                     <p className="no-notif">No new notifications</p>
// // // //                   )}
// // // //                 </div>
// // // //               </div>
// // // //             )}
// // // //           </div>

// // // //           {role === "user" && (
// // // //             <div className="edp-side-card">
// // // //               <h3>Quick Actions</h3>
              
// // // //               {isRegistered ? (
// // // //                 <button className="edp-btn edp-btn-primary" onClick={() => setShowTicket(true)} style={{ background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none' }}>
// // // //                   <i className="fa-solid fa-ticket"></i> View Ticket
// // // //                 </button>
// // // //               ) : actualStatus === "upcoming" && participants < capacity ? (
// // // //                 <button className="edp-btn edp-btn-primary" onClick={handleRegister}>
// // // //                   <i className="fa-solid fa-user-plus"></i> Participate Now
// // // //                 </button>
// // // //               ) : actualStatus === "ongoing" ? (
// // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // //                   <i className="fa-solid fa-spinner"></i> Event In Progress
// // // //                 </button>
// // // //               ) : actualStatus === "completed" ? (
// // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // //                   <i className="fa-solid fa-circle-check"></i> Event Completed
// // // //                 </button>
// // // //               ) : actualStatus === "cancelled" ? (
// // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // //                   <i className="fa-solid fa-circle-xmark"></i> Event Cancelled
// // // //                 </button>
// // // //               ) : (
// // // //                 <button className="edp-btn edp-btn-primary" disabled>
// // // //                   <i className="fa-solid fa-ban"></i> Event Full
// // // //                 </button>
// // // //               )}
// // // //               <button className="edp-btn edp-btn-ghost" onClick={onBack}>
// // // //                 <i className="fa-solid fa-arrow-left"></i> Back to Events
// // // //               </button>
// // // //             </div>
// // // //           )}

// // // //           <div className="edp-side-card">
// // // //             <h3>Event Details</h3>
// // // //             <div className="edp-detail-row"><span>Category</span><strong>{event.category}</strong></div>
// // // //             <div className="edp-detail-row"><span>Status</span><strong className={`edp-status-text ${getStatusClass(actualStatus)}`}>{actualStatus}</strong></div>
// // // //             <div className="edp-detail-row"><span>Event ID</span><strong>EV-{String(event.id).padStart(3, "0")}</strong></div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {showTicket && (
// // // //         <div className="ticket-overlay" onClick={() => setShowTicket(false)}>
// // // //           <div className="ticket-card" onClick={(e) => e.stopPropagation()}>
// // // //             <div className="ticket-header">
// // // //               <div className="ticket-logo">
// // // //                 <i className="fa-solid fa-plane"></i> ClubPilot
// // // //               </div>
// // // //               <h2>{event.title}</h2>
// // // //               <span className="ticket-status">{actualStatus.toUpperCase()}</span>
// // // //             </div>
            
// // // //             <div className="ticket-divider">
// // // //               <div className="cutout left"></div>
// // // //               <div className="dashed-line"></div>
// // // //               <div className="cutout right"></div>
// // // //             </div>
            
// // // //             <div className="ticket-body">
// // // //               <div className="ticket-info">
// // // //                 <div className="info-group">
// // // //                   <span className="info-label">Attendee Name</span>
// // // //                   <span className="info-value">{userId ? formatName(userId) : 'Guest'}</span>
// // // //                 </div>
// // // //                 <div className="info-group">
// // // //                   <span className="info-label">Date</span>
// // // //                   <span className="info-value">{formatDate(event.date)}</span>
// // // //                 </div>
// // // //                 <div className="info-group">
// // // //                   <span className="info-label">Time</span>
// // // //                   <span className="info-value">{event.time}</span>
// // // //                 </div>
// // // //                 <div className="info-group">
// // // //                   <span className="info-label">Venue</span>
// // // //                   <span className="info-value">{event.venue}</span>
// // // //                 </div>
// // // //               </div>

// // // //               <div className="ticket-qr-section">
// // // //                 <div className="ticket-id-container">
// // // //                   <span className="ticket-label">PASS ID</span>
// // // //                   <span className="ticket-number">#EV-{String(event.id).padStart(3, '0')}-{userId ? userId.split('_')[1] : '00'}</span>
// // // //                 </div>
                
// // // //                 <div className="qr-frame">
// // // //                   <QRCode 
// // // //                     value={ticketUrl} 
// // // //                     size={130} 
// // // //                     bgColor="#ffffff"
// // // //                     fgColor="#1e293b"
// // // //                   />
// // // //                 </div>
                
// // // //                 <p className="scan-instruction">
// // // //                   <i className="fa-solid fa-camera"></i> Scan to view event details
// // // //                 </p>
// // // //               </div>
// // // //             </div>

// // // //             <div className="ticket-footer">
// // // //               <button className="ticket-close-btn" onClick={() => setShowTicket(false)}>
// // // //                 Close Ticket
// // // //               </button>
// // // //             </div>

// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {showOtpModal && (
// // // //         <div className="ticket-overlay" onClick={() => setShowOtpModal(false)}>
// // // //           <div className="ticket-card" style={{ maxWidth: '350px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            
// // // //             <div className="ticket-header" style={{ background: '#1e293b' }}>
// // // //               <h2 style={{ fontSize: '20px' }}>Verify Attendance</h2>
// // // //               <p style={{ fontSize: '12px', marginTop: '5px', color: '#94a3b8' }}>Enter the code from notification</p>
// // // //             </div>
            
// // // //             <div className="ticket-body" style={{ padding: '30px 24px' }}>
// // // //               <input 
// // // //                 type="text" 
// // // //                 maxLength={4}
// // // //                 placeholder="----"
// // // //                 value={otpInput}
// // // //                 onChange={(e) => {
// // // //                   setOtpInput(e.target.value.replace(/\D/g, ''));
// // // //                   setOtpError('');
// // // //                 }}
// // // //                 style={{ 
// // // //                   width: '100%', fontSize: '32px', textAlign: 'center', letterSpacing: '10px', 
// // // //                   padding: '10px', borderRadius: '12px', border: '2px solid #e2e8f0', outline: 'none',
// // // //                   fontWeight: 'bold', color: '#1e293b'
// // // //                 }}
// // // //               />
              
// // // //               {otpError && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '10px', fontWeight: 'bold' }}>{otpError}</p>}

// // // //               <button 
// // // //                 className="ticket-close-btn" 
// // // //                 style={{ marginTop: '20px', background: '#6366f1', color: 'white' }}
// // // //                 onClick={async () => {
// // // //                   if (otpInput === generatedOtp && generatedOtp !== '') {
                    
// // // //                     const newPending = [...pendingAttendance, userId];
// // // //                     const newRejected = rejectedBy.filter((n) => n !== userId);
                    
// // // //                     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // // //                     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
                    
// // // //                     setShowOtpModal(false);
                    
// // // //                     setAlertHeading("Attendance Recorded");
// // // //                     setAlertText("Your attendance has been successfully marked. The organizer will verify it shortly.");
// // // //                     setIsAlertVisible(true);
                    
// // // //                   } else {
// // // //                     setOtpError("Invalid code. Please check the notification.");
// // // //                   }
// // // //                 }}
// // // //               >
// // // //                 Verify & Send Request
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {isAlertVisible && (
// // // //         <div className="ticket-overlay" onClick={() => setIsAlertVisible(false)}>
// // // //           <div className="ticket-card" style={{ maxWidth: '340px', padding: '32px 24px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
// // // //             <div style={{ width: '70px', height: '70px', background: '#ecfdf5', color: '#10b981', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px', margin: '0 auto 20px' }}>
// // // //               <i className="fa-solid fa-check"></i>
// // // //             </div>
// // // //             <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#1e293b' }}>{alertHeading}</h3>
// // // //             <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>{alertText}</p>
// // // //             <button className="ticket-close-btn" style={{ background: '#10b981', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', width: '100%' }} onClick={() => setIsAlertVisible(false)}>
// // // //               Understood
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //     </div>
// // // //   );
// // // // }

// // // // export default EventDetailPage;

// // // import React, { useState, useEffect } from "react";
// // // import "./EventDetailPage.css";
// // // import { useTheme } from './ThemeContext';
// // // import QRCode from 'react-qr-code';

// // // const fixEventStatus = (event) => {
// // //   if (!event) return 'upcoming';
// // //   if (event.status === 'cancelled' || event.status === 'completed') return event.status;
// // //   const now = new Date();
// // //   const [startStr, endStr] = (event.time || '').split(' - ');
// // //   if (!event.date || !startStr || !endStr) return event.status;
  
// // //   const start = new Date(`${event.date}T${startStr.trim()}:00`);
// // //   const end = new Date(`${event.date}T${endStr.trim()}:00`);
  
// // //   if (now >= start && now < end) return 'ongoing';
// // //   if (now >= end) return 'completed';
// // //   return 'upcoming';
// // // };

// // // const formatDate = (dateString) => {
// // //   if (!dateString) return '';
// // //   const d = new Date(dateString);
// // //   if (isNaN(d.getTime())) return dateString; 
// // //   const year = d.getFullYear();
// // //   const month = String(d.getMonth() + 1).padStart(2, '0');
// // //   const day = String(d.getDate()).padStart(2, '0');
// // //   return `${year}-${month}-${day}`;
// // // };

// // // function EventDetailPage({ eventId, onBack, role, currentMemberId, dispatch }) {
// // //   const { darkMode } = useTheme();
// // //   const [event, setEvent] = useState(null);
// // //   const [loading, setLoading] = useState(true);
  
// // //   const [showTicket, setShowTicket] = useState(false);
// // //   const [showNotifDropdown, setShowNotifDropdown] = useState(false);
// // //   const [showOtpModal, setShowOtpModal] = useState(false);
  
// // //   const [otpInput, setOtpInput] = useState('');
// // //   const [generatedOtp, setGeneratedOtp] = useState('');
// // //   const [otpError, setOtpError] = useState('');

// // //   const [isAlertVisible, setIsAlertVisible] = useState(false);
// // //   const [alertText, setAlertText] = useState('');
// // //   const [alertHeading, setAlertHeading] = useState('');

// // //   useEffect(() => {
// // //     const fetchEvent = async () => {
// // //       try {
// // //         const res = await fetch('http://localhost:5000/api/events');
// // //         if (!res.ok) throw new Error("Backend error");
        
// // //         const allEvents = await res.json();
// // //         if (Array.isArray(allEvents)) {
// // //           const found = allEvents.find(e => String(e.id) === String(eventId));
// // //           if (found) setEvent(found);
// // //         }
// // //       } catch (err) {
// // //         console.error("🔥 FETCH EVENT ERROR:", err.message);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchEvent();
// // //   }, [eventId]);

// // //   if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading event details...</div>;

// // //   if (!event) {
// // //     return (
// // //       <div className="edp-wrap">
// // //         <button className="edp-back" onClick={onBack}>
// // //           <i className="fa-solid fa-arrow-left"></i> Back to Events
// // //         </button>
// // //         <div className="edp-notfound">
// // //           <h1>Event Not Found</h1>
// // //           <p>The event you are looking for does not exist or backend is down.</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   const actualStatus = fixEventStatus(event);
// // //   const capacity = event.capacity || 50;
// // //   const participants = event.participants || 0;
// // //   const percentage = Math.round((participants / capacity) * 100);
// // //   const seatsLeft = capacity - participants;
  
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

// // //   const attendedBy = event.attendedBy || [];
// // //   const pendingAttendance = event.pendingAttendance || [];
// // //   const rejectedBy = event.rejectedBy || [];
// // //   const participantNames = event.participantNames || [];

// // //   const isRegistered = userId ? participantNames.map(String).includes(String(userId)) : false;
// // //   const isUserAttended = userId ? attendedBy.map(String).includes(String(userId)) : false;
// // //   const isUserPending = userId ? pendingAttendance.map(String).includes(String(userId)) : false; 
// // //   const isUserRejected = userId ? rejectedBy.map(String).includes(String(userId)) : false;

// // //   const getStatusClass = (status) => status.toLowerCase().replace(/ /g, "-");

// // //   const formatName = (name) => {
// // //     if (name.startsWith("user_")) return `User ${name.slice(5)}`;
// // //     if (name.startsWith("core-member_")) return `Core Member ${name.slice(12)}`;
// // //     if (name.startsWith("admin")) return "Admin";
// // //     if (name.startsWith("leader")) return "Leader";
// // //     if (name.startsWith("user")) return `User ${name.replace("user", "")}`;
// // //     if (name.startsWith("member")) return `Member ${name.replace("member", "")}`;
// // //     return name;
// // //   };

// // //   const ticketUrl = `${window.location.origin}/events/${event.id}`;

// // //   const updateDB = async (updatedFields) => {
// // //     const bodyData = {
// // //       participant_names: updatedFields.participantNames ?? participantNames,
// // //       attended_by: updatedFields.attendedBy ?? attendedBy,
// // //       pending_attendance: updatedFields.pendingAttendance ?? pendingAttendance,
// // //       participants: updatedFields.participants ?? participants,
// // //       status: updatedFields.status ?? event.status,
// // //       rejected_by: updatedFields.rejectedBy ?? rejectedBy,
// // //     };

// // //     await fetch(`http://localhost:5000/api/events/${event.id}`, {
// // //       method: 'PATCH',
// // //       headers: { 'Content-Type': 'application/json' },
// // //       body: JSON.stringify(bodyData)
// // //     });
// // //   };

// // //   const handleRequestAttendance = async () => {
// // //     if (!userId) return;
// // //     if (actualStatus !== "ongoing") return;
// // //     if (!isRegistered) return;
// // //     if (isUserAttended || isUserPending) return;

// // //     const newPending = [...pendingAttendance, userId];
// // //     const newRejected = rejectedBy.filter((n) => n !== userId);

// // //     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
// // //   };

// // //   const handleApprove = async (name) => {
// // //     const newPending = pendingAttendance.filter((n) => n !== name);
// // //     const newAttended = [...attendedBy, name];
    
// // //     await updateDB({ pendingAttendance: newPending, attendedBy: newAttended });
// // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, attendedBy: newAttended }));
// // //   };

// // //   const handleReject = async (name) => {
// // //     const newPending = pendingAttendance.filter((n) => n !== name);
// // //     const newRejected = [...rejectedBy, name];

// // //     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // //     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
// // //   };

// // //   const handleToggleAttendance = async (name) => {
// // //     const present = attendedBy.map(String).includes(String(name));
// // //     const updatedAttended = present ? attendedBy.filter((n) => n !== name) : [...attendedBy, name];

// // //     await updateDB({ attendedBy: updatedAttended });
// // //     setEvent(prev => ({ ...prev, attendedBy: updatedAttended }));
// // //   };

// // //   const handleRegister = async () => {
// // //     if (actualStatus !== "upcoming") return;
// // //     if (participants >= capacity) return;
// // //     if (isRegistered) return;

// // //     const updatedParticipantNames = [...participantNames, userId];
// // //     const updatedParticipants = Number(participants) + 1;

// // //     await updateDB({ participantNames: updatedParticipantNames, participants: updatedParticipants });
// // //     setEvent(prev => ({ ...prev, participantNames: updatedParticipantNames, participants: updatedParticipants }));
// // //   };

// // //   return (
// // //     <div className="edp-wrap">
// // //       <div className="edp-hero">
// // //         <div className="edp-hero-bg"></div>
// // //         <button className="edp-back" onClick={onBack}>
// // //           <i className="fa-solid fa-arrow-left"></i> Back
// // //         </button>
// // //         <div className="edp-hero-inner">
// // //           <div className="edp-hero-info">
// // //             <div className="edp-badges">
// // //               <span className="edp-badge-category">{event.category}</span>
// // //               <span className={`edp-badge-status ${getStatusClass(actualStatus)}`}>
// // //                 <span className="dot"></span>
// // //                 {actualStatus}
// // //               </span>
// // //             </div>
// // //             <h1>{event.title}</h1>
// // //             <p>{event.description}</p>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div className="edp-stats">
// // //         <div className="edp-stat">
// // //           <div className="edp-stat-icon"><i className="fa-regular fa-calendar"></i></div>
// // //           <div><span>Date</span><strong>{formatDate(event.date)}</strong></div>
// // //         </div>
// // //         <div className="edp-stat">
// // //           <div className="edp-stat-icon"><i className="fa-regular fa-clock"></i></div>
// // //           <div><span>Time</span><strong>{event.time}</strong></div>
// // //         </div>
// // //         <div className="edp-stat">
// // //           <div className="edp-stat-icon"><i className="fa-solid fa-location-dot"></i></div>
// // //           <div><span>Venue</span><strong>{event.venue}</strong></div>
// // //         </div>
// // //         <div className="edp-stat">
// // //           <div className="edp-stat-icon"><i className="fa-solid fa-users"></i></div>
// // //           <div><span>Participants</span><strong>{participants} / {capacity}</strong></div>
// // //         </div>
// // //       </div>

// // //       <div className="edp-grid">
// // //         <div className="edp-main">
// // //           <div className="edp-card">
// // //             <div className="edp-card-head">
// // //               <div className="edp-accent"></div>
// // //               <h2>About This Event</h2>
// // //             </div>
// // //             <p className="edp-body-text">{event.description}</p>
// // //           </div>

// // //           <div className="edp-card">
// // //             <div className="edp-card-head">
// // //               <div className="edp-accent"></div>
// // //               <h2>Registration Progress</h2>
// // //             </div>
// // //             <div className="edp-capacity-top">
// // //               <div>
// // //                 <span className="edp-cap-label">Filled</span>
// // //                 <strong className="edp-cap-percent">{percentage}%</strong>
// // //               </div>
// // //               <div className="edp-cap-right">
// // //                 <span className="edp-cap-label">Seats Left</span>
// // //                 <strong className="edp-cap-seats">{seatsLeft}</strong>
// // //               </div>
// // //             </div>
// // //             <div className="edp-bar">
// // //               <div className="edp-bar-fill" style={{ width: `${percentage}%` }}></div>
// // //             </div>
// // //             <div className="edp-capacity-bottom">
// // //               <span>{participants} registered</span>
// // //               <span>{capacity} total capacity</span>
// // //             </div>
// // //           </div>

// // //           {actualStatus === "ongoing" && (
// // //             <div className="edp-card">
// // //               <div className="edp-card-head">
// // //                 <div className="edp-accent"></div>
// // //                 <h2>Attendance</h2>
// // //                 <span className="edp-attend-count">
// // //                   {attendedBy.length} / {participantNames.length} verified
// // //                 </span>
// // //               </div>

// // //               {role === "user" && isRegistered && (
// // //                 <div className="edp-user-attendance">
// // //                   {isUserAttended ? (
// // //                     <div className="edp-attendance-marked">
// // //                       <i className="fa-solid fa-circle-check"></i>
// // //                       <span>Your attendance is verified by Admin</span>
// // //                     </div>
// // //                   ) : isUserPending ? (
// // //                     <div className="edp-attendance-pending" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
// // //                       <i className="fa-solid fa-clock" style={{ fontSize: '20px' }}></i>
// // //                       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
// // //                         <strong style={{ fontSize: '14px' }}>Attendance Recorded</strong>
// // //                         <span style={{ fontSize: '13px', opacity: 0.8 }}>Pending verification from the organizer.</span>
// // //                       </div>
// // //                     </div>
// // //                   ) : isUserRejected ? (
// // //                     <div className="edp-attendance-rejected">
// // //                       <i className="fa-solid fa-circle-xmark"></i>
// // //                       <div>
// // //                         <span>Your request was rejected</span>
// // //                         <small>You can request again</small>
// // //                       </div>
// // //                       <button className="edp-btn edp-btn-primary" onClick={handleRequestAttendance}>
// // //                         <i className="fa-solid fa-rotate-right"></i> Request Again
// // //                       </button>
// // //                     </div>
// // //                   ) : (
// // //                     <button 
// // //                       className="edp-btn edp-btn-primary" 
// // //                       onClick={() => {
// // //                         const code = Math.floor(1000 + Math.random() * 9000).toString();
// // //                         setGeneratedOtp(code);
// // //                         setShowNotifDropdown(true);
// // //                       }}
// // //                     >
// // //                       <i className="fa-solid fa-hand"></i> Mark Attendance
// // //                     </button>
// // //                   )}
// // //                 </div>
// // //               )}

// // //               {(role === "admin" || role === "leader") && (
// // //                 <>
// // //                   <div className="edp-verified-section">
// // //                     <div className="edp-verified-head">
// // //                       <h3><i className="fa-solid fa-users"></i> All Participants</h3>
// // //                       <span className="edp-verified-count">{participantNames.length}</span>
// // //                     </div>
// // //                     <div className="edp-attendance-list">
// // //                       {participantNames.length > 0 ? (
// // //                         participantNames.map((name) => {
// // //                           const present = attendedBy.map(String).includes(String(name));
// // //                           return (
// // //                             <div key={name} className={`edp-attend-row ${present ? "present" : ""}`}>
// // //                               <div className="edp-attend-user">
// // //                                 <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
// // //                                 <span>{formatName(name)}</span>
// // //                               </div>
// // //                               <button className={`edp-attend-toggle ${present ? "present" : ""}`} onClick={() => handleToggleAttendance(name)}>
// // //                                 {present ? (<><i className="fa-solid fa-check"></i> Present</>) : (<><i className="fa-regular fa-circle"></i> Absent</>)}
// // //                               </button>
// // //                             </div>
// // //                           );
// // //                         })
// // //                       ) : (
// // //                         <p className="edp-attend-empty">No participants yet.</p>
// // //                       )}
// // //                     </div>
// // //                   </div>

// // //                   {pendingAttendance.length > 0 && (
// // //                     <div className="edp-pending-section">
// // //                       <div className="edp-pending-head">
// // //                         <h3><i className="fa-solid fa-bell"></i> Pending Approval Requests</h3>
// // //                         <span className="edp-pending-badge">{pendingAttendance.length}</span>
// // //                       </div>
// // //                       <div className="edp-attendance-list">
// // //                         {pendingAttendance.map((name) => (
// // //                           <div key={name} className="edp-attend-row pending">
// // //                             <div className="edp-attend-user">
// // //                               <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
// // //                               <span>{formatName(name)}</span>
// // //                             </div>
// // //                             <div className="edp-approval-actions">
// // //                               <button className="edp-approve-btn" onClick={() => handleApprove(name)}>
// // //                                 <i className="fa-solid fa-check"></i> Approve
// // //                               </button>
// // //                               <button className="edp-reject-btn" onClick={() => handleReject(name)}>
// // //                                 <i className="fa-solid fa-xmark"></i> Reject
// // //                               </button>
// // //                             </div>
// // //                           </div>
// // //                         ))}
// // //                       </div>
// // //                     </div>
// // //                   )}
// // //                 </>
// // //               )}

// // //               {role === "core-member" && (
// // //                 <p className="edp-attend-empty">Attendance is managed by admin/leader.</p>
// // //               )}
// // //             </div>
// // //           )}
// // //         </div>

// // //         <div className="edp-side">
// // //           <div className="notif-bell-container">
// // //             <button 
// // //               className={`notif-bell-btn ${generatedOtp ? 'has-notif' : ''}`}
// // //               onClick={() => setShowNotifDropdown(!showNotifDropdown)}
// // //             >
// // //               <i className="fa-solid fa-bell"></i>
// // //               {generatedOtp && <span className="notif-dot"></span>}
// // //             </button>

// // //             {showNotifDropdown && (
// // //               <div className="notif-dropdown">
// // //                 <div className="notif-header">
// // //                   <h4>Notifications</h4>
// // //                   <button onClick={() => setShowNotifDropdown(false)}><i className="fa-solid fa-xmark"></i></button>
// // //                 </div>
                
// // //                 <div className="notif-body">
// // //                   {generatedOtp ? (
// // //                     <div className="notif-item">
// // //                       <div className="notif-icon">
// // //                         <i className="fa-solid fa-shield-halved"></i>
// // //                       </div>
// // //                       <div className="notif-text">
// // //                         <p>Attendance Verification Code is ready.</p>
                        
// // //                         <div className="otp-display-box">
// // //                           <strong>{generatedOtp}</strong>
// // //                         </div>
                        
// // //                         <button 
// // //                           className="notif-action-btn"
// // //                           onClick={() => {
// // //                             setShowNotifDropdown(false);
// // //                             setShowOtpModal(true);
// // //                           }}
// // //                         >
// // //                           Enter Code Now <i className="fa-solid fa-arrow-right"></i>
// // //                         </button>
// // //                       </div>
// // //                     </div>
// // //                   ) : (
// // //                     <p className="no-notif">No new notifications</p>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>

// // //           {role === "user" && (
// // //             <div className="edp-side-card">
// // //               <h3>Quick Actions</h3>
              
// // //               {isRegistered ? (
// // //                 <button className="edp-btn edp-btn-primary" onClick={() => setShowTicket(true)} style={{ background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none' }}>
// // //                   <i className="fa-solid fa-ticket"></i> View Ticket
// // //                 </button>
// // //               ) : actualStatus === "upcoming" && participants < capacity ? (
// // //                 <button className="edp-btn edp-btn-primary" onClick={handleRegister}>
// // //                   <i className="fa-solid fa-user-plus"></i> Participate Now
// // //                 </button>
// // //               ) : actualStatus === "ongoing" ? (
// // //                 <button className="edp-btn edp-btn-primary" disabled>
// // //                   <i className="fa-solid fa-spinner"></i> Event In Progress
// // //                 </button>
// // //               ) : actualStatus === "completed" ? (
// // //                 <button className="edp-btn edp-btn-primary" disabled>
// // //                   <i className="fa-solid fa-circle-check"></i> Event Completed
// // //                 </button>
// // //               ) : actualStatus === "cancelled" ? (
// // //                 <button className="edp-btn edp-btn-primary" disabled>
// // //                   <i className="fa-solid fa-circle-xmark"></i> Event Cancelled
// // //                 </button>
// // //               ) : (
// // //                 <button className="edp-btn edp-btn-primary" disabled>
// // //                   <i className="fa-solid fa-ban"></i> Event Full
// // //                 </button>
// // //               )}
// // //               <button className="edp-btn edp-btn-ghost" onClick={onBack}>
// // //                 <i className="fa-solid fa-arrow-left"></i> Back to Events
// // //               </button>
// // //             </div>
// // //           )}

// // //           <div className="edp-side-card">
// // //             <h3>Event Details</h3>
// // //             <div className="edp-detail-row"><span>Category</span><strong>{event.category}</strong></div>
// // //             <div className="edp-detail-row"><span>Status</span><strong className={`edp-status-text ${getStatusClass(actualStatus)}`}>{actualStatus}</strong></div>
// // //             <div className="edp-detail-row"><span>Event ID</span><strong>EV-{String(event.id).padStart(3, "0")}</strong></div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {showTicket && (
// // //         <div className="ticket-overlay" onClick={() => setShowTicket(false)}>
// // //           <div className="ticket-card" onClick={(e) => e.stopPropagation()}>
// // //             <div className="ticket-header">
// // //               <div className="ticket-logo">
// // //                 <i className="fa-solid fa-plane"></i> ClubPilot
// // //               </div>
// // //               <h2>{event.title}</h2>
// // //               <span className="ticket-status">{actualStatus.toUpperCase()}</span>
// // //             </div>
            
// // //             <div className="ticket-divider">
// // //               <div className="cutout left"></div>
// // //               <div className="dashed-line"></div>
// // //               <div className="cutout right"></div>
// // //             </div>
            
// // //             <div className="ticket-body">
// // //               <div className="ticket-info">
// // //                 <div className="info-group">
// // //                   <span className="info-label">Attendee Name</span>
// // //                   <span className="info-value">{userId ? formatName(userId) : 'Guest'}</span>
// // //                 </div>
// // //                 <div className="info-group">
// // //                   <span className="info-label">Date</span>
// // //                   <span className="info-value">{formatDate(event.date)}</span>
// // //                 </div>
// // //                 <div className="info-group">
// // //                   <span className="info-label">Time</span>
// // //                   <span className="info-value">{event.time}</span>
// // //                 </div>
// // //                 <div className="info-group">
// // //                   <span className="info-label">Venue</span>
// // //                   <span className="info-value">{event.venue}</span>
// // //                 </div>
// // //               </div>

// // //               <div className="ticket-qr-section">
// // //                 <div className="ticket-id-container">
// // //                   <span className="ticket-label">PASS ID</span>
// // //                   <span className="ticket-number">#EV-{String(event.id).padStart(3, '0')}-{userId ? userId.split('_')[1] : '00'}</span>
// // //                 </div>
                
// // //                 <div className="qr-frame">
// // //                   <QRCode 
// // //                     value={ticketUrl} 
// // //                     size={130} 
// // //                     bgColor="#ffffff"
// // //                     fgColor="#1e293b"
// // //                   />
// // //                 </div>
                
// // //                 <p className="scan-instruction">
// // //                   <i className="fa-solid fa-camera"></i> Scan to view event details
// // //                 </p>
// // //               </div>
// // //             </div>

// // //             <div className="ticket-footer">
// // //               <button className="ticket-close-btn" onClick={() => setShowTicket(false)}>
// // //                 Close Ticket
// // //               </button>
// // //             </div>

// // //           </div>
// // //         </div>
// // //       )}

// // //       {showOtpModal && (
// // //         <div className="ticket-overlay" onClick={() => setShowOtpModal(false)}>
// // //           <div className="ticket-card" style={{ maxWidth: '350px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            
// // //             <div className="ticket-header" style={{ background: '#1e293b' }}>
// // //               <h2 style={{ fontSize: '20px' }}>Verify Attendance</h2>
// // //               <p style={{ fontSize: '12px', marginTop: '5px', color: '#94a3b8' }}>Enter the code from notification</p>
// // //             </div>
            
// // //             <div className="ticket-body" style={{ padding: '30px 24px' }}>
// // //               <input 
// // //                 type="text" 
// // //                 maxLength={4}
// // //                 placeholder="----"
// // //                 value={otpInput}
// // //                 onChange={(e) => {
// // //                   setOtpInput(e.target.value.replace(/\D/g, ''));
// // //                   setOtpError('');
// // //                 }}
// // //                 style={{ 
// // //                   width: '100%', fontSize: '32px', textAlign: 'center', letterSpacing: '10px', 
// // //                   padding: '10px', borderRadius: '12px', border: '2px solid #e2e8f0', outline: 'none',
// // //                   fontWeight: 'bold', color: '#1e293b'
// // //                 }}
// // //               />
              
// // //               {otpError && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '10px', fontWeight: 'bold' }}>{otpError}</p>}

// // //               <button 
// // //                 className="ticket-close-btn" 
// // //                 style={{ marginTop: '20px', background: '#6366f1', color: 'white' }}
// // //                 onClick={async () => {
// // //                   if (otpInput === generatedOtp && generatedOtp !== '') {
                    
// // //                     const newPending = [...pendingAttendance, userId];
// // //                     const newRejected = rejectedBy.filter((n) => n !== userId);
                    
// // //                     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// // //                     setEvent(prev => ({ ...prev, pendingAttendance: newPending, rejectedBy: newRejected }));
                    
// // //                     setShowOtpModal(false);
                    
// // //                     setAlertHeading("Attendance Recorded");
// // //                     setAlertText("Your attendance has been successfully marked. The organizer will verify it shortly.");
// // //                     setIsAlertVisible(true);
                    
// // //                   } else {
// // //                     setOtpError("Invalid code. Please check the notification.");
// // //                   }
// // //                 }}
// // //               >
// // //                 Verify & Send Request
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {isAlertVisible && (
// // //         <div className="ticket-overlay" onClick={() => setIsAlertVisible(false)}>
// // //           <div className="ticket-card" style={{ maxWidth: '340px', padding: '32px 24px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
// // //             <div style={{ width: '70px', height: '70px', background: '#ecfdf5', color: '#10b981', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px', margin: '0 auto 20px' }}>
// // //               <i className="fa-solid fa-check"></i>
// // //             </div>
// // //             <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#1e293b' }}>{alertHeading}</h3>
// // //             <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>{alertText}</p>
// // //             <button className="ticket-close-btn" style={{ background: '#10b981', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', width: '100%' }} onClick={() => setIsAlertVisible(false)}>
// // //               Understood
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}

// // //     </div>
// // //   );
// // // }

// // // export default EventDetailPage;

// // import React, { useState, useEffect } from "react";
// // import "./EventDetailPage.css";
// // import { useTheme } from './ThemeContext';
// // import QRCode from 'react-qr-code';

// // const fixEventStatus = (event) => {
// //   if (!event) return 'upcoming';
// //   if (event.status === 'cancelled' || event.status === 'completed') return event.status;
// //   const now = new Date();
// //   const [startStr, endStr] = (event.time || '').split(' - ');
// //   if (!event.date || !startStr || !endStr) return event.status;
  
// //   const start = new Date(`${event.date}T${startStr.trim()}:00`);
// //   const end = new Date(`${event.date}T${endStr.trim()}:00`);
  
// //   if (now >= start && now < end) return 'ongoing';
// //   if (now >= end) return 'completed';
// //   return 'upcoming';
// // };

// // const formatDate = (dateString) => {
// //   if (!dateString) return '';
// //   const d = new Date(dateString);
// //   if (isNaN(d.getTime())) return dateString; 
// //   const year = d.getFullYear();
// //   const month = String(d.getMonth() + 1).padStart(2, '0');
// //   const day = String(d.getDate()).padStart(2, '0');
// //   return `${year}-${month}-${day}`;
// // };

// // function EventDetailPage({ eventId, onBack, role, currentMemberId, dispatch }) {
// //   const { darkMode } = useTheme();
// //   const [event, setEvent] = useState(null);
// //   const [loading, setLoading] = useState(true);
  
// //   const [showTicket, setShowTicket] = useState(false);
// //   const [showNotifDropdown, setShowNotifDropdown] = useState(false);
// //   const [showOtpModal, setShowOtpModal] = useState(false);
  
// //   const [otpInput, setOtpInput] = useState('');
// //   const [generatedOtp, setGeneratedOtp] = useState('');
// //   const [otpError, setOtpError] = useState('');

// //   const [isAlertVisible, setIsAlertVisible] = useState(false);
// //   const [alertText, setAlertText] = useState('');
// //   const [alertHeading, setAlertHeading] = useState('');

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

// //   const fetchEvent = async () => {
// //     try {
// //       const res = await fetch('http://localhost:5000/api/events');
// //       if (!res.ok) throw new Error("Backend error");
      
// //       const allEvents = await res.json();
// //       if (Array.isArray(allEvents)) {
// //         const found = allEvents.find(e => String(e.id) === String(eventId));
// //         if (found) {
// //           setEvent(found);
// //           console.log("🔍 DEBUG - Current userId:", userId);
// //           console.log("🔍 DEBUG - Event participantNames:", found.participant_names || found.participantNames);
// //           console.log("🔍 DEBUG - Event pendingAttendance:", found.pending_attendance || found.pendingAttendance);
// //         }
// //       }
// //     } catch (err) {
// //       console.error("🔥 FETCH EVENT ERROR:", err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchEvent();
// //   }, [eventId]);

// //   if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading event details...</div>;

// //   if (!event) {
// //     return (
// //       <div className="edp-wrap">
// //         <button className="edp-back" onClick={onBack}>
// //           <i className="fa-solid fa-arrow-left"></i> Back to Events
// //         </button>
// //         <div className="edp-notfound">
// //           <h1>Event Not Found</h1>
// //           <p>The event you are looking for does not exist or backend is down.</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const actualStatus = fixEventStatus(event);
// //   const capacity = event.capacity || 50;
// //   const participants = event.participants || 0;
// //   const percentage = Math.round((participants / capacity) * 100);
// //   const seatsLeft = capacity - participants;
  
// //   const attendedBy = event.attended_by || event.attendedBy || [];
// //   const pendingAttendance = event.pending_attendance || event.pendingAttendance || [];
// //   const rejectedBy = event.rejected_by || event.rejectedBy || [];
// //   const participantNames = event.participant_names || event.participantNames || [];

// //   const isRegistered = userId ? participantNames.map(String).includes(String(userId)) : false;
// //   const isUserAttended = userId ? attendedBy.map(String).includes(String(userId)) : false;
// //   const isUserPending = userId ? pendingAttendance.map(String).includes(String(userId)) : false; 
// //   const isUserRejected = userId ? rejectedBy.map(String).includes(String(userId)) : false;

// //   const getStatusClass = (status) => status.toLowerCase().replace(/ /g, "-");

// //   const formatName = (name) => {
// //     if (name.startsWith("user_")) return `User ${name.slice(5)}`;
// //     if (name.startsWith("core-member_")) return `Core Member ${name.slice(12)}`;
// //     if (name.startsWith("admin")) return "Admin";
// //     if (name.startsWith("leader")) return "Leader";
// //     if (name.startsWith("user")) return `User ${name.replace("user", "")}`;
// //     if (name.startsWith("member")) return `Member ${name.replace("member", "")}`;
// //     return name;
// //   };

// //   const ticketUrl = `${window.location.origin}/events/${event.id}`;

// //   const updateDB = async (updatedFields) => {
// //     const finalPending = updatedFields.pendingAttendance ?? pendingAttendance;
// //     const finalAttended = updatedFields.attendedBy ?? attendedBy;
// //     const finalRejected = updatedFields.rejectedBy ?? rejectedBy;
// //     const finalParticipants = updatedFields.participants ?? participants;
// //     const finalParticipantNames = updatedFields.participantNames ?? participantNames;

// //     const bodyData = {
// //       participant_names: finalParticipantNames,
// //       participantNames: finalParticipantNames,
// //       attended_by: finalAttended,
// //       attendedBy: finalAttended,
// //       pending_attendance: finalPending,
// //       pendingAttendance: finalPending,
// //       participants: finalParticipants,
// //       status: updatedFields.status ?? event.status,
// //       rejected_by: finalRejected,
// //       rejectedBy: finalRejected,
// //     };

// //     try {
// //       const res = await fetch(`http://localhost:5000/api/events/${event.id}`, {
// //         method: 'PATCH',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(bodyData)
// //       });
// //       if (res.ok) {
// //         fetchEvent();
// //       } else {
// //         console.error("Backend update failed with status:", res.status);
// //       }
// //     } catch (err) {
// //       console.error("Network error during PATCH:", err);
// //     }
// //   };

// //   const handleRequestAttendance = async () => {
// //     if (!userId) return;
// //     if (actualStatus !== "ongoing") return;
// //     if (!isRegistered) return;
// //     if (isUserAttended || isUserPending) return;

// //     const newPending = [...pendingAttendance, userId];
// //     const newRejected = rejectedBy.filter((n) => n !== userId);

// //     setEvent(prev => ({ 
// //       ...prev, 
// //       pendingAttendance: newPending, 
// //       pending_attendance: newPending, 
// //       rejectedBy: newRejected, 
// //       rejected_by: newRejected 
// //     }));

// //     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// //   };

// //   const handleApprove = async (name) => {
// //     const newPending = pendingAttendance.filter((n) => n !== name);
// //     const newAttended = [...attendedBy, name];
    
// //     setEvent(prev => ({ 
// //       ...prev, 
// //       pendingAttendance: newPending, 
// //       pending_attendance: newPending, 
// //       attendedBy: newAttended, 
// //       attended_by: newAttended 
// //     }));

// //     await updateDB({ pendingAttendance: newPending, attendedBy: newAttended });
// //   };

// //   const handleReject = async (name) => {
// //     const newPending = pendingAttendance.filter((n) => n !== name);
// //     const newRejected = [...rejectedBy, name];

// //     setEvent(prev => ({ 
// //       ...prev, 
// //       pendingAttendance: newPending, 
// //       pending_attendance: newPending, 
// //       rejectedBy: newRejected, 
// //       rejected_by: newRejected 
// //     }));

// //     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
// //   };

// //   const handleToggleAttendance = async (name) => {
// //     const present = attendedBy.map(String).includes(String(name));
// //     const updatedAttended = present ? attendedBy.filter((n) => n !== name) : [...attendedBy, name];

// //     setEvent(prev => ({ 
// //       ...prev, 
// //       attendedBy: updatedAttended, 
// //       attended_by: updatedAttended 
// //     }));

// //     await updateDB({ attendedBy: updatedAttended });
// //   };

// //   const handleRegister = async () => {
// //     if (actualStatus !== "upcoming") return;
// //     if (participants >= capacity) return;
// //     if (isRegistered) return;

// //     const updatedParticipantNames = [...participantNames, userId];
// //     const updatedParticipants = Number(participants) + 1;

// //     setEvent(prev => ({ 
// //       ...prev, 
// //       participantNames: updatedParticipantNames, 
// //       participant_names: updatedParticipantNames, 
// //       participants: updatedParticipants 
// //     }));

// //     await updateDB({ participantNames: updatedParticipantNames, participants: updatedParticipants });
// //   };

// //   return (
// //     <div className="edp-wrap">
// //       <div className="edp-hero">
// //         <div className="edp-hero-bg"></div>
// //         <button className="edp-back" onClick={onBack}>
// //           <i className="fa-solid fa-arrow-left"></i> Back
// //         </button>
// //         <div className="edp-hero-inner">
// //           <div className="edp-hero-info">
// //             <div className="edp-badges">
// //               <span className="edp-badge-category">{event.category}</span>
// //               <span className={`edp-badge-status ${getStatusClass(actualStatus)}`}>
// //                 <span className="dot"></span>
// //                 {actualStatus}
// //               </span>
// //             </div>
// //             <h1>{event.title}</h1>
// //             <p>{event.description}</p>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="edp-stats">
// //         <div className="edp-stat">
// //           <div className="edp-stat-icon"><i className="fa-regular fa-calendar"></i></div>
// //           <div><span>Date</span><strong>{formatDate(event.date)}</strong></div>
// //         </div>
// //         <div className="edp-stat">
// //           <div className="edp-stat-icon"><i className="fa-regular fa-clock"></i></div>
// //           <div><span>Time</span><strong>{event.time}</strong></div>
// //         </div>
// //         <div className="edp-stat">
// //           <div className="edp-stat-icon"><i className="fa-solid fa-location-dot"></i></div>
// //           <div><span>Venue</span><strong>{event.venue}</strong></div>
// //         </div>
// //         <div className="edp-stat">
// //           <div className="edp-stat-icon"><i className="fa-solid fa-users"></i></div>
// //           <div><span>Participants</span><strong>{participants} / {capacity}</strong></div>
// //         </div>
// //       </div>

// //       <div className="edp-grid">
// //         <div className="edp-main">
// //           <div className="edp-card">
// //             <div className="edp-card-head">
// //               <div className="edp-accent"></div>
// //               <h2>About This Event</h2>
// //             </div>
// //             <p className="edp-body-text">{event.description}</p>
// //           </div>

// //           <div className="edp-card">
// //             <div className="edp-card-head">
// //               <div className="edp-accent"></div>
// //               <h2>Registration Progress</h2>
// //             </div>
// //             <div className="edp-capacity-top">
// //               <div>
// //                 <span className="edp-cap-label">Filled</span>
// //                 <strong className="edp-cap-percent">{percentage}%</strong>
// //               </div>
// //               <div className="edp-cap-right">
// //                 <span className="edp-cap-label">Seats Left</span>
// //                 <strong className="edp-cap-seats">{seatsLeft}</strong>
// //               </div>
// //             </div>
// //             <div className="edp-bar">
// //               <div className="edp-bar-fill" style={{ width: `${percentage}%` }}></div>
// //             </div>
// //             <div className="edp-capacity-bottom">
// //               <span>{participants} registered</span>
// //               <span>{capacity} total capacity</span>
// //             </div>
// //           </div>

// //           {actualStatus === "ongoing" && (
// //             <div className="edp-card">
// //               <div className="edp-card-head">
// //                 <div className="edp-accent"></div>
// //                 <h2>Attendance</h2>
// //                 <span className="edp-attend-count">
// //                   {attendedBy.length} / {participantNames.length} verified
// //                 </span>
// //               </div>

// //               {role === "user" && isRegistered && (
// //                 <div className="edp-user-attendance">
// //                   {isUserAttended ? (
// //                     <div className="edp-attendance-marked">
// //                       <i className="fa-solid fa-circle-check"></i>
// //                       <span>Your attendance is verified by Admin</span>
// //                     </div>
// //                   ) : isUserPending ? (
// //                     <div className="edp-attendance-pending" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
// //                       <i className="fa-solid fa-clock" style={{ fontSize: '20px' }}></i>
// //                       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
// //                         <strong style={{ fontSize: '14px' }}>Attendance Recorded</strong>
// //                         <span style={{ fontSize: '13px', opacity: 0.8 }}>Pending verification from the organizer.</span>
// //                       </div>
// //                     </div>
// //                   ) : isUserRejected ? (
// //                     <div className="edp-attendance-rejected">
// //                       <i className="fa-solid fa-circle-xmark"></i>
// //                       <div>
// //                         <span>Your request was rejected</span>
// //                         <small>You can request again</small>
// //                       </div>
// //                       <button className="edp-btn edp-btn-primary" onClick={handleRequestAttendance}>
// //                         <i className="fa-solid fa-rotate-right"></i> Request Again
// //                       </button>
// //                     </div>
// //                   ) : (
// //                     <button 
// //                       className="edp-btn edp-btn-primary" 
// //                       onClick={() => {
// //                         const code = Math.floor(1000 + Math.random() * 9000).toString();
// //                         setGeneratedOtp(code);
// //                         setShowNotifDropdown(true);
// //                       }}
// //                     >
// //                       <i className="fa-solid fa-hand"></i> Mark Attendance
// //                     </button>
// //                   )}
// //                 </div>
// //               )}

// //               {(role === "admin" || role === "leader") && (
// //                 <>
// //                   <div className="edp-verified-section">
// //                     <div className="edp-verified-head">
// //                       <h3><i className="fa-solid fa-users"></i> All Participants</h3>
// //                       <span className="edp-verified-count">{participantNames.length}</span>
// //                     </div>
// //                     <div className="edp-attendance-list">
// //                       {participantNames.length > 0 ? (
// //                         participantNames.map((name) => {
// //                           const present = attendedBy.map(String).includes(String(name));
// //                           return (
// //                             <div key={name} className={`edp-attend-row ${present ? "present" : ""}`}>
// //                               <div className="edp-attend-user">
// //                                 <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
// //                                 <span>{formatName(name)}</span>
// //                               </div>
// //                               <button className={`edp-attend-toggle ${present ? "present" : ""}`} onClick={() => handleToggleAttendance(name)}>
// //                                 {present ? (<><i className="fa-solid fa-check"></i> Present</>) : (<><i className="fa-regular fa-circle"></i> Absent</>)}
// //                               </button>
// //                             </div>
// //                           );
// //                         })
// //                       ) : (
// //                         <p className="edp-attend-empty">No participants yet.</p>
// //                       )}
// //                     </div>
// //                   </div>

// //                   {pendingAttendance.length > 0 && (
// //                     <div className="edp-pending-section">
// //                       <div className="edp-pending-head">
// //                         <h3><i className="fa-solid fa-bell"></i> Pending Approval Requests</h3>
// //                         <span className="edp-pending-badge">{pendingAttendance.length}</span>
// //                       </div>
// //                       <div className="edp-attendance-list">
// //                         {pendingAttendance.map((name) => (
// //                           <div key={name} className="edp-attend-row pending">
// //                             <div className="edp-attend-user">
// //                               <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
// //                               <span>{formatName(name)}</span>
// //                             </div>
// //                             <div className="edp-approval-actions">
// //                               <button className="edp-approve-btn" onClick={() => handleApprove(name)}>
// //                                 <i className="fa-solid fa-check"></i> Approve
// //                               </button>
// //                               <button className="edp-reject-btn" onClick={() => handleReject(name)}>
// //                                 <i className="fa-solid fa-xmark"></i> Reject
// //                               </button>
// //                             </div>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   )}
// //                 </>
// //               )}

// //               {role === "core-member" && (
// //                 <p className="edp-attend-empty">Attendance is managed by admin/leader.</p>
// //               )}
// //             </div>
// //           )}
// //         </div>

// //         <div className="edp-side">
// //           <div className="notif-bell-container">
// //             <button 
// //               className={`notif-bell-btn ${generatedOtp ? 'has-notif' : ''}`}
// //               onClick={() => setShowNotifDropdown(!showNotifDropdown)}
// //             >
// //               <i className="fa-solid fa-bell"></i>
// //               {generatedOtp && <span className="notif-dot"></span>}
// //             </button>

// //             {showNotifDropdown && (
// //               <div className="notif-dropdown">
// //                 <div className="notif-header">
// //                   <h4>Notifications</h4>
// //                   <button onClick={() => setShowNotifDropdown(false)}><i className="fa-solid fa-xmark"></i></button>
// //                 </div>
                
// //                 <div className="notif-body">
// //                   {generatedOtp ? (
// //                     <div className="notif-item">
// //                       <div className="notif-icon">
// //                         <i className="fa-solid fa-shield-halved"></i>
// //                       </div>
// //                       <div className="notif-text">
// //                         <p>Attendance Verification Code is ready.</p>
                        
// //                         <div className="otp-display-box">
// //                           <strong>{generatedOtp}</strong>
// //                         </div>
                        
// //                         <button 
// //                           className="notif-action-btn"
// //                           onClick={() => {
// //                             setShowNotifDropdown(false);
// //                             setShowOtpModal(true);
// //                           }}
// //                         >
// //                           Enter Code Now <i className="fa-solid fa-arrow-right"></i>
// //                         </button>
// //                       </div>
// //                     </div>
// //                   ) : (
// //                     <p className="no-notif">No new notifications</p>
// //                   )}
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           {role === "user" && (
// //             <div className="edp-side-card">
// //               <h3>Quick Actions</h3>
              
// //               {isRegistered ? (
// //                 <button className="edp-btn edp-btn-primary" onClick={() => setShowTicket(true)} style={{ background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none' }}>
// //                   <i className="fa-solid fa-ticket"></i> View Ticket
// //                 </button>
// //               ) : actualStatus === "upcoming" && participants < capacity ? (
// //                 <button className="edp-btn edp-btn-primary" onClick={handleRegister}>
// //                   <i className="fa-solid fa-user-plus"></i> Participate Now
// //                 </button>
// //               ) : actualStatus === "ongoing" ? (
// //                 <button className="edp-btn edp-btn-primary" disabled>
// //                   <i className="fa-solid fa-spinner"></i> Event In Progress
// //                 </button>
// //               ) : actualStatus === "completed" ? (
// //                 <button className="edp-btn edp-btn-primary" disabled>
// //                   <i className="fa-solid fa-circle-check"></i> Event Completed
// //                 </button>
// //               ) : actualStatus === "cancelled" ? (
// //                 <button className="edp-btn edp-btn-primary" disabled>
// //                   <i className="fa-solid fa-circle-xmark"></i> Event Cancelled
// //                 </button>
// //               ) : (
// //                 <button className="edp-btn edp-btn-primary" disabled>
// //                   <i className="fa-solid fa-ban"></i> Event Full
// //                 </button>
// //               )}
// //               <button className="edp-btn edp-btn-ghost" onClick={onBack}>
// //                 <i className="fa-solid fa-arrow-left"></i> Back to Events
// //               </button>
// //             </div>
// //           )}

// //           <div className="edp-side-card">
// //             <h3>Event Details</h3>
// //             <div className="edp-detail-row"><span>Category</span><strong>{event.category}</strong></div>
// //             <div className="edp-detail-row"><span>Status</span><strong className={`edp-status-text ${getStatusClass(actualStatus)}`}>{actualStatus}</strong></div>
// //             <div className="edp-detail-row"><span>Event ID</span><strong>EV-{String(event.id).padStart(3, "0")}</strong></div>
// //           </div>
// //         </div>
// //       </div>

// //       {showTicket && (
// //         <div className="ticket-overlay" onClick={() => setShowTicket(false)}>
// //           <div className="ticket-card" onClick={(e) => e.stopPropagation()}>
// //             <div className="ticket-header">
// //               <div className="ticket-logo">
// //                 <i className="fa-solid fa-plane"></i> ClubPilot
// //               </div>
// //               <h2>{event.title}</h2>
// //               <span className="ticket-status">{actualStatus.toUpperCase()}</span>
// //             </div>
            
// //             <div className="ticket-divider">
// //               <div className="cutout left"></div>
// //               <div className="dashed-line"></div>
// //               <div className="cutout right"></div>
// //             </div>
            
// //             <div className="ticket-body">
// //               <div className="ticket-info">
// //                 <div className="info-group">
// //                   <span className="info-label">Attendee Name</span>
// //                   <span className="info-value">{userId ? formatName(userId) : 'Guest'}</span>
// //                 </div>
// //                 <div className="info-group">
// //                   <span className="info-label">Date</span>
// //                   <span className="info-value">{formatDate(event.date)}</span>
// //                 </div>
// //                 <div className="info-group">
// //                   <span className="info-label">Time</span>
// //                   <span className="info-value">{event.time}</span>
// //                 </div>
// //                 <div className="info-group">
// //                   <span className="info-label">Venue</span>
// //                   <span className="info-value">{event.venue}</span>
// //                 </div>
// //               </div>

// //               <div className="ticket-qr-section">
// //                 <div className="ticket-id-container">
// //                   <span className="ticket-label">PASS ID</span>
// //                   <span className="ticket-number">#EV-{String(event.id).padStart(3, '0')}-{userId ? userId.split('_')[1] : '00'}</span>
// //                 </div>
                
// //                 <div className="qr-frame">
// //                   <QRCode 
// //                     value={ticketUrl} 
// //                     size={130} 
// //                     bgColor="#ffffff"
// //                     fgColor="#1e293b"
// //                   />
// //                 </div>
                
// //                 <p className="scan-instruction">
// //                   <i className="fa-solid fa-camera"></i> Scan to view event details
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="ticket-footer">
// //               <button className="ticket-close-btn" onClick={() => setShowTicket(false)}>
// //                 Close Ticket
// //               </button>
// //             </div>

// //           </div>
// //         </div>
// //       )}

// //       {showOtpModal && (
// //         <div className="ticket-overlay" onClick={() => setShowOtpModal(false)}>
// //           <div className="ticket-card" style={{ maxWidth: '350px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            
// //             <div className="ticket-header" style={{ background: '#1e293b' }}>
// //               <h2 style={{ fontSize: '20px' }}>Verify Attendance</h2>
// //               <p style={{ fontSize: '12px', marginTop: '5px', color: '#94a3b8' }}>Enter the code from notification</p>
// //             </div>
            
// //             <div className="ticket-body" style={{ padding: '30px 24px' }}>
// //               <input 
// //                 type="text" 
// //                 maxLength={4}
// //                 placeholder="----"
// //                 value={otpInput}
// //                 onChange={(e) => {
// //                   setOtpInput(e.target.value.replace(/\D/g, ''));
// //                   setOtpError('');
// //                 }}
// //                 style={{ 
// //                   width: '100%', fontSize: '32px', textAlign: 'center', letterSpacing: '10px', 
// //                   padding: '10px', borderRadius: '12px', border: '2px solid #e2e8f0', outline: 'none',
// //                   fontWeight: 'bold', color: '#1e293b'
// //                 }}
// //               />
              
// //               {otpError && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '10px', fontWeight: 'bold' }}>{otpError}</p>}

// //               <button 
// //                 className="ticket-close-btn" 
// //                 style={{ marginTop: '20px', background: '#6366f1', color: 'white' }}
// //                 onClick={async () => {
// //                   if (otpInput === generatedOtp && generatedOtp !== '') {
                    
// //                     const newPending = [...pendingAttendance, userId];
// //                     const newRejected = rejectedBy.filter((n) => n !== userId);
                    
// //                     setEvent(prev => ({ 
// //                       ...prev, 
// //                       pendingAttendance: newPending, 
// //                       pending_attendance: newPending, 
// //                       rejectedBy: newRejected, 
// //                       rejected_by: newRejected 
// //                     }));

// //                     await updateDB({ pendingAttendance: newPending, rejectedBy: newRejected });
                    
// //                     setShowOtpModal(false);
                    
// //                     setAlertHeading("Attendance Recorded");
// //                     setAlertText("Your attendance has been successfully marked. The organizer will verify it shortly.");
// //                     setIsAlertVisible(true);
                    
// //                   } else {
// //                     setOtpError("Invalid code. Please check the notification.");
// //                   }
// //                 }}
// //               >
// //                 Verify & Send Request
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {isAlertVisible && (
// //         <div className="ticket-overlay" onClick={() => setIsAlertVisible(false)}>
// //           <div className="ticket-card" style={{ maxWidth: '340px', padding: '32px 24px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
// //             <div style={{ width: '70px', height: '70px', background: '#ecfdf5', color: '#10b981', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px', margin: '0 auto 20px' }}>
// //               <i className="fa-solid fa-check"></i>
// //             </div>
// //             <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#1e293b' }}>{alertHeading}</h3>
// //             <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>{alertText}</p>
// //             <button className="ticket-close-btn" style={{ background: '#10b981', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', width: '100%' }} onClick={() => setIsAlertVisible(false)}>
// //               Understood
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //     </div>
// //   );
// // }

// // export default EventDetailPage;

// import React, { useState, useEffect } from "react";
// import "./EventDetailPage.css";
// import { useTheme } from './ThemeContext';
// import QRCode from 'react-qr-code';

// const fixEventStatus = (event) => {
//   if (!event) return 'upcoming';
//   if (event.status === 'cancelled' || event.status === 'completed') return event.status;
//   const now = new Date();
//   const [startStr, endStr] = (event.time || '').split(' - ');
//   if (!event.date || !startStr || !endStr) return event.status;
  
//   const start = new Date(`${event.date}T${startStr.trim()}:00`);
//   const end = new Date(`${event.date}T${endStr.trim()}:00`);
  
//   if (now >= start && now < end) return 'ongoing';
//   if (now >= end) return 'completed';
//   return 'upcoming';
// };

// const formatDate = (dateString) => {
//   if (!dateString) return '';
//   const d = new Date(dateString);
//   if (isNaN(d.getTime())) return dateString; 
//   const year = d.getFullYear();
//   const month = String(d.getMonth() + 1).padStart(2, '0');
//   const day = String(d.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// };

// function EventDetailPage({ eventId, event: propEvent, onBack, role, currentMemberId, dispatch, onRefresh }) {
//   const { darkMode } = useTheme();
  
//   const [event, setEvent] = useState(propEvent || null);
//   const [loading, setLoading] = useState(!propEvent);
  
//   const [showTicket, setShowTicket] = useState(false);
//   const [showNotifDropdown, setShowNotifDropdown] = useState(false);
//   const [showOtpModal, setShowOtpModal] = useState(false);
  
//   const [otpInput, setOtpInput] = useState('');
//   const [generatedOtp, setGeneratedOtp] = useState('');
//   const [otpError, setOtpError] = useState('');

//   const [isAlertVisible, setIsAlertVisible] = useState(false);
//   const [alertText, setAlertText] = useState('');
//   const [alertHeading, setAlertHeading] = useState('');

//   useEffect(() => {
//     if (propEvent) {
//       setEvent(propEvent);
//       setLoading(false);
//     }
//   }, [propEvent]);

//   if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading event details...</div>;

//   if (!event) {
//     return (
//       <div className="edp-wrap">
//         <button className="edp-back" onClick={onBack}>
//           <i className="fa-solid fa-arrow-left"></i> Back to Events
//         </button>
//         <div className="edp-notfound">
//           <h1>Event Not Found</h1>
//           <p>The event you are looking for does not exist or backend is down.</p>
//         </div>
//       </div>
//     );
//   }

//   const actualStatus = fixEventStatus(event);
//   const capacity = event.capacity || 50;
//   const participants = event.participants || 0;
//   const percentage = Math.round((participants / capacity) * 100);
//   const seatsLeft = capacity - participants;
  
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

//   const attendedBy = event.attendedBy || [];
//   const pendingAttendance = event.pendingAttendance || [];
//   const rejectedBy = event.rejectedBy || [];
//   const participantNames = event.participantNames || [];

//   // 🔥 FIX YAHAN HAI: Agar user pending ya attended mein hai, toh bhi usko registered maano
//   const isRegistered = userId ? (
//     participantNames.map(String).includes(String(userId)) || 
//     attendedBy.map(String).includes(String(userId)) || 
//     pendingAttendance.map(String).includes(String(userId))
//   ) : false;

//   const isUserAttended = userId ? attendedBy.map(String).includes(String(userId)) : false;
//   const isUserPending = userId ? pendingAttendance.map(String).includes(String(userId)) : false; 
//   const isUserRejected = userId ? rejectedBy.map(String).includes(String(userId)) : false;

//   const getStatusClass = (status) => status.toLowerCase().replace(/ /g, "-");

//   const formatName = (name) => {
//     if (name.startsWith("user_")) return `User ${name.slice(5)}`;
//     if (name.startsWith("core-member_")) return `Core Member ${name.slice(12)}`;
//     if (name.startsWith("admin")) return "Admin";
//     if (name.startsWith("leader")) return "Leader";
//     if (name.startsWith("user")) return `User ${name.replace("user", "")}`;
//     if (name.startsWith("member")) return `Member ${name.replace("member", "")}`;
//     return name;
//   };

//   const ticketUrl = `${window.location.origin}/events/${event.id}`;

//   const handleRegister = async () => {
//     if (actualStatus !== "upcoming") return;
//     if (participants >= capacity) return;
//     if (isRegistered) return;

//     try {
//       await fetch(`http://localhost:5000/api/events/${event.id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ add_participant: userId }) 
//       });
//       if (onRefresh) onRefresh();
//       setEvent(prev => ({ ...prev, participantNames: [...(prev.participantNames || []), userId], participants: (prev.participants || 0) + 1 }));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="edp-wrap">
//       <div className="edp-hero">
//         <div className="edp-hero-bg"></div>
//         <button className="edp-back" onClick={onBack}>
//           <i className="fa-solid fa-arrow-left"></i> Back
//         </button>
//         <div className="edp-hero-inner">
//           <div className="edp-hero-info">
//             <div className="edp-badges">
//               <span className="edp-badge-category">{event.category}</span>
//               <span className={`edp-badge-status ${getStatusClass(actualStatus)}`}>
//                 <span className="dot"></span>
//                 {actualStatus}
//               </span>
//             </div>
//             <h1>{event.title}</h1>
//             <p>{event.description}</p>
//           </div>
//         </div>
//       </div>

//       <div className="edp-stats">
//         <div className="edp-stat">
//           <div className="edp-stat-icon"><i className="fa-regular fa-calendar"></i></div>
//           <div><span>Date</span><strong>{formatDate(event.date)}</strong></div>
//         </div>
//         <div className="edp-stat">
//           <div className="edp-stat-icon"><i className="fa-regular fa-clock"></i></div>
//           <div><span>Time</span><strong>{event.time}</strong></div>
//         </div>
//         <div className="edp-stat">
//           <div className="edp-stat-icon"><i className="fa-solid fa-location-dot"></i></div>
//           <div><span>Venue</span><strong>{event.venue}</strong></div>
//         </div>
//         <div className="edp-stat">
//           <div className="edp-stat-icon"><i className="fa-solid fa-users"></i></div>
//           <div><span>Participants</span><strong>{participants} / {capacity}</strong></div>
//         </div>
//       </div>

//       <div className="edp-grid">
//         <div className="edp-main">
//           <div className="edp-card">
//             <div className="edp-card-head">
//               <div className="edp-accent"></div>
//               <h2>About This Event</h2>
//             </div>
//             <p className="edp-body-text">{event.description}</p>
//           </div>

//           <div className="edp-card">
//             <div className="edp-card-head">
//               <div className="edp-accent"></div>
//               <h2>Registration Progress</h2>
//             </div>
//             <div className="edp-capacity-top">
//               <div>
//                 <span className="edp-cap-label">Filled</span>
//                 <strong className="edp-cap-percent">{percentage}%</strong>
//               </div>
//               <div className="edp-cap-right">
//                 <span className="edp-cap-label">Seats Left</span>
//                 <strong className="edp-cap-seats">{seatsLeft}</strong>
//               </div>
//             </div>
//             <div className="edp-bar">
//               <div className="edp-bar-fill" style={{ width: `${percentage}%` }}></div>
//             </div>
//             <div className="edp-capacity-bottom">
//               <span>{participants} registered</span>
//               <span>{capacity} total capacity</span>
//             </div>
//           </div>

//           {actualStatus === "ongoing" && (
//             <div className="edp-card">
//               <div className="edp-card-head">
//                 <div className="edp-accent"></div>
//                 <h2>Attendance</h2>
//                 <span className="edp-attend-count">
//                   {attendedBy.length} / {participantNames.length} verified
//                 </span>
//               </div>

//               {role === "user" && isRegistered && (
//                 <div className="edp-user-attendance">
//                   {isUserAttended ? (
//                     <div className="edp-attendance-marked">
//                       <i className="fa-solid fa-circle-check"></i>
//                       <span>Your attendance is verified by Admin</span>
//                     </div>
//                   ) : isUserPending ? (
//                     <div className="edp-attendance-pending" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
//                       <i className="fa-solid fa-clock" style={{ fontSize: '20px' }}></i>
//                       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
//                         <strong style={{ fontSize: '14px' }}>Attendance Recorded</strong>
//                         <span style={{ fontSize: '13px', opacity: 0.8 }}>Pending verification from the organizer.</span>
//                       </div>
//                     </div>
//                   ) : isUserRejected ? (
//                     <div className="edp-attendance-rejected">
//                       <i className="fa-solid fa-circle-xmark"></i>
//                       <div>
//                         <span>Your request was rejected</span>
//                         <small>You can request again</small>
//                       </div>
//                       <button className="edp-btn edp-btn-primary" onClick={() => {}}>
//                         <i className="fa-solid fa-rotate-right"></i> Request Again
//                       </button>
//                     </div>
//                   ) : (
//                     <button 
//                       className="edp-btn edp-btn-primary" 
//                       onClick={() => {
//                         const code = Math.floor(1000 + Math.random() * 9000).toString();
//                         setGeneratedOtp(code);
//                         setShowNotifDropdown(true);
//                       }}
//                     >
//                       <i className="fa-solid fa-hand"></i> Mark Attendance
//                     </button>
//                   )}
//                 </div>
//               )}

//               {(role === "admin" || role === "leader") && (
//                 <>
//                   <div className="edp-verified-section">
//                     <div className="edp-verified-head">
//                       <h3><i className="fa-solid fa-users"></i> All Participants</h3>
//                       <span className="edp-verified-count">{participantNames.length}</span>
//                     </div>
//                     <div className="edp-attendance-list">
//                       {participantNames.length > 0 ? (
//                         participantNames.map((name) => {
//                           const present = attendedBy.map(String).includes(String(name));
//                           return (
//                             <div key={name} className={`edp-attend-row ${present ? "present" : ""}`}>
//                               <div className="edp-attend-user">
//                                 <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
//                                 <span>{formatName(name)}</span>
//                               </div>
//                               <button className={`edp-attend-toggle ${present ? "present" : ""}`}>
//                                 {present ? (<><i className="fa-solid fa-check"></i> Present</>) : (<><i className="fa-regular fa-circle"></i> Absent</>)}
//                               </button>
//                             </div>
//                           );
//                         })
//                       ) : (
//                         <p className="edp-attend-empty">No participants yet.</p>
//                       )}
//                     </div>
//                   </div>

//                   {pendingAttendance.length > 0 && (
//                     <div className="edp-pending-section">
//                       <div className="edp-pending-head">
//                         <h3><i className="fa-solid fa-bell"></i> Pending Approval Requests</h3>
//                         <span className="edp-pending-badge">{pendingAttendance.length}</span>
//                       </div>
//                       <div className="edp-attendance-list">
//                         {pendingAttendance.map((name) => (
//                           <div key={name} className="edp-attend-row pending">
//                             <div className="edp-attend-user">
//                               <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
//                               <span>{formatName(name)}</span>
//                             </div>
//                             <div className="edp-approval-actions">
//                               <button className="edp-approve-btn">
//                                 <i className="fa-solid fa-check"></i> Approve
//                               </button>
//                               <button className="edp-reject-btn">
//                                 <i className="fa-solid fa-xmark"></i> Reject
//                               </button>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           )}
//         </div>

//         <div className="edp-side">
//           <div className="notif-bell-container">
//             <button 
//               className={`notif-bell-btn ${generatedOtp ? 'has-notif' : ''}`}
//               onClick={() => setShowNotifDropdown(!showNotifDropdown)}
//             >
//               <i className="fa-solid fa-bell"></i>
//               {generatedOtp && <span className="notif-dot"></span>}
//             </button>

//             {showNotifDropdown && (
//               <div className="notif-dropdown">
//                 <div className="notif-header">
//                   <h4>Notifications</h4>
//                   <button onClick={() => setShowNotifDropdown(false)}><i className="fa-solid fa-xmark"></i></button>
//                 </div>
                
//                 <div className="notif-body">
//                   {generatedOtp ? (
//                     <div className="notif-item">
//                       <div className="notif-icon">
//                         <i className="fa-solid fa-shield-halved"></i>
//                       </div>
//                       <div className="notif-text">
//                         <p>Attendance Verification Code is ready.</p>
//                         <div className="otp-display-box">
//                           <strong>{generatedOtp}</strong>
//                         </div>
//                         <button 
//                           className="notif-action-btn"
//                           onClick={() => {
//                             setShowNotifDropdown(false);
//                             setShowOtpModal(true);
//                           }}
//                         >
//                           Enter Code Now <i className="fa-solid fa-arrow-right"></i>
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <p className="no-notif">No new notifications</p>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {role === "user" && (
//             <div className="edp-side-card">
//               <h3>Quick Actions</h3>
              
//               {isRegistered ? (
//                 <button className="edp-btn edp-btn-primary" onClick={() => setShowTicket(true)} style={{ background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none' }}>
//                   <i className="fa-solid fa-ticket"></i> View Ticket
//                 </button>
//               ) : actualStatus === "upcoming" && participants < capacity ? (
//                 <button className="edp-btn edp-btn-primary" onClick={handleRegister}>
//                   <i className="fa-solid fa-user-plus"></i> Participate Now
//                 </button>
//               ) : actualStatus === "ongoing" ? (
//                 <button className="edp-btn edp-btn-primary" disabled>
//                   <i className="fa-solid fa-spinner"></i> Event In Progress
//                 </button>
//               ) : actualStatus === "completed" ? (
//                 <button className="edp-btn edp-btn-primary" disabled>
//                   <i className="fa-solid fa-circle-check"></i> Event Completed
//                 </button>
//               ) : actualStatus === "cancelled" ? (
//                 <button className="edp-btn edp-btn-primary" disabled>
//                   <i className="fa-solid fa-circle-xmark"></i> Event Cancelled
//                 </button>
//               ) : (
//                 <button className="edp-btn edp-btn-primary" disabled>
//                   <i className="fa-solid fa-ban"></i> Event Full
//                 </button>
//               )}
//               <button className="edp-btn edp-btn-ghost" onClick={onBack}>
//                 <i className="fa-solid fa-arrow-left"></i> Back to Events
//               </button>
//             </div>
//           )}

//           <div className="edp-side-card">
//             <h3>Event Details</h3>
//             <div className="edp-detail-row"><span>Category</span><strong>{event.category}</strong></div>
//             <div className="edp-detail-row"><span>Status</span><strong className={`edp-status-text ${getStatusClass(actualStatus)}`}>{actualStatus}</strong></div>
//             <div className="edp-detail-row"><span>Event ID</span><strong>EV-{String(event.id).padStart(3, "0")}</strong></div>
//           </div>
//         </div>
//       </div>

//       {showTicket && (
//         <div className="ticket-overlay" onClick={() => setShowTicket(false)}>
//           <div className="ticket-card" onClick={(e) => e.stopPropagation()}>
//             <div className="ticket-header">
//               <div className="ticket-logo">
//                 <i className="fa-solid fa-plane"></i> ClubPilot
//               </div>
//               <h2>{event.title}</h2>
//               <span className="ticket-status">{actualStatus.toUpperCase()}</span>
//             </div>
            
//             <div className="ticket-divider">
//               <div className="cutout left"></div>
//               <div className="dashed-line"></div>
//               <div className="cutout right"></div>
//             </div>
            
//             <div className="ticket-body">
//               <div className="ticket-info">
//                 <div className="info-group">
//                   <span className="info-label">Attendee Name</span>
//                   <span className="info-value">{userId ? formatName(userId) : 'Guest'}</span>
//                 </div>
//                 <div className="info-group">
//                   <span className="info-label">Date</span>
//                   <span className="info-value">{formatDate(event.date)}</span>
//                 </div>
//                 <div className="info-group">
//                   <span className="info-label">Time</span>
//                   <span className="info-value">{event.time}</span>
//                 </div>
//                 <div className="info-group">
//                   <span className="info-label">Venue</span>
//                   <span className="info-value">{event.venue}</span>
//                 </div>
//               </div>

//               <div className="ticket-qr-section">
//                 <div className="ticket-id-container">
//                   <span className="ticket-label">PASS ID</span>
//                   <span className="ticket-number">#EV-{String(event.id).padStart(3, '0')}-{userId ? userId.split('_')[1] : '00'}</span>
//                 </div>
                
//                 <div className="qr-frame">
//                   <QRCode 
//                     value={ticketUrl} 
//                     size={130} 
//                     bgColor="#ffffff"
//                     fgColor="#1e293b"
//                   />
//                 </div>
                
//                 <p className="scan-instruction">
//                   <i className="fa-solid fa-camera"></i> Scan to view event details
//                 </p>
//               </div>
//             </div>

//             <div className="ticket-footer">
//               <button className="ticket-close-btn" onClick={() => setShowTicket(false)}>
//                 Close Ticket
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showOtpModal && (
//         <div className="ticket-overlay" onClick={() => setShowOtpModal(false)}>
//           <div className="ticket-card" style={{ maxWidth: '350px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            
//             <div className="ticket-header" style={{ background: '#1e293b' }}>
//               <h2 style={{ fontSize: '20px' }}>Verify Attendance</h2>
//               <p style={{ fontSize: '12px', marginTop: '5px', color: '#94a3b8' }}>Enter the code from notification</p>
//             </div>
            
//             <div className="ticket-body" style={{ padding: '30px 24px' }}>
//               <input 
//                 type="text" 
//                 maxLength={4}
//                 placeholder="----"
//                 value={otpInput}
//                 onChange={(e) => {
//                   setOtpInput(e.target.value.replace(/\D/g, ''));
//                   setOtpError('');
//                 }}
//                 style={{ 
//                   width: '100%', fontSize: '32px', textAlign: 'center', letterSpacing: '10px', 
//                   padding: '10px', borderRadius: '12px', border: '2px solid #e2e8f0', outline: 'none',
//                   fontWeight: 'bold', color: '#1e293b'
//                 }}
//               />
              
//               {otpError && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '10px', fontWeight: 'bold' }}>{otpError}</p>}

//               <button 
//                 className="ticket-close-btn" 
//                 style={{ marginTop: '20px', background: '#6366f1', color: 'white' }}
//                 onClick={async () => {
//                   if (otpInput === generatedOtp && generatedOtp !== '') {
//                     try {
//                       await fetch(`http://localhost:5000/api/events/${event.id}`, {
//                         method: 'PATCH',
//                         headers: { 'Content-Type': 'application/json' },
//                         body: JSON.stringify({ mark_attendance: userId }) 
//                       });
//                       setShowOtpModal(false);
//                       if (onRefresh) onRefresh();
//                       // Optional: Show a success alert here if you want
//                     } catch (err) {
//                       setOtpError("Failed to verify. Try again.");
//                     }
//                   } else {
//                     setOtpError("Invalid code. Please check the notification.");
//                   }
//                 }}
//               >
//                 Verify & Send Request
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

// export default EventDetailPage;

import React, { useState, useEffect, useCallback } from "react";
import "./EventDetailPage.css";
import { useTheme } from './ThemeContext';
import QRCode from 'react-qr-code';

const fixEventStatus = (event) => {
  if (!event) return 'upcoming';
  if (event.status === 'cancelled' || event.status === 'completed') return event.status;
  const now = new Date();
  const [startStr, endStr] = (event.time || '').split(' - ');
  if (!event.date || !startStr || !endStr) return event.status;
  
  const start = new Date(`${event.date}T${startStr.trim()}:00`);
  const end = new Date(`${event.date}T${endStr.trim()}:00`);
  
  if (now >= start && now < end) return 'ongoing';
  if (now >= end) return 'completed';
  return 'upcoming';
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString; 
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function EventDetailPage({ eventId, onBack, role, currentMemberId, dispatch }) {
  const { darkMode } = useTheme();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [showTicket, setShowTicket] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [alertHeading, setAlertHeading] = useState('');

  const fetchEventData = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/events/${eventId}`);
      if (res.ok) {
        const data = await res.json();
        setEvent(data);
      }
    } catch (err) {
      console.error("Error fetching event:", err);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchEventData();
  }, [fetchEventData]);

  if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading event details...</div>;

  if (!event) {
    return (
      <div className="edp-wrap">
        <button className="edp-back" onClick={onBack}>
          <i className="fa-solid fa-arrow-left"></i> Back to Events
        </button>
        <div className="edp-notfound">
          <h1>Event Not Found</h1>
          <p>The event you are looking for does not exist or backend is down.</p>
        </div>
      </div>
    );
  }

  const actualStatus = fixEventStatus(event);
  const capacity = event.capacity || 50;
  const participants = event.participants || 0;
  const percentage = Math.round((participants / capacity) * 100);
  const seatsLeft = capacity - participants;
  
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

  const attendedBy = event.attendedBy || [];
  const pendingAttendance = event.pendingAttendance || [];
  const rejectedBy = event.rejectedBy || [];
  const participantNames = event.participantNames || [];

  const isRegistered = userId ? (
    participantNames.map(String).includes(String(userId)) || 
    attendedBy.map(String).includes(String(userId)) || 
    pendingAttendance.map(String).includes(String(userId))
  ) : false;

  const isUserAttended = userId ? attendedBy.map(String).includes(String(userId)) : false;
  const isUserPending = userId ? pendingAttendance.map(String).includes(String(userId)) : false; 
  const isUserRejected = userId ? rejectedBy.map(String).includes(String(userId)) : false;

  const getStatusClass = (status) => status.toLowerCase().replace(/ /g, "-");

  const formatName = (name) => {
    if (name.startsWith("user_")) return `User ${name.slice(5)}`;
    if (name.startsWith("core-member_")) return `Core Member ${name.slice(12)}`;
    if (name.startsWith("admin")) return "Admin";
    if (name.startsWith("leader")) return "Leader";
    if (name.startsWith("user")) return `User ${name.replace("user", "")}`;
    if (name.startsWith("member")) return `Member ${name.replace("member", "")}`;
    return name;
  };

  const ticketUrl = `${window.location.origin}/events/${event.id}`;

  const handleRegister = async () => {
    if (actualStatus !== "upcoming") return;
    if (participants >= capacity) return;
    if (isRegistered) return;

    try {
      await fetch(`http://localhost:5000/api/events/${event.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ add_participant: userId }) 
      });
      fetchEventData(); 
    } catch (err) {
      console.error(err);
    }
  };

  const handleAttendanceAction = async (name, action) => {
    try {
      const endpoint = action === 'approve' 
        ? `http://localhost:5000/api/events/${event.id}/approve-attendance`
        : `http://localhost:5000/api/events/${event.id}/reject-attendance`;

      await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ member_id: name })
      });

      fetchEventData(); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="edp-wrap">
      <div className="edp-hero">
        <div className="edp-hero-bg"></div>
        <button className="edp-back" onClick={onBack}>
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>
        <div className="edp-hero-inner">
          <div className="edp-hero-info">
            <div className="edp-badges">
              <span className="edp-badge-category">{event.category}</span>
              <span className={`edp-badge-status ${getStatusClass(actualStatus)}`}>
                <span className="dot"></span>
                {actualStatus}
              </span>
            </div>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
          </div>
        </div>
      </div>

      <div className="edp-stats">
        <div className="edp-stat">
          <div className="edp-stat-icon"><i className="fa-regular fa-calendar"></i></div>
          <div><span>Date</span><strong>{formatDate(event.date)}</strong></div>
        </div>
        <div className="edp-stat">
          <div className="edp-stat-icon"><i className="fa-regular fa-clock"></i></div>
          <div><span>Time</span><strong>{event.time}</strong></div>
        </div>
        <div className="edp-stat">
          <div className="edp-stat-icon"><i className="fa-solid fa-location-dot"></i></div>
          <div><span>Venue</span><strong>{event.venue}</strong></div>
        </div>
        <div className="edp-stat">
          <div className="edp-stat-icon"><i className="fa-solid fa-users"></i></div>
          <div><span>Participants</span><strong>{participants} / {capacity}</strong></div>
        </div>
      </div>

      <div className="edp-grid">
        <div className="edp-main">
          <div className="edp-card">
            <div className="edp-card-head">
              <div className="edp-accent"></div>
              <h2>About This Event</h2>
            </div>
            <p className="edp-body-text">{event.description}</p>
          </div>

          <div className="edp-card">
            <div className="edp-card-head">
              <div className="edp-accent"></div>
              <h2>Registration Progress</h2>
            </div>
            <div className="edp-capacity-top">
              <div>
                <span className="edp-cap-label">Filled</span>
                <strong className="edp-cap-percent">{percentage}%</strong>
              </div>
              <div className="edp-cap-right">
                <span className="edp-cap-label">Seats Left</span>
                <strong className="edp-cap-seats">{seatsLeft}</strong>
              </div>
            </div>
            <div className="edp-bar">
              <div className="edp-bar-fill" style={{ width: `${percentage}%` }}></div>
            </div>
            <div className="edp-capacity-bottom">
              <span>{participants} registered</span>
              <span>{capacity} total capacity</span>
            </div>
          </div>

          {actualStatus === "ongoing" && (
            <div className="edp-card">
              <div className="edp-card-head">
                <div className="edp-accent"></div>
                <h2>Attendance</h2>
                <span className="edp-attend-count">
                  {attendedBy.length} / {participantNames.length} verified
                </span>
              </div>

              {role === "user" && isRegistered && (
                <div className="edp-user-attendance">
                  {isUserAttended ? (
                    <div className="edp-attendance-marked">
                      <i className="fa-solid fa-circle-check"></i>
                      <span>Your attendance is verified by Admin</span>
                    </div>
                  ) : isUserPending ? (
                    <div className="edp-attendance-pending" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <i className="fa-solid fa-clock" style={{ fontSize: '20px' }}></i>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <strong style={{ fontSize: '14px' }}>Attendance Recorded</strong>
                        <span style={{ fontSize: '13px', opacity: 0.8 }}>Pending verification from the organizer.</span>
                      </div>
                    </div>
                  ) : isUserRejected ? (
                    <div className="edp-attendance-rejected">
                      <i className="fa-solid fa-circle-xmark"></i>
                      <div>
                        <span>Your request was rejected</span>
                        <small>You can request again</small>
                      </div>
                      <button className="edp-btn edp-btn-primary" onClick={() => {}}>
                        <i className="fa-solid fa-rotate-right"></i> Request Again
                      </button>
                    </div>
                  ) : (
                    <button 
                      className="edp-btn edp-btn-primary" 
                      onClick={() => {
                        const code = Math.floor(1000 + Math.random() * 9000).toString();
                        setGeneratedOtp(code);
                        setShowNotifDropdown(true);
                      }}
                    >
                      <i className="fa-solid fa-hand"></i> Mark Attendance
                    </button>
                  )}
                </div>
              )}

              {(role === "admin" || role === "leader") && (
                <>
                  <div className="edp-verified-section">
                    <div className="edp-verified-head">
                      <h3><i className="fa-solid fa-users"></i> All Participants</h3>
                      <span className="edp-verified-count">{participantNames.length}</span>
                    </div>
                    <div className="edp-attendance-list">
                      {participantNames.length > 0 ? (
                        participantNames.map((name) => {
                          const present = attendedBy.map(String).includes(String(name));
                          return (
                            <div key={name} className={`edp-attend-row ${present ? "present" : ""}`}>
                              <div className="edp-attend-user">
                                <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
                                <span>{formatName(name)}</span>
                              </div>
                              <button className={`edp-attend-toggle ${present ? "present" : ""}`}>
                                {present ? (<><i className="fa-solid fa-check"></i> Present</>) : (<><i className="fa-regular fa-circle"></i> Absent</>)}
                              </button>
                            </div>
                          );
                        })
                      ) : (
                        <p className="edp-attend-empty">No participants yet.</p>
                      )}
                    </div>
                  </div>

                  {pendingAttendance.length > 0 && (
                    <div className="edp-pending-section">
                      <div className="edp-pending-head">
                        <h3><i className="fa-solid fa-bell"></i> Pending Approval Requests</h3>
                        <span className="edp-pending-badge">{pendingAttendance.length}</span>
                      </div>
                      <div className="edp-attendance-list">
                        {pendingAttendance.map((name) => (
                          <div key={name} className="edp-attend-row pending">
                            <div className="edp-attend-user">
                              <div className="edp-attend-avatar">{formatName(name).charAt(0).toUpperCase()}</div>
                              <span>{formatName(name)}</span>
                            </div>
                            <div className="edp-approval-actions">
                              <button className="edp-approve-btn" onClick={() => handleAttendanceAction(name, 'approve')}>
                                <i className="fa-solid fa-check"></i> Approve
                              </button>
                              <button className="edp-reject-btn" onClick={() => handleAttendanceAction(name, 'reject')}>
                                <i className="fa-solid fa-xmark"></i> Reject
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        <div className="edp-side">
          <div className="notif-bell-container">
            <button 
              className={`notif-bell-btn ${generatedOtp ? 'has-notif' : ''}`}
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
            >
              <i className="fa-solid fa-bell"></i>
              {generatedOtp && <span className="notif-dot"></span>}
            </button>

            {showNotifDropdown && (
              <div className="notif-dropdown">
                <div className="notif-header">
                  <h4>Notifications</h4>
                  <button onClick={() => setShowNotifDropdown(false)}><i className="fa-solid fa-xmark"></i></button>
                </div>
                
                <div className="notif-body">
                  {generatedOtp ? (
                    <div className="notif-item">
                      <div className="notif-icon">
                        <i className="fa-solid fa-shield-halved"></i>
                      </div>
                      <div className="notif-text">
                        <p>Attendance Verification Code is ready.</p>
                        <div className="otp-display-box">
                          <strong>{generatedOtp}</strong>
                        </div>
                        <button 
                          className="notif-action-btn"
                          onClick={() => {
                            setShowNotifDropdown(false);
                            setShowOtpModal(true);
                          }}
                        >
                          Enter Code Now <i className="fa-solid fa-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="no-notif">No new notifications</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {role === "user" && (
            <div className="edp-side-card">
              <h3>Quick Actions</h3>
              
              {isRegistered ? (
                <button className="edp-btn edp-btn-primary" onClick={() => setShowTicket(true)} style={{ background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none' }}>
                  <i className="fa-solid fa-ticket"></i> View Ticket
                </button>
              ) : actualStatus === "upcoming" && participants < capacity ? (
                <button className="edp-btn edp-btn-primary" onClick={handleRegister}>
                  <i className="fa-solid fa-user-plus"></i> Participate Now
                </button>
              ) : actualStatus === "ongoing" ? (
                <button className="edp-btn edp-btn-primary" disabled>
                  <i className="fa-solid fa-spinner"></i> Event In Progress
                </button>
              ) : actualStatus === "completed" ? (
                <button className="edp-btn edp-btn-primary" disabled>
                  <i className="fa-solid fa-circle-check"></i> Event Completed
                </button>
              ) : actualStatus === "cancelled" ? (
                <button className="edp-btn edp-btn-primary" disabled>
                  <i className="fa-solid fa-circle-xmark"></i> Event Cancelled
                </button>
              ) : (
                <button className="edp-btn edp-btn-primary" disabled>
                  <i className="fa-solid fa-ban"></i> Event Full
                </button>
              )}
              <button className="edp-btn edp-btn-ghost" onClick={onBack}>
                <i className="fa-solid fa-arrow-left"></i> Back to Events
              </button>
            </div>
          )}

          <div className="edp-side-card">
            <h3>Event Details</h3>
            <div className="edp-detail-row"><span>Category</span><strong>{event.category}</strong></div>
            <div className="edp-detail-row"><span>Status</span><strong className={`edp-status-text ${getStatusClass(actualStatus)}`}>{actualStatus}</strong></div>
            <div className="edp-detail-row"><span>Event ID</span><strong>EV-{String(event.id).padStart(3, "0")}</strong></div>
          </div>
        </div>
      </div>

      {showTicket && (
        <div className="ticket-overlay" onClick={() => setShowTicket(false)}>
          <div className="ticket-card" onClick={(e) => e.stopPropagation()}>
            <div className="ticket-header">
              <div className="ticket-logo">
                <i className="fa-solid fa-plane"></i> ClubPilot
              </div>
              <h2>{event.title}</h2>
              <span className="ticket-status">{actualStatus.toUpperCase()}</span>
            </div>
            
            <div className="ticket-divider">
              <div className="cutout left"></div>
              <div className="dashed-line"></div>
              <div className="cutout right"></div>
            </div>
            
            <div className="ticket-body">
              <div className="ticket-info">
                <div className="info-group">
                  <span className="info-label">Attendee Name</span>
                  <span className="info-value">{userId ? formatName(userId) : 'Guest'}</span>
                </div>
                <div className="info-group">
                  <span className="info-label">Date</span>
                  <span className="info-value">{formatDate(event.date)}</span>
                </div>
                <div className="info-group">
                  <span className="info-label">Time</span>
                  <span className="info-value">{event.time}</span>
                </div>
                <div className="info-group">
                  <span className="info-label">Venue</span>
                  <span className="info-value">{event.venue}</span>
                </div>
              </div>

              <div className="ticket-qr-section">
                <div className="ticket-id-container">
                  <span className="ticket-label">PASS ID</span>
                  <span className="ticket-number">#EV-{String(event.id).padStart(3, '0')}-{userId ? userId.split('_')[1] : '00'}</span>
                </div>
                
                <div className="qr-frame">
                  <QRCode 
                    value={ticketUrl} 
                    size={130} 
                    bgColor="#ffffff"
                    fgColor="#1e293b"
                  />
                </div>
                
                <p className="scan-instruction">
                  <i className="fa-solid fa-camera"></i> Scan to view event details
                </p>
              </div>
            </div>

            <div className="ticket-footer">
              <button className="ticket-close-btn" onClick={() => setShowTicket(false)}>
                Close Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {showOtpModal && (
        <div className="ticket-overlay" onClick={() => setShowOtpModal(false)}>
          <div className="ticket-card" style={{ maxWidth: '350px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            
            <div className="ticket-header" style={{ background: '#1e293b' }}>
              <h2 style={{ fontSize: '20px' }}>Verify Attendance</h2>
              <p style={{ fontSize: '12px', marginTop: '5px', color: '#94a3b8' }}>Enter the code from notification</p>
            </div>
            
            <div className="ticket-body" style={{ padding: '30px 24px' }}>
              <input 
                type="text" 
                maxLength={4}
                placeholder="----"
                value={otpInput}
                onChange={(e) => {
                  setOtpInput(e.target.value.replace(/\D/g, ''));
                  setOtpError('');
                }}
                style={{ 
                  width: '100%', fontSize: '32px', textAlign: 'center', letterSpacing: '10px', 
                  padding: '10px', borderRadius: '12px', border: '2px solid #e2e8f0', outline: 'none',
                  fontWeight: 'bold', color: '#1e293b'
                }}
              />
              
              {otpError && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '10px', fontWeight: 'bold' }}>{otpError}</p>}

              <button 
                className="ticket-close-btn" 
                style={{ marginTop: '20px', background: '#6366f1', color: 'white' }}
                onClick={async () => {
                  if (otpInput === generatedOtp && generatedOtp !== '') {
                    try {
                      await fetch(`http://localhost:5000/api/events/${event.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ mark_attendance: userId }) 
                      });
                      setShowOtpModal(false);
                      fetchEventData(); 
                    } catch (err) {
                      setOtpError("Failed to verify. Try again.");
                    }
                  } else {
                    setOtpError("Invalid code. Please check the notification.");
                  }
                }}
              >
                Verify & Send Request
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default EventDetailPage;