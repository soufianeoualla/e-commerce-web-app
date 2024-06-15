"use client";
import { BreadcrumbWithCustomSeparator } from "@/components/store/BreadCrumb";
import { getOrder } from "@/db/queries";
import { Order } from "@/lib/interfaces";
import { formatPrice } from "@/lib/utils";
import { Check, Loader } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [order, setOrder] = useState<Order | null>();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  const router = useRouter();
  useEffect(() => {
    const getData = async () => {
      if (!orderId) {
        return router.push("/");
      }
      const data = await getOrder(orderId);
      setOrder(data);
    };
    getData();
  }, [orderId, router]);

  if (!order)
    return (
      <section className="w-full mt-20 h-[50vh]">
        <div className="flex justify-center items-center h-full   text-neutral-500">
          <Loader className="animate-spin" />
        </div>
      </section>
    );

  const products = order?.orderItems;

  return (
    <>
      <BreadcrumbWithCustomSeparator />

      <div className="w-[540px] p-12 bg-white  top-1/2 right-1/2 rounded-lg mx-auto my-20 ">
        <div className="bg-primary w-12 h-12 rounded-full flex justify-center items-center text-white">
          <Check />
        </div>
        <h1 className="text-[32px] text-black font-bold mb-6 mt-8 sm:text-[24px] ">
          THANK YOU FOR YOUR ORDER
        </h1>
        <p className="text-black text-opacity-60 font-medium text-base">
          You will receive an email confirmation shortly.
        </p>
        <div className="mt-8 w-[444px] flex sm:flex-col sm:w-auto   ">
          <div className=" bg-gray p-6 rounded-l-lg grid w-full sm:rounded-t-lg sm:rounded-b-none">
            {products &&
              products.map((item) => (
                <div
                  className="flex justify-between items-center mb-4 "
                  key={item.id}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-W100 flex justify-center items-center">
                      <Image
                        src={item.product.images[0].imageSrc}
                        alt={item.product.title}
                        width={35}
                        height={42}
                      />
                    </div>

                    <div className="flex flex-col ">
                      <h3 className="text-base font-bold">
                        {item.product.title}{" "}
                      </h3>
                      <span className="text-[14px] font-bold text-black text-opacity-60">
                        {formatPrice(item.product.price)}
                      </span>
                    </div>
                  </div>
                  <span className="text-black text-opacity-70 text-base font-bold">
                    x{item.quantity}
                  </span>
                </div>
              ))}
          </div>
          <div
            className={`w-[198px] flex sm:justify-start sm:items-center  p-8 bg-black rounded-r-lg justify-end items-end sm:w-full sm:rounded-tr-none  sm:rounded-b-lg sm:flex-col  `}
          >
            <div className=" ">
              <span className="text-base text-white text-opacity-60 font-medium">
                TOTAL:
              </span>
              <b className="text-white text-lg sm:ml-2 ">
                {formatPrice(order?.amount)}{" "}
              </b>
            </div>
          </div>
        </div>
        <button
        onClick={()=>router.push("/")}
        className=" bg-black w-full h-14 text-white text-base rounded-lg font-bold tracking-wider mt-12 hover:bg-primary/80 sm:mt-8">
          CONTINUE SHOPPING
        </button>
      </div>
    </>
  );
};

export default Page;
