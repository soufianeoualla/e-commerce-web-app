"use client";
import { verificationEmail } from "@/actions/verficationEmail";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { FormSucces } from "./FormSucces";
import { FormError } from "./FormError";

export const VerficationWrapper = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const handleVerfication = useCallback(() => {
    if (!token) return setError("Token not found");
    verificationEmail(token).then((data) => {
      setError(data?.error);
      setSuccess(data?.success);
    });
    setTimeout(() => {
      setTimeout(() => {
        setSuccess("Redirecting...");
      }, 3000);
      router.push("/auth/login");
    }, 5000);
  }, [token, router]);

  useEffect(() => {
    handleVerfication();
  }, [handleVerfication]);
  return (
    <div className="w-[350px] rounded-md border border-slate-300 p-4 flex flex-col justify-center items-center gap-y-4">
      <div className="flex items-center gap-x-2">
        <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
      </div>
      <h1 className="text-xl text-neutral-black font-bold">
        Confirming your email...
      </h1>
      {success && <FormSucces message={success} />}
      {error && <FormError message={error} />}
      {!success && !error && (
        <Loader className="animate-spin text-neutral-600" />
      )}
    </div>
  );
};
