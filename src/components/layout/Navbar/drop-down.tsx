"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import classes from "./drop-down.module.css";

interface DropdownProps {
  children: React.ReactNode;
}

export default function Dropdown({ children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classes.container}>
      <button
        className={classes.toggle}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className={classes.menu}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {children}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
