"use server";

import { db } from "@/db/db";
import { getUserWishlist } from "@/db/queries";

export const handleUserWishlist = async (id: string) => {
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
