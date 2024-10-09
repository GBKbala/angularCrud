<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CityController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/getCities',[CityController::class, 'getCities'])->name('getCities');
Route::get('users', [UserController::class, 'index'])->name('users');
Route::post('/storeUser', [UserController::class, 'store'])->name('storeUser');
Route::get('editUser/{id}', [UserController::class,'edit'])->name('editUser');
Route::get('updateUser/{id}', [UserController::class,'update'])->name('updateUser');
Route::delete('deleteUser/{id}', [UserController::class,'destroy'])->name('deleteUser');
