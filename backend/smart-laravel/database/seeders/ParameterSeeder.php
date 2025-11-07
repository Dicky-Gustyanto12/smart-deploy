<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ParameterSeeder extends Seeder
{
    public function run()
    {
        DB::table('parameter')->insert([
            [
                'id_kriteria' => 1, // K1
                'keterangan'  => 'Terdaftar',
                'nilai'       => 5,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'id_kriteria' => 1, // K1
                'keterangan'  => 'Tidak Terdaftar',
                'nilai'       => 1,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'id_kriteria' => 3, // K3
                'keterangan'  => 'Belum Pernah Menerima Bantuan',
                'nilai'       => 5,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'id_kriteria' => 3, // K3
                'keterangan'  => 'Pernah menerima > 5 tahun lalu',
                'nilai'       => 1,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'id_kriteria' => 2, // K2
                'keterangan'  => 'Berada di Sentra Produksi',
                'nilai'       => 5,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'id_kriteria' => 2, // K2
                'keterangan'  => 'Tidak Berada di Sentra Produksi',
                'nilai'       => 1,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'id_kriteria' => 4, // K4
                'keterangan'  => 'Proposal Lengkap',
                'nilai'       => 5,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'id_kriteria' => 4, // K4
                'keterangan'  => 'Tidak Ada Proposal',
                'nilai'       => 1,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
        ]);
    }
}
