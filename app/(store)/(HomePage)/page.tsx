import React, { Suspense } from "react";
import { Hero } from "./Hero";
import { Features } from "./Features";
import { Banner } from "./Banner";
import { ProductCategory } from "./ProductCategory";
import type { Metadata } from "next";
import { BestSelling } from "./BestSelling";
import {
  getAllProducts,
  getBestSellingProducts,
  getFeaturedProducts,
} from "@/db/queries";

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "clothes Store",
};
const page = async () => {
  const orderItemsData = await getBestSellingProducts();
  const FeaturedProducts = await getFeaturedProducts();
  const allProducts = await getAllProducts();
  return (
    <main>
      <Hero />
      <div className="max-w-[1116px] mx-auto">
        <Features />
        <Suspense>
          <BestSelling orderItems={orderItemsData} />
        </Suspense>
      </div>
      <Banner />
      <Suspense>
        <ProductCategory
          FeaturedProducts={FeaturedProducts}
          allProducts={allProducts}
        />
      </Suspense>
    </main>
  );
};

export default page;
