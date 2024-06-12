"use client";
import { getAllCustomers } from "@/db/queries";
import { ShippingAddress } from "@prisma/client";
import { Ellipsis, Loader, SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

export const Customers =  () => {
  const [customers, setCustomers] = useState<
    ShippingAddress[] | null | undefined
  >();
  useEffect(() => {
    const getData = async () => {
      const data = await getAllCustomers();
      setCustomers(data);
    };
    getData();
  }, []);

  if (!customers)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  return (
    <>
      <div className="w-full bg-white rounded-lg border border-slate-200 h-full">
        <div className="px-10 py-6 flex justify-between items-center">
          <h3 className="text-neutral-black font-medium text-[16px]">
            Customers
          </h3>
          <div className="flex items-center gap-x-4">
            <div className="search relative text-neutral-500">
              <input
                placeholder="Search customers "
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
              <th> {"Name"}</th>
              <th> {"Email"}</th>
              <th> {"Shipping Address"}</th>
              <th className="text-left  -translate-x-4"> {"Action"}</th>
            </tr>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td>
                  <div className="w-12 h-12 rounded-full bg-slate-200/50 text-blue-600 flex justify-center items-center uppercase font-medium text-xl">
                    {customer.fullName.slice(0, 1)}
                  </div>
                </td>

                <td>{customer.email}</td>

                <td>{`${customer.streetAddress}, ${customer.city}, ${customer.country}, ${customer.zipCode}`}</td>

                <td>
                  <button>
                    <Ellipsis strokeWidth={1} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
