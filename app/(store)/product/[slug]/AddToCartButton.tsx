"use client";
import { WishlistContext } from "@/context/WishlistContext";
import { SingleProduct } from "@/lib/interfaces";
import { Heart } from "lucide-react";
import { useContext } from "react";
type Props = {
  product: SingleProduct;
  handleAddToCart: () => void;
};

export const AddToCartButton = ({ product, handleAddToCart }: Props) => {
  const { wishlist, handleWishlist } = useContext(WishlistContext);
  const isExist = wishlist.products.some(
    (item) => item.productId === product.id
  );
  return (
    <div className=" flex  items-center gap-x-4 mb-3 ">
      <button
        onClick={handleAddToCart}
        className="bg-neutral-black  h-11 w-[284px] sm:w-[250px] text-white font-medium rounded-md hover:bg-opacity-80"
      >
        Add to cart
      </button>
      <button
        onClick={() => handleWishlist(product)}
        className="rounded-md border border-slate-200 h-11 w-11 flex justify-center items-center text-neutral-600 hover:bg-W100"
      >
        <Heart
          className={
            isExist
              ? "fill-rose-500 text-rose-500"
              : "hover:fill-rose-500 hover:text-rose-500"
          }
        />
      </button>
    </div>
  );
};
