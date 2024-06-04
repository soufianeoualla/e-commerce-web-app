import Image from "next/image";
import Link from "next/link";
import { SingleProduct } from "@/lib/interfaces";
import { Heart } from "lucide-react";

type Props = {
  product: SingleProduct;
};

export const ProductCard = async ({ product }: Props) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="relative group">
        <div className="bg-W100 w-[237px] h-[312px] flex justify-center items-center z-20">
          <Image
            src={product.images[0].imageSrc}
            alt=""
            width={237}
            height={312}
          />

          <div className="absolute w-[237px] h-[320px] top-0 bg-white/30 hidden group-hover:block">
            <button className="absolute right-2 top-2">
              <Heart className="w-6 h-6 text-neutral-500 hover:text-red-400" startOffset={1}  />
            </button>
            <button className="w-full h-12 absolute bottom-0 bg-neutral-black text-white font-medium tracking-wide hover:bg-opacity-80">
              Select Variant
            </button>
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
    </Link>
  );
};
