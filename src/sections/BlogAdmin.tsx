import { useEffect, useState } from 'react';
import {
  BLOG_SHEETS_ENDPOINT,
  fetchBlogPosts,
  getBlogPosts,
  triggerPublish,
  upsertBlogPost,
} from '../lib/blog';
import type { BlogPost } from '../lib/blog';
import { getHomeHref } from '../lib/contact';

const createEmptyPost = (): BlogPost => ({
  slug: '',
  title: '',
  excerpt: '',
  date: new Date().toLocaleDateString('ru-RU'),
  readingTime: '5 минут',
  content: '',
});

const calculateReadingTime = (text: string) => {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} минут`;
};

const BlogAdmin = () => {
  const cachedPosts = getBlogPosts();
  const [posts, setPosts] = useState<BlogPost[]>(cachedPosts);
  const [isLoading, setIsLoading] = useState(cachedPosts.length === 0);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string>('');
  const [originalSlug, setOriginalSlug] = useState<string>('');
  const [draft, setDraft] = useState<BlogPost>(() => createEmptyPost());
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;
    fetchBlogPosts('auto')
      .then((items) => {
        if (!isMounted) {
          return;
        }
        setPosts(items);
        if (items[0]) {
          setSelectedSlug(items[0].slug);
          setOriginalSlug(items[0].slug);
          setDraft({ ...items[0] });
          setPreviewUrl(items[0].coverImage);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelect = (slug: string) => {
    setSelectedSlug(slug);
    const existing = posts.find((post) => post.slug === slug);
    if (existing) {
      setDraft({ ...existing });
      setPreviewUrl(existing.coverImage);
      setOriginalSlug(existing.slug);
    }
  };

  const handleFileChange = (file?: File | null) => {
    if (!file) {
      setPreviewUrl(undefined);
      setDraft((prev) => ({ ...prev, coverImage: undefined }));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : undefined;
      setPreviewUrl(result);
      setDraft((prev) => ({ ...prev, coverImage: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!draft.slug || !draft.title) {
      alert('Заполните адрес статьи и заголовок.');
      return;
    }
    const normalized: BlogPost = {
      ...draft,
      excerpt: draft.excerpt || draft.content.split(/\n+/).slice(0, 2).join(' ').slice(0, 180),
      readingTime: calculateReadingTime(draft.content),
      date: draft.date || new Date().toLocaleDateString('ru-RU'),
    };
    try {
      setIsSaving(true);
      const nextPosts = await upsertBlogPost(
        normalized,
        originalSlug && originalSlug !== normalized.slug ? originalSlug : undefined
      );
      setPosts(nextPosts);
      setSelectedSlug(normalized.slug);
      setOriginalSlug(normalized.slug);
      await triggerPublish();
      alert('Статья сохранена. Публикация появится через 2 минуты.');
    } catch (error) {
      console.error(error);
      alert('Не удалось сохранить статью.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleNew = () => {
    setSelectedSlug('');
    setOriginalSlug('');
    setDraft(createEmptyPost());
    setPreviewUrl(undefined);
  };

  return (
    <section className="min-h-screen bg-[#F7F4F2] px-4 sm:px-6 lg:px-8 xl:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center gap-3 text-sm text-[#7A6B63]">
          <a href={getHomeHref()} className="hover:text-[#2B2B2B]">
            На главную
          </a>
          <span>•</span>
          <a href={`${getHomeHref()}?page=blog`} className="hover:text-[#2B2B2B]">
            Блог
          </a>
        </div>

        <h1 className="text-3xl sm:text-4xl text-[#2B2B2B] mt-6 mb-4">Админка блога</h1>
        <p className="text-[#4B4B4B] mb-10 max-w-2xl">
          Здесь можно создавать и редактировать статьи для SEO. При подключении Apps Script данные
          сохраняются в Google Sheets.
        </p>
        {!BLOG_SHEETS_ENDPOINT && (
          <div className="mb-8 rounded-2xl border border-[#E6DDD6] bg-white/80 p-4 text-sm text-[#7A6B63]">
            Укажите ссылку Apps Script в коде (BLOG_SHEETS_ENDPOINT), чтобы статьи сохранялись в Google Sheets.
          </div>
        )}
        <div className="mb-8 rounded-2xl border border-[#E6DDD6] bg-white/80 p-4 text-sm text-[#7A6B63]">
          Публикация запускается автоматически после сохранения статьи.
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <aside className="bg-white rounded-[1.5rem] p-6 shadow-soft">
            <div className="text-sm text-[#7A6B63] mb-3">Выбор статьи</div>
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[#7A6B63] mb-2">
                <span className="inline-flex h-4 w-4 rounded-full border-2 border-[#D8B4A0] border-t-transparent animate-spin" />
                Загрузка...
              </div>
            )}
            <select
              value={selectedSlug}
              onChange={(event) => handleSelect(event.target.value)}
              className="w-full rounded-xl border border-[#E6DDD6] px-3 py-2 text-sm text-[#2B2B2B]"
            >
              <option value="">Новая статья</option>
              {posts.map((post) => (
                <option key={post.slug} value={post.slug}>
                  {post.title || post.slug}
                </option>
              ))}
            </select>
            <button
              onClick={handleNew}
              className="mt-4 w-full rounded-full border border-[#E6DDD6] px-4 py-2 text-sm text-[#2B2B2B] hover:bg-[#F4ECE7]"
            >
              Создать новую
            </button>
          </aside>

          <div className="bg-white rounded-[1.5rem] p-6 sm:p-8 shadow-soft space-y-6 relative">
            {isSaving && (
              <div className="absolute inset-0 bg-white/70 rounded-[1.5rem] flex items-center justify-center">
                <span className="h-10 w-10 rounded-full border-4 border-[#D8B4A0] border-t-transparent animate-spin" />
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="space-y-2 text-sm text-[#7A6B63]">
                Заголовок статьи
                <input
                  value={draft.title}
                  onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))}
                  className="w-full rounded-xl border border-[#E6DDD6] px-3 py-2 text-sm text-[#2B2B2B]"
                />
              </label>
              <label className="space-y-2 text-sm text-[#7A6B63]">
                Адрес страницы (slug)
                <input
                  value={draft.slug}
                  onChange={(event) =>
                    setDraft((prev) => ({ ...prev, slug: event.target.value.trim() }))
                  }
                  placeholder="primer-stati"
                  className="w-full rounded-xl border border-[#E6DDD6] px-3 py-2 text-sm text-[#2B2B2B]"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm text-[#7A6B63]">
              Краткий анонс
              <textarea
                value={draft.excerpt}
                onChange={(event) => setDraft((prev) => ({ ...prev, excerpt: event.target.value }))}
                className="w-full rounded-xl border border-[#E6DDD6] px-3 py-2 text-sm text-[#2B2B2B] min-h-[90px]"
              />
            </label>

            <label className="space-y-2 text-sm text-[#7A6B63]">
              Текст статьи
              <textarea
                value={draft.content}
                onChange={(event) => setDraft((prev) => ({ ...prev, content: event.target.value }))}
                className="w-full rounded-xl border border-[#E6DDD6] px-3 py-2 text-sm text-[#2B2B2B] min-h-[220px]"
                placeholder="Разделяйте абзацы пустой строкой."
              />
            </label>

            <div className="space-y-3">
              <label className="text-sm text-[#7A6B63]">Картинка статьи</label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleFileChange(event.target.files?.[0])}
              />
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Превью статьи"
                  className="h-40 w-full object-cover rounded-xl"
                />
              )}
            </div>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center justify-center rounded-full bg-[#2B2B2B] text-white px-6 py-3 hover:bg-[#1F1F1F] transition-colors disabled:opacity-60"
            >
              {isSaving ? 'Сохраняем...' : 'Сохранить статью'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogAdmin;
