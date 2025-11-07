import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

// Utility untuk kelompok kriteria
function groupByKriteria(data) {
  const map = new Map();
  data.forEach((item) => {
    const key = item.kriteria.kriteria; // nama kriteria dari relasi
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(item);
  });
  return Array.from(map.values());
}

export default function TableParameter() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    id_parameter: null,
    id_kriteria: "",
    keterangan: "",
    nilai: "",
  });
  const [kriteriaList, setKriteriaList] = useState([]);

  // Fetch master kriteria
  const fetchKriteria = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/kriteria", {
        headers: { Accept: "application/json" }
      });
      if (Array.isArray(res.data)) setKriteriaList(res.data);
      else if (res.data && Array.isArray(res.data.data))
        setKriteriaList(res.data.data);
      else setKriteriaList([]);
    } catch {
      setKriteriaList([]);
    }
  };

  // Fetch parameter + relasi
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/parameter", {
        headers: { Accept: "application/json" }
      });
      if (Array.isArray(res.data)) setData(res.data);
      else if (res.data && Array.isArray(res.data.data)) setData(res.data.data);
      else setData([]);
    } catch (e) {
      setData([]);
      Swal.fire("Error", "Gagal memuat data dari API.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKriteria();
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const openAddPopup = () => {
    setFormValues({
      id_parameter: null,
      id_kriteria: "",
      keterangan: "",
      nilai: "",
    });
    setEditMode(false);
    setPopupOpen(true);
  };

  const openEditPopup = (item) => {
    setFormValues({
      id_parameter: item.id_parameter,
      id_kriteria: item.id_kriteria,
      keterangan: item.keterangan,
      nilai: item.nilai,
    });
    setEditMode(true);
    setPopupOpen(true);
  };

  const closePopup = () => setPopupOpen(false);

  // Save (POST/PUT) dengan axios + header Accept
  const handleSave = async () => {
    if (
      !formValues.id_kriteria ||
      !formValues.keterangan ||
      !formValues.nilai
    ) {
      Swal.fire("Lengkapi semua field!", "", "warning");
      return;
    }
    try {
      let url = "http://localhost:8000/api/parameter";
      let method = "post";
      if (editMode) {
        url += "/" + formValues.id_parameter;
        method = "put";
      }
      await axios[method](url, {
        id_kriteria: formValues.id_kriteria,
        keterangan: formValues.keterangan,
        nilai: parseInt(formValues.nilai, 10),
      }, { headers: { Accept: "application/json" } });
      await fetchData();
      Swal.fire(
        "Berhasil!",
        editMode ? "Data diupdate." : "Data ditambahkan.",
        "success"
      );
      closePopup();
    } catch {
      Swal.fire("Error", "Gagal menyimpan data.", "error");
    }
  };

  // Delete dengan axios + header Accept
  const handleDelete = async (id_parameter) => {
    const confirm = await Swal.fire({
      title: "Yakin ingin menghapus data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    });
    if (!confirm.isConfirmed) return;
    try {
      await axios.delete(
        `http://localhost:8000/api/parameter/${id_parameter}`,
        { headers: { Accept: "application/json" } }
      );
      await fetchData();
      Swal.fire("Berhasil!", "Data dihapus.", "success");
    } catch {
      Swal.fire("Error", "Gagal menghapus data.", "error");
    }
  };

  // Data sorting + grouping
  const sorted = [...data].sort((a, b) => a.id_kriteria - b.id_kriteria);
  const groups = groupByKriteria(sorted);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tabel Parameter</h2>
      <button
        onClick={openAddPopup}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
      >
        Tambah Parameter
      </button>
      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
          <tr>
            <th className="py-3 px-6 text-center">NO</th>
            <th className="py-3 px-6 text-left">KRITERIA</th>
            <th className="py-3 px-6 text-left">KETERANGAN</th>
            <th className="py-3 px-6 text-center">NILAI PARAMETER</th>
            <th className="py-3 px-6 text-center">AKSI</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {loading ? (
            <tr>
              <td colSpan={5} className="py-5 text-center">
                Memuat data...
              </td>
            </tr>
          ) : groups.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-5 text-center">
                Tidak ada data
              </td>
            </tr>
          ) : (
            groups.map((group, groupIdx) =>
              group.map((item, idx) => (
                <tr
                  key={item.id_parameter}
                  className={groupIdx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  {idx === 0 && (
                    <>
                      <td
                        className="py-3 px-6 text-center"
                        rowSpan={group.length}
                      >
                        {groupIdx + 1}
                      </td>
                      <td className="py-3 px-6" rowSpan={group.length}>
                        {item.kriteria.kriteria}
                      </td>
                    </>
                  )}
                  {idx !== 0 && null}
                  <td className="py-3 px-6">{item.keterangan}</td>
                  <td className="py-3 px-6 text-center">{item.nilai}</td>
                  <td className="py-3 px-6 flex justify-center space-x-4">
                    <button
                      onClick={() => openEditPopup(item)}
                      title="Edit"
                      className="hover:text-blue-700 cursor-pointer"
                    >
                      <PencilSquareIcon className="h-5 w-5 text-blue-600 hover:text-blue-800" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id_parameter)}
                      title="Hapus"
                      className="hover:text-red-700 cursor-pointer"
                    >
                      <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-800" />
                    </button>
                  </td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
      {/* Popup CRUD */}
      {popupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editMode ? "Edit Parameter" : "Tambah Parameter"}
            </h3>
            <div className="space-y-3">
              <select
                name="id_kriteria"
                value={formValues.id_kriteria}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Pilih Kriteria</option>
                {kriteriaList.map((k) => (
                  <option key={k.id_kriteria} value={k.id_kriteria}>
                    {k.kriteria}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="keterangan"
                placeholder="Keterangan"
                value={formValues.keterangan}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                name="nilai"
                placeholder="Nilai Parameter"
                value={formValues.nilai}
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
