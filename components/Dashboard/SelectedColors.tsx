import { cn, colors } from "@/lib/utils";
import { Check } from "lucide-react";

type value = {
  hexCode: string;
};

type Props = {
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  values: value[];
 
};

export const SelectedColors = ({ onChange, onRemove, values }: Props) => {
  const isExisting = (hexCode: string) => {
    return values.some((value) => value.hexCode === hexCode);
  };
  const handleSelectedColors = (hexCode: string) => {
    if (isExisting(hexCode)) {
      onRemove(hexCode);
    } else onChange(hexCode);
  };

  return (
    <div className="flex items-center gap-3 mt-2 flex-wrap">
      {colors.map((color) => (
        <button
          onClick={() => handleSelectedColors(color.hexCode)}
          type="button"
          key={color.id}
          style={{ background: color.hexCode }}
          className={cn(
            "w-6 h-6 rounded-full hover:border hover:border-slate-200 hover:scale-125 flex justify-center items-center",
            isExisting(color.hexCode) && "border-neutral-black border "
          )}
        >
          {isExisting(color.hexCode) && (
            <Check className="w-5 h-5 text-neutral-black" />
          )}
        </button>
      ))}
    </div>
  );
};
