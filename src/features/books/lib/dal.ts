"server only"

import { VolumeInfo } from "@/features/search/definitions/Book";
import { SummarizedBook } from "@/features/AI/definitions/Book";
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

export async function getBooksFromDatabase(
  userId: number
): Promise<SummarizedBook[]> {
  return prisma.summarizedBook.findMany({
    where: {
      userId,
    },
  });
}

export async function removeBookFromDatabase(
  userId: number,
  bookId: number
){
  // add DAL
  await prisma.summarizedBook.deleteMany({
    where: {
      userId,
      id: bookId,
    },
  });
}