"use client";

import React, { useState, useMemo } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Timeframe = "6M" | "1Y" | "3Y";

const dataSets: Record<
  Timeframe,
  { month: string; aum: number; contribution: number }[]
> = {
  "6M": [
    { month: "Jan", aum: 50000, contribution: 5000 },
    { month: "Feb", aum: 52000, contribution: 4000 },
    { month: "Mar", aum: 54000, contribution: 4500 },
    { month: "Apr", aum: 56000, contribution: 5000 },
    { month: "May", aum: 58000, contribution: 6000 },
    { month: "Jun", aum: 61000, contribution: 5500 },
  ],
  "1Y": [
    { month: "Jul", aum: 45000, contribution: 4800 },
    { month: "Aug", aum: 47000, contribution: 4000 },
    { month: "Sep", aum: 49000, contribution: 4200 },
    { month: "Oct", aum: 51000, contribution: 4500 },
    { month: "Nov", aum: 53000, contribution: 4700 },
    { month: "Dec", aum: 55000, contribution: 4900 },
    { month: "Jan", aum: 57000, contribution: 5200 },
    { month: "Feb", aum: 59000, contribution: 5000 },
    { month: "Mar", aum: 61000, contribution: 5600 },
    { month: "Apr", aum: 63000, contribution: 5800 },
    { month: "May", aum: 65000, contribution: 6000 },
    { month: "Jun", aum: 67000, contribution: 6200 },
  ],
  "3Y": [
    { month: "2022", aum: 30000, contribution: 3000 },
    { month: "2023", aum: 42000, contribution: 4000 },
    { month: "2024", aum: 54000, contribution: 5000 },
    { month: "2025", aum: 67000, contribution: 6000 },
  ],
};

const PerformanceChart = () => {
  const [timeframe, setTimeframe] = useState<Timeframe>("6M");

  const chartData = useMemo(() => dataSets[timeframe], [timeframe]);
  const totalPortfolioValue = chartData[chartData.length - 1].aum;
  const todaysGainLoss =
    chartData[chartData.length - 1].aum - chartData[chartData.length - 2].aum;

  return (
    <div className="bg-base-secondary dark:bg-base rounded-2xl shadow-lg p-2 md:p-6 w-full transition-all duration-300">
    
      <div className="flex flex-col sm:flex-row sm:justify-between gap-6 mb-6">
     
        <div className="flex flex-col">
          <span className="text-caption text-text-secondary dark:text-text-secondary mb-1">
            Total Portfolio Value
          </span>
          <span className="text-h2 font-bold text-text-primary dark:text-text-primary">
            ₹{totalPortfolioValue.toLocaleString()}
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
            {todaysGainLoss >= 0 ? "+" : "-"}₹
            {Math.abs(todaysGainLoss).toLocaleString()}
          </span>
        </div>

       
        <div className="flex items-center gap-2">
          {(["6M", "1Y", "3Y"] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                timeframe == tf
                  ? "bg-primary text-base border-primary shadow-sm scale-110"
                  : "bg-base text-text-secondary border-stroke hover:bg-base-secondary dark:hover:bg-base"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

     
      <div className="w-full h-64 sm:h-72 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              stroke="rgb(var(--color-stroke))"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="month"
              tick={{
                fill: "rgb(var(--color-title-h2))",
                fontSize: "0.875rem",
              }}
            />
            <YAxis
              yAxisId="left"
              tick={{
                fill: "rgb(var(--color-title-h2))",
                fontSize: "0.875rem",
              }}
              stroke="rgb(var(--color-success))"
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{
                fill: "rgb(var(--color-title-h2))",
                fontSize: "0.875rem",
              }}
              stroke="rgb(var(--color-brand-primary))"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgb(var(--color-base))",
                borderRadius: "0.5rem",
                border: "1px solid rgb(var(--color-stroke))",
              }}
              itemStyle={{ color: "rgb(var(--color-title-h1))" }}
            />
            <Legend
              wrapperStyle={{ fontSize: "0.875rem", paddingTop: "1rem" }}
            />

        
            <Bar
              yAxisId="left"
              dataKey="contribution"
              barSize={20}
              fill="rgb(var(--color-success))"
              radius={[4, 4, 0, 0]}
              name="Monthly Contribution"
            />

       
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="aum"
              stroke="rgb(var(--color-brand-primary))"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
              name="Total AUM"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
