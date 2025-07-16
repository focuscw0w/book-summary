import prisma from "@/lib/db";
import { User } from "../../models/User";

export async function findUserInDatabase(email: string): Promise<User | null> {
  return await prisma.user.findUnique({ where: { email } });
}

export async function createUserInDatabase(
  email: string,
  hashedPassword: string
): Promise<User | null> {
  return await prisma.user.create({
    data: { email, password: hashedPassword },
  });
}
