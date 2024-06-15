"use client";

import { formatPrice } from "@/lib/utils";
import { Loader } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

type OrderItems = {
  product: {
    price: number;
    title: string;
  };
  productId: string;
  quantity: number;
};

type Props = {
  orderItems: OrderItems[] | null | undefined;
};

export const BestSelling = ({ orderItems }: Props) => {
  type BestSelling = {
    prodcutId: string;
    totalsales: number;
    title: string;
  };
  const bestSelling: BestSelling[] = [];

  orderItems &&
    orderItems.forEach((item) => {
      if (bestSelling.some((c) => c.prodcutId === item.productId)) {
        const index = bestSelling.findIndex(
          (c) => c.prodcutId === item.productId
        );
        return (bestSelling[index].totalsales += item.product.price);
      } else {
        const orderItem = {
          prodcutId: item.productId,
          totalsales: item.product.price,
          title: item.product.title,
        };
        return bestSelling.push(orderItem);
      }
    });

  const data = bestSelling
    .sort((a, b) => b.totalsales - a.totalsales)
    .slice(0, 3);

  const totalSales = data.reduce((acc, val) => acc + val.totalsales, 0);

  const COLORS = ["#4078FF", "#A8B2FF", "#728FFF"];
  return (
    <div className="bg-white border border-slate-200 rounded-lg mb-10">
      <div className="space-y-1.5 p-8">
        <h5 className="text-[16px] text-neutral-black font-semibold">
          Best Selling
        </h5>
        <p className="text-xs text-neutral-500 font-medium">THIS MONTH</p>
      </div>

      <div className="pt-8 border-t border-slate-200 h-[475px] ">
        <div className="flex items-center gap-x-2 text-neutral-500 font-medium px-8">
          <h1 className="text-neutral-black font-bold text-2xl">
            {formatPrice(totalSales)}
          </h1>
          <span>—</span>
          <span>Total Sales</span>
        </div>

        <div className="space-y-2 my-7 px-8">
          {data.map((item) => (
            <div
              key={item.prodcutId}
              className="text-neutral-500 font-medium text-xs py-0.5 px-2 rounded-2xl border border-slate-200"
            >
              {item.title} —
              <span className="text-neutral-black">
                {formatPrice(item.totalsales)} Sales
              </span>{" "}
            </div>
          ))}
        </div>

        {!orderItems ? (
          <div className="flex justify-center items-center mt-11">
            <Loader className="animate-spin  text-[#4078FF]" />
          </div>
        ) : (
          <PieChart width={325} height={220}>
            <Tooltip content={<CustomTooltip color="text-[#4078FF]" />} />{" "}
            <Pie
              data={data}
              cx={150}
              cy={100}
              innerRadius={65}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="totalsales"
            >
              {bestSelling.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        )}
      </div>
    </div>
  );
};

type CustomTooltipProp = {
  active?: boolean;
  payload?: any;
  color: string;
};

const CustomTooltip = ({ active, payload, color }: CustomTooltipProp) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-W100 flex flex-col gap-4 rounded-md shadow">
        <p className={`text-sm ${color} font-bold `}>
          Sales:
          <span className="ml-2 ">{payload[0].value}</span>
        </p>
      </div>
    );
  }
};
