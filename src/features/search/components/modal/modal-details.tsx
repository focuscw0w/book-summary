import Image from "next/image";

import { VolumeInfo } from "../../models/Book";
import { truncateDescription } from "../../lib/text";
import classes from "./modal-details.module.css";
import Button from "@/components/UI/button/button";

const maxDescriptionLength = 250;

export default function ModalDetails({ bookInfo }: { bookInfo: VolumeInfo }) {
  const description = truncateDescription(bookInfo.description, maxDescriptionLength);

  return (
    <>
      <div className={classes.wrapper}>
        <div>
          <h2 className={classes.title}>{bookInfo.title}</h2>
          <p>{description}</p>
        </div>
        {bookInfo.imageLinks?.thumbnail ? (
          <div className={classes.image}>
            <Image
              src={bookInfo.imageLinks.thumbnail}
              alt={`${bookInfo.title} cover`}
              fill
            />
          </div>
        ) : (
          <p>No cover available</p>
        )}
      </div>
      <Button type="button">Summarize</Button>
    </>
  );
}
