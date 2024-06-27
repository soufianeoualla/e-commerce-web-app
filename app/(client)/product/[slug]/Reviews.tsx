"use client";
import { Inbox, Loader, Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState, useTransition } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addReview } from "@/actions/reviews";
import { FormError } from "@/components/auth/FormError";
import { getProductInOrder } from "@/db/queries";
import { Review } from "@/lib/interfaces";
import { timeAgo } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Order } from "@prisma/client";

type Props = {
  productId: string;
  reviews: Review[];
};

export const Reviews = ({ productId, reviews }: Props) => {
  const stars = [1, 2, 3, 4, 5];
  const [sort, setSort] = useState<string>("");
  const [writeReview, setWriteReview] = useState<boolean>(false);
  const [review, setReview] = useState<string>("");
  const [error, setError] = useState<string | undefined>("");
  const [rating, setRating] = useState<number>(0);
  const [hoveredStars, setHoveredStars] = useState<number>(0);
  const [isPending, startTransition] = useTransition();

  const [userOrder, setuserOrder] = useState<Order | null>();
  const { data } = useSession();

  useEffect(() => {
    const getData = async () => {
      const orderData = await getProductInOrder(productId);
      setuserOrder(orderData);
    };
    getData();
  }, [productId]);

  const handleSubmit = () => {
    if (!review || rating === 0) return setError("All fields are required");
    startTransition(() => {
      addReview(review, rating, productId).then((data) => {
        setError(data?.error);
      });
    });
    setWriteReview(false);
  };

  if (!reviews)
    return (
      <section className=" w-[727px] mx-auto">
        <div className="flex justify-center items-center   text-neutral-500">
          <Loader className="animate-spin" />
        </div>
      </section>
    );

  const sortedReviews = reviews.sort((a, b) => {
    if (sort === "newest") {
      return b.createdAt.getTime() - a.createdAt.getTime();
    } else if (sort === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  const overallRating =
    reviews.length > 0
      ? reviews.reduce((acc, val) => acc + val.rating, 0) / reviews.length
      : 0;

  const alreadyHaveReview = reviews.some(
    (review) => review.userId === data?.user?.id
  );

  const isDisabled = alreadyHaveReview || !userOrder;

  return (
    <div className="w-[727px] sm:w-full">
      <div className="mb-10">
        <h3 className="text-neutral-black font-semibold mb-2  text-[16px]">
          Reviews
        </h3>
      </div>

      {reviews.length > 0 ? (
        <div>
          <div className="flex items-center gap-x-2">
            <h1 className="text-3xl font-bold">{overallRating.toFixed(1)}</h1>
            <span className="text-neutral-500">
              — {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
            </span>
          </div>

          {!writeReview ? (
            <>
              <button
                disabled={isDisabled}
                onClick={() => setWriteReview(true)}
                className="text-neutral-black border border-neutral-black px-6  rounded-sm font-medium h-12 mt-12 disabled:cursor-not-allowed  disabled:border-slate-200 disabled:text-neutral-black/50 "
              >
                Write a review
              </button>
              {alreadyHaveReview && (
                <p className="text-xs mt-3 text-destructive">
                  {" "}
                  You already had a review *
                </p>
              )}
            </>
          ) : (
            <div>
              <h3 className="text-neutral-black font-semibold my-6  text-[16px]">
                Write Review
              </h3>
              <hr />

              <div className="my-6 flex items-center">
                {stars.map((star, index) => (
                  <Star
                    onMouseEnter={() => setHoveredStars(star)}
                    onMouseLeave={() => setHoveredStars(0)}
                    onClick={() => setRating(star)}
                    key={index}
                    strokeWidth={1.5}
                    className={`text-neutral-500 cursor-pointer  ${
                      (hoveredStars >= star || rating >= star) &&
                      "fill-neutral-black text-neutral-black"
                    }`}
                  />
                ))}
              </div>

              <div className=" grid space-y-2">
                <Label>Review</Label>
                <Textarea
                  disabled={isPending}
                  placeholder="Your review"
                  className="p-4  resize-none h-32"
                  onChange={(e) => setReview(e.target.value)}
                />
              </div>
              {error && <FormError message={error} />}

              <Button
                onClick={handleSubmit}
                disabled={isPending}
                className="bg-neutral-black h-11 px-6 text-white font-medium rounded-md hover:bg-opacity-80 mt-4 "
              >
                Submit Your Review
              </Button>
            </div>
          )}

          <div>
            <div className="flex justify-end mt-6 mb-2">
              <Select onValueChange={(value) => setSort(value)}>
                <SelectTrigger className="w-[150px]  border-none  text-neutral-black font-medium ">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <hr />
            {sortedReviews.map((review) => (
              <div
                key={review.id}
                className="flex items-start justify-between mt-6"
              >
                <div className="flex items-start gap-x-4 text-neutral-500">
                  <div className="w-12 h-12 flex-1 rounded-full bg-slate-200/50 text-blue-600  flex justify-center items-center uppercase font-medium text-xl">
                    {review.user.name.slice(0, 1)}
                  </div>
                  <div className="">
                    <b className="text-neutral-black capitalize">
                      {review.user.name}
                    </b>
                    <p className="mt-2 mb-4 text-xs uppercase">
                      {timeAgo(review.createdAt)}
                    </p>
                    <p>{review.text}</p>
                  </div>
                </div>
                <div className=" flex items-center">
                  {stars.map((star, index) => (
                    <Star
                      key={index}
                      strokeWidth={1.5}
                      className={`text-neutral-500 cursor-pointer  ${
                        review.rating >= star &&
                        "fill-neutral-black text-neutral-black"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {!writeReview ? (
            <div className="flex justify-center items-center flex-col space-y-6 text-neutral-500">
              <Inbox className="w-16 h-16  stroke-[0.5px]" />
              <p>
                No Reviews Yet! Be the first to share your thoughts about this
                product.
              </p>
              <button
                disabled={isDisabled}
                onClick={() => setWriteReview(true)}
                className="text-neutral-black border border-neutral-black px-6  rounded-sm font-medium h-12 mt-12 disabled:cursor-not-allowed  disabled:border-slate-200 disabled:text-neutral-black/50 "
              >
                Write a review
              </button>
              {!userOrder && (
                <p className="text-xs mt-3 text-destructive">
                  {" "}
                  You have to buy first *
                </p>
              )}
            </div>
          ) : (
            <div>
              <h3 className="text-neutral-black font-semibold my-6  text-[16px]">
                Write Review
              </h3>
              <hr />

              <div className="my-6 flex items-center">
                {stars.map((star, index) => (
                  <Star
                    onMouseEnter={() => setHoveredStars(star)}
                    onMouseLeave={() => setHoveredStars(0)}
                    onClick={() => setRating(star)}
                    key={index}
                    strokeWidth={1.5}
                    className={`text-neutral-500 cursor-pointer  ${
                      (hoveredStars >= star || rating >= star) &&
                      "fill-neutral-black text-neutral-black"
                    }`}
                  />
                ))}
              </div>

              <div className=" grid space-y-2">
                <Label>Review</Label>
                <Textarea
                  disabled={isPending}
                  placeholder="Your review"
                  className="p-4  resize-none h-32"
                  onChange={(e) => setReview(e.target.value)}
                />
              </div>
              {error && <FormError message={error} />}

              <Button
                onClick={handleSubmit}
                disabled={isPending}
                className="bg-neutral-black h-11 px-6 text-white font-medium rounded-md hover:bg-opacity-80 mt-4 "
              >
                Submit Your Review
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
