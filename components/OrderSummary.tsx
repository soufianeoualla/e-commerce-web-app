import { OrderItem } from "@/lib/interfaces";
import { OrderItemCard } from "./OrderItemCard";
import { ShippingAddress } from "@prisma/client";
import { formatPrice } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  total: number;
  setViewOrder: Dispatch<SetStateAction<boolean>>;
  status: boolean;
};

export const OrderSummary = ({
  orderItems,
  shippingAddress,
  total,
  setViewOrder,
  status,
}: Props) => {
  return (
    <>
      <div
        onClick={() => setViewOrder(false)}
        className="fixed inset-0 w-full h-full  z-40 bg-primary/70"
      />
      <div className="w-[400px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-lg p-8 z-50 bg-white">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-primary text-base font-semibold ">
            Order Summary
          </h3>
          <Button
            onClick={() => {
              setViewOrder(false);
            }}
            variant={"outline"}
            size={"icon"}
          >
            <X />
          </Button>
        </div>

        <div className="space-y-4 pb-4 border-b border-slate-300 mb-4">
          {orderItems?.map((orderItem) => (
            <OrderItemCard orderItem={orderItem} key={orderItem.productId} />
          ))}
        </div>
        <div className="space-y-2 text-neutral-500">
          <p>
            Shipping Address:{" "}
            <span className="text-primary font-medium">
              {` ${shippingAddress.streetAddress}, ${shippingAddress.city}, ${shippingAddress.country}, ${shippingAddress.zipCode}`}
            </span>{" "}
          </p>
          <p>
            FullName:{" "}
            <span className="text-primary font-medium">
              {shippingAddress.fullName}
            </span>
          </p>
          <p>
            Email:{" "}
            <span className="text-primary font-medium">
              {shippingAddress.email}
            </span>{" "}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-6 items-center mt-4">
          <div
            className={` w-full h-11  flex justify-center items-center rounded  font-semibold ${
              status
                ? "text-emerald-500 bg-emerald-500/20  "
                : "text-destructive bg-destructive/20 "
            }`}
          >
            {status ? "Paid" : "Unpaid"}
          </div>
          <div className="w-full text-white font-bold bg-primary rounded-md h-11 flex justify-center items-center ">
            {formatPrice(total)}
          </div>
        </div>
      </div>
    </>
  );
};
