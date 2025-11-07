import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // State modal lupa password
  const [forgotModal, setForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1: email, 2: kode otp, 3: ubah password, 4: konfirmasi
  const [fpEmail, setFpEmail] = useState("");
  const [fpCode, setFpCode] = useState("");
  const [fpSent, setFpSent] = useState(false);
  const [fpNewPwd, setFpNewPwd] = useState("");
  const [fpConfirmPwd, setFpConfirmPwd] = useState("");

  // Handler submit login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      navigate("/dashboard", { replace: true });
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  // Handler lupa password step 1: email
  const handleForgotEmailSubmit = async (e) => {
    e.preventDefault();
    if (!fpEmail) return;
    setFpSent(false);
    try {
      // Request backend kirim kode OTP ke email
      // Ganti URL sesuai endpoint-mu
      await fetch("http://localhost:8000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: fpEmail }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Gagal mengirim kode. Email tidak terdaftar?");
          return res.json();
        });
      setFpSent(true);
      setForgotStep(2);
      Swal.fire("Terkirim!", "Kode verifikasi sudah dikirim ke email kamu.", "success");
    } catch (err) {
      Swal.fire("Gagal", err.message, "error");
    }
  };

  // Handler submit kode OTP
  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    if (!fpCode) return;
    // Validasi kode ke backend (ganti URL sesuai endpoint-mu)
    try {
      let res = await fetch("http://localhost:8000/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: fpEmail, code: fpCode }),
      });
      if (!res.ok) throw new Error("Kode verifikasi salah atau sudah expired.");
      setForgotStep(3);
      Swal.fire("Berhasil", "Kode verifikasi benar. Silakan buat password baru.", "success");
    } catch (e) {
      Swal.fire("Kode Salah", e.message, "error");
    }
  };

  // Submit new password
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!fpNewPwd || !fpConfirmPwd)
      return Swal.fire("Error", "Mohon isi semua field.", "warning");
    if (fpNewPwd.length < 6)
      return Swal.fire("Error", "Password minimal 6 karakter.", "warning");
    if (fpNewPwd !== fpConfirmPwd)
      return Swal.fire("Error", "Konfirmasi password tidak sama.", "warning");

    setForgotStep(4);
  };

  // Konfirmasi password baru
  const handleChangePasswordConfirm = async (yn) => {
    if (!yn) {
      setForgotStep(3);
      return;
    }
    try {
      let res = await fetch("http://localhost:8000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email: fpEmail,
          code: fpCode,
          password: fpNewPwd,
        }),
      });
      if (!res.ok)
        throw new Error("Gagal update password. Pastikan kode & email benar!");
      Swal.fire("Berhasil", "Password berhasil diubah!", "success");
      setForgotModal(false);
      setForgotStep(1);
      setFpEmail("");
      setFpCode("");
      setFpNewPwd("");
      setFpConfirmPwd("");
    } catch (e) {
      Swal.fire("Gagal", e.message, "error");
      setForgotStep(3);
    }
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
            pertanian Dinas Ketahanan Pangan dan Pertanian Kabupaten Klaten{" "}
            <br /> <br />
            Akun Website : <br />
            Email : alsindata@gmail.com <br />
            Password : dkpp2025
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 font-semibold text-[#2c342f]">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full px-5 py-3 rounded-lg border border-[#b7c6bc] bg-[#f5f7f5] text-black font-light text-base focus:outline-none focus:ring-2 focus:ring-[#9bada4] disabled:opacity-50"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full px-5 py-3 rounded-lg border border-[#b7c6bc] bg-[#f5f7f5] text-black font-light text-base focus:outline-none focus:ring-2 focus:ring-[#9bada4] disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full py-4 rounded-lg bg-[#9bada4] hover:bg-[#7a9081] text-white font-bold text-xl shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </>
              ) : (
                "Masuk"
              )}
            </button>
          </form>

          {/* Lupa password link */}
          {/* <div className="text-sm mt-5 text-center">
            <button
              onClick={() => setForgotModal(true)}
              className="text-[#2c342f] font-bold cursor-pointer hover:text-[#5a6560]"
              type="button"
            >
              Lupa Password?
            </button>
          </div> */}

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

      {/* Modal Forgot Password */}
      {forgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm relative">

            {/* Close button */}
            <button
              className="absolute top-2 right-3 text-xl text-gray-500 hover:text-red-400"
              onClick={() => {
                setForgotModal(false);
                setForgotStep(1);
                setFpEmail("");
                setFpCode("");
                setFpSent(false);
                setFpNewPwd("");
                setFpConfirmPwd("");
              }}
            >
              ×
            </button>

            {/* Step 1: Input Email */}
            {forgotStep === 1 && (
              <>
                <div className="font-bold text-xl mb-4 text-[#2c342f]">Lupa Password</div>
                <form onSubmit={handleForgotEmailSubmit}>
                  <label className="block mb-2 text-black">Masukkan Email</label>
                  <input
                    type="email"
                    className="w-full rounded px-4 py-2 border text-black border-gray-300 mb-4"
                    placeholder="Masukkan email anda"
                    value={fpEmail}
                    onChange={(e) => setFpEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="w-full py-2 rounded bg-[#9bada4] text-white font-bold hover:bg-[#7a9081]"
                  >
                    Kirim Kode Verifikasi
                  </button>
                </form>
              </>
            )}

            {/* Step 2: Input Kode OTP */}
            {forgotStep === 2 && (
              <>
                <div className="font-bold text-xl mb-4 text-[#2c342f]">Verifikasi Email</div>
                <form onSubmit={handleCodeSubmit}>
                  <label className="block mb-2">Masukkan kode verifikasi yang dikirim ke email:</label>
                  <input
                    type="text"
                    className="w-full rounded px-4 py-2 border border-gray-300 mb-4"
                    placeholder="Kode verifikasi"
                    value={fpCode}
                    onChange={(e) => setFpCode(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="w-full py-2 rounded bg-[#9bada4] text-white font-bold hover:bg-[#7a9081]"
                  >
                    Verifikasi Kode
                  </button>
                </form>
              </>
            )}

            {/* Step 3: Input password baru */}
            {forgotStep === 3 && (
              <>
                <div className="font-bold text-xl mb-4 text-[#2c342f]">Ganti Password Baru</div>
                <form onSubmit={handlePasswordSubmit}>
                  <label className="block mb-1">Password Baru</label>
                  <input
                    type="password"
                    className="w-full rounded px-4 py-2 border border-gray-300 mb-2"
                    value={fpNewPwd}
                    onChange={(e) => setFpNewPwd(e.target.value)}
                    placeholder="Password baru"
                    required
                  />
                  <label className="block mb-1">Konfirmasi Password Baru</label>
                  <input
                    type="password"
                    className="w-full rounded px-4 py-2 border border-gray-300 mb-4"
                    value={fpConfirmPwd}
                    onChange={(e) => setFpConfirmPwd(e.target.value)}
                    placeholder="Konfirmasi password baru"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full py-2 rounded bg-[#9bada4] text-white font-bold hover:bg-[#7a9081]"
                  >
                    Ubah Password
                  </button>
                </form>
              </>
            )}

            {/* Step 4: Konfirmasi ganti password */}
            {forgotStep === 4 && (
              <>
                <div className="font-bold text-xl mb-4 text-[#2c342f]">
                  Yakin ingin mengubah password?
                </div>
                <div className="flex gap-4 mt-6 justify-end">
                  <button
                    className="px-6 py-2 rounded bg-gray-100 hover:bg-gray-200"
                    onClick={() => handleChangePasswordConfirm(false)}
                  >
                    Tidak
                  </button>
                  <button
                    className="px-6 py-2 rounded bg-[#9bada4] text-white font-bold hover:bg-[#7a9081]"
                    onClick={() => handleChangePasswordConfirm(true)}
                  >
                    Ya
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
