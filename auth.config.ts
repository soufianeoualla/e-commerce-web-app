import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "./schemas";
import { getUserbyEmail } from "./db/user";
import bcrypt from "bcryptjs";

export default {
  providers: [
    GitHub,
    Credentials({
      async authorize(credentials) {
        const validateFields = loginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;

          const user = await getUserbyEmail(email);

          if (!user || !user.password) return null;

          const isPasswordMatch = await bcrypt.compare(password, user.password);

          if (isPasswordMatch) return user;
          
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
