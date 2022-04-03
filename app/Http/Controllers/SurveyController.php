<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Survey;
use App\Models\Question;
use App\Models\DefinedAnswer;
use App\Models\NextQuestion;
use App\Http\Controllers\TeamController;

class SurveyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getAll()
    {        
        return response()->json(['survey'=>Survey::all()],201);
    }

    public function getByUser()
    {   
        $user = auth()->user();

        $team_ids = getTeamIds();
        
        $survey = Survey::whereIn('team_id', $team_ids)
            ->orWhere('user_id',$user->user_id)
            ->get();

        if(!isset($survey)){
            return response()->json([
                'error' =>'Whoops, it looks like your survey doesn\'t exist'
            ],201);
        }
        return response()->json(['survey'=>$survey],201);
    }

    public function save(Request $request)
    {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
            'team_id' => 'integer|nullable',
            'privacy_id' => 'required|integer',
            'survey_name' => 'required|string|max:220',
            'survey_description' => 'string|nullable',
            'button_color' => 'string|max:7|nullable',
            'background_color' => 'string|max:7|nullable',
        ]);
        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);

        $survey = Survey::create(array_merge(
                $validator->validate(),
                ['date_created'=>now(),'active'=>1,'user_id'=>$user->user_id]
            ));
        return response()->json([
            'message' =>'Survey successfully saved!',
            'survey'=>$survey
        ],201);
    }

    public function update($survey_id, Request $request){
        $user = auth()->user();
        $team_ids = getTeamIds();
        $t = Survey::where('survey_id',$survey_id)
            ->whereIn('team_id', $team_ids)
            ->orWhere('user_id',$user->user_id)
            ->first();

        if(empty($t) || !isset($t)){
            return response()->json([
                'error' =>'Whoops, it looks like your team doesn\'t exist'
            ],201);
        }

        $validator = Validator::make($request->all(), [
            'privacy_id' => 'required|integer',
            'survey_name' => 'required|string|max:220',
            'survey_description' => 'string|nullable',
            'button_color' => 'string|max:7|nullable',
            'background_color' => 'string|max:7|nullable',
            'active'=>'required|integer',
        ]);

        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);

        $affected = Survey::where('survey_id',$survey_id)->update($validator->validate());

        if($affected>0) {
            return response()->json([
                'message' =>'Team successfully updated!'
            ],201);
        }
             return response()->json([
                'error' =>'Whoops, something went wrong!'
            ],201);
         
    }

    public function delete($survey_id){
        $user = auth()->user();
        $team_ids = getTeamIds();
        $t = Survey::where('survey_id',$survey_id)
            ->where('user_id',$user->user_id)
            ->first();
        if(!empty($t)){
            $quest = Question::where('survey_id',$survey_id)
                    ->select('question_id')
                    ->get();
            $qArr = [];
            foreach ($quest as $q) {
              array_push($qArr, $q->question_id); 
            }

            $defAnsw = DefinedAnswer::whereIn('question_id',$qArr)
                    ->delete();
            $nextQuest = NextQuestion::whereIn('question_id',$qArr)
                    ->delete();

            $q = Question::where('survey_id',$survey_id)
                    ->select('question_id')
                    ->delete();
            if($t->delete()>0) {
                return response()->json([
                    'message' =>'Survey successfully deleted!'
                ],201);
            }
        }

        return response()->json([
                'error' =>'Whoops, something went wrong!'
            ],201);
        
    }

}