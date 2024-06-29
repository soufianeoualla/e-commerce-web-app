import { BreadcrumbWithCustomSeparator } from "@/components/store/BreadCrumb";
import { ProductWrapper } from "./ProductWrapper";
import { Suspense } from "react";

const page = () => {
  return (
    <div className="max-w-[1116px] mx-auto">
      <BreadcrumbWithCustomSeparator classname="p-0 my-6 bg-transparent" />

      <Suspense>
        <ProductWrapper />
      </Suspense>
    </div>
  );
};

export default page;
