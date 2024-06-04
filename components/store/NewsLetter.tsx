"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const NewsLetter = () => {
  const pathname = usePathname();
  const isAuthPage = pathname.includes("auth");
  return (
    <div className={cn("bg-W100 mb-[74px] ", isAuthPage && "hidden")}>
      <div className="max-w-[1116px] mx-auto flex justify-between items-center h-[200px]">
        <div className="space-y-6">
          <h1 className="text-neutral-black text-2xl font-bold">
            Join Our Newsletter
          </h1>
          <p className="text-neutral-500">
            We love to surprise our subscribers with occasional gifts.
          </p>
        </div>
        <div className="flex items-center gap-x-4">
          <input
            placeholder="Your email address"
            className="border border-slate-200 px-4 h-11 w-[320px] rounded-md  placeholder:text-neutral-500 focus:outline-none focus:border-neutral-black/50"
          />
          <button className="bg-neutral-black text-white font-medium h-11 px-6 rounded-md">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};
