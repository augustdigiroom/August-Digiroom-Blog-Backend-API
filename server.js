import express from 'express';
import { getAllPosts } from './services/github.js';

const app = express();
const PORT = process.env.PORT || 3000;

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
