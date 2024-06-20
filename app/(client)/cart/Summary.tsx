"use client";
import TotalPrice from "@/components/store/TotalPrice";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
type Props = {
  subtotal: number;
};

export const Summary = ({ subtotal }: Props) => {
  const router = useRouter();
  const { status } = useSession();
  const handleCheckout = () => {
    if (status === "authenticated") {
      router.push("/checkout");
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div className="w-[341px] h-[380px] py-8 px-6 rounded-md border border-slate-200 text-neutral-500">
      <h1 className="text-neutral-black font-bold mb-10 text-[16px]">
        Order Summary
      </h1>
      <TotalPrice subtotal={subtotal} />
      <Button
        onClick={handleCheckout}
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
