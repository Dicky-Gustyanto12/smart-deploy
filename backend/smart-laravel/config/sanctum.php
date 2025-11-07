<?php

use Laravel\Sanctum\Sanctum;

return [

    /*
    |--------------------------------------------------------------------------
    | Stateful Domains
    |--------------------------------------------------------------------------
    |
    | Domain yang boleh menerima cookie otentikasi dari Sanctum.
    | Pastikan frontend (Vite) dan backend (Laravel) kamu ada di sini.
    |
    */

    'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', sprintf(
        '%s%s',
        'localhost,localhost:5173,127.0.0.1,127.0.0.1:5173,::1',
        Sanctum::currentApplicationUrlWithPort(),
    ))),

    /*
    |--------------------------------------------------------------------------
    | Sanctum Guards
    |--------------------------------------------------------------------------
    */

    'guard' => ['web'],

    /*
    |--------------------------------------------------------------------------
    | Expiration Minutes
    |--------------------------------------------------------------------------
    */

    'expiration' => null,

    /*
    |--------------------------------------------------------------------------
    | Token Prefix
    |--------------------------------------------------------------------------
    */

    'token_prefix' => env('SANCTUM_TOKEN_PREFIX', ''),

    /*
    |--------------------------------------------------------------------------
    | Sanctum Middleware
    |--------------------------------------------------------------------------
    |
    | Urutan middleware sangat penting: EncryptCookies → StartSession →
    | AuthenticateSession → VerifyCsrfToken. Kalau urutannya salah,
    | cookie CSRF tidak akan terbaca dan hasilnya 419.
    |
    */

    'middleware' => [
        'encrypt_cookies' => Illuminate\Cookie\Middleware\EncryptCookies::class,
        'add_queued_cookies_to_response' => Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        'start_session' => Illuminate\Session\Middleware\StartSession::class,
        'authenticate_session' => Laravel\Sanctum\Http\Middleware\AuthenticateSession::class,
        'validate_csrf_token' => Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class,
    ],

];
