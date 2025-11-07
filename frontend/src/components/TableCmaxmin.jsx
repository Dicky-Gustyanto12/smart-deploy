import { useEffect, useState } from "react";
import axios from "axios";
import TableSkeleton from "./TableSkleton";


export default function TableCmaxmin({ onResult }) {
  const [penilaianAll, setPenilaianAll] = useState([]);
  const [kriteriaAll, setKriteriaAll] = useState([]);
  const [poktanMap, setPoktanMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get("http://localhost:8000/api/penilaian", { headers: { Accept: "application/json" } }),
      axios.get("http://localhost:8000/api/kriteria", { headers: { Accept: "application/json" } }),
      axios.get("http://localhost:8000/api/poktan", { headers: { Accept: "application/json" } }),
    ])
      .then(([penRes, kriRes, pokRes]) => {
        setPenilaianAll(penRes.data || []);
        setKriteriaAll(kriRes.data || []);
        setPoktanMap(Object.fromEntries((pokRes.data || []).map((p) => [p.id_poktan, p.nama_poktan])));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const kriteriaKeys = kriteriaAll.map((k) => k.id_kriteria);
  const kriteriaCodes = kriteriaAll.map((k, i) => k.kode || `K${i + 1}`);

  // Mapping matrix, handle penilaian kosong/null
  const matrixRows = Array.isArray(penilaianAll) && penilaianAll.length > 0
    ? penilaianAll.map((poktan) => ({
        kode: poktan.id_poktan,
        nama: poktanMap[poktan.id_poktan] || "-",
        nilai: kriteriaKeys.map((k) =>
          poktan.details?.[k]?.nilai !== undefined &&
          poktan.details[k] !== null
            ? poktan.details[k].nilai
            : null
        ),
      }))
    : [];

  // Perhitungan summary
  const cmin = kriteriaKeys.map((_, i) => {
    const vals = matrixRows.map((row) => row.nilai[i]).filter(v => v !== null && v !== undefined && v !== "");
    return vals.length > 0 ? Math.min(...vals) : null;
  });

  const cmax = kriteriaKeys.map((_, i) => {
    const vals = matrixRows.map((row) => row.nilai[i]).filter(v => v !== null && v !== undefined && v !== "");
    return vals.length > 0 ? Math.max(...vals) : null;
  });

  const cmaxmin = kriteriaKeys.map((_, i) =>
    cmin[i] !== null && cmax[i] !== null ? cmax[i] - cmin[i] : null
  );

  // Debug log
  useEffect(() => {
    console.log("[DEBUG] Cmaxmin, kriteria", {
      matrixRows,
      kriteriaCodes,
      cmin,
      cmax,
      cmaxmin,
      penilaianAll,
      kriteriaAll
    });
  }, [matrixRows, kriteriaCodes, cmin, cmax, cmaxmin, penilaianAll, kriteriaAll]);

  // Kirim hasil ke parent, SYARAT: semua array ada dan minimal ada 1 data
  useEffect(() => {
    const n = kriteriaCodes.length;
    if (
      typeof onResult === "function" &&
      !loading &&
      n > 0 &&
      matrixRows.length > 0 &&
      cmin.length === n &&
      cmaxmin.length === n &&
      cmin.some(v => v !== null) // harus ada nilai
    ) {
      onResult({
        matrixRows,
        kriteriaCodes,
        cmin,
        cmax,
        cmaxmin
      });
    }
  }, [matrixRows, kriteriaCodes, cmin, cmax, cmaxmin, loading, onResult]);

  const tableRows = [
    ...matrixRows.map((row) => ({
      label: row.kode,
      nama: row.nama,
      values: row.nilai,
      isSummary: false,
    })),
    { label: "Cmax", nama: "", values: cmax, isSummary: true },
    { label: "Cmin", nama: "", values: cmin, isSummary: true },
    { label: "cmax-cmin", nama: "", values: cmaxmin, isSummary: true },
  ];

  return (
    <div className="p-4 w-full max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Tabel Alternatif-Nilai Kriteria (SMART)
      </h2>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-200 text-gray-700 uppercase">
            <tr>
              <th className="py-3 px-4">Kode</th>
              <th className="py-3 px-4">Nama Poktan</th>
              {kriteriaCodes.map((code, i) => (
                <th key={i} className="py-3 px-4">{code}</th>
              ))}
            </tr>
          </thead>
          {loading ? (
            <TableSkeleton rows={6} columns={2 + kriteriaKeys.length} />
          ) : (
            <tbody>
              {tableRows.map((row, idx) => (
                <tr
                  key={idx}
                  className={
                    row.isSummary
                      ? "bg-gray-100 font-semibold"
                      : idx % 2 === 0
                      ? "bg-gray-50"
                      : "bg-white"
                  }
                >
                  <td className="py-2 px-4">{row.label}</td>
                  <td className="py-2 px-4">{row.nama}</td>
                  {row.values.map((val, i) => (
                    <td key={i} className="py-2 px-4">{val ?? "-"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
