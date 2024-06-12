'use server'
import { auth } from "@/auth";
import { db } from "@/db/db";

export const changeAccounDetails = async (
  name: string,
  email: string,
  image: string | null | undefined
) => {
  const updateData: { name?: string; email?: string; image?: string } = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (image) updateData.image = image;

  if (Object.keys(updateData).length === 0) {
    return { error: "No updates provided" };
  }

  const session = await auth();
  const user = session?.user;
  if (!user) return { error: "Please logged in" };

  

  try {
    await db.user.update({
      where: { id: user.id },
      data: updateData,
    });
  } catch (error) {
    console.error("Failed to update user details:", error);
    return { error: "Failed to update user details" };
  }

  return { success: "Your details are updated successfully" };
};
