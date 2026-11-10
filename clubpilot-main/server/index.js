const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config(); 

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'akhilsql2006', 
  database: process.env.DB_NAME || 'clubpilot',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 🔥 BACKGROUND TIMER (Status Update)
setInterval(() => {
  const now = new Date();
  const currentTimeMs = now.getTime(); 
  const selectSql = 'SELECT id, date, time, status FROM events WHERE status IN ("upcoming", "ongoing")';
  
  db.query(selectSql, (err, events) => {
    if (err) return console.error("Timer fetch error:", err);
    events.forEach(ev => {
      if (!ev.date || !ev.time) return;
      const timeParts = ev.time.includes(' - ') ? ev.time.split(' - ') : ev.time.split('-');
      if (timeParts.length < 2) return;
      const startStr = timeParts[0].trim();
      const endStr = timeParts[1].trim();
      let dateStr = ev.date;
      if (ev.date instanceof Date) {
        dateStr = `${ev.date.getFullYear()}-${String(ev.date.getMonth() + 1).padStart(2, '0')}-${String(ev.date.getDate()).padStart(2, '0')}`;
      } else if (typeof ev.date === 'string' && ev.date.includes('T')) {
        dateStr = ev.date.split('T')[0];
      }
      const startTime = new Date(`${dateStr}T${startStr}:00`).getTime();
      const endTime = new Date(`${dateStr}T${endStr}:00`).getTime();
      let newStatus = ev.status;
      if (currentTimeMs >= endTime) newStatus = 'completed';
      else if (currentTimeMs >= startTime && currentTimeMs < endTime) newStatus = 'ongoing';
      if (newStatus !== ev.status) db.query('UPDATE events SET status = ? WHERE id = ?', [newStatus, ev.id]);
    });
  });
}, 10000); 

// 🔥 LOGIN
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT id, username, role, member_id FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    res.json(results[0]);
  });
});

// 🔥 1. GET ALL EVENTS
app.get('/api/events', (req, res) => {
  const sql = `
    SELECT 
      e.id, e.title, DATE_FORMAT(e.date, '%Y-%m-%d') AS date, e.time, e.venue, e.description, e.status, e.category, e.capacity,
      (CASE WHEN e.id <= 8 THEN e.participants ELSE (SELECT COUNT(*) FROM event_participants ep WHERE ep.event_id = e.id AND ep.attendance_status != 'rejected') END) AS participants,
      COALESCE((SELECT JSON_ARRAYAGG(CONCAT('user_', user_id)) FROM event_participants ep WHERE ep.event_id = e.id AND ep.attendance_status IN ('registered', 'pending', 'attended')), JSON_ARRAY()) AS participant_names,
      COALESCE((SELECT JSON_ARRAYAGG(CONCAT('user_', user_id)) FROM event_participants ep WHERE ep.event_id = e.id AND ep.attendance_status = 'attended'), JSON_ARRAY()) AS attended_by,
      COALESCE((SELECT JSON_ARRAYAGG(CONCAT('user_', user_id)) FROM event_participants ep WHERE ep.event_id = e.id AND ep.attendance_status = 'pending'), JSON_ARRAY()) AS pending_attendance,
      COALESCE((SELECT JSON_ARRAYAGG(CONCAT('user_', user_id)) FROM event_participants ep WHERE ep.event_id = e.id AND ep.attendance_status = 'rejected'), JSON_ARRAY()) AS rejected_by
    FROM events e
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    const safeParse = (data) => {
      if (!data) return [];
      if (Array.isArray(data)) return data;
      try { return JSON.parse(data); } catch (e) { return []; }
    };
    const formattedEvents = results.map(event => ({
      id: event.id, title: event.title, date: event.date, time: event.time, venue: event.venue, description: event.description,
      status: event.status, category: event.category, capacity: event.capacity, participants: event.participants || 0,
      participantNames: safeParse(event.participant_names), attendedBy: safeParse(event.attended_by),
      pendingAttendance: safeParse(event.pending_attendance), rejectedBy: safeParse(event.rejected_by)
    }));
    res.json(formattedEvents);
  });
});

// 🔥 1.5 GET SINGLE EVENT
app.get('/api/events/:id', (req, res) => {
  const sql = `
    SELECT 
      e.id, e.title, DATE_FORMAT(e.date, '%Y-%m-%d') AS date, e.time, e.venue, e.description, e.status, e.category, e.capacity,
      (CASE WHEN e.id <= 8 THEN e.participants ELSE (SELECT COUNT(*) FROM event_participants ep WHERE ep.event_id = e.id AND ep.attendance_status != 'rejected') END) AS participants,
      COALESCE((SELECT JSON_ARRAYAGG(CONCAT('user_', user_id)) FROM event_participants ep WHERE ep.event_id = e.id AND ep.attendance_status IN ('registered', 'pending', 'attended')), JSON_ARRAY()) AS participant_names,
      COALESCE((SELECT JSON_ARRAYAGG(CONCAT('user_', user_id)) FROM event_participants ep WHERE ep.event_id = e.id AND ep.attendance_status = 'attended'), JSON_ARRAY()) AS attended_by,
      COALESCE((SELECT JSON_ARRAYAGG(CONCAT('user_', user_id)) FROM event_participants ep WHERE ep.event_id = e.id AND ep.attendance_status = 'pending'), JSON_ARRAY()) AS pending_attendance,
      COALESCE((SELECT JSON_ARRAYAGG(CONCAT('user_', user_id)) FROM event_participants ep WHERE ep.event_id = e.id AND ep.attendance_status = 'rejected'), JSON_ARRAY()) AS rejected_by
    FROM events e
    WHERE e.id = ?
  `;
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'Not found' });
    
    const event = results[0];
    const safeParse = (data) => {
      if (!data) return [];
      if (Array.isArray(data)) return data;
      try { return JSON.parse(data); } catch (e) { return []; }
    };
    
    res.json({
      id: event.id, title: event.title, date: event.date, time: event.time, venue: event.venue, description: event.description,
      status: event.status, category: event.category, capacity: event.capacity, participants: event.participants || 0,
      participantNames: safeParse(event.participant_names), attendedBy: safeParse(event.attended_by),
      pendingAttendance: safeParse(event.pending_attendance), rejectedBy: safeParse(event.rejected_by)
    });
  });
});

// 🔥 2. CREATE NEW EVENT
app.post('/api/events', (req, res) => {
  const { title, date, time, venue, description, status, category, capacity, created_by } = req.body;
  const creatorId = created_by || 1; 
  db.query('INSERT INTO events (title, date, time, venue, description, status, category, capacity, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [title, date, time, venue, description, status, category, capacity, creatorId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: result.insertId });
  });
});

// 🔥 3. UPDATE EVENT
app.put('/api/events/:id', (req, res) => {
  const { id } = req.params;
  const { title, date, time, venue, description, status, category, capacity } = req.body;
  db.query('UPDATE events SET title=?, date=?, time=?, venue=?, description=?, status=?, category=?, capacity=? WHERE id=?', [title, date, time, venue, description, status, category, capacity, id], (err) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ success: true });
  });
});

// 🔥 4. PATCH EVENT (Participant Add/Remove + Attendance)
app.patch('/api/events/:id', (req, res) => {
  const { id } = req.params;
  const { add_participant, remove_participant, status, mark_attendance } = req.body;

  if (status !== undefined) {
    db.query('UPDATE events SET status = ? WHERE id = ?', [status, id]);
  }

  // Add Participant
  if (add_participant) {
    const numericId = String(add_participant).replace(/\D/g, ''); 
    db.query('INSERT IGNORE INTO event_participants (event_id, user_id, attendance_status) VALUES (?, ?, "registered")', [id, numericId], () => {
      // 🔥 FIX: Sirf naye events (ID > 8) ka count update hoga
      if (Number(id) > 8) {
        db.query('UPDATE events SET participants = (SELECT COUNT(*) FROM event_participants WHERE event_id = ? AND attendance_status != "rejected") WHERE id = ?', [id, id]);
      }
    });
  }

  // Remove Participant
  if (remove_participant) {
    const numericId = String(remove_participant).replace(/\D/g, '');
    db.query('DELETE FROM event_participants WHERE event_id = ? AND user_id = ?', [id, numericId], () => {
      // 🔥 FIX: Sirf naye events (ID > 8) ka count update hoga
      if (Number(id) > 8) {
        db.query('UPDATE events SET participants = (SELECT COUNT(*) FROM event_participants WHERE event_id = ? AND attendance_status != "rejected") WHERE id = ?', [id, id]);
      }
    });
  }

  // Mark Attendance (Pending)
  if (mark_attendance) {
    const numericId = String(mark_attendance).replace(/\D/g, '');
    db.query('UPDATE event_participants SET attendance_status = "pending" WHERE event_id = ? AND user_id = ?', [id, numericId]);
  }

  res.json({ success: true });
});

// 🔥 5. APPROVE ATTENDANCE
app.patch('/api/events/:id/approve-attendance', (req, res) => {
  const { id } = req.params;
  const { member_id } = req.body;

  if (!member_id) return res.status(400).json({ error: 'member_id required' });
  const numericId = String(member_id).replace(/\D/g, ''); 

  db.query(`UPDATE event_participants SET attendance_status = 'attended' WHERE event_id = ? AND user_id = ?`, [id, numericId], (err) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ success: true });
  });
});

// 🔥 6. REJECT ATTENDANCE
app.patch('/api/events/:id/reject-attendance', (req, res) => {
  const { id } = req.params;
  const { member_id } = req.body;

  if (!member_id) return res.status(400).json({ error: 'member_id required' });
  const numericId = String(member_id).replace(/\D/g, '');

  db.query(`UPDATE event_participants SET attendance_status = 'rejected' WHERE event_id = ? AND user_id = ?`, [id, numericId], (err) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ success: true });
  });
});

// 🔥 7. DELETE EVENT
app.delete('/api/events/:id', (req, res) => {
  db.query('DELETE FROM events WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ success: true });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));