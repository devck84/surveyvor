<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Team;

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
        
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'team_name' => 'required|string|max:255',
            'team_description' => 'required|string',
            'team_url_invitation' => 'required|string',
        ]);
        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);
        
        $team = Team::create($validator->validate());
        return response()->json([
            'message' =>'Team successfully saved!',
            'team'=>$team
        ],201);
    }

    public function update($team_id, Request $request){

        $t = Team::where('team_id',$team_id)
            ->first();

        if(empty($t)){
            return response()->json([
                'error' =>'Whoops, it looks like your team doesn\'t exist'
            ],201);
        }

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'team_name' => 'required|string|max:255',
            'team_description' => 'required|string',
            'team_url_invitation' => 'required|string',
        ]);
        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);

        $t->user_id = $request->user_id;
        $t->team_name = $request->team_name;
        $t->team_description = $request->team_description;
        $t->team_url_invitation = $request->team_url_invitation;

        if($t->save()>0) {
            return response()->json([
                'message' =>'Team successfully updated!'
            ],201);
        }else{
             return response()->json([
                'error' =>'Whoops, something went wrong!'
            ],201);
         }
    }

    public function delete($team_id){
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