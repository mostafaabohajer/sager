<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    function Register(RegisterRequest $request){
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user'=>$user,
            'token'=>$token
        ]);
    }
    function login(LoginRequest $request){
        $remember = $request->remember ?? false;
        if(!Auth::attempt(['email'=>$request->email , 'password'=>$request->password] , $remember)){
            return response([
                'error' => "you email or password is not correct"
            ],422);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user'=>$user,
            'token'=>$token
        ]);
    }

    function logout(){
        $user = Auth::user();
        $user->currentAccessToken()->delete();
        return response([
           'status'=>true
        ]);
    }
    function me(Request $request){
        return $request->user();
    }



}
