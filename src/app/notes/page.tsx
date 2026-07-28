import { BookOpen, Download } from "lucide-react";
import { NoteCard } from "@/components/note-card";
import { SubscribeCta } from "@/components/cta-card";
import { notePdfs, noteSubjects, notesGroupedBySubject } from "@/lib/notes";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata = createMetadata({
  title: "Free MPSC Notes and PDFs | History, Ethics and Study Downloads",
  description:
    "Download free MPSC notes and PDFs — Ancient India, Mediaeval India, Buddhism & Jainism, Ethics practice and more from Grow With Neetu.",
  path: "/notes",
  keywords: [
    "MPSC Notes",
    "MPSC PDF Downloads",
    "Ancient India Notes",
    "Ethics Notes MPSC",
    "Free MPSC Study Material"
  ]
});

export default function NotesPage() {
  const groups = notesGroupedBySubject();

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_top,_rgba(11,95,255,0.12),_transparent_55%),radial-gradient(ellipse_at_80%_20%,_rgba(0,166,118,0.12),_transparent_40%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">Free Notes</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-slate-950 md:text-5xl">
            Download MPSC notes and PDFs
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Subject-wise handwritten-style notes for History, Ethics and General Studies — free to download and revise
            anytime.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-600">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 shadow-sm">
              <BookOpen aria-hidden="true" className="h-4 w-4 text-blue-600" />
              {notePdfs.length} PDFs ready
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/80 px-4 py-2 shadow-sm">
              <Download aria-hidden="true" className="h-4 w-4 text-emerald-600" />
              Instant free download
            </span>
          </div>
        </section>

        <nav aria-label="Browse notes by subject" className="mt-10 flex flex-wrap gap-2">
          {noteSubjects.map((subject) => (
            <a
              key={subject.slug}
              href={`#${subject.slug}`}
              className="cursor-pointer rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition duration-200 hover:border-blue-300 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {subject.name}
            </a>
          ))}
        </nav>

        <div className="mt-14 space-y-16">
          {groups.map((group) => (
            <section key={group.slug} id={group.slug} className="scroll-mt-28">
              <div className="mb-6">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">{group.name}</p>
                <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-slate-950 md:text-3xl">
                  {group.name} notes
                </h2>
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {group.notes.map((note) => (
                  <NoteCard key={note.slug} note={note} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16">
          <SubscribeCta compact />
        </div>
      </div>
    </div>
  );
}
