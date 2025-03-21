import prisma from "@/lib/db";
import { SummarizedBook } from "@prisma/client";

export async function getBooksFromDatabase(
  userId: number
): Promise<SummarizedBook[]> {
  return prisma.summarizedBook.findMany({
    where: {
      userId,
    },
  });
}
