import classes from "./Button.module.css";

interface ButtonProps {
  type: "submit" | "button";
  isSubmitting?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button({
  type,
  isSubmitting,
  onClick,
  children,
}: ButtonProps) {
  return (
    <div className={classes.wrapper}>
      <button
        disabled={isSubmitting}
        className={classes.button}
        type={type}
        onClick={onClick}
      >
        {isSubmitting ? "Submitting..." : children}
      </button>
    </div>
  );
}
