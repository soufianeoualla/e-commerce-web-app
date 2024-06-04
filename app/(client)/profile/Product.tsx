import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type Props = {
  wishlist?: boolean;
};

export const Product = ({ wishlist }: Props) => {
  return (
    <div className="flex justify-between items-center mt-14 pb-8 border-b border-b-slate-200">
      <div className="flex justify-center items-center gap-x-8">
        <div className="bg-W100 flex justify-center items-center h-20 w-20 rounded-sm">
          <Image src={"tee.svg"} alt="tee" width={44} height={62} />
        </div>
        <div className="space-y-1">
          <b className="text-neutral-black font-medium">
            Raw Black T-Shirt Lineup
          </b>
          <p className="text-neutral-500 text-xs">Ordered on: 27 July 2023</p>
          {wishlist ? (
            <button className="text-neutral-black  hover:underline hover:font-medium text-xs">
              Remove item
            </button>
          ) : (
            <span className="text-neutral-black text-xs">$70.00</span>
          )}
        </div>
      </div>
      <div className="space-x-8">
        <span className={cn(" text-neutral-black", !wishlist && "underline")}>
          {wishlist ? " $75.00" : "Processing"}
        </span>
        <button className="h-11 rounded-sm border border-slate-300 text-neutral-black font-medium w-[114px] hover:bg-W100">
          {wishlist ? "Add to Cart" : "View item"}
        </button>
      </div>
    </div>
  );
};
