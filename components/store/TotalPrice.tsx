import { formatPrice } from "@/lib/utils";
import React from "react";

type Props = {
  subtotal: number;
};

const TotalPrice = ({ subtotal }: Props) => {
  const tax = 3;
  const total = subtotal * (1 + tax / 100);

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
        <span className="text-neutral-black font-medium">Free</span>
      </div>
      <div className="flex justify-between items-center  mb-6">
        Tax:
        <span className="text-neutral-black font-medium">% {tax}</span>
      </div>
      <hr className="border-slate-200" />
      <div className="flex justify-between items-center mt-6 text-neutral-black font-medium">
        Total
        <span>{formatPrice(total)}</span>
      </div>
    </>
  );
};

export default TotalPrice;
