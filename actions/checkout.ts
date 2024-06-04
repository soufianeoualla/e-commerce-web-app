"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";
import { getUserCart, getUserOrders } from "@/db/queries";
import { stripe } from "@/lib/stripe";
import { Order } from "@prisma/client";

export const createCheckoutSession = async () => {
  const session = await auth();
  const user = session?.user;
  const cart = await getUserCart();
  if (!cart) return {error:'cart is empty'};
  const orders = await getUserOrders();
  let order: Order | undefined = undefined;
  const alreadyOrdered = orders.some((order) => order.isPaid === true);
  const totalPrice =
    !orders || !alreadyOrdered
      ? cart?.total - (cart?.total * 25) / 100
      : cart?.total;

  const existingOrder = await db.order.findFirst({
    where: {
      userId: user?.id,
      amount: totalPrice,
    },
  });
  if (existingOrder) {
    order = existingOrder;
  } else {
    order = await db.order.create({
      data: {
        orderItems:{
          create: cart.cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
        userId: user?.id!,
        amount: totalPrice,
      },
    });
  }
  const lineItems = [];

  for (const product of cart.cartItems) {
    const createdProduct = await stripe.products.create({
      name: product.product.title,
      metadata: {
        price: product.product.price.toString(),
        quantity: product.quantity.toString(),
      },
    });
    const createdPrice = await stripe.prices.create({
      product: createdProduct.id,
      unit_amount: Math.round(product.product.price * 100), 
      currency: "usd",
    });

    lineItems.push({
      price: createdPrice.id,
      quantity: product.quantity,
    });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/thank-you?order=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    payment_method_types: ["card"],
    mode: "payment",
    metadata: {
      userId: user?.id!,
      orderId: order.id,
    },
    line_items: lineItems,
  });
  return { url: stripeSession.url };
};
