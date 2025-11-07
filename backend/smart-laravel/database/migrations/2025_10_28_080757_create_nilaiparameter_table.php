<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up()
{
    Schema::create('nilaiparameter', function (Blueprint $table) {
        $table->id('id_nilaiparameter');
        $table->string('id_poktan'); // relasi dengan poktan
        $table->unsignedBigInteger('id_kriteria'); // relasi ke kriteria
        $table->unsignedBigInteger('id_parameter'); // relasi ke parameter yang dipilih
        $table->integer('nilai')->nullable(); // simpan nilai dari parameter (cth: 5/1)
        $table->timestamps();

        $table->foreign('id_poktan')->references('id_poktan')->on('poktan')->onDelete('cascade');
        $table->foreign('id_kriteria')->references('id_kriteria')->on('kriteria')->onDelete('cascade');
        $table->foreign('id_parameter')->references('id_parameter')->on('parameter')->onDelete('cascade');
    });
}

public function down()
{
    Schema::dropIfExists('nilaiparameter');
}

};
