"use server";

import { redirect } from "next/navigation";

import {
  validateCredentials,
  findUserInDatabase,
  createUserInDatabase,
  hashPassword,
  comparePasswords,
  createSession,
  deleteSession,
  FormState,
  createUserSchema,
  loginSchema,
} from "@/features/auth/lib/auth";

export async function createUser(prevState: FormState, formData: FormData) {
  const validatedFields = validateCredentials(createUserSchema, formData);

  if ("errors" in validatedFields) {
    return validatedFields;
  }

  const { email, password } = validatedFields.data;

  const foundUser = await findUserInDatabase(email);

  if (foundUser) {
    return {
      errors: {
        email: ["User with this email already exists."],
      },
    };
  }

  const hashedPassword = await hashPassword(password);

  const user = await createUserInDatabase(email, hashedPassword);

  await createSession(user.id);

  redirect("/");
}

export async function loginUser(prevState: FormState, formData: FormData) {
  const validatedFields = validateCredentials(loginSchema, formData);

  if ("errors" in validatedFields) {
    return validatedFields;
  }

  const { email, password } = validatedFields.data;

  const foundUser = await findUserInDatabase(email);

  if (!foundUser) {
    return {
      errors: {
        email: ["User with this email does not exist."],
      },
    };
  }

  const isPasswordValid = await comparePasswords(password, foundUser.password);

  if (!isPasswordValid) {
    return {
      errors: {
        password: ["Invalid password. Please try again."],
      },
    };
  }

  await createSession(foundUser.id);

  redirect("/");
}

export async function logout() {
  deleteSession();
  redirect("/sign-in");
}
