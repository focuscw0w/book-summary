"use server";

import { FormState, createUserSchema } from "@/features/auth/lib/definitions";
import { redirect } from "next/navigation";

export async function createUser(prevState: FormState, formData: FormData) {
  const validatedFields = createUserSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // console.log(validatedFields);
  // if user in db
  // create user
  redirect("/");
}

export async function signIn() {}
