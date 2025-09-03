import express from 'express';
import cors from 'cors';
import { getAllPosts } from './services/github.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:5173', 'https://augustinegrepo.vercel.app', 'https://augustinegrepo.vercel.app/about', 'https://augustinegrepo.vercel.app/projects']
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

app.get('/api/posts/:slug', async (req, res) => {
  const { slug } = req.params;

  try {
    const posts = await getAllPosts();

    // Flatten posts from {2025: {08: [ ... ]}}
    const allPosts = Object.values(posts).flatMap(months =>
      Object.values(months).flat()
    );

    const foundPost = allPosts.find(p => p.slug === slug);

    if (!foundPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(foundPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load post' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
