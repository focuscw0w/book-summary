import { getBooksFromDatabase } from "../../utils/db";
import Card from "../card/card";
import classes from "./book-list.module.css";
import { SummarizedBook } from "@/features/AI/models/Book";

export default async function BookList({ userId }: { userId: number }) {
  const books = await getBooksFromDatabase(userId);

  if (books.length === 0) {
    return <p>You don&#39;t have any books yet.</p>;
  }

  return (
    <div className={classes.container}>
      {books.map((book: SummarizedBook) => (
        <Card key={book.id} {...book} />
      ))}
    </div>
  );
}
