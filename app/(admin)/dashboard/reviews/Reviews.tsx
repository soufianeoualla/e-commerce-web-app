"use client";
import { getAllReviews } from "@/db/queries";
import { Review } from "@/lib/interfaces";
import { Ellipsis, Loader, SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

export const Reviews = () => {
  const [reviews, setReviews] = useState<Review[] | null>();
  useEffect(() => {
    const getData = async () => {
      const data = await getAllReviews();
      setReviews(data);
    };
    getData();
  }, []);

  if (!reviews)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <>
      <div className="w-full bg-white rounded-lg border border-slate-200 h-full">
        <div className="px-10 py-6 flex justify-between items-center">
          <h3 className="text-neutral-black font-medium text-[16px] capitalize">reviews</h3>
          <div className="flex items-center gap-x-4">
            <div className="search relative text-neutral-500">
              <input
                placeholder="Search reviews "
                className="border border-slate-200 h-11 max-w-[265px] rounded-md pl-14 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-black/50"
              />
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        <table className="w-full mb-5  ">
          <tbody>
            <tr className="border border-slate-200">
              <th> {""}</th>
              <th> {"Name"}</th>
              <th> {"Review"}</th>
              <th className="text-left  -translate-x-4"> {"Action"}</th>

            </tr>
            {reviews.map((review, index) => (
              <tr key={index}>
                <td>
                  <div className="w-12 h-12 rounded-full bg-slate-200/50 text-blue-600 flex justify-center items-center uppercase font-medium text-xl">
                    {review.user.name.slice(0, 1)}
                  </div>
                </td>

                <td>{review.user.name}</td>
                <td>{review.text}</td>

                <td>
                  <button>
                    <Ellipsis strokeWidth={1} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
