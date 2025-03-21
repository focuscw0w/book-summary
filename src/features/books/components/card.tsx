import { SummarizedBook } from "@/features/AI/models/Book";

export default function Card(book: SummarizedBook) {
  console.log("card component");
  console.log(book);

  return (
    <div>
      <h1>{book.title}</h1>
      <p> {book.description} </p>
    </div>
  );
}
