"use client";

import Button from "@/components/UI/button/button";
import classes from "./error.module.css";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={classes.container}>
      <h2>Something went wrong!</h2>
      <Button type="button" variant="primary" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
