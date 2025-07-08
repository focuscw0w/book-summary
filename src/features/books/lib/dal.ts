"server only";

import { VolumeInfo } from "@/features/search/lib/definitions";
import { SummarizedBook } from "../models/Book";
import prisma from "@/lib/db";
import { slugify } from "./text";

interface Props {
  bookInfo: VolumeInfo;
  summarizedText: string;
  userId: number;
}

// TODO: rename functions to be more descriptive
export async function addBookToDatabase({
  bookInfo,
  summarizedText,
  userId,
}: Props) {
  const book = {
    title: bookInfo.title,
    slug: slugify(bookInfo.title),
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

export async function getBook(userId: number, slug: string) {
  return prisma.summarizedBook.findFirst({
    where: {
      userId,
      slug,
    },
  });
}

export async function removeBookFromDatabase(userId: number, bookId: number) {
  await prisma.summarizedBook.deleteMany({
    where: {
      userId,
      id: bookId,
    },
  });
}
