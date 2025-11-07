<?php

namespace App\Http\Controllers;

use App\Models\Poktan;
use Illuminate\Http\Request;

class PoktanController extends Controller
{
    public function index()
    {
        return response()->json(Poktan::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_poktan' => 'required',
            'desa' => 'required',
            'kecamatan' => 'required',
            'nama_ketua' => 'required',
            'nik' => 'required',
            'nomor_hp' => 'required',
        ]);
        // id_poktan jangan dikirim dari frontend, biarkan Model generate PK
        $poktan = Poktan::create($request->only([
            'nama_poktan',
            'desa',
            'kecamatan',
            'nama_ketua',
            'nik',
            'nomor_hp'
        ]));
        return response()->json($poktan, 201);
    }

    public function show($id)
    {
        $poktan = Poktan::findOrFail($id);
        return response()->json($poktan);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_poktan' => 'required',
            'desa' => 'required',
            'kecamatan' => 'required',
            'nama_ketua' => 'required',
            'nik' => 'required',
            'nomor_hp' => 'required',
        ]);
        $poktan = Poktan::findOrFail($id);
        $poktan->update($request->only([
            'nama_poktan',
            'desa',
            'kecamatan',
            'nama_ketua',
            'nik',
            'nomor_hp'
        ]));
        return response()->json($poktan);
    }

    public function destroy($id)
    {
        Poktan::destroy($id);
        return response()->json(null, 204);
    }
}
