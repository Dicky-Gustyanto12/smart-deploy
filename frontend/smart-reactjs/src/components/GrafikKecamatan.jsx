// GrafikJumlahPengajuanPerKecamatanFinal.jsx
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

export default function GrafikJumlahPengajuanPerKecamatanFinal({ className }) {
  const [labels, setLabels] = useState([]);
  const [dataCounts, setDataCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [poktanRes, pengajuanRes] = await Promise.all([
          fetch("https://api.alsindata.id/api/poktan"),
          fetch("https://api.alsindata.id/api/pengajuan"),
        ]);

        if (!poktanRes.ok || !pengajuanRes.ok) {
          throw new Error("Gagal memuat data API");
        }

        const [poktanAll, pengajuanAll] = await Promise.all([
          poktanRes.json(),
          pengajuanRes.json(),
        ]);

        // Filter pengajuan Diterima/Selesai
        const pengajuanValid = pengajuanAll.filter(p =>
          ["Diterima", "Selesai"].includes(p.status)
        );

        // Hitung jumlah pengajuan per kecamatan
        const kecamatanMap = {};
        pengajuanValid.forEach(pengajuan => {
          const poktan = poktanAll.find(
            p => String(p.id_poktan) === String(pengajuan.id_poktan)
          );

          if (!poktan) return; // skip jika poktan tidak ditemukan

          const kecamatan = poktan.kecamatan;
          if (!kecamatanMap[kecamatan]) kecamatanMap[kecamatan] = 0;
          kecamatanMap[kecamatan]++;
        });

        const kecamatanArr = Object.keys(kecamatanMap).sort();
        const counts = kecamatanArr.map(k => kecamatanMap[k]);

        setLabels(kecamatanArr);
        setDataCounts(counts);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data grafik. Periksa console untuk detail.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Jumlah Pengajuan",
        data: dataCounts,
        backgroundColor: "#9bada0",
        borderRadius: 8,
        barThickness: 28,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Grafik Jumlah Pengajuan Alsintan per Kecamatan",
      },
      tooltip: {
        callbacks: {
          label: ctx => `${labels[ctx.dataIndex]}: ${ctx.parsed.y} pengajuan`,
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Kecamatan" },
        ticks: { autoSkip: false, font: { size: 11 } },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Jumlah Pengajuan" },
        min: 0,
        max: Math.max(0, ...dataCounts) + 2,
        ticks: {
          callback: function(value) {
            return value; // tampilkan angka tanpa koma
          },
        },
        grid: { color: "#e2e8f0" },
      },
    },
  };

  return (
    <div className={`rounded-3xl bg-white shadow-lg flex flex-col p-4 w-full ${className}`}>
      <h2 className="font-bold text-xl text-gray-900 ml-2">
        Grafik Jumlah Pengajuan Alsintan tiap Kecamatan
      </h2>
      <p className="text-gray-600 text-sm mt-2 ml-2 mb-2">
        Jumlah pengajuan alsintan tiap kecamatan.
      </p>
      <div style={{ width: "100%", height: "420px" }}>
        {loading ? (
          <div className="py-20 text-center text-gray-400">Memuat grafik...</div>
        ) : error ? (
          <div className="py-20 text-center text-red-500">{error}</div>
        ) : labels.length === 0 ? (
          <div className="py-20 text-center text-gray-400">
            Tidak ada data pengajuan untuk ditampilkan.
          </div>
        ) : (
          <Bar data={data} options={options} />
        )}
      </div>
    </div>
  );
}
