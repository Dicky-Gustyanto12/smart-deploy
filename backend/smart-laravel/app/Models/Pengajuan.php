<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengajuan extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';
    protected $table = 'pengajuan';
    protected $primaryKey = 'id_pengajuan';
    public $timestamps = true;

    protected $fillable = [
        'id_pengajuan',
        'id_poktan',
        'nama_poktan',
        'nama_barang',
        'merek',
        'tipe',
        'nama_ketua',
        'nomor_hp',
        'status'
    ];
}
