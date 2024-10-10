import MainHeader from "@/app/components/MainHeader/MainHeader";
import classes from "./page.module.css";
import SearchInput from "@/app/components/SearchInput/SearchInput";

export default function Home() {
  return (
    <div className="container">
      <MainHeader />
      <h1 className={classes.heading}>
        Welcome to the <strong>Book Summary!</strong>
        <br />
        Let&#39;s summarize your favorite book!
      </h1>
      <SearchInput />
    </div>
  );
}
