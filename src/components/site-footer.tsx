import Link from "next/link";

import { navItems, siteConfig } from "@/lib/site";
import { exams, subjects } from "@/lib/taxonomy";

export function SiteFooter() {
  return (
    <footer className="border-t border-blue-100 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,0.85fr))] lg:px-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="text-2xl font-black tracking-[-0.04em] text-white">{siteConfig.name}</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
            Free structured YouTube lectures, notes, current affairs and exam strategy for MPSC,
            Rajyaseva, Combined Exams and Maharashtra government exam aspirants.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={siteConfig.youtubeChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              <img src="/icons/youtube.svg" alt="" className="mr-2 h-4 w-4" />
              Watch on YouTube
            </Link>
            <Link
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              <img src="/icons/instagram.svg" alt="" className="mr-2 h-4 w-4" />
              Follow on Instagram
            </Link>
          </div>
        </div>
        <FooterColumn title="Explore" links={navItems.map((item) => ({ label: item.label, href: item.href }))} />
        <FooterColumn
          title="Top Subjects"
          links={subjects.slice(0, 6).map((subject) => ({ label: subject.name, href: `/subjects/${subject.slug}` }))}
        />
        <FooterColumn
          title="Exam Hubs"
          links={exams.slice(0, 6).map((exam) => ({ label: exam.name, href: `/exams/${exam.slug}` }))}
        />
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {siteConfig.name}. Built for aspirants.
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="font-black text-white">{title}</p>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-slate-300 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
