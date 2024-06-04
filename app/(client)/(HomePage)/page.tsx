import React, { Suspense } from "react";
import { Hero } from "./Hero";
import { Features } from "./Features";
import { Banner } from "./Banner";
import { ProductCategory } from "./ProductCategory";

const page = () => {
  return (
    <main>
      <Hero />
      <div className="max-w-[1116px] mx-auto">
        <Features />
        {/* <BestSelling products={bestSelling} /> */}
      </div>
      <Banner />
      <Suspense>
        <ProductCategory />
      </Suspense>
    </main>
  );
};

export default page;
