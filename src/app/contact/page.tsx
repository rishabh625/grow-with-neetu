import Link from "next/link";
import { Mail, PlayCircle } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export const metadata = createMetadata({
  title: "Contact Grow With Neetu | MPSC Learning Support",
  description: "Contact Grow With Neetu for collaborations, student queries, notes and educational support.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-600">Contact</p>
      <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-slate-950 md:text-6xl">Connect with Grow With Neetu.</h1>
      <p className="mt-6 text-lg leading-8 text-slate-600">
        For student queries, collaborations, notes and educational partnerships, use the contact links below.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <Link href={`mailto:${siteConfig.email}`} className="rounded-[1.5rem] border border-blue-100 bg-white p-6 shadow-sm transition hover:shadow-xl">
          <Mail aria-hidden="true" className="h-7 w-7 text-blue-700" />
          <h2 className="mt-4 text-xl font-black text-slate-950">Email</h2>
          <p className="mt-2 text-sm text-slate-600">{siteConfig.email}</p>
        </Link>
        <Link href={siteConfig.youtubeChannelUrl} target="_blank" rel="noreferrer" className="rounded-[1.5rem] border border-blue-100 bg-white p-6 shadow-sm transition hover:shadow-xl">
          <PlayCircle aria-hidden="true" className="h-7 w-7 text-emerald-600" />
          <h2 className="mt-4 text-xl font-black text-slate-950">YouTube</h2>
          <p className="mt-2 text-sm text-slate-600">Watch lectures and subscribe for updates.</p>
        </Link>
      </div>
    </div>
  );
}
