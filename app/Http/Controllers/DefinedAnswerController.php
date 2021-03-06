<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\DefinedAnswer;
use App\Models\Survey;
use App\Models\Question;

class DefinedAnswerController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth', ['except'=>['getById']]);
    }

    public function getAll()
    {
        return response()->json(['definedAnswer'=>DefinedAnswer::all()],201);
    }

    /**
     * @OA\Get(
     *      path="/api/definedAnswer/all/{survey_id}",
     *      operationId="getDefinedAnswersFromSurvey",
     *      tags={"Defined Answer"},
     *      summary="Get all the defined Answers from a survey",
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
     *                property="definedAnswer",
     *                type="array",
     *                @OA\Items(
     *                      @OA\Property(
     *                         property="defined_answer_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="defined_answer_text",
     *                         type="string",
     *                         example="example text"
     *                      ),
     *                      @OA\Property(
     *                         property="question_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      
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
    public function getById($survey_id)
    {
        $questionIds = Question::where('survey_id',$survey_id)
            ->select('question_id')
            ->get();

        $definedAnswer = DefinedAnswer::whereIn('question_id',$questionIds)
            ->get();

        if(!isset($definedAnswer)){
            return response()->json(['error'=>'It looks like it is not your defined answer'],401);
        }
        return response()->json(['definedAnswer'=>$definedAnswer],201);
    }

    /**
     * @OA\Post(
     *      path="/api/definedAnswer/save",
     *      operationId="saveDefinedAnswer",
     *      tags={"Defined Answer"},
     *      summary="Save a defined Answer",
     *      description="Returns the generated Defined Answer",
     *      @OA\RequestBody(
     *          required=true,
     *          description="Pass defined Answer details",
     *             @OA\JsonContent(
     *                      @OA\Property(
     *                         property="defined_answer_text",
     *                         type="string",
     *                         example="example text"
     *                      ),
     *                      @OA\Property(
     *                         property="question_id",
     *                         type="number",
     *                         example="1"
     *             ),),
     *      ),
     *     @OA\Response(
     *        response=200,
     *          description="Successful operation",
     *        @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                property="definedAnswer",
     *                type="array",
     *                @OA\Items(
     *                      @OA\Property(
     *                         property="defined_answer_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="defined_answer_text",
     *                         type="string",
     *                         example="example text"
     *                      ),
     *                      @OA\Property(
     *                         property="question_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      
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
        $surveyIds = getSurveysId();

        $questionIds = Question::whereIn('survey_id',$surveyIds)
            ->select('question_id')
            ->get();

        $qArr = [];
        foreach ($questionIds as $s) {
          array_push($qArr, $s->question_id); 
        }

        if(!in_array($request->question_id,$qArr)){
            return response()->json([
                'error' =>'It looks like it is not your question',
            ],201);
        }
        $validator = Validator::make($request->all(), [
            'question_id' => 'required|integer',
            'defined_answer_text'=>'required|string|max:220',
        ]);
        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);
        
        $definedAnswer = DefinedAnswer::create($validator->validate());
        return response()->json([
            'message' =>'Defined Answer successfully saved!',
            'definedAnswer'=>$definedAnswer
        ],201);
    }

    /**
     * @OA\Post(
     *      path="/api/definedAnswer/update/{defined_answer_id}",
     *      operationId="updateDefinedAnswer",
     *      tags={"Defined Answer"},
     *      summary="Update a defined Answer",
    *      @OA\Parameter(
     *         name="defined_answer_id",
     *         in="path",
     *         description="Search by defined_answer_id",
     *         required=true,
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          description="Pass defined Answer details",
     *             @OA\JsonContent(
     *                      @OA\Property(
     *                         property="defined_answer_text",
     *                         type="string",
     *                         example="example text"
     *                      ),
     *                      @OA\Property(
     *                         property="question_id",
     *                         type="number",
     *                         example="1"
     *             ),),
     *      ),
     *     @OA\Response(
     *        response=201,
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
        ],400);
         
    }

    /**
     * @OA\Post(
     *      path="/api/definedAnswer/delete/{defined_answer_id}",
     *      operationId="deleteDefinedAnswer",
     *      tags={"Defined Answer"},
     *      summary="Delete a defined Answer",
    *      @OA\Parameter(
     *         name="defined_answer_id",
     *         in="path",
     *         description="Search by defined_answer_id",
     *         required=true,
     *      ),
     *     @OA\Response(
     *        response=201,
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
            ],400);
        }
        return response()->json([
                'message' =>'Defined answer successfully deleted!'
            ],201);
    }
}