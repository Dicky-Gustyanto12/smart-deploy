import { useState, useEffect } from "react";
import axios from "axios";

// Axios instance with Bearer Token
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

function TableSkeleton({ rows = 2, cols = 5 }) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, idx) => (
        <tr key={idx} className="animate-pulse">
          {Array.from({ length: cols }).map((_, col) => (
            <td key={col} className="py-4 px-6">
              <div className="h-4 bg-[#e5e7eb] rounded w-full"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default function TablePenilaianSimple() {
  const [poktanMap, setPoktanMap] = useState({});
  const [penilaianAll, setPenilaianAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [kriteriaAll, setKriteriaAll] = useState([]);
  const [parameterAll, setParameterAll] = useState([]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get("/poktan"),
      api.get("/penilaian"),
      api.get("/kriteria"),
      api.get("/parameter"),
    ])
      .then(([poktanRes, penilaianRes, kriteriaRes, parameterRes]) => {
        setPoktanMap(Object.fromEntries(
          (poktanRes.data || []).map((p) => [p.id_poktan, p.nama_poktan])
        ));
        setPenilaianAll(penilaianRes.data || []);
        setKriteriaAll(kriteriaRes.data || []);
        setParameterAll(parameterRes.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const paramMap = Object.fromEntries(parameterAll.map((p) => [p.id_parameter, p]));
  const getDetailObj = (details, id_kriteria) => details?.[id_kriteria] ?? {};
  const getCellValue = (item, id_kriteria) => {
    const detail = getDetailObj(item.details, id_kriteria);
    if (!detail || !detail.id_parameter) return "";
    const nilai = paramMap[detail.id_parameter]?.nilai;
    return nilai !== undefined && nilai !== null ? nilai : "";
  };
  const getNamaPoktan = (id_poktan) => poktanMap[id_poktan] || "";

  // Cmax/Cmin/Utilitas
  const getCmax = (id_kriteria) => {
    const vals = penilaianAll.map(item => Number(getCellValue(item, id_kriteria))).filter(n => !isNaN(n));
    return vals.length ? Math.max(...vals) : '';
  };
  const getCmin = (id_kriteria) => {
    const vals = penilaianAll.map(item => Number(getCellValue(item, id_kriteria))).filter(n => !isNaN(n));
    return vals.length ? Math.min(...vals) : '';
  };
  const getCmaxMin = (id_kriteria) => {
    const cmax = getCmax(id_kriteria);
    const cmin = getCmin(id_kriteria);
    if (cmax === '' || cmin === '') return '';
    return cmax - cmin;
  };
  const getUtilitas = (item, id_kriteria) => {
    const Cmax = getCmax(id_kriteria);
    const Cmin = getCmin(id_kriteria);
    const Cout = Number(getCellValue(item, id_kriteria));
    if (Cmax === '' || Cmin === '' || isNaN(Cout)) return '';
    const pembagi = Cmax - Cmin;
    if (pembagi === 0) return 0;
    return ((Cout - Cmin) / pembagi).toFixed(2);
  };
  // Bobot dinamis
  const getBobotKriteria = (id_kriteria) => {
    const krt = kriteriaAll.find(k => k.id_kriteria === id_kriteria);
    return krt ? Number(krt.bobot) : 0;
  };
  // Perhitungan row SMART
  const getNilaiAkhirRow = (item) => {
    let total = 0;
    let detail = kriteriaAll.map((krt) => {
      const util = Number(getUtilitas(item, krt.id_kriteria));
      const bobot = getBobotKriteria(krt.id_kriteria);
      const perkalian = (util * bobot).toFixed(2);
      total += Number(perkalian);
      return {
        kode: krt.kode,
        util,
        bobot,
        perkalian
      };
    });
    return { detail, total: total.toFixed(2) };
  };

  return (
    <div className="w-full px-0 max-w-none mt-1">
      {/* Tabel Hasil Penilaian */}
      <div className="mb-8">
        <label className="font-bold text-xl mb-2 block">Tabel Cmax Cmin</label>
        <div className="bg-white rounded-xl shadow-sm w-full">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#e5e7eb]">
                <th className="px-6 py-3 text-left font-semibold">No</th>
                <th className="px-6 py-3 text-left font-semibold">Kode Poktan</th>
                <th className="px-6 py-3 text-left font-semibold">Nama Poktan</th>
                {kriteriaAll.map((krt) => (
                  <th key={krt.id_kriteria} className="px-6 py-3 text-center font-semibold">
                    {krt.kode ? `${krt.kode} - ` : ""}
                    {krt.kriteria}
                  </th>
                ))}
              </tr>
            </thead>
            {loading ? (
              <TableSkeleton rows={3} cols={3 + kriteriaAll.length} />
            ) : (
              <tbody>
                {penilaianAll.length === 0 && (
                  <tr>
                    <td colSpan={3 + kriteriaAll.length} className="px-6 py-5 text-center text-gray-500">
                      Belum ada poktan yang sudah dinilai
                    </td>
                  </tr>
                )}
                {penilaianAll.map((item, idx) => (
                  <tr key={item.id_penilaian} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-3 text-left">{idx + 1}</td>
                    <td className="px-6 py-3 text-left">{item.id_poktan}</td>
                    <td className="px-6 py-3 text-left">{getNamaPoktan(item.id_poktan)}</td>
                    {kriteriaAll.map((krt) => {
                      const val = getCellValue(item, krt.id_kriteria);
                      return (
                        <td key={krt.id_kriteria} className="px-6 py-3 text-center">
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {/* Kolom Cmax */}
                <tr className="bg-gray-100 font-semibold">
                  <td className="px-6 py-3 text-left" colSpan={3}>Cmax</td>
                  {kriteriaAll.map((krt) => (
                    <td key={krt.id_kriteria} className="px-6 py-3 text-center text-black">{getCmax(krt.id_kriteria)}</td>
                  ))}
                </tr>
                {/* Kolom Cmin */}
                <tr className="bg-gray-100 font-semibold">
                  <td className="px-6 py-3 text-left" colSpan={3}>Cmin</td>
                  {kriteriaAll.map((krt) => (
                    <td key={krt.id_kriteria} className="px-6 py-3 text-center text-black">{getCmin(krt.id_kriteria)}</td>
                  ))}
                </tr>
                {/* Kolom Cmax - Cmin */}
                <tr className="bg-gray-100 font-semibold">
                  <td className="px-6 py-3 text-left" colSpan={3}>Cmax - Cmin</td>
                  {kriteriaAll.map((krt) => (
                    <td key={krt.id_kriteria} className="px-6 py-3 text-center text-black">{getCmaxMin(krt.id_kriteria)}</td>
                  ))}
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
      {/* Tabel Utilitas */}
      <div className="mt-8">
        <label className="font-bold text-lg mb-2 block">Tabel Perhitungan Utilitas Poktan</label>
        <div className="bg-white rounded-xl shadow-sm w-full">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#e5e7eb]">
                <th className="px-6 py-3 text-left font-semibold">Kode Poktan</th>
                <th className="px-6 py-3 text-left font-semibold">Nama Poktan</th>
                {kriteriaAll.map((krt) => (
                  <th key={krt.id_kriteria} className="px-6 py-3 text-center font-semibold">{krt.kode ? krt.kode : ""}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {penilaianAll.length === 0 && (
                <tr>
                  <td colSpan={2 + kriteriaAll.length} className="px-6 py-5 text-center text-gray-500">
                    Belum ada poktan yang sudah dinilai
                  </td>
                </tr>
              )}
              {penilaianAll.map((item, idx) => (
                <tr key={"util_" + item.id_penilaian} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-6 py-3 text-left">{item.id_poktan}</td>
                  <td className="px-6 py-3 text-left">{getNamaPoktan(item.id_poktan)}</td>
                  {kriteriaAll.map((krt) => (
                    <td key={krt.id_kriteria} className="px-6 py-3 text-center">
                      {getUtilitas(item, krt.id_kriteria)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Tabel Nilai Akhir SMART */}
      <div className="mt-8">
        <label className="font-bold text-lg mb-2 block">Tabel Nilai Akhir Metode SMART</label>
        <div className="bg-white rounded-xl shadow-sm w-full">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#e5e7eb]">
                <th className="px-6 py-3 text-left font-semibold">Kode Poktan</th>
                <th className="px-6 py-3 text-left font-semibold">Nama Poktan</th>
                {kriteriaAll.map((krt) => (
                  <th key={krt.id_kriteria} className="px-6 py-3 text-center font-semibold">{krt.kode}</th>
                ))}
                <th className="px-6 py-3 text-center font-semibold">Total Nilai Akhir</th>
              </tr>
            </thead>
            <tbody>
              {penilaianAll.length === 0 && (
                <tr>
                  <td colSpan={2 + kriteriaAll.length + 1} className="px-6 py-5 text-center text-gray-500">
                    Belum ada poktan yang sudah dinilai
                  </td>
                </tr>
              )}
              {penilaianAll.map((item, idx) => {
                const result = getNilaiAkhirRow(item);
                return (
                  <tr key={"smart_" + item.id_penilaian} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-3 text-left font-bold">{item.id_poktan}</td>
                    <td className="px-6 py-3 text-left">{getNamaPoktan(item.id_poktan)}</td>
                    {result.detail.map((d, dIdx) => (
                      <td key={"kriteria_"+d.kode} className="px-6 py-3 text-center">
                        {`${d.util} x ${d.bobot} = ${d.perkalian}`}
                      </td>
                    ))}
                    <td className="px-6 py-3 text-center font-bold">{result.total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
