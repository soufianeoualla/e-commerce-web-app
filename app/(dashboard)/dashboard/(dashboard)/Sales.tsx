"use client";
import { formatPrice } from "@/lib/utils";
import { Loader } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, Tooltip } from "recharts";

type Sale = {
  amount: number;
  updatedAt: Date | null;
};
type Props = {
  sales: Sale[] |null | undefined;
};

export const Sales = ({ sales }: Props) => {


  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const todayDate = currentDate.getDate(); 

  const dailyStatsMap = new Map();

  sales &&
    sales
      .filter((item) => {
        const updatedAt = item.updatedAt;
        return (
          updatedAt &&
          updatedAt.getDate() <= todayDate &&
          updatedAt.getMonth() === currentMonth &&
          updatedAt.getFullYear() === currentYear
        );
      })
      .forEach((item) => {
        const day = item.updatedAt?.getDate();
        if (day !== undefined) {
          const existingEntry = dailyStatsMap.get(day);
          if (existingEntry) {
            existingEntry.amount += item.amount;
          } else {
            // Create new entry
            dailyStatsMap.set(day, {
              amount: item.amount,
            });
          }
        }
      });
  for (let day = 1; day <= currentDate.getDate(); day++) {
    if (!dailyStatsMap.has(day)) {
      dailyStatsMap.set(day, { amount: 0 });
    }
  }

  const salesData = Array.from(dailyStatsMap, ([day, stats]) => ({
    day,
    ...stats,
  })).sort((a, b) => a.day - b.day); // Sort by day in ascending order
  const totalSales = salesData?.reduce((acc,val)=>acc + val.amount,0) || 0

  return (
    <div className="total-sales h-[190px] p-6 bg-white border border-slate-200 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="space-y-1.5">
          <h5 className="text-[16px] text-neutral-black font-semibold">
            Total Sales
          </h5>
          <p className="text-xs text-neutral-500 font-medium">THIS MONTH</p>
        </div>
        <b className="text-neutral-black font-bold text-2xl">
          {formatPrice(totalSales)}
        </b>
      </div>
      {!sales ? (
        <div className="flex justify-center items-center mt-11">
          <Loader className="animate-spin  text-[#4078FF]" />
        </div>
      ) : (
        <ResponsiveContainer  height={46} className={"mt-11 w-full"}>
          <BarChart data={salesData}>
            <Tooltip content={<CustomTooltip color="text-[#4078FF]" />} />{" "}
            <Bar dataKey="amount" fill="#4078FF" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

type CustomTooltipProp = {
  active?: boolean;
  payload?: any;
  label?: string;
  color: string;
};

const CustomTooltip = ({
  active,
  payload,
  label,
  color,
}: CustomTooltipProp) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-W100 flex flex-col gap-4 rounded-md shadow">
        <p className="text-medium text-xs text-primary">Day: {label}th</p>
        <p className={`text-sm ${color} font-bold `}>
          Total:
          <span className="ml-2 ">{formatPrice(payload[0].value)}</span>
        </p>
      </div>
    );
  }
};
