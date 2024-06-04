import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  label: string;
  href: string;
};

export const LinkButton = ({ href, label }: Props) => {
  return (
    <Link
      href={href}
      className=" bg-neutral-black text-white h-11 rounded-sm flex items-center justify-center w-[182px] text-sm font-medium hover:bg-opacity-80"
    >
      {label}
      <ArrowRight className="ml-3 w-4 h-4" />
    </Link>
  );
};
