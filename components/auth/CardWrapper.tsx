"use client";
import Image from "next/image";
import { LoginForm } from "./LoginForm";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RegisterForm } from "./RegisterForm";

type Props = {
  buttonLabel: string;
  buttonHref: string;
  social?: boolean;
};

export const CardWrapper = ({ buttonHref, buttonLabel, social }: Props) => {
  const pathname = usePathname();
  const Component = pathname.includes("login") ? LoginForm : RegisterForm;
  return (
    <div className="w-[370px] p-8">
      {social && (
        <>
          <button className="flex justify-center items-center gap-x-2 h-11 w-full border border-slate-200 rounded text-neutral-500 font-medium hover:bg-W100">
            <Image src={"/Google.svg"} alt="google" width={18} height={18} />
            Continue with Google
          </button>
          <div className=" flex items-center gap-x-4 text-xs font-medium text-neutral-500 my-8">
            <div className="w-full h-[2px] rounded-xl bg-slate-200" />
            OR
            <div className="w-full h-[2px] rounded-xl bg-slate-200" />
          </div>
        </>
      )}
      <Component />
      <div className="mt-6 flex justify-center items-center">
        <Link
          href={buttonHref}
          className=" text-neutral-500 hover:text-neutral-black hover:underline hover:font-medium"
        >
          {buttonLabel}
        </Link>
      </div>
    </div>
  );
};
