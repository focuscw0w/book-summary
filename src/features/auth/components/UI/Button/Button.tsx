import classes from "./Button.module.css";

interface ButtonProps {
  type: "submit" | "button";
  variant: "signIn" | "signUp";
  onClick?: () => void;
}

export default function Button({ type, variant, onClick }: ButtonProps) {
  const buttonText = variant === "signIn" ? "Sign In" : "Sign Up";

  return (
    <div className={classes.wrapper}>
      <button className={classes.button} type={type} onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
}
