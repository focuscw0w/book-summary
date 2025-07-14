import { getAllBooks } from "@/features/books/lib/book-dal";
import {
  Card,
  CardTitle,
  CardDescription,
  CardImage,
  CardContent,
} from "@/components/UI/card/card";
import { SummarizedBook } from "@/features/books/models/Book";
import classes from "./book-list.module.css";
import Link from "next/link";

export default async function BookList({ userId }: { userId: number }) {
  const books: SummarizedBook[] = await getAllBooks(userId);

  if (books.length === 0) {
    return <p className={classes.message}>You don&#39;t have any books yet.</p>;
  }

  return (
    <div className={classes.container}>
      {books.map((book: SummarizedBook) => (
        <Link
          href={`/my-books/${book.slug}`}
          className={classes.link}
          key={book.id}
        >
          <Card data={book} controls key={book.id}>
            <CardContent>
              <CardTitle />
              <CardDescription />
            </CardContent>
            <CardImage />
          </Card>
        </Link>
      ))}
    </div>
  );
}
