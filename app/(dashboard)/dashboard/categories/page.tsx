"use client";
import { useContext, useEffect, useState, useTransition } from "react";
import { Loader, SearchIcon, X } from "lucide-react";
import { AddCategory } from "./AddCategory";
import { getAllCategories } from "@/db/queries";
import { Category } from "@prisma/client";
import { deleteCategory } from "@/actions/dashboard";
import toast from "react-hot-toast";
import { dataUpdate } from "@/context/dataUpdate";

const Page = () => {
  const [categories, setCategories] = useState<Category[] | null | undefined>(
    null
  );
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState<string>("");
  const { trigger } = useContext(dataUpdate);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllCategories();
      setCategories(data);
    };
    getData();
  }, [trigger]);

  if (!categories) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  const handleDelete = (id: number) => {
    startTransition(async () => {
      const data = await deleteCategory(id);

      if (data.success) {
        toast.success(data.success);
      } else if (data.error) {
        toast.error(data.error);
      }
    });
  };
  const filtredCategories = query
    ? categories.filter((item) => item.title.toLowerCase().includes(query))
    : categories;

  return (
    <div className="bg-white h-screen mb-10">
      <div className="px-10 py-6 flex justify-between items-center border-b border-slate-200">
        <h3 className="text-neutral-black font-medium text-[16px]">
          Categories
        </h3>
        <div className="flex items-center gap-x-4">
          <AddCategory />

          <div className="search relative text-neutral-500">
            <input
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
              placeholder="Search Categories"
              className="border border-slate-200 h-11 max-w-[265px] rounded-md pl-14 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-black/50"
            />
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
      <div className="p-10 flex flex-wrap items-center gap-4">
        {filtredCategories.map((category) => (
          <div
            key={category.id}
            className="flex items-center gap-4 px-3 h-10 border-slate-300 border rounded justify-between capitalize"
          >
            <span>{category.title}</span>
            <button
              disabled={isPending}
              onClick={() => handleDelete(category.id)}
            >
              <X className="text-destructive hover:bg-W100 hover:border hover:border-slate-200 rounded-sm disabled:cursor-wait" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
