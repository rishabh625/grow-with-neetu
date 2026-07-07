import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  action
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">{eyebrow}</p>
        ) : null}
        <h2 className="text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-4xl">{title}</h2>
        {description ? <p className="mt-3 text-base leading-7 text-slate-600">{description}</p> : null}
      </div>
      {href && action ? (
        <Link
          href={href}
          className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 shadow-sm transition hover:border-blue-500 hover:text-blue-800"
        >
          {action}
        </Link>
      ) : null}
    </div>
  );
}
