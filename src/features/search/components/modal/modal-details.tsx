import Image from "next/image";

import { VolumeInfo } from "../../models/Book";
import { truncateDescription } from "../../lib/text";
import classes from "./modal-details.module.css";
import SubmitButton from "@/components/UI/submit-button/submit-button";

const maxDescriptionLength = 250;

export default function ModalDetails({ bookInfo }: { bookInfo: VolumeInfo }) {
  async function summarizeBook() {
    const response = await fetch("api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookName: bookInfo.title }),
    });

    const data: string = await response.json();
    // add to db
    // redirect to /my-books

    console.log(data);
  }

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
      <form action={summarizeBook}>
        <SubmitButton>Summarize</SubmitButton>
      </form>
    </>
  );
}
