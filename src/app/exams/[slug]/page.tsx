import { notFound } from "next/navigation";
import { LinkCard } from "@/components/card-grid";
import { FaqList } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { SubscribeCta } from "@/components/cta-card";
import { VideoCard } from "@/components/video-card";
import { resources } from "@/lib/content";
import { breadcrumbSchema, createMetadata, faqSchema } from "@/lib/seo";
import { exams, getExam, subjects } from "@/lib/taxonomy";
import { getLatestVideos } from "@/lib/youtube";

export const revalidate = 3600;

export function generateStaticParams() {
  return exams.map((exam) => ({ slug: exam.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exam = getExam(slug);
  if (!exam) return {};

  return createMetadata({
    title: `${exam.name} Preparation | Videos, Notes, Strategy and PYQs`,
    description: exam.description,
    path: `/exams/${exam.slug}`,
    keywords: exam.keywords
  });
}

export default async function ExamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exam = getExam(slug);
  if (!exam) notFound();

  const videos = await getLatestVideos(24);
  const relatedVideos = videos.filter((video) => video.examSlugs.includes(exam.slug)).slice(0, 6);
  const focusSubjects = subjects.filter((subject) =>
    exam.focusAreas.some((focus) => subject.name.toLowerCase().includes(focus.toLowerCase()) || focus.toLowerCase().includes(subject.name.toLowerCase()))
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Exams", path: "/exams" },
            { name: exam.name, path: `/exams/${exam.slug}` }
          ]),
          faqSchema(exam.faqs)
        ]}
      />
      <SectionHeading
        eyebrow="Exam Preparation"
        title={`${exam.name} Preparation`}
        description={`${exam.description} Use this page for videos, notes, subject priorities, PYQs and strategy.`}
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-12">
          <section className="rounded-[1.75rem] border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black tracking-[-0.04em] text-slate-950">High-priority Areas</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {exam.focusAreas.map((area) => (
                <span key={area} className="rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">
                  {area}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-5 text-2xl font-black tracking-[-0.04em] text-slate-950">Latest {exam.name} Videos</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {(relatedVideos.length ? relatedVideos : videos.slice(0, 4)).map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-5 text-2xl font-black tracking-[-0.04em] text-slate-950">Notes and Practice Resources</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {resources.map((resource) => (
                <LinkCard key={resource.href} title={resource.title} description={resource.description} href={resource.href} meta={resource.category} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-5 text-2xl font-black tracking-[-0.04em] text-slate-950">Frequently Asked Questions</h2>
            <FaqList faqs={exam.faqs} />
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[1.5rem] border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">Related Subjects</h2>
            <div className="mt-4 space-y-3">
              {(focusSubjects.length ? focusSubjects : subjects.slice(0, 6)).map((subject) => (
                <LinkCard key={subject.slug} title={subject.name} description={subject.description} href={`/subjects/${subject.slug}`} meta="Subject" />
              ))}
            </div>
          </div>
          <SubscribeCta compact />
        </aside>
      </div>
    </div>
  );
}
