<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cmaxcmin;

class CmaxcminController extends Controller
{
    // GET /api/cmaxcmin
    public function index()
    {
        // Return data beserta relasi penilaian (opsional)
        return response()->json(
            Cmaxcmin::with('penilaian')->get()
        );
    }

    // POST /api/cmaxcmin
    public function store(Request $request)
    {
        $request->validate([
            'data' => 'required|array|min:1',
            'data.*.id_penilaian' => 'required|integer',
            'data.*.kriteria' => 'required|string',
            'data.*.cmax' => 'nullable|integer',
            'data.*.cmin' => 'nullable|integer',
            'data.*.cmax_cmin' => 'nullable|integer'
        ]);

        foreach ($request->data as $row) {
            Cmaxcmin::updateOrCreate(
                [
                    'id_penilaian' => $row['id_penilaian'],
                    'kriteria' => $row['kriteria']
                ],
                [
                    'cmax' => $row['cmax'] ?? null,
                    'cmin' => $row['cmin'] ?? null,
                    'cmax_cmin' => $row['cmax_cmin'] ?? null,
                ]
            );
        }
        return response()->json(['status' => 'success']);
    }
}
