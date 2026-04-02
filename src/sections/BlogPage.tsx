import { getBlogPosts, getPostBySlug } from '../lib/blog';
import { getHomeHref } from '../lib/contact';

type BlogPageProps = {
  postSlug?: string;
};

const BlogPage = ({ postSlug }: BlogPageProps) => {
  const baseUrl = import.meta.env.BASE_URL;
  const post = postSlug ? getPostBySlug(postSlug) : null;
  const blogPosts = getBlogPosts();

  if (postSlug && !post) {
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
    const coverSrc = post.coverImage?.startsWith('data:')
      ? post.coverImage
      : post.coverImage
        ? `${baseUrl}${post.coverImage}`
        : undefined;
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((item) => (
            <article
              key={item.slug}
              className="rounded-[1.5rem] bg-white shadow-soft overflow-hidden flex flex-col"
            >
              {item.coverImage && (
                <img
                  src={
                    item.coverImage.startsWith('data:')
                      ? item.coverImage
                      : `${baseUrl}${item.coverImage}`
                  }
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
      </div>
    </section>
  );
};

export default BlogPage;
