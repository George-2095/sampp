<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HomeController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/authuser', [HomeController::class, 'authuser'])->name('authuser');
Route::get('/posts', [HomeController::class, 'posts'])->name('makepost');
Route::get('/postjson/{id}', [HomeController::class, 'post'])->name('post');
Route::post('/makepost', [HomeController::class, 'makepost'])->name('makepost');
Route::post('/likepost', [HomeController::class, 'likepost'])->name('likepost');
Route::post('/deletepost', [HomeController::class, 'deletepost'])->name('deletepost');
Route::get('/{path?}/{id}', [HomeController::class, 'index'])->name('home');
Route::get('/{path?}', [HomeController::class, 'index'])->name('home');
