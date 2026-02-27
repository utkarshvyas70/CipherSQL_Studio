const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // Import Postgres driver
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection Configuration
const pool = new Pool({
  user: 'postgres',        // YOUR Postgres username (usually 'postgres')
  host: 'localhost',
  database: 'cipher_sql_studio',
  password: '17aAA17@', // REPLACE WITH YOUR ACTUAL PASSWORD
  port: 5432,
});

// Route: Get All Assignments
app.get('/assignments', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM assignments');
    res.json(result.rows); // Send the rows back to the frontend
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});