import Image from "next/image";

import { VolumeInfo } from "../../lib/definitions";
import { truncateDescription } from "@/lib/text";
import { summarizeBook } from "@/features/books/actions/actions";
import { useFormState } from "react-dom";
import SubmitButton from "@/components/UI/submit-button/submit-button";
import classes from "./search-detail.module.css";
import Spinner from "@/components/UI/spinner/spinner";

const maxDescriptionLength = 250;

export default function SearchDetail({ bookInfo }: { bookInfo: VolumeInfo }) {
  const summarizeBookAction = summarizeBook.bind(
    null,
    bookInfo,
    bookInfo.title
  );
  const [state, formAction] = useFormState(summarizeBookAction, undefined);

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
      <form action={formAction}>
        <SubmitButton>Summarize</SubmitButton>
      </form>
      <div className={classes.overlay}>
        <Spinner
          variant="Hourglass"
          text="Please wait, your book is being summarized!"
          color="white"
        />
      </div>
    </>
  );
}
