"use client";
import { PieChart, Pie, Cell } from "recharts";

export const BestSellingChart = () => {
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
  ];
  const COLORS = ["#4078FF", "#A8B2FF", "#728FFF"];
  return (
    <PieChart width={325} height={220}>
    <Pie
      data={data}
      cx={150}
      cy={100}
      innerRadius={65}
      outerRadius={80}
      fill="#8884d8"
      paddingAngle={2}
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
  </PieChart>
  );
};
