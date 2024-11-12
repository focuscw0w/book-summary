import { VolumeInfo } from "@/models/Book";
import classes from "./SearchItem.module.css";

import Image from "next/image";

interface SearchItemProps {
  bookInfo: VolumeInfo;
}

const SearchItem = ({ bookInfo }: SearchItemProps) => {
  return (
    <li className={classes.item}>
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

        <p>Authors: {bookInfo.authors?.join(", ") || "N/A"}</p>

        {bookInfo.publishedDate && (
          <p className={classes.publishedDate}>
            Published: {bookInfo.publishedDate}
          </p>
        )}

        {bookInfo.description && (
          <p className={classes.description}>
            {bookInfo.description.length > 150
              ? `${bookInfo.description.slice(0, 400)}...`
              : bookInfo.description}
          </p>
        )}
      </div>
    </li>
  );
};

export default SearchItem;
