"use client";
import React, { useEffect, useState } from "react";
import { Product } from "./Product";
import { getUserWishlist } from "@/db/queries";
import { WishlistTypes } from "@/lib/interfaces";
import { Inbox, Loader } from "lucide-react";
import { LinkButton } from "@/components/store/LinkButton";

export const Wishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistTypes | null>();
  useEffect(() => {
    const getData = async () => {
      const data = await getUserWishlist();
      setWishlist(data);
    };
    getData();
  }, []);

  if (!wishlist)
    return (
      <section className="wishlist w-full mt-20">
        <div className="flex justify-center items-center   text-neutral-500">
          <Loader className="animate-spin" />
        </div>
      </section>
    );

  if (wishlist?.products.length === 0)
    return (
      <section className="orders w-full mt-20">
        <div className="flex justify-center items-center flex-col space-y-6 text-neutral-500">
          <Inbox className="w-16 h-16  stroke-[0.5px]" />
          <p>Your wishlist history is waiting to be filled.</p>
          <LinkButton href="/" label="Start Shopping" />
        </div>
      </section>
    );

  return (
    <section className=" w-full">
      <h3 className="text-[16px] text-neutral-black font-semibold">Wishlist</h3>
      <div>
        {wishlist.products.map((item) => (
          <Product key={item.id} product={item.product} />
        ))}
      </div>
    </section>
  );
};
