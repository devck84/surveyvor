<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
	], function ($router) {
	    Route::post('login', 'App\Http\Controllers\AuthController@login');
	    Route::post('logout', 'App\Http\Controllers\AuthController@logout');
	    Route::post('refresh', 'App\Http\Controllers\AuthController@refresh');
	    Route::post('me', 'App\Http\Controllers\AuthController@me');
	    Route::post('register', 'App\Http\Controllers\AuthController@register');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'question'
	], function ($router) {
	    Route::post('all', 'App\Http\Controllers\QuestionController@getAll');
	    Route::post('all/{survey_id}', 'App\Http\Controllers\QuestionController@getBySurvey');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'team'
	], function ($router) {
	    Route::get('all', 'App\Http\Controllers\TeamController@getAll');
	    Route::get('mine', 'App\Http\Controllers\TeamController@getByUser');
	    Route::post('save', 'App\Http\Controllers\TeamController@save');
	    Route::post('delete/{team_id}', 'App\Http\Controllers\TeamController@delete');
	    Route::post('update/{team_id}', 'App\Http\Controllers\TeamController@update');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'teammember'
	], function ($router) {
	    Route::get('all', 'App\Http\Controllers\TeamMemberController@getAll');
	    Route::get('all/{team_id}', 'App\Http\Controllers\TeamMemberController@getByTeam');
	    Route::post('save', 'App\Http\Controllers\TeamMemberController@save');
	    Route::post('delete/{team_member_id}', 'App\Http\Controllers\TeamMemberController@delete');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'privacy'
	], function ($router) {
	    Route::get('all', 'App\Http\Controllers\TeamMemberController@getAll');
	    Route::get('all/{privacy_id}', 'App\Http\Controllers\TeamMemberController@getById');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'survey'
	], function ($router) {
	    Route::get('all', 'App\Http\Controllers\SurveyController@getAll');
	    Route::get('mine', 'App\Http\Controllers\SurveyController@getByUser');
	    Route::post('save', 'App\Http\Controllers\SurveyController@save');
	    Route::post('update/{survey_id}', 'App\Http\Controllers\SurveyController@save');
	    Route::delete('delete/{survey_id}', 'App\Http\Controllers\SurveyController@save');
});