"use client";
import { cn } from "@/lib/utils";
import { Image as image } from "@prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
type Props = {
  images: image[];
};

export const ImageSlider = ({ images }: Props) => {
  const [imageSlide, setImageSlide] = useState<number>(0);

  return (
    <div className="w-[534px] sm:w-full h-[574px] sm:h-[500px] flex justify-center items-center bg-W100 rounded-md relative ">
      {images.map((image, index) => (
        <div key={image.id}>
          {imageSlide === index && (
            <Image
              src={image.imageSrc}
              alt="t-shirt"
              width={288}
              height={404}
            />
          )}
        </div>
      ))}
      {images.length > 1 && (
        <>
          <button
            onClick={() =>
              setImageSlide(
                (prev) => (prev - 1 + images.length) % images.length
              )
            }
            className="absolute w-12 h-12 rounded-full flex justify-center items-center hover:bg-neutral-black text-neutral-black hover:text-white   top-1/2 -translate-y-1/2 left-3"
          >
            <ChevronLeft className="w-5 h-5 -translate-x-[1px]" />
          </button>
          <button
            onClick={() => setImageSlide((prev) => (prev + 1) % images.length)}
            className="absolute w-12 h-12 rounded-full flex justify-center items-center hover:bg-neutral-black text-neutral-black hover:text-white  top-1/2 -translate-y-1/2 right-3"
          >
            <ChevronRight className="w-5 h-5 translate-x-[1px] " />
          </button>
        </>
      )}
      {images.length > 1 && (
        <div className="flex justify-center items-center gap-x-1 absolute left-1/2 -translate-x-1/2 bottom-3 ">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={cn(
                "w-2 h-2 rounded-full bg-neutral-black/20",
                imageSlide === index && "bg-neutral-black/60"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};
