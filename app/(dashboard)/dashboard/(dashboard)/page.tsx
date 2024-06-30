"use client";
import { useContext, useEffect, useState } from "react";
import { BestSelling } from "./BestSelling";
import { Customers } from "./Customers";
import { Sales } from "./Sales";
import {
  getAllOrders,
  getAllSales,
  getCustomers,
  getBestSelling,
  getOrdersGaol,
} from "@/db/queries";
import Image from "next/image";
import { formatDate, formatPrice } from "@/lib/utils";
import { Loader, Trash2 } from "lucide-react";
import { Order } from "@/lib/interfaces";
import { Button } from "@/components/ui/button";
import { DeleteModal } from "@/components/Dashboard/DeleteModal";
import { dataUpdate } from "@/context/dataUpdate";
import Link from "next/link";

type Sale = {
  amount: number;
  updatedAt: Date | null;
};
type Customers = {
  order: {
    updatedAt: Date | null;
  }[];
  id: string;
};
type OrderItem = {
  product: {
    title: string;
    price: number;
  };
  productId: string;
  quantity: number;
};

const Page = () => {
  const [sales, setSales] = useState<Sale[] | null>(null);
  const [customers, setCustomers] = useState<Customers[] | null>();
  const [orderItems, setOrderItems] = useState<OrderItem[] | null>();
  const [orders, setOrders] = useState<Order[] | null | undefined>();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [goal, setGoal] = useState<number | undefined | null>();
  const [id, setId] = useState<string>("");
  const {  trigger } = useContext(dataUpdate);
  useEffect(() => {
    const getData = async () => {
      const saleData = await getAllSales();
      setSales(saleData);
      const customersData = await getCustomers();
      setCustomers(customersData);
      const orderItemsData = await getBestSelling();
      setOrderItems(orderItemsData);
      const OrdersData = await getAllOrders();
      setOrders(OrdersData);
      const ordersGoal = await getOrdersGaol();
      setGoal(ordersGoal?.goal);
    };
    getData();
  }, [trigger]);

  const paidOrders = orders?.filter((item) => item.isPaid === true);

  return (
    <>
      <div>
        <div className="grid grid-cols-[repeat(3,minmax(200px,1fr))] gap-x-10">
          <Sales sales={sales} />

          <Customers customers={customers} />

          <div className="orders h-[190px] p-6 bg-white border border-slate-200 rounded-md">
            <div className="flex justify-between items-center mb-14">
              <div className="space-y-1.5">
                <h5 className="text-[16px] text-neutral-black font-semibold">
                  Orders
                </h5>
                <p className="text-xs text-neutral-500 font-medium">
                  Monthly GOALS : {goal}
                </p>
              </div>
              <b className="text-neutral-black font-bold text-2xl">
                {paidOrders?.length}
              </b>
            </div>
            {goal && paidOrders ? (
              <>
                <span className="text-xs font-medium text-neutral-500">
                  {goal - paidOrders?.length} Left
                </span>
                <div className="w-full h-2 rounded-xl bg-W100 mb-2">
                  <div
                    style={{ width: (paidOrders?.length * 100) / goal }}
                    className="bg-[#4078FF]  h-full rounded-xl"
                  />
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center mt-11">
                <Loader className="animate-spin  text-[#4078FF]" />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-[350px,2fr] gap-x-10 mt-10">
          <BestSelling orderItems={orderItems} />

          <div className="bg-white border border-slate-200 rounded-lg mb-10 ">
            <div className=" flex items-center gap-x-4 mb-5 p-8">
              <h5 className="text-[16px] text-neutral-black font-semibold">
                Recent Orders
              </h5>
              <Link
                href={'/dashboard/orders'}
               className="bg-W100 text-neutral-500 font-medium text-xs rounded-2xl px-3 py-1 hover:bg-neutral-black  hover:text-white">
                View All
              </Link>
            </div>

            <table className="w-full mb-5  ">
              <tbody>
                <tr className="border border-slate-200 ">
                  <th> {""}</th>
                  <th> {"Order"}</th>
                  <th> {"Date"}</th>
                  <th> {"Total"}</th>
                  <th> {"Staus"}</th>
                  <th className="text-left  -translate-x-1"> {"Action"}</th>
                </tr>
                {orders &&
                  orders.slice(0, 6).map((order, i) => (
                    <tr key={i}>
                      <td className="flex items-center gap-x-2">
                        {order.orderItems.map((item, index) => (
                          <div
                            key={item.id}
                            style={{
                              transform: `translateX(${-25 * index}px)`,
                            }}
                            className={`h-12 w-12 rounded-full bg-W200 flex justify-center items-center relative `}
                          >
                            <Image
                              src={item.product.images[0].imageSrc}
                              alt={item.product.title}
                              width={32}
                              height={46}
                            />
                          </div>
                        ))}
                      </td>

                      <td>{order.ref}</td>
                      <td>{formatDate(order.createdAt.toString())}</td>
                      <td>{formatPrice(order.amount)}</td>
                      <td className="">
                        <div
                          className={` w-24 h-7 flex justify-center items-center rounded  font-semibold ${
                            order.isPaid
                              ? "text-emerald-500 bg-emerald-500/20  "
                              : "text-destructive bg-destructive/20 "
                          }`}
                        >
                          {order.isPaid ? "Paid" : "Unpaid"}
                        </div>
                      </td>

                      <td>
                        <Button
                          onClick={() => {
                            setDeleteModal(true);
                            setId(order.id);
                          }}
                          variant={"destructive"}
                          size={"icon"}
                        >
                          <Trash2 strokeWidth={1.5} />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {deleteModal && (
        <DeleteModal type="order" id={id} setDeleteModal={setDeleteModal} />
      )}
    </>
  );
};

export default Page;
