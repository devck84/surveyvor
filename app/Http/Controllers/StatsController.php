<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StatsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * @OA\Get(
     *      path="/api/stats/answerPerQuestion/{question_id}",
     *      operationId="getAnswerStatsPerQuestion",
     *      tags={"Stats"},
     *      summary="Get all the friends from the logged user",
     *      description="Returns stats by Answers Per Question",
     *     @OA\Response(
     *        response=200,
     *          description="Successful operation",
     *        @OA\JsonContent(
     *                      @OA\Property(
     *                         property="answer_text",
     *                         type="string",
     *                         example="answer from a question"
     *                      ),
     *                      @OA\Property(
     *                         property="answer_count",
     *                         type="number",
     *                         example="10"
     *                      ),
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
    public function getByQuestion($question_id){
        $userAnswer = DB::table('UserAnswer')
        ->select(DB::raw('survey_answer_text as answer_text, COUNT(*) as answer_count'))
        ->where('question_id',$question_id)
        ->groupBy('survey_answer_text')
        ->get();

         return response()->json($userAnswer);
    }
}