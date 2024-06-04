import { cn, sizes } from "@/lib/utils";
import React from "react";
type value = {
  size: string;
};

type Props = {
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  values: value[];
};

export const SelectedSizes = ({ onChange, onRemove, values }: Props) => {
  const isExisting = (size: string) => {
    return values.some((value) => value.size === size);
  };
  const handleSelectedSizes = (size: string) => {
    if (isExisting(size)) {
      onRemove(size);
    } else onChange(size);
  };
  return (
    <div className="flex items-center gap-3 mt-2 flex-wrap">
      {sizes.map((size) => (
        <button
          type="button"
          onClick={() => handleSelectedSizes(size.title)}
          key={size.id}
          className={cn(
            "w-10 h-10 border border-slate-200 flex justify-center items-center rounded-md hover:bg-W100 hover:border-neutral-black/50",
            isExisting(size.title) && "bg-W100 border-neutral-black"
          )}
        >
          {size.title}
        </button>
      ))}
    </div>
  );
};
