import { getUser } from "@/features/auth/lib/session-dal";
import { getBook } from "@/features/books/lib/database-dal";
import { SummarizedBook } from "@prisma/client";
import { truncateDescription } from "@/lib/text";
import { formatText } from "@/features/books/lib/text";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import classes from "./page.module.css";
import Image from "next/image";
import BookControls from "@/features/books/components/book-controls/book-controls";

interface MetadataProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const user = await getUser();
  if (!user) {
    return {
      title: "Unauthorized",
      description: "You must be signed in to view this content.",
    };
  }

  const slug = params.slug;

  const book = await getBook(user.id, slug);

  return {
    title: book?.title || "Book Summary",
    description:
      book?.description || "Read a summarized version of your favorite book.",
  };
}

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
    notFound();
  }

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <BookControls bookId={book.id} />
      </header>
      <section className={classes.info}>
        <div className={classes.bibliography}>
          <h1 className={classes.title}>{book.title}</h1>
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
