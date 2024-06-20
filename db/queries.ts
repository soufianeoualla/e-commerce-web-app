"use server";

import { auth } from "@/auth";
import { db } from "./db";
import { cache } from "react";
import { SingleProduct } from "@/lib/interfaces";
import dayjs from "dayjs";

export const getAllProducts = cache(async () => {
  return await db.product.findMany({
    include: {
      images: true,
    },
    orderBy: {
      addedAt: "desc",
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
        title: {
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

export const getProductsByCategory = async (category: string) => {
  try {
    return await db.product.findMany({
      where: {
        categories: {
          has: category,
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
  if(!user) return null

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
  if (!user) return null;
  try {
    return await db.order.findMany({
      where: { userId: user.id },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
        shippingAddress: true,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserImage = async () => {
  const session = await auth();
  const user = session?.user;
  try {
    const cureentUser = await db.user.findUnique({
      where: { id: user?.id },
    });
    return cureentUser?.image;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getOrder = async (id: string) => {
  try {
    return await db.order.findUnique({
      where: {
        id,
      },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
        shippingAddress: true,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSimilarProducts = async (categories: string[]) => {
  try {
    const similarProducts: SingleProduct[] = [];

    const productPromises = categories.map(async (category) => {
      const products = await db.product.findMany({
        where: {
          categories: {
            has: category,
          },
        },
        include: {
          images: true,
        },
      });
      return products;
    });

    const productResults = await Promise.all(productPromises);
    productResults.forEach((products) => {
      similarProducts.push(...products);
    });

    return similarProducts;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getProductReviews = async (productId: string) => {
  try {
    return await db.review.findMany({
      where: {
        productId,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProductInOrder = async (productId: string) => {
  const session = await auth();
  const user = session?.user;
  if (!user) return null;
  try {
    return await db.order.findFirst({
      where: {
        userId: user.id,
        orderItems: {
          some: {
            productId,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllReviews = async () => {
  try {
    return await db.review.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllCustomers = async () => {
  try {
    const customers = await db.shippingAddress.findMany({
      orderBy: {
        user: {
          emailVerified: "desc",
        },
      },
    });

    return customers;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllOrders = async () => {
  try {
    return await db.order.findMany({
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
        shippingAddress: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllSales = async () => {
  try {
    return await db.order.findMany({
      where: {
        isPaid: true,
        updatedAt: {
          not: null,
        },
      },
      select: {
        amount: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCustomers = async () => {
  try {
    return await db.user.findMany({
      where: {
        order: {
          some: {
            isPaid: true,
            updatedAt: {
              not: null,
            },
          },
        },
      },

      select: {
        id: true,
        order: {
          select: {
            updatedAt: true,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getBestSelling = async () => {
  const startOfMonth = dayjs().startOf("month").toDate();
  const endOfMonth = dayjs().endOf("month").toDate();
  try {
    return await db.orderItem.findMany({
      where: {
        order: {
          isPaid: true,
          updatedAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
      },
      select: {
        productId: true,
        quantity: true,
        product: {
          select: {
            price: true,
            title: true,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getOrdersGaol = async () => {
  return await db.orderGoal.findFirst();
};

export const getBestSellingProducts = async () => {
  const startOfMonth = dayjs().startOf("month").toDate();
  const endOfMonth = dayjs().endOf("month").toDate();
  try {
    return await db.orderItem.findMany({
      where: {
        order: {
          isPaid: true,
          updatedAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
      },
      include: {
        product: {
          include: {
            images: true,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const isFirstOrder = async () => {
  const session = await auth();
  const user = session?.user;
  if (!user) return null;
  try {
    const order = await db.order.findFirst({
      where: {
        userId: user.id,
        isPaid: true,
      },
    });
    return !order;
  } catch (error) {
    console.log(error);
    return true;
  }
};
