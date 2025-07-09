"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { removeBook } from "../../actions/actions";
import Modal from "@/components/UI/modal/modal";
import classes from "./book-controls.module.css";
import Button from "@/components/UI/button/button";

export default function BookControls({ bookId }: { bookId: number }) {
  const removeBookAction = removeBook.bind(null, bookId);
  const [state, formAction] = useFormState(removeBookAction, undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <Button type="button" variant="danger" onClick={openModal}>
        Delete
      </Button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <p className={classes.text}>
          Are you sure you want to delete your summarized book?
        </p>
        {state?.errors.message && (
          <p className={classes.error}>{state.errors.message}</p>
        )}
        <form action={formAction} className={classes.wrapper}>
          <Button type="button" variant="primary" onClick={closeModal}>
            Close
          </Button>
          <Button type="submit" variant="danger">
            Delete
          </Button>
        </form>
      </Modal>
    </>
  );
}
