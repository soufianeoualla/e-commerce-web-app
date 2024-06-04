"use client";
import { formatPrice } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import Slider from "react-slider";

type Props = {
  values: [number, number];
  setValues: Dispatch<SetStateAction<[number, number]>>;
};

export const PriceSlider = ({ values, setValues }: Props) => {
  return (
    <>
      <div className="flex justify-center items-center text-neutral-black font-medium">
      {formatPrice(values[0])} — {formatPrice(values[1])}
      </div>
      <Slider
        className="w-full h-1 slider mt-4 slider  "
        value={values}
        min={5}
        max={300}
        onChange={setValues}
        thumbClassName="absolute h-4 w-4 bg-white rounded-full border border-neutral-black/80 -top-[5px] focus:outline-none"
        trackClassName="track"
      />
    </>
  );
};
