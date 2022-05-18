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
        $this->middleware('auth',['except'=>['save']]);
    }

    public function getAll()
    {        
        return response()->json(['userAnswer'=>UserAnswer::all()],201);
    }

    public function getBySurvey($survey_id){
        $survey_ids = getSurveysId();
        if(!in_array($survey_id, $survey_ids)){
            return response()->json([
                'error' =>'Whoops, it looks like it is not your survey'
            ],201);
        }
         $userAnswer = UserAnswer::where('survey_id',$survey_id)
         ->leftJoin('User', 'User.user_id', '=', 'UserAnswer.user_id')
         ->select('UserAnswer.*', 'User.email')
            ->get();
         return response()->json(['userAnswer'=>$userAnswer],201);
    }

    public function getByQuestion($question_id)
    {   
        $user = auth()->user();
        $survey_ids = getSurveysId();
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

        if(empty($user)){
            $userId = null;  
        }else{
            $userId = $user->user_id;  
        }
        $validator = Validator::make($request->all(), [
            'survey_id' => 'required|integer',
            'question_id' => 'required|integer',
            'defined_answer_id' => 'nullable|integer',
            'survey_answer_text'=>'nullable|string',
        ]);
        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);

        $userAnswer = UserAnswer::create(array_merge(
                $validator->validate(),
                ['user_id'=>$userId]
            ));
        return response()->json([
            'message' =>'User Answer successfully saved!',
            'userAnswer'=>$userAnswer
        ],201);
    }

    public function delete($user_answer_id){
        $user = auth()->user();

        $surveyIds = getSurveysId();

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