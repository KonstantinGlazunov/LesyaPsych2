import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { type BlogPost } from '@/lib/blog';
import {
  deleteBlogPost,
  fetchBlogPosts,
  getBlogPosts,
  getPostBySlug,
  saveBlogPosts,
  upsertBlogPost,
} from '@/lib/blog';

const createPost = (overrides: Partial<BlogPost> = {}): BlogPost => ({
  slug: 'test-post',
  title: 'Test Post',
  excerpt: 'Excerpt',
  date: '01.01.2026',
  readingTime: '5 мин',
  content: 'Content',
  ...overrides,
});

describe('blog helpers', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('returns base posts when storage is empty', () => {
    const allPosts = getBlogPosts();

    expect(allPosts.length).toBeGreaterThan(0);
    expect(getPostBySlug(allPosts[0].slug)).toEqual(allPosts[0]);
  });

  it('saves posts to localStorage', () => {
    const newPost = createPost({ slug: 'saved-post' });
    saveBlogPosts([newPost]);

    const stored = window.localStorage.getItem('lesya_blog_posts');
    expect(stored).toBe(JSON.stringify([newPost]));
  });

  it('loads posts from storage when fetch fails', async () => {
    const persisted = createPost({ slug: 'from-storage' });
    window.localStorage.setItem('lesya_blog_posts', JSON.stringify([persisted]));

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));

    const posts = await fetchBlogPosts();
    expect(posts).toEqual([persisted]);
  });

  it('fetches static blog data and caches it', async () => {
    const basePosts = getBlogPosts();
    const staticPosts = [createPost({ slug: 'static-post' })];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => staticPosts,
    }));

    const posts = await fetchBlogPosts();
    const merged = [...basePosts, ...staticPosts];
    expect(posts).toEqual(merged);
    expect(JSON.parse(window.localStorage.getItem('lesya_blog_posts') ?? '[]')).toEqual(merged);
  });

  it('upserts a blog post locally when supabase is not configured', async () => {
    const basePosts = getBlogPosts();
    const freshPost = createPost({ slug: 'upserted' });

    const response = await upsertBlogPost(freshPost);

    expect(response).toEqual([freshPost, ...basePosts]);
  });

  it('deletes a blog post locally when supabase is not configured', async () => {
    const basePosts = getBlogPosts();
    const removeSlug = basePosts[0].slug;

    const response = await deleteBlogPost(removeSlug);

    expect(response.find((item) => item.slug === removeSlug)).toBeUndefined();
    expect(JSON.parse(window.localStorage.getItem('lesya_blog_deleted') ?? '[]')).toContain(
      removeSlug
    );
  });

  it('filters deleted posts from base posts', () => {
    const basePosts = getBlogPosts();
    const removeSlug = basePosts[0].slug;
    window.localStorage.setItem('lesya_blog_deleted', JSON.stringify([removeSlug]));

    const filtered = getBlogPosts();

    expect(filtered.find((item) => item.slug === removeSlug)).toBeUndefined();
  });
});
