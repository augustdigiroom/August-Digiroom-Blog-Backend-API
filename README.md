# Markdown Blog API (No DB)

This is a simple backend that fetches markdown blog posts from a GitHub repo and serves them as JSON grouped by year and month.

### 📁 Folder Structure (GitHub)
```
/posts/
  /2025/
    /08/
      - my-first-post.md
```

### 🔧 Setup

1. Clone the repo
2. Run:
```bash
npm install
npm start
```

### 🛠 Technologies Used

- Express.js
- gray-matter
- remark + remark-html
- GitHub API
