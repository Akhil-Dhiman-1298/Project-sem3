-- 1. Fresh Database Banao
DROP DATABASE IF EXISTS clubpilot;
CREATE DATABASE clubpilot;
USE clubpilot;

-- 2. Users Table (Profile fields ke saath)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(30) NOT NULL,
  member_id VARCHAR(50),
  email VARCHAR(100) DEFAULT NULL,
  phone VARCHAR(20) DEFAULT NULL,
  bio TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Events Table
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(50),
  venue VARCHAR(150),
  description TEXT,
  status VARCHAR(30) DEFAULT 'upcoming',
  category VARCHAR(50),
  icon VARCHAR(10) DEFAULT '📌',
  capacity INT DEFAULT 50,
  participants INT DEFAULT 0,
  participant_names JSON,
  attended_by JSON,
  pending_attendance JSON,
  rejected_by JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tasks Table (Agar future me DB me lana ho)
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150),
  description TEXT,
  status VARCHAR(30),
  assigned_to VARCHAR(50),
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Dummy Users Insert karo
INSERT INTO users (username, password, role, member_id, email) VALUES
('admin', '686admin123', 'admin', NULL, 'admin@club.com'),
('leader', '686leader123', 'leader', NULL, 'leader@club.com'),
('user1', '686user1', 'user', '1', 'user1@club.com'),
('user2', '686user2', 'user', '2', 'user2@club.com'),
('member1', '686member1', 'core-member', '1', 'member1@club.com');

-- Check karo data aagaya
SELECT * FROM users;
select * from events;