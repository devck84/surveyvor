<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Privacy;

class PrivacyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * @OA\Get(
     *      path="/api/privacy/all",
     *      operationId="getAllPrivacyDetails",
     *      tags={"Privacy"},
     *      summary="Get all the Privacy Details",
     *      description="Returns Privacy Details",
     *     @OA\Response(
     *        response=200,
     *          description="Successful operation",
     *        @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                property="privacy",
     *                type="array",
     *                @OA\Items(
     *                      @OA\Property(
     *                         property="privacy_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="privacy_name",
     *                         type="string",
     *                         example="public"
     *                      ),
     *                      @OA\Property(
     *                         property="privacy_description",
     *                         type="string",
     *                         example="it is public"
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
    public function getAll()
    {        
        return response()->json(['privacy'=>Privacy::all()],201);
    }

    /**
     * @OA\Get(
     *      path="/api/privacy/all/{privacy_id}",
     *      operationId="getPrivacyDetailsByPrivacyId",
     *      tags={"Privacy"},
     *      summary="Get all the Privacy Details by privacy_id",
     *      description="Returns Privacy Details by privacy_id",
     *      @OA\Parameter(
     *         name="privacy_id",
     *         in="path",
     *         description="Search by privacy_id",
     *         required=true,
     *      ),
     *     @OA\Response(
     *        response=200,
     *          description="Successful operation",
     *        @OA\JsonContent(
     *                      @OA\Property(
     *                         property="privacy_id",
     *                         type="number",
     *                         example="1"
     *                      ),
     *                      @OA\Property(
     *                         property="privacy_name",
     *                         type="string",
     *                         example="public"
     *                      ),
     *                      @OA\Property(
     *                         property="privacy_description",
     *                         type="string",
     *                         example="it is public"
     *                      ),
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
    public function getById($privacy_id){
        $privacy = Privacy::where('privacy_id', $privacy_id)
            ->first();
        return response()->json(['privacy'=>$privacy],201);
    }

}