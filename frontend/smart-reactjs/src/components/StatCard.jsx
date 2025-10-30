import React, { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import CountUp from "react-countup";

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

  useEffect(() => {
    fetch("https://api.alsindata.id/api/pengajuan")
      .then((res) => res.json())
      .then((data) => {
        const initial = { Diterima: 0, Proses: 0, Dibatalkan: 0 };
        for (const d of data) {
          if (initial[d.status] !== undefined) initial[d.status]++;
        }
        setCounts(initial);
      });
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
        <div key={idx} className={`rounded-xl shadow-sm p-6 ${c.bg} flex-1`}>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-white">{c.title}</span>
            {c.icon}
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            <CountUp
              end={c.value}
              duration={1.5}       // durasi animasi 1.5 detik
              separator=""         // tidak ada koma
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusAlsintanWidgetFullWidth;
