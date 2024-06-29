import { ForgotPassword } from "@/components/auth/ForgotPassword";
import { BreadcrumbWithCustomSeparator } from "@/components/store/BreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Forgot Password Page",
};

const page = () => {
  return (
    <main>
      <div className="h-40 bg-W100   ">
        <div className="max-w-[1116px] mx-auto space-y-2 pt-12  ">
          <h1 className="text-neutral-black text-2xl font-bold sm:px-4">
            Forgot Password
          </h1>
          <BreadcrumbWithCustomSeparator classname="p-0 bg-transparent" />
        </div>
      </div>
      <div className="max-w-[1116px] flex justify-center items-center mt-10  mx-auto mb-[135px] ">
        <ForgotPassword />
      </div>
    </main>
  );
};

export default page;
