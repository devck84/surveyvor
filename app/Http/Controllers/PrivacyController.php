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

    public function getAll()
    {        
        return response()->json(['Privacy'=>Privacy::all()],201);
    }

    public function getById($privacy_id){
        $privacy = Privacy::where('privacy_id', $privacy_id)
            ->first();
        return response()->json(['privacy'=>$privacy],201);
    }

}