<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user()->id;
        return UserResource::collection(
            User::orderBy('updated_at', 'desc')->whereNot('id',$user)->paginate(10)
        );

    }
    public function show($slug)
    {

        return UserResource::collection(
            User::where('slug',$slug)->get()
        );

    }

    public function store(UserRequest $request)
    {
        $Category = User::create($request->all());
        return new UserResource($Category);
    }


    public function update(UserUpdateRequest $request, $slug)
    {
        $Category = User::where('slug',$slug);
        if(!$Category->get()->isEmpty()){
            $request->request->remove('slug');
            $Category->update($request->all());
        }
        return "done";
    }

    public function destroy(Request $request, User $user)
    {
        $user->delete();
        return response('', 204);
    }
    public function allUser(Request $request)
    {
        return UserResource::collection(
            User::orderBy('created_at')->get()
        );
    }
}
