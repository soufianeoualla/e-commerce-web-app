"use client";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductsList } from "../(HomePage)/ProductsList";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { getProductBySearch, getProductsByCategory } from "@/db/queries";
import { useSearchParams } from "next/navigation";
import { colors, sizes } from "@/lib/utils";
import { getAllProducts } from "@/db/queries";
import { SingleProduct } from "@/lib/interfaces";
type Props = {
  categories: string[];
  setCategories: Dispatch<SetStateAction<string[]>>;
  color: number | undefined;
  size: number | undefined;
  values: [number, number];
};

export const PageWrapper = ({
  categories,
  size,
  color,
  setCategories,
  values,
}: Props) => {
  const [allProducts, setallProducts] = useState<SingleProduct[] | null>();
  const [sort, setSort] = useState<string>("");
  const [queriedProduct, setqueriedProduct] = useState<
    SingleProduct[] | null
  >();
  const deleteCategoryFilter = (index: number) => {
    setCategories(categories.filter((item, i) => i !== index));
  };
  const searchParams = useSearchParams();
  const title = searchParams.get("query");
  const category = searchParams.get("category");
  useEffect(() => {
    const getData = async () => {
      if (title) {
        const data = await getProductBySearch(title);
        setqueriedProduct(data);
      } else if (category) {
        const data = await getProductsByCategory(decodeURI(category));
        setqueriedProduct(data);
      }
      const products = await getAllProducts();
      setallProducts(products);
      console.log(products.map(item=>item.id));
    };
    getData();
  }, [title, category]);

  const products = useMemo(
    () => queriedProduct || allProducts || [],
    [queriedProduct, allProducts]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        categories.length === 0 ||
        categories.some((category) => product.categories.includes(category));
      const matchesColor =
        color === undefined || product.colors.includes(colors[color].hexCode);
      const matchesSize =
        size === undefined || product.sizes.includes(sizes[size].title);
      const matchesPrice =
        values[0] <= product.price && product.price <= values[1];

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
    <div className="py-2 w-full sm:px-4 ">
      <b className=" text-neutral-black">Applied Filters:</b>
      <div className="flex items-center gap-x-2">
        {categories &&
          categories.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-x-2 h-9 justify-center px-4 rounded-2xl border border-slate-200 mt-3 text-neutral-black text-xs font-medium capitalize"
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
        <Select onValueChange={(value) => setSort(value)}>
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
      <ProductsList
        products={sortedProducts}
        classname="grid grid-cols-3 sm:flex sm:flex-col sm:justify-center sm:items-center "
      />
    </div>
  );
};
