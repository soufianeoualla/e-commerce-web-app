"use client";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Search = () => {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();
  const handleSearch = () => {
    router.push(`/search?query=${query}`);
  };
  return (
    <div className="search relative text-neutral-500 sm:hidden">
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products "
        className="border border-slate-200 h-11 max-w-[265px] rounded-md pl-14 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-black/50"
      />
      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2" />
    </div>
  );
};
