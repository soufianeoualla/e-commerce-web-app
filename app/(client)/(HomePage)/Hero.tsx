import { LinkButton } from "@/components/store/LinkButton";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="h-[440px] w-full  bg-W100 overflow-hidden">
      <div className="max-w-[1116px] mx-auto flex justify-between items-center">
        <div className="translate-y-12">
          <h1 className="text-3xl font-semibold text-neutral-black mb-3">
            Fresh Arrivals Online
          </h1>
          <p className="text-neutral-500 text-sm mb-12">
            Discover Our Newest Collection Today.
          </p>

          <LinkButton href="/search" label="View Collection" />
        </div>
        <div className="relative translate-y-[89px] ">
          <div className="w-[340px] h-[340px] rounded-full bg-W200" />
          <Image
            src={"/Hero.svg"}
            alt="man"
            height={382}
            width={255}
            className="absolute right-0 -top-6 "
          />
          <Image
            src={"/Burst-pucker.svg"}
            alt="star"
            height={38}
            width={38}
            className="absolute top-0 left-0"
          />
        </div>
      </div>
    </section>
  );
};
