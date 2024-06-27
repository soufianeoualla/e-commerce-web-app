"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";
import { CartProductCard } from "@/app/(client)/cart/CartProduct";

export const CartSheet = () => {
  const { cart } = useContext(CartContext);

  const quantity = cart.quantity;
  const cartItems = cart.cartItems;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative">
          <ShoppingCart
            width={25}
            strokeWidth={1.5}
            height={25}
            className="hover:text-neutral-black cursor-pointer"
          />
          {quantity > 0 && (
            <span className="absolute -top-1 -right-2 w-[18px] h-[18px] rounded-full bg-neutral-black text-white flex justify-center items-center text-xs">
              {quantity}{" "}
            </span>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="sm:w-full ">
        <SheetHeader className="mb-10">
          <SheetTitle>Cart ({quantity}) </SheetTitle>
        </SheetHeader>
        <div className="space-y-4">
          {cartItems?.map((cartItem) => (
            <CartProductCard
              cartItem={cartItem}
              key={cartItem.productId}
              viewCart
            />
          ))}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Link
              href={"/cart"}
              className="bg-neutral-black h-11 w-[90%] tracking-wide bottom-4 absolute left-1/2 -translate-x-1/2 text-white font-medium rounded-md hover:bg-opacity-80 flex justify-center items-center"
            >
              View Cart
            </Link>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
