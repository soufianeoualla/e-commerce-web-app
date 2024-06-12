import { Suspense } from "react";
import { BestSellingChart } from "./BestSellingChart";
import { CustomersChart } from "./CustomersChart";
import { SalesChart } from "./SalesChart";

export const Dashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-[repeat(3,minmax(200px,1fr))] gap-x-10">
        <div className="total-sales h-[190px] p-6 bg-white border border-slate-200 rounded-lg">
          <div className="flex justify-between items-center">
            <div className="space-y-1.5">
              <h5 className="text-[16px] text-neutral-black font-semibold">
                Total Sales
              </h5>
              <p className="text-xs text-neutral-500 font-medium">THIS MONTH</p>
            </div>
            <b className="text-neutral-black font-bold text-2xl">$4,235</b>
          </div>

          <SalesChart />
        </div>
        <div className="customers h-[190px] p-6 bg-white border border-slate-200 rounded-md">
          <div className="flex justify-between items-center">
            <div className="space-y-1.5">
              <h5 className="text-[16px] text-neutral-black font-semibold">
                Customers
              </h5>
              <p className="text-xs text-neutral-500 font-medium">THIS MONTH</p>
            </div>
            <b className="text-neutral-black font-bold text-2xl">2235</b>
          </div>
          <CustomersChart />
        </div>
        <div className="orders h-[190px] p-6 bg-white border border-slate-200 rounded-md">
          <div className="flex justify-between items-center mb-14">
            <div className="space-y-1.5">
              <h5 className="text-[16px] text-neutral-black font-semibold">
                Orders
              </h5>
              <p className="text-xs text-neutral-500 font-medium">
                Monthly GOALS : 1,000
              </p>
            </div>
            <b className="text-neutral-black font-bold text-2xl">724</b>
          </div>

          <span className="text-xs font-medium text-neutral-500">266 Left</span>
          <div className="w-full h-2 rounded-xl bg-W100 mb-2">
            <div className="bg-[#4078FF] w-[72.4%] h-full rounded-xl" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[328px,1fr] gap-x-10 mt-10">
        <div className="bg-white border border-slate-200 rounded-lg mb-10">
          <div className="space-y-1.5 p-8">
            <h5 className="text-[16px] text-neutral-black font-semibold">
              Best Selling
            </h5>
            <p className="text-xs text-neutral-500 font-medium">THIS MONTH</p>
          </div>

          <div className="pt-8 border-t border-slate-200">
            <div className="flex items-center gap-x-2 text-neutral-500 font-medium px-8">
              <h1 className="text-neutral-black font-bold text-2xl">$2,400</h1>
              <span>—</span>
              <span>Total Sales</span>
            </div>

            <div className="space-y-2 my-7 px-8">
              <div className="text-neutral-500 font-medium text-xs py-0.5 px-2 rounded-2xl border border-slate-200">
                Classic Monochrome Tees —
                <span className="text-neutral-black">$940 Sales</span>{" "}
              </div>
              <div className="text-neutral-500 font-medium text-xs py-0.5 px-2 rounded-2xl border border-slate-200">
                Classic Monochrome Tees —
                <span className="text-neutral-black">$940 Sales</span>{" "}
              </div>
              <div className="text-neutral-500 font-medium text-xs py-0.5 px-2 rounded-2xl border border-slate-200">
                Classic Monochrome Tees —
                <span className="text-neutral-black">$940 Sales</span>{" "}
              </div>
            </div>
            
              <BestSellingChart />
            
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg mb-10 ">
          <div className=" flex items-center gap-x-4 mb-5 p-8">
            <h5 className="text-[16px] text-neutral-black font-semibold">
              Recent Orders
            </h5>
            <button className="bg-W100 text-neutral-500 font-medium text-xs rounded-2xl px-3 py-1 hover:bg-neutral-black  hover:text-white">
              View All
            </button>
          </div>

          {/* <table className="w-full mb-5  ">
      <tbody>
        <tr className="border border-slate-200">
          {tableHead.map((item, index) => (
            <th key={index}> {item}</th>
          ))}
        </tr>
        {tableRow.map((item, index) => (
          <tr key={index}>
            {item.image && (
              <td>
                {" "}
                <div className="h-12 w-12 rounded bg-W100 flex justify-center items-center">
                  <Image
                    src={item.image[0].imageSrc}
                    alt={item.item}
                    width={32}
                    height={46}
                  />
                </div>
              </td>
            )}
            <td>{item.item}</td>
            <td>{item.date || item.sku}</td>
            <td>${item.price}</td>
            <td>{item.status}</td>
            <td>{item.categories}</td>
            {action && <td>....</td>}
          </tr>
        ))}
      </tbody>
    </table> */}
        </div>
      </div>
    </div>
  );
};
