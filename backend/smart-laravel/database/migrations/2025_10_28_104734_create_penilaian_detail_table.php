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
         Schema::create('penilaian_detail', function (Blueprint $table) {
            $table->id('id_detail');
            $table->unsignedBigInteger('id_penilaian');
            $table->unsignedBigInteger('id_kriteria');
            $table->unsignedBigInteger('id_parameter');
            $table->timestamps();
            $table->foreign('id_penilaian')->references('id_penilaian')->on('penilaian')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_detail');
    }
};
