import Head from "next/head";
import SearchOverlay from "../features/search/components/SearchOverlay/SearchOverlay";
import classes from "./page.module.css";
import MainLayout from "./layout";
import { ReactNode } from "react";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Book Summary</title>
      </Head>
      <h1 className={classes.heading}>
        Welcome to the <strong>Book Summary!</strong>
        <br />
        Let&#39;s summarize your favorite book!
      </h1>
      <SearchOverlay />
    </div>
  );
}

// layout for home page when logged in
Home.getLayout = function getLayout(page: ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};