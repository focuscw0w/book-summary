// DATA ACCESSS LAYER
"server only";

import { redirect } from "next/navigation";
import { decrypt } from "./session";
import { cookies } from "next/headers";
import { cache } from "react";
import prisma from "@/lib/db";

export const verifySession = cache(async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/sign-in");
  }

  return { isAuth: true, userId: session.userId };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(session.userId) },
      select: {
        id: true,
        email: true,
      },
    });

    return user;
  } catch (error) {
    console.log("Failed to fetch user:", error);
    return null;
  }
});
