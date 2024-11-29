"use client";

import { useAuth } from "../../context/AuthProvider";
import { FormEvent } from "react";

import Link from "next/link";
import Input from "../UI/Input/Input";
import useInput from "@/features/auth/hooks/useInput";
import Button from "../UI/Button/Button";
import classes from "../layout/AuthLayout.module.css";

export default function SignUpForm() {
  const { signUp } = useAuth();

  const emailInput = useInput("");
  const passwordInput = useInput("");

  const email = emailInput.value;
  const password = passwordInput.value;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    // validate email
    // validate password
    signUp(email, password);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <Input
        type="email"
        name="email"
        label="Email"
        placeholder="Please, enter your email"
        {...emailInput}
      />
      <Input
        type="password"
        name="password"
        label="Password"
        placeholder="Please, enter your password"
        {...passwordInput}
      />
      <Button type="submit" variant="signIn" />
      <p>
        Already have an account?{" "}
        <Link href="/signin" className={classes.link}>
          Sign In
        </Link>
      </p>
    </form>
  );
}
