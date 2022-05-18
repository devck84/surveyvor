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

    /**
     * @OA\Get(
     *      path="/api/questionType/all",
     *      operationId="getAllQuestionTypes",
     *      tags={"Question Type"},
     *      summary="Get all the Question Types",
     *      description="Returns Question Types",
     *     @OA\Response(
     *        response=200,
     *          description="Successful operation",
     *        @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                property="questionType",
     *                type="array",
     *                @OA\Items(
     *                      @OA\Property(
     *                         property="question_type_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="question_type_text",
     *                         type="string",
     *                         example="short answers"
     *                      ),
     *                      @OA\Property(
     *                         property="question_type_description",
     *                         type="string",
     *                         example="it is for short answers"
     *                      ),
     *                ),
     *             ),
     *        ),
     *     ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *      ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      ),
     * )
     */
    public function getAll()
    {        
        return response()->json(['questionType'=>QuestionType::all()],201);
    }

    /**
     * @OA\Get(
     *      path="/api/questionType/all/{question_type}",
     *      operationId="getQuestionType",
     *      tags={"Question Type"},
     *      summary="Get a Question Type",
     *      description="Returns a Question Type",
     *     @OA\Response(
     *        response=200,
     *          description="Successful operation",
     *        @OA\JsonContent(
     *             type="object",
     *                      @OA\Property(
     *                         property="question_type_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="question_type_text",
     *                         type="string",
     *                         example="short answers"
     *                      ),
     *                      @OA\Property(
     *                         property="question_type_description",
     *                         type="string",
     *                         example="it is for short answers"
     *                      ),
     *        ),
     *     ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *      ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      ),
     * )
     */
    public function getById($question_type_id){
        $question_type = QuestionType::where('question_type_id', $question_type_id)
            ->first();
        return response()->json(['questionType'=>$question_type],201);
    }

}