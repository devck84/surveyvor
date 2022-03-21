<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Crypt;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Team;
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

    public function getByUser()
    {   
        $user = auth()->user();

        $team = Team::where('user_id',$user->user_id)->get();
        if(!isset($team)){
            return response()->json([
                'error' =>'Whoops, it looks like your team doesn\'t exist'
            ],201);
        }
        return response()->json(['teams'=>$team],201);
    }

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
        $urlTeam = SERVER_NAME.'/invite/'.$team->team_id.'/'.$timeCreated;
        Team::where('team_id',$team->team_id)->update(['team_url_invitation'=>$urlTeam]);
        return response()->json([
            'message' =>'Team successfully saved!',
            'team'=>$team
        ],201);
    }

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