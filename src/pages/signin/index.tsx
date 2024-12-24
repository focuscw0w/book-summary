import { ReactNode } from "react";
import Head from "next/head";

import { AuthProvider } from "@/features/auth/context/AuthProvider";
import AuthLayout from "@/features/auth/layout/AuthLayout";
import SignInForm from "@/features/auth/components/forms/SignInForm";

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <SignInForm />
    </>
  );
}

SignInPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <AuthProvider>
      <AuthLayout>{page}</AuthLayout>
    </AuthProvider>
  );
};
