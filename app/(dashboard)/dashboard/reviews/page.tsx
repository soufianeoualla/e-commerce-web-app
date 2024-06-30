"use client";
import { DeleteModal } from "@/components/Dashboard/DeleteModal";
import Pagination from "@/components/Dashboard/Pagination";
import { Button } from "@/components/ui/button";
import { dataUpdate } from "@/context/dataUpdate";
import { getAllReviews } from "@/db/queries";
import { Review } from "@/lib/interfaces";
import { Loader, SearchIcon, Trash2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

const Page = () => {
  const [reviews, setReviews] = useState<Review[] | null>();
  const [id, setId] = useState<string>("");
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const [query, setQuery] = useState<string>("");
  const { trigger } = useContext(dataUpdate);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllReviews();
      setReviews(data);
    };
    getData();
  }, [trigger]);

  if (!reviews)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  const filtredReviews = query
    ? reviews.filter((item) => item.user.name.toLowerCase().includes(query))
    : reviews;
  const currentItems = filtredReviews?.slice(firstItemIndex, lastItemIndex);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(reviews?.length! / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const lastPage = pageNumbers.length;
  return (
    <>
      <div className="w-full bg-white rounded-lg border border-slate-200 h-full">
        <div className="px-10 py-6 flex justify-between items-center">
          <h3 className="text-neutral-black font-medium text-[16px] capitalize">
            reviews
          </h3>
          <div className="flex items-center gap-x-4">
            <div className="search relative text-neutral-500">
              <input
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
                placeholder="Search reviews "
                className="border border-slate-200 h-11 max-w-[265px] rounded-md pl-14 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-black/50"
              />
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        <table className="w-full  ">
          <tbody>
            <tr className="border border-slate-200">
              <th> {""}</th>
              <th> {"Name"}</th>
              <th> {"Review"}</th>
              <th className="text-left  -translate-x-4"> {"Action"}</th>
            </tr>
            {currentItems.map((review, index) => (
              <tr key={index}>
                <td>
                  <div className="w-12 h-12 rounded-full bg-slate-200/50 text-blue-600 flex justify-center items-center uppercase font-medium text-xl">
                    {review.user.name.slice(0, 1)}
                  </div>
                </td>

                <td>{review.user.name}</td>
                <td className="text-wrap">{review.text}</td>

                <td className="w-[130px]">
                  <Button
                    onClick={() => {
                      setId(review.id);
                      setDeleteModal(true);
                    }}
                    variant={"destructive"}
                    size={"icon"}
                  >
                    <Trash2 strokeWidth={1.5} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {reviews.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      {deleteModal && (
        <DeleteModal id={id} setDeleteModal={setDeleteModal} type="review" />
      )}
    </>
  );
};

export default Page;
