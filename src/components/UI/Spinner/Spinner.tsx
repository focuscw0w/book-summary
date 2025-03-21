"use client";

import { RotatingLines, Hourglass } from "react-loader-spinner";
import classes from "./spinner.module.css";

type SpinnerVariant = "Lines" | "Hourglass";

interface SpinnerSettings {
  variant: SpinnerVariant;
  color: string;
}

export default function Spinner({ variant, color }: SpinnerSettings) {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {variant === "Lines" ? (
          <RotatingLines
            visible={true}
            width="50"
            strokeWidth="4"
            strokeColor={color}
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        ) : (
          <Hourglass
            width="50"
            ariaLabel="hourglass-loading"
            colors={["#000000", "#000000"]}
          />
        )}
        <p>Searching your book...</p>
      </div>
    </div>
  );
}
