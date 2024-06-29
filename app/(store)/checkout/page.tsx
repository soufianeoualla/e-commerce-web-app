import { BreadcrumbWithCustomSeparator } from "@/components/store/BreadCrumb";
import { CheckoutForm } from "./CheckoutForm";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout Page",
};
const page = () => {

  return (
    <main>
      <div className="h-40 bg-W100 mb-12  ">
        <div className="max-w-[1116px] mx-auto space-y-2 pt-12  ">
          <h1 className="text-neutral-black text-2xl font-bold sm:px-4">Checkout</h1>
          <BreadcrumbWithCustomSeparator classname="p-0 bg-transparent" />
        </div>
      </div>
      <div className="max-w-[1116px] mx-auto mb-[135px] sm:px-4">
        <CheckoutForm/>
      </div>
    </main>
  );
};

export default page;
