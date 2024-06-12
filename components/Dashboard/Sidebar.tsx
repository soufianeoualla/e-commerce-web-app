"use client";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package2,
  Plus,
  Settings,
  ShoppingCart,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      name: "Products",
      icon: Package2,
      href: "/dashboard/products",
    },
    {
      name: "Orders",
      icon: ShoppingCart,
      href: "/dashboard/orders",
    },
    {
      name: "Customers",
      icon: Users,
      href: "/dashboard/customers",
    },
    {
      name: "Reviews",
      icon: Star,
      href: "/dashboard/reviews",
    },
    {
      name: "Categories",
      icon: Plus,
      href: "/dashboard/categories",
    },
    {
      name: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];

  const pathname = usePathname();

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
          <Link
            href={item.href}
            key={item.name}
            className={cn(
              "flex items-center gap-x-[10px] font-medium  text-neutral-500 hover:text-neutral-black hover:bg-W100 rounded-md h-10 px-6 w-full  ",
              pathname === item.href && "text-neutral-black bg-W100 rounded-md"
            )}
          >
            <item.icon width={18} strokeWidth={1.5} height={18} />
            {item.name}
          </Link>
        ))}
      </div>
    </aside>
  );
};
