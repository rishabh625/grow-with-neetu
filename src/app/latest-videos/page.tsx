import { SectionHeading } from "@/components/section-heading";
import { SubscribeCta } from "@/components/cta-card";
import { createMetadata } from "@/lib/seo";
import { getLatestVideos } from "@/lib/youtube";
import { LatestVideosClient } from "./LatestVideosClient";

export const dynamic = "force-static";

export const metadata = createMetadata({
  title: "Latest Civil Services YouTube Videos (MPSC-focused) | Grow With Neetu",
  description: "Watch latest civil services preparation videos for current affairs, subjects, PYQs and exam strategy—MPSC-focused but applicable to UPSC/UPPSC/BPSC patterns.",
  path: "/latest-videos",
  keywords: ["Latest MPSC videos", "Civil Services Videos", "UPSC Preparation", "UPPSC Preparation", "BPSC Preparation"]
});

export default async function LatestVideosPage() {
  const videos = await getLatestVideos();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Latest Videos"
        title="All Grow With Neetu lectures & videos"
        description="Browse all civil services lectures, syllabus walkthroughs, and exam strategies with easy page-by-page navigation."
      />
      <LatestVideosClient videos={videos} />
      <div className="mt-12">
        <SubscribeCta compact />
      </div>
    </div>
  );
}
