"use client";

import { useFormState } from "react-dom";
import { createUser } from "@/features/auth/actions/actions";
import Link from "next/link";
import SubmitButton from "@/components/UI/submit-button/submit-button";
import classes from "../layout.module.css";

export default function SignUpPage() {
  const [state, formAction] = useFormState(createUser, undefined);
  const errors = state?.errors;

  return (
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
          {errors?.email && <p className={classes.error}>{errors.email[0]}</p>}
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
        <SubmitButton>Sign Up</SubmitButton>
        {errors?.message && (
          <p className={classes.error}>{errors.message[0]}</p>
        )}
      </div>
      <p>
        Already have an account?{" "}
        <Link href="/sign-in" className={classes.link}>
          Sign In
        </Link>
      </p>
    </form>
  );
}
