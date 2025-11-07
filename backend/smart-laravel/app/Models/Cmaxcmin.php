<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cmaxcmin extends Model
{
    protected $table = 'cmaxcmin';
    protected $primaryKey = 'id_cmaxcmin';

    protected $fillable = [
        'id_penilaian',
        'kriteria',
        'cmax',
        'cmin',
        'cmax_cmin'
    ];

    public function penilaian()
    {
        return $this->belongsTo(Penilaian::class, 'id_penilaian', 'id_penilaian');
    }
}
