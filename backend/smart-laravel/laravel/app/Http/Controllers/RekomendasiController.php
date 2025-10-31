<?php

namespace App\Http\Controllers;

use App\Models\Penilaian;
use App\Models\Poktan;
use App\Models\Kriteria;
use Illuminate\Http\Request;

class RekomendasiController extends Controller
{
    // GET /api/hasil-rekomendasi
    public function index()
    {
        // Gabungkan penilaian dengan nama poktan
        $penilaians = Penilaian::join('poktan', 'penilaian.id_poktan', '=', 'poktan.id_poktan')
            ->select('penilaian.*', 'poktan.nama_poktan', 'poktan.id_poktan as kode')
            ->get();

        // Contoh bobot dari kriteria (ambil otomatis dari tabel kriteria jika ingin dinamis)
        $bobot = ["k1" => 0.4, "k2" => 0.2, "k3" => 0.3, "k4" => 0.1];
        $kolom = ["k1", "k2", "k3", "k4"];

        // Hitung min-max semua kriteria
        $minmax = [];
        foreach ($kolom as $k) {
            $angka = $penilaians->pluck($k)->map(fn($v) => floatval($v));
            $minmax[$k] = [
                "min" => $angka->min(),
                "max" => $angka->max()
            ];
        }

        // Proses penilaian → rekomendasi
        $hasil = [];
        foreach ($penilaians as $p) {
            $row = [
                "kode" => $p->kode,
                "namaKelompok" => $p->nama_poktan
            ];
            $nilai_akhir = 0;
            foreach ($kolom as $k) {
                $n = floatval($p->$k);
                $min = $minmax[$k]["min"];
                $max = $minmax[$k]["max"];
                $norm = ($max != $min) ? ($n - $min) / ($max - $min) : 1;
                $row[$k] = round($norm, 2);
                $nilai_akhir += $norm * $bobot[$k];
            }
            $row["nilai_akhir"] = round($nilai_akhir, 2);
            $hasil[] = $row;
        }

        // Ranking sort dan field ranking otomatis
        usort($hasil, fn($a, $b) => $b["nilai_akhir"] <=> $a["nilai_akhir"]);
        foreach ($hasil as $i => &$row) {
            $row["ranking"] = $i + 1;
        }

        return response()->json($hasil, 200);
    }
}
