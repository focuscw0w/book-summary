import { getUser } from "@/features/auth/lib/session-dal";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import BookList from "@/features/books/components/book-list/book-list";
import { User } from "@/features/auth/models/User";

export const metadata: Metadata = {
  title: "My Books",
  description: "View and manage your summarized books",
};

export default async function MyBooks() {
  const user = (await getUser()) as User;
  if (!user) {
    redirect("/sign-in");
  }

  return <BookList userId={user.id} />;
}
