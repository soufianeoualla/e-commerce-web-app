"use client";
import TotalPrice from "@/components/store/TotalPrice";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import { UserCartContext } from "@/context/UserCartContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

export const Order = () => {
  const { cart } = useContext(CartContext);
  const { cartProducts, cartTotal } = useContext(UserCartContext);
  const products = cartProducts || cart.products;
  const subtotal = cartTotal || cart.total;

  return (
    <div className="w-[372px] text-neutral-500">
      <h1 className="text-neutral-black font-bold mb-10 text-[16px]">
        Your Order
      </h1>
      <div className="flex justify-between items-center my-10">
        <div className="flex items-center gap-x-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="h-10 w-10 rounded-full bg-W100 flex justify-center items-center"
            >
              <Image
                src={product.images[0].imageSrc}
                alt={product.title}
                width={24}
                height={35}
              />
            </div>
          ))}
        </div>
        <Button
          asChild
          className="font-medium text-neutral-500 border border-slate-200 rounded-sm px-6 h-10 bg-white hover:bg-W100"
        >
          <Link href={"/cart"}>Edit Cart</Link>
        </Button>
      </div>
      <TotalPrice subtotal={subtotal} />

      <button className="w-full bg-neutral-black text-white font-medium my-8 h-11 rounded-md hover:bg-opacity-90 ">
        Place Order
      </button>
    </div>
  );
};
