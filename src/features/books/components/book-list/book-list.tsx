import { getBooksFromDatabase } from "../../utils/db";
/* import Card from "../card/card";
 */ import {
  Card,
  CardTitle,
  CardDescription,
  CardImage,
  CardContent,
} from "@/components/UI/card/card";
import classes from "./book-list.module.css";
import { SummarizedBook } from "@/features/AI/definitions/Book";

export default async function BookList({ userId }: { userId: number }) {
  const books: SummarizedBook[] = await getBooksFromDatabase(userId);

  if (books.length === 0) {
    return <p>You don&#39;t have any books yet.</p>;
  }

  return (
    <div className={classes.container}>
      {books.map((book: SummarizedBook) => (
        <Card data={book} key={book.id}>
          <CardContent>
            <CardTitle />
            <CardDescription />
          </CardContent>
          <CardImage />
        </Card>
      ))}
    </div>
  );
}
