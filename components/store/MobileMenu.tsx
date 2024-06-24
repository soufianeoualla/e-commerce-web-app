"use client";
import { cn } from "@/lib/utils";
import { Heart, Home, Search, User } from "lucide-react";
import { usePathname } from "next/navigation";

export const MobileMenu = () => {
  const menu = [
    {
      label: "Home",
      icon: Home,
      href: "/",
    },
    {
      label: "Search",
      icon: Search,
      href: "/search",
    },
    {
      label: "Wishlist",
      icon: Heart,
      href: "/profile?wishlist=true",
    },
    {
      label: "Profile",
      icon: User,
      href: "/profile",
    },
  ];

  const pathname = usePathname();

  return (
    <div className="fixed w-full h-14 bottom-0 left-0 bg-white justify-between items-center px-4 z-40 hidden sm:flex">
      {menu.map((item) => (
        <div
          key={item.href}
          className={cn(
            "flex flex-col items-center text-neutral-black",
            item.href === pathname && "font-bold"
          )}
        >
          <item.icon
          
            className={cn("stroke-[1.25px]", item.href === pathname && "stroke-[2px]")}
          />
          {item.label}
        </div>
      ))}
    </div>
  );
};
