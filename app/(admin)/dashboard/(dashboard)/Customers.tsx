"use client";
import { Loader } from "lucide-react";
import { ResponsiveContainer, Line, LineChart, Tooltip } from "recharts";

type Customers = {
  order: {
    updatedAt: Date | null;
  }[];
  id: string;
};
type Props = {
  customers: Customers[] | null | undefined;
};

export const Customers = ({ customers }: Props) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const todayDate = currentDate.getDate(); 
  const customerCountsByDay: Record<number, number> = {};

  for (let i = 1; i <= todayDate; i++) {
    customerCountsByDay[i] = 0;
  }

  customers &&
    customers.forEach((customer) => {
      customer.order.forEach((order) => {
        const orderDate = order.updatedAt;
        if (
          orderDate &&
          
          orderDate.getMonth() === currentMonth &&
          orderDate.getFullYear() === currentYear
        ) {
          const day = orderDate.getDate();
          customerCountsByDay[day] = (customerCountsByDay[day] || 0) + 1;
        }
      });
    });

  // Convert customerCountsByDay to the desired format
  const customerCounts = Object.entries(customerCountsByDay).map(
    ([day, count]) => ({
      day: parseInt(day), // Convert day to number
      count: count,
    })
  );
  const totalCustomers = customerCounts.reduce(
    (acc, val) => acc + val.count,
    0
  );

  return (
    <div className="customers h-[190px] p-6 bg-white border border-slate-200 rounded-md">
      <div className="flex justify-between items-center">
        <div className="space-y-1.5">
          <h5 className="text-[16px] text-neutral-black font-semibold">
            Customers
          </h5>
          <p className="text-xs text-neutral-500 font-medium">THIS MONTH</p>
        </div>
        <b className="text-neutral-black font-bold text-2xl">
          {totalCustomers}
        </b>
      </div>
      {!customers ? (
        <div className="flex justify-center items-center mt-11">
          <Loader className="animate-spin  text-[#4078FF]" />
        </div>
      ) : (
        <ResponsiveContainer width={274} height={46} className={"mt-11"}>
          <LineChart data={customerCounts}>
            <Tooltip content={<CustomTooltip color="text-[#4078FF]" />} />{" "}
            <Line
              type="monotone"
              dataKey="count"
              stroke="#4078FF"
              strokeWidth={2}
            />
          </LineChart>
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
          <span className="ml-2 ">{payload[0].value}</span>
        </p>
      </div>
    );
  }
};
