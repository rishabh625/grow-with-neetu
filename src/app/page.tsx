import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, PlayCircle, Search } from "lucide-react";
import { LinkCard } from "@/components/card-grid";
import { SubscribeCta } from "@/components/cta-card";
import { SectionHeading } from "@/components/section-heading";
import { VideoCard } from "@/components/video-card";
import { SearchBox } from "@/components/search-box";
import { resources } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { exams, subjects } from "@/lib/taxonomy";
import { getLatestVideos, youtubeWatchUrl } from "@/lib/youtube";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata = createMetadata({
  title: "Civil Services Exam Preparation, Notes & Strategy | Grow With Neetu (MPSC-focused)",
  description:
    "MPSC-focused civil services exam preparation by Neetu Tiwari. Free structured syllabus guides, subject notes, current affairs, PYQs, and strategy for MPSC Rajyaseva & Combined Exams—also useful for UPSC, UPPSC, BPSC and other civil services.",
  path: "/",
  keywords: [
    "MPSC Preparation",
    "UPSC Preparation",
    "UPPSC Preparation",
    "BPSC Preparation",
    "MPSC Rajyaseva Syllabus",
    "MPSC Combined Exam",
    "MPSC Prelims Strategy",
    "MPSC Notes PDF",
    "Maharashtra Current Affairs",
    "MPSC PYQs Previous Year Questions"
  ]
});

export default async function HomePage() {
  const videos = await getLatestVideos(6);
  const featured = videos.length > 0 ? videos[0] : undefined;

  return (
    <>
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#e9fbf4,transparent_35%),radial-gradient(circle_at_top_right,#eaf2ff,transparent_35%)]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-black text-blue-700 shadow-sm">
              <CheckCircle2 aria-hidden="true" className="mr-2 h-4 w-4 text-emerald-600" />
              Neetu Tiwari&apos;s civil services learning portal (MPSC-focused)
            </div>
            <h1 className="text-5xl font-black tracking-[-0.06em] text-slate-950 md:text-6xl lg:text-7xl">
              Grow with Neetu.
              <span className="mt-2 block text-3xl font-semibold text-blue-700 md:text-4xl lg:text-5xl">
  Civil Services Exam Preparation & Strategy (MPSC-focused).
</span>           </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Structured civil services guidance with MPSC Rajyaseva & Combined Exams as the main focus. Featuring PYQ-based
              analysis, high-yield notes, CSAT tricks, and step-by-step Prelims & Mains strategies.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Access free video lectures, subject hubs, current affairs updates, and study material organized
              for aspirants of MPSC, UPSC, UPPSC, BPSC and other state/union civil services.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/latest-videos"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-4 text-sm font-black text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <PlayCircle aria-hidden="true" className="mr-2 h-5 w-5" />
                Watch Latest Videos
              </Link>
              <Link
                href="/subjects"
                className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-white px-6 py-4 text-sm font-black text-blue-700 shadow-sm transition hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <BookOpen aria-hidden="true" className="mr-2 h-5 w-5" />
                Explore Subjects
              </Link>
            </div>
            <div className="mt-10">
              <SearchBox />
            </div>
          </div>

          <div className="rounded-[2rem] border border-blue-100 bg-white p-3 shadow-2xl shadow-blue-100">
            <div className="overflow-hidden rounded-[1.5rem]">
              <div className="relative aspect-[4/5] bg-blue-50">
                <Image
                  src="/images/neetu-tiwari.png"
                  alt="Neetu Tiwari"
                  fill
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="bg-white p-6">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-600">About Neetu</p>
                <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-slate-950">
                  Focused guidance for serious aspirants.
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Neetu&apos;s videos combine exam analysis, mindset, revision discipline and actionable
                  strategies for competitive exam preparation.
                </p>
                {featured ? (
                  <Link href={`/videos/${featured.id}`} className="mt-5 inline-flex items-center text-sm font-black text-blue-700">
                    Watch latest upload
                    <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Latest Lectures"
          title="Latest videos from Neetu Tiwari"
          description="Real uploads from the official YouTube channel, organized into searchable video pages with summaries and exam relevance."
          href="/latest-videos"
          action="View all videos"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, index) => (
            <VideoCard key={video.id} video={video} priority={index < 2} />
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Subject Hubs"
            title="Organized by topics aspirants search for"
            description="Build topical authority with subject pages for current affairs, history, polity, geography, economics and more."
            href="/subjects"
            action="Explore subjects"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {subjects.slice(0, 8).map((subject) => (
              <LinkCard key={subject.slug} title={subject.name} description={subject.description} href={`/subjects/${subject.slug}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <SectionHeading
            eyebrow="Exam Preparation"
            title="Dedicated exam pages for MPSC & other civil services"
            description="Target exam-specific intent for MPSC and other state/union civil services, with syllabus-aligned videos, notes, PYQs and strategy."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {exams.slice(0, 6).map((exam) => (
              <LinkCard key={exam.slug} title={exam.name} description={exam.description} href={`/exams/${exam.slug}`} meta="Exam Hub" />
            ))}
          </div>
        </div>
        <aside className="rounded-[2rem] border border-emerald-100 bg-emerald-50 p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">Free Resources</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950">Notes and PDFs ready to download.</h2>
          <div className="mt-6 space-y-4">
            {resources.slice(0, 4).map((resource) => (
              <Link key={resource.href} href={resource.href} className="block rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">{resource.category}</span>
                <span className="mt-1 block font-black text-slate-950">{resource.title}</span>
                <span className="mt-1 block text-sm leading-6 text-slate-600">{resource.description}</span>
              </Link>
            ))}
          </div>
          <Link
            href="/notes"
            className="mt-6 inline-flex text-sm font-black text-emerald-800 transition hover:text-emerald-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            Browse all notes
          </Link>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SubscribeCta />
      </section>
    </>
  );
}
