"use client";
import { handleUserWishlist } from "@/actions/wishlist";
import { getUserWishlist } from "@/db/queries";
import { SingleProduct, WishlistTypes } from "@/lib/interfaces";
import { useSession } from "next-auth/react";
import { ReactNode, createContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const initialWishlist = {
  id: 0,
  userId: "xxxxx",
  products: [],
};

const getSavedWishlist = () => {
  if (typeof window !== "undefined") {
    const savedWishlist = localStorage.getItem("wishlist");
    savedWishlist ? JSON.parse(savedWishlist) : initialWishlist;
  }
  return initialWishlist;
};

type ContextProps = {
  wishlist: WishlistTypes;
  handleWishlist: (product: SingleProduct) => void;
};

export const WishlistContext = createContext<ContextProps>({
  wishlist: initialWishlist,
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
      localStorage.removeItem("wishlist");
    }
  }, [status, updateTrigger]);

  useEffect(() => {
    if (status !== "authenticated") {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, status]);

  const handleWishlist = (product: SingleProduct) => {
    if (status === "authenticated") {
      handleUserWishlist(product.id);
    } else {
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
    }
    setupdateTrigger(Math.random() * 100);
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
