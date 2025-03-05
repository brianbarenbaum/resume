import express from 'express';
import cors from 'cors';
import { run } from './index.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Query endpoint
app.post('/api/query', async function(req: express.Request, res: express.Response): Promise<void> {
  try {
    const { question } = req.body;

    if (!question) {
      res.status(400).json({ error: 'Question is required' });
    }

    const response = await run(question);
    res.json({ question, response });

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});