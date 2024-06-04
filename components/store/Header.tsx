"use client";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "./Search";
import { CartSheet } from "./CartSheet";
import { useSession } from "next-auth/react";

export const Header = () => {
  const { data, status } = useSession();
  const href = status === "authenticated" ? "/profile" : "/auth/login";
  return (
    <header>
      <div className="bg-neutral-black flex justify-center items-center h-10 text-white gap-x-2 text-sm">
        Get 25% OFF on your first order.{" "}
        <span className="font-medium"> Order Now</span>
      </div>
      <div className="max-w-[1116px] mx-auto flex justify-between items-center h-[84px] px-3">
        <Link href={"/"} className="flex items-center gap-x-2">
          <Image src={"/logo.svg"} alt="logo" width={20} height={20} />
          <b className="text-neutral-black font-bold text-lg -tracking-wide">
            Ecommerce
          </b>
        </Link>
        <nav>
          <ul className="flex items-center gap-8 text-sm text-neutral-500 font-medium ">
            <li className="hover:text-neutral-black">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="hover:text-neutral-black">
              <Link href={"/"}>Categories</Link>
            </li>
            <li className="hover:text-neutral-black">
              <Link href={"/about"}>About</Link>
            </li>
            <li className="hover:text-neutral-black">
              <Link href={"/conatct"}>Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-x-8">
          <Search />
          <div className="flex items-center gap-x-8 text-neutral-600">
            <CartSheet />
            <Link
              href={href}
              className="flex justify-center items-center gap-x-2 hover:underline hover:text-neutral-black hover:font-medium "
            >
              <CircleUserRound width={25} strokeWidth={1.5} height={25} />
              {status === "authenticated" ? "Account" : "Login"}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
