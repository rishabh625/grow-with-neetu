import { notFound } from "next/navigation";
import { LinkCard } from "@/components/card-grid";
import { FaqList } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { SubscribeCta } from "@/components/cta-card";
import { VideoCard } from "@/components/video-card";
import { resources } from "@/lib/content";
import { breadcrumbSchema, createMetadata, educationalCourseSchema, faqSchema } from "@/lib/seo";
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
    title: `${subject.name} for Civil Services (MPSC-focused) | Notes, Strategy & PYQs | Grow With Neetu`,
    description: subject.description,
    path: `/subjects/${subject.slug}`,
    keywords: subject.keywords
  });
}

export default async function SubjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const subject = getSubject(slug);
  if (!subject) notFound();

  const videos = await getLatestVideos();
  const relatedVideos = videos.filter((video) => video.subjectSlugs.includes(subject.slug));

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd
        data={[
          educationalCourseSchema({
            title: `${subject.name} for Civil Services (MPSC-focused) Exam Preparation`,
            description: subject.description,
            path: `/subjects/${subject.slug}`
          }),
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
        title={`${subject.name} for Civil Services (MPSC-focused)`}
        description={`${subject.description} Find latest videos, study notes, blog summaries, FAQs and exam-specific internal links—starting with MPSC patterns and applicable to UPSC/UPPSC/BPSC preparation.`}
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-12">
          <section>
            <h2 className="mb-5 text-2xl font-black tracking-[-0.04em] text-slate-950">Latest {subject.name} Videos</h2>
            {relatedVideos.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {relatedVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            ) : (
              <div className="rounded-[1.75rem] border border-dashed border-blue-200 bg-blue-50/50 p-8 text-center">
                <p className="text-base font-bold text-slate-800">No dedicated {subject.name} videos uploaded yet.</p>
                <p className="mt-2 text-sm text-slate-600">
                  New lectures are added regularly. In the meantime, explore {subject.name} study notes below or check out all latest uploads.
                </p>
                <div className="mt-5">
                  <a
                    href="/latest-videos"
                    className="inline-flex items-center rounded-full bg-blue-600 px-5 py-2.5 text-xs font-black text-white shadow-sm transition hover:bg-blue-700"
                  >
                    Browse All Videos
                  </a>
                </div>
              </div>
            )}
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
