"use client";

import Head from "next/head";
import Link from "next/link";
import { useFormState } from "react-dom";

import classes from "../layout.module.css";
import Button from "@/features/auth/components/UI/button/button";

import { loginUser } from "@/features/auth/actions/actions";

export default function SignInPage() {
  const [state, formAction, isPending] = useFormState(loginUser, undefined);
  const errors = state?.errors;

  console.log(errors);

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <form action={formAction}>
        <h2>Sign In</h2>
        <div className={classes.wrapper}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Please, enter your email"
              className={classes.input}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Please, enter your password"
              className={classes.input}
            />
          </div>
          <Button isSubmitting={isPending} type="submit" variant="signIn" />
        </div>
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className={classes.link}>
            Sign Up
          </Link>
        </p>
      </form>
    </>
  );
}
