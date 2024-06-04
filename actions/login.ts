"use server";
import { loginSchema } from "@/schemas";
import { z } from "zod";
import { getUserbyEmail } from "@/db/user";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/Tokens";
import { sendVerificationEmail } from "@/email";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validateFields = loginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }
  const { email, password } = validateFields.data;
  const existingUser = await getUserbyEmail(email);
  if (!existingUser) return { error: "User not found" };
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      existingUser.name,
      verificationToken.token
    );
    return {
      success:
        "Your email is not verified, another confirmation email is sent!",
    };
  }

  try {
    await signIn("credentials", { email, password });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          console.log(error);
          return { error: "Invalid credentials!" };
      }
    }
    throw error;
  }
};
