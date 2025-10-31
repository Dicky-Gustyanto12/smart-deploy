<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PoktanController;

Route::get('/', function () {
    return view('welcome');
});


