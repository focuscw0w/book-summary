import { getUser } from "@/features/auth/lib/dal";
import { getBook } from "@/features/books/lib/dal";
import { SummarizedBook } from "@prisma/client";
import { truncateDescription } from "@/lib/text";
import { formatText } from "@/features/books/lib/text";
import { redirect } from "next/navigation";
import classes from "./page.module.css";
import Image from "next/image";

export default async function BookPage({
  params,
}: {
  params: { slug: string };
}) {
  const user = await getUser();
  if (!user) {
    redirect("/sign-in");
  }

  const book = (await getBook(user.id, params.slug)) as SummarizedBook | null;
  if (!book) {
    return <p>Something went wrong!</p>;
  }

  return (
    <div className={classes.container}>
      <section className={classes.info}>
        <div className={classes.bibliography}>
          <h1>{book.title}</h1>
          <p>
            <strong>Authors</strong>: {book.authors}
          </p>
          <p>
            <strong> Publisher</strong>: {book.publisher}
          </p>
          <p>
            <strong>Published date</strong>: {book.publishedDate}
          </p>
          <p>
            <strong>Description</strong>:{" "}
            {truncateDescription(book.description, 600)}
          </p>
        </div>
        <div className={classes.image}>
          <Image src={book.image || ""} alt={book.title} sizes="auto" fill />
        </div>
      </section>

      <div className={classes.line}></div>

      <p>{formatText(book.summarizedText)}</p>
    </div>
  );
}
