"use client";

import { RotatingLines, Hourglass } from "react-loader-spinner";
import classes from "./spinner.module.css";

type SpinnerVariant = "Lines" | "Hourglass";

interface SpinnerSettings {
  variant: SpinnerVariant;
  text: string;
  color: string;
}

export default function Spinner({ variant, color, text }: SpinnerSettings) {
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
            colors={[color, color]}
          />
        )}
        <p>{text}</p>
      </div>
    </div>
  );
}
