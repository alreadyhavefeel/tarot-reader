// Import necessary libraries
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pg from "pg"; // Your database connection setup
import env from "dotenv";

env.config();

export function createApp(db) {
  const app = express();

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static("public"));

  app.get('/api/cards', async (req, res) => {
    try {
      const cards = await db.query('SELECT * FROM Cards');
      res.json(cards.rows);
    } catch (err) {
      console.error('Error fetching cards:', err);
      res.status(500).json({ error: 'Failed to fetch cards' });
    }
  });

  app.get('/api/cards/:id', async (req, res) => {
    const { id } = req.params;
    const cardId = Number.parseInt(id, 10);
    if (!Number.isInteger(cardId) || cardId <= 0 || String(cardId) !== id) {
      res.status(400).json({ error: 'Invalid card id' });
      return;
    }

    try {
      const card = await db.query(
        'SELECT * FROM Cards WHERE card_id = $1',
        [cardId]
      );
      if (card.rows.length > 0) {
        res.json(card.rows[0]);
      } else {
        res.status(404).send('Card not found');
      }
    } catch (err) {
      console.error('Error fetching card:', err);
      res.status(500).json({ error: 'Failed to fetch card' });
    }
  });

  return app;
}

// Start server only when executed directly (skipped under Jest).
if (!process.env.JEST_WORKER_ID) {
  const port = 3001;
  const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
  db.connect();

  const app = createApp(db);
  app.listen(port, () => console.log(`Server running on port ${port}`));
}
