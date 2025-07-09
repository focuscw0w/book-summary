"use client";

import Modal from "@/components/UI/modal/modal";
import { useState } from "react";
import classes from "./book-controls.module.css";
import Button from "@/components/UI/button/button";

export default function BookControls() {
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
        <div className={classes.wrapper}>
          <Button type="button" variant="primary">
            Close
          </Button>
          <Button type="button" variant="danger">
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}
