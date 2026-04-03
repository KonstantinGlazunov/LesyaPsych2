-- Supabase schema for blog posts
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  date text,
  reading_time text,
  cover_image text,
  content text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_updated_at_idx on public.blog_posts(updated_at desc);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace trigger set_blog_posts_updated_at
before update on public.blog_posts
for each row
execute function public.set_updated_at();

-- Storage bucket for cover images (public read)
-- Run in SQL editor if needed:
-- select storage.create_bucket('blog-covers', public := true);
