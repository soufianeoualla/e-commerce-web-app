"use client";
import { cn } from "@/lib/utils";
import { Ellipsis, Inbox, Star } from "lucide-react";
import { useState } from "react";
type Props = {
  description: string;
};

export const ProductDetails = ({ description }: Props) => {
  const [reviews, setReviews] = useState<boolean>(false);
  return (
    <div className="flex justify-between mb-[176px]">
      <div className="space-y-4">
        <button
          onClick={() => setReviews(false)}
          className={cn(
            `w-[241px] text-neutral-500  rounded-md flex items-center px-4 gap-x-2.5 h-11`,
            !reviews && "bg-W100 text-neutral-black font-medium"
          )}
        >
          <Ellipsis className="w-3" />
          Details
        </button>
        <button
          onClick={() => setReviews(true)}
          className={cn(
            `w-[241px] text-neutral-500  rounded-md flex items-center px-4 gap-x-2.5 h-11`,
            reviews && "bg-W100 text-neutral-black font-medium"
          )}
        >
          <Star className="w-3 h-3" />
          Reviews
        </button>
      </div>
      <div className="max-w-[727px]">
        {!reviews && (
          <div>
            <h3 className="text-neutral-black font-semibold mb-6 text-[16px]">
              Details
            </h3>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        )}
        {reviews && (
          <div className="w-[727px]">
            <div className="mb-10">
              <h3 className="text-neutral-black font-semibold mb-2  text-[16px]">
                Reviews
              </h3>
              <hr />
            </div>
            <div className="flex justify-center items-center flex-col space-y-6 text-neutral-500">
              <Inbox className="w-16 h-16  stroke-[0.5px]" />
              <p>
                No Reviews Yet! Be the first to share your thoughts about this
                product.
              </p>
              <button className="text-neutral-black border border-neutral-black px-6  rounded-md font-medium h-12">
                Write a review
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
