"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import Link from "next/link";

export const CategoryMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem >
          <NavigationMenuTrigger className="p-0 hover:bg-transparent">Categories</NavigationMenuTrigger>
          <NavigationMenuContent >
            <ul className="grid w-[200px] p-3 space-y-2  ">
              <li className="hover:font-bold">
                <Link href={"/search?category=men"}>Men</Link>
              </li>
              <li className="hover:font-bold">
                <Link href={"/search?category=women"}>Women</Link>
              </li>
              <li className="hover:font-bold">
                <Link href={"/search?category=new-arrivals"}>New Arrivals</Link>
              </li>
              <li className="hover:font-bold">
                <Link href={"/search?category=hoodies"}>Hoodies</Link>
              </li>
              <li className="hover:font-bold">
                <Link href={"/search?category=t-shirt"}>T-shirts</Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
