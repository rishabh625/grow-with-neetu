import { LinkCard } from "@/components/card-grid";
import { SectionHeading } from "@/components/section-heading";
import { SubscribeCta } from "@/components/cta-card";
import { createMetadata } from "@/lib/seo";
import { subjects } from "@/lib/taxonomy";

export const dynamic = "force-static";

export const metadata = createMetadata({
  title: "Civil Services Subjects (MPSC-focused) | Current Affairs, History, Geography, Polity and More",
  description:
    "Explore subject-wise preparation hubs (MPSC-focused) with videos, notes, FAQs and internal links—helpful for UPSC, UPPSC, BPSC and other civil services.",
  path: "/subjects",
  keywords: ["MPSC Subjects", "Civil Services Subjects", "UPSC Preparation", "UPPSC Preparation", "BPSC Preparation"]
});

export default function SubjectsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Subjects"
        title="Civil services subject-wise preparation (MPSC-focused)"
        description="Each subject hub helps you discover the right lectures, study notes, FAQs and practice for your exam—starting with MPSC and extending to UPSC/UPPSC/BPSC patterns."
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
