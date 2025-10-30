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
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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

  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Yakin ingin logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        // Aksi logout di sini, misal hapus token dsb
        navigate("/");
      }
    });
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

      {/* Navbar Akun Profil (klik menuju edit profil) */}
      <Link
        to=""
        className="mb-10 p-3 bg-gray-900 rounded-2xl flex items-center gap-3 hover:bg-gray-700 transition"
      >
        <UserCircleIcon className="h-10 w-10 rounded-2xl bg-gray-700 p-1" />
        <div>
          <p className="font-semibold text-lg">Admin</p>
          <p className="text-gray-400 text-sm">Alsindata@gmail.com</p>
        </div>
      </Link>

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
