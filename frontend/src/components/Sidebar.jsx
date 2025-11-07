import {
  HomeIcon,
  DocumentTextIcon,
  Squares2X2Icon,
  ClipboardDocumentListIcon,
  CheckBadgeIcon,
  UsersIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../contexts/AuthContext";

const menu = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    to: "/poktan",
    label: "Data Kelompok Tani",
    icon: <UsersIcon className="h-5 w-5" />,
  },
  {
    to: "/kriteria",
    label: "Kriteria",
    icon: <Squares2X2Icon className="h-5 w-5" />,
  },
  {
    to: "/penilaian",
    label: "Penilaian",
    icon: <ClipboardDocumentListIcon className="h-5 w-5" />,
  },
  {
    to: "/hasil",
    label: "Hasil Rekomendasi",
    icon: <CheckBadgeIcon className="h-5 w-5" />,
  },
  {
    to: "/status-alsintan",
    label: "Pengajuan & Status Penerimaan Alsintan",
    icon: <UsersIcon className="h-5 w-5" />,
  },
  {
    to: "/rekap",
    label: "Data Rekap Penerimaan Alsintan",
    icon: <DocumentTextIcon className="h-5 w-5" />,
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout, user } = useAuth(); // user diambil dari context

  const handleLogout = async (e) => {
    e.preventDefault();
    const result = await Swal.fire({
      title: "Yakin ingin logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    });
    if (result.isConfirmed) {
      try {
        await logout();
        navigate("/");
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Logout gagal",
          text: err?.response?.data?.message || err.message || "Unknown error",
        });
      }
    }
  };

  return (
    <aside className="bg-[#2c342f] text-white w-64 min-h-screen p-4 pt-6 flex flex-col ">
      {/* Logo */}
      <div className="mb-6 flex justify-center">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-20 w-auto object-contain rounded-2xl"
        />
      </div>

      {/* Navbar Akun Profil (non-clickable) */}
      <div className="mb-10 p-3 bg-gray-900 rounded-2xl flex items-center gap-3 cursor-default select-none hover:bg-gray-700 transition">
        <UserCircleIcon className="h-10 w-10 rounded-2xl bg-gray-700 p-1" />
        <div>
          <p className="font-semibold text-lg">
            {user?.name ? user.name : "Admin"}
          </p>
          <p className="text-gray-400 text-sm">
            {user?.email ? user.email : ""}
          </p>
        </div>
      </div>

      {/* Menu Sidebar */}
      <nav className="flex-1">
        <ul>
          {menu.map((item) => (
            <SidebarItem
              key={item.to}
              to={item.to}
              label={item.label}
              icon={item.icon}
            />
          ))}

          {/* Logout dengan konfirmasi SweetAlert */}
          <li>
            <a
              href="/"
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-700 cursor-pointer"
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5" />
              <span className="text-white">Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
