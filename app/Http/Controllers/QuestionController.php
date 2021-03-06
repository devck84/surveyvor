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
        $this->middleware('auth', ['except' => ['getBySurvey']]);
    }

    public function getAll()
    {
        return response()->json(['questions'=>Question::all()],201);
    }

    
    /**
     * @OA\Get(
     *      path="/api/question/all/{survey_id}",
     *      operationId="getQuestionFromSurvey",
     *      tags={"Question"},
     *      summary="Get all the questions from a survey",
     *      description="Returns a list of questions",
     *      @OA\Parameter(
     *         name="survey_id",
     *         in="path",
     *         description="Search by survey_id",
     *         required=true,
     *      ),
     *     @OA\Response(
     *        response=200,
     *          description="Successful operation",
     *        @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                property="question",
     *                type="array",
     *                @OA\Items(
     *                      @OA\Property(
     *                         property="question_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="survey_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="next_question_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="question_text",
     *                         type="string",
     *                         example="my question text"
     *                      ),
     *                      @OA\Property(
     *                         property="question_type_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="required",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="sequence_number",
     *                         type="number",
     *                         example="1"
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
    public function getBySurvey($survey_id)
    {
        $allQuestion = Question::where('survey_id',$survey_id)
        ->orderBy('sequence_number')
            ->get();

        return response()->json(['questions'=>$allQuestion],201);
    }


    /**
     * @OA\Post(
     *      path="/api/question/save",
     *      operationId="saveQuestion",
     *      tags={"Question"},
     *      summary="Create a new Question",
     *      description="Returns the generated Question",
     *      @OA\RequestBody(
     *          required=true,
     *          description="Pass user details",
     *       @OA\JsonContent(
     *                      @OA\Property(
     *                         property="survey_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="next_question_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="question_text",
     *                         type="string",
     *                         example="my question text"
     *                      ),
     *                      @OA\Property(
     *                         property="question_type_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="required",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="sequence_number",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                ),
     *      ),
     *     @OA\Response(
     *        response=200,
     *          description="Successful operation",
     *        @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                property="question",
     *                type="array",
     *                @OA\Items(
     *                      @OA\Property(
     *                         property="question_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="survey_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="next_question_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="question_text",
     *                         type="string",
     *                         example="my question text"
     *                      ),
     *                      @OA\Property(
     *                         property="question_type_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="required",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="sequence_number",
     *                         type="number",
     *                         example="1"
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
    public function save(Request $request)
    {
        $user = auth()->user();
         $team_ids = getTeamIds();
        $validator = Validator::make($request->all(), [
            'survey_id' => 'required|integer',
            'next_question_id' => 'integer|nullable',
            'question_text' => 'required|string',
            'question_type_id' => 'required|integer',
            'required' => 'required|integer|max:1',
            'sequence_number'=>'required|integer',
        ]);
        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);


        $allSurveys = Survey::where('survey_id',$request->survey_id)
            ->whereIn('team_id', $team_ids)
            ->orWhere('user_id', $user->user_id)
            ->get();

        if(empty($allSurveys) || count($allSurveys)<1)
            return response()->json(['error'=>'Whoops, this doesn\'t look like your survey'],401);
        
        $question = Question::create($validator->validate());
        return response()->json([
            'message' =>'Question successfully saved!',
            'question'=>$question
        ],201);
    }

    /**
     * @OA\Post(
     *      path="/api/question/update/{question_id}",
     *      operationId="updateQuestion",
     *      tags={"Question"},
     *      summary="Update a Question",
     *      @OA\Parameter(
     *         name="question_id",
     *         in="path",
     *         description="Search by question_id",
     *         required=true,
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          description="Pass question details",
     *      @OA\JsonContent(
     *                      @OA\Property(
     *                         property="survey_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="next_question_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="question_text",
     *                         type="string",
     *                         example="my question text"
     *                      ),
     *                      @OA\Property(
     *                         property="question_type_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="required",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="sequence_number",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                ),
     *      ),
     *     @OA\Response(
     *        response=200,
     *          description="Successful operation",
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
    public function update($question_id, Request $request){
        $user = auth()->user();
        $survey_ids = getSurveysId();
        $question = Question::where('question_id',$question_id)
            ->whereIn('survey_id', $survey_ids)
            ->first();

        if(!isset($question)){
            return response()->json([
                'error' =>'Whoops, this question doesn\'t exist'
            ],201);
        }

        $validator = Validator::make($request->all(), [
            'survey_id' => 'required|integer',
            'next_question_id' => 'integer|nullable',
            'question_text' => 'required|string',
            'question_type_id' => 'required|integer',
            'required' => 'required|integer|max:1',
            'sequence_number'=>'required|integer',
        ]);
        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);

        $affected = Question::where('question_id',$question_id)->update($validator->validate());

        if($affected<1) {
            return response()->json([
                'error' =>'Whoops, something went wrong!'
            ],201); 
        }
        
        return response()->json([
            'message' =>'Question successfully updated!'
        ],201);
             
    }

    /**
     * @OA\Post(
     *      path="/api/question/delete/{question_id}",
     *      operationId="deleteQuestion",
     *      tags={"Question"},
     *      summary="Delete a Question from your survey",
     *      @OA\Parameter(
     *         name="question_id",
     *         in="path",
     *         description="Search by question_id",
     *         required=true,
     *      ),
     
     *     @OA\Response(
     *        response=200,
     *          description="Successful operation",
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
    public function delete($question_id){
        $user = auth()->user();
        $survey_ids = getSurveysId();
        $question = Question::where('question_id',$question_id)
            ->whereIn('survey_id', $survey_ids)
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