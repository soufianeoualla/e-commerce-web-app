"use client";
import { DeleteModal } from "@/components/Dashboard/DeleteModal";
import { Button } from "@/components/ui/button";
import { getAllOrders } from "@/db/queries";
import { Order } from "@/lib/interfaces";
import { formatDate, formatPrice } from "@/lib/utils";
import { Eye, Loader, SearchIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { OrderSummary } from "@/components/OrderSummary";
import Pagination from "@/components/Dashboard/Pagination";
import { dataUpdate } from "@/context/dataUpdate";

const Page = () => {
  const [orders, setOrders] = useState<Order[] | null | undefined>();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [viewOrder, setViewOrder] = useState<boolean>(false);
  const [order, setOrder] = useState<Order>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const [query, setQuery] = useState<string>("");
  const { trigger } = useContext(dataUpdate);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllOrders();
      setOrders(data);
    };
    getData();
  }, [trigger]);

  if (!orders)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  const filtredOrders = query
    ? orders.filter((item) => item.ref.toLowerCase().includes(query))
    : orders;
  const currentItems = filtredOrders?.slice(firstItemIndex, lastItemIndex);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(orders?.length! / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const lastPage = pageNumbers.length;
  return (
    <>
      <div className="w-full bg-white rounded-lg border border-slate-200 h-full">
        <div className="px-10 py-6 flex justify-between items-center">
          <h3 className="text-neutral-black font-medium text-[16px]">Orders</h3>
          <div className="flex items-center gap-x-4">
            <div className="search relative text-neutral-500">
              <input
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
                placeholder="Search orders "
                className="border border-slate-200 h-11 max-w-[265px] rounded-md pl-14 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-black/50"
              />
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        <table className="w-full mb-5  ">
          <tbody>
            <tr className="border border-slate-200">
              <th> {""}</th>
              <th> {"Order Ref"}</th>
              <th> {"Date"}</th>
              <th> {"Total"}</th>
              <th> {"Staus"}</th>
              <th className="text-left  -translate-x-2"> {"Action"}</th>
            </tr>
            {currentItems.map((order, i) => (
              <tr key={i}>
                <td className="flex items-center gap-x-2">
                  {order.orderItems.map((item, index) => (
                    <div
                      key={item.id}
                      style={{ transform: `translateX(${-25 * index}px)` }}
                      className="h-12 w-12 rounded bg-W100 flex justify-center items-center"
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
                <td>
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

                <td className="flex items-center gap-x-2">
                  <Button
                    onClick={() => {
                      setViewOrder(true);
                      setOrder(order);
                    }}
                    variant={"outline"}
                    size={"icon"}
                  >
                    <Eye strokeWidth={1.5} />{" "}
                  </Button>
                  <Button
                    onClick={() => {
                      setDeleteModal(true);
                      setOrder(order);
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

      {viewOrder && order && (
        <OrderSummary
          orderItems={order.orderItems}
          shippingAddress={order.shippingAddress}
          total={order.amount}
          setViewOrder={setViewOrder}
          status={order.isPaid}
        />
      )}
      {orders.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      {deleteModal && order && (
        <DeleteModal
          id={order.id}
          setDeleteModal={setDeleteModal}
          type="order"
        />
      )}
    </>
  );
};

export default Page;
