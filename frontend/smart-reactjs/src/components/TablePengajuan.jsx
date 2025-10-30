import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

// Skeleton loading untuk tabel
function TableSkeleton({ rows = 5 }) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, idx) => (
        <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
          {Array(8)
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

export default function TableStat() {
  const [poktanList, setPoktanList] = useState([]);
  const [data, setData] = useState([]);
  const [formValues, setFormValues] = useState({
    id_pengajuan: null,
    namaPoktan: "",
    namaBarang: "",
    merek: "",
    tipe: "",
    namaPenerima: "",
    nomorHp: "",
  });
  const [popupOpen, setPopupOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("http://localhost:8000/api/poktan").then((res) => res.json()),
      fetch("http://localhost:8000/api/pengajuan").then((res) => res.json()),
    ])
      .then(([resultPoktan, resultPengajuan]) => {
        setPoktanList(resultPoktan);
        setData(resultPengajuan);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleNamaPoktanChange = (e) => {
    const selected = e.target.value;
    const poktan = poktanList.find((p) => p.nama_poktan === selected);
    setFormValues((prev) => ({
      ...prev,
      namaPoktan: selected,
      namaPenerima: poktan ? poktan.nama_ketua : "",
      nomorHp: poktan ? poktan.nomor_hp : "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openAddPopup = () => {
    const prefillPoktan = poktanList.length ? poktanList[0].nama_poktan : "";
    const poktan = poktanList.find((p) => p.nama_poktan === prefillPoktan);
    setFormValues({
      id_pengajuan: null,
      namaPoktan: prefillPoktan,
      namaBarang: "",
      merek: "",
      tipe: "",
      namaPenerima: poktan ? poktan.nama_ketua : "",
      nomorHp: poktan ? poktan.nomor_hp : "",
    });
    setEditMode(false);
    setPopupOpen(true);
  };

  const openEditPopup = (item) => {
    setFormValues({
      id_pengajuan: item.id_pengajuan,
      namaPoktan: item.nama_poktan,
      namaBarang: item.nama_barang,
      merek: item.merek,
      tipe: item.tipe,
      namaPenerima: item.nama_ketua,
      nomorHp: item.nomor_hp,
    });
    setEditMode(true);
    setPopupOpen(true);
  };

  const closePopup = () => setPopupOpen(false);

  // Konfirmasi SweetAlert untuk simpan/edit
  const handleSave = () => {
    const {
      namaPoktan,
      namaBarang,
      merek,
      tipe,
      namaPenerima,
      nomorHp,
      id_pengajuan,
    } = formValues;
    if (
      !namaPoktan ||
      !namaBarang ||
      !merek ||
      !tipe ||
      !namaPenerima ||
      !nomorHp
    ) {
      Swal.fire("Invalid", "Lengkapi semua data!", "warning");
      return;
    }
    Swal.fire({
      title: editMode
        ? "Konfirmasi update data pengajuan?"
        : "Konfirmasi tambah data pengajuan?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4ade80",
      cancelButtonColor: "#e5e7eb",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const payload = {
          nama_poktan: namaPoktan,
          nama_barang: namaBarang,
          merek: merek,
          tipe: tipe,
          nama_ketua: namaPenerima,
          nomor_hp: nomorHp,
        };
        if (editMode) {
          fetch(`http://localhost:8000/api/pengajuan/${id_pengajuan}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
            .then((res) => res.json())
            .then((updated) => {
              setData((prev) =>
                prev.map((item) =>
                  item.id_pengajuan === updated.id_pengajuan ? updated : item
                )
              );
              closePopup();
              Swal.fire("Berhasil", "Data berhasil diupdate!", "success");
            })
            .finally(() => setLoading(false));
        } else {
          fetch("http://localhost:8000/api/pengajuan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
            .then((res) => res.json())
            .then((newItem) => {
              setData((prev) => [...prev, newItem]);
              closePopup();
              Swal.fire("Berhasil", "Data berhasil ditambahkan!", "success");
            })
            .finally(() => setLoading(false));
        }
      } else {
        Swal.fire("Batal", "Tidak ada data yang diubah", "info");
      }
    });
  };

  // Konfirmasi SweetAlert untuk hapus
  const handleDelete = (id_pengajuan) => {
    Swal.fire({
      title: "Yakin ingin menghapus data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        fetch(`http://localhost:8000/api/pengajuan/${id_pengajuan}`, {
          method: "DELETE",
        })
          .then(() => {
            setData((prev) =>
              prev.filter((item) => item.id_pengajuan !== id_pengajuan)
            );
            Swal.fire("Berhasil", "Data berhasil dihapus!", "success");
          })
          .finally(() => setLoading(false));
      } else {
        Swal.fire("Batal", "Data tidak dihapus", "info");
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Rekap Data Pengajuan Alsintan</h2>
      <button
        onClick={openAddPopup}
        className="mb-4 bg-green-600 hover:bg-green-300 text-white px-4 py-2 rounded cursor-pointer"
      >
        Tambah Data
      </button>
      <table className="min-w-full bg-white rounded shadow text-sm">
        <thead className="bg-gray-200 text-gray-600 uppercase font-medium">
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Nama Poktan</th>
            <th className="py-2 px-4 text-left">Nama Barang</th>
            <th className="py-2 px-4 text-left">Merek</th>
            <th className="py-2 px-4 text-left">Tipe</th>
            <th className="py-2 px-4 text-left">Nama Ketua</th>
            <th className="py-2 px-4 text-left">Nomor Hp</th>
            <th className="py-2 px-4 text-left">Aksi</th>
          </tr>
        </thead>
        {loading ? (
          <TableSkeleton rows={5} />
        ) : (
          <tbody>
            {data.map((item, idx) => (
              <tr
                key={item.id_pengajuan}
                className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-2 px-4">{item.id_pengajuan}</td>
                <td className="py-2 px-4">{item.nama_poktan}</td>
                <td className="py-2 px-4">{item.nama_barang}</td>
                <td className="py-2 px-4">{item.merek}</td>
                <td className="py-2 px-4">{item.tipe}</td>
                <td className="py-2 px-4">{item.nama_ketua}</td>
                <td className="py-2 px-4">{item.nomor_hp}</td>
                <td className="py-2 px-4 space-x-3 flex">
                  <button
                    onClick={() => openEditPopup(item)}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    title="Edit"
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id_pengajuan)}
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    title="Hapus"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {popupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-lg">
            <h3 className="text-lg font-bold mb-4">
              {editMode ? "Edit Data" : "Tambah Data"}
            </h3>
            <div className="space-y-3">
              <select
                name="namaPoktan"
                value={formValues.namaPoktan}
                onChange={handleNamaPoktanChange}
                className="w-full border p-2 rounded"
                disabled={editMode}
              >
                {poktanList.map((poktan) => (
                  <option key={poktan.id_poktan} value={poktan.nama_poktan}>
                    {poktan.nama_poktan}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="namaBarang"
                value={formValues.namaBarang}
                onChange={handleChange}
                placeholder="Nama Barang"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="merek"
                value={formValues.merek}
                onChange={handleChange}
                placeholder="Merek"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="tipe"
                value={formValues.tipe}
                onChange={handleChange}
                placeholder="Tipe"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="namaPenerima"
                value={formValues.namaPenerima}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
                placeholder="Nama Penerima"
              />
              <input
                type="text"
                name="nomorHp"
                value={formValues.nomorHp}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
                placeholder="Nomor Hp"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={closePopup}
                className="px-4 py-2 rounded border hover:bg-gray-100 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 cursor-pointer"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
