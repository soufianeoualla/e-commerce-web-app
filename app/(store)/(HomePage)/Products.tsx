"use client";
import { ProductsList } from "./ProductsList";
import { SingleProduct } from "@/lib/interfaces";

import { ProductSkeleton } from "@/components/store/ProductSkeleton";

type Props = {
  products: SingleProduct[];
};

export const Products = ({ products }: Props) => {
  if (!products)
    return (
      <div className="max-w-[1116px] mx-auto mb-12">
        <div className="flex justify-between flex-wrap">
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </div>
      </div>
    );
  return <ProductsList products={products.slice(0, 4)} />;
};
