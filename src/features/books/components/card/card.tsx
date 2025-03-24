"use client";

import { SummarizedBook } from "@/features/AI/models/Book";
import Image from "next/image";
import classes from "./card.module.css";
import { motion } from "framer-motion";

// refactor using helper functions
import { formatAuthors, truncateDescription } from "@/features/search/lib/text";
import { scaleFadeVariants } from "@/features/search/lib/animation";

const maxDescriptionLength = 150;
const maxAuthors = 2;

// TODO: create a global card component
export default function Card(book: SummarizedBook) {
  console.log("card component");
  console.log(book);

  // refactor using helper functions
  //const authors = formatAuthors(book.authors, maxAuthors);

  const description = truncateDescription(
    book.description,
    maxDescriptionLength
  );

  return (
    <motion.div
      variants={scaleFadeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={classes.card}
    >
      <div className={classes.about}>
        <h1 className={classes.title}>{book.title}</h1>
        <p>{book.authors}</p>
        <p className={classes.description}>{description}</p>
      </div>
      <div className={classes.image}>
        <Image src={book.image || ""} fill alt={book.title} />
      </div>
    </motion.div>
  );
}
