"use client";
import { getAllCategories } from "@/db/queries";
import { cn, colors, sizes } from "@/lib/utils";
import { Category } from "@prisma/client";
import { Check } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PriceSlider } from "./PriceSlider";

type Props = {
  categories: string[];
  setCategories: Dispatch<SetStateAction<string[]>>;
  color: number | undefined;
  setColor: Dispatch<SetStateAction<number | undefined>>;
  size: number | undefined;
  setSize: Dispatch<SetStateAction<number | undefined>>;
  values: [number, number];
  setValues: Dispatch<SetStateAction<[number, number]>>;
};

const Filters = ({
  categories,
  setCategories,
  setColor,
  setSize,
  color,
  size,
  setValues,
  values,
}: Props) => {
  const [categoriesData, setCategoriesData] = useState<Category[]>();

  useEffect(() => {
    const getData = async () => {
      const categories = await getAllCategories();
      setCategoriesData(categories);
    };
    getData();
  }, []);

  const isExisting = (item: string) => {
    return categories?.some(
      (category) => category.toLowerCase() === item.toLowerCase()
    );
  };

  const handleCategories = (item: string) => {
    if (isExisting(item)) {
      setCategories(categories?.filter((category) => category !== item));
    } else setCategories(categories ? [...categories, item] : [item]);
  };

  const handleColor = (index: number) => {
    if (color === index) {
      setColor(undefined);
    } else {
      setColor(index);
    }
  };

  const handleSize = (index: number) => {
    if (size === index) {
      setSize(undefined);
    } else {
      setSize(index);
    }
  };

  return (
    <div className="border rounded-md sticky self-start top-0 p-4 pb-8 sm:static sm:w-[70%] sm:mx-auto">
      <div className="">
        <h3 className="text-neutral-black font-medium">Categories</h3>
        <div className="mt-8 capitalize">
          {categoriesData?.map((item, index) => (
            <>
              <div
                onClick={() => {handleCategories(item.title)
                  
                }}
                key={item.id}
                className="text-neutral-600 flex items-center gap-x-2.5 my-3 cursor-pointer "
              >
                <div
                  className={cn(
                    `w-[18px] h-[18px] rounded-sm border border-slate-200 flex justify-center items-center `,
                    isExisting(item.title) && " bg-neutral-black/60"
                  )}
                >
                  {isExisting(item.title) && (
                    <Check strokeWidth={2} className="text-white w-3 h-3" />
                  )}
                </div>

                {item.title}
              </div>
              <hr className="border-slate-200" />
            </>
          ))}
        </div>
      </div>

      <div className="color my-10">
        <h3 className="text-neutral-black font-medium mb-4">Color</h3>
        <div className="flex items-center gap-1 mt-2 flex-wrap">
          {colors.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "p-1 rounded-full",
                color === index && " border border-neutral-black"
              )}
            >
              <button
                onClick={() => handleColor(index)}
                type="button"
                key={item.id}
                style={{ background: item.hexCode }}
                className=" w-6 h-6 rounded-full hover:border hover:border-slate-200 hover:scale-125 flex justify-center items-center"
              ></button>
            </div>
          ))}
        </div>
      </div>
      <div className="size mb-10">
        <h3 className="text-neutral-black font-medium mb-4">Size</h3>

        <div className="flex items-center gap-3 mt-2 flex-wrap">
          {sizes.map((item, index) => (
            <button
              type="button"
              onClick={() => handleSize(index)}
              key={item.id}
              className={cn(
                "w-10 h-10 border border-slate-200 flex justify-center items-center rounded-md hover:bg-W100 hover:border-neutral-black/50",
                size === index && "bg-W100 border-neutral-black"
              )}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
      <h3 className="text-neutral-black font-medium mb-4">Price</h3>

      <PriceSlider values={values} setValues={setValues} />
    </div>
  );
};

export default Filters;
