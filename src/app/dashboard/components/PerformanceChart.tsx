// PerformanceVisualization.tsx
"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockData = [
  { month: "Jan", aum: 50000, contribution: 5000 },
  { month: "Feb", aum: 52000, contribution: 4000 },
  { month: "Mar", aum: 54000, contribution: 4500 },
  { month: "Apr", aum: 56000, contribution: 5000 },
  { month: "May", aum: 58000, contribution: 6000 },
  { month: "Jun", aum: 61000, contribution: 5500 },
];

const PerformanceChart = () => {
  const [timeframe, setTimeframe] = useState<"6M" | "1Y" | "3Y">("6M");

  const totalPortfolioValue = mockData[mockData.length - 1].aum;
  const todaysGainLoss =
    mockData[mockData.length - 1].aum - mockData[mockData.length - 2].aum;

  return (
    <div className="bg-base-secondary dark:bg-base rounded-2xl shadow-lg p-6 w-full">
      {/* Summary Metrics */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-6 mb-6">
        <div className="flex flex-col">
          <span className="text-caption text-text-secondary dark:text-text-secondary mb-1">
            Total Portfolio Value
          </span>
          <span className="text-h2 font-bold text-text-primary dark:text-text-primary">
            ${totalPortfolioValue.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-caption text-text-secondary dark:text-text-secondary mb-1">
            Today&apos;s Gain / Loss
          </span>
          <span
            className={`text-h2 font-bold ${
              todaysGainLoss >= 0 ? "text-success" : "text-error"
            }`}
          >
            {todaysGainLoss >= 0 ? "+" : "-"}$
            {Math.abs(todaysGainLoss).toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {(["6M", "1Y", "3Y"] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                timeframe === tf
                  ? "bg-primary text-base border-primary"
                  : "bg-base text-text-secondary border-stroke hover:bg-base-secondary dark:hover:bg-base"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total AUM Line Chart */}
        <div className="w-full h-64 sm:h-72 lg:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid stroke="rgb(var(--color-stroke))" strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tick={{ fill: "rgb(var(--color-title-h2))", fontSize: "0.875rem" }}
              />
              <YAxis
                tick={{ fill: "rgb(var(--color-title-h2))", fontSize: "0.875rem" }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "rgb(var(--color-base))" }}
                itemStyle={{ color: "rgb(var(--color-title-h1))" }}
              />
              <Line
                type="monotone"
                dataKey="aum"
                stroke="rgb(var(--color-brand-primary))"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Contributions Bar Chart */}
        <div className="w-full h-64 sm:h-72 lg:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <CartesianGrid stroke="rgb(var(--color-stroke))" strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tick={{ fill: "rgb(var(--color-title-h2))", fontSize: "0.875rem" }}
              />
              <YAxis
                tick={{ fill: "rgb(var(--color-title-h2))", fontSize: "0.875rem" }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "rgb(var(--color-base))" }}
                itemStyle={{ color: "rgb(var(--color-title-h1))" }}
              />
              <Bar dataKey="contribution" fill="rgb(var(--color-success))" barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
