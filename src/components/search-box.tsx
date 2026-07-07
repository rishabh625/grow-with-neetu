"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function SearchBox({ defaultValue = "" }: { defaultValue?: string }) {
  const router = useRouter();

  return (
    <form
      className="relative max-w-2xl"
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const query = String(form.get("q") ?? "").trim();
        router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
      }}
    >
      <label htmlFor="site-search" className="sr-only">
        Search videos, blogs, subjects and exams
      </label>
      <Search aria-hidden="true" className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      <input
        id="site-search"
        name="q"
        defaultValue={defaultValue}
        placeholder="Search MPSC videos, notes, subjects..."
        className="h-14 w-full rounded-full border border-blue-100 bg-white pl-13 pr-32 text-base font-semibold text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
      <button
        type="submit"
        className="absolute right-2 top-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-black text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
}
