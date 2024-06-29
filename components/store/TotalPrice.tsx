"use client";
import { formatPrice } from "@/lib/utils";

type Props = {
  subtotal: number;
};

const TotalPrice = ({ subtotal }: Props) => {
  const shipping = subtotal >= 100 ? 0 : 20;
  const total = subtotal + shipping;

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

      <hr className="border-slate-200" />
      <div className="flex justify-between items-center mt-6 text-neutral-black font-medium">
        Total
        <span>{formatPrice(total)}</span>
      </div>
    </>
  );
};

export default TotalPrice;
