<?php

namespace App\Http\Controllers;
use App\Models\Kriteria;
use Illuminate\Http\Request;

class KriteriaController extends Controller
{
    public function index()
    {
        $data = Kriteria::orderBy('kode')->get();
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $request->validate([
            'kode'=>'required',
            'kriteria'=>'required',
            'bobot'=>'required|numeric'
        ]);
        $new = Kriteria::create($request->all());
        $this->updateNormalisasiAll();
        return response()->json($new, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'kode'=>'required',
            'kriteria'=>'required',
            'bobot'=>'required|numeric'
        ]);
        $data = Kriteria::findOrFail($id);
        $data->update($request->all());
        $this->updateNormalisasiAll();
        return response()->json($data, 200);
    }

    public function destroy($id)
    {
        try {
            $deleted = Kriteria::where('id_kriteria', $id)->delete();
            if ($deleted) {
                $this->updateNormalisasiAll();
                return response()->json(['success' => true]);
            } else {
                return response()->json(['success' => false, 'message' => 'Data tidak ditemukan atau sudah dihapus'], 400);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal hapus data kriteria. Data mungkin masih digunakan di tabel lain.',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    private function updateNormalisasiAll()
    {
        $all = Kriteria::all();
        foreach($all as $k) {
            // Rumus: setiap bobot/100, bukan total bobot
            $k->normalisasi = round($k->bobot / 100, 2);
            $k->save();
        }
    }
}
