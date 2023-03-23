<?php

namespace App\Http\Controllers;

use App\Models\ResetCodePassword;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
class ResetPasswordController extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'code' => 'required|string|exists:reset_code_passwords',
            'password' => [
                'required',
                'string',
                'min:8',             // must be at least 10 characters in length
                'regex:/[a-zA-Z]/',      // must contain at least one lowercase letter
                'regex:/[0-9]/',      // must contain at least one digit
            ],
        ]);

        // find the code
        $passwordReset = ResetCodePassword::firstWhere('code', $request->code);

        // check if it does not expired: the time is one hour
        if ($passwordReset->created_at > now()->addHour()) {
            $passwordReset->delete();
            return response(['message' => trans('passwords.code_is_expire')], 422);
        }


        // find user's email
        $user = User::firstWhere('email', $passwordReset->email);

        // update user password
        $user->update(
            [
                'password'=>bcrypt($request->password)
            ]
        );

        // delete current code
        $passwordReset->delete();


        return response(['message' =>'password has been successfully reset'], 200);
    }
}
