<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Nilaiparameter extends Model
{
    protected $table = 'nilaiparameter';
    protected $primaryKey = 'id_nilaiparameter';
    protected $fillable = ['id_poktan', 'id_kriteria', 'id_parameter', 'nilai'];
    public function poktan() { return $this->belongsTo(Poktan::class, 'id_poktan', 'id_poktan'); }
    public function kriteria() { return $this->belongsTo(Kriteria::class, 'id_kriteria', 'id_kriteria'); }
    public function parameter() { return $this->belongsTo(Parameter::class, 'id_parameter', 'id_parameter'); }
}
