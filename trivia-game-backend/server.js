const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const pool = new Pool({
    user: 'Liviu',
    host: 'localhost',
    database: 'trivia_users',
    password: 'Converse10',
    port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

app.post('/signup', async (req, res) => {
    const { username, password, age, country } = req.body;
  
    try {
      const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      await pool.query(
        'INSERT INTO users (username, password, age, country, points) VALUES ($1, $2, $3, $4, $5)',
        [username, password, age, country, 0]
      );
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });


  app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE username = $1 AND password = $2',
        [username, password]
      );
  
      if (result.rows.length === 0) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      const user = result.rows[0];
      res.status(200).json({
        message: 'Login successful',
        points: user.points
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.post('/update-points', async (req, res) => {
    const { username, points } = req.body;
  
    try {
      await pool.query(
        'UPDATE users SET points = points + $1 WHERE username = $2',
        [points, username]
      );
      res.status(200).json({ message: 'Points updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating points' });
    }
  });

app.listen(5000, () => {
    console.log('Server running on port 5000');
});

