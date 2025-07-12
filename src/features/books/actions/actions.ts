"use server";

import { VolumeInfo } from "@/features/search/lib/definitions";
import { createBook, deleteBook } from "../lib/database-dal";
import { getUser } from "@/features/auth/lib/session-dal";
import { redirect } from "next/navigation";

export async function summarizeBook(bookInfo: VolumeInfo, bookName: string) {
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // check if book already exists

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookName }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to summarize book");
  }

  const summarizedText: string = await response.json();

  try {
    await createBook({ bookInfo, summarizedText, userId: user.id });
  } catch (error: unknown) {
    console.error("Error summarizing book:", error);
    return {
      errors: {
        message: [
          "Sorry, we couldn't summarize the book. Please try again later.",
        ],
      },
    };
  }

  return { success: true };
}

export async function removeBook(bookId: number) {
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    await deleteBook(user.id, bookId);
  } catch (error: unknown) {
    console.error("Error deleting book:", error);
    return {
      errors: {
        message: ["Something went wrong. Please try again later."],
      },
    };
  }

  redirect("/my-books");
}
