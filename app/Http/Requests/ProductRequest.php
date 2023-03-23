<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }


    protected function prepareForValidation()
    {
        $this->merge([
            'user_id' => auth()->id(),

//            'slug' => preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', $this->name)).'-'.Str::random(5)
        ]);

    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name'=>'required|string',
            'description'=>'nullable|string',
            'quantity'=>'nullable|numeric|min:1',
            'price'=>'nullable|numeric|min:1',
            'image'=>'nullable',
            'user_id'=>'required|exists:users,id',
            'category_id'=>'required|exists:categories,id',
//            'slug'=>'required|string',
        ];
    }
}
