<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Survey;
use App\Models\Question;
use App\Models\DefinedAnswer;
use App\Models\NextQuestion;
use App\Models\UserAnswer;
use App\Models\UserFriend;
use App\Http\Controllers\TeamController;

class SurveyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth', ['except' => ['getById']]);
    }

    public function getAll()
    {        
        return response()->json(['survey'=>Survey::all()],201);
    }

     /**
     * @OA\Get(
     *      path="/api/survey/mine/{survey_id}",
     *      operationId="getFromMySurveys",
     *      tags={"Survey"},
     *      summary="Get a survey of mine",
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
     *                      @OA\Property(
     *                         property="survey_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="survey_name",
     *                         type="number",
     *                         example="my survey"
     *                      ),
     *                      @OA\Property(
     *                         property="survey_description",
     *                         type="number",
     *                         example="survey them all"
     *                      ),
     *                      @OA\Property(
     *                         property="privacy_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="button_color",
     *                         type="string",
     *                         example="#000000"
     *                      ),
     *                      @OA\Property(
     *                         property="background_color",
     *                         type="string",
     *                         example="#000000"
     *                      ),
     *                       @OA\Property(
     *                         property="active",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="date_created",
     *                         type="string",
     *                         example="17/05/2022"
     *                      ),
     *                      @OA\Property(
     *                         property="user_id",
     *                         type="number",
     *                         example="1"
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
    public function getByIdFromMySurveys($survey_id){
        $user = auth()->user();
        $surveyids = getSurveysId();

        if (!in_array($survey_id, $surveyids)) {
             return response()->json([
                'error' =>'Whoops, it looks like this survey is not yours'
            ],400);
        }

        $survey = Survey::where('survey_id', $survey_id)
            ->first();

        return response()->json(['survey'=>$survey],201);

    } 

     /**
     * @OA\Get(
     *      path="/api/survey/all/{survey_id}",
     *      operationId="getSurvey",
     *      tags={"Survey"},
     *      summary="Get a survey",
     *      description="Returns a survey depending on the privacy of the survey",
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
     *                      @OA\Property(
     *                         property="survey_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="survey_name",
     *                         type="number",
     *                         example="my survey"
     *                      ),
     *                      @OA\Property(
     *                         property="survey_description",
     *                         type="number",
     *                         example="survey them all"
     *                      ),
     *                      @OA\Property(
     *                         property="privacy_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="button_color",
     *                         type="string",
     *                         example="#000000"
     *                      ),
     *                      @OA\Property(
     *                         property="background_color",
     *                         type="string",
     *                         example="#000000"
     *                      ),
     *                       @OA\Property(
     *                         property="active",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="date_created",
     *                         type="string",
     *                         example="17/05/2022"
     *                      ),
     *                      @OA\Property(
     *                         property="user_id",
     *                         type="number",
     *                         example="1"
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
    public function getById($survey_id)
    {        
        $survey = Survey::where('survey_id', $survey_id)
            ->where('active',1)
            ->first();
        if(empty($survey)){
            return response()->json([
                'error' =>'Whoops, it looks like this survey is inactive'
            ],400);
        }
        if($survey->privacy_id==1){
            $user = auth()->user();
            if(empty($user)){
                return response()->json([
                'error' =>'Whoops, you need to log in'
                    ],401);
            }
        }
        elseif($survey->privacy_id==3){
             $user = auth()->user();
             if(empty($user)){
                return response()->json([
                'error' =>'Whoops, you need to log in'
                    ],401);
            }
            $areFriends = UserFriend::where('user_id_from',$user->user_id)
            ->orWhere('user_id_from',$survey->user_id)
            ->where('user_id_to',$survey->user_id)
            ->orWhere('user_id_to',$user->user_id)
            ->get();
            if(empty($areFriends)){
                return response()->json([
                'error' =>'Whoops, this survey is just for friends'
                    ],400); 
            }
        }
        return response()->json(['survey'=>$survey],201);
    }

    /**
     * @OA\Get(
     *      path="/api/survey/user/{user_id}",
     *      operationId="getSurveyByUser",
     *      tags={"Survey"},
     *      summary="Get a list of surveys",
     *      description="Returns only public surveys from a user",
     *      @OA\Parameter(
     *         name="user_id",
     *         in="path",
     *         description="Search by user_id",
     *         required=true,
     *      ),
     *     @OA\Response(
     *        response=200,
     *          description="Successful operation",
     *        @OA\JsonContent(
     *             type="object",
     *                      @OA\Property(
     *                         property="survey_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="survey_name",
     *                         type="number",
     *                         example="my survey"
     *                      ),
     *                      @OA\Property(
     *                         property="survey_description",
     *                         type="number",
     *                         example="survey them all"
     *                      ),
     *                      @OA\Property(
     *                         property="privacy_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="button_color",
     *                         type="string",
     *                         example="#000000"
     *                      ),
     *                      @OA\Property(
     *                         property="background_color",
     *                         type="string",
     *                         example="#000000"
     *                      ),
     *                       @OA\Property(
     *                         property="active",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="date_created",
     *                         type="string",
     *                         example="17/05/2022"
     *                      ),
     *                      @OA\Property(
     *                         property="user_id",
     *                         type="number",
     *                         example="1"
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
    public function getPublicByUser($user_id)
    {   
        $survey = Survey::where('user_id', $user_id)
            ->where('privacy_id',2)
            ->get();

        return response()->json(['survey'=>$survey],201);
    }

    /**
     * @OA\Get(
     *      path="/api/survey/mine",
     *      operationId="getAllMySurveys",
     *      tags={"Survey"},
     *      summary="Get all my surveys",
     *      description="Returns all surveys from the logged user",
     *     @OA\Response(
     *        response=200,
     *          description="Successful operation",
      *        @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                property="Survey",
     *                type="array",
     *                 @OA\Items(
     *                      @OA\Property(
     *                         property="survey_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="survey_name",
     *                         type="number",
     *                         example="my survey"
     *                      ),
     *                      @OA\Property(
     *                         property="survey_description",
     *                         type="number",
     *                         example="survey them all"
     *                      ),
     *                      @OA\Property(
     *                         property="privacy_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="button_color",
     *                         type="string",
     *                         example="#000000"
     *                      ),
     *                      @OA\Property(
     *                         property="background_color",
     *                         type="string",
     *                         example="#000000"
     *                      ),
     *                       @OA\Property(
     *                         property="active",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="date_created",
     *                         type="string",
     *                         example="17/05/2022"
     *                      ),
     *                      @OA\Property(
     *                         property="user_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                  ),
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
    public function getByUser()
    {   
        $user = auth()->user();

        $team_ids = getTeamIds();
        
        $survey = Survey::whereIn('team_id', $team_ids)
            ->orWhere('user_id',$user->user_id)
            ->get();

        if(!isset($survey)){
            return response()->json([
                'error' =>'Whoops, it looks like your survey doesn\'t exist'
            ],400);
        }
        return response()->json(['survey'=>$survey],201);
    }

    /**
     * @OA\Post(
     *      path="/api/survey/save",
     *      operationId="saveSurvey",
     *      tags={"Survey"},
     *      summary="Create a new Survey",
     *      description="Returns the generated Survey",
     *      @OA\RequestBody(
     *          required=true,
     *          description="Pass Survey details",
     *       @OA\JsonContent(
     *                      @OA\Property(
     *                         property="survey_name",
     *                         type="number",
     *                         example="my survey"
     *                      ),
     *                      @OA\Property(
     *                         property="survey_description",
     *                         type="number",
     *                         example="survey them all"
     *                      ),
     *                      @OA\Property(
     *                         property="privacy_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="button_color",
     *                         type="string",
     *                         example="#000000"
     *                      ),
     *                      @OA\Property(
     *                         property="background_color",
     *                         type="string",
     *                         example="#000000"
     *                      ),
     *                       @OA\Property(
     *                         property="active",
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
     *                property="survey",
     *                type="array",
     *                @OA\Items(
     *                       @OA\Property(
     *                         property="survey_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="survey_name",
     *                         type="number",
     *                         example="my survey"
     *                      ),
     *                      @OA\Property(
     *                         property="survey_description",
     *                         type="number",
     *                         example="survey them all"
     *                      ),
     *                      @OA\Property(
     *                         property="privacy_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="button_color",
     *                         type="string",
     *                         example="#000000"
     *                      ),
     *                      @OA\Property(
     *                         property="background_color",
     *                         type="string",
     *                         example="#000000"
     *                      ),
     *                       @OA\Property(
     *                         property="active",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="date_created",
     *                         type="string",
     *                         example="17/05/2022"
     *                      ),
     *                      @OA\Property(
     *                         property="user_id",
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

        $validator = Validator::make($request->all(), [
            'team_id' => 'integer|nullable',
            'privacy_id' => 'required|integer',
            'survey_name' => 'required|string|max:220',
            'survey_description' => 'string|nullable',
            'button_color' => 'string|max:7|nullable',
            'background_color' => 'string|max:7|nullable',
        ]);
        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);

        $survey = Survey::create(array_merge(
                $validator->validate(),
                ['date_created'=>now(),'active'=>1,'user_id'=>$user->user_id]
            ));
        return response()->json([
            'message' =>'Survey successfully saved!',
            'survey'=>$survey
        ],201);
    }

    /**
     * @OA\Post(
     *      path="/api/survey/update/{survey_id}",
     *      operationId="updateSurvey",
     *      tags={"Survey"},
     *      summary="Update a Survey",
     *      @OA\Parameter(
     *         name="survey_id",
     *         in="path",
     *         description="Search by survey_id",
     *         required=true,
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          description="Pass Survey details",
     *       @OA\JsonContent(
     *                      @OA\Property(
     *                         property="survey_name",
     *                         type="number",
     *                         example="my survey"
     *                      ),
     *                      @OA\Property(
     *                         property="survey_description",
     *                         type="number",
     *                         example="survey them all"
     *                      ),
     *                      @OA\Property(
     *                         property="privacy_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="button_color",
     *                         type="string",
     *                         example="#000000"
     *                      ),
     *                      @OA\Property(
     *                         property="background_color",
     *                         type="string",
     *                         example="#000000"
     *                      ),
     *                       @OA\Property(
     *                         property="active",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                ),
     *      ),
     *     @OA\Response(
     *        response=201,
     *          description="Successful operation",
     *        
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
    public function update($survey_id, Request $request){
        $user = auth()->user();
        $team_ids = getTeamIds();
        $t = Survey::where('survey_id',$survey_id)
            ->whereIn('team_id', $team_ids)
            ->orWhere('user_id',$user->user_id)
            ->first();

        if(empty($t) || !isset($t)){
            return response()->json([
                'error' =>'Whoops, it looks like your team doesn\'t exist'
            ],400);
        }

        $validator = Validator::make($request->all(), [
            'team_id'=> 'integer|nullable',
            'privacy_id' => 'required|integer',
            'survey_name' => 'required|string|max:220',
            'survey_description' => 'string|nullable',
            'button_color' => 'string|max:7|nullable',
            'background_color' => 'string|max:7|nullable',
            'active'=>'required|integer',
        ]);

        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);

        $affected = Survey::where('survey_id',$survey_id)->update($validator->validate());

        if($affected>0) {
            return response()->json([
                'message' =>'Team successfully updated!'
            ],201);
        }
             return response()->json([
                'error' =>'Whoops, something went wrong!'
            ],400);
         
    }

    /**
     * @OA\Post(
     *      path="/api/survey/delete/{survey_id}",
     *      operationId="deleteSurvey",
     *      tags={"Survey"},
     *      summary="Delete from your Surveys",
     *      @OA\Parameter(
     *         name="survey_id",
     *         in="path",
     *         description="Search by survey_id",
     *         required=true,
     *      ),
     *     @OA\Response(
     *        response=201,
     *          description="Successful operation",
     *        
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
    public function delete($survey_id){
        $user = auth()->user();
        $team_ids = getTeamIds();
        $t = Survey::where('survey_id',$survey_id)
            ->where('user_id',$user->user_id)
            ->first();
        if(!empty($t)){
            $quest = Question::where('survey_id',$survey_id)
                    ->select('question_id')
                    ->get();
            $qArr = [];
            foreach ($quest as $q) {
              array_push($qArr, $q->question_id); 
            }

            $defAnsw = DefinedAnswer::whereIn('question_id',$qArr)
                    ->delete();
            $nextQuest = NextQuestion::whereIn('question_id',$qArr)
                    ->delete();

            $q = Question::where('survey_id',$survey_id)
                    ->select('question_id')
                    ->delete();
            if($t->delete()>0) {
                return response()->json([
                    'message' =>'Survey successfully deleted!'
                ],201);
            }
        }

        return response()->json([
                'error' =>'Whoops, something went wrong!'
            ],201);
        
    }

}