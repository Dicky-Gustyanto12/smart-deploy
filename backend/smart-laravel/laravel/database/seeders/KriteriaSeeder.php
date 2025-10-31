<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KriteriaSeeder extends Seeder
{
    public function run()
    {
        DB::table('kriteria')->insert([
            [
                'kode'       => 'K01',
                'kriteria'   => 'Terdaftar di Dinas',
                'bobot'      => 40,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode'       => 'K02',
                'kriteria'   => 'Lokasi Sentra Produksi',
                'bobot'      => 20,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode'       => 'K03',
                'kriteria'   => 'Belum Pernah Terima',
                'bobot'      => 30,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode'       => 'K04',
                'kriteria'   => 'Kelengkapan Proposal',
                'bobot'      => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
