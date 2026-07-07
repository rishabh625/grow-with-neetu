export const siteConfig = {
  name: "Grow With Neetu",
  title: "Grow With Neetu | Free MPSC Preparation, Notes, Current Affairs and Exam Strategy",
  description:
    "Free structured YouTube lectures, notes, current affairs, PYQs and exam strategy for MPSC, Rajyaseva, Combined Exams and Maharashtra government exam aspirants.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://growwithneetu.com",
  creator: "Neetu Tiwari",
  locale: "en_IN",
  youtubeChannelUrl:
    process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL ?? "https://www.youtube.com/channel/UC5VgjG5dv42qYKxIYUXoqUw",
  youtubeHandle: process.env.YOUTUBE_CHANNEL_HANDLE ?? "@growwith_Neetu",
  email: "hello@growwithneetu.com",
  socials: {
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL ?? "https://www.youtube.com/channel/UC5VgjG5dv42qYKxIYUXoqUw",
    instagram: "https://www.instagram.com/",
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
  "MPSC Current Affairs",
  "MPSC Notes",
  "MPSC History",
  "MPSC Geography",
  "MPSC Polity",
  "MPSC Economics",
  "MPSC Science",
  "MPSC Preparation",
  "Rajyaseva Preparation",
  "Combined Exam Preparation",
  "MPSC PYQs",
  "MPSC Strategy",
  "Talathi Preparation",
  "PSI Preparation",
  "STI Preparation"
];
