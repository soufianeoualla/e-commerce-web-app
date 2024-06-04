import { VerficationWrapper } from "@/components/auth/VerficationWrapper";
import { Suspense } from "react";

const page = () => {
  return (
    <div className="max-w-[1116px] mx-auto flex justify-center items-center h-screen">
      <Suspense>
        <VerficationWrapper />
      </Suspense>
    </div>
  );
};

export default page;
