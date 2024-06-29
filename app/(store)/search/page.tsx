"use client";
import { PageWrapper } from "./PageWrapper";
import { Suspense, useEffect, useState } from "react";
import { BreadcrumbWithCustomSeparator } from "@/components/store/BreadCrumb";
import Filters from "./Filters";
import { Search } from "@/components/store/Search";
import { SlidersHorizontal } from "lucide-react";

const Page = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [color, setColor] = useState<number | undefined>(undefined);
  const [size, setSize] = useState<number | undefined>(undefined);
  const [values, setValues] = useState<[number, number]>([5, 300]);
  const [showFilters, setShowFilters] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      const isOnMobile = window.innerWidth <= 620;
      setShowFilters(!isOnMobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <BreadcrumbWithCustomSeparator />
      <div className="hidden sm:flex mt-4 px-4  items-center justify-between gap-x-4">
        <Search />
        <SlidersHorizontal
          strokeWidth={1.5}
          className="hidden sm:block"
          onClick={() => setShowFilters(!showFilters)}
        />
      </div>
      <main className="max-w-[1116px] mx-auto mt-6">
        <div className="grid grid-cols-[250px,1fr] items-start gap-8 mb-32 sm:grid-cols-1">
          {showFilters && (
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
          )}
          <Suspense>
            <PageWrapper
              categories={categories}
              color={color}
              size={size}
              setCategories={setCategories}
              values={values}
            />
          </Suspense>
        </div>
      </main>
    </>
  );
};

export default Page;
