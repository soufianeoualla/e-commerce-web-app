import { TriangleAlert } from "lucide-react";
import React from "react";
type Props = {
  message?: string;
};
export const FormError = ({ message }: Props) => {
  return (
    <div className="w-full py-2 bg-destructive/15 text-destructive text-[13px] rounded-md px-4 flex items-center gap-x-3 mt-2">
      <TriangleAlert className="w-5 h-5 " />
      {message}
    </div>
  );
};
