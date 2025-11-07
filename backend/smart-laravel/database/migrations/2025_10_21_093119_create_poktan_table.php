<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('poktan', function (Blueprint $table) {
            $table->string('id_poktan')->primary();
            $table->string('nama_poktan');
            $table->string('alamat');
            $table->string('desa');
            $table->string('kecamatan');
            $table->string('nama_ketua');
            $table->string('nik');
            $table->string('nomor_hp');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('poktan');
    }
};
