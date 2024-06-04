"use client";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package2,
  Settings,
  ShoppingCart,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export const Sidebar = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      icon: Package2,
    },
    {
      name: "Orders",
      icon: ShoppingCart,
    },
    {
      name: "Customers",
      icon: Users,
    },
    {
      name: "Reviews",
      icon: Star,
    },
    {
      name: "Settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="fixed w-[250px] bg-white flex flex-col items-center border-r border-r-stone-200 h-full">
      <div className="flex items-center gap-x-2 h-[72px] justify-center">
        <Image src={"/logo.svg"} alt="logo" width={20} height={20} />
        <b className="text-neutral-black font-bold text-lg -tracking-wide">
          Admin
        </b>
      </div>
      <div className="space-y-4 mt-12 w-full pl-5 pr-7">
        {menu.map((item, index) => (
          <button
            onClick={() => setSelectedMenu(index)}
            key={item.name}
            className={cn(
              "flex items-center gap-x-[10px] font-medium  text-neutral-500 hover:text-neutral-black hover:bg-W100 rounded-md h-10 px-6 w-full  ",
              selectedMenu === index && "text-neutral-black bg-W100 rounded-md"
            )}
          >
            <item.icon width={18} strokeWidth={1.5} height={18} />
            {item.name}
          </button>
        ))}
      </div>
    </aside>
  );
};
