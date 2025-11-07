<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePasswordResetsApiTable extends Migration
{
    public function up()
    {
        Schema::create('password_resets_api', function (Blueprint $table) {
            $table->id();
            $table->string('email')->index();
            $table->string('code', 8);
            $table->timestamp('created_at')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('password_resets_api');
    }
}
