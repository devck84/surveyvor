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

    /**
     * @OA\Get(
     *      path="/api/message/allByChat/{chat_id}",
     *      operationId="getMessagesByChat",
     *      tags={"Message"},
     *      summary="Get all the messages from a chat",
     *      description="Returns a list of messages",
     *      @OA\Parameter(
     *         name="chat_id",
     *         in="path",
     *         description="Search by chat_id",
     *         required=true,
     *      ),
     *     @OA\Response(
     *        response=200,
     *          description="Successful operation",
     *        @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                property="message",
     *                type="array",
     *                @OA\Items(
     *                      @OA\Property(
     *                         property="message_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="receiver_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="sender_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="chat_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="message_text",
     *                         type="string",
     *                         example="hello there!"
     *                      ),
     *                      @OA\Property(
     *                         property="date_sent",
     *                         type="string",
     *                         example="17/05/2022"
     *                      ),
     *                      @OA\Property(
     *                         property="message_seen",
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
     public function getByChat($chat_id)
    {
        $user = auth()->user();

        $allMessages = Message::where('chat_id',$chat_id)
            ->where('sender_id',$user->user_id)
            ->orWhere('receiver_id',$user->user_id)
            ->get();

        return response()->json(['message'=>$allMessages],201);
    }

    /**
     * @OA\Post(
     *      path="/api/message/save",
     *      operationId="saveMessage",
     *      tags={"Message"},
     *      summary="Create a new Message",
     *      description="Returns the generated Message",
     *      @OA\RequestBody(
     *          required=true,
     *          description="Pass user details",
     *       @OA\JsonContent(
     *                      @OA\Property(
     *                         property="receiver_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="chat_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="message_text",
     *                         type="string",
     *                         example="hello there!"
     *                      ),
     *                ),
     *      ),
     *     @OA\Response(
     *        response=200,
     *          description="Successful operation",
     *        @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                property="message_data",
     *                type="array",
     *                @OA\Items(
     *                       @OA\Property(
     *                         property="message_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="receiver_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="sender_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="chat_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="message_text",
     *                         type="string",
     *                         example="hello there!"
     *                      ),
     *                      @OA\Property(
     *                         property="date_sent",
     *                         type="string",
     *                         example="17/05/2022"
     *                      ),
     *                      @OA\Property(
     *                         property="message_seen",
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

    /**
     * @OA\Post(
     *      path="/api/message/updateStatus/{message_id}",
     *      operationId="updateMessage",
     *      tags={"Message"},
     *      summary="Update a Message",
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