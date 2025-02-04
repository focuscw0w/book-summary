import prisma from "@/lib/db";

// use try catch block to handle errors
export async function findUserInDatabase(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

// use try catch block to handle errors
export async function createUserInDatabase(
  email: string,
  hashedPassword: string
) {
  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
}
