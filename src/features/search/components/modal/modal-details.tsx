import Image from "next/image";

import { VolumeInfo } from "../../definitions/Book";
import { truncateDescription } from "../../lib/text";
import { summarizeBook} from "@/features/books/actions/actions"
import classes from "./modal-details.module.css";
import SubmitButton from "@/components/UI/submit-button/submit-button";

const maxDescriptionLength = 250;

export default function ModalDetails({ bookInfo }: { bookInfo: VolumeInfo }) {
  const description = truncateDescription(
    bookInfo.description,
    maxDescriptionLength
  );

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
      <form action={() => summarizeBook(bookInfo, bookInfo.title)}>
        <SubmitButton>Summarize</SubmitButton>
      </form>
    </>
  );
}
