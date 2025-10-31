<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PoktanController;
use App\Http\Controllers\KriteriaController;
use App\Http\Controllers\ParameterController;
use App\Http\Controllers\PengajuanController;
use App\Http\Controllers\PenilaianController;
use App\Http\Controllers\RekomendasiController;
use App\Http\Controllers\NilaiparameterController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('poktan', PoktanController::class);

Route::get('/pengajuan', [PengajuanController::class, 'index']);
Route::post('/pengajuan', [PengajuanController::class, 'store']);
Route::put('/pengajuan/{id}', [PengajuanController::class, 'update']);

Route::apiResource('kriteria', KriteriaController::class);

Route::get('/parameter', [ParameterController::class, 'index']);
Route::get('/parameter/{id}', [ParameterController::class, 'show']);
Route::post('/parameter', [ParameterController::class, 'store']);
Route::put('/parameter/{id}', [ParameterController::class, 'update']);
Route::delete('/parameter/{id}', [ParameterController::class, 'destroy']);

Route::get('penilaian', [PenilaianController::class, 'index']);
Route::post('penilaian', [PenilaianController::class, 'store']);
Route::put('penilaian/{id}', [PenilaianController::class, 'update']);
Route::delete('penilaian/{id_poktan}', [PenilaianController::class, 'destroy']);

Route::apiResource('nilaiparameter', NilaiparameterController::class);


Route::apiResource('rekomendasi', RekomendasiController::class);


