<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

/** @OA\Info(title="Surveyvor App - Technical Manual", version="1.0") */
class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register','publicData']]);
    }

    /**
     * @OA\Post(
     *      path="/api/auth/login",
     *      operationId="login",
     *      tags={"Auth"},
     *      summary="Get a JWT via given credentials",
     *      description="Returns a \Illuminate\Http\JsonResponse with the generated token",
     *      @OA\RequestBody(
     *          required=true,
     *			description="Pass user credentials",
	 *    		@OA\JsonContent(
	 *    		   required={"email","password"},
	 *    		   @OA\Property(property="email", type="string", format="email", example="user1@mail.com"),
	 *    		   @OA\Property(property="password", type="string", format="password", example="PassWord12345"),
	 *    		),
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Successful operation",
     *       ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad Request"
     *      ),
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
    public function login()
    {
        $credentials = request(['email', 'password']);
        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

     /**
     * @OA\Get(
     *      path="/api/auth/me",
     *      operationId="getLoggedUser",
     *      tags={"Auth"},
     *      summary="Get the authenticated User",
     *      description="Returns logged user data by authorization token passed",
     *      
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *           @OA\JsonContent(
     *				@OA\Property(
     *                 property="user_id",
     *                 type="number",
     *                 example="1",
     *             ),
     *             @OA\Property(
     *                 property="first_name",
     *                 type="string",
     *                 example="Dereck",
     *             ),
     *				@OA\Property(
     *                 property="family_name",
     *                 type="string",
     *                 example="Cepeda",
     *             ),
     *			   @OA\Property(
     *                 property="email",
     *                 type="string",
     *                 example="test@surveyvor.com",
     *             ),
     *				@OA\Property(
     *                 property="password",
     *                 type="string",
     *                 example="password1234",
     *             ),
     *				@OA\Property(
     *                 property="country_code",
     *                 type="string",
     *                 example="ES",
     *             ),
     *				@OA\Property(
     *                 property="avatar",
     *                 type="string",
     *                 example="www.myimageprofile.com",
     *             ),
     *				@OA\Property(
     *                 property="telephone",
     *                 type="number",
     *                 example="12345678",
     *             ),
     *         ),
     *       ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *      ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      ),
     *     )
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 86400
        ]);
    }

    /**
     * @OA\Post(
     *      path="/api/auth/register",
     *      operationId="register",
     *      tags={"Auth"},
     *      summary="Create a new User",
     *      description="Returns the generated User",
     *      @OA\RequestBody(
     *          required=true,
     *			description="Pass user details",
	 *    		@OA\JsonContent(
     *             @OA\Property(
     *                 property="first_name",
     *                 type="string",
     *                 example="Dereck",
     *             ),
     *				@OA\Property(
     *                 property="family_name",
     *                 type="string",
     *                 example="Cepeda",
     *             ),
     *			   @OA\Property(
     *                 property="email",
     *                 type="string",
     *                 example="test@surveyvor.com",
     *             ),
     *				@OA\Property(
     *                 property="password",
     *                 type="string",
     *                 example="password1234",
     *             ),
     *				@OA\Property(
     *                 property="country_code",
     *                 type="string",
     *                 example="ES",
     *             ),
     *				@OA\Property(
     *                 property="avatar",
     *                 type="string",
     *                 example="www.myimageprofile.com",
     *             ),
     *				@OA\Property(
     *                 property="telephone",
     *                 type="number",
     *                 example="12345678",
     *             ),
     *         ),
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Successful operation",
     *			@OA\JsonContent(
     *				@OA\Property(
     *                 property="user_id",
     *                 type="number",
     *                 example="1",
     *             ),
     *             @OA\Property(
     *                 property="first_name",
     *                 type="string",
     *                 example="Dereck",
     *             ),
     *				@OA\Property(
     *                 property="family_name",
     *                 type="string",
     *                 example="Cepeda",
     *             ),
     *			   @OA\Property(
     *                 property="email",
     *                 type="string",
     *                 example="test@surveyvor.com",
     *             ),
     *				@OA\Property(
     *                 property="password",
     *                 type="string",
     *                 example="password1234",
     *             ),
     *				@OA\Property(
     *                 property="country_code",
     *                 type="string",
     *                 example="ES",
     *             ),
     *				@OA\Property(
     *                 property="avatar",
     *                 type="string",
     *                 example="www.myimageprofile.com",
     *             ),
     *				@OA\Property(
     *                 property="telephone",
     *                 type="number",
     *                 example="12345678",
     *             ),
     *         ),
     *       ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad Request"
     *      ),
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
    public function register(Request $request){
	    $validator = Validator::make($request->all(), [
	        'first_name' => 'required|string|max:255',
	        'family_name' => 'required|string|max:255',
	        'email' => 'required|string|email|max:100|unique:users',
	        'password' => 'required|string|min:6',
	        'country_code' => 'required|string|max:3',
	        'avatar' =>'nullable|string',
	        'telephone'=>'nullable|integer',
	    ]);
	    if($validator->fails()){
	        return response()->json($validator->errors()->toJson(),400);
	    }
	    $user = User::create(array_merge(
	        $validator->validate(),
	        ['password' => bcrypt($request->password)]
	    ));
	   return response()->json([
	        'message' =>'User successfully registered!',
	        'user' => $user
	    ], 201 );
	}

	/**
     * @OA\Get(
     *      path="/api/auth/all/{user_id}",
     *      operationId="getPublicDataFromUser",
     *      tags={"Auth"},
     *      summary="Get a User's public data",
     *      description="Returns a User's public data",
     *      @OA\Parameter(
     *         name="user_id",
     *         in="path",
     *         description="Search by user_id",
     *         required=true,
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *           @OA\JsonContent(
     *				@OA\Property(
     *                 property="user_id",
     *                 type="number",
     *                 example="1",
     *             ),
     *             @OA\Property(
     *                 property="first_name",
     *                 type="string",
     *                 example="Dereck",
     *             ),
     *				@OA\Property(
     *                 property="family_name",
     *                 type="string",
     *                 example="Cepeda",
     *             ),
     *			   @OA\Property(
     *                 property="email",
     *                 type="string",
     *                 example="test@surveyvor.com",
     *             ),
     *				@OA\Property(
     *                 property="password",
     *                 type="string",
     *                 example="password1234",
     *             ),
     *				@OA\Property(
     *                 property="country_code",
     *                 type="string",
     *                 example="ES",
     *             ),
     *				@OA\Property(
     *                 property="avatar",
     *                 type="string",
     *                 example="www.myimageprofile.com",
     *             ),
     *				@OA\Property(
     *                 property="telephone",
     *                 type="number",
     *                 example="12345678",
     *             ),
     *         ),
     *       ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *      ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      ),
     *     )
     */
	 public function publicData($user_id)
    {
    	$usr = User::where('user_id',$user_id)
    		->select('user_id','email','first_name', 'family_name', 'avatar', 'country_code')
    		->first();
        return response()->json(["user"=>$usr]);
    }

    /**
     * @OA\Post(
     *      path="/api/auth/update/{user_id}",
     *      operationId="update",
     *      tags={"Auth"},
     *      summary="Update an existing User",
     *      @OA\Parameter(
     *         name="user_id",
     *         in="path",
     *         description="Search by user_id",
     *         required=true,
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *			description="Pass user details",
	 *    		@OA\JsonContent(
     *             @OA\Property(
     *                 property="first_name",
     *                 type="string",
     *                 example="Dereck",
     *             ),
     *				@OA\Property(
     *                 property="family_name",
     *                 type="string",
     *                 example="Cepeda",
     *             ),
     *				@OA\Property(
     *                 property="country_code",
     *                 type="string",
     *                 example="ES",
     *             ),
     *				@OA\Property(
     *                 property="avatar",
     *                 type="string",
     *                 example="www.myimageprofile.com",
     *             ),
     *				@OA\Property(
     *                 property="telephone",
     *                 type="number",
     *                 example="12345678",
     *             ),
     *         ),
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Successful operation"
     *       ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad Request"
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthenticated"
     *      ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      ),
     * )
     */
	public function update($user_id, Request $request){
	    $validator = Validator::make($request->all(), [
	        'first_name' => 'required|string|max:255',
	        'family_name' => 'required|string|max:255',
	        'country_code' => 'required|string|max:3',
	        'avatar' =>'nullable|string',
	        'telephone'=>'nullable|integer',
	    ]);
	    if($validator->fails()){
	        return response()->json($validator->errors()->toJson(),400);
	    }

	    $affected = User::where('user_id',$user_id)->update($validator->validate());

        if($affected<1) {
            return response()->json([
                'error' =>'Whoops, something went wrong!'
            ],201); 
        }
        
        return response()->json([
            'message' =>'User successfully updated!'
        ],201);
	}

}