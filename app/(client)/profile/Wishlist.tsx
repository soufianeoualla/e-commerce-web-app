import React from "react";
import { Product } from "./Product";
import { getUserWishlist } from "@/db/queries";

export const Wishlist = async () => {
  const wishlist = await getUserWishlist();
  return (
    <section className=" w-full">
      <h3 className="text-[16px] text-neutral-black font-semibold">Wishlist</h3>
      <div>
        {wishlist?.products.map((product) => (
          <Product key={product.id} wishlist />
        ))}
      </div>
    </section>
  );
};
