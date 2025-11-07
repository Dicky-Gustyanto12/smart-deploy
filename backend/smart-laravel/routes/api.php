<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PoktanController;

use App\Http\Controllers\CmaxcminController;
use App\Http\Controllers\ForgotpwController;
use App\Http\Controllers\KriteriaController;
use App\Http\Controllers\ParameterController;
use App\Http\Controllers\PengajuanController;
use App\Http\Controllers\PenilaianController;

use App\Http\Controllers\RekomendasiController;
use App\Http\Controllers\NilaiparameterController;



// === Auth routes (public) ===
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::post('/forgot-pw', [ForgotpwController::class, 'sendCode']);
Route::post('/verify-code', [ForgotpwController::class, 'verifyCode']);
Route::post('/reset-password', [ForgotpwController::class, 'resetPassword']);


// === Routes yang dilindungi Sanctum ===
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('poktan', PoktanController::class);
    Route::apiResource('kriteria', KriteriaController::class);
    Route::apiResource('nilaiparameter', NilaiparameterController::class);
    Route::apiResource('rekomendasi', RekomendasiController::class);

    Route::get('/parameter', [ParameterController::class, 'index']);
    Route::get('/parameter/{id}', [ParameterController::class, 'show']);
    Route::post('/parameter', [ParameterController::class, 'store']);
    Route::put('/parameter/{id}', [ParameterController::class, 'update']);
    Route::delete('/parameter/{id}', [ParameterController::class, 'destroy']);

    Route::get('/pengajuan', [PengajuanController::class, 'index']);
    Route::post('/pengajuan', [PengajuanController::class, 'store']);
    Route::put('/pengajuan/{id}', [PengajuanController::class, 'update']);

    Route::get('penilaian', [PenilaianController::class, 'index']);
    Route::post('penilaian', [PenilaianController::class, 'store']);
    Route::put('penilaian/{id}', [PenilaianController::class, 'update']);
    Route::delete('penilaian/{id_poktan}', [PenilaianController::class, 'destroy']);

    Route::get('/cmaxcmin', [CmaxcminController::class, 'index']);
    Route::post('/cmaxcmin', [CmaxcminController::class, 'store']);
});
