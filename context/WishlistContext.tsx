'use client'
import { handleUserWishlist } from "@/actions/wishlist";
import { getUserWishlist } from "@/db/queries";
import { SingleProduct, WishlistTypes } from "@/lib/interfaces";
import { useSession } from "next-auth/react";
import { ReactNode, createContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const getSavedWishlist = () => {
  if (typeof window !== "undefined") {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      return JSON.parse(savedWishlist);
    } else {
      return {
        id: 0,
        userId: "xxxxx",
        products: [],
      };
    }
  }
  return {
    id: 0,
    userId: "xxxxx",
    products: [],
  };
};

type ContextProps = {
  wishlist: WishlistTypes;
  handleWishlist: (product: SingleProduct) => void;
};

export const WishlistContext = createContext<ContextProps>({
  wishlist: { id: 0, userId: "xxxxx", products: [] },
  handleWishlist: () => {},
});

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistTypes>(getSavedWishlist());
  const [updateTrigger, setupdateTrigger] = useState<number>(0);

  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      const fetchData = async () => {
        const cartData = await getUserWishlist();
        // @ts-ignore
        setWishlist(cartData);
      };
      fetchData();
    }
  }, [status,updateTrigger]);

  useEffect(() => {
    if (status !== "authenticated") {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, status]);

  const handleWishlist = (product: SingleProduct) => {
    if (status === "authenticated") {
      handleUserWishlist(product.id);
      return setupdateTrigger(Math.random() * 100);
    }

    const newState = { ...wishlist };

    const isExist = newState.products.some(
      (item) => item.productId === product.id
    );
    if (isExist) {
      newState.products.filter((item) => item.productId !== product.id);
    } else {
      const newProduct = {
        product,
        id: uuid(),
        wishlistId: 0,
        productId: product.id,
      };
      newState.products.push(newProduct);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        handleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
