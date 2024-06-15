"use client";
import { OrderItem } from "@/lib/interfaces";
import Image from "next/image";

type Props = {
  orderItem: OrderItem;
};

export const OrderItemCard = ({ orderItem }: Props) => {

  return (
    <div className="flex justify-between items-center w-full">
      <div className={"flex items-center gap-x-4"}>
        <div className="flex justify-center items-center bg-W100 rounded-sm w-20 h-20">
          <Image
            src={orderItem.product.images[0].imageSrc}
            alt={orderItem.product.title}
            width={44}
            height={62}
          />
        </div>

        <div className="space-y-2">
          <h1 className="text-neutral-black font-medium">
            {orderItem.product.title}
          </h1>
          <div className="text-neutral-500 text-xs">
            <div className="flex items-center gap-x-2">
              Color:{" "}
              <div
                className="w-3 h-3 rounded-full  "
                style={{ background: orderItem.color }}
              />{" "}
              — <span>Size: {orderItem.size}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-neutral-500 font-medium">
        {" "}
        QTY :
        <span className="text-neutral-black mr-2 "> {orderItem.quantity} </span>
      </p>
    </div>
  );
};
