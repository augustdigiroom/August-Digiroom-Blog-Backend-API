import axios from 'axios';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function parseMarkdownFromUrl(url) {
  const response = await axios.get(url);
  const { data, content } = matter(response.data);
  const processedContent = await remark().use(html).process(content);
  return {
    slug: url.split('/').pop().replace(/\.md$/, ''),
    ...data,
    content: processedContent.toString()
  };
}
