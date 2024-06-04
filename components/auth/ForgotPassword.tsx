"use client";
import { Input } from "../ui/input";

export const ForgotPassword = () => {
  return (
    <div className="w-[370px] p-8">
      <p className=" text-xs font-medium text-neutral-500 leading-5">
        Please enter the email address associated with your account. We&apos;ll
        promptly send you a link to reset your password.
      </p>

      <div className="my-4 space-y-2">
        <label className="text-xs text-neutral-600 font-medium" htmlFor="email">
          Email
        </label>

        <Input type="email" id="email" placeholder="Email" />
      </div>
      <button className="bg-neutral-black text-white font-medium h-11 rounded w-full mt-6 hover:bg-opacity-80">
      Send reset link
      </button>
    </div>
  );
};
