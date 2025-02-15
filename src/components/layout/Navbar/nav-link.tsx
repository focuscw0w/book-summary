"use client";

import { usePathname } from "next/navigation";
import classes from "./nav-link.module.css";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <a className={`${classes.link} ${isActive ? classes.active : ""}`}>
        {children}
      </a>
    </li>
  );
}
