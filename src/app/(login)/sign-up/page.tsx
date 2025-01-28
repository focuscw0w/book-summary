"use client";

import Head from "next/head";
import Link from "next/link";
import { useFormState } from "react-dom";

import Button from "@/features/auth/components/UI/button/button";
import classes from "../layout.module.css";

import { createUser } from "@/features/auth/actions/actions";

export default function SignUpPage() {
  const [state, formAction, isPending] = useFormState(createUser, undefined);
  const errors = state?.errors;

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <form action={formAction}>
        <h2>Sign Up</h2>
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
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Please, confirm your password"
              className={classes.input}
            />
            {errors?.confirmPassword && (
              <p className={classes.error}>{errors.confirmPassword[0]}</p>
            )}
          </div>
          <Button isSubmitting={isPending} type="submit" variant="signUp" />
        </div>
        <p>
          Already have an account?{" "}
          <Link href="/signin" className={classes.link}>
            Sign In
          </Link>
        </p>
      </form>
    </>
  );
}
