<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Invitation;
use App\Models\User;

class InvitationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getAll()
    {
        return response()->json(['invitation'=>Invitation::all()],201);
    }

     /**
     * @OA\Get(
     *      path="/api/invitation/mine",
     *      operationId="getMyInvitations",
     *      tags={"Invitation"},
     *      summary="Get all the invitations of the logged user",
     *      description="Returns all the invitations",
     *     @OA\Response(
     *        response=200,
     *          description="Successful operation",
     *        @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                property="invitation",
     *                type="array",
     *                @OA\Items(
     *                      @OA\Property(
     *                         property="invitation_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="sender_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="receiver_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="date_sent",
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
     public function getByReceiver()
    {
        $usr = auth()->user();

        $allSender = Invitation::where('receiver_id',$usr->user_id)
            ->select('sender_id')
            ->get();

        $allInvitation = User::whereIn('user_id', $allSender)
            ->select('user_id','email','first_name', 'family_name', 'avatar')
            ->get();

        return response()->json(['invitation'=>$allInvitation],201);
    }

    /**
     * @OA\Post(
     *      path="/api/invitation/save",
     *      operationId="saveInvitation",
     *      tags={"Invitation"},
     *      summary="Create an Invitation",
     *      description="Returns the generated Invitation",
     *      @OA\RequestBody(
     *          required=true,
     *          description="Pass user details",
     *       @OA\JsonContent(
     *                      @OA\Property(
     *                         property="sender_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="receiver_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="date_sent",
     *                         type="string",
     *                         example="17/05/2022"
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
     *                         property="invitation_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="sender_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="receiver_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="date_sent",
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
            'receiver_id' => 'required|integer',
        ]);
        if($validator->fails())
            return response()->json($validator->errors()->toJson(),400);
        
        $invitation = Invitation::create(array_merge($validator->validate(), ['sender_id'=>$usr->user_id, 'date_sent'=>now()]));

        return response()->json([
            'message' =>'Invitation successfully saved!',
            'invitation'=>$invitation
        ],201);
    }

    /**
     * @OA\Post(
     *      path="/api/invitation/delete/{sender_id}",
     *      operationId="deleteInvitation",
     *      tags={"Invitation"},
     *      summary="Delete from your Invitations",
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
    public function delete($sender_id){
        $user = auth()->user();

        $invitation = Invitation::where('sender_id', $sender_id)
            ->where('receiver_id',$user->user_id)
            ->first();

        if($invitation->delete()<1) {
            return response()->json([
                'error' =>'Whoops, something went wrong!'
            ],201);
        }
        return response()->json([
                'message' =>'Invitation successfully deleted!'
            ],201);
             
    }

}