import { PageWrapper } from "./PageWrapper";
import { Suspense } from "react";
import { BreadcrumbWithCustomSeparator } from "@/components/store/BreadCrumb";
const page =  () => {
 

  return (
    <>
      <BreadcrumbWithCustomSeparator />
      <main className="max-w-[1116px] mx-auto mt-6">
        <Suspense>
          <PageWrapper />
        </Suspense>
      </main>
    </>
  );
};

export default page;
