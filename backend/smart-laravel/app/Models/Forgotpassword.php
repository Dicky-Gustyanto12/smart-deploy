<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Forgotpassword extends Model
{
    protected $table = 'password_resets_api';
    public $timestamps = false;
    protected $fillable = ['email', 'code', 'created_at'];
}
