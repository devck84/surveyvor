<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Message;


class MessageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getAll()
    {
        return response()->json(['message'=>Message::all()],201);
    }

     public function getByChat($chat_id)
    {
        $user = auth()->user();

        $allMessages = Message::where('chat_id',$chat_id)
            ->where('sender_id',$user->user_id)
            ->orWhere('receiver_id',$user->user_id)
            ->get();

        return response()->json(['message'=>$allMessages],201);
    }

    public function save(Request $request)
    {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
            'receiver_id'=> 'required|integer',
            'chat_id'=> 'required|integer',
            'message_text'=> 'required|string',
        ]);
        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);
        
        $message = Message::create(array_merge($validator->validate(), ['sender_id'=>$user->user_id, 'date_sent'=>now(),'message_seen'=>0]));

        return response()->json([
            'message' =>'Message successfully saved!',
            'message_data'=>$message
        ],201);
    }

    public function update($message_id){
        $user = auth()->user();

        $message = Message::where('message_id',$message_id)
            ->orWhere('receiver_id',$user->user_id)
            ->first();

        if(count($message)<1 || empty($message)){
            return response()->json([
                'error' =>'Whoops, this message doesn\'t exist for you'
            ],201);
        }

        $affected = Message::where('message_id',$message_id)->update(['message_seen'=>1]);

        if($affected<1) {
            return response()->json([
                'error' =>'Whoops, something went wrong!'
            ],201); 
        }
        
        return response()->json([
            'message' =>'Message successfully updated!'
        ],201);
             
    }

}