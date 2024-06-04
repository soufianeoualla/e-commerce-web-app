"use server";

import { db } from "@/db/db";
import { getVerificationTokenByToken } from "@/db/tokens";
import { getUserbyEmail } from "@/db/user";

export const verificationEmail = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) return { error: "not found" };

  const existingUser = await getUserbyEmail(existingToken.email);
  if (!existingUser) return { error: "User not found" };
  const isExpired = new Date(existingToken.expires_at) < new Date();
  if (isExpired) return { error: "Token has expired" };
  await db.user.update({
    where: { id: existingUser?.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });
  

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Your email has been verified" };
};
