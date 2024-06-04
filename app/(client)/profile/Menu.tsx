"use client";
import { cn } from "@/lib/utils";
import {
  CircleUserRound,
  Heart,
  Key,
  LogOut,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
type Props = {
  selectedMenu: number;
  setSelectedMenu: Dispatch<SetStateAction<number>>;
};
export const Menu = ({ selectedMenu, setSelectedMenu }: Props) => {
  const menu = [
    {
      name: "Orders",
      icon: ShoppingCart,
    },
    {
      name: "Wishlist",
      icon: Heart,
    },
    {
      name: "Address",
      icon: Truck,
    },
    {
      name: "Password",
      icon: Key,
    },
    {
      name: " Account Detail",
      icon: CircleUserRound,
    },
  ];
  return (
    <aside className="w-[212px] mt-14 space-y-2">
      {menu.map((item, index) => (
        <button
          onClick={() => setSelectedMenu(index)}
          key={item.name}
          className={cn(
            "flex items-center gap-x-[10px] font-medium text-neutral-500 hover:text-neutral-black hover:bg-W100 rounded-md h-10 px-6 w-full ",
            selectedMenu === index && "text-neutral-black bg-W100 rounded-md"
          )}
        >
          <item.icon width={18} strokeWidth={1.5} height={18} />
          {item.name}
        </button>
      ))}
      <button
        onClick={() => signOut()}
        className="flex items-center gap-x-[10px] font-medium text-neutral-500 hover:text-neutral-black hover:bg-W100 rounded-md h-10 px-6 w-full "
      >
        <LogOut width={18} strokeWidth={1.5} height={18} />
        Logout
      </button>
    </aside>
  );
};
