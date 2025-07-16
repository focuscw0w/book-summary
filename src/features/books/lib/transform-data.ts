import { VolumeInfo } from "@/features/search/lib/definitions";
import { slugify } from "./text";

export function mapBookInfoToDb(
  bookInfo: VolumeInfo,
  markdown: string,
  userId: number
) {
  return {
    title: bookInfo.title,
    slug: slugify(bookInfo.title),
    authors: bookInfo.authors?.join(", ") || "Unknown",
    image: bookInfo.imageLinks?.thumbnail || "",
    publisher: bookInfo.publisher ?? null,
    publishedDate: bookInfo.publishedDate ?? null,
    description: bookInfo.description ?? null,
    previewLink: bookInfo.previewLink ?? null,
    summarizedText: markdown,
    userId,
  };
}
