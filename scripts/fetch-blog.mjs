import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const outputPath = resolve('public', 'blog.json');

const main = async () => {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase env vars are missing. Keeping existing blog.json.');
      return;
    }

    const endpoint = `${supabaseUrl}/rest/v1/blog_posts?select=slug,title,excerpt,date,reading_time,cover_image,content&order=updated_at.desc`;
    const response = await fetch(endpoint, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts: ${response.status}`);
    }
    const raw = await response.json();
    const data = Array.isArray(raw)
      ? raw.map((row) => ({
          slug: row.slug,
          title: row.title ?? '',
          excerpt: row.excerpt ?? '',
          date: row.date ?? '',
          readingTime: row.reading_time ?? '',
          coverImage: row.cover_image ?? undefined,
          content: row.content ?? '',
        }))
      : [];
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Saved blog posts to ${outputPath}`);
  } catch (error) {
    console.warn('Could not fetch blog posts. Keeping existing blog.json.', error.message);
  }
};

await main();
