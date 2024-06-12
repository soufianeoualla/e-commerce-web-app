"use client";
import TotalPrice from "@/components/store/TotalPrice";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

export const Order = () => {
  const { cart } = useContext(CartContext);
  const products = cart.cartItems;
  const subtotal = cart.total;

  return (
    <div className="w-[372px] text-neutral-500">
      <h1 className="text-neutral-black font-bold mb-10 text-[16px]">
        Your Order
      </h1>
      <div className="flex justify-between items-center my-10">
        <div className="flex items-center gap-x-3">
          {products?.map((product) => (
            <div key={product.id} className="flex items-center gap-x-2">

            <div
              
              className="h-10 w-10 rounded-full bg-W100 flex justify-center items-center"
            >
              <Image
                src={product.product.images[0].imageSrc}
                alt={product.product.title}
                width={24}
                height={35}
              />
            </div>
            <span className="font-medium text-xs text-neutral-black">x {product.quantity} </span>
            </div>
          ))}
        </div>
        <Button
          type="button"
          asChild
          className="font-medium text-neutral-500 border border-slate-200 rounded-sm px-6 h-10 bg-white hover:bg-W100"
        >
          <Link href={"/cart"}>Edit Cart</Link>
        </Button>
      </div>
      <TotalPrice subtotal={subtotal} />

      <Button className=" w-full  bg-neutral-black text-white font-medium my-8 h-11 rounded-md  hover:bg-opacity-90 ">
        {"Place Order"}
      </Button>
    </div>
  );
};
