"use server";
import { registerSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { getUserbyEmail } from "@/db/user";
import { db } from "@/db/db";
import { generateVerificationToken } from "@/lib/Tokens";
import { sendVerificationEmail } from "@/email";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validateFields = registerSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }
  const { email, name, password } = validateFields.data;
  const existingUser = await getUserbyEmail(email);
  if (existingUser) return { error: "Email already exist" };
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      cart: {
        create: {
          total: 0.0,
          quantity: 0,
        },
      },
      wishlist: {
        create: {},
      },
      
    },
  });
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(
    verificationToken.email,
    name,
    verificationToken.token
  );
  return { success: "Confirmation email sent!" };
};
