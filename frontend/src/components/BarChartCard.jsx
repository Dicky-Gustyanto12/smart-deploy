import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChartCard({ className }) {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Spending",
        data: [1000, 800, 950, 750, 920, 1000, 450, 670, 825, 510, 780, 220],
        backgroundColor: "#9bada0",
        borderRadius: 20,
        barPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { left: 40, right: 30, top: 24, bottom: 56 },
    },
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1000,
        ticks: {
          color: "#9bada0",
          font: { size: 12 },
          callback: (value) => value.toLocaleString(),
          maxTicksLimit: 6,
          stepSize: 200,
        },
        grid: { color: "#e2e8f0", clip: true },
      },
      x: {
        ticks: {
          color: "#9bada0",
          font: { size: 12 },
          autoSkip: false,
          maxTicksLimit: 12,
        },
        grid: { display: false, clip: true },
      },
    },
  };

  return (
    <div
      className={`rounded-3xl bg-white shadow-lg overflow-hidden flex flex-col ${className}`}
    >
      <div className="flex flex-col mb-4 w-full">
        <h2 className="font-bold text-2xl text-gray-900 mt-4 ml-6">
          Jumlah Poktan Penerima Alsintan
        </h2>
        <p className="text-gray-600 text-sm mt-2 ml-6">
          Grafik jumlah kelompok tani yang menerima bantuan setiap bulan.
        </p>
      </div>
      <div className="flex-1 w-full h-full">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
