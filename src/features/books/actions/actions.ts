"use server";

import { VolumeInfo } from "@/features/search/lib/definitions";
import { createBook, deleteBook } from "../lib/dal";
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
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to summarize book");
  }

  const summarizedText: string = await response.json();

  try {
    await createBook({ bookInfo, summarizedText, userId: user.id });
  } catch (error: unknown) {
    throw new Error(`Error adding book to database. ${error}`);
  }

  redirect("/my-books");
}

export async function removeBook(bookId: number) {
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    await deleteBook(user.id, bookId);
  } catch (error: unknown) {
    console.log(error);
    return {
      errors: {
        message: ["Something went wrong. Please try again later."],
      },
    };
  }

  redirect("/my-books");
}
