import { Hero } from "./Hero";
import { Features } from "./Features";
import { BestSelling } from "./BestSelling";
import { Banner } from "./Banner";
import { ProductCategory } from "./ProductCategory";
import { Suspense } from "react";

export const page = async () => {
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
