"use client";
import { createCheckoutSession } from "@/actions/checkout";
import TotalPrice from "@/components/store/TotalPrice";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
type Props = {
  subtotal: number;
};

export const Summary = ({ subtotal }: Props) => {
  const { status } = useSession();
  const router = useRouter();

  return (
    <div className="w-[341px] py-8 px-6 rounded-md border border-slate-200 text-neutral-500">
      <h1 className="text-neutral-black font-bold mb-10 text-[16px]">
        Order Summary
      </h1>
      <TotalPrice subtotal={subtotal} />
      <Button
        onClick={() => {
          status === "authenticated"
            ? router.push("/checkout")
            : router.push("/auth/login");
        }}
        className=" w-full  bg-neutral-black text-white font-medium my-8 h-11 rounded-md  hover:bg-opacity-90 "
      >
        {"Checkout"}
      </Button>
      <Link
        href={"/"}
        className="flex justify-center items-center underline text-neutral-500 hover:text-neutral-black font-medium text-xs "
      >
        Continue Shopping
      </Link>
    </div>
  );
};
