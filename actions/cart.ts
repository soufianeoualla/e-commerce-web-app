"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";
import { getUserCart } from "@/db/queries";
import { SingleProduct } from "@/lib/interfaces";
import { revalidatePath } from "next/cache";
export const addtoCart = async (
  product: SingleProduct,
  color: string,
  size: string,
  quantity: number
) => {
  const session = await auth();
  if (!session) return;

  const dbProduct = await db.product.findUnique({
    where: { id: product.id },
  });

  if (!dbProduct || dbProduct.quantity < quantity) {
    throw new Error("Product not available or insufficient stock");
  }
  const cart = await getUserCart();

  if (!cart) return;

  let cartItem = await db.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId: product.id,
      color,
      size,
    },
  });

  await db.$transaction(async (db) => {
    if (cartItem) {
      await db.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity + quantity },
      });
    } else {
      await db.cartItem.create({
        data: {
          color,
          size,
          quantity,
          productId: product.id,
          cartId: cart.id,
        },
      });
    }
  });

  await db.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      quantity: cart.quantity + quantity,
      total: cart.total + quantity * product.price,
    },
  });
  revalidatePath(`/product/${product.slug}`);
};

export const handleCartItemQuantity = async (
  operation: "plus" | "minus",
  id: string
) => {
  const session = await auth();
  if (!session) return;
  const cart = await getUserCart();
  const cartItem = await db.cartItem.findUnique({
    where: {
      id,
    },
  });
  const dbProduct = await db.product.findUnique({
    where: { id: cartItem?.productId },
  });

  if (!cartItem || !dbProduct) return;

  if (operation === "plus") {
    await db.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity: cartItem.quantity + 1,
      },
    });
    await db.cart.update({
      where: {
        id: cart?.id,
      },
      data: {
        quantity: cart?.quantity! + 1,
        total: cart?.total! + dbProduct.price,
      },
    });
  } else {
    await db.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity: cartItem.quantity - 1,
      },
    });

    await db.cart.update({
      where: {
        id: cart?.id,
      },
      data: {
        quantity: cart?.quantity! - 1,
        total: cart?.total! - dbProduct.price,
      },
    });
  }
};

export const deleteCartItem = async (id: string) => {
  const exisingCartItem = await db.cartItem.findUnique({
    where: { id },
  });
  if (!exisingCartItem) return;
  const cart = await db.cart.findUnique({
    where: {
      id: exisingCartItem.cartId,
    },
  });
  if (!cart) return;

  const product = await db.product.findUnique({
    where: {
      id: exisingCartItem.productId,
    },
  });
  if (!product) return;

  await db.cartItem.delete({
    where: { id: exisingCartItem.id },
  });

  await db.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      quantity: cart.quantity - exisingCartItem.quantity,
      total: cart.total - exisingCartItem.quantity * product?.price,
    },
  });
  revalidatePath("/cart");
};
