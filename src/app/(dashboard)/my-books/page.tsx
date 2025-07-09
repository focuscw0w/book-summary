import { getUser } from "@/features/auth/lib/dal";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import BookList from "@/features/books/components/book-list/book-list";
import Spinner from "@/components/UI/spinner/spinner";

export const metadata = {
  title: "My Books",
  description: "View and manage your summarized books",
};

export default async function MyBooks() {
  const user = await getUser();
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <Suspense fallback={<Spinner variant="Lines" color="black" />}>
      <BookList userId={user.id} />
    </Suspense>
  );
}
