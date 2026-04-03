# LesyaPsych2

Сайт и блог психолога. Стек: React + TypeScript + Vite + Tailwind. Контент блога хранится в Supabase (Postgres + Storage). Админка доступна по `/?page=admin`.

## Быстрый старт

```bash
npm install
npm run dev
```

Приложение поднимется на `http://localhost:5173` (или другом порту, если занят).

## Основные страницы

- Главная: `/`
- Блог: `/?page=blog`
- Статья: `/?page=blog&post=<slug>`
- Админка блога: `/?page=admin`
- Юридические страницы:
  - Impressum: `/?page=impressum`
  - Datenschutzerklärung: `/?page=datenschutz`
  - AGB: `/?page=agb`

## Хранилище блога (Supabase)

### 1) Таблица

Создать таблицу и триггер:

```sql
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

drop trigger if exists set_blog_posts_updated_at on public.blog_posts;

create trigger set_blog_posts_updated_at
before update on public.blog_posts
for each row
execute function public.set_updated_at();
```

### 2) Storage bucket

Создайте публичный bucket `blog-covers` (Storage → Create bucket → Public = ON).

### 3) Переменные окружения

Локально (`.env.local`) и в Vercel:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
```

### 4) Безопасность (важно)

Сейчас админка без авторизации. Если нужна защита, подключите Supabase Auth или другой механизм (например, пароль на админку). Без этого любой, кто знает URL, сможет редактировать статьи.

## Админка блога

- Создание/редактирование статей в `/?page=admin`.
- Поле `slug` принимает только **латиницу, цифры и дефисы** (например, `primer-stati`).
- Обложки загружаются в Supabase Storage `blog-covers`.

### SEO-подсказки

- **Заголовок**: до 60 символов, ключевая фраза ближе к началу.
- **Slug**: только латиница/цифры/дефисы, без пробелов.
- **Краткий анонс**: 140–170 символов, ключевая фраза 1 раз.
- **Текст статьи**: короткие абзацы, ясное вступление.
- **Картинка**: 1200×630, JPG/WebP.

## Скрипты

- `npm run dev` — локальная разработка
- `npm run build` — сборка
- `npm test` — тесты (Vitest)
- `npm run preview` — предпросмотр сборки

## Деплой (Vercel)

- Репозиторий: GitHub → Vercel
- Корень проекта: `./`
- Vercel variables должны включать `VITE_SUPABASE_*` и `SUPABASE_*`.

## Структура проекта

- `src/lib/blog.ts` — логика блога, Supabase
- `src/sections/BlogAdmin.tsx` — админка
- `src/sections/BlogPage.tsx` — публичный блог
- `src/sections/LegalPage.tsx` — Impressum/Datenschutz/AGB
- `supabase/setup.sql` — схема БД

## Примечания

- При отсутствии Supabase посты берутся из локального `public/blog.json`.
- Для миграции старых постов используйте `public/blog.json` и скрипт или upsert через Supabase.
