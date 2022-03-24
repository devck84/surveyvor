<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\DefinedAnswer;
use App\Models\Survey;

class DefinedAnswerController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getAll()
    {
        return response()->json(['definedAnswer'=>DefinedAnswer::all()],201);
    }

    public function getById($defined_answer_id)
    {
        $surveyIds = getSurveysId();
        $user = auth()->user();

        $questionIds = Question::whereIn('survey_id',$surveyIds)
            ->select('question_id')
            ->get();

        $definedAnswer = DefinedAnswer::whereIn('question_id',$questionIds)
            ->where('defined_answer_id',$defined_answer_id)
            ->first();

        if(!isset($definedAnswer)){
            return response()->json(['error'=>'It looks like it is not your defined answer'],401);
        }
        return response()->json(['definedAnswer'=>$definedAnswer],201);
    }

    public function save(Request $request)
    {  
        $user = auth()->user();
        $surveyIds = getSurveysId();

        $questionIds = Question::whereIn('survey_id',$surveyIds)
            ->select('question_id')
            ->get();

        if(!in_array($request->question_id,$questionIds)){
            return response()->json([
                'error' =>'It looks like it is not your question',
            ],201);
        }
        $validator = Validator::make($request->all(), [
            'question_id' => 'required|integer',
            'defined_answer_text'=>'required|integer|max:220',
        ]);
        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);
        
        $definedAnswer = DefinedAnswer::create($validator->validate());
        return response()->json([
            'message' =>'Team Member successfully saved!',
            'defined_answer'=>$definedAnswer
        ],201);
    }

     public function update($defined_answer_id, Request $request){
        $surveyIds = getSurveysId();
        $user = auth()->user();

        $questionIds = Question::whereIn('survey_id',$surveyIds)
            ->select('question_id')
            ->get();

        $definedAnswer = DefinedAnswer::whereIn('question_id',$questionIds)
            ->where('defined_answer_id',$defined_answer_id)
            ->first();

         if(!isset($definedAnswer)){
            return response()->json(['error'=>'It looks like it is not your defined answer'],401);
        }

       $validator = Validator::make($request->all(), [
            'defined_answer_text'=>'required|integer|max:220',
        ]);

        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);

        $affected = DefinedAnswer::where('defined_answer_id',$defined_answer_id)->update($validator->validate());

        if($affected>0) {
            return response()->json([
                'message' =>'Defined answer successfully updated!'
            ],201);
        }
         return response()->json([
            'error' =>'Whoops, something went wrong!'
        ],201);
         
    }

    public function delete($defined_answer_id){
        $surveyIds = getSurveysId();
        $user = auth()->user();

        $questionIds = Question::whereIn('survey_id',$surveyIds)
            ->select('question_id')
            ->get();

        $definedAnswer = DefinedAnswer::whereIn('question_id',$questionIds)
            ->where('defined_answer_id',$defined_answer_id)
            ->first();

        if(!isset($definedAnswer) || $definedAnswer->delete()<1) {
            return response()->json([
                'error' =>'Whoops, something went wrong!'
            ],201);
        }
        return response()->json([
                'message' =>'Defined answer successfully deleted!'
            ],201);
    }
}