import { useEffect, useState } from "react";
import axios from "axios";

export default function TableNormalisasi() {
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

  const kriteriaKeys = kriteriaAll.map((k) => k.id_kriteria);
  const kriteriaCodes = kriteriaAll.map((k, i) => k.kode || `K${i + 1}`);

  // Matriks nilai alternatif
  const matrixRows =
    penilaianAll.map((poktan) => ({
      kode: poktan.id_poktan,
      nama: poktanMap[poktan.id_poktan] || "-",
      nilai: kriteriaKeys.map((k) => poktan.details?.[k]?.nilai ?? 0),
    })) || [];

  // Hitung Cmin, Cmax, cmax-cmin per kolom
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

  // Matriks hasil normalisasi (dibulatkan ke integer)
  const matrixNorm = matrixRows.map((row) => ({
    kode: row.kode,
    nama: row.nama,
    norm: row.nilai.map((v, i) =>
      cmaxmin[i] === 0 ? 0 : Math.round((v - cmin[i]) / cmaxmin[i])
    ),
  }));

  return (
    <div className="p-2 w-full">
      <h2 className="font-bold mb-4 text-lg">
        Matriks Normalisasi Min-Max (SMART)
      </h2>
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-3 font-semibold">Kode</th>
              <th className="px-4 py-3 font-semibold">Nama Poktan</th>
              {kriteriaCodes.map((code, i) => (
                <th key={i} className="px-4 py-3 font-semibold">
                  {code}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={2 + kriteriaKeys.length}
                  className="py-6 text-gray-400 text-center"
                >
                  Memuat...
                </td>
              </tr>
            ) : (
              matrixNorm.map((row, idx) => (
                <tr
                  key={row.kode}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-2 font-semibold">{row.kode}</td>
                  <td className="px-4 py-2">{row.nama}</td>
                  {row.norm.map((val, i) => (
                    <td className="px-4 py-2" key={i}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
