"use client";
import { addtoCart } from "@/actions/cart";
import { CartContext } from "@/context/CartContext";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const Page = () => {
  const { cart } = useContext(CartContext);
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") return;
    if (!cart.products || cart.products.length === 0) {
      return router.push("/");
    }

    cart.products.forEach(async (product) => {
      await addtoCart(
        product,
        product.selectedColor,
        product.selectedSize,
        product.quantity
      );
    });
    localStorage.removeItem("cart");

    return router.push("/cart");
  }, [cart, router, status]);
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
