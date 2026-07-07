'use client';

import Link from "next/link";
import { SearchBox } from "@/components/search-box";
import { exams, subjects } from "@/lib/taxonomy";
import { articleFromVideo } from "@/lib/content";
import { getLatestVideos } from "@/lib/youtube";
import { useEffect, useState } from "react";
import type { Video } from "@/lib/youtube";

export default function SearchClient() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function loadVideos() {
      const videos = await getLatestVideos(24);
      setVideos(videos);
    }
    loadVideos();

    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") || "");
  }, []);

  const articles = videos.map(articleFromVideo);

  const results = [
    ...videos.map((video) => ({ type: "Video", title: video.title, description: video.description, href: `/videos/${video.id}` })),
    ...articles.map((article) => ({ type: "Blog", title: article.title, description: article.description, href: `/blog/${article.slug}` })),
    ...subjects.map((subject) => ({ type: "Subject", title: subject.name, description: subject.description, href: `/subjects/${subject.slug}` })),
    ...exams.map((exam) => ({ type: "Exam", title: exam.name, description: exam.description, href: `/exams/${exam.slug}` }))
  ].filter((item) => {
    if (!query) return true;
    return `${item.type} ${item.title} ${item.description}`.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-600">Search</p>
      <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-slate-950 md:text-5xl">Find MPSC learning content faster.</h1>
      <div className="mt-8">
        <SearchBox defaultValue={query} />
      </div>

      <p className="mt-8 text-sm font-bold text-slate-600">
        {query ? `${results.length} results for "${query}"` : `${results.length} searchable pages and videos`}
      </p>

      <div className="mt-6 space-y-4">
        {results.map((result) => (
          <Link key={`${result.type}-${result.href}`} href={result.href} className="block rounded-[1.25rem] border border-blue-100 bg-white p-5 shadow-sm transition hover:shadow-md">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">{result.type}</span>
            <h2 className="mt-2 text-xl font-black tracking-[-0.03em] text-slate-950">{result.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{result.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
