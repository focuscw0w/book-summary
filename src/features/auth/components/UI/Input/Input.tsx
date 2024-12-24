import { ChangeEvent, forwardRef } from "react";
import classes from "./Input.module.css";

interface InputProps {
  type: "text" | "number" | "email" | "password";
  label: string;
  value?: string | number;
  name: string;
  placeholder: string;
  error?: boolean;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, label, name, placeholder, error, disabled }, ref) => {
    return (
      <div className={classes.wrapper}>
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          className={`${classes.input} ${error ? classes.error : ""}`}
          ref={ref}
        />
        {error && <p className={classes.errorText}>This field is required.</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
