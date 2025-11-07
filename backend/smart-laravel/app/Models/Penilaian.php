<?php

namespace App\Models;

use App\Models\PenilaianDetail;
use Illuminate\Database\Eloquent\Model;

class Penilaian extends Model
{
    protected $table = 'penilaian';
    protected $primaryKey = 'id_penilaian';
    protected $fillable = ['id_poktan', 'total_nilai'];

    public function details()
    {
        return $this->hasMany(PenilaianDetail::class, 'id_penilaian');
    }
}


