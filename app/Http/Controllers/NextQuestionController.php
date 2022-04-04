<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\NextQuestion;
use App\Models\Question;
use App\Models\Survey;
use App\Http\Controllers\TeamController;

class NextQuestionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth',['except'=>['getBySurvey']]);
    }

    public function getAll()
    {        
        return response()->json(['nextQuestion'=>NextQuestion::all()],201);
    }

    public function getBySurvey($survey_id)
    {   
        $questionIds = Question::where('survey_id',$survey_id)
            ->select('question_id')
            ->get();
        
        $nextQuestion = NextQuestion::whereIn('question_id',$questionIds)->get();
        
        return response()->json(['nextQuestion'=>$nextQuestion],201);
    }

    public function getQuestionIds(){
        $user = auth()->user();

        $surveyIds = getSurveysId();

        $questionIds = Question::whereIn('survey_id',$surveyIds)
            ->select('question_id')
            ->get();

        $qArr = [];
        foreach ($questionIds as $s) {
          array_push($qArr, $s->question_id); 
        }
        return $qArr;
    }

    public function save(Request $request)
    {
        $questionIds = $this->getQuestionIds();

        if(!in_array($request->question_id,$questionIds)){
            return response()->json([
                'error' =>'It looks like it is not your question',
            ],201);
        }

        $validator = Validator::make($request->all(), [
            'defined_answer_id' => 'required|integer',
            'question_id' => 'required|integer',
        ]);
        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);

        $nextQuestion = NextQuestion::create(
                $validator->validate()
            );
        return response()->json([
            'message' =>'Next Question successfully saved!',
            'nextQuestion'=>$nextQuestion
        ],201);
    }

    public function update($next_question_id, Request $request){
       $questionIds = $this->getQuestionIds();

        if(!in_array($request->question_id,$questionIds)){
            return response()->json([
                'error' =>'It looks like it is not your question',
            ],201);
        }

        $validator = Validator::make($request->all(), [
            'defined_answer_id' => 'required|integer',
            'question_id' => 'required|integer',
        ]);
        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);

        $affected = NextQuestion::where('next_question_id',$next_question_id)->update($validator->validate());

        if($affected<1) {
            return response()->json([
                'error' =>'Whoops, something went wrong!'
            ],201); 
        }
        
        return response()->json([
            'message' =>'Next Question successfully updated!'
        ],201);
    }

    public function delete($next_question_id){
        $questionIds = $this->getQuestionIds();

        $nextQuestion = NextQuestion::where('next_question_id',$next_question_id)
            ->whereIn('question_id',$questionIds)
            ->get();

        if(!isset($nextQuestion)){
            return response()->json([
                'error' =>'It looks like it is not your next question',
            ],201);
        }

        if($t->delete()>0) {
            return response()->json([
                'message' =>'Next Question successfully deleted!'
            ],201);
        }

        return response()->json([
                'error' =>'Whoops, something went wrong!'
            ],201);
        
    }

}