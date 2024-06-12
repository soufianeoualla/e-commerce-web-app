"use client";
import { cn } from "@/lib/utils";
import { Ellipsis, Inbox, Star } from "lucide-react";
import { useState } from "react";
import { Reviews } from "./Reviews";
import { Review } from "@/lib/interfaces";
type Props = {
  description: string;
  productId: string;
  reviews:Review[]
};

export const ProductDetails = ({ description, productId,reviews }: Props) => {
  const [isReviewsSelected, setIsReviewsSelected] = useState<boolean>(false);
  return (
    <div className="flex  gap-x-24 mb-[176px]">
      <div className="space-y-4">
        <button
          onClick={() => setIsReviewsSelected(false)}
          className={cn(
            `w-[241px] text-neutral-500  rounded-md flex items-center px-4 gap-x-2.5 h-11`,
            !isReviewsSelected && "bg-W100 text-neutral-black font-medium"
          )}
        >
          <Ellipsis className="w-3" />
          Details
        </button>
        <button
          onClick={() => setIsReviewsSelected(true)}
          className={cn(
            `w-[241px] text-neutral-500  rounded-md flex items-center px-4 gap-x-2.5 h-11`,
            isReviewsSelected && "bg-W100 text-neutral-black font-medium"
          )}
        >
          <Star className="w-3 h-3" />
          Reviews
        </button>
      </div>
      <div className="max-w-[727px]">
        {!isReviewsSelected && (
          <div>
            <h3 className="text-neutral-black font-semibold mb-6 text-[16px]">
              Details
            </h3>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        )}
        {isReviewsSelected && <Reviews productId={productId} reviews={reviews}  />}
      </div>
    </div>
  );
};
