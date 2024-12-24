import { ReactNode } from "react";
import Head from "next/head";

import { AuthProvider } from "@/features/auth/context/AuthProvider";
import AuthLayout from "@/features/auth/layout/AuthLayout";
import SignUpForm from "@/features/auth/components/forms/SignUpForm";

export default function SignUpPage() {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <SignUpForm />
    </>
  );
}

SignUpPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <AuthProvider>
      <AuthLayout>{page}</AuthLayout>
    </AuthProvider>
  );
};
