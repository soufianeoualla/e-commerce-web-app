"use client";
import { getUserOrders } from "@/db/queries";
import { useEffect, useState } from "react";
import { Inbox, Loader } from "lucide-react";
import { LinkButton } from "@/components/store/LinkButton";
import { Order } from "@/lib/interfaces";
import Image from "next/image";
import { formatDate, formatPrice } from "@/lib/utils";

export const Orders = () => {
  const [orders, setOrders] = useState<Order[] | null>();
  useEffect(() => {
    const getData = async () => {
      const data = await getUserOrders();
      setOrders(data);
    };
    getData();
  }, []);

  if (!orders)
    return (
      <section className="orders w-full mt-20">
        <div className="flex justify-center items-center   text-neutral-500">
          <Loader className="animate-spin" />
        </div>
      </section>
    );

  if (orders?.length === 0)
    return (
      <section className="orders w-full mt-20">
        <div className="flex justify-center items-center flex-col space-y-6 text-neutral-500">
          <Inbox className="w-16 h-16  stroke-[0.5px]" />
          <p>Your order history is waiting to be filled.</p>
          <LinkButton href="/" label="Start Shopping" />
        </div>
      </section>
    );

  return (
    <section className="orders w-full">
      <h3 className="text-[16px] text-neutral-black font-semibold">Orders</h3>
      {orders.map((order) => (
        <div key={order.id} className="flex justify-between items-center pb-8 border-b border-b-slate-200 mt-14">
          <div className="flex items-center gap-x-6">
            <div className="flex items-center gap-x-4">
              {order.orderItems.map((item) => (
                <div key={item.id} className="flex items-center gap-x-1">
                  <div className="h-14 w-14 rounded-full bg-W100 flex justify-center items-center">
                    <Image
                      src={item.product.images[0].imageSrc}
                      alt={item.product.title}
                      width={35}
                      height={42}
                    />
                  </div>
                  <span className="font-medium text-xs text-neutral-black">
                    x {item.quantity}{" "}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-neutral-500 text-xs"> Ordered on: {formatDate(order.createdAt.toString())}</p>
              <span className="text-neutral-black text-xs font-medium">
                {formatPrice(order.amount)}
              </span>
            </div>
          </div>
          <div className="space-x-8">
            <span className={" text-neutral-black underline"}>
              {order.isPaid ? 'Paid' :"Unpaid"}
            </span>
            <button className="h-11 rounded-sm border border-slate-300 text-neutral-black font-medium w-[114px] hover:bg-W100">
              {"View items"}
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};
