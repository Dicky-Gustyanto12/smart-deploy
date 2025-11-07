<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Uncomment jika ingin isi user dummy
        // \App\Models\User::factory(10)->create();

        // Tambahkan baris berikut agar seeder Parameter dijalankan:
        $this->call([
            ParameterSeeder::class
        ]);
    }
}
