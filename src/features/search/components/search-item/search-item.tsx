import Image from "next/image";

import { VolumeInfo } from "@/features/search/models/Book";
import { motion } from "framer-motion";

import classes from "./search-item.module.css";

interface SearchItemProps {
  bookInfo: VolumeInfo;
}

export default function SearchItem({ bookInfo }: SearchItemProps) {
  const maxAuthors = 2;
  const maxDescriptionLength = 150;

  const authors = bookInfo.authors?.length
    ? bookInfo.authors.length > maxAuthors
      ? `${bookInfo.authors.slice(0, maxAuthors).join(", ")}...`
      : bookInfo.authors.join(", ")
    : "N/A";

  const description =
    bookInfo.description && bookInfo.description.length > maxDescriptionLength
      ? `${bookInfo.description.slice(0, maxDescriptionLength)}...`
      : bookInfo.description || "No description available.";

  return (
    <motion.li
      className={classes.item}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ease: "easeIn" }}
    >
      <div className={classes.thumbnail}>
        {bookInfo.imageLinks?.thumbnail ? (
          <Image
            src={bookInfo.imageLinks.thumbnail}
            alt={`${bookInfo.title} cover`}
            width={100}
            height={0}
          />
        ) : (
          <p>No cover available</p>
        )}
      </div>
      <div className={classes.about}>
        <h4 className={classes.title}>{bookInfo.title}</h4>

        <p>Authors: {authors}</p>

        {bookInfo.publishedDate && (
          <p className={classes.publishedDate}>
            Published: {bookInfo.publishedDate}
          </p>
        )}

        {bookInfo.description && (
          <p className={classes.description}>{description}</p>
        )}
      </div>
    </motion.li>
  );
}
