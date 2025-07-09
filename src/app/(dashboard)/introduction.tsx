"use client";

import SearchWrapper from "@/features/search/components/search-wrapper/search-wrapper";
import classes from "./page.module.css";
import { motion } from "framer-motion";

export default function Introduction() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1 className={classes.heading}>
        Welcome to the <strong>Book Summary!</strong>
        <br />
        Let&#39;s summarize your favorite book!
      </h1>
      <SearchWrapper />
    </motion.div>
  );
}
