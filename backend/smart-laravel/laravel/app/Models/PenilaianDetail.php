<?php

namespace App\Models;

use App\Models\Kriteria;
use App\Models\Parameter;
use Illuminate\Database\Eloquent\Model;

class PenilaianDetail extends Model
{
    protected $table = 'penilaian_detail';
    protected $primaryKey = 'id_detail';
    protected $fillable = ['id_penilaian', 'id_kriteria', 'id_parameter'];

    public function kriteria()
    {
        return $this->belongsTo(Kriteria::class, 'id_kriteria');
    }
    public function parameter()
    {
        return $this->belongsTo(Parameter::class, 'id_parameter');
    }
}

