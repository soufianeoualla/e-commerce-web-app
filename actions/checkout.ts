"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";
import { getUserCart, isFirstOrder } from "@/db/queries";
import { stripe } from "@/lib/stripe";
import { ShippingAddressSchema } from "@/schemas";
import { ShippingAddress } from "@prisma/client";
import { z } from "zod";

export const createCheckoutSession = async (
  values: z.infer<typeof ShippingAddressSchema>
) => {
  const validateFields = ShippingAddressSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }
  const { email, city, country, fullName, state, streetAddress, zipCode } =
    validateFields.data;
  const session = await auth();
  const user = session?.user;
  const cart = await getUserCart();
  if (!cart) return { error: "cart is empty" };
  const firstOrder = await isFirstOrder();
  const shipping = cart.total >= 100 ? 0 : 20;
  const firstOrder0FF = firstOrder ? cart.total * 0.25 : 0;
  const totalPrice = cart.total - firstOrder0FF + shipping;

  const existingOrder = await db.order.findFirst({
    where: {
      userId: user?.id,
      amount: totalPrice,
    },
  });
  let order;
  if (existingOrder) {
    order = existingOrder;
  } else {
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substring(2, 10);
    const ref = `${timestamp}-${randomString}`.toUpperCase();

    let shippingAddress: ShippingAddress;

    const existingShippingAddress = await db.shippingAddress.findUnique({
      where: {
        email,
      },
    });
    if (!existingShippingAddress) {
      shippingAddress = await db.shippingAddress.create({
        data: { city, country, email, fullName, state, streetAddress, zipCode },
      });
    } else {
      shippingAddress = existingShippingAddress;
    }

    order = await db.order.create({
      data: {
        ref,
        orderItems: {
          create: cart.cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            color: item.color,
            size: item.size,
          })),
        },
        shippingAddressId: shippingAddress.id,
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

  const shippingRates = await stripe.shippingRates.create({
    display_name: "Standard Shipping",
    type: "fixed_amount",
    fixed_amount: {
      amount: Math.round(shipping * 100),
      currency: "usd",
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/thank-you?order=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    payment_method_types: ["card"],
    mode: "payment",
    metadata: {
      userId: user?.id!,
      orderId: order.id,
      totalPrice: totalPrice,
      firstOrderDiscount: firstOrder0FF,
    },

    line_items: lineItems,
    shipping_options: [
      {
        shipping_rate: shippingRates.id,
      },
    ],
  });
  return { url: stripeSession.url };
};
