import { siteConfig } from "@/lib/site";
import { getLatestVideos, youtubeWatchUrl } from "@/lib/youtube";

export const revalidate = 3600;

export async function GET() {
  const videos = await getLatestVideos(50);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${videos
  .map(
    (video) => `<url>
  <loc>${escapeXml(`${siteConfig.url}/videos/${video.id}`)}</loc>
  <video:video>
    <video:thumbnail_loc>${escapeXml(video.thumbnail)}</video:thumbnail_loc>
    <video:title>${escapeXml(video.title)}</video:title>
    <video:description>${escapeXml(video.description)}</video:description>
    <video:player_loc>${escapeXml(youtubeWatchUrl(video.id))}</video:player_loc>
    <video:publication_date>${video.publishedAt}</video:publication_date>
  </video:video>
</url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
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
