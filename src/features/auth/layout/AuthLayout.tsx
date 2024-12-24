import { ReactNode } from "react";
import classes from "./AuthLayout.module.css";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <div className={classes.container}>{children}</div>;
}
