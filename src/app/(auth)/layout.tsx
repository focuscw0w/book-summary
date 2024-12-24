import { AuthProvider } from "@/features/auth/context/AuthProvider";
import classes from "./layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <AuthProvider>
      <div className={classes.container}>{children}</div>;
    </AuthProvider>
  );
}
