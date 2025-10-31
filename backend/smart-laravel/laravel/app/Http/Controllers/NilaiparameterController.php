<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Nilaiparameter;

class NilaiparameterController extends Controller
{
    public function store(Request $request)
{
    $validatedData = $request->validate([
        'id_poktan' => 'required|exists:poktan,id_poktan',
        'nilai' => 'array|required', // ["id_kriteria" => "id_parameter"]
    ]);

    // Simpan per kriteria & parameter
    foreach ($validatedData['nilai'] as $id_kriteria => $id_parameter) {
        $parameter = \App\Models\Parameter::find($id_parameter);
        Nilaiparameter::updateOrCreate(
            [
                'id_poktan' => $validatedData['id_poktan'],
                'id_kriteria' => $id_kriteria
            ],
            [
                'id_parameter' => $id_parameter,
                'nilai' => $parameter ? $parameter->nilai : null
            ]
        );
    }
    return response()->json(['success' => true]);
}

}
