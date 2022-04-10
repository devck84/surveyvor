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

    public function getByTeam($team_id)
    {
        $user = auth()->user();

        $team = Team::where([
                ['team_id',$team_id],
                ['user_id',$user->user_id]
            ])
            ->first();

        if(isset($team)){
            return response()->json(['error'=>'It looks like it is not your team'],401);
        }

        $team_members = TeamMember::where('team_id',$team->team_id)->get();
        return response()->json(['team_members'=>$team_members],201);
    }

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

    public function saveInvitation(Request $request)
    {  
        $user = auth()->user();

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