"use client";
import { useState } from "react";
import { Products } from "./Products";
import { Categories } from "./Categories";
import { SingleProduct } from "@/lib/interfaces";

type Props = {
  allProducts: SingleProduct[];
  FeaturedProducts: SingleProduct[];
};

export const ProductCategory = ({ FeaturedProducts, allProducts }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const products = [FeaturedProducts, allProducts];
  const sortedProducts = products[selectedCategory].sort(
    (a, b) => b.addedAt.getDate() - a.addedAt.getDate()
  );

  return (
    <div className="max-w-[1116px] mx-auto mb-48 sm:px-4">
      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Products products={sortedProducts} />
    </div>
  );
};
