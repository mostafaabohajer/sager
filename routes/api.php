<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/register',[\App\Http\Controllers\AuthController::class,'register'])->name('register');
Route::post('/login',[\App\Http\Controllers\AuthController::class,'login'])->name('login');


Route::group(['middleware'=>['auth:sanctum']],function(){


    Route::apiResource('/product',\App\Http\Controllers\ProductController::class);
    Route::apiResource('/category',\App\Http\Controllers\CategoryController::class);
    Route::apiResource('/user',\App\Http\Controllers\UserController::class);



    Route::post('/quantity-product/{id}',[\App\Http\Controllers\ProductController::class,'quantityProduct'])->name('quantity.product');

    Route::get('/all-category',[\App\Http\Controllers\CategoryController::class,'allCategory'])->name('all.category');

    Route::post('/logout',[\App\Http\Controllers\AuthController::class,'logout'])->name('logout');
    Route::get('/me',[\App\Http\Controllers\AuthController::class,'me'])->name('me');

});
