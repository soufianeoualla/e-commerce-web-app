"use client";
import { getBestSellingProducts } from "@/db/queries";
import { OrderItem } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import { ProductsList } from "./ProductsList";
import { Image } from "@prisma/client";

export interface BestSellingProduct {
  id: string;
  addedAt: Date;
  slug: string;
  price: number;
  title: string;
  quantity: number;
  description: string;
  sku: number;
  colors: string[];
  sizes: string[];
  images: Image[];
  categories: string[];
  isFeatured: boolean;
  totalSales: number;
}

export const BestSelling = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[] | null>();

  useEffect(() => {
    const getData = async () => {
      const orderItemsData = await getBestSellingProducts();
      setOrderItems(orderItemsData);
    };
    getData();
  }, []);

  const bestSelling: BestSellingProduct[] = [];
  orderItems?.slice(0, 4).forEach((item) => {
    if (bestSelling.some((c) => c.id === item.productId)) {
      const index = bestSelling.findIndex((c) => c.id === item.productId);
      return (bestSelling[index].totalSales += item.product.price);
    } else {
      const newItem = {
        ...item.product,
        totalSales: item.quantity * item.product.price,
      };
      return bestSelling.push(newItem);
    }
  });
  const bestSellingProducts = bestSelling.sort(
    (a, b) => b.totalSales - a.totalSales
  );
  return (
    <section className="mt-[100px]">
      <h1 className="text-2xl font-bold text-neutral-black text-left mb-8">
        Best Selling
      </h1>
      <ProductsList
        products={bestSellingProducts}
        classname="grid grid-cols-4"
      />
    </section>
  );
};
