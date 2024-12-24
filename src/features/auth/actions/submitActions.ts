"use server";
import { z } from "zod";

const SignUpFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export async function signUpAction(
  email: string,
  password: string,
  confirmPassword: string
) {}

const SignInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function signInAction(email: string, password: string) {}
