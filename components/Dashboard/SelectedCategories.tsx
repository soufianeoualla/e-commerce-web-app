import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { Check } from "lucide-react";

type value = {
  category: string;
};

type Props = {
  categories: Category[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  values: value[];
};

export const SelectedCategories = ({
  onChange,
  onRemove,
  values,
  categories,
}: Props) => {
  const isExisting = (category: string) => {
    return values.some((value) => value.category === category);
  };
  const handleSelectedCategories = (category: string) => {
    if (isExisting(category)) {
      onRemove(category);
    } else onChange(category);
  };
  return (
    <div className="flex gap-4 flex-wrap">
      {categories.map((item) => (
        <div key={item.id} className="flex justify-center items-center gap-x-2">
          <button
            type="button"
            onClick={() => handleSelectedCategories(item.title)}
            className={cn(
              "w-6 h-6 rounded-sm border border-slate-200 flex justify-center items-center text-neutral-black font-medium",
              isExisting(item.title) && "bg-neutral-black"
            )}
          >
            {" "}
            {isExisting(item.title) && <Check className="w-4 h-4 text-white" />}
          </button>
          {item.title}
        </div>
      ))}
    </div>
  );
};
