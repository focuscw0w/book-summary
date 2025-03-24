import { VolumeInfo } from "@/features/search/models/Book";
import prisma from "@/lib/db";

interface Props {
  bookInfo: VolumeInfo;
  summarizedText: string;
  userId: number;
}

export async function addBookToDatabase({
  bookInfo,
  summarizedText,
  userId,
}: Props) {
  // TODO: add a thumbnail

  const book = {
    title: bookInfo.title,
    authors: bookInfo.authors?.join(", ") || "Unknown",
    image: bookInfo.imageLinks?.thumbnail || "",
    publisher: bookInfo.publisher,
    publishedDate: bookInfo.publishedDate,
    description: bookInfo.description,
    previewLink: bookInfo.previewLink,
    summarizedText: summarizedText,
    userId,
  };

  await prisma.summarizedBook.create({
    data: book,
  });
}
