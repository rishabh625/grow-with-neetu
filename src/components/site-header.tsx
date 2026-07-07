import Link from "next/link";
import { BookOpen, Menu, PlayCircle } from "lucide-react";
import { navItems, siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
            <BookOpen aria-hidden="true" className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-base font-black tracking-[-0.03em] text-slate-950">{siteConfig.name}</span>
            <span className="block text-xs font-semibold text-emerald-700">MPSC Learning Portal</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={siteConfig.youtubeChannelUrl}
            className="hidden rounded-full bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:inline-flex"
            target="_blank"
            rel="noreferrer"
          >
            <PlayCircle aria-hidden="true" className="mr-2 h-4 w-4" />
            Subscribe
          </Link>
          <button
            type="button"
            aria-label="Open navigation menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-blue-100 bg-white text-slate-800 shadow-sm lg:hidden"
          >
            <Menu aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
