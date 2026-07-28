import { notePdfs } from "@/lib/notes";
import type { Video } from "@/lib/youtube";

export type Resource = {
  title: string;
  description: string;
  href: string;
  category: "Notes" | "PDF" | "Books" | "PYQ" | "Current Affairs" | "History" | "Ethics" | "General Studies";
};

export const resources: Resource[] = notePdfs.map((note) => ({
  title: note.title,
  description: note.description,
  href: `/notes/${note.slug}`,
  category: note.subject as Resource["category"]
}));

export type Article = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  subjectSlugs: string[];
  examSlugs: string[];
  body: string;
};

export function articleFromVideo(video: Video): Article {
  return {
    slug: video.id,
    title: `${video.title} | Notes, Summary and Key Takeaways`,
    description: `Read the complete study summary, key facts, exam relevance and FAQs for ${video.title}.`,
    publishedAt: video.publishedAt,
    subjectSlugs: video.subjectSlugs,
    examSlugs: video.examSlugs,
    body: buildArticleBody(video)
  };
}

export function buildVideoSummary(video: Video) {
  return `${video.title} is designed for Maharashtra competitive exam aspirants who want clear concept coverage, exam-oriented revision and direct linkage with MPSC PYQs. Use this lesson with short notes and repeated revision.`;
}

export function importantPoints(video: Video) {
  return [
    "Understand the topic through syllabus-first preparation.",
    "Connect concepts with MPSC, Rajyaseva and Combined Exam question patterns.",
    "Revise facts using short notes instead of passive rewatching.",
    `Watch the full lecture on YouTube and revisit the ${video.duration} lesson during revision.`
  ];
}

export function keyTakeaways(video: Video) {
  return [
    `This video is useful for ${video.examSlugs.map(titleCase).join(", ")} preparation.`,
    "Prioritize recurring concepts, factual clarity and PYQ-based revision.",
    "Pair the lecture with notes, current affairs updates and mock practice."
  ];
}

export function buildFaqs(topic: string) {
  return [
    {
      question: `Is ${topic} important for MPSC preparation?`,
      answer: `Yes. ${topic} can help with prelims, mains and interview-oriented understanding when studied with the official syllabus and PYQs.`
    },
    {
      question: `How should I revise ${topic}?`,
      answer: "Create short notes, revise important facts weekly and solve previous year questions after watching the lecture."
    },
    {
      question: "Can I prepare from YouTube lectures for free?",
      answer: "Yes. Grow With Neetu organizes free YouTube lectures into structured subject and exam pages for easier discovery and revision."
    }
  ];
}

export function titleCase(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildArticleBody(video: Video) {
  return [
    `This article expands the YouTube lecture "${video.title}" into a study-friendly format for MPSC aspirants.`,
    "Start by watching the complete lecture, then use the summary below for revision. Focus on keywords, important facts, syllabus mapping and PYQ links.",
    "Important concepts include the core definition, exam relevance, current affairs connection, factual examples and common mistakes made by aspirants.",
    "For best results, revise the notes after 24 hours, again after one week and once before the mock test."
  ].join("\n\n");
}
