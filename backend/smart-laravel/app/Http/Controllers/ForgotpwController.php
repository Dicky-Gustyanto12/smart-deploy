<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Forgotpassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;

class ForgotpwController extends Controller
{
    // 1. Kirim kode ke email
    public function sendCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);
        $user = User::where('email', $request->email)->first();
        if (!$user)
            return response()->json(['message' => 'Email tidak terdaftar'], 404);

        // generate kode acak 6 digit
        $code = mt_rand(100000, 999999);

        // simpan ke table
        Forgotpassword::updateOrCreate(
            ['email' => $request->email],
            ['code' => $code, 'created_at' => now()]
        );

        // kirim email (pakai Mail facade sederhana)
        Mail::raw("Kode verifikasi reset password Anda: $code", function ($message) use ($request) {
            $message->to($request->email)->subject('Kode Reset Password Alsindata');
        });

        return response()->json(['message' => 'Kode verifikasi sudah dikirim ke email.']);
    }

    // 2. Verifikasi kode
    public function verifyCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required'
        ]);
        $reset = Forgotpassword::where('email', $request->email)
            ->where('code', $request->code)->first();

        if (!$reset)
            return response()->json(['message' => 'Kode verifikasi salah.'], 400);

        // Cek expired kode (misal 10 menit)
        if (Carbon::parse($reset->created_at)->addMinutes(10)->isPast()) {
            return response()->json(['message' => 'Kode verifikasi sudah kadaluarsa.'], 400);
        }
        return response()->json(['message' => 'Kode verifikasi cocok!']);
    }

    // 3. Update password
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required',
            'password' => 'required|min:6|confirmed'
        ]);
        $reset = Forgotpassword::where('email', $request->email)
            ->where('code', $request->code)->first();
        if (!$reset)
            return response()->json(['message' => 'Kode verifikasi tidak valid.'], 400);

        // Ganti password user
        $user = User::where('email', $request->email)->first();
        if (!$user)
            return response()->json(['message' => 'User tidak ditemukan.'], 404);

        $user->password = Hash::make($request->password);
        $user->save();

        // Hapus kode reset
        $reset->delete();

        return response()->json(['message' => 'Password berhasil diperbarui.']);
    }
}
