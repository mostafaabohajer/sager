<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'name'=>$this->name,
            'slug'=>$this->slug,
            'description'=>$this->description,
            'quantity'=>$this->quantity,
            'price'=>$this->price,
            'image'=> $this->image,
            'image_url'=> $this->image ? URL::to($this->image) : null,
            'category_id' => CategoryResource::collection($this->categories)

        ];
    }
}
