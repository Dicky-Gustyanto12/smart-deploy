<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('cmaxcmin', function (Blueprint $table) {
            $table->id('id_cmaxcmin');
            $table->unsignedBigInteger('id_penilaian'); // Tipe WAJIB sama!
            $table->string('kriteria');
            $table->integer('cmax')->nullable();
            $table->integer('cmin')->nullable();
            $table->integer('cmax_cmin')->nullable();
            $table->timestamps();

            $table->foreign('id_penilaian')->references('id_penilaian')->on('penilaian')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('cmaxcmin');
    }
};
