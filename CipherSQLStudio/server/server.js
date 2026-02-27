require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());


const pool = new Pool({
  user: 'postgres',        
  host: 'localhost',
  database: 'cipher_sql_studio',
  password: '17aAA17@', 
  port: 5432,
});


app.get('/assignments', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM assignments');
    res.json(result.rows); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


app.post('/execute', async (req, res) => {
  const { sql } = req.body;

  if (!sql) return res.status(400).json({ error: "Query is empty" });

  
  const forbidden = ['drop', 'delete', 'truncate', 'alter', 'update', 'insert'];
  const lowerSql = sql.toLowerCase();
  
  const isRisky = forbidden.some(word => lowerSql.includes(word));

  if (isRisky) {
    return res.status(400).json({ error: "Security Alert: specific modification commands are restricted." });
  }


  try {
    const result = await pool.query(sql);
    res.json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
const { GoogleGenerativeAI } = require("@google/generative-ai");


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });


app.post('/hint', async (req, res) => {
  const { task, currentQuery } = req.body;

  try {
    const prompt = `
      You are a SQL tutor. The student is trying to solve this task: "${task}".
      Their current code is: "${currentQuery}".
      
      Give a short, helpful hint (max 50 words). 
      Do NOT write the correct code. Just explain the logic.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const hintText = response.text();
    
    res.json({ hint: hintText });
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({ error: "AI is thinking too hard. Try again." });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});