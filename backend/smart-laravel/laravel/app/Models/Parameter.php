<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Parameter extends Model
{
    protected $table = 'parameter';
    protected $primaryKey = 'id_parameter';

    // Agar mass-assignment create/update berhasil
    protected $fillable = ['id_kriteria', 'keterangan', 'nilai'];

    // Relasi ke Kriteria (Many To One)
    public function kriteria()
    {
        return $this->belongsTo(Kriteria::class, 'id_kriteria', 'id_kriteria');
    }
}
