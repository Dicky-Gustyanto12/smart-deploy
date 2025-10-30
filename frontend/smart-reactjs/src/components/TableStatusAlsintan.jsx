import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

function TableSkeleton({ rows = 2 }) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, idx) => (
        <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
          {Array(9)
            .fill()
            .map((_, col) => (
              <td key={col} className="py-2 px-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </td>
            ))}
        </tr>
      ))}
    </tbody>
  );
}

export default function TablePengajuanEditStatus() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [selected, setSelected] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    setLoading(true);
    setErrorMsg("");
    fetch("http://localhost:8000/api/pengajuan")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal fetch data: " + res.status);
        return res.json();
      })
      .then((result) => setData(result))
      .catch((err) => setErrorMsg(err.message || "Gagal fetch data"))
      .finally(() => setLoading(false));
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Diterima":
        return "bg-green-200 text-green-800";
      case "Proses":
        return "bg-yellow-200 text-yellow-800";
      case "Batal":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const openEditStatus = (item) => {
    setSelected(item);
    setSelectedStatus(item.status || "Proses");
    Swal.fire({
      title: "Ubah Status Pengajuan",
      html: `
        <div style="text-align:left">
          <div><b>ID:</b> ${item.id_pengajuan}</div>
          <div><b>Nama Poktan:</b> ${item.nama_poktan}</div>
          <div><b>Nama Barang:</b> ${item.nama_barang}</div>
          <div><b>Merek:</b> ${item.merek}</div>
          <div><b>Tipe:</b> ${item.tipe}</div>
          <div><b>Nama Ketua:</b> ${item.nama_ketua}</div>
          <div><b>Nomor HP:</b> ${item.nomor_hp}</div>
          <div class="mt-3"></div>
          <label>Status: 
            <select id="swal-input-status" class="swal2-input" style="width:180px">
              <option value="Proses"${
                item.status === "Proses" ? " selected" : ""
              }>Proses</option>
              <option value="Diterima"${
                item.status === "Diterima" ? " selected" : ""
              }>Diterima</option>
              <option value="Batal"${
                item.status === "Batal" ? " selected" : ""
              }>Batal</option>
            </select>
          </label>
        </div>`,
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
      preConfirm: () => {
        const status = document.getElementById("swal-input-status").value;
        return { status };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prev) =>
          prev.map((d) =>
            d.id_pengajuan === item.id_pengajuan
              ? { ...d, status: result.value.status }
              : d
          )
        );
        Swal.fire("Berhasil!", "Status berhasil diperbarui.", "success");
      }
    });
  };

  return (
    <div className="p-2">
      {errorMsg && (
        <div className="mb-4 border border-red-300 bg-red-100 text-red-700 px-4 py-2 rounded">
          {errorMsg}
        </div>
      )}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-200 text-gray-700 uppercase font-bold">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">NAMA POKTAN</th>
              <th className="py-2 px-4 text-left">NAMA BARANG</th>
              <th className="py-2 px-4 text-left">MEREK</th>
              <th className="py-2 px-4 text-left">TIPE</th>
              <th className="py-2 px-4 text-left">NAMA KETUA</th>
              <th className="py-2 px-4 text-left">NOMOR HP</th>
              <th className="py-2 px-4 text-left">STATUS</th>
              <th className="py-2 px-4 text-left">UPDATE STATUS</th>
            </tr>
          </thead>
          {loading ? (
            <TableSkeleton rows={3} />
          ) : (
            <tbody>
              {data.map((item, idx) => (
                <tr
                  key={item.id_pengajuan || idx}
                  className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-2 px-4">{item.id_pengajuan}</td>
                  <td className="py-2 px-4">{item.nama_poktan}</td>
                  <td className="py-2 px-4">{item.nama_barang}</td>
                  <td className="py-2 px-4">{item.merek}</td>
                  <td className="py-2 px-4">{item.tipe}</td>
                  <td className="py-2 px-4">{item.nama_ketua}</td>
                  <td className="py-2 px-4">{item.nomor_hp}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${getStatusClass(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => openEditStatus(item)}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      title="Edit Status"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
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
