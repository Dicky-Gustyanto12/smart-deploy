<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Parameter;

class ParameterController extends Controller
{
    // List seluruh parameter beserta relasi kriteria
    public function index()
    {
        // Eager load relasi 'kriteria', order by kriteria.kode dan nilai parameter
        $data = Parameter::with('kriteria')
            ->join('kriteria', 'parameter.id_kriteria', '=', 'kriteria.id_kriteria')
            ->orderBy('kriteria.kode', 'asc')
            ->orderBy('parameter.nilai', 'desc')
            ->select('parameter.*') // Pastikan hanya field parameter, relasi tetap tersedia
            ->get();
        return response()->json($data);
    }

    // Tampilkan satu parameter, termasuk relasi kriteria
    public function show($id)
    {
        $param = Parameter::with('kriteria')->findOrFail($id);
        return response()->json($param);
    }

    // Tambah parameter
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_kriteria'=>'required|exists:kriteria,id_kriteria',
            'keterangan'=>'required',
            'nilai'=>'required|numeric'
        ]);
        $param = Parameter::create($validated);
        // Bisa juga eager load relasi secara langsung di response:
        $param->load('kriteria');
        return response()->json($param, 201);
    }

    // Update parameter
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'id_kriteria'=>'required|exists:kriteria,id_kriteria',
            'keterangan'=>'required',
            'nilai'=>'required|numeric'
        ]);
        $param = Parameter::findOrFail($id);
        $param->update($validated);
        $param->load('kriteria');
        return response()->json($param);
    }

    // Hapus parameter
    public function destroy($id)
    {
        $param = Parameter::findOrFail($id);
        $param->delete();
        return response()->json(['status'=>'deleted']);
    }
}
