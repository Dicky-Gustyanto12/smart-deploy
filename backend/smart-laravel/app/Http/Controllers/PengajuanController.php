<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pengajuan;

class PengajuanController extends Controller
{
    public function index()
    {
        return response()->json(Pengajuan::all());
    }

    public function update(Request $request, $id_pengajuan)
    {
        $validated = $request->validate([
            'status' => 'required|in:Proses,Diterima,Batal'
        ]);

        $pengajuan = Pengajuan::findOrFail($id_pengajuan);
        $pengajuan->status = $validated['status'];
        $pengajuan->save();

        return response()->json($pengajuan);
    }

    public function store(Request $request)
    {
        $idPoktan = $request->input('id_poktan');
        $latest = Pengajuan::where('id_poktan', $idPoktan)
            ->orderByDesc('created_at')->first();

        if ($latest && $latest->status === 'Proses') {
            return response()->json([
                'message' => 'Pengajuan sebelumnya masih Proses! Tidak bisa mengajukan lagi.'
            ], 403);
        }

        $data = $request->validate([
            'id_poktan' => 'required',
            'nama_poktan' => 'required',
            'nama_barang' => 'required',
            'merek' => 'required',
            'tipe' => 'required',
            'nama_ketua' => 'required',
            'nomor_hp' => 'required',
        ]);
        $data['status'] = 'Proses';

        // Generate ID otomatis
        $latestPJ = Pengajuan::orderByDesc('id_pengajuan')->first();
        $nextNum = $latestPJ ? intval(substr($latestPJ->id_pengajuan, 2)) + 1 : 1;
        $data['id_pengajuan'] = 'PJ' . str_pad($nextNum, 3, '0', STR_PAD_LEFT);

        $pengajuan = Pengajuan::create($data);
        return response()->json($pengajuan, 201);
    }
}

