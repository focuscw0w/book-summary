import Head from "next/head";
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
