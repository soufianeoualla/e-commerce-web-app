import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaCcVisa,
  FaCcAmex,
  FaCcMastercard,
} from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  const today = new Date();
  return (
    <>
      <footer className="max-w-[1116px] mx-auto mb-[102px] flex justify-between flex-wrap gap-y-8 sm:px-4 ">
        <div className="">
          <div className="flex items-center gap-x-4 mb-3">
            <div className="w-11 h-11 border border-slate-200 rounded-md flex justify-center items-center">
              <Image
                src={"/logo-white.svg"}
                alt="logo"
                width={16}
                height={28}
              />
            </div>
            <b className="text-neutral-black font-bold text-lg -tracking-wide">
              Ecommerce
            </b>
          </div>
          <p className="leading-6 text-neutral-500">
            FOR EVERYONE BUT NOT ANYONE
          </p>
          <div className="flex items-center gap-x-6 mt-8 text-neutral-500 ">
            <Link href={""}>
              <FaXTwitter className="w-6 h-6 hover:text-neutral-black " />
            </Link>
            <Link href={""}>
              <FaFacebook className="w-6 h-6 hover:text-neutral-black " />
            </Link>
            <Link href={""}>
              <FaInstagram className="w-6 h-6 hover:text-neutral-black " />
            </Link>
          </div>
        </div>

        <div className="flex items-start gap-[72px] sm:gap-12">
          <div className="space-y-10">
            <h3 className="text-neutral-400 font-medium">SUPPORT</h3>
            <ul className="space-y-4 text-neutral-500">
              <li className="hover:text-neutral-black font-medium">
                <Link href={""}>FAQ</Link>{" "}
              </li>
              <li className="hover:text-neutral-black font-medium">
                <Link href={""}>Terms of use</Link>{" "}
              </li>
              <li className="hover:text-neutral-black font-medium">
                <Link href={""}>Privacy Policy</Link>{" "}
              </li>
            </ul>
          </div>
          <div className="space-y-10">
            <h3 className="text-neutral-400 font-medium">COMPANY</h3>
            <ul className="space-y-4 text-neutral-500">
              <li className="hover:text-neutral-black font-medium">
                <Link href={""}>About us</Link>{" "}
              </li>
              <li className="hover:text-neutral-black font-medium">
                <Link href={""}>Contact</Link>{" "}
              </li>
              <li className="hover:text-neutral-black font-medium">
                <Link href={""}>Careers</Link>{" "}
              </li>
            </ul>
          </div>
          <div className="space-y-10">
            <h3 className="text-neutral-400 font-medium">SHOP</h3>
            <ul className="space-y-4 text-neutral-500">
              <li className="hover:text-neutral-black font-medium">
                <Link href={""}>My Account</Link>{" "}
              </li>
              <li className="hover:text-neutral-black font-medium">
                <Link href={""}>Checkout</Link>{" "}
              </li>
              <li className="hover:text-neutral-black font-medium">
                <Link href={""}>Cart</Link>{" "}
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-10">
          <h3 className="text-neutral-400 font-medium">ACCEPTED PAYMENTS</h3>
          <div className="flex gap-x-4 text-neutral-600">
            <FaCcMastercard className="w-8 h-8  hover:text-neutral-black cursor-pointer" />
            <FaCcAmex className="w-8 h-8  hover:text-neutral-black cursor-pointer" />
            <FaCcVisa className="w-8 h-8  hover:text-neutral-black cursor-pointer" />
          </div>
        </div>
      </footer>
      <footer className="max-w-[1116px] mx-auto flex justify-center items-center h-14">
        <p className="text-neutral-500">© {today.getFullYear()} SOUFIANECODE. All rights reserved.</p>
      </footer>
    </>
  );
};
