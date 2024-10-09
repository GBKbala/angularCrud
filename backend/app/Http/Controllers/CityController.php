<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\City;

class CityController extends Controller
{
    public function getCities(){
        $cities = City::select('id','name')->get();
        return response()->json($cities);
    } 
}
