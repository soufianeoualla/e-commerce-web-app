import { LinkButton } from "@/components/store/LinkButton";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="h-[440px] w-full  bg-W100 overflow-hidden sm:h-[500px] sm:p-4">
      <div className="max-w-[1116px] mx-auto flex justify-between items-center sm:flex-col-reverse ">
        <div className="translate-y-12 sm:translate-y-10">
          <h1 className="text-3xl font-semibold text-neutral-black mb-3">
            Fresh Arrivals Online
          </h1>
          <p className="text-neutral-500 text-sm mb-12 sm:mb-8">
            Discover Our Newest Collection Today.
          </p>

          <LinkButton href="/search" label="View Collection" />
        </div>
        <div className="relative translate-y-[89px] sm:translate-y-0   ">
          <div className="w-[340px] h-[340px] rounded-full bg-W200 sm:w-[240px] sm:h-[240px]   " />
          <Image
            src={"/Hero.svg"}
            alt="man"
            height={382}
            width={255}
            className="absolute right-0 -top-6 sm:top-0 sm:w-[200px] sm:h-[240px]  sm:overflow-hidden "
          />
          <Image
            src={"/Burst-pucker.svg"}
            alt="star"
            height={38}
            width={38}
            className="absolute top-0 left-0 "
          />
        </div>
      </div>
    </section>
  );
};
