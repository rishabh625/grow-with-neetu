import { SectionHeading } from "@/components/section-heading";
import { SubscribeCta } from "@/components/cta-card";
import { VideoCard } from "@/components/video-card";
import { createMetadata } from "@/lib/seo";
import { getLatestVideos } from "@/lib/youtube";

export const revalidate = 3600;

export const metadata = createMetadata({
  title: "Latest MPSC YouTube Videos | Grow With Neetu",
  description: "Watch latest MPSC preparation videos for current affairs, subjects, PYQs and exam strategy.",
  path: "/latest-videos",
  keywords: ["Latest MPSC videos", "MPSC YouTube lectures"]
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
