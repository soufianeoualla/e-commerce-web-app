import { BreadcrumbWithCustomSeparator } from "@/components/store/BreadCrumb";
import { SessionProvider } from "next-auth/react";
import { ProductWrapper } from "./ProductWrapper";

const page = () => {
  return (
    <div className="max-w-[1116px] mx-auto">
      <BreadcrumbWithCustomSeparator classname="p-0 my-6 bg-transparent" />
      <SessionProvider>
        <ProductWrapper />
      </SessionProvider>

      <div>
        <h1 className="text-neutral-black font-bold text-2xl mb-2">
          You might also like
        </h1>
        <p className="text-xs text-neutral-400 tracking-wide">
          SIMILAR PRODUCTS
        </p>
        <div className="mt-14 mb-32">{/* <ProductsList /> */}</div>
      </div>
    </div>
  );
};

export default page;
