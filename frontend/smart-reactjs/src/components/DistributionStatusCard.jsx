// AlsintanStatusCard.jsx
import React from "react";

const statusData = [
  { label: "Diterima", value: 76 },
  { label: "Proses", value: 15 },
  { label: "Dibatalkan", value: 3 },
];

const AlsintanStatusCard = () => (
  <div className="bg-green-200 rounded-3xl p-5 shadow-md  max-w-full ">
    <div className="flex items-center mb-6 text-center">
      <div>
        <div className="text-black font-bold text-xl ">
          Status Permintaan Alsintan
        </div>
      </div>
    </div>
    <div className="flex justify-between">
      {statusData.map((st, idx) => (
        <div key={idx} className="flex-1 text-center">
          <div className="text-black text-xs mb-1">{st.label}</div>
          <div className="text-black font-bold text-lg">{st.value}</div>
        </div>
      ))}
    </div>
  </div>
);

export default AlsintanStatusCard;
