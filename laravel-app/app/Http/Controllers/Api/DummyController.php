<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class DummyController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'message' => 'This is a dummy API response!',
            'data' => [1, 2, 3, 4, 5]
        ]);
    }
} 