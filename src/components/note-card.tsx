import Link from "next/link";
import { ArrowRight, Download, FileText } from "lucide-react";
import type { NotePdf } from "@/lib/notes";
import { getNoteFileUrl } from "@/lib/notes";

export function NoteCard({ note }: { note: NotePdf }) {
  const fileUrl = getNoteFileUrl(note);

  return (
    <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] border border-blue-100/80 bg-white/90 p-6 shadow-[0_10px_30px_-18px_rgba(11,95,255,0.45)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_22px_40px_-24px_rgba(11,95,255,0.55)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-blue-100 to-emerald-100 opacity-70 blur-2xl transition duration-300 group-hover:opacity-100"
      />
      <div className="relative">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">{note.subject}</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            <FileText aria-hidden="true" className="h-3.5 w-3.5" />
            PDF
          </span>
        </div>
        <h3 className="text-xl font-black tracking-[-0.03em] text-slate-950">
          <Link
            href={`/notes/${note.slug}`}
            className="rounded-sm transition hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {note.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{note.description}</p>
      </div>

      <div className="relative mt-6 flex flex-col gap-3">
        <p className="text-xs font-semibold text-slate-500">{note.fileSize} · Free download</p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <a
            href={fileUrl}
            download
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-black text-white transition duration-200 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <Download aria-hidden="true" className="mr-2 h-4 w-4" />
            Download PDF
          </a>
          <Link
            href={`/notes/${note.slug}`}
            className="inline-flex cursor-pointer items-center justify-center rounded-full border border-blue-200 bg-white px-5 py-3 text-sm font-black text-blue-700 transition duration-200 hover:border-blue-400 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Details
            <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
