"use client";
import { CircleUserRound, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "./Search";
import { CartSheet } from "./CartSheet";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserImage } from "@/db/queries";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";

export const Header = () => {
  const { data, status } = useSession();
  const [image, setImage] = useState<string | null | undefined>("");
  const href = status === "authenticated" ? "/profile" : "/auth/login";
  useEffect(() => {
    const getUserData = async () => {
      const image = await getUserImage();
      setImage(image);
    };
    getUserData();
  }, []);
  return (
    <header>
      <div className="bg-neutral-black flex justify-center items-center h-10 text-white gap-x-2 text-sm">
        Get 25% OFF on your first order.{" "}
        <span className="font-medium"> Order Now</span>
      </div>
      <div className="max-w-[1116px] mx-auto flex justify-between items-center h-[84px] px-3">
        <div className="flex items-center gap-x-4">
          
          <Link href={"/"} className="flex items-center gap-x-2">
            <Image src={"/logo.svg"} alt="logo" width={20} height={20} />
            <b className="text-neutral-black font-bold text-lg -tracking-wide ">
              Ecommerce
            </b>
          </Link>
        </div>
        <div className="sm:hidden">
          <NavLinks />
        </div>
        <MobileMenu  />
        <div className="flex items-center gap-x-8">
          <Search />
          <div className="flex items-center gap-x-8 text-neutral-600 sm:gap-x-4">
            <CartSheet />
            <Link
              href={href}
              className="flex justify-center items-center gap-x-2 hover:underline hover:text-neutral-black hover:font-medium sm:hidden "
            >
              {image ? (
                <Image
                  src={image}
                  alt="user-image"
                  width={25}
                  height={25}
                  className="rounded-full"
                />
              ) : (
                <CircleUserRound width={25} strokeWidth={1.5} height={25} />
              )}
              <span className="sm:hidden">
                {status === "authenticated" ? "Account" : "Login"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
