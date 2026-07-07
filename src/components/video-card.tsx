import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Eye, PlayCircle } from "lucide-react";
import type { Video } from "@/lib/youtube";
import { formatDate, formatViews } from "@/lib/utils";

export function VideoCard({ video, priority = false }: { video: Video; priority?: boolean }) {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-blue-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/videos/${video.id}`} className="block focus:outline-none focus:ring-2 focus:ring-blue-500">
        <div className="relative aspect-video overflow-hidden bg-blue-50">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            className="object-cover transition duration-300 group-hover:scale-105"
          />
          <span className="absolute bottom-3 right-3 rounded-full bg-slate-950/85 px-3 py-1 text-xs font-black text-white">
            {video.duration}
          </span>
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-xs font-black text-blue-700 shadow-sm">
            <PlayCircle aria-hidden="true" className="mr-1 h-3.5 w-3.5" />
            Lecture
          </span>
        </div>
        <div className="p-5">
          <h3 className="line-clamp-2 text-lg font-black tracking-[-0.03em] text-slate-950 group-hover:text-blue-700">
            {video.title}
          </h3>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{video.description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500">
            <span className="inline-flex items-center">
              <CalendarDays aria-hidden="true" className="mr-1.5 h-4 w-4" />
              {formatDate(video.publishedAt)}
            </span>
            <span className="inline-flex items-center">
              <Eye aria-hidden="true" className="mr-1.5 h-4 w-4" />
              {formatViews(video.views)}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
