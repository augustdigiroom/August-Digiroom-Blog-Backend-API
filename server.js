import express from 'express';
import cors from 'cors';
import { getAllPosts } from './services/github.js';

const app = express();
const PORT = process.env.PORT || 3000;

// CORS for localhost only (for now)
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Add root route for Render health check
app.get('/', (req, res) => {
  res.send('API is live!');
});

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load posts' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
