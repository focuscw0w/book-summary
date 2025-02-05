"use client";

import Head from "next/head";
import Link from "next/link";
import { useFormState } from "react-dom";

import classes from "../layout.module.css";

import { loginUser } from "@/features/auth/actions/actions";
import SubmitButton from "@/features/auth/components/submit-button";

export default function SignInPage() {
  const [state, formAction] = useFormState(loginUser, undefined);
  const errors = state?.errors;

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
            {errors?.email && (
              <p className={classes.error}>{errors.email[0]}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Please, enter your password"
              className={classes.input}
            />
            {errors?.password && (
              <p className={classes.error}>{errors.password[0]}</p>
            )}
          </div>
          <SubmitButton>Sign In</SubmitButton>
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
