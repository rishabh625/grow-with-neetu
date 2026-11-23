import { cache } from "react";

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

type YouTubePlaylistItem = {
  snippet?: {
    publishedAt?: string;
    title?: string;
    description?: string;
    thumbnails?: {
      maxres?: { url: string };
      high?: { url: string };
      medium?: { url: string };
    };
    resourceId?: {
      videoId?: string;
    };
  };
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
    subjectSlugs: ["strategy", "pyqs", "csat"],
    examSlugs: ["rajyaseva"]
  },
  {
    id: "mvPU3pirb9I",
    title: "135th birth anniversary of B. R. Ambedkar — a true architect of equality and justice.",
    description:
      "A tribute to Dr. B. R. Ambedkar discussing his foundational contributions to Indian history, constitution, equality and economic thoughts.",
    publishedAt: "2026-04-14T09:30:00Z",
    duration: "YouTube",
    views: 1250,
    thumbnail: "https://i.ytimg.com/vi/mvPU3pirb9I/hqdefault.jpg",
    subjectSlugs: ["history", "polity", "economics"],
    examSlugs: ["rajyaseva", "combined-exam"]
  }
];

let fetchCachePromise: Promise<Video[]> | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 60 * 1000;

async function fetchAllLatestVideos(): Promise<Video[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    console.warn("YouTube API Key or Channel ID missing from environment. Using fallback videos.");
    return fallbackVideos;
  }

  try {
    const uploadsPlaylistId = channelId.startsWith("UC")
      ? "UU" + channelId.slice(2)
      : channelId;

    const playlistUrl = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
    playlistUrl.searchParams.set("key", apiKey);
    playlistUrl.searchParams.set("playlistId", uploadsPlaylistId);
    playlistUrl.searchParams.set("part", "snippet");
    playlistUrl.searchParams.set("maxResults", "50");

    const playlistResponse = await fetch(playlistUrl.toString(), { next: { revalidate: 3600 } });
    if (!playlistResponse.ok) {
      const errText = await playlistResponse.text();
      console.error(`YouTube Playlist API error (${playlistResponse.status}):`, errText);
      return fallbackVideos;
    }

    const playlistData = (await playlistResponse.json()) as { items?: YouTubePlaylistItem[] };
    const items = playlistData.items ?? [];
    const videoIds = items
      .map((item) => item.snippet?.resourceId?.videoId)
      .filter((id): id is string => Boolean(id))
      .join(",");

    if (!videoIds) {
      console.warn("No video IDs found in YouTube playlist response.");
      return fallbackVideos;
    }

    const videoUrl = new URL("https://www.googleapis.com/youtube/v3/videos");
    videoUrl.searchParams.set("key", apiKey);
    videoUrl.searchParams.set("id", videoIds);
    videoUrl.searchParams.set("part", "snippet,contentDetails,statistics");

    const videoResponse = await fetch(videoUrl.toString(), { next: { revalidate: 3600 } });
    if (!videoResponse.ok) {
      const errText = await videoResponse.text();
      console.error(`YouTube Videos API error (${videoResponse.status}):`, errText);
      return fallbackVideos;
    }

    const videoData = (await videoResponse.json()) as { items?: YouTubeVideoItem[] };
    const fetchedVideos = videoData.items ?? [];

    if (fetchedVideos.length === 0) {
      return fallbackVideos;
    }

    return fetchedVideos.map((item) => ({
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
  } catch (err) {
    console.error("Failed to fetch YouTube videos dynamically:", err);
    return fallbackVideos;
  }
}

export const getLatestVideos = cache(async function getLatestVideos(maxResults = 12): Promise<Video[]> {
  const now = Date.now();
  if (!fetchCachePromise || now - lastCacheTime > CACHE_TTL_MS) {
    lastCacheTime = now;
    fetchCachePromise = fetchAllLatestVideos().catch((err) => {
      fetchCachePromise = null;
      console.error("Error in cached YouTube fetch:", err);
      return fallbackVideos;
    });
  }

  const videos = await fetchCachePromise;
  return videos.slice(0, maxResults);
});

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

const SUBJECT_PATTERNS: Record<string, (string | RegExp)[]> = {
  "history": [
    /\bhistory\b/i,
    /\bitihas\b/i,
    /\bambedkar\b/i,
    /\bgandhi\b/i,
    /\bnehru\b/i,
    /\bshivaji\b/i,
    /\bancient\b/i,
    /\bmedieval\b/i,
    /\bmodern history\b/i,
    /\bfreedom struggle\b/i,
    /\brevolt\b/i,
    /\bsocial reformers?\b/i
  ],
  "polity": [
    /\bpolity\b/i,
    /\bconstitution\b/i,
    /\bsamvidhan\b/i,
    /\bparliament\b/i,
    /\bfadnavis\b/i,
    /\bpost preference\b/i,
    /\binterview dates\b/i,
    /\btimetable changed\b/i,
    /\blaw\b/i,
    /\bcommission\b/i,
    /\breforms\b/i,
    /\bgovernance\b/i,
    /\bpanchayat\b/i
  ],
  "geography": [
    /\bgeography\b/i,
    /\bbhugol\b/i,
    /\bmonsoon\b/i,
    /\bclimate\b/i,
    /\briver\b/i,
    /\bsoil\b/i,
    /\bplateau\b/i,
    /\bmaps?\b/i
  ],
  "economics": [
    /\beconomics?\b/i,
    /\beconomy\b/i,
    /\bbudget\b/i,
    /\brupee\b/i,
    /\brbi\b/i,
    /\bgdp\b/i,
    /\binflation\b/i,
    /\bproblem of the rupee\b/i
  ],
  "environment": [
    /\benvironment\b/i,
    /\becology\b/i,
    /\bcop\b/i,
    /\bozone\b/i,
    /\btreaty\b/i,
    /\btreaties\b/i,
    /\bbiodiversity\b/i,
    /\bforest service\b/i,
    /\bforests?\b/i,
    /\brio earth summit\b/i,
    /\bclimate change\b/i,
    /\bparyavaran\b/i
  ],
  "science": [
    /\bscience\b/i,
    /\bphysics\b/i,
    /\bchemistry\b/i,
    /\bbiology\b/i,
    /\bozone layer\b/i,
    /\bisro\b/i,
    /\btechnology\b/i
  ],
  "current-affairs": [
    /\bcurrent affairs\b/i,
    /\bnewspaper\b/i,
    /\bnews\b/i,
    /\bpaper leaks?\b/i,
    /\bprotest\b/i,
    "आक्रोश",
    "आंदोलन",
    /\bresult\b/i,
    /\binterview delay\b/i,
    /\bnotification out\b/i,
    /\bdrug inspector\b/i,
    /\bcop\b/i,
    /\bfadnavis\b/i,
    /\b70th bpsc\b/i,
    /\b72nd bpsc\b/i,
    /\bexam cancelled\b/i,
    /\bupdate\b/i
  ],
  "marathi-grammar": [
    /\bmarathi\b/i,
    "मराठी",
    /\bvyakaran\b/i,
    /\blanguage paper\b/i
  ],
  "english": [
    /\benglish\b/i,
    /\bvocabulary\b/i,
    /\bgrammar\b/i,
    /\breading comprehension\b/i
  ],
  "csat": [
    /\bcsat\b/i,
    /\baptitude\b/i,
    /\bcomprehension\b/i,
    /\beliminations?\b/i,
    /\btricks\b/i,
    /\blogical\b/i
  ],
  "reasoning": [
    /\breasoning\b/i,
    /\blogical reasoning\b/i,
    /\banalytical\b/i
  ],
  "maths": [
    /\bmaths?\b/i,
    /\bmathematics\b/i,
    /\bquant\b/i,
    /\barithmetic\b/i
  ],
  "pyqs": [
    /\bpyqs?\b/i,
    /\bprevious year\b/i,
    /\bpaper analysis\b/i,
    /\bmarks discrepancy\b/i,
    /\bcutoff\b/i
  ],
  "mock-tests": [
    /\bmock tests?\b/i,
    /\btest series\b/i
  ],
  "strategy": [
    /\bstrategy\b/i,
    /\bhow to prepare\b/i,
    /\bsyllabus\b/i,
    /\bbooklist\b/i,
    /\bprelims\b/i,
    /\bmains\b/i,
    /\banswer writing\b/i,
    /\bnotes from newspaper\b/i,
    /\bncerts\b/i,
    /\bdisappear for 60 days\b/i,
    /\bdistraction journal\b/i,
    /\bpost preference\b/i
  ],
  "motivation": [
    /\bmotivation\b/i,
    /\bmindset\b/i,
    /\banxiety\b/i,
    /\bfears?\b/i,
    /\boverthinking\b/i,
    /\bmental health\b/i,
    /\bdiscipline\b/i,
    /\bfocus\b/i,
    /\basset\b/i,
    /\bfark hai\b/i,
    /\bhappiness\b/i,
    /\bsaying no\b/i,
    /\bdistraction\b/i,
    /\bconsistency\b/i,
    /\bhabits?\b/i
  ]
};

function inferSubjects(text: string): string[] {
  const matches: string[] = [];

  for (const [subjectSlug, patterns] of Object.entries(SUBJECT_PATTERNS)) {
    const isMatch = patterns.some((p) => {
      if (typeof p === "string") {
        return text.includes(p);
      }
      return p.test(text);
    });
    if (isMatch) {
      matches.push(subjectSlug);
    }
  }

  // Do NOT blindly assign strategy or history to personal/unrelated posts
  return matches.slice(0, 4);
}

function inferExams(text: string) {
  const normalized = text.toLowerCase();
  const exams = [
    ["rajyaseva", /\b(rajyaseva|राज्यसेवा)\b/i],
    ["combined-exam", /\b(combined|गट ब|गट क)\b/i],
    ["psi", /\bpsi\b/i],
    ["sti", /\bsti\b/i],
    ["aso", /\baso\b/i],
    ["forest", /\bforest\b/i],
    ["talathi", /\btalathi\b/i],
    ["zp", /\bzp\b/i],
    ["police-bharti", /\bpolice\b/i]
  ] as const;

  const matches = exams
    .filter(([, pattern]) => pattern.test(normalized))
    .map(([slug]) => slug);

  if (matches.length > 0) {
    return matches.slice(0, 4);
  }

  // Check if MPSC or general Maharashtra civil service exam is mentioned
  if (/\bmpsc\b/i.test(normalized)) {
    return ["rajyaseva", "combined-exam"];
  }

  return [];
}

function formatDuration(duration: string) {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return duration;

  const [, hours, minutes, seconds] = match;
  const parts = [hours, minutes ?? "0", seconds ?? "00"].filter((part, index) => index > 0 || part);
  return parts.map((part) => part.padStart(2, "0")).join(":").replace(/^0/, "");
}
