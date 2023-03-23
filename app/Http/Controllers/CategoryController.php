<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function index(Request $request)
    {
        return CategoryResource::collection(
            Category::orderBy('updated_at', 'desc')->paginate(10)
        );

    }
    public function show($slug)
    {
        return CategoryResource::collection(
            Category::where('slug',$slug)->get()
        );
    }

    public function store(CategoryRequest $request)
    {
        $Category = Category::create($request->all());

        return new CategoryResource($Category);
    }


    public function update(Request $request, $slug)
    {
        $Category = Category::where('slug',$slug);


        if(!$Category->get()->isEmpty()){
            $request->request->remove('slug');
            $Category->update($request->all());
        }
        return "done";
    }

    public function destroy(Request $request, Category $Category)
    {
        if($Category->products->isEmpty()){
            $Category->delete();
            return response()->json(['status' => 204]);
        }else{
            return response()->json(['status' => 501]);
        }
    }

    public function allCategory(Request $request)
    {
        return CategoryResource::collection(
            Category::orderBy('created_at')->get()
        );

    }
}
