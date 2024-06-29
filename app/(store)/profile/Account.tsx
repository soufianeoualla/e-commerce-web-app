"use client";

import { Input } from "@/components/ui/input";
import { getSession, useSession } from "next-auth/react";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FormSucces } from "@/components/auth/FormSucces";
import { FormError } from "@/components/auth/FormError";
import { Label } from "@/components/ui/label";
import { getUserImage } from "@/db/queries";
import { changeAccounDetails } from "@/actions/profile";
export const Account = () => {
  const { data, status } = useSession();

  const [image, setImage] = useState<string | null | undefined>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  useEffect(() => {
    const getUserData = async () => {
      const image = await getUserImage();
      setImage(image);
    };
    getUserData();
  }, []);

  const handleUpload = (result: any) => {
    setImage(result.info.secure_url);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      await changeAccounDetails(name, email, image).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };
  return (
    <section className=" w-full">
      <h3 className="text-[16px] text-neutral-black font-semibold">
        Account Details
      </h3>

      <form onSubmit={handleSubmit} className=" space-y-4 mt-8 w-[300px]">
        <CldUploadWidget uploadPreset="e8pbrjoh" onUpload={handleUpload}>
          {({ open }) => {
            return (
              <div>
                {image ? (
                  <Image
                    onClick={() => open()}
                    src={image}
                    alt="user-image"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                ) : (
                  <Button
                    disabled={isPending}
                    type="button"
                    onClick={() => open()}
                    className="w-12 h-12 rounded-full bg-slate-200/50 text-blue-600 mt-10 flex justify-center items-center uppercase font-medium text-xl"
                  >
                    {data?.user?.name?.slice(0, 1)}
                  </Button>
                )}
              </div>
            );
          }}
        </CldUploadWidget>

        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            disabled={isPending}
            type="text"
            placeholder="Full name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            disabled={isPending}
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {success && <FormSucces message={success} />}
        {error && <FormError message={error} />}

        <Button
          disabled={isPending}
          className="bg-neutral-black text-white font-medium h-11 rounded px-6 mt-16 hover:bg-opacity-80"
        >
          Save Changes
        </Button>
      </form>
    </section>
  );
};

