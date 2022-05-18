<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Chat;
use Illuminate\Support\Facades\DB;

class ChatController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth', ['except'=>['getAll']]);
    }
    public function getAll()
    {
        $chat = DB::select(DB::raw(" 
           select chat_id, active, (select concat(first_name, ' ', family_name) from [user] u where c.user_id_from = u.user_id) as user_name_from, (select concat(first_name, ' ', family_name) from [user] u where c.user_id_to = u.user_id)  as user_name_to
from chat c"
        ));
        return response()->json(['chat'=>$chat],201);
    }

     /**
     * @OA\Get(
     *      path="/api/chat/all/{chat_id}",
     *      operationId="getFromChats",
     *      tags={"Chat"},
     *      summary="Get a chat by chat_id",
     *      description="Returns a chat",
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
     *                      @OA\Property(
     *                         property="chat_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="user_id_from",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="user_id_to",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="active",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      
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
    public function getById($chat_id)
    {
        $user = auth()->user();

        $chat = Chat::where('chat_id',$chat_id)
            ->where('user_id_from',$user->user_id)
            ->orWhere('user_id_to',$user->user_id)
            ->get();

        return response()->json(['chat'=>$chat],201);
    }

    /**
     * @OA\Get(
     *      path="/api/chat/mine",
     *      operationId="getMyChats",
     *      tags={"Chat"},
     *      summary="Get my chats",
     *      description="Returns my chats",
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
     *                         property="chat_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="user_id_from",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="user_id_to",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="active",
     *                         type="number",
     *                         example="1"
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
     public function getByUserLogged()
    {
        $user = auth()->user();

        $allChat = Chat::where('user_id_from',$user->user_id)
            ->orWhere('user_id_to',$user->user_id)
            ->get();

        return response()->json(['chat'=>$allChat],201);
    }

    /**
     * @OA\Get(
     *      path="/api/chat/user/{user_id}",
     *      operationId="getChatPerSender",
     *      tags={"Chat"},
     *      summary="Get a chat by user_id (user_id_from)",
     *      description="Returns a chat by user_id (user_id_from)",
     *     @OA\Response(
     *        response=200,
     *          description="Successful operation",
     *        @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                property="chat",
     *                type="array",
     *                @OA\Items(
     *                      @OA\Property(
     *                         property="chat_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="user_id_from",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="user_id_to",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="active",
     *                         type="number",
     *                         example="1"
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
    public function getByUser($user_id)
    {
        $user = auth()->user();

        $allChat = Chat::where('user_id_from',$user_id)
            ->where('user_id_to',$user->user_id)
            ->first();

        return response()->json(['chat'=>$allChat],201);
    }

      /**
     * @OA\Post(
     *      path="/api/chat/save",
     *      operationId="saveChat",
     *      tags={"Chat"},
     *      summary="Create a new Chat",
     *      description="Returns the generated Chat",
     *      @OA\RequestBody(
     *          required=true,
     *          description="Pass Chat details",
     *       @OA\JsonContent(
     *                      @OA\Property(
     *                         property="user_id_from",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="user_id_to",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="active",
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
     *                property="Chat",
     *                type="array",
     *                @OA\Items(
     *                      @OA\Property(
     *                         property="chat_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="user_id_from",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="user_id_to",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="active",
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

    /**
     * @OA\Post(
     *      path="/api/chat/update/{chat_id}",
     *      operationId="updateChat",
     *      tags={"Chat"},
     *      summary="Update a Chat",
     *      @OA\RequestBody(
     *          required=true,
     *          description="Pass Chat details",
     *       @OA\JsonContent(
     *                      @OA\Property(
     *                         property="user_id_from",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="user_id_to",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="active",
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
     *          response=403,
     *          description="Forbidden"
     *      ),
     * )
     */
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

    /**
     * @OA\Post(
     *      path="/api/chat/delete/{chat_id}",
     *      operationId="deleteChat",
     *      tags={"Chat"},
     *      summary="Delete a Chat",
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