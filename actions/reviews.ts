"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";

export const addReview = async (
  review: string,
  rating: number,
  productId: string
) => {
  const session = await auth();
  const user = session?.user;
  if (!user) return { error: "Please logged in" };
  await db.review.create({
    data: {
      rating,
      text: review,
      userId: user.id!,
      productId,
    },
  });
};
