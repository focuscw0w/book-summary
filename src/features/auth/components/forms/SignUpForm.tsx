"use client";

import Link from "next/link";

import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../context/AuthProvider";

import Button from "../UI/Button/Button";
import classes from "../../layout/AuthLayout.module.css";

const SignUpSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(10, "Password must be at least 10 characters long."),
    confirmPassword: z.string().min(10),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type FormFields = z.infer<typeof SignUpSchema>;

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(SignUpSchema),
  });
  const { signUp } = useAuth();

  async function onSubmit(data: FieldValues) {
    const { email, password } = data;

    try {
      await signUp(email, password);
    } catch (error: unknown) {
      console.log("here");
      console.error(error);
    }

    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2>Sign Up</h2>
      <div className={classes.wrapper}>
        <div>
          <input
            {...register("email")}
            type="email"
            name="email"
            placeholder="Please, enter your email"
            className={classes.input}
          />
          {errors.email && (
            <p className={classes.error}>{errors.email.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("password")}
            type="password"
            name="password"
            placeholder="Please, enter your password"
            className={classes.input}
          />
          {errors.password && (
            <p className={classes.error}>{errors.password.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("confirmPassword")}
            type="password"
            name="confirmPassword"
            placeholder="Please, confirm your password"
            className={classes.input}
          />
          {errors.confirmPassword && (
            <p className={classes.error}>{errors.confirmPassword.message}</p>
          )}
        </div>
        <Button isSubmitting={isSubmitting} type="submit" variant="signUp" />
      </div>
      <p>
        Already have an account?{" "}
        <Link href="/signin" className={classes.link}>
          Sign In
        </Link>
      </p>
    </form>
  );
}
