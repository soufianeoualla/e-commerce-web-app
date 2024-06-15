"use client";
import { DeleteModal } from "@/components/Dashboard/DeleteModal";
import Pagination from "@/components/Dashboard/Pagination";
import { Button } from "@/components/ui/button";
import { getAllCustomers } from "@/db/queries";
import { ShippingAddress } from "@prisma/client";
import {  Loader, SearchIcon, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [id, setId] = useState<string>("");
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [customers, setCustomers] = useState<
    ShippingAddress[] | null | undefined
  >();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const [query, setQuery] = useState<string>("");

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
  const filtredCustomers = query
    ? customers.filter((item) => item.fullName.toLowerCase().includes(query))
    : customers;
  const currentItems = filtredCustomers?.slice(firstItemIndex, lastItemIndex);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(customers?.length! / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const lastPage = pageNumbers.length;
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
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
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
            {currentItems.map((customer, index) => (
              <tr key={index}>
                <td>
                  <div className="w-12 h-12 rounded-full bg-slate-200/50 text-blue-600 flex justify-center items-center uppercase font-medium text-xl">
                    {customer.fullName.slice(0, 1)}
                  </div>
                </td>
                <td>{customer.fullName}</td>
                <td>{customer.email}</td>

                <td>{`${customer.streetAddress}, ${customer.city}, ${customer.country}, ${customer.zipCode}`}</td>

                <td>
                  <button>
                    <Button
                      onClick={() => {
                        setId(customer.id);
                        setDeleteModal(true);
                      }}
                      variant={"destructive"}
                      size={"icon"}
                    >
                      <Trash2 strokeWidth={1.5} />
                    </Button>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {customers.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      {deleteModal && (
        <DeleteModal id={id} setDeleteModal={setDeleteModal} type="customer" />
      )}
    </>
  );
};
export default Page;
