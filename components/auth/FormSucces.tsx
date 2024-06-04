import { CheckCircle } from "lucide-react";

type Props = {
  message?: string;
};

export const FormSucces = ({ message }: Props) => {
  return (
    <div className="w-full py-2 bg-emerald-400/15 text-emerald-400 text-[13px] rounded-md px-4 flex items-center gap-x-3 mt-2">
      <CheckCircle className="w-5 h-5 " />
      {message}
    </div>
  );
};
