import { useEffect, useState } from "react";

function TableSkeleton({ rows = 5, columns = 5 }) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, idx) => (
        <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
          {Array.from({ length: columns }).map((_, col) => (
            <td key={col} className="py-3 px-4">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default function TableSmart() {
  const [penilaianAll, setPenilaianAll] = useState([]);
  const [kriteriaAll, setKriteriaAll] = useState([]);
  const [poktanMap, setPoktanMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("https://api.alsindata.id/api/penilaian").then((res) => res.json()),
      fetch("https://api.alsindata.id/api/kriteria").then((res) => res.json()),
      fetch("https://api.alsindata.id/api/poktan").then((res) => res.json()),
    ])
      .then(([pen, kri, pok]) => {
        setPenilaianAll(pen);
        setKriteriaAll(kri);
        setPoktanMap(Object.fromEntries(pok.map((p) => [p.id_poktan, p.nama_poktan])));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const kriteriaKeys = kriteriaAll.map((k) => k.id_kriteria);
  const kriteriaCodes = kriteriaAll.map((k, i) => k.kode || `K${i + 1}`);

  const matrixRows =
    penilaianAll.map((poktan) => ({
      kode: poktan.id_poktan,
      nama: poktanMap[poktan.id_poktan] || "-",
      nilai: kriteriaKeys.map((k) => poktan.details?.[k]?.nilai ?? 0),
    })) || [];

  const cmin = kriteriaKeys.map((_, i) =>
    matrixRows.length === 0 ? "-" : Math.min(...matrixRows.map((row) => row.nilai[i]))
  );
  const cmax = kriteriaKeys.map((_, i) =>
    matrixRows.length === 0 ? "-" : Math.max(...matrixRows.map((row) => row.nilai[i]))
  );
  const cmaxmin = kriteriaKeys.map((_, i) =>
    matrixRows.length === 0 ? "-" : cmax[i] - cmin[i]
  );

  const tableRows = [
    ...matrixRows.map((row) => ({
      label: row.kode,
      nama: row.nama,
      values: row.nilai,
      isSummary: false,
    })),
    { label: "Cmin", nama: "", values: cmin, isSummary: true },
    { label: "Cmax", nama: "", values: cmax, isSummary: true },
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
                  className={row.isSummary ? "bg-gray-100 font-semibold" : idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-2 px-4">{row.label}</td>
                  <td className="py-2 px-4">{row.nama}</td>
                  {row.values.map((val, i) => (
                    <td key={i} className="py-2 px-4">{val}</td>
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
