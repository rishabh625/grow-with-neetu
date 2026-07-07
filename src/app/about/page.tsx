import Link from "next/link";
import { CheckCircle2, PlayCircle } from "lucide-react";
import { SubscribeCta } from "@/components/cta-card";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export const metadata = createMetadata({
  title: "About Grow With Neetu | MPSC Educator and Learning Mission",
  description: "Learn about Neetu's teaching philosophy, mission and free YouTube learning platform for MPSC aspirants.",
  path: "/about",
  keywords: ["Grow With Neetu", "MPSC educator", "MPSC YouTube channel"]
});

export default function AboutPage() {
  const values = [
    "Syllabus-first teaching for exam relevance.",
    "Simple explanations for beginners and repeat aspirants.",
    "Free access through YouTube with structured discovery on the website.",
    "Consistent revision through notes, current affairs and PYQs."
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-600">About</p>
      <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-slate-950 md:text-6xl">Helping Maharashtra aspirants learn with clarity.</h1>
      <p className="mt-6 text-lg leading-8 text-slate-600">
        {siteConfig.name} is an educational YouTube channel and learning portal for MPSC, Rajyaseva,
        Combined Exams and Maharashtra government exam preparation. The mission is to make structured,
        reliable and exam-oriented learning accessible to every aspirant.
      </p>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        {values.map((value) => (
          <div key={value} className="rounded-[1.5rem] border border-blue-100 bg-white p-6 shadow-sm">
            <CheckCircle2 aria-hidden="true" className="h-6 w-6 text-emerald-600" />
            <p className="mt-4 font-bold leading-7 text-slate-800">{value}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 rounded-[1.5rem] border border-blue-100 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-black tracking-[-0.04em] text-slate-950">Teaching Philosophy</h2>
        <p className="mt-4 leading-8 text-slate-600">
          The channel focuses on conceptual clarity, short notes, revision discipline and PYQ-oriented
          preparation. Each website page connects videos with subjects and exams so aspirants can find the
          right lecture from Google search or internal navigation.
        </p>
        <Link
          href={siteConfig.youtubeChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-700"
        >
          <PlayCircle aria-hidden="true" className="mr-2 h-4 w-4" />
          Visit YouTube Channel
        </Link>
      </section>

      <div className="mt-12">
        <SubscribeCta compact />
      </div>
    </div>
  );
}
