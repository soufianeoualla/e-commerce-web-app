"use client";
import { Loader, SearchIcon, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { getAllProducts } from "@/db/queries";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { SingleProduct } from "@/lib/interfaces";
import { Button } from "@/components/ui/button";
import { DeleteModal } from "@/components/Dashboard/DeleteModal";
import { useRouter } from "next/navigation";
import Pagination from "@/components/Dashboard/Pagination";
import { dataUpdate } from "@/context/dataUpdate";

const Page = () => {
  const [products, setProducts] = useState<
    SingleProduct[] | null | undefined
  >();
  const [id, setId] = useState<string>("");
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [query, setQuery] = useState<string>("");
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const router = useRouter();
  const { trigger } = useContext(dataUpdate);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    getData();
  }, [query, trigger]);

  if (!products)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  console.log(products);
  const filtredProducts = query
    ? products.filter((item) => item.title.toLowerCase() === query)
    : products;
  const currentItems = filtredProducts?.slice(firstItemIndex, lastItemIndex);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products?.length! / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const lastPage = pageNumbers.length;

  return (
    <>
      <div className="w-full bg-white rounded-lg border border-slate-200 h-full">
        <div className="px-10 py-6 flex justify-between items-center">
          <h3 className="text-neutral-black font-medium text-[16px]">
            Products
          </h3>
          <div className="flex items-center gap-x-4">
            <Button asChild>
              <Link href={"/dashboard/products/add-product"}>Add Product </Link>
            </Button>
            <div className="search relative text-neutral-500">
              <input
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
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
              <th> {"Colors"}</th>
              <th> {"Sizes"}</th>

              <th className="text-center  -translate-x-8"> {"Actions"}</th>
            </tr>
            {currentItems.map((item, index) => (
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
                <td>
                  {item.quantity > 0
                    ? `In Stock (${item.quantity})`
                    : "Out of Stock"}
                </td>
                <td>
                  {item.categories.map((category, index) => (
                    <span key={index}>
                      {category}
                      {item.categories.length - 1 > index && ","}{" "}
                    </span>
                  ))}
                </td>
                <td className="">
                  <div className="flex items-center gap-x-2">
                    {item.colors.map((color, index) => (
                      <span
                        className="w-5 h-5 rounded-full"
                        style={{ background: color }}
                        key={index}
                      ></span>
                    ))}
                  </div>
                </td>
                <td className="">
                  {item.sizes.map((size, index) => (
                    <span key={index}>
                      {size}
                      {item.sizes.length - 1 > index && ","}{" "}
                    </span>
                  ))}
                </td>
                <td className="flex items-center gap-x-2">
                  <Button
                    onClick={() => {
                      router.push(
                        `/dashboard/products/add-product?slug=${item.slug}`
                      );
                    }}
                    variant={"outline"}
                    size={"icon"}
                  >
                    <SquarePen strokeWidth={1.5} />
                  </Button>

                  <Button
                    onClick={() => {
                      setId(item.id);
                      setDeleteModal(true);
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
      {products.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          setCurrentPage={setCurrentPage}
        />
      )}

      {deleteModal && (
        <DeleteModal id={id} setDeleteModal={setDeleteModal} type="product" />
      )}
    </>
  );
};
export default Page;
