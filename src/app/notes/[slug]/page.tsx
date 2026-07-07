import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, PlayCircle } from "lucide-react";
import { SubscribeCta } from "@/components/cta-card";
import { resources } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return resources.map((resource) => ({
    slug: resource.href.split("/").pop()
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = resources.find((item) => item.href.endsWith(slug));

  return createMetadata({
    title: resource ? `${resource.title} | Grow With Neetu` : "MPSC Notes Download | Grow With Neetu",
    description: resource?.description ?? "Download MPSC notes and related study resources.",
    path: `/notes/${slug}`,
    keywords: ["MPSC Notes", "MPSC PDF Downloads"]
  });
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = resources.find((item) => item.href.endsWith(slug)) ?? {
    title: "Video Notes",
    description: "Notes for this video can be connected from Sanity CMS or MDX frontmatter.",
    category: "Notes"
  };

  if (!resource) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-600">{resource.category}</p>
      <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-slate-950 md:text-5xl">{resource.title}</h1>
      <p className="mt-5 text-lg leading-8 text-slate-600">{resource.description}</p>

      <div className="mt-10 rounded-[1.5rem] border border-blue-100 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-black tracking-[-0.04em] text-slate-950">Download Notes</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Connect a `fileUrl` in Sanity CMS or MDX frontmatter to make this button download the final PDF.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/notes" className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-700">
            <Download aria-hidden="true" className="mr-2 h-4 w-4" />
            Browse Notes
          </Link>
          <Link href={siteConfig.youtubeChannelUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-blue-200 px-6 py-3 text-sm font-black text-blue-700 transition hover:bg-blue-50">
            <PlayCircle aria-hidden="true" className="mr-2 h-4 w-4" />
            Watch on YouTube
          </Link>
        </div>
      </div>

      <div className="mt-12">
        <SubscribeCta compact />
      </div>
    </div>
  );
}
