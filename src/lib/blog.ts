export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  coverImage?: string;
  content: string;
};

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
