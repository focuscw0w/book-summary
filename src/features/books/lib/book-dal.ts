"server only";

import { VolumeInfo } from "@/features/search/lib/definitions";
import { SummarizedBook } from "../models/Book";
import { mapBookInfoToDb } from "./transform-data";
import prisma from "@/lib/db";

interface CreateBookProps {
  bookInfo: VolumeInfo;
  data: { markdown: string };
  userId: number;
}

export async function createBook({ bookInfo, data, userId }: CreateBookProps) {
  const book = mapBookInfoToDb(bookInfo, data.markdown, userId);

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
