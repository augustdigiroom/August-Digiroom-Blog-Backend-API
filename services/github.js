import axios from 'axios';
import { parseMarkdownFromUrl } from '../utils/markdown.js';

const REPO = 'augustdigiroom/August-Digiroom-Blog-Posts';
const BASE_API = `https://api.github.com/repos/${REPO}/contents/posts`;
const RAW_BASE = `https://raw.githubusercontent.com/${REPO}/main/posts`;

async function fetchGitHubDir(url) {
  const res = await axios.get(url);
  return res.data.filter(item => item.type === 'dir');
}

async function fetchGitHubFiles(url) {
  const res = await axios.get(url);
  return res.data.filter(item => item.type === 'file' && item.name.endsWith('.md'));
}

export async function getAllPosts() {
  const postsByDate = {};
  const years = await fetchGitHubDir(BASE_API);

  for (const year of years) {
    const yearVal = year.name;
    postsByDate[yearVal] = {};
    const months = await fetchGitHubDir(year.url);

    for (const month of months) {
      const monthVal = month.name;
      postsByDate[yearVal][monthVal] = [];
      const files = await fetchGitHubFiles(month.url);

      for (const file of files) {
        const rawUrl = `${RAW_BASE}/${yearVal}/${monthVal}/${file.name}`;
        const post = await parseMarkdownFromUrl(rawUrl);
        postsByDate[yearVal][monthVal].push(post);
      }
    }
  }

  return postsByDate;
}
