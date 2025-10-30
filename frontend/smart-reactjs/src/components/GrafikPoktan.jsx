import React, { useEffect, useState } from "react";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const monthLabels = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
];

export default function BarChartKelompokTani({ className }) {
  const [monthlyCounts, setMonthlyCounts] = useState(Array(12).fill(0));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://api.alsindata.id/api/pengajuan");
        if (!res.ok) throw new Error("Gagal mengambil data pengajuan");
        const pengajuanAll = await res.json();

        // Filter pengajuan dengan status Diterima atau Selesai
        const pengajuanValid = pengajuanAll.filter(p =>
          ["Diterima", "Selesai"].includes(p.status)
        );

        // Hitung jumlah per bulan berdasarkan created_at
        const monthCount = Array(12).fill(0);
        pengajuanValid.forEach(p => {
          const dt = p.created_at;
          if (dt) {
            const monthIdx = new Date(dt).getMonth();
            if (monthIdx >= 0 && monthIdx < 12) monthCount[monthIdx]++;
          }
        });

        setMonthlyCounts(monthCount);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data grafik");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: monthLabels,
    datasets: [
      {
        label: "Jumlah Kelompok Tani Penerima Bantuan",
        data: monthlyCounts,
        backgroundColor: "#9bada0",
        borderRadius: 10,
        barPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: { left: 40, right: 30, top: 24, bottom: 56 } },
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} kelompok`, // angka utuh
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#64748b",
          font: { size: 12 },
          callback: function(value) {
            return Number(value); // pastikan angka utuh, tanpa koma
          },
        },
        grid: { color: "#e2e8f0", clip: true },
      },
      x: {
        ticks: {
          color: "#64748b",
          font: { size: 12 },
          autoSkip: false,
        },
        grid: { display: false, clip: true },
      },
    },
  };

  return (
    <div className={`rounded-3xl bg-white shadow-lg overflow-hidden flex flex-col ${className}`}>
      <div className="flex flex-col mb-4 w-full">
        <h2 className="font-bold text-2xl text-gray-900 mt-4 ml-6">
          Grafik Poktan Penerima Alsintan
        </h2>
        <p className="text-gray-600 text-sm mt-2 ml-6">
          Jumlah kelompok tani yang menerima bantuan setiap bulan.
        </p>
      </div>
      <div className="flex-1 w-full h-full p-4">
        {loading ? (
          <div className="py-20 text-center text-gray-400">Memuat grafik...</div>
        ) : error ? (
          <div className="py-20 text-center text-red-500">{error}</div>
        ) : (
          <Bar options={options} data={data} />
        )}
      </div>
    </div>
  );
}
