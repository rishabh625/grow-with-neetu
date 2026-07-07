import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function LinkCard({
  title,
  description,
  href,
  meta
}: {
  title: string;
  description: string;
  href: string;
  meta?: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-[1.5rem] border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {meta ? <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-emerald-600">{meta}</p> : null}
      <h3 className="text-xl font-black tracking-[-0.03em] text-slate-950 group-hover:text-blue-700">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      <span className="mt-5 inline-flex items-center text-sm font-black text-blue-700">
        Explore
        <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
