import { useState, useEffect } from "react";
import axios from "axios";

// Badge status
function StatusBadge({ status }) {
  let color = "bg-gray-200 text-gray-800";
  if (status === "Diterima") color = "bg-green-200 text-green-800";
  if (status === "Proses") color = "bg-yellow-200 text-yellow-800";
  if (status === "Batal") color = "bg-red-200 text-red-800";
  return (
    <span className={`px-3 py-1 rounded text-sm font-semibold ${color}`}>
      {status}
    </span>
  );
}

// Format tanggal ke lokal ID (ISO -> dd/mm/yyyy)
function formatTanggalOnly(tgl) {
  if (!tgl) return "-";
  const d = new Date(tgl);
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Skeleton loading row
function TableSkeleton({ cols = 9, rows = 3 }) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, ridx) => (
        <tr key={ridx} className={ridx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
          {Array.from({ length: cols }).map((_, cidx) => (
            <td key={cidx} className="py-3 px-4">
              <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

const COLUMN = [
  { label: "ID", key: "id_pengajuan" },
  { label: "NAMA POKTAN", key: "nama_poktan" },
  { label: "NAMA BARANG", key: "nama_barang" },
  { label: "MEREK", key: "merek" },
  { label: "TIPE", key: "tipe" },
  { label: "NAMA KETUA", key: "nama_ketua" },
  { label: "NOMOR HP", key: "nomor_hp" },
  { label: "STATUS", key: "status" },
  { label: "TANGGAL", key: "updated_at" },
];

export default function TablePengajuanDiterimaWithTanggalOnly() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/api/pengajuan", {
        headers: { Accept: "application/json" }
      })
      .then((res) =>
        setData(res.data.filter((row) => row.status === "Diterima"))
      )
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4">
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700 font-bold">
              {COLUMN.map((col) => (
                <th className="py-3 px-4 text-left" key={col.key}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          {loading ? (
            <TableSkeleton cols={COLUMN.length} rows={3} />
          ) : (
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={COLUMN.length}
                    className="py-6 text-center text-gray-400"
                  >
                    Tidak ada data "Diterima".
                  </td>
                </tr>
              ) : (
                data.map((item, idx) => (
                  <tr
                    key={item.id_pengajuan || idx}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="py-3 px-4">{item.id_pengajuan}</td>
                    <td className="py-3 px-4">{item.nama_poktan}</td>
                    <td className="py-3 px-4">{item.nama_barang}</td>
                    <td className="py-3 px-4">{item.merek}</td>
                    <td className="py-3 px-4">{item.tipe}</td>
                    <td className="py-3 px-4">{item.nama_ketua}</td>
                    <td className="py-3 px-4">{item.nomor_hp}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="py-3 px-4">
                      {formatTanggalOnly(item.updated_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
