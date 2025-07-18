import { getUser } from "@/features/auth/lib/session-dal";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import BookList from "@/features/books/components/book-list/book-list";

export const metadata: Metadata = {
  title: "My Books",
  description: "View and manage your summarized books",
};

export default async function MyBooks() {
  const user = await getUser();
  if (!user) {
    redirect("/sign-in");
  }

  return <BookList userId={user.id} />;
}
