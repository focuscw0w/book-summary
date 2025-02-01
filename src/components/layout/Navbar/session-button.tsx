"use client";

import Link from "next/link";

import classes from "./session-button.module.css";

export default function SessionButton() {
  //const { data: session } = useSession();
  const test = true;

  if (test) {
    return (
      <>
        {" "}
        <Link
          href="/sign-up"
          className={classes.button}
     
        >
          Sign out
        </Link>
      </>
    );
  } else {
    return (
      <>
        Not signed in{" "}
        <Link href="/sign-in" className={classes.button}>
          Sign in
        </Link>
      </>
    );
  }
}
