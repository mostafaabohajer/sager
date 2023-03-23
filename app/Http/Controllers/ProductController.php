<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user()->id;
        return ProductResource::collection(
            Product::where('user_id',$user)->orderBy('updated_at', 'desc')->paginate(2)
        );

    }
    public function show($slug)
    {

        return ProductResource::collection(
            Product::where('slug',$slug)->where('user_id',auth()->id())->get()
        );

    }

    public function store(ProductRequest $request)
    {
//        return $request->all();

        if(isset($request->image)){
            $data = $request->all();
            $path = $this->saveImage($data['image']);
            $request->merge(['image' => $path]);
        }
        $request->quantity == null ? $request->merge(['quantity' => 1]): false;
        $request->price == null ? $request->merge(['price' => 1]): false;

        $product = Product::create($request->all());
        foreach ($request->get('category_id') as $key => $value) {
            $product->categories()->attach($value);
        }
        return new ProductResource($product);

    }


    public function update(ProductRequest $request, $slug)
    {

        $product = Product::where('slug',$slug)->where('user_id',auth()->id());


        if(!$product->get()->isEmpty()){
            if(isset($request->image)){
                if($request->image != URL::to($product->first()->image)){
                    $path = $this->saveImage($request->image);
                    $request->merge(['image' => $path]);
                    if(File::exists($product->first()->image)){
                        $path_old = public_path($product->first()->image);
                        File::delete($path_old);
                    }
                }else{
                    $request->merge(['image' => $product->first()->image]);
                }
            }

            $product->first()->categories()->detach();
            foreach ($request->get('category_id') as $key => $value) {
                $product->first()->categories()->attach($value);
            }
            $request->quantity == null ? $request->merge(['quantity' => 1]): false;
            $request->price == null ? $request->merge(['price' => 1]): false;

            $data = $request->all();
//            $request->request->remove('category_id');
            unset($data['category_id']);
            unset($data['slug']);

            $product->update($data);

        }

        return "done";
//        if(isset($data['image'])){
//            $path = $this->saveImage($data['image']);
//            $data['image'] = $path;
//            if($product->image){
//                $path_old = public_path($product->image);
//                File::delete($path_old);
//            }
//        }

    }

    public function destroy(Request $request, Product $product)
    {
        $user = $request->user();
        if ($user->id !== $product->user_id) {
            return abort(403, 'Unauthorized action.');
        }

        $product->delete();

        if ($product->image) {
            $path_old = public_path($product->image);
            File::delete($path_old);
        }

        return response('', 204);
    }

    private function saveImage($image){
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            $image = substr($image, strpos($image, ',') + 1);
            $type = strtolower($type[1]); // jpg, png, gif
            if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new \Exception('invalid image type');
            }
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);
            if ($image === false) {
                throw new \Exception('base64_decode failed');
            }
        } else {
            throw new \Exception('did not match data URI with image data');
        }

        $dir = 'images/';
        $file = Str::random() . '.' . $type;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;
        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $image);

        return $relativePath;
    }
}
