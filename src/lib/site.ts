export const siteConfig = {
  name: "Grow With Neetu",
  title: "Grow With Neetu | Free MPSC Preparation, Notes, Current Affairs and Exam Strategy",
  description:
    "Comprehensive MPSC exam preparation platform by Neetu Tiwari. Free structured syllabus guides, subject notes, Maharashtra current affairs, PYQs, and strategy for MPSC Rajyaseva & Combined Exams.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://growwithneetu.com",
  creator: "Neetu Tiwari",
  locale: "en_IN",
  youtubeChannelUrl:
    process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL ?? "https://www.youtube.com/channel/UC5VgjG5dv42qYKxIYUXoqUw",
  youtubeHandle: process.env.YOUTUBE_CHANNEL_HANDLE ?? "@growwith_Neetu",
  email: "hello@growwithneetu.com",
  socials: {
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL ?? "https://www.youtube.com/channel/UC5VgjG5dv42qYKxIYUXoqUw",
    instagram: "https://www.instagram.com/growwithneetu_?",
    telegram: "https://t.me/"
  }
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Subjects", href: "/subjects" },
  { label: "Exams", href: "/exams" },
  { label: "Latest Videos", href: "/latest-videos" },
  { label: "Blog", href: "/blog" },
  { label: "Notes", href: "/notes" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
] as const;

export const seoKeywords = [
  "MPSC Rajyaseva Syllabus",
  "MPSC Prelims Strategy",
  "MPSC Mains Answer Writing",
  "MPSC Current Affairs",
  "MPSC Notes",
  "Maharashtra History for MPSC",
  "Social Reformers of Maharashtra",
  "Maharashtra Geography Notes",
  "Maharashtra Polity Panchayat Raj",
  "Maharashtra Economy & Budget",
  "MPSC Science Notes",
  "MPSC Preparation for Beginners",
  "Rajyaseva Preparation",
  "Combined Exam Group B Group C",
  "MPSC PYQs Previous Year Papers",
  "MPSC Strategy Neetu Tiwari",
  "PSI Preparation",
  "STI Preparation",
  "ASO Exam Strategy",
  "MPSC CSAT Strategy"
];

