import { LinkCard } from "@/components/card-grid";
import { SectionHeading } from "@/components/section-heading";
import { SubscribeCta } from "@/components/cta-card";
import { createMetadata } from "@/lib/seo";
import { subjects } from "@/lib/taxonomy";

export const dynamic = "force-static";

export const metadata = createMetadata({
  title: "MPSC Subjects | Current Affairs, History, Geography, Polity and More",
  description: "Explore subject-wise MPSC preparation hubs with videos, notes, FAQs and internal links.",
  path: "/subjects",
  keywords: ["MPSC Subjects", "MPSC subject wise preparation"]
});

export default function SubjectsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Subjects"
        title="MPSC subject-wise preparation"
        description="Each subject hub is designed to rank for educational search queries and guide aspirants to relevant lectures, notes and FAQs."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {subjects.map((subject) => (
          <LinkCard key={subject.slug} title={subject.name} description={subject.description} href={`/subjects/${subject.slug}`} />
        ))}
      </div>
      <div className="mt-12">
        <SubscribeCta compact />
      </div>
    </div>
  );
}
