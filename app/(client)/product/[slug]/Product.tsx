"use client";
import { SingleProduct } from "@/lib/interfaces";
import { Check, Heart, Minus, Plus, Share2 } from "lucide-react";
import React, { useContext, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { ImageSlider } from "./ImageSlider";
import { cn } from "@/lib/utils";
import { CartContext } from "@/context/CartContext";
import { SonnerContext } from "@/context/SonnerContext";
import { handleUserWishlist } from "@/actions/wishlist";

type Props = {
  product: SingleProduct;
};

export const Product = ({ product }: Props) => {
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  const { addProduct } = useContext(CartContext);
  const { handleSonner } = useContext(SonnerContext);

  const handleAddToCart = () => {
    addProduct(
      product!,
      quantity,
      product!.sizes[selectedSize],
      product!.colors[selectedColor]
    );
    handleSonner("item add to cart");
  };

  return (
    <div className="flex justify-between items-center gap-x-28 mb-[146px]">
      <ImageSlider images={product.images} />
      <div className="w-[438px]">
        <div className="flex justify-between items-center gap-x-28">
          <h1 className="text-neutral-black text-2xl font-bold">
            {product?.title}
          </h1>
          <Share2 className="w-5 h-5 text-neutral-500" />
        </div>

        <div className="flex items-center gap-x-2 mt-3 mb-6 ">
          <div className="flex justify-center items-center gap-x-2 px-4 h-7 bg-W100 text-neutral-500 rounded-2xl text-xs">
            <FaStar className="w-4 h-4" />
            4.2 — 54 Reviews
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
              <button
                onClick={() => setSelectedColor(index)}
                key={index}
                className={cn(
                  "w-6 h-6 rounded-full hover:border hover:border-neutral-black/50 flex justify-center items-center",
                  selectedColor === index && "border border-neutral-black"
                )}
                style={{ backgroundColor: color }}
              >
                {selectedColor === index && (
                  <Check className="w-5 h-5 text-neutral-black" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="select-colors space-y-3">
          <span className="uppercase text-xs text-neutral-500 font-medium">
            Select Size
          </span>
          <div className="flex items-center gap-x-2 text-xs font-medium">
            {product.sizes.map((size, index) => (
              <button
                onClick={() => setSelectedSize(index)}
                key={index}
                className={cn(
                  "w-10 h-10 border border-slate-200 flex justify-center items-center rounded-md hover:bg-W100 hover:border-neutral-black/50",
                  selectedSize === index && "bg-W100 border-neutral-black"
                )}
              >
                {size}
              </button>
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
        <div className="cta flex  items-center gap-x-4 mb-3">
          <button
            onClick={handleAddToCart}
            className="bg-neutral-black h-11 w-[284px] text-white font-medium rounded-md hover:bg-opacity-80"
          >
            Add to cart
          </button>
          <button
            onClick={() => handleUserWishlist(product.id)}
            className="rounded-md border border-slate-200 h-11 w-11 flex justify-center items-center text-neutral-600 hover:bg-W100"
          >
            <Heart />
          </button>
        </div>
        <p className="text-neutral-500 font-medium uppercase text-xs">
          — Free shipping on orders $100+
        </p>
      </div>
    </div>
  );
};
