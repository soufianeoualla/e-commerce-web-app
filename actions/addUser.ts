"use server";
import { auth } from "@/auth";

import { getUserbyEmail } from "@/db/user";
import { db } from "@/db/db";
export const addUser = async (
  email:string
) => {
  const session = await auth();
  const user = session?.user;
  if (!user || user.role !== "admin") return {error:'Your not allowed'};

  const existingUser = await getUserbyEmail(email);
  if (!existingUser) return { error: "User not found" };
  
  await db.user.update({
    where:{
        id:existingUser.id
    },
    data: {
      role: "admin",
    },
  });
  return { success: "The role of the user has been changed successfully" };
};