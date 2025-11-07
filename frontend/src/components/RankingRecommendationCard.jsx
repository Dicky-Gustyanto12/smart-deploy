import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import ContentLoader from "react-content-loader";

// Axios instance JWT/Bearer
const api = axios.create({
  baseURL: "https://apiv2.alsindata.id/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const RankingRecommendationCard = ({ className }) => {
  const [resultMatrix, setResultMatrix] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get("/penilaian"),
      api.get("/kriteria"),
      api.get("/poktan"),
    ]).then(([penRes, kriRes, pokRes]) => {
      const penilaianAll = penRes.data || [];
      const kriteriaAll = kriRes.data || [];
      const poktanAll = pokRes.data || [];
      const poktanMap = Object.fromEntries(
        poktanAll.map((p) => [p.id_poktan, p.nama_poktan])
      );

      // Bobot dinamis dari field kriteria
      const bobotAwal = kriteriaAll.map((k) => Number(k.bobot) || 0);
      const totalBobot = bobotAwal.reduce((a, b) => a + b, 0);
      const bobotNormal = bobotAwal.map((b) =>
        totalBobot === 0 ? 0 : b / totalBobot
      );
      const kriteriaKeys = kriteriaAll.map((k) => k.id_kriteria);

      const matrixRows = penilaianAll.map((poktan) => ({
        kode: poktan.id_poktan,
        nama: poktanMap[poktan.id_poktan] || "-",
        nilai: kriteriaKeys.map((k) =>
          Number(poktan.details?.[k]?.nilai ?? 0)
        ),
      }));

      const cmin = kriteriaKeys.map((_, i) =>
        matrixRows.length === 0
          ? 0
          : Math.min(...matrixRows.map((row) => row.nilai[i]))
      );
      const cmax = kriteriaKeys.map((_, i) =>
        matrixRows.length === 0
          ? 0
          : Math.max(...matrixRows.map((row) => row.nilai[i]))
      );
      const cmaxmin = kriteriaKeys.map((_, i) => cmax[i] - cmin[i]);

      const matrixNorm = matrixRows.map((row) => ({
        kode: row.kode,
        nama: row.nama,
        norm: row.nilai.map((v, i) =>
          cmaxmin[i] === 0 ? 0 : (v - cmin[i]) / cmaxmin[i]
        ),
      }));

      const results = matrixNorm.map((row) => {
        const skorPerKolom = row.norm.map((val, i) => val * bobotNormal[i]);
        const total = skorPerKolom.reduce((a, b) => a + b, 0);
        return {
          kode: row.kode,
          nama: row.nama,
          total,
        };
      });

      results.sort((a, b) => b.total - a.total);

      setResultMatrix(results);
      setLoading(false);
    }).catch(() => {
      setResultMatrix([]);
      setLoading(false);
    });
  }, []);

  // Skeleton loader
  const SkeletonItem = () => (
    <ContentLoader
      speed={2}
      width="100%"
      height={60}
      backgroundColor="#e2e8f0"
      foregroundColor="#cbd5e1"
      className="rounded-lg"
    >
      <rect x="0" y="12" rx="8" ry="8" width="40" height="36" />
      <rect x="50" y="12" rx="8" ry="8" width="200" height="12" />
      <rect x="50" y="32" rx="6" ry="6" width="120" height="10" />
    </ContentLoader>
  );

  return (
    <div className={`max-w-full rounded-3xl bg-white shadow-lg p-6 py-5 flex flex-col ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-2xl text-[#2c342f]">
          Ranking Kelompok Tani
        </span>
      </div>
      <span className="text-sm text-gray-500">
        Urutan ranking berdasarkan algoritma SMART.
      </span>
      <div className="space-y-3 mt-5 flex-1 overflow-auto">
        {loading
          ? Array(5)
              .fill(0)
              .map((_, i) => <SkeletonItem key={i} />)
          : resultMatrix.length === 0 ? (
              <div className="py-10 text-center text-gray-400">Belum ada data penilaian.</div>
            ) : (
              resultMatrix.map((item, index) => (
                <div
                  key={item.kode}
                  className={`flex items-center gap-3 p-3 rounded-lg shadow transition-transform transform hover:scale-105 duration-300 ${
                    index === 0 ? "bg-[#9bada0] shadow" : "bg-[#b2b2b2]"
                  }`}
                >
                  <span className="font-extrabold text-3xl min-w-[32px] text-center text-white animate-pulse">
                    {index + 1}
                  </span>
                  <UserGroupIcon className="w-10 h-10 rounded-full bg-white p-2 text-gray-600" />
                  <div>
                    <div className="font-bold text-white text-shadow-xl">
                      {item.nama}
                    </div>
                    <div className="text-xs text-gray-100">{item.kode}</div>
                    {index === 0 && (
                      <div className="text-xs text-white font-semibold">
                        Sangat Direkomendasikan
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
      </div>
    </div>
  );
};

export default RankingRecommendationCard;
