import React, { Suspense } from "react";
import { ThankYou } from "./thankYou";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Thank you",
  description: "Thank you Page",
};
const page = () => {
  return (
    <Suspense>
      <ThankYou />
    </Suspense>
  );
};

export default page;
