"use client";
import { addtoCart } from "@/actions/cart";
import { CartItem } from "@/lib/interfaces";
import { Loader } from "lucide-react";
import { getSession} from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

const initialCart = {
  id: "xxxx",
  userId: "xxxxx",
  cartItems: [],
  total: 0,
  quantity: 0,
};
type Cart = {
  id: string;
  userId: string;
  cartItems: CartItem[];
  total: number;
  quantity: number;
};

const getSavedCart = () => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : initialCart;
  }
  return initialCart;
};

const Page = () => {
  const router = useRouter();
  const [cart, setcart] = useState<Cart>(getSavedCart());
  const memoizedCart = useMemo(() => cart, [cart]);

  const pathname = usePathname();

  const handleCart = useCallback(async () => {
    const session = await getSession();
    if (session?.user) {
      if (memoizedCart.cartItems.length === 0) {
        router.push("/");
        return;
      }
      for (const product of memoizedCart.cartItems) {
        try {
          await addtoCart(
            product.product,
            product.color,
            product.size,
            product.quantity
          );
        } catch (error) {
          console.error("Error adding product to cart:", error);
        }
      }
      localStorage.removeItem("cart");
      router.push("/checkout");
    }
  }, [memoizedCart, router]);

  useEffect(() => {
    if (!pathname.includes("/call-back")) {
      redirect("/auth/call-back");
    }

    handleCart();
  }, [handleCart, pathname]);
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
