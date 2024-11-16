"use client";

import { useAuth } from "../../provider/AuthProvider";
import { FormEvent } from "react";
import classes from "./SignUpForm.module.css";
import Input from "../Input/Input";
import useInput from "@/hooks/useInput";
import Head from "next/head";
import Link from "next/link";

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
    <div className={classes.container}>
      <Head>Sign Up</Head>
      <form className={classes.form} onSubmit={handleSubmit}>
        <h2 className={classes.title}>Sign Up</h2>
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
        <div className={classes.wrapper}>
          <button className={classes.button} type="submit">
            Sign Up
          </button>
        </div>
        <p>
          Already have an account?{" "}
          <Link href="/login" className={classes.link}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
