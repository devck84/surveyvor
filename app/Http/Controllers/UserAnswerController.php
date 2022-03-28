<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\UserAnswer;
use App\Models\Question;
use App\Http\Controllers\TeamController;

class UserAnswerController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getAll()
    {        
        return response()->json(['userAnswer'=>UserAnswer::all()],201);
    }

    public function getByQuestion($question_id)
    {   
        $user = auth()->user();
        $survey_ids = getSurveyIds();
        $question = Question::where('question_id',$question_id)
            ->whereIn('survey_id', $survey_ids)
            ->first();

        $userAnswer = UserAnswer::where('question_id',$question_id)
            ->get();

        if(!isset($userAnswer)){
            return response()->json([
                'error' =>'Whoops, it looks like your user answer doesn\'t exist'
            ],201);
        }
        return response()->json(['userAnswer'=>$userAnswer],201);
    }

    public function save(Request $request)
    {
        $user = auth()->user();

        $surveyIds = getSurveyIds();

        if(!in_array($request->survey_id, $surveyIds)){
            return response()->json([
                'error' =>'Whoops, it looks like your survey doesn\'t exist for you'
            ],400);
        }

        $validator = Validator::make($request->all(), [
            'survey_id' => 'required|integer',
            'question_id' => 'required|integer',
            'defined_answer_id' => 'integer',
        ]);
        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);

        $userAnswer = UserAnswer::create(array_merge(
                $validator->validate(),
                ['user_id'=>$user->user_id]
            ));
        return response()->json([
            'message' =>'User Answer successfully saved!',
            'userAnswer'=>$userAnswer
        ],201);
    }

    public function delete($user_answer_id){
        $user = auth()->user();

        $surveyIds = getSurveyIds();

        $user = auth()->user();
        $team_ids = getTeamIds();
        $t = UserAnswer::where('user_answer_id',$survey_id)
            ->whereIn('survey_id', $surveyIds)
            ->first();

        if($t->delete()>0) {
            return response()->json([
                'message'=>'User Answer successfully deleted!'
            ],201);
        }

        return response()->json([
                'error'=>'Whoops, something went wrong!'
            ],201);
        
    }

}