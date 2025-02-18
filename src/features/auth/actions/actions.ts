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
  createUserSchema,
  loginSchema,
  FormState,
  formatErrors,
} from "@/features/auth/lib/auth";

export async function createUser(prevState: FormState, formData: FormData) {
  const validatedFields = validateCredentials(createUserSchema, formData);

  if ("errors" in validatedFields) {
    return validatedFields;
  }

  const { email, password } = validatedFields.data;

  let foundUser;
  try {
    foundUser = await findUserInDatabase(email);
  } catch (error: unknown) {
    return formatErrors(`Error finding user. ${error}`, createUserSchema);
  }

  if (foundUser) {
    return {
      errors: {
        email: ["User with this email already exists."],
      },
    };
  }

  const hashedPassword = await hashPassword(password);

  let user;
  try {
    user = await createUserInDatabase(email, hashedPassword);
  } catch (error: unknown) {
    return formatErrors(`Error creating user. ${error}`, createUserSchema);
  }

  try {
    await createSession(user.id);
  } catch (error: unknown) {
    return formatErrors(`Error creating session. ${error}`, createUserSchema);
  }

  redirect("/");
}

export async function loginUser(prevState: FormState, formData: FormData) {
  const validatedFields = validateCredentials(loginSchema, formData);

  if ("errors" in validatedFields) {
    return validatedFields;
  }

  const { email, password } = validatedFields.data;

  let foundUser;
  try {
    foundUser = await findUserInDatabase(email);
  } catch (error: unknown) {
    return formatErrors(`Error finding user. ${error}`, loginSchema);
  }

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

  try {
    await createSession(foundUser.id);
  } catch (error: unknown) {
    return formatErrors(`Error creating session. ${error}`, loginSchema);
  }

  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/sign-in");
}
