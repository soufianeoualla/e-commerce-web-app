import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  lastPage: number;
};

const Pagination = ({ setCurrentPage, currentPage, lastPage }: Props) => {
    const handlePreviousClick = () => {
        if (currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        }
      };
    
      const handleNextClick = () => {
        if (currentPage < lastPage) {
          setCurrentPage((prev) => prev + 1);
        }
      };
  return (
    <div className="flex justify-end items-center text-base  py-5 px-10">
      <Button
        disabled={currentPage === 1}
        onClick={handlePreviousClick}
        variant={"ghost"}
        aria-label="Previous Page"

      >
        <ChevronLeft strokeWidth={1.5} className="w-5 h-5" />
        Previous
      </Button>

      {currentPage > 1 && (
        <Button
          onClick={handlePreviousClick}
          variant={"ghost"}
          aria-label={`Page 1`}
        >
          {currentPage - 1}
        </Button>
      )}
      <Button variant={"outline"}>{currentPage}</Button>

      {currentPage < lastPage && (
        <Button
          onClick={handleNextClick}
          variant={"ghost"}
        >
          {currentPage + 1}
        </Button>
      )}

      {currentPage + 1 < lastPage && (
        <Button
          onClick={() => setCurrentPage((prev) => prev + 2)}
          variant={"ghost"}
        >
          {currentPage + 2}
        </Button>
      )}

      {currentPage + 2 < lastPage && <Button variant={"ghost"}>{"..."}</Button>}

      <Button
        disabled={currentPage === lastPage}
        onClick={handleNextClick}
        variant={"ghost"}
      >
        Next
        <ChevronRight strokeWidth={1.5} className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Pagination;
