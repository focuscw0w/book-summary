"use client";

import { useEffect } from "react";
import ReactDOM from "react-dom";

import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import classes from "./modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const scaleFadeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};


export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={classes.overlay} onClick={onClose}>
      <motion.div
        className={classes.modal}
        onClick={(e) => e.stopPropagation()}
        variants={scaleFadeVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3 }}
      >
        <button className={classes.closeButton} onClick={onClose}>
          <MdClose size={24} />
        </button>
        {children}
      </motion.div>
    </div>,
    document.body
  );
}
