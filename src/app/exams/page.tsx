import { LinkCard } from "@/components/card-grid";
import { SectionHeading } from "@/components/section-heading";
import { SubscribeCta } from "@/components/cta-card";
import { exams } from "@/lib/taxonomy";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata = createMetadata({
  title: "Civil Services Exam Preparation (MPSC-focused) | Rajyaseva, PSI, STI, ASO, Talathi",
  description:
    "Dedicated preparation pages for Rajyaseva, Combined Exam, PSI, STI, ASO, Forest, Talathi, ZP and Police Bharti—plus guidance that you can extend to UPSC, UPPSC and BPSC style exams.",
  path: "/exams",
  keywords: ["MPSC Exam Preparation", "Civil Services Preparation", "UPSC Preparation", "UPPSC Preparation", "BPSC Preparation"]
});

export default function ExamsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Exam Hubs"
        title="Preparation pages for MPSC & other civil services"
        description="Each page targets exam-specific keywords and organizes videos, notes, subject priorities, FAQs and strategy you can adapt for UPSC/UPPSC/BPSC."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {exams.map((exam) => (
          <LinkCard key={exam.slug} title={exam.name} description={exam.description} href={`/exams/${exam.slug}`} meta="Exam Preparation" />
        ))}
      </div>
      <div className="mt-12">
        <SubscribeCta compact />
      </div>
    </div>
  );
}
