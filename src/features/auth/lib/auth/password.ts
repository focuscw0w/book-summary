import bcrypt from "bcryptjs";

export async function comparePasswords(
  textPassword: string,
  hashedPassword: string
) {
  return bcrypt.compare(textPassword, hashedPassword);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}
