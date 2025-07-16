"server only";

import { VolumeInfo } from "@/features/search/lib/definitions";
import { SummarizedBook } from "../models/Book";
import prisma from "@/lib/db";
import { slugify } from "./text";

interface CreateBookProps {
  bookInfo: VolumeInfo;
  summarizedText: string;
  userId: number;
}

export async function createBook({
  bookInfo,
  summarizedText,
  userId,
}: CreateBookProps) {
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

export async function getAllBooks(userId: number): Promise<SummarizedBook[]> {
  return prisma.summarizedBook.findMany({
    where: {
      userId,
    },
  });
}

export async function getBookBySlug(
  userId: number,
  slug: string
): Promise<SummarizedBook | null> {
  return prisma.summarizedBook.findFirst({
    where: {
      userId,
      slug,
    },
  });
}

export async function getBookByTitle(
  userId: number,
  title: string
): Promise<SummarizedBook | null> {
  return prisma.summarizedBook.findFirst({
    where: {
      userId,
      title,
    },
  });
}

export async function getBookByID(
  bookId: number
): Promise<SummarizedBook | null> {
  return prisma.summarizedBook.findFirst({
    where: {
      id: bookId,
    },
  });
}

export async function deleteBook(userId: number, bookId: number) {
  await prisma.summarizedBook.deleteMany({
    where: {
      userId,
      id: bookId,
    },
  });
}
