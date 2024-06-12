"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";

export const addNewCatgeory = async (category: string) => {
  const session = await auth();
  const user = session?.user;
  if (!user || user.role !== "admin") return {error:'Your not allowed'};
  await db.category.create({
    data: {
      title: category,
    },
  });
  return {success:'Your category has been added successfully'}
};
