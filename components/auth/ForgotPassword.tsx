"use client";
import { useState, useTransition } from "react";
import { Input } from "../ui/input";
import { sendResetLink } from "@/actions/resetPassword";
import { Button } from "../ui/button";
import { FormSucces } from "./FormSucces";
import { FormError } from "./FormError";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const onSend = () => {
    if (!email) return setError("email cannot be empty");
    startTransition(() => {
      sendResetLink(email).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };
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

        <Input
          disabled={isPending}
          type="email"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {success && <FormSucces message={success} />}
      {error && <FormError message={error} />}
      <Button
        disabled={isPending}
        onClick={onSend}
        className=" h-11  w-full  mt-2"
      >
        Send reset link
      </Button>
    </div>
  );
};
