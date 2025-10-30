// SpendingBarChart.jsx
import React from "react";

// Data dummy
const data = [
  { month: "Jun", value: 5200 },
  { month: "Jul", value: 3600 },
  { month: "Aug", value: 4800 },
  { month: "Sep", value: 8250 },
  { month: "Oct", value: 4000 },
  { month: "Nov", value: 7000 },
  { month: "Dec", value: 2000 },
];

const maxValue = Math.max(...data.map((d) => d.value));

const SpendingBarChart = () => (
  <div className="w-full max-w-md mx-auto rounded-3xl bg-blue-100 p-6">
    <div className="flex justify-between items-center mb-6">
      <span className="font-semibold text-xl text-gray-900">Spending</span>
      <div className="bg-white rounded-full px-4 py-1 text-gray-700 text-sm font-medium shadow">
        Month <span className="ml-2">▼</span>
      </div>
    </div>
    <div className="flex justify-between items-end h-40 mb-2">
      {data.map((item, i) => (
        <div className="flex flex-col items-center w-8" key={i}>
          {/* Show value above September only */}
          {item.month === "Sep" && (
            <span className="mb-1 text-sm font-bold text-gray-800">
              ${item.value.toLocaleString()}
            </span>
          )}
          {/* Bar */}
          <div
            className={`rounded-full transition-all duration-300 ${
              item.month === "Sep" ? "bg-blue-300" : "bg-white"
            }`}
            style={{
              height: `${(item.value / maxValue) * 100}%`,
              width: "32px",
            }}
          />
          {/* Month label */}
          <span className="mt-2 text-xs text-gray-600">{item.month}</span>
        </div>
      ))}
    </div>
  </div>
);

export default SpendingBarChart;
