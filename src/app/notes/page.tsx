import { LinkCard } from "@/components/card-grid";
import { SectionHeading } from "@/components/section-heading";
import { SubscribeCta } from "@/components/cta-card";
import { resources } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Free MPSC Notes and PDFs | Current Affairs, PYQs, Books and Downloads",
  description: "Download and explore free MPSC notes, PDFs, booklists, previous year papers and current affairs resources.",
  path: "/notes",
  keywords: ["MPSC Notes", "MPSC PDF Downloads", "MPSC PYQs", "Current Affairs PDFs"]
});

export default function NotesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Resources"
        title="Free notes, PDFs, books and previous year papers"
        description="A central resource hub for notes, PDF downloads, important books, PYQs and current affairs PDFs."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {resources.map((resource) => (
          <LinkCard key={resource.href} title={resource.title} description={resource.description} href={resource.href} meta={resource.category} />
        ))}
      </div>
      <div className="mt-12 rounded-[1.5rem] border border-blue-100 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-black tracking-[-0.04em] text-slate-950">CMS schema for downloads</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Add note title, subject, exam, file URL, description, publish date, related YouTube video and SEO keywords in Sanity or MDX frontmatter.
        </p>
      </div>
      <div className="mt-12">
        <SubscribeCta compact />
      </div>
    </div>
  );
}
