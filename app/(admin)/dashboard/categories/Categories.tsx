"use client";
import { useEffect, useState } from "react";
import { Loader, SearchIcon, X } from "lucide-react";
import { AddCategory } from "./AddCategory";
import { getAllCategories } from "@/db/queries";
import { Category } from "@prisma/client";

export const Categories = () => {
  const [categories, setCategories] = useState<Category[] | null | undefined>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllCategories();
      setCategories(data);
    };
    getData();
  }, []);

  if (!categories) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white h-full mb-10">
      <div className="px-10 py-6 flex justify-between items-center border-b border-slate-200">
        <h3 className="text-neutral-black font-medium text-[16px]">
          Categories
        </h3>
        <div className="flex items-center gap-x-4">
        <AddCategory />

          <div className="search relative text-neutral-500">
            <input
              placeholder="Search Categories"
              className="border border-slate-200 h-11 max-w-[265px] rounded-md pl-14 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-black/50"
            />
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
      <div className="p-10 flex flex-wrap items-center gap-x-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center gap-x-2 px-2 py-1 border-slate-300 border rounded-sm w-[100px] justify-between"
          >
            <span>{category.title}</span>
            <X className="text-destructive" />
          </div>
        ))}
      </div>
    </div>
  );
};
