"use server";

import { auth } from "@/auth";
import { db } from "./db";
import { cache } from "react";

export const getAllProducts = cache(async () => {
  return await db.product.findMany({
    include: {
      images: true,
    },
  });
});

export const getSingleProduct = cache(async (slug: string) => {
  const product = await db.product.findUnique({
    where: {
      slug,
    },
    include: {
      images: true,
    },
  });
  return product;
});
export const getProductBySearch = async (title: string) => {
  try {
    return await db.product.findMany({
      where: {
        slug: {
          contains: title,
        },
      },
      include: {
        images: true,
      },
    });
  } catch (error) {
    return null;
  }
};

export const getAllCategories = async () => {
  return await db.category.findMany();
};

export const getFeaturedProducts = async () => {
  return await db.product.findMany({
    where: {
      isFeatured: true,
    },
    include: {
      images: true,
    },
  });
};

export const getUserCart = async () => {
  const session = await auth();
  const user = session?.user;

  try {
    const cureentUser = await db.user.findUnique({
      where: {
        id: user?.id,
      },
      include: {
        cart: {
          include: {
            cartItems: {
              include: {
                product: {
                  include: {
                    images: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const cart = cureentUser?.cart;
    return cart;
  } catch (error) {
    return null;
  }
};

export const getUserWishlist = async () => {
  const session = await auth();
  const user = session?.user;

  try {
    const cureentUser = await db.user.findUnique({
      where: {
        id: user?.id,
      },
      include: {
        wishlist: {
          include: {
            products: {
              include: {
                product: {
                  include: {
                    images: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const wishlist = cureentUser?.wishlist;
    return wishlist;
  } catch (error) {
    return null;
  }
};

export const getUserShippingAddress = async () => {
  const session = await auth();
  if (!session) return;
  const user = session.user;
  return await db.shippingAddress.findFirst({
    where: { email: user?.email! },
  });
};

export const getUserOrders = async () => {
  const session = await auth();
  const user = session?.user;
  return await db.order.findMany({
    where: { userId: user?.id },
  });
};
