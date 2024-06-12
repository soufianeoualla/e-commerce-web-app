"use client";
import Image from "next/image";
import Link from "next/link";
import { SingleProduct } from "@/lib/interfaces";
import { Heart } from "lucide-react";
import { useContext } from "react";
import { WishlistContext } from "@/context/WishlistContext";

type Props = {
  product: SingleProduct;
};

export const ProductCard = async ({ product }: Props) => {
  const { wishlist, handleWishlist } = useContext(WishlistContext);
  const isExist = wishlist.products.some(
    (item) => item.productId === product.id
  );
  
  return (
    <div>
      <div className="relative group">
        <div className="bg-W100 w-[237px] h-[312px] flex justify-center items-center z-20">
          <Image
            src={product.images[0].imageSrc}
            alt=""
            width={237}
            height={312}
          />

          <div className="absolute w-[237px] h-[320px] top-0 bg-white/30 hidden group-hover:block">
            <button
              onClick={() => handleWishlist(product)}
              className="absolute right-2 top-2"
            >
              <Heart
                className={
                  isExist
                    ? "fill-rose-500 text-rose-500"
                    : "hover:fill-rose-500 hover:text-rose-500"
                }
              />
            </button>
            <Link
              href={`/product/${product.slug}`}
              className="w-full h-12 absolute bottom-0 bg-neutral-black text-white font-medium tracking-wide hover:bg-opacity-80 flex justify-center items-center"
            >
              Select Variant
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <p className="text-neutral-black font-medium">{product.title}</p>
        <div className="space-x-3">
          <span className="text-xs font-medium px-4 py-0.5 border rounded-3xl text-neutral-black">
            {product.quantity > 0 ? "IN STOCK" : "OUT OF STOCK"}
          </span>
          <span className="text-neutral-600">${product.price}</span>
        </div>
      </div>
    </div>
  );
};
