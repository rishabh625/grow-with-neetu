# Grow With Neetu

Production-ready SEO-first website for the educational YouTube channel "Grow With Neetu".

## Tech Stack

- Next.js 15 App Router
- TypeScript
- TailwindCSS
- MDX-enabled content pipeline
- YouTube Data API with ISR
- Dynamic SEO routes, video sitemap and RSS feed

## Folder Structure

```txt
src/
  app/
    blog/[slug]/
    exams/[slug]/
    notes/[slug]/
    subjects/[slug]/
    videos/[id]/
    rss.xml/
    video-sitemap.xml/
    layout.tsx
    page.tsx
    robots.ts
    sitemap.ts
  components/
    card-grid.tsx
    cta-card.tsx
    faq.tsx
    json-ld.tsx
    search-box.tsx
    section-heading.tsx
    site-footer.tsx
    site-header.tsx
    video-card.tsx
  lib/
    cms-schema.ts
    content.ts
    seo.ts
    site.ts
    taxonomy.ts
    utils.ts
    youtube.ts
design-system/
  MASTER.md
```

## Environment

Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://growwithneetu.com
YOUTUBE_API_KEY=your_youtube_api_key
YOUTUBE_CHANNEL_ID=UC5VgjG5dv42qYKxIYUXoqUw
YOUTUBE_CHANNEL_HANDLE=@growwith_Neetu
NEXT_PUBLIC_YOUTUBE_CHANNEL_URL=https://www.youtube.com/channel/UC5VgjG5dv42qYKxIYUXoqUw
```

If YouTube credentials are missing, the app uses fallback sample videos so local builds still work.

## SEO Architecture

- `VideoObject`, `Article`, `FAQPage`, `BreadcrumbList`, `Person`, `Organization`, `WebSite` and `SearchAction` JSON-LD.
- Canonical URLs, OpenGraph and Twitter Card metadata.
- `robots.txt`, `sitemap.xml`, `/video-sitemap.xml` and `/rss.xml`.
- Static generation for taxonomy pages.
- ISR for YouTube-backed pages with a 1-hour revalidation window.

## CMS Schema

The CMS blueprint lives in `src/lib/cms-schema.ts`. It supports videos, generated articles, notes, subjects and exam hubs. Sanity can map these fields directly, or MDX frontmatter can use the same shape.

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
```

## Deployment

Deploy on Vercel. Add the environment variables above, then connect the repository. `vercel.json` pins the framework, install/build commands and Mumbai region.
