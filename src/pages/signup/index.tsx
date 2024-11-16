"use client";

import SignUpForm from "@/features/auth/components/SignUpForm/SignUpForm";
import { AuthProvider } from "@/features/auth/provider/AuthProvider";
import Head from "next/head";
import { ReactNode } from "react";

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <SignUpForm />
    </>
  );
}

SignUp.getLayout = function getLayout(page: ReactNode) {
  return <AuthProvider>{page}</AuthProvider>;
};
