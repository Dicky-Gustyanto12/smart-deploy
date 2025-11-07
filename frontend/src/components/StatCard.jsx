import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import CountUp from "react-countup";

// Axios instance untuk Bearer token (ambil dari sessionStorage)
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

// Icon mapping, gunakan komponen agar tidak error hydration split
const iconMap = {
  Diterima: <CheckCircleIcon className="w-6 h-6 text-white" />,
  Proses: <ClockIcon className="w-6 h-6 text-white" />,
  Dibatalkan: <XCircleIcon className="w-6 h-6 text-white" />,
};

const cardStyles = {
  Diterima: "bg-[#9bada0]",
  Proses: "bg-[#fda366]",
  Dibatalkan: "bg-red-400",
};

const StatusAlsintanWidgetFullWidth = () => {
  const [counts, setCounts] = useState({
    Diterima: 0,
    Proses: 0,
    Dibatalkan: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("/pengajuan")
      .then((res) => {
        const initial = { Diterima: 0, Proses: 0, Dibatalkan: 0 };
        for (const d of res.data || []) {
          // Unifikasi untuk status typo/inkonsistensi
          if (d.status === "Dibatalkan" || d.status === "Batal")
            initial.Dibatalkan++;
          else if (initial[d.status] !== undefined) initial[d.status]++;
        }
        setCounts(initial);
      })
      .catch(() => setCounts({ Diterima: 0, Proses: 0, Dibatalkan: 0 }))
      .finally(() => setLoading(false));
  }, []);

  const cardData = [
    {
      title: "Diterima",
      value: counts.Diterima,
      icon: iconMap.Diterima,
      bg: cardStyles.Diterima,
    },
    {
      title: "Proses",
      value: counts.Proses,
      icon: iconMap.Proses,
      bg: cardStyles.Proses,
    },
    {
      title: "Dibatalkan",
      value: counts.Dibatalkan,
      icon: iconMap.Dibatalkan,
      bg: cardStyles.Dibatalkan,
    },
  ];

  return (
    <div className="flex gap-6 w-full">
      {cardData.map((c, idx) => (
        <div key={idx} className={`rounded-xl shadow-sm p-6 ${c.bg} flex-1 min-w-[180px]`}>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-white">{c.title}</span>
            {c.icon}
          </div>
          <div className="text-3xl font-bold text-white mb-2 h-[38px] flex items-center">
            {loading ? (
              <span className="text-base text-gray-100 animate-pulse">Memuat...</span>
            ) : (
              <CountUp end={c.value} duration={1.5} separator="" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusAlsintanWidgetFullWidth;
