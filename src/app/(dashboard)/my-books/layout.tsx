import React from "react";
import classes from "./layout.module.css";

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={classes.container}>{children}</div>;
}
