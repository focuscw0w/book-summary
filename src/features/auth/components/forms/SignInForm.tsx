"use client";

import { FormEvent } from "react";

import Link from "next/link";
//mport useInput from "../../hooks/useInput";
import Input from "../UI/input/input";
import Button from "../UI/button/button";
//import classes from "@/features/auth/components/";

export default function SignInForm() {

  //const emailInput = useInput("");
  //const passwordInput = useInput("");

  //const email = emailInput.value;
  //const password = passwordInput.value;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    // validate email
    // validate password
   
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <Input
        type="email"
        name="email"
        label="Email"
        placeholder="Please, enter your email"
    
      />
      <Input
        type="password"
        name="password"
        label="Password"
        placeholder="Please, enter your password"
   
      />
      <Button type="submit" variant="signIn" isSubmitting={false} />
      <p>
        Need an account?{" "}
        <Link href="/signup">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
