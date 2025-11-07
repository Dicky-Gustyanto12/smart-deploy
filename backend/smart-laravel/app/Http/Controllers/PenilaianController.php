<?php

namespace App\Http\Controllers;

use App\Models\Penilaian;
use App\Models\PenilaianDetail;
use App\Models\Parameter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PenilaianController extends Controller
{
    // GET list semua penilaian (header + detail utk dashboard)
    public function index() {
        $data = Penilaian::with(['details.parameter', 'details.kriteria'])->get();
        $result = $data->map(function ($pen) {
            $detailMap = [];
            foreach ($pen->details as $det) {
                $detailMap[$det->id_kriteria] = [
                    'id_parameter' => $det->id_parameter,
                    'nilai' => $det->parameter?->nilai,
                    'keterangan' => $det->parameter?->keterangan
                ];
            }
            return [
                'id_penilaian' => $pen->id_penilaian,
                'id_poktan' => $pen->id_poktan,
                'total_nilai' => $pen->total_nilai,
                'details' => $detailMap,
                'created_at' => $pen->created_at,
            ];
        });
        return response()->json($result);
    }

    // POST create penilaian baru
    public function store(Request $request) {
        $request->validate([
            'id_poktan' => 'required',
            'nilai' => 'required|array'
        ]);
        DB::beginTransaction();
        try {
            $penilaian = Penilaian::create([
                'id_poktan' => $request->id_poktan,
                'total_nilai' => 0
            ]);
            $total = 0;
            foreach ($request->nilai as $id_kriteria => $id_parameter) {
                PenilaianDetail::create([
                    'id_penilaian' => $penilaian->id_penilaian,
                    'id_kriteria' => $id_kriteria,
                    'id_parameter' => $id_parameter,
                ]);
                $nilaiP = Parameter::find($id_parameter);
                if ($nilaiP) $total += $nilaiP->nilai;
            }
            $penilaian->update(['total_nilai' => $total]);
            DB::commit();
            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    // PUT update penilaian (header & detail)
    public function update(Request $request, $id) {
        $request->validate([
            'id_poktan' => 'required',
            'nilai' => 'required|array'
        ]);
        DB::beginTransaction();
        try {
            $penilaian = Penilaian::findOrFail($id);
            $penilaian->id_poktan = $request->id_poktan;
            $penilaian->save();

            // Update detail satu per satu (hapus dulu semua lalu insert, atau upsert by id_kriteria)
            PenilaianDetail::where('id_penilaian', $id)->delete();
            $total = 0;
            foreach ($request->nilai as $id_kriteria => $id_parameter) {
                PenilaianDetail::create([
                    'id_penilaian' => $id,
                    'id_kriteria' => $id_kriteria,
                    'id_parameter' => $id_parameter,
                ]);
                $nilaiP = Parameter::find($id_parameter);
                if ($nilaiP) $total += $nilaiP->nilai;
            }
            $penilaian->update(['total_nilai' => $total]);
            DB::commit();
            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    // DELETE penilaian (+detail)
    public function destroy($id) {
        $penilaian = Penilaian::find($id);
        if ($penilaian) {
            $penilaian->delete();
            return response()->json(['success' => true]);
        }
        return response()->json(['success' => false, 'error' => 'Not found.'], 404);
    }
}
