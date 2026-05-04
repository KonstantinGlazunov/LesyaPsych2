import { isSupabaseConfigured, supabase } from './supabaseClient';

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  coverImage?: string;
  content: string;
};

const STATIC_BLOG_PATH = 'blog.json';

const STORAGE_KEY = 'lesya_blog_posts';
const DELETED_KEY = 'lesya_blog_deleted';

const basePosts: BlogPost[] = [
  {
    slug: 'kak-ponyat-chto-vam-nuzhna-podderzhka',
    title: 'Как понять, что вам нужна психологическая поддержка',
    excerpt:
      'Небольшие сигналы накапливаются постепенно: усталость, раздражительность, ощущение потери опоры. Разберем простые маркеры, которые помогают заметить, что пора бережно позаботиться о себе.',
    date: '02.04.2026',
    readingTime: '6 минут',
    coverImage: 'images/team-900.webp',
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

const readDeletedSlugs = () => {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(DELETED_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return [];
  }
};

const saveDeletedSlugs = (slugs: string[]) => {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(DELETED_KEY, JSON.stringify(slugs));
};

export const getBlogPosts = () => {
  const deleted = new Set(readDeletedSlugs());
  const stored = readStoredPosts();
  const source = stored && stored.length > 0 ? stored : basePosts;
  return source.filter((post) => !deleted.has(post.slug));
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

type SupabasePost = {
  slug: string;
  title: string;
  excerpt: string | null;
  date: string | null;
  reading_time: string | null;
  cover_image: string | null;
  content: string | null;
  updated_at?: string | null;
  created_at?: string | null;
};

const mapFromSupabase = (row: SupabasePost): BlogPost => ({
  slug: row.slug,
  title: row.title ?? '',
  excerpt: row.excerpt ?? '',
  date: row.date ?? '',
  readingTime: row.reading_time ?? '',
  coverImage: row.cover_image ?? undefined,
  content: row.content ?? '',
});

const isExternalUrl = (value?: string) =>
  Boolean(value && (/^https?:\/\//i.test(value) || value.startsWith('blob:')));

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

const mergePosts = (base: BlogPost[], incoming: BlogPost[], deletedSlugs: Set<string>) => {
  const map = new Map<string, BlogPost>();
  base.forEach((post) => {
    if (!deletedSlugs.has(post.slug)) {
      map.set(post.slug, post);
    }
  });
  incoming.forEach((post) => {
    if (deletedSlugs.has(post.slug)) {
      return;
    }
    if (!map.has(post.slug)) {
      map.set(post.slug, post);
    }
  });
  return Array.from(map.values());
};

const uploadCoverImage = async (file: File): Promise<string | undefined> => {
  if (!isSupabaseConfigured || !supabase) {
    return undefined;
  }
  const extension = file.name.split('.').pop() || 'jpg';
  const safeName = file.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9.-]/g, '');
  const path = `covers/${Date.now()}-${safeName || `cover.${extension}`}`;
  const { error } = await supabase.storage.from('blog-covers').upload(path, file, {
    upsert: true,
    cacheControl: '3600',
  });
  if (error) {
    throw error;
  }
  const { data } = supabase.storage.from('blog-covers').getPublicUrl(path);
  return data.publicUrl ?? undefined;
};

export const fetchBlogPosts = async (source: 'auto' | 'sheets' = 'auto'): Promise<BlogPost[]> => {
  const localPosts = getBlogPosts();
  const deletedSlugs = new Set(readDeletedSlugs());
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('slug,title,excerpt,date,reading_time,cover_image,content,updated_at,created_at')
      .order('updated_at', { ascending: false });
    if (!error && data && data.length > 0) {
      const normalized = data.map((row) => normalizePost(mapFromSupabase(row as SupabasePost)));
      const merged = mergePosts(localPosts, normalized, deletedSlugs);
      saveBlogPosts(merged);
      return merged;
    }
  }

  if (typeof window !== 'undefined' && source === 'auto') {
    const baseUrl = import.meta.env.BASE_URL ?? '/';
    const staticPosts = await fetchFromEndpoint(`${baseUrl}${STATIC_BLOG_PATH}`);
    if (staticPosts) {
      const merged = mergePosts(localPosts, staticPosts, deletedSlugs);
      saveBlogPosts(merged);
      return merged;
    }
  }

  return localPosts;
};

export const upsertBlogPost = async (
  post: BlogPost,
  previousSlug?: string,
  coverFile?: File | null
): Promise<BlogPost[]> => {
  let coverImage = post.coverImage;
  try {
    if (coverFile) {
      coverImage = await uploadCoverImage(coverFile);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }

  const finalPost: BlogPost = {
    ...post,
    coverImage: coverImage ?? undefined,
  };
  const current = getBlogPosts();
  const deleted = readDeletedSlugs().filter((slug) => slug !== finalPost.slug);
  saveDeletedSlugs(deleted);
  const cleaned = previousSlug
    ? current.filter((item) => item.slug !== previousSlug)
    : current;
  const next = cleaned.some((item) => item.slug === finalPost.slug)
    ? cleaned.map((item) => (item.slug === finalPost.slug ? finalPost : item))
    : [finalPost, ...cleaned];
  saveBlogPosts(next);

  if (!isSupabaseConfigured || !supabase) {
    return next;
  }

  try {
    const payload = {
      slug: finalPost.slug,
      title: finalPost.title,
      excerpt: finalPost.excerpt,
      date: finalPost.date,
      reading_time: finalPost.readingTime,
      cover_image: finalPost.coverImage ?? null,
      content: finalPost.content,
      updated_at: new Date().toISOString(),
    };
    await supabase.from('blog_posts').upsert(payload, { onConflict: 'slug' });
  } catch (error) {
    console.error(error);
  }

  return next;
};

export const deleteBlogPost = async (slug: string): Promise<BlogPost[]> => {
  const current = getBlogPosts();
  const next = current.filter((item) => item.slug !== slug);
  const deleted = readDeletedSlugs();
  if (!deleted.includes(slug)) {
    saveDeletedSlugs([...deleted, slug]);
  }
  saveBlogPosts(next);

  if (!isSupabaseConfigured || !supabase) {
    return next;
  }

  try {
    await supabase.from('blog_posts').delete().eq('slug', slug);
  } catch (error) {
    console.error(error);
  }

  return next;
};

export const triggerPublish = async () => {
  return;
};

export const resolveCoverImage = (coverImage?: string) => {
  if (!coverImage) {
    return undefined;
  }
  if (coverImage.startsWith('data:') || isExternalUrl(coverImage)) {
    return coverImage;
  }
  const baseUrl = import.meta.env.BASE_URL ?? '/';
  return `${baseUrl}${coverImage}`;
};

export { uploadCoverImage };
