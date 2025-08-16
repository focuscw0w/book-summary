import { getUser } from "@/features/auth/lib/session-dal";
import { getBookBySlug } from "@/features/books/lib/book-dal";
import { SummarizedBook } from "@prisma/client";
import { truncateDescription } from "@/lib/text";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import classes from "./page.module.css";
import Image from "next/image";
import BookControls from "@/features/books/components/book-controls/book-controls";
import { User } from "@/features/auth/models/User";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const user = (await getUser()) as User;

  if (!user) {
    return {
      title: "Please sign in",
      description: "You must be signed in to view this book.",
    };
  }

  const slug = params.slug;

  const book = (await getBookBySlug(user.id, slug)) as SummarizedBook;

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
  // TODO: make a function for this
  // check if user -> get book by slug -> if not found, redirect to 404
  const user = (await getUser()) as User;
  if (!user) {
    redirect("/sign-in");
  }

  const book = (await getBookBySlug(user.id, params.slug)) as SummarizedBook;
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

      <section className={classes.summarization}>
        <ReactMarkdown>{book.summarizedText}</ReactMarkdown>
      </section>
    </div>
  );
}
