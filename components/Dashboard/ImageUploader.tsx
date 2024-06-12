"use client";

import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, X } from "lucide-react";

type Props = {
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  values: string[];
};
export const ImageUploader = ({
  onChange,
  onRemove,
  values,
}: Props) => {
  const handleUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  return (
    <div>
      <CldUploadWidget uploadPreset="e8pbrjoh" onUpload={handleUpload}>
        {({ open }) => {
          return (
            <button
              type="button"
              onClick={() => open()}
              className="flex items-center text-neutral-black font-medium px-4 py-2 bg-W100 rounded-lg hover:bg-W200"
            >
              {" "}
              <ImagePlus className="h-4 w-4 mr-2" /> Upload Images
            </button>
          );
        }}
      </CldUploadWidget>
      <div className=" mt-4 flex items-center gap-4">
        {values.map((image, index) => (
          <div
            key={index}
            className="h-16 w-16 rounded bg-W100 flex justify-center items-center relative"
          >
            <Image src={image} alt={"product-image"} width={40} height={50} />
            <button
              type="button"
              onClick={() => onRemove(image)}
              className="absolute -top-1 -right-1 w-6 h-6 bg-neutral-black flex justify-center items-center rounded-full text-white hover:text-neutral-black hover:bg-white"
            >
              <X className="w-4 h-4 " />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
