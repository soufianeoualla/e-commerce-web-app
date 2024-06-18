"use client";
import { addtoCart } from "@/actions/cart";
import { CartContext } from "@/context/CartContext";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const Page = () => {
  const { cart } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    if (!cart.cartItems || cart.cartItems.length === 0) {
      return router.push("/");
    }

    cart.cartItems.forEach(async (product) => {
      //@ts-ignore
      await addtoCart(product, product.color, product.size, product.quantity);
    });
    localStorage.removeItem("cart");

    return router.push("/checkout");
  }, [cart, router]);
  return (
    <div className="w-full mt-24 flex justify-center h-screen">
      <div className="flex items-center flex-col gap-2">
        <Loader className="animate-spin h-7 w-7 text-neutral-500" />
        <h3 className="font-semibold text-xl">Logging you in...</h3>
        <p className="text-neutral-500">
          You will be redirected automatically.
        </p>
      </div>
    </div>
  );
};

export default Page;
