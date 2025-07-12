"use client";

import { useEffect, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import Button from "@/components/UI/button/button";

interface SubmitButtonProps {
  children: ReactNode;
  onPendingChange?: (pending: boolean) => void;
}

export default function SubmitButton({
  children,
  onPendingChange,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  useEffect(() => {
    onPendingChange?.(pending);
  }, [pending, onPendingChange]);

  return (
    <Button isSubmitting={pending} type="submit" variant="primary">
      {children}
    </Button>
  );
}
