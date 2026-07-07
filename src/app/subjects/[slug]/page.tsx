import { notFound } from "next/navigation";
import { LinkCard } from "@/components/card-grid";
import { FaqList } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { SubscribeCta } from "@/components/cta-card";
import { VideoCard } from "@/components/video-card";
import { resources } from "@/lib/content";
import { breadcrumbSchema, createMetadata, faqSchema } from "@/lib/seo";
import { exams, getSubject, subjects } from "@/lib/taxonomy";
import { getLatestVideos } from "@/lib/youtube";

export const dynamic = "force-static";

export function generateStaticParams() {
  return subjects.map((subject) => ({ slug: subject.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const subject = getSubject(slug);
  if (!subject) return {};

  return createMetadata({
    title: `${subject.name} for MPSC | Videos, Notes, FAQs and PYQs`,
    description: subject.description,
    path: `/subjects/${subject.slug}`,
    keywords: subject.keywords
  });
}

export default async function SubjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const subject = getSubject(slug);
  if (!subject) notFound();

  const videos = await getLatestVideos(24);
  const relatedVideos = videos.filter((video) => video.subjectSlugs.includes(subject.slug)).slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Subjects", path: "/subjects" },
            { name: subject.name, path: `/subjects/${subject.slug}` }
          ]),
          faqSchema(subject.faqs)
        ]}
      />
      <SectionHeading
        eyebrow="Subject Hub"
        title={`${subject.name} for MPSC Preparation`}
        description={`${subject.description} Find latest videos, study notes, blog summaries, FAQs and exam-specific internal links.`}
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-12">
          <section>
            <h2 className="mb-5 text-2xl font-black tracking-[-0.04em] text-slate-950">Latest {subject.name} Videos</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {(relatedVideos.length ? relatedVideos : videos.slice(0, 4)).map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-5 text-2xl font-black tracking-[-0.04em] text-slate-950">Study Notes and Blogs</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {resources.slice(0, 4).map((resource) => (
                <LinkCard key={resource.href} title={resource.title} description={resource.description} href={resource.href} meta={resource.category} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-5 text-2xl font-black tracking-[-0.04em] text-slate-950">Frequently Asked Questions</h2>
            <FaqList faqs={subject.faqs} />
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[1.5rem] border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">Related Exam Pages</h2>
            <div className="mt-4 space-y-3">
              {exams.slice(0, 6).map((exam) => (
                <LinkCard key={exam.slug} title={exam.name} description={exam.description} href={`/exams/${exam.slug}`} meta="Exam" />
              ))}
            </div>
          </div>
          <SubscribeCta compact />
        </aside>
      </div>
    </div>
  );
}
