"use client";
import { Menu } from "./Menu";
import { Orders } from "./Orders";
import { Address } from "./Address";
import { Password } from "./Password";
import { Account } from "./Account";
import { useState } from "react";
import { Wishlist } from "./Wishlist";
import { BreadcrumbWithCustomSeparator } from "@/components/store/BreadCrumb";

const ProfilePage = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const menuComponents = [
    { component: <Orders />, key: "orders" },
    { component: <Wishlist />, key: "wishlist" },
    { component: <Address />, key: "address" },
    { component: <Password />, key: "password" },
    { component: <Account />, key: "account" },
  ];

  return (
    <main>
      <div className="h-40 bg-W100   ">
        <div className="max-w-[1116px] mx-auto space-y-2 pt-12  ">
          <h1 className="text-neutral-black text-2xl font-bold">My Account</h1>
          <BreadcrumbWithCustomSeparator classname="p-0 bg-transparent" />
        </div>
      </div>
      <div className="max-w-[1116px] mt-16 mx-auto mb-[135px] flex  items-start gap-9">
        <Menu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
        <div className="w-[617px] pl-12 border-l-2 border-l-slate-200 h-[60vh]">
          {menuComponents[selectedMenu].component}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;