import Image from "next/image";

export const Features = () => {
  return (
    <div className="mt-[88px]  flex justify-between items-start mb-12">
      <div className="space-y-6">
        <div className="w-12 h-12 rounded-full flex justify-center items-center bg-W100">
          <Image
            src={"/Delivery.svg"}
            alt="free shipping"
            width={17}
            height={17}
          />
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold text-[16px] text-neutral-black">
            Free Shipping
          </h3>
          <p className="leading-6 text-neutral-500 ">
            Upgrade your style today and get FREE <br /> shipping on all orders!
            Don&apos;t miss out.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="w-12 h-12 rounded-full flex justify-center items-center bg-W100">
          <Image
            src={"/Delivery.svg"}
            alt="free shipping"
            width={17}
            height={17}
          />
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold text-[16px] text-neutral-black">
            Satisfaction Guarantee
          </h3>
          <p className="leading-6 text-neutral-500 ">
            Shop confidently with our Satisfaction <br /> Guarantee: Love it or
            get a refund.
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="w-12 h-12 rounded-full flex justify-center items-center bg-W100">
          <Image
            src={"/guarantee.svg"}
            alt="Satisfaction Guarantee"
            width={17}
            height={17}
          />
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold text-[16px] text-neutral-black">
            Secure Payment
          </h3>
          <p className="leading-6 text-neutral-500 ">
            Your security is our priority. Your <br /> payments are secure with
            us.
          </p>
        </div>
      </div>
    </div>
  );
};
