"use client";
import { ProductCard } from "@/components/store/ProductCard";
import { SingleProduct } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

type Props = {
  classname?: string;
  products: SingleProduct[];
};

export const ProductsList = ({ classname, products }: Props) => {
  return (
    <div
      className={cn(
        `max-w-[1116px] flex gap-12 items-start flex-wrap sm:items-center sm:justify-center `,
        classname
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
