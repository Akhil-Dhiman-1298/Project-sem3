const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ================= AUTH APIs =================

// 1. LOGIN API
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'All fields required' });

  try {
    const [rows] = await db.query(
      'SELECT id, username, role, member_id, email, phone, bio FROM users WHERE username = ? AND password = ?',
      [username, password]
    );
    if (rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. UPDATE PROFILE API (Profile Edit ke liye)
app.put('/api/users/:id', async (req, res) => {
  const { username, email, phone, bio } = req.body;
  try {
    await db.query(
      'UPDATE users SET username=?, email=?, phone=?, bio=? WHERE id=?',
      [username, email, phone, bio, req.params.id]
    );
    res.json({ success: true, message: 'Profile updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= EVENTS APIs =================

// 3. GET ALL EVENTS
app.get('/api/events', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM events ORDER BY date ASC');
    // JSON fields parse karo
    const parsed = rows.map(e => ({
      ...e,
      participantNames: e.participant_names ? JSON.parse(e.participant_names) : [],
      attendedBy: e.attended_by ? JSON.parse(e.attended_by) : [],
      pendingAttendance: e.pending_attendance ? JSON.parse(e.pending_attendance) : [],
      rejectedBy: e.rejected_by ? JSON.parse(e.rejected_by) : [],
    }));
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. CREATE NEW EVENT
app.post('/api/events', async (req, res) => {
  const e = req.body;
  try {
    const [result] = await db.query(
      `INSERT INTO events 
       (title, date, time, venue, description, status, category, icon, capacity, participants, participant_names, attended_by, pending_attendance, rejected_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        e.title, e.date, e.time, e.venue, e.description,
        e.status || 'upcoming', e.category, e.icon || '📌',
        e.capacity || 50, e.participants || 0,
        JSON.stringify(e.participantNames || []),
        JSON.stringify(e.attendedBy || []),
        JSON.stringify(e.pendingAttendance || []),
        JSON.stringify(e.rejectedBy || []),
      ]
    );
    res.status(201).json({ ...e, id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. UPDATE EVENT (Participate, Edit, Status Change)
app.put('/api/events/:id', async (req, res) => {
  const id = req.params.id;
  const e = req.body;
  try {
    await db.query(
      `UPDATE events SET title=?, date=?, time=?, venue=?, description=?, status=?, category=?, capacity=?, participants=?,
       participant_names=?, attended_by=?, pending_attendance=?, rejected_by=? WHERE id=?`,
      [
        e.title, e.date, e.time, e.venue, e.description,
        e.status, e.category, e.capacity, e.participants,
        JSON.stringify(e.participantNames || []),
        JSON.stringify(e.attendedBy || []),
        JSON.stringify(e.pendingAttendance || []),
        JSON.stringify(e.rejectedBy || []),
        id
      ]
    );
    res.json({ success: true, message: 'Event updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. DELETE EVENT
app.delete('/api/events/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM events WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});