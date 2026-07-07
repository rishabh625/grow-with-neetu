import { articleFromVideo } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { getLatestVideos } from "@/lib/youtube";

export const dynamic = "force-static";

export async function GET() {
  const videos = await getLatestVideos(50);
  const articles = videos.map(articleFromVideo);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-IN</language>
    ${articles
      .map(
        (article) => `<item>
      <title>${escapeXml(article.title)}</title>
      <link>${siteConfig.url}/blog/${article.slug}</link>
      <guid>${siteConfig.url}/blog/${article.slug}</guid>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(article.description)}</description>
    </item>`
      )
      .join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
