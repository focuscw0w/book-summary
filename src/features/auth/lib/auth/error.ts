import { ZodSchema, z } from "zod";
import { FormState } from "./definitions";

export function formatErrors<T>(
  errorMessage: string,
  schema: ZodSchema<T>
): FormState {
  let defaultErrors = {};

  if (schema instanceof z.ZodObject) {
    defaultErrors = Object.fromEntries(
      Object.keys(schema.shape).map((key) => [key, undefined])
    );
  }

  return {
    errors: {
      ...defaultErrors,
      message: [errorMessage],
    },
  };
}
