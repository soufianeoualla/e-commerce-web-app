"use server";
import { auth } from "@/auth";
import { db } from "@/db/db";
import { getUserById } from "@/db/user";
import { ShippingAddressSchema, changePasswordSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const addShippingAddress = async (
  values: z.infer<typeof ShippingAddressSchema>
) => {
  const session = await auth();
  const user = session?.user;
  if (!user) return;
  const validateFields = ShippingAddressSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }
  const { city, country, state, streetAddress, zipCode } = validateFields.data;
  const existingAddress = await db.shippingAddress.findFirst({
    where: { email: user?.email! },
  });

  if (existingAddress) {
    return await db.shippingAddress.update({
      where: { id: existingAddress.id },
      data: {
        city,
        country,
        state,
        streetAddress,
        zipCode,
      },
    });
  }

  await db.shippingAddress.create({
    data: {
      city,
      country,
      state,
      streetAddress,
      zipCode,
      email: user?.email!,
      fullName: user?.name!,
    },
  });
};
export const changePassword = async (
  values: z.infer<typeof changePasswordSchema>
) => {
  const session = await auth();
  const user = session?.user;
  if (!user) return { error: "Please logged in" };
  const validateFields = changePasswordSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }
  const { password, oldPassword } = validateFields.data;
  const existingUser = await getUserById(user.id!);
  if (!existingUser) return { error: "user not found" };
  const passwordMatch = await bcrypt.compare(
    oldPassword,
    existingUser.password!
  );
  if (!passwordMatch) return {error:'Wrong Password'} 
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.update({
      where: { id: existingUser.id },
      data: {
        password: hashedPassword,
      },
    });
    return { success: "Password has been changed successfully" };

};
