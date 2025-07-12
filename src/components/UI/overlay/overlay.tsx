"use client";

import { createPortal } from "react-dom";
import { ReactNode, useEffect, useState } from "react";
import classes from "./overlay.module.css";

export default function Overlay({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className={classes.overlay}>{children}</div>,
    document.body
  );
}
