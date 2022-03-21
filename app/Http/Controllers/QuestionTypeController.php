<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\QuestionType;
use App\Models\Survey;

class QuestionTypeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getAll()
    {        
        return response()->json(['questionType'=>QuestionType::all()],201);
    }

    public function getById($question_type_id){
        $question_type = QuestionType::where('question_type_id', $question_type_id)
            ->first();
        return response()->json(['questionType'=>$question_type],201);
    }

}