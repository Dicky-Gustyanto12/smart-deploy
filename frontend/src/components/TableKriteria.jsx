import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

// --- axios instance dengan Bearer token otomatis (optional JWT auth) ---
const api = axios.create({
  baseURL: "https://apiv2.alsindata.id/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token"); // atau localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function TableSkeleton({ rows = 4, cols = 6 }) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, idx) => (
        <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
          {Array.from({ length: cols }).map((_, col) => (
            <td key={col} className="py-3 px-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default function TableKriteria() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    id_kriteria: null,
    kode: "",
    kriteria: "",
    bobot: "",
  });

  // Fetch data kriteria
  const fetchKriteria = async () => {
    setLoading(true);
    try {
      const res = await api.get("/kriteria");
      setData(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      Swal.fire("Gagal!", e.response?.data?.message || e.message, "error");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKriteria();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const openAddPopup = () => {
    setFormValues({
      id_kriteria: null,
      kode: "",
      kriteria: "",
      bobot: "",
    });
    setEditMode(false);
    setPopupOpen(true);
  };

  const openEditPopup = (item) => {
    setFormValues({
      id_kriteria: item.id_kriteria,
      kode: item.kode,
      kriteria: item.kriteria,
      bobot: item.bobot,
    });
    setEditMode(true);
    setPopupOpen(true);
  };

  const closePopup = () => setPopupOpen(false);

  // Tambah/Edit
  const handleSave = async () => {
    if (!formValues.kode || !formValues.kriteria || !formValues.bobot) {
      Swal.fire("Lengkapi semua field!", "", "warning");
      return;
    }
    Swal.fire({
      title: editMode ? "Konfirmasi update?" : "Konfirmasi tambah?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          const payload = {
            kode: formValues.kode,
            kriteria: formValues.kriteria,
            bobot: parseFloat(formValues.bobot),
          };
          if (editMode) {
            await api.put(`/kriteria/${formValues.id_kriteria}`, payload);
          } else {
            await api.post("/kriteria", payload);
          }
          closePopup();
          await fetchKriteria();
          Swal.fire(
            "Berhasil!",
            editMode ? "Data berhasil diupdate" : "Data berhasil ditambahkan",
            "success"
          );
        } catch (e) {
          Swal.fire("Gagal!", e.response?.data?.message || e.message, "error");
        } finally {
          setLoading(false);
        }
      } else {
        Swal.fire("Batal", "Tidak ada data yang diubah", "info");
      }
    });
  };

  // Delete
  const handleDelete = (id_kriteria) => {
    Swal.fire({
      title: "Yakin ingin menghapus data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          await api.delete(`/kriteria/${id_kriteria}`);
          await fetchKriteria();
          Swal.fire("Berhasil!", "Data berhasil dihapus", "success");
        } catch (e) {
          Swal.fire("Gagal!", e.response?.data?.message || e.message, "error");
        } finally {
          setLoading(false);
        }
      } else {
        Swal.fire("Batal", "Data tidak dihapus", "info");
      }
    });
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-4">Daftar Kriteria</h2>
      <button
        onClick={openAddPopup}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
      >
        Tambah Kriteria
      </button>
      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
          <tr>
            <th className="py-3 px-6 text-center">No</th>
            <th className="py-3 px-6 text-left">Kode</th>
            <th className="py-3 px-6 text-left">Kriteria</th>
            <th className="py-3 px-6 text-center">Bobot</th>
            <th className="py-3 px-6 text-center">Normalisasi</th>
            <th className="py-3 px-6 text-center">Aksi</th>
          </tr>
        </thead>
        {loading ? (
          <TableSkeleton rows={4} cols={6} />
        ) : (
          <tbody className="text-gray-600 text-sm">
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-6 text-center text-gray-500">
                  Tidak ada data kriteria
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr
                  key={item.id_kriteria}
                  className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-3 px-6 text-center">{idx + 1}</td>
                  <td className="py-3 px-6">{item.kode}</td>
                  <td className="py-3 px-6">{item.kriteria}</td>
                  <td className="py-3 px-6 text-center">{item.bobot}</td>
                  <td className="py-3 px-6 text-center">
                    {item.normalisasi !== undefined && item.normalisasi !== null
                      ? item.normalisasi
                      : "-"}
                  </td>
                  <td className="py-3 px-6 flex justify-center space-x-4">
                    <button
                      onClick={() => openEditPopup(item)}
                      title="Edit"
                      className="hover:text-blue-700 cursor-pointer"
                    >
                      <PencilSquareIcon className="h-5 w-5 text-blue-600 hover:text-blue-800" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id_kriteria)}
                      title="Hapus"
                      className="hover:text-red-700 cursor-pointer"
                    >
                      <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-800 cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        )}
      </table>
      {/* Popup CRUD */}
      {popupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editMode ? "Edit Kriteria" : "Tambah Kriteria Baru"}
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                name="kode"
                placeholder="Kode"
                value={formValues.kode}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="kriteria"
                placeholder="Kriteria"
                value={formValues.kriteria}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                step="0.01"
                name="bobot"
                placeholder="Bobot"
                value={formValues.bobot}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={closePopup}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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
