import { useEffect, useState } from 'react';
import { fetchBlogPosts, getBlogPosts, resolveCoverImage } from '../lib/blog';
import type { BlogPost } from '../lib/blog';
import { getHomeHref } from '../lib/contact';

type BlogPageProps = {
  postSlug?: string;
};

const BlogPage = ({ postSlug }: BlogPageProps) => {
  const cachedPosts = getBlogPosts();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(cachedPosts);
  const [isLoading, setIsLoading] = useState(cachedPosts.length === 0);

  useEffect(() => {
    let isMounted = true;
    fetchBlogPosts()
      .then((posts) => {
        if (isMounted) {
          setBlogPosts(posts);
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

  const post = postSlug
    ? blogPosts.find((item) => item.slug === postSlug) ?? null
    : null;

  if (postSlug && isLoading) {
    return (
      <section className="min-h-screen bg-[#F7F4F2] px-4 sm:px-6 lg:px-8 xl:px-12 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 text-[#7A6B63]">
            <span className="h-5 w-5 rounded-full border-2 border-[#D8B4A0] border-t-transparent animate-spin" />
            Загружаем статью...
          </div>
        </div>
      </section>
    );
  }

  if (postSlug && !post && !isLoading) {
    return (
      <section className="min-h-screen bg-[#F7F4F2] px-4 sm:px-6 lg:px-8 xl:px-12 py-20">
        <div className="max-w-4xl mx-auto">
          <a href={getHomeHref()} className="text-sm text-[#7A6B63] hover:text-[#2B2B2B]">
            ← На главную
          </a>
          <h1 className="text-3xl sm:text-4xl text-[#2B2B2B] mt-6 mb-4">Статья не найдена</h1>
          <p className="text-[#4B4B4B]">Проверьте ссылку или вернитесь к списку статей.</p>
          <a
            href={`${getHomeHref()}?page=blog`}
            className="inline-flex items-center mt-6 px-6 py-3 rounded-full bg-[#2B2B2B] text-white hover:bg-[#1F1F1F] transition-colors"
          >
            Открыть блог
          </a>
        </div>
      </section>
    );
  }

  if (post) {
    const coverSrc = resolveCoverImage(post.coverImage);
    const paragraphs = post.content
      .split('\n\n')
      .map((item) => item.trim())
      .filter(Boolean);

    return (
      <section className="min-h-screen bg-[#F7F4F2] px-4 sm:px-6 lg:px-8 xl:px-12 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 text-sm text-[#7A6B63]">
            <a href={getHomeHref()} className="hover:text-[#2B2B2B]">
              На главную
            </a>
            <span>•</span>
            <a href={`${getHomeHref()}?page=blog`} className="hover:text-[#2B2B2B]">
              Блог
            </a>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-[#2B2B2B] mt-6 mb-4">
            {post.title}
          </h1>
          <div className="text-sm text-[#7A6B63] mb-6">
            {post.date} · {post.readingTime}
          </div>

          {coverSrc && (
            <div className="rounded-[1.5rem] overflow-hidden mb-8 shadow-soft">
              <img
                src={coverSrc}
                alt={post.title}
                className="w-full h-[18rem] sm:h-[22rem] object-cover"
              />
            </div>
          )}

          <div className="space-y-4">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[#4B4B4B] leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12">
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#D8B4A0] to-[#C9A08C] p-6 sm:p-8 lg:p-10">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10 text-center">
                <h3 className="text-white text-xl sm:text-2xl mb-3">
                  Не уверены, что с вами происходит?
                </h3>
                <p className="text-white/80 text-sm sm:text-base mb-6">
                  Пройдите короткую диагностику (2 минуты), чтобы лучше понять своё состояние
                </p>
                <a
                  href={`${getHomeHref()}?quiz=1#quiz`}
                  className="inline-flex items-center justify-center rounded-full bg-white text-[#2B2B2B] px-6 py-3 font-medium btn-hover"
                >
                  Пройти тест
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F7F4F2] px-4 sm:px-6 lg:px-8 xl:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center gap-3 text-sm text-[#7A6B63]">
          <a href={getHomeHref()} className="hover:text-[#2B2B2B]">
            На главную
          </a>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl text-[#2B2B2B] mt-6 mb-4">
          Блог
        </h1>
        <p className="text-[#4B4B4B] max-w-2xl mb-10">
          Здесь публикуются статьи и заметки о психологическом благополучии. Эти материалы помогают
          лучше понимать себя, снижать тревожность и находить внутреннюю опору.
        </p>

        {isLoading ? (
          <div className="flex items-center gap-3 text-[#7A6B63]">
            <span className="h-5 w-5 rounded-full border-2 border-[#D8B4A0] border-t-transparent animate-spin" />
            Загружаем статьи...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((item) => (
              <article
                key={item.slug}
                className="rounded-[1.5rem] bg-white shadow-soft overflow-hidden flex flex-col"
              >
                {item.coverImage && (
                  <img
                    src={resolveCoverImage(item.coverImage)}
                    alt={item.title}
                    className="h-52 w-full object-cover"
                  />
                )}
                <div className="p-6 flex flex-col gap-3">
                  <div className="text-xs text-[#7A6B63]">
                    {item.date} · {item.readingTime}
                  </div>
                  <h2 className="text-xl text-[#2B2B2B] font-semibold">{item.title}</h2>
                  <p className="text-[#4B4B4B] leading-relaxed">{item.excerpt}</p>
                  <a
                    href={`${getHomeHref()}?page=blog&post=${item.slug}`}
                    className="inline-flex items-center text-sm font-medium text-[#2B2B2B] hover:text-[#1F1F1F]"
                  >
                    Читать статью →
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPage;
