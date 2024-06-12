import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";
import React from "react";
type Props = {
  message?: string;
  classname?:string
};
export const FormError = ({ message ,classname}: Props) => {
  return (
    <div className={cn("w-full py-2 bg-destructive/15 text-destructive text-[13px] rounded-md px-4 flex items-center gap-x-3 my-2",classname)}>
      <TriangleAlert className="w-5 h-5 " />
      {message}
    </div>
  );
};
