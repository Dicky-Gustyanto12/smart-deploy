import { useEffect, useState } from "react";
import axios from "axios";

function TableSkeleton({ rows = 5, columns = 5 }) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, idx) => (
        <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
          {Array.from({ length: columns }).map((_, col) => (
            <td key={col} className="py-2 px-4">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default function TableSkor() {
  const [penilaianAll, setPenilaianAll] = useState([]);
  const [kriteriaAll, setKriteriaAll] = useState([]);
  const [poktanMap, setPoktanMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get("http://localhost:8000/api/penilaian", {
        headers: { Accept: "application/json" }
      }),
      axios.get("http://localhost:8000/api/kriteria", {
        headers: { Accept: "application/json" }
      }),
      axios.get("http://localhost:8000/api/poktan", {
        headers: { Accept: "application/json" }
      }),
    ])
      .then(([penRes, kriRes, pokRes]) => {
        setPenilaianAll(penRes.data);
        setKriteriaAll(kriRes.data);
        setPoktanMap(
          Object.fromEntries(pokRes.data.map((p) => [p.id_poktan, p.nama_poktan]))
        );
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const bobotAwal = kriteriaAll.map((k) => Number(k.bobot) || 0);
  const totalBobot = bobotAwal.reduce((a, b) => a + b, 0);
  const bobotNormal = bobotAwal.map((b) =>
    totalBobot === 0 ? 0 : b / totalBobot
  );

  const kriteriaKeys = kriteriaAll.map((k) => k.id_kriteria);
  const kriteriaCodes = kriteriaAll.map((k, i) => k.kode || `K${i + 1}`);

  const matrixRows = penilaianAll.map((poktan) => ({
    kode: poktan.id_poktan,
    nama: poktanMap[poktan.id_poktan] || "-",
    nilai: kriteriaKeys.map((k) => poktan.details?.[k]?.nilai ?? 0),
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

  const resultMatrix = matrixNorm.map((row) => {
    const skorPerKolom = row.norm.map((val, i) => val * bobotNormal[i]);
    const total = skorPerKolom.reduce((a, b) => a + b, 0);
    return {
      kode: row.kode,
      nama: row.nama,
      skor: skorPerKolom,
      total,
    };
  });

  return (
    <div className="p-4 w-full max-w-6xl mx-auto">
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        Nilai Akhir Metode SMART
      </h2>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-200 text-gray-700 uppercase">
            <tr>
              <th className="py-3 px-4">Kode</th>
              <th className="py-3 px-4">Nama Poktan</th>
              {kriteriaCodes.map((code, i) => (
                <th key={i} className="py-3 px-4">
                  {code}
                </th>
              ))}
              <th className="py-3 px-4">Total Nilai Akhir</th>
            </tr>
          </thead>
          {loading ? (
            <TableSkeleton rows={6} columns={2 + kriteriaKeys.length + 1} />
          ) : (
            <tbody>
              {resultMatrix.map((row, idx) => (
                <tr
                  key={row.kode}
                  className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-2 px-4 font-semibold">{row.kode}</td>
                  <td className="py-2 px-4">{row.nama}</td>
                  {row.skor.map((val, i) => (
                    <td key={i} className="py-2 px-4">
                      {val.toFixed(2)}
                    </td>
                  ))}
                  <td className="py-2 px-4 font-bold">
                    {row.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
