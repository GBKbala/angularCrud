<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Hash;
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
            // $validated['languages'] = 
            $validated['password'] = Hash::make($validated['password']);
            $userCreated = User::create($validated);
            $return = [
                'status' => 'success',
                'message' => 'User created successfully'
            ];
        }catch(\Exception $e){
            $return = [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
            
        }
        return response()->json($return);
    }

    public function edit($id){
        $user = User::find($id);
        return response()->json($user);
    }

    public function update(Request $request, $id){

    }

    public function destroy(Request $request, $id){
        $user = User::find($id);
        try{
            $deleteUser = $user->delete();
            $return = [
                'status' => 'success',
                'message' => 'Deleted Successfully'
            ];
        }catch(\Exception $e){
            $return = [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
        return response()->json($return);
    }
}
