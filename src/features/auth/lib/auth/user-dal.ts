import prisma from "@/lib/db";

export async function findUserInDatabase(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function createUserInDatabase(
  email: string,
  hashedPassword: string
) {
  return await prisma.user.create({
    data: { email, password: hashedPassword },
  });
}
