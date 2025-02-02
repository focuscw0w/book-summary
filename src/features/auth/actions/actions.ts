"use server";

import { redirect } from "next/navigation";

import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import {
  FormState,
  createUserSchema,
  loginSchema,
} from "@/features/auth/lib/definitions";
import { createSession, deleteSession, updateSession } from "../lib/session";
import { comparePasswords } from "../lib/helper";

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

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    return {
      errors: {
        email: ["User with this email already exists."],
      },
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  await createSession(user.id);

  redirect("/");
}

export async function loginUser(prevState: FormState, formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return {
      errors: {
        email: ["User with this email does not exist."],
      },
    };
  }

  const isPasswordValid = await comparePasswords(
    password,
    existingUser.password
  );

  if (!isPasswordValid) {
    return {
      errors: {
        password: ["Invalid password. Please try again."],
      },
    };
  }

  const existingSession = await prisma.session.findFirst({
    where: { userId: existingUser.id },
  });

  // maybe only create a new session
  if (existingSession) {
    await updateSession(existingSession.id);
  } else {
    await createSession(existingUser.id);
  }

  redirect("/");
}

export async function logout() {
  deleteSession();
  redirect("/sign-in");
}
