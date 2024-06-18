"use client";
import { useState } from "react";
import { Products } from "./Products";
import { Categories } from "./Categories";
export const ProductCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  return (
    <div className="max-w-[1116px] mx-auto mb-48">
      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Products selectedCategory={selectedCategory} />
    </div>
  );
};
