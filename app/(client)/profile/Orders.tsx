import Image from "next/image";
import { Product } from "./Product";

export const Orders = () => {
  return (
    <section className="orders w-full">
      <h3 className="text-[16px] text-neutral-black font-semibold">Orders</h3>
      <Product />
    </section>
  );
};
