import React, { useState } from "react";
import StatCard from "../components/StatCard";
import RankingRecommendationCard from "../components/RankingRecommendationCard";
import GrafikKecamatan from "../components/GrafikKecamatan";
import GrafikPoktan from "../components/GrafikPoktan";

export default function Dashboard() {
  const [selectedChart, setSelectedChart] = useState("kecamatan");

  return (
    <>
      {/* Status Penerimaan */}
      <div className="bg-white w-full rounded-2xl px-5 py-5 mb-5">
        <div className="text-2xl font-bold text-gray-900 mb-2">
          Status Penerimaan Alsintan
        </div>
        <div className="text-gray-600 mb-5 text-sm">
          Jumlah permintaan alsintan yang telah diterima, dalam proses, dan
          dibatalkan.
        </div>
        <div className="flex justify-center gap-5">
          <StatCard />
        </div>
      </div>

      {/* Kontainer utama */}
      <div className="flex gap-7 h-[calc(88vh-210px)]">
        {/* Kolom kiri untuk ranking */}
        <div className="w-[400px] min-w-[350px] h-full">
          <RankingRecommendationCard className="h-full" />
        </div>

        {/* Kolom kanan untuk grafik */}
        <div className="flex-1 flex flex-col gap-5 h-full min-h-0">
          {/* Card Grafik */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col h-full">
            {/* Header card */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Grafik Visualisasi Data
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  {selectedChart === "kecamatan"
                    ? "Jumlah Pengajuan per Kecamatan"
                    : "Jumlah Poktan menerima alsintan per Bulan"}
                </p>
              </div>

              {/* Dropdown pilih chart */}
              <select
                value={selectedChart}
                onChange={(e) => setSelectedChart(e.target.value)}
                className="border-2 border-gray-500 rounded px-4 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-800 min-w-[180px]"
              >
                <option value="kecamatan">Per Kecamatan</option>
                <option value="poktan">Per Bulan</option>
              </select>
            </div>

            {/* Chart */}
            <div className="flex-1 min-h-0 w-full">
              {selectedChart === "kecamatan" ? (
                <GrafikKecamatan className="w-full h-full" />
              ) : (
                <GrafikPoktan className="w-full h-full" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
