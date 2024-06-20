"use client";
import { isFirstOrder } from "@/db/queries";
import { cn, formatPrice } from "@/lib/utils";
import React, { useEffect, useState } from "react";

type Props = {
  subtotal: number;
};

const TotalPrice = ({ subtotal }: Props) => {
  const [firstOrder, setfirstOrder] = useState<boolean | null>();
  useEffect(() => {
    const getData = async () => {
      const data = await isFirstOrder();
      setfirstOrder(data);
    };
    getData();
  }, []);
  const tax = 3;
  const shipping = subtotal >= 100 ? 0 : 20;
  const firstOrder0FF = firstOrder ? subtotal * 0.25 : 0;
  const total = subtotal * (1 + tax / 100) - firstOrder0FF + shipping;

  return (
    <>
      <div className="flex justify-between items-center">
        Subtotal
        <span className="text-neutral-black font-medium">
          {formatPrice(subtotal)}
        </span>
      </div>
      <div className="flex justify-between items-center my-3">
        Shipping:
        <span className="text-neutral-black font-medium">
          {subtotal >= 100 ? "FREE" : "$20.00"}
        </span>
      </div>
      <div
        className={cn(
          "flex justify-between items-center  ",
          !firstOrder && "mb-6"
        )}
      >
        Tax:
        <span className="text-neutral-black font-medium">% {tax}</span>
      </div>
      {firstOrder && (
        <div className="flex justify-between items-center mt-3 mb-6">
          First Order:
          <span className="text-neutral-black font-medium">25% OFF</span>
        </div>
      )}
      <hr className="border-slate-200" />
      <div className="flex justify-between items-center mt-6 text-neutral-black font-medium">
        Total
        <span>{formatPrice(total)}</span>
      </div>
    </>
  );
};

export default TotalPrice;
