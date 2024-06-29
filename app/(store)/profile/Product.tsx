"use client";
import { SingleProduct } from "@/lib/interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";
type Props = {
  product: SingleProduct;
};

export const Product = ({ product }: Props) => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center mt-14 pb-8 border-b border-b-slate-200  relative">
      <div className="flex justify-center items-center gap-x-8 sm:gap-x-3">
        <div className="bg-W100 flex justify-center items-center h-20 w-20 rounded-sm sm:h-14 sm:w-14">
          <Image
            src={product.images[0].imageSrc}
            alt={product.title}
            width={44}
            height={62}
            className="sm:w-8 sm:h-12"
          />
        </div>
        <div className="space-y-1">
          <b className="text-neutral-black font-medium ">{product.title}</b>
          <p className="text-xs text-neutral-500 font-medium">
            Added on: 27 July 2023
          </p>
          <button className="text-neutral-black  hover:underline hover:font-medium text-xs">
            Remove item
          </button>
        </div>
      </div>
      <div className="space-x-8">
        <span className={" text-neutral-black sm:absolute sm:top-0 sm:right-0"}>
          ${product.price}
        </span>
        <button
          onClick={() => {
            router.push(`/product/${product.slug}`);
          }}
          className="h-11 rounded-sm border border-slate-300 text-neutral-black font-medium w-[114px] hover:bg-W100 sm:mt-4"
        >
          {"Add to Cart"}
        </button>
      </div>
    </div>
  );
};
