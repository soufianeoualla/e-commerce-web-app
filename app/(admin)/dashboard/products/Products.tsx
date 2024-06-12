"use client";
import { Ellipsis, Loader, SearchIcon } from "lucide-react";
import Link from "next/link";
import { getAllProducts } from "@/db/queries";
import Image from "next/image";
import {  useEffect, useState } from "react";
import { SingleProduct } from "@/lib/interfaces";
import { Button } from "@/components/ui/button";

export const Products = () => {
  const [products, setProducts] = useState<
    SingleProduct[] | null | undefined
  >();
  useEffect(() => {
    const getData = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    getData();
  }, []);

  if (!products)
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
            Products
          </h3>
          <div className="flex items-center gap-x-4">
            <Button asChild>
            <Link href={'/dashboard/products/add-product'}>
              Add Product{" "}
            </Link>
            </Button>
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
              <th> {"Name"}</th>
              <th> {"SKU"}</th>
              <th> {"Price"}</th>
              <th> {"Stock"}</th>
              <th> {"Categories"}</th>
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
                <td>{item.sku}</td>
                <td>${item.price}</td>
                <td>{item.quantity > 0 ? "In Stock" : "Out of Stock"}</td>
                <td>
                  {item.categories.map((category, index) => (
                    <span key={index}>
                      {category}
                      {item.categories.length - 1 > index && ","}{" "}
                    </span>
                  ))}
                </td>
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
