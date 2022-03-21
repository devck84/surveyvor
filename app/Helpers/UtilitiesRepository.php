<?php

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\TeamController;
use App\Models\Survey;

const SERVER_NAME = "www.surveyvor.shocklogic.com";

function getTeamIds(){
    $team_ids = []; 
    $teamsByUser = json_decode(( (new TeamController)->getByUser() )->getContent(),true);
    foreach ($teamsByUser['teams'] as $t) {
      array_push($team_ids, $t['team_id']); 
    }
    return $team_ids;
}

function getSurveysId(){
    $user = auth()->user();
    $team_ids = $this->getTeamIds();
    $surveyIds = Survey::whereIn('team_id', $team_ids)
        ->orWhere('user_id',$user->user_id)
        ->select('survey_id')
        ->get();
    return $surveyIds;
}