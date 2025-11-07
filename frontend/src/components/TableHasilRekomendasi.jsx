import { useEffect, useState } from "react";
import axios from "axios";

// Axios instance dengan Authorization Bearer
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

export default function TableHasilRekomendasi() {
  const [penilaianAll, setPenilaianAll] = useState([]);
  const [kriteriaAll, setKriteriaAll] = useState([]);
  const [poktanMap, setPoktanMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get("/penilaian"),
      api.get("/kriteria"),
      api.get("/poktan"),
    ]).then(([penRes, kriRes, pokRes]) => {
      setPenilaianAll(penRes.data);
      setKriteriaAll(kriRes.data);
      setPoktanMap(
        Object.fromEntries((pokRes.data || []).map((p) => [p.id_poktan, p.nama_poktan]))
      );
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Bobot
  const bobotAwal = kriteriaAll.map((k) => Number(k.bobot) || 0);
  const totalBobot = bobotAwal.reduce((a, b) => a + b, 0);
  const bobotNormal = bobotAwal.map((b) => totalBobot === 0 ? 0 : b / totalBobot);

  // Kunci dan kode
  const kriteriaKeys = kriteriaAll.map((k) => k.id_kriteria);
  const kriteriaCodes = kriteriaAll.map((k, i) => k.kode || `K${i + 1}`);

  // Matriks poktan
  const matrixRows = penilaianAll.map((poktan) => ({
    kode: poktan.id_poktan,
    nama: poktanMap[poktan.id_poktan] || "-",
    nilai: kriteriaKeys.map((k) => Number(poktan.details?.[k]?.nilai ?? 0)),
  }));

  // SMART: normalisasi
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

  // Matrix hasil akhir dan ranking
  let resultMatrix = matrixNorm.map((row) => {
    const skorPerKolom = row.norm.map((val, i) => val * bobotNormal[i]);
    const total = skorPerKolom.reduce((a, b) => a + b, 0);
    return {
      kode: row.kode,
      nama: row.nama,
      skor: skorPerKolom,
      total,
    };
  });

  resultMatrix = resultMatrix
    .sort((a, b) => b.total - a.total)
    .map((row, i) => ({ ...row, rank: i + 1 }));

  return (
    <div className="w-full px-0 max-w-none mt-8">
      <h2 className="font-bold mb-4 text-xl">Hasil Rekomendasi SMART</h2>
      <div className="bg-white rounded-xl shadow-sm w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#9bada0]">
                <th className="px-6 py-3 font-semibold text-white text-center">Ranking</th>
                <th className="px-6 py-3 font-semibold text-white text-center">Kode</th>
                <th className="px-6 py-3 font-semibold text-white text-center">Nama Poktan</th>
                {kriteriaCodes.map((code, i) => (
                  <th key={i} className="px-6 py-3 font-semibold text-white text-center">
                    {code}
                  </th>
                ))}
                <th className="px-6 py-3 font-semibold text-white text-center">Total Nilai Akhir</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={3 + kriteriaKeys.length + 1}
                    className="py-6 text-gray-400 text-center"
                  >
                    Memuat...
                  </td>
                </tr>
              ) : resultMatrix.length === 0 ? (
                <tr>
                  <td
                    colSpan={3 + kriteriaKeys.length + 1}
                    className="py-6 text-gray-400 text-center"
                  >
                    Data penilaian belum tersedia.
                  </td>
                </tr>
              ) : (
                resultMatrix.map((row, idx) => (
                  <tr
                    key={row.kode}
                    className={idx % 2 === 0 ? "bg-[#f3f4f6]" : "bg-white"}
                  >
                    <td className="px-6 py-3 font-bold text-center">{row.rank}</td>
                    <td className="px-6 py-3 font-semibold text-center">{row.kode}</td>
                    <td className="px-6 py-3 text-center">{row.nama}</td>
                    {row.skor.map((val, i) => (
                      <td className="px-6 py-3 text-center" key={i}>
                        {val.toFixed(2)}
                      </td>
                    ))}
                    <td className="px-6 py-3 font-bold text-center">
                      {row.total.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
