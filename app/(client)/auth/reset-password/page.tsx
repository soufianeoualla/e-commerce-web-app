import { ResetPassword } from "@/components/auth/ResetPassword";
import { BreadcrumbWithCustomSeparator } from "@/components/store/BreadCrumb";
import React from "react";

const page = () => {
  return (
    <main>
      <div className="h-40 bg-W100   ">
        <div className="max-w-[1116px] mx-auto space-y-2 pt-12  ">
          <h1 className="text-neutral-black text-2xl font-bold">
            Reset Password
          </h1>
          <BreadcrumbWithCustomSeparator classname="p-0 bg-transparent" />
        </div>
      </div>
      <div className="max-w-[1116px] flex justify-center items-center mt-10  mx-auto mb-[135px] ">
        <ResetPassword />
      </div>
    </main>
  );
};

export default page;
