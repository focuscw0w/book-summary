import Head from "next/head";
import SearchWrapper from "../../features/search/components/search-wrapper/search-wrapper";
import classes from "./page.module.css";

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
      <SearchWrapper />
    </div>
  );
}
