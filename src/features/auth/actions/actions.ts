"use server";

import { redirect } from "next/navigation";

import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { FormState, createUserSchema } from "@/features/auth/lib/definitions";

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

  const { email, password } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      errors: {
        email: ["User with this email already exists."],
      },
    };
  }

  //const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
    },
  });

  redirect("/");
}
