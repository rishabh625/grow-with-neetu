"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, Menu, PlayCircle, X } from "lucide-react";
import { navItems, siteConfig } from "@/lib/site";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/92 backdrop-blur">
      <div className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => setMenuOpen(false)}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
            <BookOpen aria-hidden="true" className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-base font-black tracking-[-0.03em] text-slate-950">{siteConfig.name}</span>
            <span className="block text-xs font-semibold text-emerald-700">Civil Services & MPSC Learning Portal</span>
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
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-blue-100 bg-white text-slate-800 shadow-sm transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden"
          >
            {menuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            className="fixed inset-0 top-[5.25rem] z-40 bg-slate-950/40 lg:hidden"
            onClick={() => setMenuOpen(false)}
          />
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="relative z-50 border-t border-blue-100 bg-white shadow-lg lg:hidden"
          >
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-sm font-bold text-slate-900 transition hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={siteConfig.youtubeChannelUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:hidden"
              >
                <PlayCircle aria-hidden="true" className="mr-2 h-4 w-4" />
                Subscribe on YouTube
              </Link>
            </div>
          </nav>
        </>
      ) : null}
    </header>
  );
}
