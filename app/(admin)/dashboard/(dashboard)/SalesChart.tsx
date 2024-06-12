"use client";
import { getAllSales } from "@/db/queries";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, ResponsiveContainer } from "recharts";
type Sale = {
  amount: number;
  updatedAt?: Date | null;
};
export const SalesChart = () => {
  const [sales, setSales] = useState<Sale[] | null>();
  useEffect(() => {
    const getData = async () => {
      const data = await getAllSales();
      setSales(data);
    };
    getData();
  }, []);

  if (!sales)
    return (
      <div className="flex justify-center items-center w-[274px] h-[46px]">
        <Loader className="animate-spin" />
      </div>
    );
    
  const date = new Date();
  const dailyStatsMap = new Map();

  sales
    .filter(
      (item) =>
        item.updatedAt &&
        item.updatedAt.getDate() <= date.getDate() &&
        item.updatedAt.getMonth() === date.getMonth() &&
        item.updatedAt.getFullYear() === date.getFullYear()
    )
    .forEach((item) => {
      const day = item.updatedAt!.getDate();
      const existingEntry = dailyStatsMap.get(day);
      if (existingEntry) {
        existingEntry.amount += item.amount;
      } else {
        // Create new entry
        dailyStatsMap.set(day, {
          amount: item.amount,
        });
      }
    });

  const totalStats = Array.from(dailyStatsMap, ([day, stats]) => ({
    day,
    ...stats,
  })).sort((a, b) => a.day - b.day); // Sort by day in ascending order


  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <ResponsiveContainer width={274} height={46} className={'mt-11'}>
      <BarChart  data={data}>
        <Bar dataKey="uv" fill="#4078FF" />
      </BarChart>
    </ResponsiveContainer>
  );
};
