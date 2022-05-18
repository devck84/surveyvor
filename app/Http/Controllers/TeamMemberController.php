<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Team;
use App\Models\User;
use App\Models\TeamMember;

class TeamMemberController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getAll()
    {
        return response()->json(['team_members'=>TeamMember::all()],201);
    }

     /**
     * @OA\Get(
     *      path="/api/teamMember/mine",
     *      operationId="getTeamMembers",
     *      tags={"Team Member"},
     *      summary="Get all the team members related to you",
     *      description="Returns a list of the team members related to you",
     *     @OA\Response(
     *        response=200,
     *          description="Successful operation",
     *        @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                property="teamMember",
     *                type="array",
     *                @OA\Items(
     *              @OA\Property(
     *                 property="user_id",
     *                 type="number",
     *                 example="1",
     *             ),
     *             @OA\Property(
     *                 property="first_name",
     *                 type="string",
     *                 example="Dereck",
     *             ),
     *              @OA\Property(
     *                 property="family_name",
     *                 type="string",
     *                 example="Cepeda",
     *             ),
     *             @OA\Property(
     *                 property="email",
     *                 type="string",
     *                 example="test@surveyvor.com",
     *             ),
     *              @OA\Property(
     *                 property="password",
     *                 type="string",
     *                 example="password1234",
     *             ),
     *              @OA\Property(
     *                 property="country_code",
     *                 type="string",
     *                 example="ES",
     *             ),
     *              @OA\Property(
     *                 property="avatar",
     *                 type="string",
     *                 example="www.myimageprofile.com",
     *             ),
     *              @OA\Property(
     *                 property="telephone",
     *                 type="number",
     *                 example="12345678",
     *             ),
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
    public function getMine()
    {
        $user = auth()->user();
        $teamids = getTeamIds();

        $team_member_ids = TeamMember::whereIn('team_id',$teamids)
            ->select('user_id')
            ->get();

        $allMembers = User::join('TeamMember', 'user.user_id', '=', 'TeamMember.user_id')
            ->whereIn('user.user_id', $team_member_ids)
            ->select('User.*', 'TeamMember.team_id')
            ->get();
        

        return response()->json(['team_members'=>$allMembers],201);
    }

    /**
     * @OA\Get(
     *      path="/api/teamMember/all/{team_id}",
     *      operationId="getTeamMembersByTeam",
     *      tags={"Team Member"},
     *      summary="Get all the team members by team_id provided",
     *      description="Returns a list of the team members by team_id provided",
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
     *                property="teamMember",
     *                type="array",
     *                @OA\Items(
     *              @OA\Property(
     *                 property="user_id",
     *                 type="number",
     *                 example="1",
     *             ),
     *             @OA\Property(
     *                 property="first_name",
     *                 type="string",
     *                 example="Dereck",
     *             ),
     *              @OA\Property(
     *                 property="family_name",
     *                 type="string",
     *                 example="Cepeda",
     *             ),
     *             @OA\Property(
     *                 property="email",
     *                 type="string",
     *                 example="test@surveyvor.com",
     *             ),
     *              @OA\Property(
     *                 property="password",
     *                 type="string",
     *                 example="password1234",
     *             ),
     *              @OA\Property(
     *                 property="country_code",
     *                 type="string",
     *                 example="ES",
     *             ),
     *              @OA\Property(
     *                 property="avatar",
     *                 type="string",
     *                 example="www.myimageprofile.com",
     *             ),
     *              @OA\Property(
     *                 property="telephone",
     *                 type="number",
     *                 example="12345678",
     *             ),
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
    public function getByTeam($team_id)
    {

        $allMembers = User::join('TeamMember', 'user.user_id', '=', 'TeamMember.user_id')
            ->where('TeamMember.team_id', $team_id)
            ->select('User.*')
            ->get();
        

        return response()->json(['team_members'=>$allMembers],201);
    }


    /**
     * @OA\Post(
     *      path="/api/teamMember/save",
     *      operationId="saveTeamMember",
     *      tags={"Team Member"},
     *      summary="Create a new Team Member",
     *      description="Returns the generated Team Member",
     *      @OA\RequestBody(
     *          required=true,
     *          description="Pass Team Member details",
     *       @OA\JsonContent(
     *                      @OA\Property(
     *                         property="team_id",
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
     *                property="teamMember",
     *                type="array",
     *                @OA\Items(
      *                     @OA\Property(
     *                         property="team_member_id",
     *                         type="number",
     *                         example="1"
     *                      ),
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
     *                         property="date_registered",
     *                         type="string",
     *                         example="17/05/2022"
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
        $validator = Validator::make($request->all(), [
            'team_id' => 'required|integer',
        ]);
        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);
        
        $teamMember = TeamMember::create(array_merge($validator->validate(),['user_id'=>$user->user_id, 'date_registered'=>now()]));
        return response()->json([
            'message' =>'Team Member successfully saved!',
            'team_member'=>$teamMember
        ],201);
    }

    /**
     * @OA\Post(
     *      path="/api/teamMember/saveByInvitation",
     *      operationId="saveByInvitation",
     *      tags={"Team Member"},
     *      summary="Create a new Team Member by invitation link",
     *      description="Returns the generated Team Member",
     *      @OA\RequestBody(
     *          required=true,
     *          description="Pass Invitation details",
     *       @OA\JsonContent(
     *                      @OA\Property(
     *                         property="team_id",
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
     *                property="teamMember",
     *                type="array",
     *                @OA\Items(
      *                     @OA\Property(
     *                         property="team_member_id",
     *                         type="number",
     *                         example="1"
     *                      ),
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
     *                         property="date_registered",
     *                         type="string",
     *                         example="17/05/2022"
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
     *          response=400,
     *          description="Data Passed Error",
     *      ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      ),
     * )
     */
    public function saveInvitation(Request $request)
    {  
        $user = auth()->user();

        $teamids = getTeamIds();

        if(in_array($request->team_id,$teamids)){
         return response()->json([
                    'error' =>'Whoops, something is not okay over here'
                ],400);
        }

        $likeClausule = '%'.$request->team_id.'/'.$request->token;

        $team = Team::where('team_url_invitation', 'like', $likeClausule)
            ->select('team_id')
            ->first();



        if($team->team_id != $request->team_id)
             return response()->json([
            'error' =>'Whoops, something is not okay over here'
        ],400);
        

        $validator = Validator::make($request->all(), [
            'team_id' => 'required|integer',
        ]);
        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);
        
        $teamMember = TeamMember::create(array_merge($validator->validate(),['user_id'=>$user->user_id, 'date_registered'=>now()]));
        return response()->json([
            'message' =>'Team Member successfully saved!',
            'team_member'=>$teamMember
        ],201);
    }

     /**
     * @OA\Post(
     *      path="/api/teamMember/delete",
     *      operationId="deleteByTeam",
     *      tags={"Team Member"},
     *      summary="Delete a Team Member by Team Id and User (by token provided)",
     *      @OA\RequestBody(
     *          required=true,
     *          description="Pass Team details to leave",
     *       @OA\JsonContent(
     *                      @OA\Property(
     *                         property="team_id",
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
     *          response=400,
     *          description="Data Passed Error",
     *      ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      ),
     * )
     */
    public function delete($team_id){
        $user = auth()->user();

        $t = TeamMember::where([
                ['team_id',$team_id],
                ['user_id',$user->user_id]
            ])
            ->first();

        if(!isset($t) || $t->delete()<1) {
            return response()->json([
                'error' =>'Whoops, something went wrong!'
            ],201);
        }
        return response()->json([
                'message' =>'Team Member successfully deleted!'
            ],201);
    }
}