"use client";
import { getCustomers } from "@/db/queries";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ResponsiveContainer, Line, LineChart } from "recharts";
type Order = {
  updatedAt: Date | null;
};
type Customers = {
  id: string;
  Order: Order;
};
export const CustomersChart = () => {
  const [customers, setCustomers] = useState<Customers[] | null>();
  useEffect(() => {
    const getData = async () => {
      const data = await getCustomers();
      setCustomers(data);
    };
    getData();
  }, []);

  if (!customers)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  const date = new Date();
  const dailyStatsMap = new Map();

  customers
    .filter(
      (item) =>
        item.Order.updatedAt &&
        item.Order.updatedAt.getDate() <= date.getDate() &&
        item.Order.updatedAt.getMonth() === date.getMonth() &&
        item.Order.updatedAt.getFullYear() === date.getFullYear()
    )
    .forEach((item) => {
      const day = item.Order.updatedAt!.getDate();
    });

  const totalStats = Array.from(dailyStatsMap, ([day, stats]) => ({
    day,
    ...stats,
  })).sort((a, b) => a.day - b.day); // Sort by day in ascending order

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <ResponsiveContainer width={274} height={46} className={"mt-11"}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="pv" stroke="#4078FF" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};
