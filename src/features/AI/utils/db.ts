// use server?

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
  const book = {
    title: bookInfo.title,
    authors: bookInfo.authors?.join(", ") || "Unknown",
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

export async function getBooksFromDatabase(userId: number) {
  // TODO....
}