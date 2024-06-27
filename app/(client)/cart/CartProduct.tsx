"use client";
import { CartContext } from "@/context/CartContext";
import { CartItem } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

type Props = {
  viewCart?: boolean;
  cartItem: CartItem ;
 
};

export const CartProductCard = ({
  viewCart,
  cartItem,
  
}: Props) => {
  const {  handleQuantity, deleteProduct } = useContext(CartContext);

  return (
    <div className="flex justify-between items-center w-full  sm:relative">
      <div className={cn("flex items-center gap-x-8 sm:gap-x-4", viewCart && "gap-x-4")}>
        <div className="flex justify-center items-center bg-W100 rounded-sm w-20 h-20">
          <Image
            src={ cartItem.product.images[0].imageSrc}
            alt={cartItem.product.title}
            width={44}
            height={62}
          />
        </div>

        <div className="space-y-2 sm:mb-4">
          <h1 className="text-neutral-black font-medium">{cartItem.product.title}</h1>
          <div className="text-neutral-500 text-xs">
            <div className="flex items-center gap-x-2">
              Color:{" "}
              <div
                className="w-3 h-3 rounded-full  "
                style={{ background: cartItem.color }}
              />{" "}
              — <span>Size: {cartItem.size}</span>
            </div>
          </div>
        </div>
      </div>
      {viewCart && (
        <p className="text-neutral-500 font-medium">
          {" "}
          QTY :
          <span className="text-neutral-black mr-2 "> {cartItem.quantity} </span>
        </p>
      )}

      <div className={cn("flex items-center ", viewCart && "hidden")}>
        <strong className="text-neutral-black  font-medium absolute bottom-1 left-24">
          ${cartItem.product.price}
        </strong>
        <div className="flex justify-between items-center w-[107px] h-10 border border-slate-200 rounded-sm px-3 ml-8 sm:ml-2">
          <button
            onClick={() => handleQuantity!("minus", cartItem.id)}
            className="w-5 h-5 flex justify-center items-center"
          >
            <Minus
              className="h-4 w-4
                "
            />
          </button>
          <span>{cartItem.quantity} </span>
          <button
            onClick={() => handleQuantity!("plus", cartItem.id)}
            className="w-5 h-5 flex justify-center items-center"
          >
            <Plus
              className="h-4 w-4
                "
            />
          </button>
        </div>
        <button
          onClick={() => deleteProduct!(cartItem.id)}
          className="flex justify-center items-center w-10 h-10 rounded-sm bg-W100 ml-4 hover:bg-W200 sm:absolute sm:-top-6 sm:right-0"
        >
          <X className="w-4 h-4 text-neutral-600" />
        </button>
      </div>
    </div>
  );
};
