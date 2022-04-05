<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\UserFriend;
use App\Models\User;


class UserFriendController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getAll()
    {
        return response()->json(['userFriend'=>UserFriend::all()],201);
    }

     public function getByUser()
    {
        $user = auth()->user();

        $allFriends = UserFriend::where('user_id_to',$user->user_id)
        ->select('user_id_from')
            ->get();

        $usrFriend = User::whereIn('user_id', $allFriends)
            ->select('user_id','email','first_name', 'family_name', 'avatar')
            ->get();

        return response()->json(['friend'=>$usrFriend],201);
    }

    public function save(Request $request)
    {
        $usr = auth()->user();

        $validator = Validator::make($request->all(), [
            'user_id_from' => 'required|integer',
        ]);
        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);
        
        $userFriend = UserFriend::create(array_merge($validator->validate(), ['user_id_to'=>$usr->user_id, 'date_related'=>now()]));

        return response()->json([
            'message' =>'User Friend successfully saved!',
            'userFriend'=>$userFriend
        ],201);
    }

    public function delete($user_friend_id){
        $user = auth()->user();

        $userFriend = UserFriend::where('user_id_from', $user_friend_id)
            ->where('user_id_to',$user->user_id)
            ->first();

        if($userFriend->delete()<1) {
            return response()->json([
                'error' =>'Whoops, something went wrong!'
            ],201);
        }
        return response()->json([
                'message' =>'User Friend successfully deleted!'
            ],201);
             
    }

}