import { LinkButton } from "@/components/store/LinkButton";
import Image from "next/image";

export const Banner = () => {
  return (
    <div
      className="bg-W100 mt-40  mb-36 pb-6 sm:px-4"
    >
      <div className="max-w-[1116px] mx-auto flex justify-between items-center sm:flex-col-reverse">
        <div className="space-y-8 ">
          <div className="space-y-6">
            <h1 className="text-neutral-black font-bold text-2xl">
              Browse Our Fashion Paradise!
            </h1>
            <p className="leading-6 text-neutral-500">
              Step into a world of style and explore our diverse collection of{" "}
              <br />
              clothing categories.
            </p>
          </div>
          <LinkButton href="/" label="Start Browsing" />
        </div>

        <div>
          <Image
            src={"/BannerImage.png"}
            alt="banner image"
            width={225}
            height={311}
          />
        </div>
      </div>
    </div>
  );
};
