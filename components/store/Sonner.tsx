import { Check } from "lucide-react";

type Props = {
  text: string;
};

export const Sonner = ({ text }: Props) => {
  return (
    <div className="w-[300px] flex items-center gap-x-4 p-4 text-neutral-black fixed bottom-2 right-2 border bg-white rounded-md font-medium shadow-md transition-all duration-200">
      <div className="w-8 h-8 rounded-full bg-emerald-500 flex justify-center items-center">
        <Check className="w-5 h-5 text-white" />
      </div>
      {text}
    </div>
  );
};
