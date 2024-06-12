"use client";
import { PageWrapper } from "./PageWrapper";
import { Suspense, useState } from "react";
import { BreadcrumbWithCustomSeparator } from "@/components/store/BreadCrumb";
import Filters from "./Filters";
const Page = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [color, setColor] = useState<number | undefined>(undefined);
  const [size, setSize] = useState<number | undefined>(undefined);
  const [values, setValues] = useState<[number, number]>([5, 300]);

  return (
    <>
      <BreadcrumbWithCustomSeparator />
      <main className="max-w-[1116px] mx-auto mt-6">
        <div className="grid grid-cols-[250px,1fr] items-start gap-x-8 mb-32">
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
