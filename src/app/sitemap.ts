import type { MetadataRoute } from "next";
import { resources } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { exams, subjects } from "@/lib/taxonomy";
import { getLatestVideos } from "@/lib/youtube";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const videos = await getLatestVideos(50);
  const now = new Date();

  const staticRoutes = ["/", "/subjects", "/exams", "/latest-videos", "/blog", "/notes", "/about", "/contact", "/search"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: path === "/" ? 1 : 0.8
  }));

  const subjectRoutes = subjects.map((subject) => ({
    url: `${siteConfig.url}/subjects/${subject.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  const examRoutes = exams.map((exam) => ({
    url: `${siteConfig.url}/exams/${exam.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85
  }));

  const videoRoutes = videos.flatMap((video) => [
    {
      url: `${siteConfig.url}/videos/${video.id}`,
      lastModified: new Date(video.publishedAt),
      changeFrequency: "daily" as const,
      priority: 0.9
    },
    {
      url: `${siteConfig.url}/blog/${video.id}`,
      lastModified: new Date(video.publishedAt),
      changeFrequency: "daily" as const,
      priority: 0.8
    }
  ]);

  const noteRoutes = resources.map((resource) => ({
    url: `${siteConfig.url}${resource.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  return [...staticRoutes, ...subjectRoutes, ...examRoutes, ...videoRoutes, ...noteRoutes];
}
