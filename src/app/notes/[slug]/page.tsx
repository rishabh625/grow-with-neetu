import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, FileText, PlayCircle } from "lucide-react";
import { NoteCard } from "@/components/note-card";
import { SubscribeCta } from "@/components/cta-card";
import { JsonLd } from "@/components/json-ld";
import { getNoteBySlug, getNoteFileUrl, getRelatedNotes, notePdfs } from "@/lib/notes";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return notePdfs.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  return createMetadata({
    title: note ? `${note.title} PDF | Grow With Neetu` : "MPSC Notes Download | Grow With Neetu",
    description: note?.description ?? "Download MPSC notes and related study resources.",
    path: `/notes/${slug}`,
    keywords: note?.keywords ?? ["MPSC Notes", "MPSC PDF Downloads"]
  });
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  if (!note) notFound();

  const fileUrl = getNoteFileUrl(note);
  const related = getRelatedNotes(note.slug);
  const subjectHref =
    note.subjectSlug === "ethics" || note.subjectSlug === "general-studies"
      ? "/subjects"
      : `/subjects/${note.subjectSlug}`;

  const digitalDocumentSchema = {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    name: note.title,
    description: note.description,
    url: `${siteConfig.url}/notes/${note.slug}`,
    encodingFormat: "application/pdf",
    inLanguage: "en-IN",
    dateModified: note.updatedAt,
    author: {
      "@type": "Person",
      name: siteConfig.creator
    },
    isAccessibleForFree: true,
    learningResourceType: "Notes"
  };

  return (
    <div className="relative overflow-hidden">
      <JsonLd data={digitalDocumentSchema} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[22rem] bg-[radial-gradient(ellipse_at_top_left,_rgba(11,95,255,0.12),_transparent_50%),radial-gradient(ellipse_at_90%_10%,_rgba(0,166,118,0.1),_transparent_35%)]"
      />

      <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/notes"
          className="inline-flex items-center text-sm font-bold text-blue-700 transition hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <ArrowLeft aria-hidden="true" className="mr-2 h-4 w-4" />
          All notes
        </Link>

        <p className="mt-8 text-sm font-black uppercase tracking-[0.2em] text-emerald-600">{note.subject}</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-slate-950 md:text-5xl">{note.title}</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">{note.description}</p>

        <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-blue-100 bg-white p-8 shadow-[0_18px_40px_-28px_rgba(11,95,255,0.55)]">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                <FileText aria-hidden="true" className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-slate-950">Download this PDF</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Free study PDF · {note.fileSize} · Updated {new Date(note.updatedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                })}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={fileUrl}
              download
              className="inline-flex cursor-pointer items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-black text-white transition duration-200 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <Download aria-hidden="true" className="mr-2 h-4 w-4" />
              Download PDF
            </a>
            <Link
              href={siteConfig.youtubeChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-blue-200 px-6 py-3 text-sm font-black text-blue-700 transition duration-200 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <PlayCircle aria-hidden="true" className="mr-2 h-4 w-4" />
              Watch on YouTube
            </Link>
            <Link
              href={subjectHref}
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-emerald-200 px-6 py-3 text-sm font-black text-emerald-700 transition duration-200 hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              Browse subjects
            </Link>
          </div>
        </div>

        {related.length > 0 ? (
          <section className="mt-16">
            <h2 className="text-2xl font-black tracking-[-0.04em] text-slate-950">Related notes</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">Keep revising with nearby topics from the same library.</p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {related.map((item) => (
                <NoteCard key={item.slug} note={item} />
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-12">
          <SubscribeCta compact />
        </div>
      </div>
    </div>
  );
}
