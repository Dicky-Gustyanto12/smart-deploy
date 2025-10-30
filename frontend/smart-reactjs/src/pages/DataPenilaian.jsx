import TablePenilaian from "../components/TablePenilaian";

export default function DataPenilaian() {
  return (
    <section>
      <div className="bg-white shadow p-4 md:p-6 rounded text-black">
        <h1 className="text-lg md:text-2xl font-bold mb-4 text-center ">
          PERHITUNGAN PENILAIAN KRITERIA DAN BOBOT KELOMPOK TANI
        </h1>
        <TablePenilaian />
      </div>
    </section>
  );
}
