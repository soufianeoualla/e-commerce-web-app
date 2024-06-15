import React, { Suspense } from "react";
import { ThankYou } from "./thankYou";

const page = () => {
  return (
    <Suspense>
      <ThankYou />
    </Suspense>
  );
};

export default page;
