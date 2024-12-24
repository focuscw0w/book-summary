import classes from "./Button.module.css";

interface ButtonProps {
  type: "submit" | "button";
  variant: "signIn" | "signUp";
  isSubmitting: boolean;
  onClick?: () => void;
}

export default function Button({
  type,
  variant,
  isSubmitting,
  onClick,
}: ButtonProps) {
  const buttonText = variant === "signIn" ? "Sign In" : "Sign Up";

  return (
    <div className={classes.wrapper}>
      <button
        disabled={isSubmitting}
        className={classes.button}
        type={type}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
}
