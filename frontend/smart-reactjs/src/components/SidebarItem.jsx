import { Link, useLocation } from "react-router-dom";

export default function SidebarItem({ to, label, icon }) {
  const { pathname } = useLocation();
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors duration-200 hover:bg-gray-700
        ${pathname === to ? "bg-gray-700 font-semibold" : ""}`}
      >
        {icon}
        <span>{label}</span>
      </Link>
    </li>
  );
}
