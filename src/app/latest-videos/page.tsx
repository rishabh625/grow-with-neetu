import { SectionHeading } from "@/components/section-heading";
import { SubscribeCta } from "@/components/cta-card";
import { VideoCard } from "@/components/video-card";
import { createMetadata } from "@/lib/seo";
import { getLatestVideos } from "@/lib/youtube";

export const dynamic = "force-static";

export const metadata = createMetadata({
  title: "Latest Civil Services YouTube Videos (MPSC-focused) | Grow With Neetu",
  description: "Watch latest civil services preparation videos for current affairs, subjects, PYQs and exam strategy—MPSC-focused but applicable to UPSC/UPPSC/BPSC patterns.",
  path: "/latest-videos",
  keywords: ["Latest MPSC videos", "Civil Services Videos", "UPSC Preparation", "UPPSC Preparation", "BPSC Preparation"]
});

export default async function LatestVideosPage() {
  const videos = await getLatestVideos(24);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Latest Videos"
        title="Newest Grow With Neetu lectures"
        description="Latest YouTube uploads are refreshed with ISR and become searchable learning pages."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video, index) => (
          <VideoCard key={video.id} video={video} priority={index < 3} />
        ))}
      </div>
      <div className="mt-12">
        <SubscribeCta compact />
      </div>
    </div>
  );
}
