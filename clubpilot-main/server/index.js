const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('ClubPilot API is running ✅');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

const db = require('./db');

app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT COUNT(*) AS count FROM users');
    res.json({ success: true, userCount: rows[0].count });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ---- LOGIN ----
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  try {
    const [rows] = await db.query(
      'SELECT id, username, role, member_id FROM users WHERE username = ? AND password = ?',
      [username, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});