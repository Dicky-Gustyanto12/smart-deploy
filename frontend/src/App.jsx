import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import EditProfil from "./pages/EditProfil";
import Dashboard from "./pages/Dashboard";
import RekapDataPengajuan from "./pages/RekapDataPengajuan";
import DataKriteria from "./pages/DataKriteria";
import DataPenilaian from "./pages/DataPenilaian";
import DataHasilRekomendasi from "./pages/DataHasilRekomendasi";
import StatusAlsintan from "./pages/StatusAlsintan";
import DataPoktan from "./pages/DataPoktan";
import Endpoint from "./components/Endpoint";

function LayoutWithSidebar() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-0 md:p-8 p-4 max-w-full bg-[#dfdfdf]">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Route login (public) */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          {/* Routes dengan sidebar & proteksi */}
          <Route
            element={
              <ProtectedRoute>
                <LayoutWithSidebar />
              </ProtectedRoute>
            }
          >
            <Route path="edit-profil" element={<EditProfil />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="rekap" element={<RekapDataPengajuan />} />
            <Route path="kriteria" element={<DataKriteria />} />
            <Route path="penilaian" element={<DataPenilaian />} />
            <Route path="hasil" element={<DataHasilRekomendasi />} />
            <Route path="status-alsintan" element={<StatusAlsintan />} />
            <Route path="poktan" element={<DataPoktan />} />
            <Route path="endpoint" element={<Endpoint />} />
            {/* Redirect jika route tidak ditemukan */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
  