import { useEffect, useState } from "react";

export default function TableHasilRekomendasi() {
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
    ]).then(([pen, kri, pok]) => {
      setPenilaianAll(pen);
      setKriteriaAll(kri);
      setPoktanMap(
        Object.fromEntries(pok.map((p) => [p.id_poktan, p.nama_poktan]))
      );
      setLoading(false);
    });
  }, []);

  // Bobot dinamis dari field kriteria
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

  // Cmin, Cmax, cmaxmin
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

  // Matriks normalisasi (float desimal)
  const matrixNorm = matrixRows.map((row) => ({
    kode: row.kode,
    nama: row.nama,
    norm: row.nilai.map((v, i) =>
      cmaxmin[i] === 0 ? 0 : (v - cmin[i]) / cmaxmin[i]
    ),
  }));

  // Matriks nilai akhir
  let resultMatrix = matrixNorm.map((row) => {
    const skorPerKolom = row.norm.map((val, i) => val * bobotNormal[i]);
    const total = skorPerKolom.reduce((a, b) => a + b, 0);
    return {
      kode: row.kode,
      nama: row.nama,
      skor: skorPerKolom,
      total: total,
    };
  });

  // Tambahkan ranking dan urutkan dari total tertinggi
  resultMatrix = resultMatrix
    .sort((a, b) => b.total - a.total)
    .map((row, i) => ({ ...row, rank: i + 1 }));

  return (
    <div className="p-2 w-full">
      <h2 className="font-bold mb-4 text-lg">Hasil Rekomendasi SMART</h2>
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-3 font-semibold">Ranking</th>
              <th className="px-4 py-3 font-semibold">Kode</th>
              <th className="px-4 py-3 font-semibold">Nama Poktan</th>
              {kriteriaCodes.map((code, i) => (
                <th key={i} className="px-4 py-3 font-semibold">
                  {code}
                </th>
              ))}
              <th className="px-4 py-3 font-semibold">Total Nilai Akhir</th>
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
            ) : (
              resultMatrix.map((row, idx) => (
                <tr
                  key={row.kode}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-2 font-bold">{row.rank}</td>
                  <td className="px-4 py-2 font-semibold">{row.kode}</td>
                  <td className="px-4 py-2">{row.nama}</td>
                  {row.skor.map((val, i) => (
                    <td className="px-4 py-2" key={i}>
                      {val.toFixed(2)}
                    </td>
                  ))}
                  <td className="px-4 py-2 font-bold">
                    {row.total.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
