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
  const [error, setError] = useState<string | undefined>("");
  const [url, seturl] = useState<string | null | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { status } = useSession();
  const router = useRouter();
  const handleCheckout = () => {
    startTransition(() => {
      createCheckoutSession().then((data) => {
        setError(data?.error);
        seturl(data?.url);
      });
      if (url) {
        router.push(url);
      }
    });
  };
  return (
    <div className="w-[341px] py-8 px-6 rounded-md border border-slate-200 text-neutral-500">
      <h1 className="text-neutral-black font-bold mb-10 text-[16px]">
        Order Summary
      </h1>
      <TotalPrice subtotal={subtotal} />
      {status === "authenticated" ? (
        <Button
          disabled={isPending}
          onClick={handleCheckout}
          className=" w-full  bg-neutral-black text-white font-medium my-8 h-11 rounded-md  hover:bg-opacity-90 "
        >
          {"Checkout"}
        </Button>
      ) : (
        <Button
          onClick={() => router.push("/auth/login")}
          className=" w-full  bg-neutral-black text-white font-medium my-8 h-11 rounded-md  hover:bg-opacity-90 "
        >
          Please Log In
        </Button>
      )}
      <Link
        href={"/"}
        className="flex justify-center items-center underline text-neutral-500 hover:text-neutral-black font-medium text-xs "
      >
        Continue Shopping
      </Link>
    </div>
  );
};
