import { useState } from "react";
import Swal from "sweetalert2";

export default function FormPengajuanBaru({ id_poktan, nama_poktan }) {
  const [form, setForm] = useState({
    id_poktan: id_poktan || "",
    nama_poktan: nama_poktan || "",
    nama_barang: "",
    merek: "",
    tipe: "",
    nama_ketua: "",
    nomor_hp: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/pengajuan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 403) {
        const err = await res.json();
        Swal.fire("Tidak Bisa!", err.message, "error");
      } else if (!res.ok) {
        throw new Error("Gagal submit pengajuan!");
      } else {
        Swal.fire("Berhasil!", "Pengajuan berhasil dikirim.", "success");
        setForm({
          ...form,
          nama_barang: "",
          merek: "",
          tipe: "",
          nama_ketua: "",
          nomor_hp: "",
        });
      }
    } catch (e) {
      Swal.fire("Error!", e.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 shadow rounded max-w-lg bg-white"
    >
      <div className="mb-2">
        <label className="block">Nama Barang</label>
        <input
          type="text"
          name="nama_barang"
          value={form.nama_barang}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="mb-2">
        <label className="block">Merek</label>
        <input
          type="text"
          name="merek"
          value={form.merek}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="mb-2">
        <label className="block">Tipe</label>
        <input
          type="text"
          name="tipe"
          value={form.tipe}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="mb-2">
        <label className="block">Nama Ketua</label>
        <input
          type="text"
          name="nama_ketua"
          value={form.nama_ketua}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="mb-2">
        <label className="block">Nomor HP</label>
        <input
          type="text"
          name="nomor_hp"
          value={form.nomor_hp}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Mengirim..." : "Kirim Pengajuan"}
      </button>
    </form>
  );
}
