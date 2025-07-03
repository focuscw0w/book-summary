"use server";

import { VolumeInfo } from "@/features/search/definitions/Book";
import { addBookToDatabase, removeBookFromDatabase } from "../lib/dal";
import { getUser } from "@/features/auth/lib/dal";
import { redirect } from "next/navigation";

export async function summarizeBook(bookInfo: VolumeInfo, bookName: string) {
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookName }),
  });

  if (!response.ok) {
    throw new Error("Failed to summarize book");
  }

  const summarizedText: string = await response.json();

  try {
    await addBookToDatabase({ bookInfo, summarizedText, userId: user.id });
  } catch (error: unknown) {
    throw new Error(`Error adding book to database. ${error}`);
  }

  redirect("/my-books");
}

export async function removeBook(bookId: number, userId: number) {
  const user = await getUser();

  if (!user || user.id !== userId) {
    throw new Error("Unauthorized");
  }

  try {
    removeBookFromDatabase(userId, bookId);
  } catch (error: unknown) {
    throw new Error(`Error removing book from database. ${error}`);
  }

  redirect("/my-books");
}