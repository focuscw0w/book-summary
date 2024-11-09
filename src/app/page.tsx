import SearchOverlay from "./components/features/SearchBook/SearchOverlay/SearchOverlay";
import classes from "./page.module.css";

export default function Home() {
  return (
    <>
      <h1 className={classes.heading}>
        Welcome to the <strong>Book Summary!</strong>
        <br />
        Let&#39;s summarize your favorite book!
      </h1>
      <SearchOverlay />
    </>
  );
}
