<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Team;
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

    public function save(Request $request)
    {  
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'team_id' => 'required|integer',
        ]);
        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);
        
        $teamMember = TeamMember::create($validator->validate());
        return response()->json([
            'message' =>'Team Member successfully saved!',
            'team_member'=>$teamMember
        ],201);
    }

    public function delete($team_id){
        $t = TeamMember::where('team_member_id',$team_id)
            ->first();

        if($t->delete()>0) {
            return response()->json([
                'message' =>'Team Member successfully deleted!'
            ],201);
        }else{
             return response()->json([
                'error' =>'Whoops, something went wrong!'
            ],201);
         }
    }
}