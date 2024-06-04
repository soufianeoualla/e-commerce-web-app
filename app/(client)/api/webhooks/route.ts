import { db } from "@/db/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature");
    if (!signature) {
      return new Response("Invalid signature", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    if (event.type === "checkout.session.completed") {
      if (!event.data.object.customer_details?.email) {
        throw new Error("Missing user email");
      }
      const session = event.data.object as Stripe.Checkout.Session;
      const { userId, orderId } = session.metadata || {
        userId: null,
        orderId: null,
      };
      if (!orderId || !userId) {
        throw new Error("Invalid request metadata");
      }
      const billingAddress = session.customer_details?.address;
      const shippingAddress = session.shipping_details?.address;

      await db.order.update({
        where: { id: orderId },
        data: {
          isPaid: true,
          ShippingAddress: {
            create: {
              fullName: session.customer_details?.name || "N/A",
                city: shippingAddress?.city || "N/A",
                country: shippingAddress?.country || "N/A",
                state: shippingAddress?.state || "N/A",
                streetAddress: shippingAddress?.line1 || "N/A",
                zipCode: shippingAddress?.postal_code || "N/A",
                email: session.customer_details?.email!,
            },
          },
          BillingAddress: {
            create: {
              fullName: session.customer_details?.name || "N/A",
              city: billingAddress?.city || "N/A",
              country: billingAddress?.country || "N/A",
              state: billingAddress?.state || "N/A",
              streetAddress: billingAddress?.line1 || "N/A",
              zipCode: billingAddress?.postal_code || "N/A",
              email: session.customer_details?.email!,
            },
          },
        },
      });
    }
    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong", ok: false },
      { status: 500 }
    );
  }
}
