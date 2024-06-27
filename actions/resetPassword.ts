"use server";

import { getResetTokenByToken } from "@/db/tokens";
import { getUserbyEmail } from "@/db/user";
import { sendResetLinkEmail } from "@/email";
import { generateResetToken } from "@/lib/Tokens";
import { ResetPasswordSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/db/db";

export const sendResetLink = async (email: string) => {
  const existingUser = await getUserbyEmail(email);
  if (!existingUser) return { error: "Email not found" };
  const resetToken = await generateResetToken(email);
  await sendResetLinkEmail(email, existingUser.name, resetToken.token);
  return { success: "Reset link was sent successfully" };
};

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>,
  token: string
) => {
  const validateFields = ResetPasswordSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }
  const { password } = validateFields.data;
  const existingToken = await getResetTokenByToken(token);
  if (!existingToken) return { error: "invalid token" };
  const isExpired = new Date(existingToken.expires_at) < new Date();
  if (isExpired) return { error: "Token has expired" };
  const existingUser = await getUserbyEmail(existingToken.email);
  if (!existingUser) return { error: "User not found" };
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });
  return { success: "Your password has been changed successfully" };
};
