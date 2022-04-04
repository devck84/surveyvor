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
	    Route::get('me', 'App\Http\Controllers\AuthController@me');
	    Route::post('register', 'App\Http\Controllers\AuthController@register');
	    Route::post('update/{user_id}', 'App\Http\Controllers\AuthController@update');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'question'
	], function ($router) {
	    Route::get('all', 'App\Http\Controllers\QuestionController@getAll');
	    Route::get('all/{survey_id}', 'App\Http\Controllers\QuestionController@getBySurvey');
	    Route::post('save', 'App\Http\Controllers\QuestionController@save');
	    Route::post('delete/{question_id}', 'App\Http\Controllers\QuestionController@delete');
	    Route::post('update/{question_id}', 'App\Http\Controllers\QuestionController@update');
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
	    Route::get('all', 'App\Http\Controllers\PrivacyController@getAll');
	    Route::get('all/{privacy_id}', 'App\Http\Controllers\PrivacyController@getById');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'survey'
	], function ($router) {
	    Route::get('all', 'App\Http\Controllers\SurveyController@getAll');
	    Route::get('all/{survey_id}', 'App\Http\Controllers\SurveyController@getById');
	    Route::get('mine', 'App\Http\Controllers\SurveyController@getByUser');
	    Route::post('save', 'App\Http\Controllers\SurveyController@save');
	    Route::post('update/{survey_id}', 'App\Http\Controllers\SurveyController@update');
	    Route::post('delete/{survey_id}', 'App\Http\Controllers\SurveyController@delete');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'questionType'
	], function ($router) {
	    Route::get('all', 'App\Http\Controllers\QuestionTypeController@getAll');
	    Route::get('all/{question_type_id}', 'App\Http\Controllers\QuestionTypeController@getById');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'definedAnswer'
	], function ($router) {
	    Route::get('all', 'App\Http\Controllers\DefinedAnswerController@getAll');
	    Route::get('all/{survey_id}', 'App\Http\Controllers\DefinedAnswerController@getById');
	    Route::post('save', 'App\Http\Controllers\DefinedAnswerController@save');
	    Route::post('update/{survey_id}', 'App\Http\Controllers\DefinedAnswerController@update');
	    Route::post('delete/{survey_id}', 'App\Http\Controllers\DefinedAnswerController@delete');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'nextQuestion'
	], function ($router) {
	    Route::get('all', 'App\Http\Controllers\NextQuestionController@getAll');
	    Route::get('all/{survey_id}', 'App\Http\Controllers\NextQuestionController@getBySurvey');
	    Route::post('save', 'App\Http\Controllers\NextQuestionController@save');
	    Route::post('update/{next_question_id}', 'App\Http\Controllers\NextQuestionController@update');
	    Route::post('delete/{next_question_id}', 'App\Http\Controllers\NextQuestionController@delete');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'userAnswer'
	], function ($router) {
	    Route::get('all', 'App\Http\Controllers\UserAnswerController@getAll');
	    Route::get('all/{question_id}', 'App\Http\Controllers\UserAnswerController@getByQuestion');
	    Route::post('save', 'App\Http\Controllers\UserAnswerController@save');
	    Route::post('delete/{next_question_id}', 'App\Http\Controllers\UserAnswerController@delete');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'invitation'
	], function ($router) {
	    Route::get('all', 'App\Http\Controllers\InvitationController@getAll');
	    Route::get('all/{receiver_id}', 'App\Http\Controllers\InvitationController@getByReceiver');
	    Route::post('save', 'App\Http\Controllers\InvitationController@save');
	    Route::post('delete/{invitation_id}', 'App\Http\Controllers\InvitationController@delete');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'userFriend'
	], function ($router) {
	    Route::get('all', 'App\Http\Controllers\UserFriendController@getAll');
	    Route::get('mine', 'App\Http\Controllers\UserFriendController@getByUser');
	    Route::post('save', 'App\Http\Controllers\UserFriendController@save');
	    Route::post('delete/{user_friend_id}', 'App\Http\Controllers\UserFriendController@delete');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'chat'
	], function ($router) {
	    Route::get('all', 'App\Http\Controllers\ChatController@getAll');
	    Route::get('mine', 'App\Http\Controllers\ChatController@getByUser');
	    Route::post('save', 'App\Http\Controllers\ChatController@save');
	    Route::post('update/{chat_id}', 'App\Http\Controllers\ChatController@update');
	    Route::post('delete/{chat_id}', 'App\Http\Controllers\ChatController@delete');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'message'
	], function ($router) {
	    Route::get('all', 'App\Http\Controllers\MessageController@getAll');
	    Route::get('allByChat', 'App\Http\Controllers\MessageController@getByChat');
	    Route::post('save', 'App\Http\Controllers\MessageController@save');
	    Route::post('updateStatus/{message_id}', 'App\Http\Controllers\MessageController@update');
});