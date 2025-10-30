import TableStatusAlsintan from "../components/TableStatusAlsintan";
import TablePengajuanStatus from "../components/TablePengajuanStatus";
import FormPengajuanBaru from "../components/FormPengajuanBaru";
import TableRekapStatus from "../components/TableRekapStatus";

export default function DataPenilaian() {
  return (
    <section>
      <div className="bg-white shadow p-4 md:p-6 rounded text-black">
        <h1 className="text-lg md:text-2xl font-bold mb-4 text-center ">
          STATUS PENERIMAAN ALSINTAN
        </h1>
        <TablePengajuanStatus />
      </div>
    </section>
  );
}
