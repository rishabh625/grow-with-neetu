"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VideoCard } from "@/components/video-card";
import type { Video } from "@/lib/youtube";

// 18 videos per page fits neatly into a 3-column grid (6 rows x 3 columns)
const VIDEOS_PER_PAGE = 18;

interface LatestVideosClientProps {
  videos: Video[];
}

export function LatestVideosClient({ videos }: LatestVideosClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.max(1, Math.ceil(videos.length / VIDEOS_PER_PAGE));

  // Sync with ?page=X on mount and on browser back/forward navigation
  useEffect(() => {
    function readPageFromUrl() {
      const params = new URLSearchParams(window.location.search);
      const p = parseInt(params.get("page") || "1", 10);
      if (!isNaN(p) && p >= 1 && p <= totalPages) {
        setCurrentPage(p);
      } else {
        setCurrentPage(1);
      }
    }

    readPageFromUrl();
    window.addEventListener("popstate", readPageFromUrl);
    return () => window.removeEventListener("popstate", readPageFromUrl);
  }, [totalPages]);

  const startIndex = (currentPage - 1) * VIDEOS_PER_PAGE;
  const endIndex = Math.min(startIndex + VIDEOS_PER_PAGE, videos.length);
  const currentVideos = useMemo(
    () => videos.slice(startIndex, endIndex),
    [videos, startIndex, endIndex]
  );

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);

    const url = new URL(window.location.href);
    if (newPage === 1) {
      url.searchParams.delete("page");
    } else {
      url.searchParams.set("page", String(newPage));
    }
    window.history.pushState({}, "", url.toString());

    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div ref={containerRef} className="scroll-mt-24">
      {/* Video count summary */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-600 font-medium">
        <p>
          Showing{" "}
          <span className="font-bold text-slate-950">
            {videos.length > 0 ? startIndex + 1 : 0}–{endIndex}
          </span>{" "}
          of <span className="font-bold text-slate-950">{videos.length}</span> lectures
        </p>
        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-wider text-blue-700">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      {/* Video Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentVideos.map((video, index) => (
          <VideoCard key={video.id} video={video} priority={index < 3} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav
          aria-label="Videos pagination"
          className="mt-12 flex flex-wrap items-center justify-center gap-2 border-t border-slate-200 pt-8"
        >
          {/* Previous Button */}
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-700"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => handlePageChange(pageNum)}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={`Go to page ${pageNum}`}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm ring-2 ring-blue-600 ring-offset-2"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-700"
            aria-label="Next page"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      )}
    </div>
  );
}
