<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Chat;


class ChatController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getAll()
    {
        return response()->json(['chat'=>Chat::all()],201);
    }

     public function getByUser()
    {
        $user = auth()->user();

        $allChat = Chat::where('user_id_from',$user->user_id)
            ->orWhere('user_id_to',$user->user_id)
            ->get();

        return response()->json(['chat'=>$allChat],201);
    }

    public function save(Request $request)
    {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
            'user_id_from' => 'required|integer',
        ]);
        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);
        
        $chat = Chat::create(array_merge($validator->validate(), ['user_id_to'=>$user->user_id, 'active'=>1]));

        return response()->json([
            'message' =>'Chat successfully saved!',
            'chat'=>$chat
        ],201);
    }

    public function update($chat_id, Request $request){
        $user = auth()->user();

        $chat = Chat::where('chat_id',$chat_id)
            ->where('user_id_from',$user->user_id)
            ->orWhere('user_id_to',$user->user_id)
            ->first();

        if(count($chat)==0){
            return response()->json([
                'error' =>'Whoops, this chat doesn\'t exist for you'
            ],201);
        }

        $validator = Validator::make($request->all(), [
            'active' => 'required|integer',
        ]);
        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);

        $affected = Chat::where('chat_id',$chat_id)->update($validator->validate());

        if($affected<1) {
            return response()->json([
                'error' =>'Whoops, something went wrong!'
            ],201); 
        }
        
        return response()->json([
            'message' =>'Chat successfully updated!'
        ],201);
             
    }

    public function delete($chat_id){
        $user = auth()->user();

        $chat = Chat::where('chat_id',$chat_id)
            ->where('user_id_from', $user->user_id)
            ->orWhere('user_id_to',$user->user_id)
            ->first();

        if($chat->delete()<1) {
            return response()->json([
                'error' =>'Whoops, something went wrong!'
            ],201);
        }
        return response()->json([
                'message' =>'Chat successfully deleted!'
            ],201);
             
    }

}