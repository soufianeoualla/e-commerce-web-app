"use client";
import { cn } from "@/lib/utils";
import type { Dispatch, SetStateAction } from "react";
type Props = {
  selectedCategory: number;
  setSelectedCategory: Dispatch<SetStateAction<number>>;
};

export const Categories = ({
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  const categories = ["featured", "latest"];

  return (
    <div className="flex justify-center items-center gap-5 mb-20">
      {categories.map((item, index) => (
        <button
          type="button"
          onClick={() => setSelectedCategory(index)}
          className={cn(
            "text-neutral-600 capitalize hover:text-neutral-black hover:font-medium",
            selectedCategory === index &&
              "text-neutral-black border px-4 py-0.5 font-medium rounded-2xl"
          )}
          key={index}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
