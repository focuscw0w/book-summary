import classes from "./Button.module.css";

interface ButtonProps {
  type: "submit" | "button";
  variant: "primary" | "danger";
  isSubmitting?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button({
  type,
  isSubmitting,
  variant,
  onClick,
  children,
}: ButtonProps) {
  const buttonColor = `${classes.button} ${
    variant === "danger" ? classes.danger : ""
  }`;

  return (
    <div className={classes.wrapper}>
      <button
        disabled={isSubmitting}
        className={buttonColor}
        type={type}
        onClick={onClick}
      >
        {isSubmitting ? "Submitting..." : children}
      </button>
    </div>
  );
}
