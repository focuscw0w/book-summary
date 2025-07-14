"use server";

import { VolumeInfo } from "@/features/search/lib/definitions";
import {
  createBook,
  deleteBook,
  getBookByID,
  getBookByTitle,
} from "../lib/book-dal";
import { getUser } from "@/features/auth/lib/session-dal";
import { redirect } from "next/navigation";
import { SummarizedBook } from "../models/Book";

export async function summarizeBook(bookInfo: VolumeInfo, bookName: string) {
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  let book: SummarizedBook | null;
  try {
    book = await getBookByTitle(user.id, bookName);
  } catch (error: unknown) {
    console.error("Error checking book existence:", error);
    throw new Error("Book not found.");
  }

  if (book) {
    return {
      errors: {
        message: ["This book is already in your summarized books."],
      },
    };
  }

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

  let book: SummarizedBook | null;
  try {
    book = await getBookByID(bookId);
  } catch (error: unknown) {
    console.error("Error checking book existence:", error);
    throw new Error("Failed getting book from database.");
  }

  if (!book) {
    throw new Error("Book not found.");
  }

  if (user.id != book.userId) {
    throw new Error("You do not have permission to delete this book.");
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
