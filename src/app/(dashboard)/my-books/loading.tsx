import Spinner from "@/components/UI/spinner/spinner";
import classes from "./loading.module.css";

export default function Loading() {
  return (
    <div className={classes.container}>
      <Spinner variant="Lines" text="Loading your content..." color="#000000" />
    </div>
  );
}
