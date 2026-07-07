import { createMetadata } from "@/lib/seo";
import SearchClient from "./SearchClient";

export const dynamic = "force-static";

export const metadata = createMetadata({
  title: "Search MPSC Videos, Notes, Subjects and Exams | Grow With Neetu",
  description: "Search across Grow With Neetu videos, blog articles, subjects and exam preparation pages.",
  path: "/search"
});

export default function SearchPage() {
  return <SearchClient />;
}
