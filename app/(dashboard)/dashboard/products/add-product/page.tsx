import React, { Suspense } from "react";
import { AddProduct } from "./AddProduct";
const page = () => {
  return (
    <Suspense>
      <AddProduct />
    </Suspense>
  );
};

export default page;
