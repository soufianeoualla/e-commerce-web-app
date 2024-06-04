import { ProductCard } from "@/components/store/ProductCard";
import { Product } from "@prisma/client";
type Props = {
  products: Product[];
};
export const BestSelling = ({ products }: Props) => {
  return (
    <section className="mt-[100px]">
      <h1 className="text-2xl font-bold text-neutral-black text-center">
        Best Selling
      </h1>
      <div className="flex justify-start items-start gap-x-5 mt-20">
        {/* {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))} */}
      </div>
    </section>
  );
};
