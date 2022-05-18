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

      /**
     * @OA\Get(
     *      path="/api/userFriend/all",
     *      operationId="getNextQuestionsFromSurvey",
     *      tags={"User Friend"},
     *      summary="Get all the friends from the logged user",
     *      description="Returns a list of friends",
     *     @OA\Response(
     *        response=200,
     *          description="Successful operation",
     *        @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                property="definedAnswer",
     *                type="array",
     *                @OA\Items(
     *                      @OA\Property(
     *                         property="user_friend_id",
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
     *                         property="date_related",
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
     public function getByUser()
    {
        $user = auth()->user();

        $allFriends = UserFriend::where('user_id_to',$user->user_id)
        ->select('user_id_from')
            ->get();
         $allFriends2 =  UserFriend::where('user_id_from',$user->user_id)
        ->select('user_id_to')
            ->get();

        $usrFriend2 = User::whereIn('user_id', $allFriends2)
        ->orWhereIn('user_id', $allFriends)
            ->where('user_id', '!=', $user->user_id)
            ->select('user_id','email','first_name', 'family_name', 'avatar')
            ->get();

        return response()->json(['friend'=>$usrFriend2],201);
    }

     /**
     * @OA\Post(
     *      path="/api/userFriend/save",
     *      operationId="saveUserFriend",
     *      tags={"User Friend"},
     *      summary="Create a new User Friend",
     *      description="Returns the generated User Friend",
     *      @OA\RequestBody(
     *          required=true,
     *          description="Pass user Friend details",
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
     *                ),
     *      ),
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
     *                         property="user_friend_id",
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
     *                         property="date_related",
     *                         type="string",
     *                         example="17/05/2022"
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
        $usr = auth()->user();

        $validator = Validator::make($request->all(), [
            'user_id_to' => 'required|integer',
        ]);
        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);
        
        $userFriend = UserFriend::create(array_merge($validator->validate(), ['user_id_from'=>$usr->user_id, 'date_related'=>now()]));

        return response()->json([
            'message' =>'User Friend successfully saved!',
            'userFriend'=>$userFriend
        ],201);
    }

    /**
     * @OA\Post(
     *      path="/api/userFriend/delete/{user_friend_id}",
     *      operationId="deleteUserFriend",
     *      tags={"User Friend"},
     *      summary="Delete a User Friend",
     *      @OA\Parameter(
     *         name="user_friend_id",
     *         in="path",
     *         description="Search by user_friend_id",
     *         required=true,
     *      ),
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
     *                         property="user_friend_id",
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
     *                         property="date_related",
     *                         type="string",
     *                         example="17/05/2022"
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
    public function delete($user_friend_id){
        $user = auth()->user();

        $userFriend = UserFriend::where([['user_id_from', $user_friend_id],['user_id_to',$user->user_id]])
            ->orWhere([['user_id_from', $user->user_id],['user_id_to',$user_friend_id]])
            ->first();

        if($userFriend->delete()<1) {
            return response()->json([
                'error' =>'Whoops, something went wrong!'
            ],400);
        }
        return response()->json([
                'message' =>'User Friend successfully deleted!'
            ],201);
             
    }

}