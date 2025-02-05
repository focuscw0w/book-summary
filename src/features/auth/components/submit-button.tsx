import { useFormStatus } from "react-dom";
import Button from "@/components/UI/button/button";

export default function SubmitButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();

  return (
    <Button isSubmitting={pending} type="submit">
      {children}
    </Button>
  );
}
