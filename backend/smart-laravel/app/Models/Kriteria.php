<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Kriteria extends Model
{
    protected $table = 'kriteria';
    protected $primaryKey = 'id_kriteria';
    protected $fillable = ['kode', 'kriteria', 'bobot', 'normalisasi'];
    public function parameters() {
        return $this->hasMany(Parameter::class, 'id_kriteria', 'id_kriteria');
    }
}
