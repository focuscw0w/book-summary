import Image from "next/image";

import { VolumeInfo } from "@/features/search/models/Book";
import { motion } from "framer-motion";

import classes from "./search-item.module.css";
import { truncateDescription, formatAuthors } from "../../lib/text";
import { scaleFadeVariants } from "../../lib/animation";

interface SearchItemProps {
  onClick: () => void;
  bookInfo: VolumeInfo;
}

const maxDescriptionLength = 150;
const maxAuthors = 2;

export default function SearchItem({ bookInfo, onClick }: SearchItemProps) {
  const authors = formatAuthors(bookInfo.authors, maxAuthors);

  const description = truncateDescription(
    bookInfo.description,
    maxDescriptionLength
  );

  return (
    <motion.li
      className={classes.item}
      variants={scaleFadeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      onClick={onClick}
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

        <p className={classes.description}>{description}</p>
      </div>
    </motion.li>
  );
}
