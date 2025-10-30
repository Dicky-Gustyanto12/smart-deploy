import TableHasilRekomendasi from "../components/TableHasilRekomendasi";
import TableCmaxmin from "../components/TableCmaxmin";
import TableNormalisasi from "../components/TableNormalisasi";
import TableSkor from "../components/TableSkor";

export default function DataHasilRekomendasi() {
  return (
    <section className="">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-lg p-6 md:p-10 rounded-xl mb-8 text-gray-800">
          <h1 className="text-2xl md:text-3xl font-black mb-8 tracking-tight text-center text-gray-800">
            DATA HASIL REKOMENDASI
          </h1>
          <div className="flex flex-col gap-12">
            <div>
              <TableHasilRekomendasi />
            </div>
            <h1 className="text-2xl md:text-2xl font-black mt-5 mb-0 tracking-tight text-center text-gray-800">
              DETAIL PERHITUNGAN METODE SMART
            </h1>
            <div>
              <TableCmaxmin />
            </div>
            <div>
              <TableNormalisasi />
            </div>
            <div>
              <TableSkor />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
