<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DummyController;

Route::get('/dummy', [DummyController::class, 'index']); 