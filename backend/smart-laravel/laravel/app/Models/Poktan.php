<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Poktan extends Model
{
    protected $table = 'poktan';
    protected $primaryKey = 'id_poktan';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id_poktan',
        'nama_poktan',
        'desa',
        'kecamatan',
        'nama_ketua',
        'nik',
        'nomor_hp',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (!$model->id_poktan) {
                $latest = self::orderBy('id_poktan', 'desc')->first();
                if ($latest) {
                    $lastNumber = intval(substr($latest->id_poktan, 2));
                    $newNumber = $lastNumber + 1;
                } else {
                    $newNumber = 1;
                }
                $model->id_poktan = 'P' . str_pad($newNumber, 3, '0', STR_PAD_LEFT);
            }
        });
    }
}
