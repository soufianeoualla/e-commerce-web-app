"use client";
import { useEffect, useState } from "react";
import { ProductsList } from "./ProductsList";
import { cn } from "@/lib/utils";
import { getAllProducts, getFeaturedProducts } from "@/db/queries";
import { ProductSkeleton } from "@/components/store/ProductSkeleton";
import { SingleProduct } from "@/lib/interfaces";
export const ProductCategory = () => {
  const categories = ["featured", "latest"];
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [products, setProducts] = useState<SingleProduct[] | null>();
  useEffect(() => {
    const getData = async () => {
      const products =
        selectedCategory === 0
          ? await getFeaturedProducts()
          : await getAllProducts();

      if (products) {
        setProducts(
          products.sort((a, b) => b.addedAt.getTime() - a.addedAt.getTime())
        );
      }
    };
    getData();
  }, [selectedCategory]);
  if (!products)
    return (
      <div className="max-w-[1116px] mx-auto mb-12">
        <div className="flex justify-between">
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </div>
      </div>
    );

  return (
    <div className="max-w-[1116px] mx-auto mb-48">
      <div className="flex justify-center items-center gap-5 mb-20">
        {categories.map((item, index) => (
          <button
            type="button"
            onClick={() => setSelectedCategory(index)}
            className={cn(
              "text-neutral-600 capitalize hover:text-neutral-black hover:font-medium",
              selectedCategory === index &&
                "text-neutral-black border px-4 py-0.5 font-medium rounded-2xl"
            )}
            key={index}
          >
            {item}
          </button>
        ))}
      </div>

      <ProductsList products={products.slice(0, 4)} />
    </div>
  );
};
