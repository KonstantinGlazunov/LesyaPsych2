export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  coverImage?: string;
  content: string;
};

export const BLOG_SHEETS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbylEL3g7Wyu5n4mNQzFSeuA3fTDK516epmumyklTzC9fUQwVeNYPIffDppJ_wSjWOCF/exec';
const STATIC_BLOG_PATH = 'blog.json';

const STORAGE_KEY = 'lesya_blog_posts';

const basePosts: BlogPost[] = [
  {
    slug: 'kak-ponyat-chto-vam-nuzhna-podderzhka',
    title: 'Как понять, что вам нужна психологическая поддержка',
    excerpt:
      'Небольшие сигналы накапливаются постепенно: усталость, раздражительность, ощущение потери опоры. Разберем простые маркеры, которые помогают заметить, что пора бережно позаботиться о себе.',
    date: '02.04.2026',
    readingTime: '6 минут',
    coverImage: 'images/team.jpeg',
    content:
      'Почему это бывает неочевидно\n\n' +
      'Большинство людей долго пытаются справиться самостоятельно. Мы привыкаем к напряжению и воспринимаем его как «норму», а тревогу или усталость — как временные трудности.\n' +
      'Но когда внутреннее напряжение становится фоном, снижается способность восстанавливаться и ощущать устойчивость. Это не слабость, а естественная реакция психики на длительную нагрузку.\n\n' +
      'Мягкие сигналы, на которые стоит обратить внимание\n\n' +
      'Повышенная тревожность, сложности со сном, ощущение «пустоты» или постоянной усталости — это важные подсказки. Иногда появляются соматические проявления: напряжение в теле, головные боли, ощущение тяжести.\n' +
      'Если вам трудно принимать решения или кажется, что вы «застряли», это тоже может быть поводом для бережной поддержки.\n\n' +
      'Что можно сделать уже сейчас\n\n' +
      'Первый шаг — признать, что вам непросто. Дальше важно дать себе право на поддержку: разговор, отдых, восстановление.\n' +
      'Психологическая консультация — это пространство, где можно спокойно разобрать, что происходит внутри, и найти устойчивость без давления и оценок.\n\n' +
      'Почему ранняя поддержка помогает\n\n' +
      'Когда мы замечаем состояние вовремя, его легче корректировать. Это помогает предотвратить накопление усталости и вернуть чувство опоры.\n' +
      'Даже одна беседа может дать ясность и снизить внутреннее напряжение.',
  },
];

const readStoredPosts = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as BlogPost[];
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export const getBlogPosts = () => {
  const stored = readStoredPosts();
  return stored && stored.length > 0 ? stored : basePosts;
};

export const saveBlogPosts = (posts: BlogPost[]) => {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

export const getPostBySlug = (slug: string) =>
  getBlogPosts().find((post) => post.slug === slug);

const normalizePost = (post: BlogPost): BlogPost => ({
  ...post,
  slug: post.slug.trim(),
  title: post.title.trim(),
  excerpt: post.excerpt.trim(),
  date: post.date.trim(),
  readingTime: post.readingTime.trim(),
  coverImage: post.coverImage?.trim(),
  content: post.content.trim(),
});

const fetchFromEndpoint = async (url: string): Promise<BlogPost[] | null> => {
  try {
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) {
      return null;
    }
    const data = (await response.json()) as BlogPost[];
    const normalized = Array.isArray(data) ? data.map(normalizePost) : [];
    return normalized.length > 0 ? normalized : null;
  } catch {
    return null;
  }
};

const mergePosts = (base: BlogPost[], incoming: BlogPost[]) => {
  const map = new Map<string, BlogPost>();
  base.forEach((post) => map.set(post.slug, post));
  incoming.forEach((post) => {
    if (!map.has(post.slug)) {
      map.set(post.slug, post);
    }
  });
  return Array.from(map.values());
};

export const fetchBlogPosts = async (source: 'auto' | 'sheets' = 'auto'): Promise<BlogPost[]> => {
  const localPosts = getBlogPosts();
  if (typeof window !== 'undefined' && source === 'auto') {
    const baseUrl = import.meta.env.BASE_URL ?? '/';
    const staticPosts = await fetchFromEndpoint(`${baseUrl}${STATIC_BLOG_PATH}`);
    if (staticPosts) {
      const merged = mergePosts(localPosts, staticPosts);
      saveBlogPosts(merged);
      return merged;
    }
  }

  if (BLOG_SHEETS_ENDPOINT) {
    const sheetPosts = await fetchFromEndpoint(BLOG_SHEETS_ENDPOINT);
    if (sheetPosts) {
      const merged = mergePosts(localPosts, sheetPosts);
      saveBlogPosts(merged);
      return merged;
    }
  }

  return localPosts;
};

export const upsertBlogPost = async (
  post: BlogPost,
  previousSlug?: string
): Promise<BlogPost[]> => {
  const current = getBlogPosts();
  const cleaned = previousSlug
    ? current.filter((item) => item.slug !== previousSlug)
    : current;
  const next = cleaned.some((item) => item.slug === post.slug)
    ? cleaned.map((item) => (item.slug === post.slug ? post : item))
    : [post, ...cleaned];
  saveBlogPosts(next);

  if (!BLOG_SHEETS_ENDPOINT) {
    return next;
  }

  try {
    await fetch(BLOG_SHEETS_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(post),
    });
  } catch {
    // Если запись в Sheets недоступна из браузера, оставляем локальную копию.
  }

  return next;
};

export const deleteBlogPost = async (slug: string): Promise<BlogPost[]> => {
  const current = getBlogPosts();
  const next = current.filter((item) => item.slug !== slug);
  saveBlogPosts(next);

  if (!BLOG_SHEETS_ENDPOINT) {
    return next;
  }

  try {
    await fetch(BLOG_SHEETS_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({ action: 'delete', slug }),
    });
  } catch {
    // Если удаление в Sheets недоступно, оставляем локальную копию.
  }

  return next;
};

export const triggerPublish = async () => {
  if (!BLOG_SHEETS_ENDPOINT) {
    return;
  }
  try {
    await fetch(`${BLOG_SHEETS_ENDPOINT}?action=trigger`, {
      method: 'POST',
      mode: 'no-cors',
    });
  } catch {
    // Нет доступа к триггеру публикации.
  }
};
