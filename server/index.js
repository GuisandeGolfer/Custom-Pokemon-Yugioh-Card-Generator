import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { generateCardText, generateCardImage } from './gemini.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/generate-card', async (req, res) => {
  try {
    const { cardStyle, eventName, eventDate, location, people, theme, elementType } = req.body;

    if (!eventName || !cardStyle) {
      return res.status(400).json({ error: 'cardStyle and eventName are required' });
    }

    const params = { cardStyle, eventName, eventDate, location, people, theme, elementType };

    // Run text and image generation in parallel
    const [textData, imageBase64] = await Promise.all([
      generateCardText(params),
      generateCardImage(params),
    ]);

    res.json({
      ...textData,
      imageBase64,
      elementType,
    });
  } catch (err) {
    console.error('Generation error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate card' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
