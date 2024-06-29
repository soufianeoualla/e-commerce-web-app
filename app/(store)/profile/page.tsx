import { Suspense } from "react";
import PageWrapper from "./PageWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile Page",
};

const page = () => {
  return (
    <Suspense>
      <PageWrapper />
    </Suspense>
  );
};

export default page;
