import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika autentikasi
    navigate("/dashboard");
  };

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row bg-[#2c342f] items-stretch overflow-hidden">
      {/* Kiri: Form Login */}
      <div className="flex-1 flex justify-center items-center bg-[#2c342f]">
        <div className="bg-white rounded-3xl shadow-lg md:p-16 p-8 w-full max-w-lg">
          {/* Logo */}
          <img
            src="logo.png"
            alt="Logo Alsindata"
            className="w-36 mx-auto mb-8"
          />
          <div className="text-2xl font-bold text-center -mt-7 mb-4 text-[#5a6560]">
            LOGIN
          </div>
          <div className="text-sm text-[#6b776a] mb-8 text-center">
            Login untuk mengakses website sistem bantuan alat dan mesin
            pertanian Dinas Ketahanan Pangan dan Pertanian Kabupaten Klaten <br /> <br />
            Akun Website : <br />
            Email : alsindata@gmail.com <br />
            Password : alsindata123
          </div>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 font-semibold text-[#2c342f]">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="Email"
                className="w-full px-5 py-3 rounded-lg border border-[#b7c6bc] bg-[#f5f7f5] text-black font-light text-base focus:outline-none focus:ring-2 focus:ring-[#9bada4]"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-[#2c342f]">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="***"
                className="w-full px-5 py-3 rounded-lg border border-[#b7c6bc] bg-[#f5f7f5] text-black font-light text-base focus:outline-none focus:ring-2 focus:ring-[#9bada4]"
              />
            </div>
            <button
              type="submit"
              className="cursor-pointer w-full py-4 rounded-lg bg-[#9bada4] hover:bg-[#7a9081] text-white font-bold text-xl shadow transition-colors"
            >
              Masuk
            </button>
          </form>
          <div className="text-xs text-[#6b776a] mt-6 text-center">
            &copy; {new Date().getFullYear()} Alsindata
          </div>
        </div>
      </div>
      {/* Kanan: Gambar bg, hanya tampil di desktop */}
      <div className="hidden md:block w-1/2 min-h-full relative overflow-hidden rounded-l-3xl">
        <img
          src="alsintan.jpg"
          alt="alsintan"
          className="w-full h-full object-cover rounded-l-3xl"
        />
        <div className="absolute inset-0 bg-black opacity-30 rounded-l-3xl"></div>
      </div>
    </div>
  );
}
