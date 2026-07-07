import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { SubscribeCta } from "@/components/cta-card";
import { articleFromVideo } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { getLatestVideos } from "@/lib/youtube";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-static";

export const metadata = createMetadata({
  title: "MPSC Blog | Notes, Video Summaries, Current Affairs and Strategy",
  description: "Read SEO-friendly MPSC articles generated from Grow With Neetu videos with summaries, concepts, facts and FAQs.",
  path: "/blog",
  keywords: ["MPSC blog", "MPSC article", "MPSC video summary"]
});

export default async function BlogPage() {
  const videos = await getLatestVideos(24);
  const articles = videos.map(articleFromVideo);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Blog"
        title="Study articles generated from YouTube lessons"
        description="Each article targets educational keywords with summaries, key concepts, important facts, FAQs and internal links."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="rounded-[1.5rem] border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="inline-flex items-center text-xs font-bold text-slate-500">
              <CalendarDays aria-hidden="true" className="mr-1.5 h-4 w-4" />
              {formatDate(article.publishedAt)}
            </span>
            <h2 className="mt-4 text-xl font-black tracking-[-0.03em] text-slate-950">{article.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{article.description}</p>
            <span className="mt-5 inline-block text-sm font-black text-blue-700">Read article</span>
          </Link>
        ))}
      </div>
      <div className="mt-12">
        <SubscribeCta compact />
      </div>
    </div>
  );
}
