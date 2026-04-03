import { useEffect, useState } from 'react';
import {
  deleteBlogPost,
  fetchBlogPosts,
  getBlogPosts,
  resolveCoverImage,
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

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const normalizeSlugInput = (value: string) =>
  value
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

const BlogAdmin = () => {
  const cachedPosts = getBlogPosts();
  const [posts, setPosts] = useState<BlogPost[]>(cachedPosts);
  const [isLoading, setIsLoading] = useState(cachedPosts.length === 0);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string>('');
  const [originalSlug, setOriginalSlug] = useState<string>('');
  const [draft, setDraft] = useState<BlogPost>(() => createEmptyPost());
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const slugIsValid = !draft.slug || slugPattern.test(draft.slug);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [statusTone, setStatusTone] = useState<'success' | 'error' | ''>('');

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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
          setCoverFile(null);
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
      setCoverFile(null);
    }
  };

  const handleFileChange = (file?: File | null) => {
    if (!file) {
      setPreviewUrl(undefined);
      setCoverFile(null);
      setDraft((prev) => ({ ...prev, coverImage: undefined }));
      return;
    }
    setCoverFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleSave = async () => {
    if (!draft.slug || !draft.title) {
      alert('Заполните адрес статьи и заголовок.');
      return;
    }
    if (!slugPattern.test(draft.slug)) {
      alert('Slug должен содержать только латинские буквы, цифры и дефисы.');
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
      setStatusMessage('');
      setStatusTone('');
      const nextPosts = await upsertBlogPost(
        normalized,
        originalSlug && originalSlug !== normalized.slug ? originalSlug : undefined,
        coverFile
      );
      setPosts(nextPosts);
      const saved = nextPosts.find((item) => item.slug === normalized.slug);
      setSelectedSlug(normalized.slug);
      setOriginalSlug(normalized.slug);
      if (saved?.coverImage) {
        setPreviewUrl(saved.coverImage);
      }
      setCoverFile(null);
      setStatusMessage('Статья сохранена.');
      setStatusTone('success');
      window.setTimeout(() => {
        setStatusMessage('');
        setStatusTone('');
      }, 3000);
    } catch (error) {
      console.error(error);
      setStatusMessage('Не удалось сохранить статью или изображение.');
      setStatusTone('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleNew = () => {
    setSelectedSlug('');
    setOriginalSlug('');
    setDraft(createEmptyPost());
    setPreviewUrl(undefined);
    setCoverFile(null);
  };

  const handleDelete = async () => {
    const targetSlug = originalSlug || selectedSlug;
    if (!targetSlug) {
      return;
    }
    const confirmed = window.confirm('Удалить статью? Это действие нельзя отменить.');
    if (!confirmed) {
      return;
    }
    try {
      setIsDeleting(true);
      setStatusMessage('');
      setStatusTone('');
      const nextPosts = await deleteBlogPost(targetSlug);
      setPosts(nextPosts);
      if (nextPosts[0]) {
        setSelectedSlug(nextPosts[0].slug);
        setOriginalSlug(nextPosts[0].slug);
        setDraft({ ...nextPosts[0] });
        setPreviewUrl(nextPosts[0].coverImage);
        setCoverFile(null);
      } else {
        handleNew();
      }
      setStatusMessage('Статья удалена.');
      setStatusTone('success');
      window.setTimeout(() => {
        setStatusMessage('');
        setStatusTone('');
      }, 3000);
    } catch (error) {
      console.error(error);
      setStatusMessage('Не удалось удалить статью.');
      setStatusTone('error');
    } finally {
      setIsDeleting(false);
    }
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
          Здесь можно создавать и редактировать статьи для SEO. Данные сохраняются в Supabase.
        </p>

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
            {statusMessage && (
              <div
                className={`rounded-xl border px-4 py-2 text-sm ${
                  statusTone === 'success'
                    ? 'border-[#C9D7C5] bg-[#F3F7F2] text-[#2B4B2B]'
                    : statusTone === 'error'
                      ? 'border-[#E8C9C2] bg-[#FBF3F1] text-[#7A2E22]'
                      : 'border-[#E6DDD6] bg-white/80 text-[#7A6B63]'
                }`}
              >
                {statusMessage}
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
                <span className="block text-xs text-[#9B8D86]">
                  До 60 символов, ключевая фраза ближе к началу.
                </span>
              </label>
              <label className="space-y-2 text-sm text-[#7A6B63]">
                Адрес страницы (slug)
                <input
                  value={draft.slug}
                  onChange={(event) =>
                    setDraft((prev) => ({ ...prev, slug: normalizeSlugInput(event.target.value) }))
                  }
                  placeholder="primer-stati"
                  className={`w-full rounded-xl border px-3 py-2 text-sm text-[#2B2B2B] ${
                    slugIsValid ? 'border-[#E6DDD6]' : 'border-[#D07A6B]'
                  }`}
                />
                <span className="block text-xs text-[#9B8D86]">
                  Только латиница, цифры и дефисы. Без пробелов. Пример: primer-stati.
                </span>
                {!slugIsValid && (
                  <span className="block text-xs text-[#B45344]">
                    Допустимы только латинские буквы, цифры и дефисы.
                  </span>
                )}
              </label>
            </div>

            <label className="space-y-2 text-sm text-[#7A6B63]">
              Краткий анонс
              <textarea
                value={draft.excerpt}
                onChange={(event) => setDraft((prev) => ({ ...prev, excerpt: event.target.value }))}
                className="w-full rounded-xl border border-[#E6DDD6] px-3 py-2 text-sm text-[#2B2B2B] min-h-[90px]"
              />
              <span className="block text-xs text-[#9B8D86]">
                140–170 символов, ключевая фраза один раз, завершайте смыслом.
              </span>
            </label>

            <label className="space-y-2 text-sm text-[#7A6B63]">
              Текст статьи
              <textarea
                value={draft.content}
                onChange={(event) => setDraft((prev) => ({ ...prev, content: event.target.value }))}
                className="w-full rounded-xl border border-[#E6DDD6] px-3 py-2 text-sm text-[#2B2B2B] min-h-[220px]"
                placeholder="Разделяйте абзацы пустой строкой."
              />
              <span className="block text-xs text-[#9B8D86]">
                Вступление 2–3 предложения, далее короткие абзацы и подзаголовки.
              </span>
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
                  src={resolveCoverImage(previewUrl)}
                  alt="Превью статьи"
                  className="h-40 w-full object-cover rounded-xl"
                />
              )}
              <span className="block text-xs text-[#9B8D86]">
                Рекомендуемый размер 1200×630, JPG или WebP.
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleSave}
                disabled={isSaving || isDeleting || !slugIsValid}
                className="inline-flex items-center justify-center rounded-full bg-[#2B2B2B] text-white px-6 py-3 hover:bg-[#1F1F1F] transition-colors disabled:opacity-60"
              >
                {isSaving ? 'Сохраняем...' : 'Сохранить статью'}
              </button>
              <button
                onClick={handleDelete}
                disabled={isSaving || isDeleting || !(originalSlug || selectedSlug)}
                className="inline-flex items-center justify-center rounded-full border border-[#D7B7AA] text-[#A14B3C] px-6 py-3 hover:bg-[#F9F1EE] transition-colors disabled:opacity-60"
              >
                {isDeleting ? 'Удаляем...' : 'Удалить статью'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogAdmin;
