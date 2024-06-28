"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";
import { getUserWishlist } from "@/db/queries";

export const handleUserWishlist = async (id: string) => {
  const session = await auth();
  const user = session?.user;
  if (!user) return { error: "You are not logged in " };
  const userWishlist = await db.wishlist.findFirst({
    where: {
      userId: user.id,
    },
  });
  if (!userWishlist)
    await db.wishlist.create({
      data: {
        userId: user.id!,
      },
    });
  const wishlist = await getUserWishlist();
  if (!wishlist) return;

  const wishlistItem = await db.wishlistItem.findFirst({
    where: { wishlistId: wishlist!.id, productId: id },
  });
  if (wishlistItem) {
    await db.wishlistItem.delete({
      where: { id: wishlistItem.id },
    });
  } else {
    await db.wishlistItem.create({
      data: {
        wishlistId: wishlist!.id,
        productId: id,
      },
    });
  }
};
