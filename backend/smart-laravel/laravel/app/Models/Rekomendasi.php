<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rekomendasi extends Model
{
    protected $table = 'rekomendasi';
    protected $primaryKey = 'id_rekomendasi';
    protected $fillable = ['kode_poktan','nama_poktan','k1','k2','k3','k4','nilai_akhir','ranking'];
}

