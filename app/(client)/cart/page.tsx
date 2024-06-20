"use client";
import { CartProductCard } from "./CartProduct";
import { Summary } from "./Summary";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { BreadcrumbWithCustomSeparator } from "@/components/store/BreadCrumb";
import { Inbox } from "lucide-react";
import { LinkButton } from "@/components/store/LinkButton";

const CartPage = () => {
  const { cart } = useContext(CartContext);
  const cartItems = cart.cartItems;

  return (
    <main>
      <div className="h-40 bg-W100 mb-12  ">
        <div className="max-w-[1116px] mx-auto space-y-2 pt-12  ">
          <h1 className="text-neutral-black text-2xl font-bold">Cart</h1>
          <BreadcrumbWithCustomSeparator classname="p-0 bg-transparent" />
        </div>
      </div>
      <div className="max-w-[1116px] mx-auto flex justify-between gap-[128px]">
        {cart.cartItems.length > 0 ? (
          <>
            <div className="w-[628px]">
              <h3 className="text-neutral-black font-semibold mb-3  text-[16px]">
                Your cart
              </h3>
              <hr className="border-slate-200" />
              <div className=" mt-12">
                {cartItems?.map((cartItem) => (
                  <CartProductCard
                    key={cartItem.productId}
                    cartItem={cartItem}
                  />
                ))}
              </div>
            </div>
            <Summary subtotal={cart.total} />
          </>
        ) : (
          <section className="orders w-full my-20">
            <div className="flex justify-center items-center flex-col space-y-6 text-neutral-500">
              <Inbox className="w-16 h-16  stroke-[0.5px]" />
              <p>Your cart is empty</p>
              <LinkButton href="/" label="Start Shopping" />
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default CartPage;
