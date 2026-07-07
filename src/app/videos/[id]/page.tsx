import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, PlayCircle, Share2 } from "lucide-react";
import { FaqList } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { SubscribeCta } from "@/components/cta-card";
import { VideoCard } from "@/components/video-card";
import { buildFaqs, buildVideoSummary, importantPoints, keyTakeaways } from "@/lib/content";
import { absoluteUrl, breadcrumbSchema, createMetadata, faqSchema, videoSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { subjects } from "@/lib/taxonomy";
import { getLatestVideos, getVideoById, youtubeEmbedUrl, youtubeWatchUrl } from "@/lib/youtube";

export const revalidate = 3600;

export async function generateStaticParams() {
  const videos = await getLatestVideos(24);
  return videos.map((video) => ({ id: video.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const video = await getVideoById(id);
  if (!video) return {};

  return createMetadata({
    title: `${video.title} | MPSC Video, Summary and Notes`,
    description: video.description,
    path: `/videos/${video.id}`,
    image: video.thumbnail,
    keywords: [...video.subjectSlugs, ...video.examSlugs]
  });
}

export default async function VideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const video = await getVideoById(id);
  if (!video) notFound();

  const allVideos = await getLatestVideos(12);
  const relatedVideos = allVideos.filter((item) => item.id !== video.id).slice(0, 3);
  const relatedSubjects = subjects.filter((subject) => video.subjectSlugs.includes(subject.slug));
  const faqs = buildFaqs(video.title);
  const pagePath = `/videos/${video.id}`;

  return (
    <article className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd
        data={[
          videoSchema(video, pagePath),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Latest Videos", path: "/latest-videos" },
            { name: video.title, path: pagePath }
          ])
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-10">
          <header>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-600">MPSC Video Lesson</p>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-slate-950 md:text-5xl">{video.title}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{video.description}</p>
          </header>

          <div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white p-3 shadow-xl shadow-blue-100">
            <div className="relative aspect-video overflow-hidden rounded-[1.5rem] bg-blue-50">
              <Image src={video.thumbnail} alt={video.title} fill priority sizes="(min-width: 1024px) 65vw, 100vw" className="object-cover" />
            </div>
          </div>

          <section className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm">
            <iframe
              src={youtubeEmbedUrl(video.id)}
              title={video.title}
              className="aspect-video w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </section>

          <ContentSection title="Video Summary">
            <p>{buildVideoSummary(video)}</p>
          </ContentSection>

          <ContentSection title="Important Points">
            <ul className="list-disc space-y-3 pl-5">
              {importantPoints(video).map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </ContentSection>

          <ContentSection title="Transcript">
            <p>
              Transcript ingestion is ready for CMS/API integration. When a transcript is available, publish it here
              to improve accessibility, long-tail SEO and revision value.
            </p>
          </ContentSection>

          <ContentSection title="Key Takeaways and Exam Relevance">
            <ul className="list-disc space-y-3 pl-5">
              {keyTakeaways(video).map((takeaway) => (
                <li key={takeaway}>{takeaway}</li>
              ))}
            </ul>
          </ContentSection>

          <section>
            <h2 className="mb-5 text-2xl font-black tracking-[-0.04em] text-slate-950">Frequently Asked Questions</h2>
            <FaqList faqs={faqs} />
          </section>

          <section>
            <SectionHeading title="Related MPSC Videos" description="Continue learning with similar lectures and revision resources." />
            <div className="grid gap-6 md:grid-cols-3">
              {relatedVideos.map((related) => (
                <VideoCard key={related.id} video={related} />
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[1.5rem] border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">Actions</h2>
            <div className="mt-5 space-y-3">
              <ActionLink href={youtubeWatchUrl(video.id)} label="Watch on YouTube" icon={<PlayCircle className="h-4 w-4" />} external />
              <ActionLink href={siteConfig.youtubeChannelUrl} label="Subscribe" icon={<PlayCircle className="h-4 w-4" />} external />
              <ActionLink href={`/notes/${video.id}`} label="Download Notes" icon={<Download className="h-4 w-4" />} />
              <ActionLink href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(absoluteUrl(pagePath))}&text=${encodeURIComponent(video.title)}`} label="Share Video" icon={<Share2 className="h-4 w-4" />} external />
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">Related Subjects</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {(relatedSubjects.length ? relatedSubjects : subjects.slice(0, 4)).map((subject) => (
                <Link key={subject.slug} href={`/subjects/${subject.slug}`} className="rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700 transition hover:bg-blue-100">
                  {subject.name}
                </Link>
              ))}
            </div>
          </div>

          <SubscribeCta compact />
        </aside>
      </div>
    </article>
  );
}

function ContentSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="prose-content rounded-[1.5rem] border border-blue-100 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-2xl">{title}</h2>
      {children}
    </section>
  );
}

function ActionLink({ href, label, icon, external = false }: { href: string; label: string; icon: React.ReactNode; external?: boolean }) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <span className="mr-2" aria-hidden="true">
        {icon}
      </span>
      {label}
    </Link>
  );
}
