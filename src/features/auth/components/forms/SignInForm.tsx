"use client";

import { useAuth } from "../../context/AuthProvider";
import { FormEvent } from "react";

import Link from "next/link";
import useInput from "../../hooks/useInput";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import classes from "../layout/AuthLayout.module.css";

export default function SignInForm() {
  const { signIn } = useAuth();

  const emailInput = useInput("");
  const passwordInput = useInput("");

  const email = emailInput.value;
  const password = passwordInput.value;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    // validate email
    // validate password
    signIn(email, password);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign In</h2>
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
        Need an account?{" "}
        <Link href="/signup" className={classes.link}>
          Sign Up
        </Link>
      </p>
    </form>
  );
}
