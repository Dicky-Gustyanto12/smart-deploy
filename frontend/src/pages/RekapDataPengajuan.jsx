import TableRekapStatus from "../components/TableRekapStatus";

export default function RekapDataPengajuan() {
  return (
    <section>
      <div className="bg-white shadow p-4 md:p-6 rounded text-black">
        <h1 className="text-lg md:text-2xl font-bold mb-4 text-center">
          DATA REKAP PENERIMAAN ALSINTAN
        </h1>
        <div>
          <TableRekapStatus />
        </div>
      </div>
    </section>
  );
}
