import { useState } from "react";
import TableCmaxmin from "./TableCmaxmin";
import TableNormalisasi from "./TableNormalisasi";

export default function HasilSmartPage() {
  const [smartTable, setSmartTable] = useState(null);

  const customSetSmartTable = (data) => {
    if (
      data &&
      Array.isArray(data.matrixRows) &&
      data.matrixRows.length > 0 &&
      Array.isArray(data.kriteriaCodes) &&
      data.kriteriaCodes.length > 0 &&
      Array.isArray(data.cmin) &&
      Array.isArray(data.cmaxmin) &&
      data.kriteriaCodes.length === data.cmin.length &&
      data.kriteriaCodes.length === data.cmaxmin.length
    ) {
      setSmartTable(data);
    }
    // jika data tidak valid, abaikan (jangan reset jadi kosong!)
  };

  return (
    <div>
      <TableCmaxmin onResult={customSetSmartTable} />
      {smartTable && (
        <TableNormalisasi
          matrixRows={smartTable.matrixRows}
          kriteriaCodes={smartTable.kriteriaCodes}
          cmin={smartTable.cmin}
          cmaxmin={smartTable.cmaxmin}
        />
      )}
    </div>
  );
}
