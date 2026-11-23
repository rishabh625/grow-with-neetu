import Link from "next/link";
import Image from "next/image";
import { Mail, PlayCircle, ExternalLink } from "lucide-react";
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
        For student queries, collaborations, notes, mentorship, and educational partnerships, use the contact links below.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <Link
          href={siteConfig.socials.instagram}
          target="_blank"
          rel="noreferrer"
          className="group rounded-[1.5rem] border border-pink-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <div className="flex items-center justify-between">
            <div className="relative h-8 w-8">
              <Image src="/icons/instagram.svg" alt="Instagram" width={32} height={32} className="rounded-lg" />
            </div>
            <ExternalLink aria-hidden="true" className="h-4 w-4 text-slate-400 group-hover:text-pink-600" />
          </div>
          <h2 className="mt-4 text-xl font-black text-slate-950 group-hover:text-pink-600">Instagram</h2>
          <p className="mt-2 text-sm text-slate-600">
            DM <span className="font-bold text-pink-600">@growwithneetu_</span> for direct preparation questions &amp; mentorship.
          </p>
          <span className="mt-4 inline-block text-xs font-bold text-pink-700 underline underline-offset-2 break-all">
            https://www.instagram.com/growwithneetu_
          </span>
        </Link>

        <Link
          href={`mailto:${siteConfig.email}`}
          className="group rounded-[1.5rem] border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <div className="flex items-center justify-between">
            <Mail aria-hidden="true" className="h-8 w-8 text-blue-700" />
            <ExternalLink aria-hidden="true" className="h-4 w-4 text-slate-400 group-hover:text-blue-700" />
          </div>
          <h2 className="mt-4 text-xl font-black text-slate-950 group-hover:text-blue-700">Email</h2>
          <p className="mt-2 text-sm text-slate-600">
            For collaborations, notes exchange, feedback, and official communications.
          </p>
          <span className="mt-4 inline-block text-xs font-bold text-blue-700 underline underline-offset-2 break-all">
            {siteConfig.email}
          </span>
        </Link>

        <Link
          href={siteConfig.youtubeChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="group rounded-[1.5rem] border border-red-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <div className="flex items-center justify-between">
            <PlayCircle aria-hidden="true" className="h-8 w-8 text-red-600" />
            <ExternalLink aria-hidden="true" className="h-4 w-4 text-slate-400 group-hover:text-red-600" />
          </div>
          <h2 className="mt-4 text-xl font-black text-slate-950 group-hover:text-red-600">YouTube</h2>
          <p className="mt-2 text-sm text-slate-600">
            Watch video lectures, post comments, and engage in the community tab.
          </p>
          <span className="mt-4 inline-block text-xs font-bold text-red-600 underline underline-offset-2">
            Grow With Neetu
          </span>
        </Link>
      </div>

      <div className="mt-12 rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-emerald-50/50 p-8 shadow-sm">
        <h2 className="text-2xl font-black tracking-[-0.04em] text-slate-950">How to Contact &amp; Connect</h2>
        <div className="mt-5 space-y-4 text-slate-700">
          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pink-100 text-xs font-black text-pink-700">1</span>
            <div>
              <p className="text-base font-bold text-slate-950">Instagram Direct Message (DM) — Quickest Response</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                For personal guidance, preparation doubts, or syllabus navigation questions, message Neetu directly on Instagram at{" "}
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-pink-600 underline underline-offset-2 hover:text-pink-700"
                >
                  https://www.instagram.com/growwithneetu_
                </a>
                .
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-black text-blue-700">2</span>
            <div>
              <p className="text-base font-bold text-slate-950">Email Support — Notes &amp; Educational Collaborations</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                For sharing study material, proposing educational partnerships, or detailed long-form queries, write to{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-bold text-blue-700 underline underline-offset-2 hover:text-blue-800"
                >
                  {siteConfig.email}
                </a>
                .
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-black text-red-700">3</span>
            <div>
              <p className="text-base font-bold text-slate-950">YouTube Community &amp; Video Discussion</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                To discuss a specific lecture, request a topic, or review PYQ solutions, drop a comment on our{" "}
                <a
                  href={siteConfig.youtubeChannelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-red-600 underline underline-offset-2 hover:text-red-700"
                >
                  YouTube Channel
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
