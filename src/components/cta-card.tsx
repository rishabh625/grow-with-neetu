import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function SubscribeCta({ compact = false }: { compact?: boolean }) {
  return (
    <section className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-700 to-emerald-600 p-8 text-white shadow-sm md:p-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-100">Free YouTube Learning</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] md:text-4xl">
            Subscribe for structured MPSC preparation.
          </h2>
          {!compact ? (
            <p className="mt-3 max-w-2xl text-base leading-7 text-blue-50">
              Get the latest lectures, current affairs, notes and exam strategy directly on YouTube.
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={siteConfig.youtubeChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-blue-700 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700"
          >
            <PlayCircle aria-hidden="true" className="mr-2 h-4 w-4" />
            Subscribe
          </Link>
          <Link
            href="/latest-videos"
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Watch Latest
            <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
