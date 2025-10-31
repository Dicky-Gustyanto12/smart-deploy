<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pengajuan', function (Blueprint $table) {
            $table->string('id_pengajuan', 6)->primary(); // Kode seperti PJ001
            $table->string('id_poktan');
            $table->string('nama_poktan');
            $table->string('nama_barang');
            $table->string('merek');
            $table->string('tipe');
            $table->string('nama_ketua');
            $table->string('nomor_hp');
            $table->enum('status', ['Proses', 'Diterima', 'Batal'])->default('Proses');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengajuan');
    }
};
