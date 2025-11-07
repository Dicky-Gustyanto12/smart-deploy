import { useState, useEffect } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import axios from "axios";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

// Axios instance (Bearer token JWT) - semua request aman authorized
const api = axios.create({
  baseURL: "https://apiv2.alsindata.id/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

function TableSkeleton({ rows = 2, cols = 7 }) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, idx) => (
        <tr key={idx} className="animate-pulse">
          {Array.from({ length: cols }).map((_, col) => (
            <td key={col} className="py-4 px-3">
              <div className="h-4 bg-gray-200 rounded-full w-full"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default function TablePenilaian() {
  const [poktanAll, setPoktanAll] = useState([]);
  const [poktanMap, setPoktanMap] = useState({});
  const [penilaianAll, setPenilaianAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPoktan, setSelectedPoktan] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formValues, setFormValues] = useState({ poktanId: null });
  const [lockPoktan, setLockPoktan] = useState(false);

  const [kriteriaAll, setKriteriaAll] = useState([]);
  const [parameterAll, setParameterAll] = useState([]);

  useEffect(() => {
    fetchData();
    api.get("/kriteria").then((res) => setKriteriaAll(res.data));
    api.get("/parameter").then((res) => setParameterAll(res.data));
    // eslint-disable-next-line
  }, []);

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      api.get("/poktan"),
      api.get("/penilaian"),
    ])
      .then(([poktanRes, penilaianRes]) => {
        const poktanResult = poktanRes.data;
        const penilaianResult = penilaianRes.data;
        setPoktanAll(poktanResult.map((p) => ({
          value: p.id_poktan,
          label: `${p.id_poktan} - ${p.nama_poktan}`,
          id_poktan: p.id_poktan,
          nama_poktan: p.nama_poktan,
        })));
        setPoktanMap(Object.fromEntries(
          poktanResult.map((p) => [p.id_poktan, p.nama_poktan])
        ));
        setPenilaianAll(penilaianResult);
      })
      .finally(() => setLoading(false));
  };

  const paramMap = Object.fromEntries(parameterAll.map((p) => [p.id_parameter, p]));

  const getDetailObj = (details, id_kriteria) => details?.[id_kriteria] ?? {};
  const getCellValue = (item, id_kriteria) => {
    const detail = getDetailObj(item.details, id_kriteria);
    if (!detail || !detail.id_parameter) return "";
    const nilai = paramMap[detail.id_parameter]?.nilai;
    return nilai !== undefined && nilai !== null ? nilai : "";
  };
  const getCellLabel = (item, id_kriteria) => {
    const detail = getDetailObj(item.details, id_kriteria);
    if (!detail || !detail.id_parameter) return "";
    const ket = paramMap[detail.id_parameter]?.keterangan;
    return ket !== undefined && ket !== null ? ket : "";
  };
  const getTotalNilai = (item) =>
    kriteriaAll.reduce((sum, k) => {
      const n = Number(getCellValue(item, k.id_kriteria));
      return sum + (!isNaN(n) && n !== "" ? n : 0);
    }, 0);

  const openAddPopup = () => {
    setFormValues({
      poktanId: selectedPoktan?.value || null,
      ...Object.fromEntries(kriteriaAll.map((k) => [k.id_kriteria, ""])),
    });
    setEditId(null);
    setLockPoktan(false);
    setPopupOpen(true);
  };

  const openEditPopup = (item) => {
    setSelectedPoktan(
      poktanAll.find((x) => x.value === item.id_poktan) || null
    );
    const formInit = { poktanId: item.id_poktan };
    kriteriaAll.forEach((k) => {
      const det = getDetailObj(item.details, k.id_kriteria);
      formInit[k.id_kriteria] = det?.id_parameter ?? "";
    });
    setFormValues(formInit);
    setEditId(item.id_penilaian);
    setLockPoktan(true);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setEditId(null);
    setLockPoktan(false);
  };

  const handleSave = () => {
    if (!formValues.poktanId)
      return Swal.fire("Pilih Poktan terlebih dahulu", "", "warning");
    if (!kriteriaAll.every((k) => formValues[k.id_kriteria]))
      return Swal.fire("Lengkapi semua penilaian!", "", "warning");
    Swal.fire({
      title: editId ? "Ubah Penilaian?" : "Konfirmasi Simpan Penilaian?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
      confirmButtonColor: "#059669",
      cancelButtonColor: "#393939ff",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const method = editId ? "put" : "post";
        const url = editId
          ? `/penilaian/${editId}`
          : "/penilaian";
        api[method](
          url,
          {
            id_poktan: formValues.poktanId,
            nilai: Object.fromEntries(
              kriteriaAll.map((k) => [
                String(k.id_kriteria),
                formValues[k.id_kriteria],
              ])
            ),
          }
        )
          .then(() => {
            closePopup();
            setSelectedPoktan(null);
            fetchData();
            Swal.fire(
              editId ? "Berhasil diubah!" : "Tersimpan!",
              editId
                ? "Penilaian berhasil diupdate."
                : "Penilaian berhasil disimpan.",
              "success"
            );
          })
          .finally(() => setLoading(false));
      }
    });
  };

  const handleDelete = (id_penilaian) => {
    Swal.fire({
      title: "Yakin ingin menghapus penilaian?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        api.delete(`/penilaian/${id_penilaian}`)
          .then(() => {
            fetchData();
            Swal.fire("Terhapus!", "Penilaian berhasil dihapus.", "success");
          })
          .finally(() => setLoading(false));
      }
    });
  };

  const handleFormChange = (id_kriteria, id_parameter) =>
    setFormValues((prev) => ({ ...prev, [id_kriteria]: id_parameter }));

  const getParameterOptions = (id_kriteria) =>
    parameterAll.filter(
      (p) => p.id_kriteria.toString() === id_kriteria.toString()
    );

  const getNamaPoktan = (id_poktan) => poktanMap[id_poktan] || "";

  const handlePoktanSelect = (option) => {
    setSelectedPoktan(option);
    setFormValues((prev) => ({ ...prev, poktanId: option?.value || null }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <label className="block mb-2 font-semibold">Pilih Kelompok Tani:</label>
      <Select
        className="mb-4"
        isClearable
        isSearchable
        options={poktanAll}
        value={selectedPoktan}
        onChange={handlePoktanSelect}
        placeholder="Cari & Pilih Kelompok Tani..."
      />
      <button
        onClick={openAddPopup}
        disabled={!selectedPoktan}
        className={`mb-4 px-4 py-2 bg-green-600 text-white rounded cursor-pointer hover:bg-green-700 ${
          !selectedPoktan ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Tambah / Ubah Penilaian
      </button>

      {/* Tabel Angka */}
      <h3 className="font-semibold mb-2">Hasil Penilaian</h3>
      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">No</th>
              <th className="px-4 py-2 text-left">Kode Poktan</th>
              <th className="px-4 py-2 text-left">Nama Poktan</th>
              {kriteriaAll.map((krt) => (
                <th key={krt.id_kriteria} className="px-4 py-2 font-semibold">
                  {krt.kode ? `${krt.kode} - ` : ""}
                  {krt.kriteria}
                </th>
              ))}
              <th className="px-4 py-2 font-semibold">Total Nilai</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          {loading ? (
            <TableSkeleton rows={3} cols={3 + kriteriaAll.length + 2} />
          ) : (
            <tbody>
              {penilaianAll.length === 0 && (
                <tr>
                  <td colSpan={3 + kriteriaAll.length + 2} className="px-4 py-4 text-center text-gray-500">
                    Belum ada poktan yang sudah dinilai
                  </td>
                </tr>
              )}
              {penilaianAll.map((item, idx) => (
                <tr key={item.id_penilaian} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{item.id_poktan}</td>
                  <td className="px-4 py-2">{getNamaPoktan(item.id_poktan)}</td>
                  {kriteriaAll.map((krt) => {
                    const val = getCellValue(item, krt.id_kriteria);
                    return (
                      <td key={krt.id_kriteria} className="px-4 py-2 text-center">
                        {val}
                      </td>
                    );
                  })}
                  <td className="px-4 py-2 text-center font-semibold">
                    {getTotalNilai(item)}
                  </td>
                  <td className="px-4 py-2 flex space-x-2 justify-center">
                    <button
                      onClick={() => openEditPopup(item)}
                      title="Edit"
                      className="hover:text-blue-700"
                    >
                      <PencilSquareIcon className="h-5 w-5 text-blue-600 cursor-pointer" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id_penilaian)}
                      title="Delete"
                      className="hover:text-red-700"
                    >
                      <TrashIcon className="h-5 w-5 text-red-600 cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* Table Label */}
      <h3 className="font-semibold my-4">
        Tabel Keterangan Penilaian (Label Parameter)
      </h3>
      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">No</th>
              <th className="px-4 py-2 text-left">Kode Poktan</th>
              <th className="px-4 py-2 text-left">Nama Poktan</th>
              {kriteriaAll.map((krt) => (
                <th key={krt.id_kriteria} className="px-4 py-2 font-semibold">
                  {krt.kode ? `${krt.kode} - ` : ""}
                  {krt.kriteria}
                </th>
              ))}
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          {loading ? (
            <TableSkeleton rows={3} cols={3 + kriteriaAll.length + 1} />
          ) : (
            <tbody>
              {penilaianAll.length === 0 && (
                <tr>
                  <td colSpan={3 + kriteriaAll.length + 1} className="px-4 py-4 text-center text-gray-500">
                    Belum ada poktan yang sudah dinilai
                  </td>
                </tr>
              )}
              {penilaianAll.map((item, idx) => (
                <tr key={item.id_penilaian + "_label"} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{item.id_poktan}</td>
                  <td className="px-4 py-2">{getNamaPoktan(item.id_poktan)}</td>
                  {kriteriaAll.map((krt) => {
                    const label = getCellLabel(item, krt.id_kriteria);
                    return (
                      <td key={krt.id_kriteria} className="px-4 py-2 text-center">
                        {label}
                      </td>
                    );
                  })}
                  <td className="px-4 py-2 flex space-x-2 justify-center">
                    <button
                      onClick={() => openEditPopup(item)}
                      title="Edit"
                      className="hover:text-blue-700"
                    >
                      <PencilSquareIcon className="h-5 w-5 text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id_penilaian)}
                      title="Delete"
                      className="hover:text-red-700"
                    >
                      <TrashIcon className="h-5 w-5 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* MODAL */}
      {popupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">
                {editId ? "Edit Data Kriteria" : "Input Penilaian"}
              </h3>
              <button
                onClick={closePopup}
                className="text-2xl font-bold hover:text-red-500"
              >
                ×
              </button>
            </div>
            <label className="block mb-4 font-semibold">Pilih Poktan:</label>
            <Select
              options={poktanAll}
              value={
                poktanAll.find(
                  (x) =>
                    x.value === (formValues.poktanId || selectedPoktan?.value)
                ) || null
              }
              isDisabled={lockPoktan}
              className="mb-6"
              onChange={(option) => {
                setSelectedPoktan(option);
                setFormValues((prev) => ({
                  ...prev,
                  poktanId: option?.value || null,
                }));
                setLockPoktan(!!option);
              }}
            />
            <div className="overflow-x-auto rounded-lg">
              <table className="w-full text-sm text-gray-700">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 w-1/3 text-left">Kriteria</th>
                    <th className="px-4 py-2 text-left">Pilihan</th>
                  </tr>
                </thead>
                <tbody>
                  {kriteriaAll.map((krt) => (
                    <tr key={krt.id_kriteria} className="bg-white">
                      <td className="px-4 py-2 font-medium">{krt.kriteria}</td>
                      <td className="px-4 py-2">
                        {parameterAll.filter(
                          (p) => p.id_kriteria.toString() === krt.id_kriteria.toString()
                        ).length === 0 ? (
                          <span className="text-gray-400">
                            Tidak ada parameter
                          </span>
                        ) : (
                          parameterAll
                            .filter(
                              (param) => param.id_kriteria.toString() === krt.id_kriteria.toString()
                            )
                            .map((param) => (
                              <label
                                key={param.id_parameter}
                                className="inline-flex items-center mr-6"
                              >
                                <input
                                  type="radio"
                                  name={krt.id_kriteria}
                                  value={param.id_parameter}
                                  checked={
                                    formValues[krt.id_kriteria]?.toString() ===
                                    param.id_parameter.toString()
                                  }
                                  onChange={() =>
                                    handleFormChange(
                                      krt.id_kriteria,
                                      param.id_parameter
                                    )
                                  }
                                  disabled={loading}
                                />
                                <span className="ml-1">
                                  {param.keterangan}
                                  <span className="text-xs text-gray-500 ml-1">
                                    (Nilai: {param.nilai})
                                  </span>
                                </span>
                              </label>
                            ))
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={closePopup}
                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                disabled={loading}
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
