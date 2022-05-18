<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Crypt;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Team;
use App\Models\TeamMember;
use App\Http\Controllers\TeamController;

class TeamController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getAll()
    {        
        return response()->json(['teams'=>Team::all()],201);
    }
    
    /**
     * @OA\Get(
     *      path="/api/team/all/{team_id}",
     *      operationId="getTeam",
     *      tags={"Team"},
     *      summary="Get a team from mine ones",
     *      description="Returns a team",
     *      @OA\Parameter(
     *         name="team_id",
     *         in="path",
     *         description="Search by team_id",
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
     *                         property="team_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="user_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="team_name",
     *                         type="string",
     *                         example="team name"
     *                      ),
     *                      @OA\Property(
     *                         property="team_description",
     *                         type="string",
     *                         example="my team desc"
     *                      ),
     *                      @OA\Property(
     *                         property="team_url_invitation",
     *                         type="string",
     *                         example="www.invite.com"
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
    public function getById($team_id)
    {        
        $team = Team::where('team_id',$team_id)->first();
        return response()->json(['team'=>$team],201);
    }

    /**
     * @OA\Get(
     *      path="/api/team/mine",
     *      operationId="getMyTeams",
     *      tags={"Team"},
     *      summary="Get all my teams",
     *      description="Returns my teams",
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
     *                         property="team_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="user_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="team_name",
     *                         type="string",
     *                         example="team name"
     *                      ),
     *                      @OA\Property(
     *                         property="team_description",
     *                         type="string",
     *                         example="my team desc"
     *                      ),
     *                      @OA\Property(
     *                         property="team_url_invitation",
     *                         type="string",
     *                         example="www.invite.com"
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
    public function getByUser()
    {   
        $user = auth()->user();

         $team_members = TeamMember::where('user_id',$user->user_id)
            ->select('team_id')
            ->get();

        $team = Team::whereIn('team_id',$team_members)->get();

        if(!isset($team)){
            return response()->json([
                'error' =>'Whoops, it looks like your team doesn\'t exist'
            ],201);
        }
        return response()->json(['teams'=>$team],201);
    }
   

    /**
     * @OA\Post(
     *      path="/api/team/save",
     *      operationId="saveTeam",
     *      tags={"Team"},
     *      summary="Create a new Team",
     *      description="Returns the generated Team",
     *      @OA\RequestBody(
     *          required=true,
     *          description="Pass team details",
     *  @OA\JsonContent(
     *                      @OA\Property(
     *                         property="team_name",
     *                         type="string",
     *                         example="team name"
     *                      ),
     *                      @OA\Property(
     *                         property="team_description",
     *                         type="string",
     *                         example="my team desc"
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
     *                         property="team_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="user_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="team_name",
     *                         type="string",
     *                         example="team name"
     *                      ),
     *                      @OA\Property(
     *                         property="team_description",
     *                         type="string",
     *                         example="my team desc"
     *                      ),
     *                      @OA\Property(
     *                         property="team_url_invitation",
     *                         type="string",
     *                         example="www.invite.com"
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
            'team_name' => 'required|string|max:255',
            'team_description' => 'required|string',
        ]);
        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);
        
        $team = Team::create( array_merge($validator->validate(),['user_id'=>$user->user_id]) );
        $timeCreated = Crypt::encryptString(date("m-d-Y H:i:s"));
        $urlTeam = '/invite/'.$team->team_id.'/'.$timeCreated;
        Team::where('team_id',$team->team_id)->update(['team_url_invitation'=>$urlTeam]);
        return response()->json([
            'message' =>'Team successfully saved!',
            'team'=>$team
        ],201);
    }

    /**
     * @OA\Post(
     *      path="/api/team/update/{team_id}",
     *      operationId="updateTeam",
     *      tags={"Team"},
     *      summary="Update a Team",
     *      @OA\Parameter(
     *         name="team_id",
     *         in="path",
     *         description="Search by team_id",
     *         required=true,
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          description="Pass team details",
     *  @OA\JsonContent(
     *                      @OA\Property(
     *                         property="team_name",
     *                         type="string",
     *                         example="team name"
     *                      ),
     *                      @OA\Property(
     *                         property="team_description",
     *                         type="string",
     *                         example="my team desc"
     *                      ),
     *                ),
     *      ),
     *     @OA\Response(
     *        response=200,
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
    public function update($team_id, Request $request){
        $teamIds = getTeamIds();
        if(!in_array($team_id,$teamIds)){
             return response()->json([
                'error' =>'Whoops, it looks like your team doesn\'t exist'
            ],201);
        }

        $t = Team::where('team_id',$team_id)
            ->first();

        $validator = Validator::make($request->all(), [
            'team_name' => 'required|string|max:255',
            'team_description' => 'required|string',
        ]);
        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);

        $affected = Team::where('team_id',$team_id)->update($validator->validate());

        if($affected>0) {
            return response()->json([
                'message' =>'Team successfully updated!'
            ],201);
        }
        return response()->json([
                'error' =>'Whoops, something went wrong!'
            ],201);
    }
     /**
     * @OA\Post(
     *      path="/api/team/delete/{team_id}",
     *      operationId="deleteTeam",
     *      tags={"Team"},
     *      summary="Delete a Team",
     *      @OA\Parameter(
     *         name="team_id",
     *         in="path",
     *         description="Search by team_id",
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
    public function delete($team_id){
        $teamIds = getTeamIds();
        if(!in_array($team_id,$teamIds)){
             return response()->json([
                'error' =>'Whoops, it looks like your team doesn\'t exist'
            ],201);
        }

        $t = Team::where('team_id',$team_id)
            ->first();

        if($t->delete()<1) {
            return response()->json([
                'error' =>'Whoops, something went wrong!'
            ],201);
            
        }

        return response()->json([
                'message' =>'Team successfully deleted!'
            ],201);
    }

}