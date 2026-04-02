import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const endpoint =
  process.env.BLOG_SHEETS_ENDPOINT ||
  'https://script.google.com/macros/s/AKfycbylEL3g7Wyu5n4mNQzFSeuA3fTDK516epmumyklTzC9fUQwVeNYPIffDppJ_wSjWOCF/exec';

const outputPath = resolve('public', 'blog.json');

const main = async () => {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts: ${response.status}`);
    }
    const data = await response.json();
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Saved blog posts to ${outputPath}`);
  } catch (error) {
    console.warn('Could not fetch blog posts. Keeping existing blog.json.', error.message);
  }
};

await main();
