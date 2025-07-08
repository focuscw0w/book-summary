"use client";

import Modal from "@/components/UI/modal/modal";
import { MdClose } from "react-icons/md";
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
      <button className={classes.controls} onClick={openModal}>
        <MdClose size={30} color="#f87171" />
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <p className={classes.text}>
          Are you sure you want to delete your summarized book?
        </p>
        <div className={classes.wrapper}>
          <Button type="button">Close</Button>
          <Button type="button">Delete</Button>
        </div>
      </Modal>
    </>
  );
}
