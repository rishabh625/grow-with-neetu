export type NotePdf = {
  slug: string;
  title: string;
  description: string;
  subject: string;
  subjectSlug: string;
  fileName: string;
  fileSize: string;
  updatedAt: string;
  keywords: string[];
};

export const notePdfs: NotePdf[] = [
  {
    slug: "ancient-india",
    title: "Ancient India Notes",
    description:
      "Structured notes on Ancient Indian history covering dynasties, culture, economy and exam-focused facts for MPSC Prelims and Mains.",
    subject: "History",
    subjectSlug: "history",
    fileName: "ancient-india.pdf",
    fileSize: "17.7 MB",
    updatedAt: "2025-04-20",
    keywords: ["Ancient India Notes", "MPSC History Notes", "Ancient India PDF"]
  },
  {
    slug: "mediaeval-india",
    title: "Mediaeval India Notes",
    description:
      "Mediaeval Indian history notes with sultanate, Mughal and regional developments mapped for Maharashtra competitive exams.",
    subject: "History",
    subjectSlug: "history",
    fileName: "mediaeval-india.pdf",
    fileSize: "14.5 MB",
    updatedAt: "2025-04-21",
    keywords: ["Mediaeval India Notes", "Medieval History MPSC", "MPSC History PDF"]
  },
  {
    slug: "buddhism-and-jainism",
    title: "Buddhism & Jainism Notes",
    description:
      "Clear notes on Buddhism and Jainism — origins, teachings, councils, art and architecture for quick revision.",
    subject: "History",
    subjectSlug: "history",
    fileName: "buddhism-and-jainism.pdf",
    fileSize: "4.3 MB",
    updatedAt: "2025-04-28",
    keywords: ["Buddhism Jainism Notes", "MPSC Religion Notes", "Ancient Philosophy PDF"]
  },
  {
    slug: "books-and-authors",
    title: "Books and Authors",
    description:
      "Important books and authors compilation for general studies and current affairs-linked literature questions.",
    subject: "General Studies",
    subjectSlug: "general-studies",
    fileName: "books-and-authors.pdf",
    fileSize: "3.4 MB",
    updatedAt: "2025-04-20",
    keywords: ["Books and Authors", "MPSC Books Authors", "Literature Notes PDF"]
  },
  {
    slug: "ethics-practice-booklet",
    title: "Ethics Practice Booklet",
    description:
      "Practice booklet for ethics, integrity and aptitude — case-style questions and revision-friendly framing for Mains.",
    subject: "Ethics",
    subjectSlug: "ethics",
    fileName: "ethics-practice-booklet.pdf",
    fileSize: "2.5 MB",
    updatedAt: "2025-04-20",
    keywords: ["Ethics Practice", "MPSC Ethics Notes", "Integrity Aptitude PDF"]
  },
  {
    slug: "ethics-examples",
    title: "Ethics Examples",
    description:
      "Worked ethics examples and answer approaches to help aspirants convert theory into structured, exam-ready responses.",
    subject: "Ethics",
    subjectSlug: "ethics",
    fileName: "ethics-examples.pdf",
    fileSize: "7.9 MB",
    updatedAt: "2025-04-20",
    keywords: ["Ethics Examples", "MPSC Ethics Case Studies", "Ethics Answer Writing"]
  }
];

export const noteSubjects = Array.from(
  new Map(notePdfs.map((note) => [note.subjectSlug, { slug: note.subjectSlug, name: note.subject }])).values()
);

export function getNoteBySlug(slug: string) {
  return notePdfs.find((note) => note.slug === slug);
}

export function getNoteFileUrl(note: NotePdf) {
  return `/notes/${note.fileName}`;
}

export function getRelatedNotes(slug: string, limit = 3) {
  const current = getNoteBySlug(slug);
  if (!current) return notePdfs.slice(0, limit);

  return notePdfs
    .filter((note) => note.slug !== slug)
    .sort((a, b) => Number(b.subjectSlug === current.subjectSlug) - Number(a.subjectSlug === current.subjectSlug))
    .slice(0, limit);
}

export function notesGroupedBySubject() {
  return noteSubjects.map((subject) => ({
    ...subject,
    notes: notePdfs.filter((note) => note.subjectSlug === subject.slug)
  }));
}
