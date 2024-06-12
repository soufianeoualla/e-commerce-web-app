"use client";
import React, { useEffect, useState } from "react";
import { ProductsList } from "./ProductsList";
import { SingleProduct } from "@/lib/interfaces";
import { getAllProducts, getFeaturedProducts } from "@/db/queries";
import { ProductSkeleton } from "@/components/store/ProductSkeleton";

type Props = {
  selectedCategory: number;
};

export const Products = ({ selectedCategory }: Props) => {
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
  return <ProductsList products={products.slice(0, 4)} />;
};
