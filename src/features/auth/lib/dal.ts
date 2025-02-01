// DATA ACCESSS LAYER
"server only";

import { redirect } from "next/dist/server/api-utils";
import { decrypt } from "./session";
import { cookies } from "next/headers";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  return { isAuth: true, userId: session.userId };
});
