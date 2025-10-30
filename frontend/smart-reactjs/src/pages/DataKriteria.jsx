import TableKriteria from "../components/TableKriteria";
import TableParameter from "../components/TableParameter";

export default function DataKriteria() {
  return (
    <div className="bg-white shadow p-4 md:p-6 rounded text-black">
      <h1 className="text-lg text-black md:text-2xl font-bold mb-4 text-center">
        LIST KRITERIA DAN BOBOT
      </h1>
      <TableKriteria />
      <TableParameter />
    </div>
  );
}
