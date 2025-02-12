import { ZodSchema } from "zod";

export function validateCredentials<T>(
  schema: ZodSchema<T>,
  formData: FormData
) {
  const validatedFields = schema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      errors: {
        ...validatedFields.error.flatten().fieldErrors,
        message: undefined,
      },
    };
  }

  return validatedFields;
}
