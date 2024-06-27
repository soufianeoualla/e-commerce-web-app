"use client";
import { Review, SingleProduct } from "@/lib/interfaces";
import { Heart, Minus, Plus, Share2 } from "lucide-react";
import React, { useContext, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { ImageSlider } from "./ImageSlider";
import { cn, sizes } from "@/lib/utils";
import { CartContext } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { WishlistContext } from "@/context/WishlistContext";

type Props = {
  product: SingleProduct;
  reviews: Review[];
};

export const Product = ({ product, reviews }: Props) => {
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  const { addProduct } = useContext(CartContext);
  const { wishlist, handleWishlist } = useContext(WishlistContext);
  const isExist = wishlist.products.some(
    (item) => item.productId === product.id
  );

  const handleAddToCart = () => {
    addProduct(
      product!,
      quantity,
      sizes[selectedSize].title,
      product!.colors[selectedColor]
    );
  };
  const overallRating =
    reviews.length > 0
      ? reviews.reduce((acc, val) => acc + val.rating, 0) / reviews.length
      : 0;

  return (
    <div className="flex justify-between items-center gap-x-28 gap-y-8 mb-[146px] sm:flex-col sm:justify-center">
      <ImageSlider images={product.images} />
      <div className="w-[438px] sm:w-full">
        <div className="flex justify-between items-center gap-x-28">
          <h1 className="text-neutral-black text-2xl font-bold">
            {product?.title}
          </h1>
          <Share2 className="w-5 h-5 text-neutral-500" />
        </div>

        <div className="flex items-center gap-x-2 mt-3 mb-6 ">
          <div className="flex justify-center items-center gap-x-2 px-4 h-7 bg-W100 text-neutral-500 rounded-2xl text-xs">
            <FaStar className="w-4 h-4" />
            {overallRating.toFixed(1)} — {reviews.length}{" "}
            {reviews.length === 1 ? "Review" : "Reviews"}
          </div>
          <span className="text-xs font-medium px-4 py-0.5 border rounded-3xl text-neutral-black">
            {product.quantity > 0 ? "IN STOCK" : "OUT OF STOCK"}
          </span>
        </div>

        <strong className="text-neutral-black text-lg font-semibold">
          ${product?.price}
        </strong>

        <div className="mt-8 space-y-3 mb-4">
          <span className="uppercase text-xs text-neutral-500 font-medium">
            Available Colors
          </span>
          <div className="flex items-center gap-x-4">
            {product.colors.map((color, index) => (
              <div
                key={index}
                className={cn(
                  "p-1 rounded-full",
                  selectedColor === index && "border border-neutral-black"
                )}
              >
                <button
                  onClick={() => setSelectedColor(index)}
                  className={cn(
                    "w-6 h-6 rounded-full hover:border hover:border-neutral-black/50 flex justify-center items-center"
                  )}
                  style={{ backgroundColor: color }}
                ></button>
              </div>
            ))}
          </div>
        </div>

        <div className="select-colors space-y-3">
          <span className="uppercase text-xs text-neutral-500 font-medium">
            Select Size
          </span>
          <div className="flex items-center gap-x-2 text-xs font-medium">
            {sizes.map((size, index) => (
              <Button
                disabled={!product.sizes.includes(size.title)}
                onClick={() => setSelectedSize(index)}
                key={index}
                className={cn(
                  "bg-white w-10 h-10 border text-neutral-black border-slate-200 flex justify-center items-center rounded-md hover:bg-W100 hover:border-neutral-black/50 ",
                  selectedSize === index && "bg-W100 border-neutral-black"
                )}
              >
                {size.title}
              </Button>
            ))}
          </div>
        </div>
        <div className="quantity mt-8 mb-10 space-y-3">
          <span className="uppercase text-xs text-neutral-500 font-medium">
            Quantity
          </span>
          <div className="flex justify-between text-neutral-black items-center font-medium w-[164px] h-11 border border-slate-200 rounded-md px-3">
            <button
              onClick={() =>
                setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
              }
              className="w-5 h-5 flex justify-center items-center "
            >
              <Minus
                className="h-4 w-4 hover:text-neutral-500
                "
              />
            </button>
            <span>{quantity} </span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="w-5 h-5 flex justify-center items-center "
            >
              <Plus
                className="h-4 w-4  hover:text-neutral-500
                "
              />
            </button>
          </div>
        </div>
        <div className=" flex  items-center gap-x-4 mb-3 ">
          <button
            onClick={handleAddToCart}
            className="bg-neutral-black  h-11 w-[284px] text-white font-medium rounded-md hover:bg-opacity-80"
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
        <p className="text-neutral-500 font-medium uppercase text-xs">
          — Free shipping on orders $100+
        </p>
      </div>
    </div>
  );
};
