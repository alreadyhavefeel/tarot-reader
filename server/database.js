// Import necessary libraries
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pg from "pg"; // Your database connection setup
import env from "dotenv";

const app = express();
const port = 3001;
env.config();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Database connection
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
db.connect();

// Route to get all cards
app.get('/api/cards', async (req ,res) => {
  const cards = await db.query('SELECT * FROM Cards');
  res.json(cards.rows);
});

app.get('/api/cards/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Fetching card:', id);
  const card = await db.query('SELECT * FROM Cards WHERE card_id = $1', [id]);
  console.log('Card:', card.rows);
  if (card.rows.length > 0) {
    res.json(card.rows[0]);
  } else {
    res.status(404).send('Card not found');
  }
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));