<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class UserController extends Controller
{

    public function index(){
        $users = User::latest()->get();
        return response()->json($users);
    }

    public function store(Request $request){
        // print_r($request->all());
        // exit;
        // return response()->json($request->all());
        $validated = $request->validate([
        'name' => 'required',
        'email' => 'required|email',
        'password' => 'required',
        'dob' => 'required',
        'gender' => 'required',
        'languages'=> 'required',
        'city' => 'required',
        'image' => 'required',
        'info' => 'required'
       ]);

        try{
            if($request->has('file')){
                $fileName = time().'.'.$request->file->extension();
                $request->file->move(public_path('uploads'), $fileName);
                $validated['image'] = $fileName;
            }

            $userCreated = User::create($validated);
            $return = [
                'status' => 'success',
                'message' => 'User created successfully'
            ];
            return response()->json($return);
        }catch(\Exception $e){
            $return = [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
            return response()->json($return);
        }
    }
}
