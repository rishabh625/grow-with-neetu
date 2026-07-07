import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { SubscribeCta } from "@/components/cta-card";
import { VideoCard } from "@/components/video-card";
import { articleFromVideo, buildFaqs, importantPoints, keyTakeaways } from "@/lib/content";
import { articleSchema, breadcrumbSchema, createMetadata, faqSchema } from "@/lib/seo";
import { subjects } from "@/lib/taxonomy";
import { getLatestVideos, getVideoById } from "@/lib/youtube";

export const revalidate = 3600;

export async function generateStaticParams() {
  const videos = await getLatestVideos(24);
  return videos.map((video) => ({ slug: video.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const video = await getVideoById(slug);
  if (!video) return {};
  const article = articleFromVideo(video);

  return createMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.slug}`,
    image: video.thumbnail,
    keywords: [...video.subjectSlugs, ...video.examSlugs]
  });
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const video = await getVideoById(slug);
  if (!video) notFound();

  const article = articleFromVideo(video);
  const faqs = buildFaqs(video.title);
  const relatedVideos = (await getLatestVideos(12)).filter((item) => item.id !== video.id).slice(0, 3);
  const relatedSubjects = subjects.filter((subject) => video.subjectSlugs.includes(subject.slug));

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd
        data={[
          articleSchema({
            title: article.title,
            description: article.description,
            path: `/blog/${article.slug}`,
            publishedAt: article.publishedAt,
            image: video.thumbnail
          }),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: article.title, path: `/blog/${article.slug}` }
          ])
        ]}
      />
      <header>
        <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-600">MPSC Study Article</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-slate-950 md:text-5xl">{article.title}</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">{article.description}</p>
      </header>

      <div className="prose-content mt-10 rounded-[1.5rem] border border-blue-100 bg-white p-8 shadow-sm">
        {article.body.split("\n\n").map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <h2>Key Concepts</h2>
        <ul>
          {importantPoints(video).map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <h2>Important Facts and Takeaways</h2>
        <ul>
          {keyTakeaways(video).map((takeaway) => (
            <li key={takeaway}>{takeaway}</li>
          ))}
        </ul>
        <h2>Internal Links</h2>
        <p>
          Continue with the original <Link href={`/videos/${video.id}`}>video lesson</Link>, browse{" "}
          <Link href="/subjects">subject hubs</Link> or explore <Link href="/exams">exam preparation pages</Link>.
        </p>
      </div>

      <section className="mt-12">
        <h2 className="mb-5 text-2xl font-black tracking-[-0.04em] text-slate-950">Related Subjects</h2>
        <div className="flex flex-wrap gap-3">
          {(relatedSubjects.length ? relatedSubjects : subjects.slice(0, 5)).map((subject) => (
            <Link key={subject.slug} href={`/subjects/${subject.slug}`} className="rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">
              {subject.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-5 text-2xl font-black tracking-[-0.04em] text-slate-950">Frequently Asked Questions</h2>
        <FaqList faqs={faqs} />
      </section>

      <section className="mt-12">
        <SectionHeading title="Related Videos" description="Watch more lessons connected to this article." />
        <div className="grid gap-6 md:grid-cols-3">
          {relatedVideos.map((related) => (
            <VideoCard key={related.id} video={related} />
          ))}
        </div>
      </section>

      <div className="mt-12">
        <SubscribeCta compact />
      </div>
    </article>
  );
}
