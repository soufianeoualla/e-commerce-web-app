"use client";
import { usePathname } from "next/navigation";
import { Product } from "./Product";
import { ProductDetails } from "./ProductDetails";
import { useEffect, useState } from "react";
import { getSingleProduct } from "@/db/queries";
import { SingleProduct } from "@/lib/interfaces";
import { Loader } from "lucide-react";

export const ProductWrapper = () => {
  const [product, setProduct] = useState<SingleProduct | null>();
  const pathname = usePathname();
  const slug = pathname.split("/")[2];
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getSingleProduct(decodeURI(slug));
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [slug]);
  if (!product)
    return (
      <div className="flex justify-center items-center mx-auto mb-48 h-[50vh]">
        <Loader className="animate-spin" />
      </div>
    );
  return (
    <div>
      <Product product={product} />
      <ProductDetails description={product?.description} />
    </div>
  );
};
