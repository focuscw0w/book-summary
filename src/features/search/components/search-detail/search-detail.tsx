"use client";

import { VolumeInfo } from "../../lib/definitions";
import { truncateDescription } from "@/lib/text";
import { summarizeBook } from "@/features/books/actions/actions";
import { useFormState } from "react-dom";
import SubmitButton from "@/components/UI/submit-button/submit-button";
import classes from "./search-detail.module.css";
import Spinner from "@/components/UI/spinner/spinner";
import Overlay from "@/components/UI/overlay/overlay";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const maxDescriptionLength = 250;

export default function SearchDetail({ bookInfo }: { bookInfo: VolumeInfo }) {
  const summarizeBookAction = summarizeBook.bind(
    null,
    bookInfo,
    bookInfo.title
  );
  const [state, formAction] = useFormState(summarizeBookAction, undefined);

  const [isActiveOverlay, setIsActiveOverlay] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/my-books");
    }

    if (state?.errors) {
      setIsActiveOverlay(false);
    }
  }, [state, router]);

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
              sizes="auto"
            />
          </div>
        ) : (
          <p>No cover available</p>
        )}
      </div>
      <form action={formAction}>
        <SubmitButton onPendingChange={setIsActiveOverlay}>
          Summarize
        </SubmitButton>
      </form>
      {isActiveOverlay && (
        <Overlay>
          <Spinner
            variant="Hourglass"
            text="Please wait, your book is being summarized!"
            color="white"
          />
        </Overlay>
      )}
    </>
  );
}
