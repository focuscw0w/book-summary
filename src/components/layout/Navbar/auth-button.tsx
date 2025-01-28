"use client";

import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";
import classes from "./auth-button.module.css";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session.user?.name}{" "}
        <Link
          href="/sign-up"
          className={classes.button}
          onClick={() => signOut()}
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
