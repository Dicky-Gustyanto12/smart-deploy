import TablePoktan from "../components/TablePoktan";

export default function DataPoktan() {
  return (
    <section>
      <div className="bg-white shadow p-4 md:p-6 rounded text-black">
        <h1 className="text-lg md:text-2xl font-bold mb-4 text-center">
          DATA INFORMASI KELOMPOK TANI KABUPATEN KLATEN
        </h1>
        <TablePoktan />
      </div>
    </section>
  );
}
