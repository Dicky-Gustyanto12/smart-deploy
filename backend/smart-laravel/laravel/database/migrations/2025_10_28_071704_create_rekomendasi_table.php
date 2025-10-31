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
         Schema::create('rekomendasi', function (Blueprint $table) {
            $table->id('id_rekomendasi');
            $table->string('kode_poktan');
            $table->string('nama_poktan');
            $table->float('k1')->nullable();
            $table->float('k2')->nullable();
            $table->float('k3')->nullable();
            $table->float('k4')->nullable();
            $table->float('nilai_akhir')->nullable();
            $table->integer('ranking')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rekomendasi');
    }
};
