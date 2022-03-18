<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Question;
use App\Models\Survey;

class QuestionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getAll()
    {
        return response()->json(['questions'=>Question::all()],201);
    }

     public function getBySurvey($survey_id)
    {
        $usr = auth()->user();

        $allSurveys = Survey::where([
                ['user_id',$usr->user_id],
                ['survey_id',$survey_id]
            ])
            ->get();

        if(empty($allSurveys) || count($allSurveys)<1)
            return response()->json(['error'=>'Whoops, this doesn\'t look like your survey'],401);
        

        $allQuestion = Question::where('survey_id',$survey_id)
            ->get();

        return response()->json(['questions'=>$allQuestion],201);
    }

    public function save()
    {
        $usr = auth()->user();
        
        $validator = Validator::make($request->all(), [
            'survey_id' => 'required|integer',
            'next_question_id' => 'integer',
            'question_text' => 'required|string',
            'question_type_id' => 'required|integer',
            'required' => 'required|integer|max:1',
            'sequence_number '=>'required|integer',
        ]);
        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);


        $allSurveys = Survey::where([
                ['user_id',$usr->user_id],
                ['survey_id',$request->survey_id]
            ])
            ->get();

        if(empty($allSurveys) || count($allSurveys)<1)
            return response()->json(['error'=>'Whoops, this doesn\'t look like your survey'],401);
        
        $question = Question::create($validator->validate());
        return response()->json([
            'message' =>'Question successfully saved!',
            'question'=>$question
        ],201);
    }

    public function update($question_id){
        $question = Question::where('question_id',$question_id)
            ->first();

        if(count($question)<1 || empty($question)){
            return response()->json([
                'error' =>'Whoops, this question doesn\'t exist'
            ],201);
        }

        $validator = Validator::make($request->all(), [
            'survey_id' => 'required|integer',
            'next_question_id' => 'integer',
            'question_text' => 'required|string',
            'question_type_id' => 'required|integer',
            'required' => 'required|integer|max:1',
            'sequence_number '=>'required|integer',
        ]);
        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);

        $question->next_question_id = $request->next_question_id;
        $question->question_text = $request->question_text;
        $question->question_type_id = $request->question_type_id;
        $question->required = $request->required;
        $question->sequence_number = $request->sequence_number;

        if($question->save()>0) {return response()->json([
                'error' =>'Whoops, something went wrong!'
            ],201); 
        }
        
        return response()->json([
            'message' =>'Question successfully updated!'
        ],201);
        
             
    }

    public function delete($question_id){
        $question = Question::where('question_id',$question_id)
            ->first();

        if($question->delete()<1) {
            return response()->json([
                'error' =>'Whoops, something went wrong!'
            ],201);
        }
        return response()->json([
                'message' =>'Question successfully deleted!'
            ],201);
             
    }

}