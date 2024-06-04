import { getAllProducts } from '@/db/queries';
import { Ellipsis, SearchIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

export const Customers =async() => {
    const products = await getAllProducts();
    return (
      <>
        <div className="w-full bg-white rounded-lg border border-slate-200">
          <div className="px-10 py-6 flex justify-between items-center">
            <h3 className="text-neutral-black font-medium text-[16px]">
              Customers
            </h3>
            <div className="flex items-center gap-x-4">
              <div className="search relative text-neutral-500">
                <input
                  placeholder="Search products "
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
                <th> {"Order"}</th>
                <th> {"Date"}</th>
                <th> {"Total"}</th>
                <th> {"Staus"}</th>
                <th className="text-left  -translate-x-4"> {"Actions"}</th>
              </tr>
              {products.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="h-12 w-12 rounded bg-W100 flex justify-center items-center">
                      <Image
                        src={item.images[0].imageSrc}
                        alt={item.title}
                        width={32}
                        height={46}
                      />
                    </div>
                  </td>
  
                  <td>{item.title}</td>
                  <td>{"20 Mar, 2023"}</td>
                  <td>${item.price}</td>
                  <td>{"processing"}</td>
  
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
  