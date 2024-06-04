"use client";
import Filters from "./Filters";
import { Loader, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductsList } from "../(HomePage)/ProductsList";
import { Product } from "@prisma/client";
import {  useEffect, useMemo, useState } from "react";
import { getProductBySearch } from "@/db/queries";
import { useSearchParams } from "next/navigation";
import { colors, sizes } from "@/lib/utils";
import { getAllProducts } from "@/db/queries";

export const PageWrapper = () => {
  const [allProducts, setallProducts] = useState<Product[] | null>();
  const [categories, setCategories] = useState<string[]>([]);
  const [color, setColor] = useState<number | undefined>(undefined);
  const [size, setSize] = useState<number | undefined>(undefined);
  const [values, setValues] = useState<[number, number]>([5, 300]);
  const [sort, setSort] = useState<string>("");
  const [queriedProduct, setqueriedProduct] = useState<Product[] | null>();
  const deleteCategoryFilter = (index: number) => {
    setCategories(categories.filter((item, i) => i !== index));
  };
  const searchParams = useSearchParams();
  const title = searchParams.get("query");
  useEffect(() => {
    const getData = async () => {
      if (title) {
        const data = await getProductBySearch(title);
        setqueriedProduct(data);
      }
      const products = await getAllProducts();
      setallProducts(products);
    };
    getData();
  }, [title]);

    const products = useMemo(() => queriedProduct || allProducts || [], [queriedProduct, allProducts]);

    const filteredProducts = useMemo(() => {
      return products.filter((product) => {
        const matchesCategory =
          categories.length === 0 || categories.some((category) => product.categories.includes(category));
        const matchesColor = color === undefined || product.colors.includes(colors[color].hexCode);
        const matchesSize = size === undefined || product.sizes.includes(sizes[size].title);
        const matchesPrice = values[0] <= product.price && product.price <= values[1];
  
        return matchesCategory && matchesColor && matchesSize && matchesPrice;
      });
    }, [products, categories, color, size, values]);
  
    const sortedProducts = useMemo(() => {
      return sort
        ? filteredProducts.slice().sort((a, b) => {
            if (sort === "asc") {
              return a.price - b.price;
            } else {
              return b.price - a.price;
            }
          })
        : filteredProducts;
    }, [filteredProducts, sort]);

   
  return (
    <div className="flex items-start gap-x-8 mb-32">
        <Filters
          setColor={setColor}
          color={color}
          setSize={setSize}
          size={size}
          categories={categories!}
          setCategories={setCategories!}
          setValues={setValues}
          values={values}
        />

      <div className="py-2 w-full ">
        <b className=" text-neutral-black">Applied Filters:</b>
        <div className="flex items-center gap-x-2">
          {categories &&
            categories.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-x-2 h-9 justify-center px-4 rounded-2xl border border-slate-200 mt-3 text-neutral-black text-xs font-medium"
              >
                {item}
                <button onClick={() => deleteCategoryFilter(index)}>
                  <X className="w-4 h-4 cursor-pointer" />
                </button>
              </div>
            ))}
        </div>
        <div className="flex justify-between items-center mt-6 gap-x-3  mb-4">
          <p className="text-neutral-500 text-xs">
            {sortedProducts.length > 9
              ? `Showing 1-9 of ${sortedProducts.length} results.`
              : `Showing 1-${sortedProducts.length} of ${sortedProducts.length} results.`}
          </p>
            <Select onOpenChange={(value) => setSort(value)}>
              <SelectTrigger className="w-[150px]  border-none  text-neutral-black font-medium">
                <SelectValue placeholder="Sort By Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="asc">Price: ASC</SelectItem>
                  <SelectItem value="desc">Price: DESC</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
        </div>
        <ProductsList products={sortedProducts} classname="py-4 gap-9" />
      </div>
    </div>
  );
};
