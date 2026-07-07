import { subjects } from "@/lib/taxonomy";

export type Video = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  duration: string;
  views?: number;
  thumbnail: string;
  subjectSlugs: string[];
  examSlugs: string[];
};

type YouTubeSearchItem = {
  id: { videoId?: string };
};

type YouTubeVideoItem = {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      maxres?: { url: string };
      high?: { url: string };
      medium?: { url: string };
    };
  };
  contentDetails: {
    duration: string;
  };
  statistics?: {
    viewCount?: string;
  };
};

const fallbackVideos: Video[] = [
  {
    id: "co1F49pqSYg",
    title: "MPSC Exams, Reforms and way forward",
    description:
      "Neetu Tiwari discusses recent MPSC exams, notified reforms from the commission, and the way forward for aspirants.",
    publishedAt: "2026-07-01T14:05:03Z",
    duration: "YouTube",
    views: 44,
    thumbnail: "https://i4.ytimg.com/vi/co1F49pqSYg/hqdefault.jpg",
    subjectSlugs: ["strategy", "current-affairs"],
    examSlugs: ["rajyaseva", "combined-exam"]
  },
  {
    id: "8kfKgNy2qXY",
    title: "All the best for MPSC Rajyaseva Prelims 2026",
    description:
      "A calm final message for Rajyaseva Prelims aspirants with exam-hall reminders and best wishes.",
    publishedAt: "2026-05-30T13:23:23Z",
    duration: "YouTube",
    views: 3404,
    thumbnail: "https://i1.ytimg.com/vi/8kfKgNy2qXY/hqdefault.jpg",
    subjectSlugs: ["strategy"],
    examSlugs: ["rajyaseva"]
  },
  {
    id: "X0OL2KeGQkw",
    title: "MPSC Rajyaseva 2025 detailed analysis with logical tricks",
    description:
      "Detailed analysis of the 2025 Maharashtra State Services exam with logical tricks for building the right exam mindset.",
    publishedAt: "2026-05-29T14:29:20Z",
    duration: "YouTube",
    views: 8796,
    thumbnail: "https://i1.ytimg.com/vi/X0OL2KeGQkw/hqdefault.jpg",
    subjectSlugs: ["strategy"],
    examSlugs: ["rajyaseva"]
  },
  {
    id: "1ixb3n9KsGY",
    title: "Logical Eliminations and Tricks for MPSC Rajyaseva Prelims 2026",
    description:
      "Smart PYQ-based elimination patterns and tricks to help aspirants score better in MPSC Rajyaseva Prelims 2026.",
    publishedAt: "2026-05-28T17:47:09Z",
    duration: "YouTube",
    views: 21420,
    thumbnail: "https://i2.ytimg.com/vi/1ixb3n9KsGY/hqdefault.jpg",
    subjectSlugs: ["strategy"],
    examSlugs: ["rajyaseva"]
  },
  {
    id: "T8dvL_QQDjM",
    title: "MPSC Rajyaseva 2024 detailed analysis with logical tricks",
    description:
      "A detailed analysis of the 2024 Maharashtra State Services exam focused on exam temperament and logical solving.",
    publishedAt: "2026-05-27T16:23:15Z",
    duration: "YouTube",
    views: 9751,
    thumbnail: "https://i1.ytimg.com/vi/T8dvL_QQDjM/hqdefault.jpg",
    subjectSlugs: ["strategy"],
    examSlugs: ["rajyaseva"]
  }
];

export async function getLatestVideos(maxResults = 12): Promise<Video[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    return fallbackVideos.slice(0, maxResults);
  }

  const searchUrl = new URL("https://www.googleapis.com/youtube/v3/search");
  searchUrl.searchParams.set("key", apiKey);
  searchUrl.searchParams.set("channelId", channelId);
  searchUrl.searchParams.set("part", "id");
  searchUrl.searchParams.set("order", "date");
  searchUrl.searchParams.set("type", "video");
  searchUrl.searchParams.set("maxResults", String(maxResults));

  const searchResponse = await fetch(searchUrl, { next: { revalidate: 3600 } });
  if (!searchResponse.ok) {
    return fallbackVideos.slice(0, maxResults);
  }

  const searchData = (await searchResponse.json()) as { items: YouTubeSearchItem[] };
  const ids = searchData.items.map((item) => item.id.videoId).filter(Boolean).join(",");

  if (!ids) {
    return fallbackVideos.slice(0, maxResults);
  }

  const videoUrl = new URL("https://www.googleapis.com/youtube/v3/videos");
  videoUrl.searchParams.set("key", apiKey);
  videoUrl.searchParams.set("id", ids);
  videoUrl.searchParams.set("part", "snippet,contentDetails,statistics");

  const videoResponse = await fetch(videoUrl, { next: { revalidate: 3600 } });
  if (!videoResponse.ok) {
    return fallbackVideos.slice(0, maxResults);
  }

  const videoData = (await videoResponse.json()) as { items: YouTubeVideoItem[] };

  return videoData.items.map((item) => ({
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    publishedAt: item.snippet.publishedAt,
    duration: formatDuration(item.contentDetails.duration),
    views: item.statistics?.viewCount ? Number(item.statistics.viewCount) : undefined,
    thumbnail:
      item.snippet.thumbnails.maxres?.url ??
      item.snippet.thumbnails.high?.url ??
      item.snippet.thumbnails.medium?.url ??
      `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`,
    subjectSlugs: inferSubjects(item.snippet.title + " " + item.snippet.description),
    examSlugs: inferExams(item.snippet.title + " " + item.snippet.description)
  }));
}

export async function getVideoById(id: string) {
  const videos = await getLatestVideos(50);
  return videos.find((video) => video.id === id) ?? fallbackVideos.find((video) => video.id === id);
}

export function youtubeWatchUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function youtubeEmbedUrl(id: string) {
  return `https://www.youtube.com/embed/${id}`;
}

function inferSubjects(text: string) {
  const normalized = text.toLowerCase();
  const matches = subjects
    .filter((subject) => normalized.includes(subject.name.toLowerCase()) || normalized.includes(subject.slug))
    .map((subject) => subject.slug);

  return matches.length ? matches.slice(0, 4) : ["strategy"];
}

function inferExams(text: string) {
  const normalized = text.toLowerCase();
  const exams = [
    ["rajyaseva", "rajyaseva"],
    ["combined-exam", "combined"],
    ["psi", "psi"],
    ["sti", "sti"],
    ["aso", "aso"],
    ["forest", "forest"],
    ["talathi", "talathi"],
    ["zp", "zp"],
    ["police-bharti", "police"]
  ] as const;
  const matches = exams.filter(([, keyword]) => normalized.includes(keyword)).map(([slug]) => slug);

  return matches.length ? matches.slice(0, 4) : ["rajyaseva", "combined-exam"];
}

function formatDuration(duration: string) {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return duration;

  const [, hours, minutes, seconds] = match;
  const parts = [hours, minutes ?? "0", seconds ?? "00"].filter((part, index) => index > 0 || part);
  return parts.map((part) => part.padStart(2, "0")).join(":").replace(/^0/, "");
}
