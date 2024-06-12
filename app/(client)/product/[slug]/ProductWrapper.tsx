"use client";
import { usePathname } from "next/navigation";
import { Product } from "./Product";
import { ProductDetails } from "./ProductDetails";
import { useEffect, useState } from "react";
import { getProductReviews, getSimilarProducts, getSingleProduct } from "@/db/queries";
import { Review, SingleProduct } from "@/lib/interfaces";
import { Loader } from "lucide-react";
import { ProductsList } from "../../(HomePage)/ProductsList";
import { ProductSkeleton } from "@/components/store/ProductSkeleton";

export const ProductWrapper = () => {
  const [product, setProduct] = useState<SingleProduct | null>(null);
  const [similarProducts, setSimilarProducts] = useState<
    SingleProduct[] | null
  >(null);
  const [productsReviews, setProductsReviews] = useState<
    Review[] | undefined
  >();
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

  useEffect(() => {
    const getData = async () => {
      try {
        if (!product) return;
        const data = await getSimilarProducts(product.categories);
        setSimilarProducts(data);
        const reviewsData = await getProductReviews(product?.id!);
        setProductsReviews(reviewsData);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [product]);

  const products = similarProducts?.filter((item) => item.id !== product?.id);

  if (!product || !productsReviews)
    return (
      <div className="flex justify-center items-center mx-auto mb-48 h-[50vh]">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div>
      <Product product={product} reviews={productsReviews}  />
      <ProductDetails description={product?.description} productId={product.id} reviews={productsReviews}  />
      <div>
        <h1 className="text-neutral-black font-bold text-2xl mb-2">
          You might also like
        </h1>
        <p className="text-xs text-neutral-400 tracking-wide">
          SIMILAR PRODUCTS
        </p>
        <div className="mt-14 mb-32">
          {products ? (
            <ProductsList products={products} />
          ) : (
            <div className="flex justify-between">
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
