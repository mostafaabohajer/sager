<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'name' => fake()->sentence(),
            'slug' => fake()->slug(),
            'description' => fake()->sentence(),
            'quantity' => fake()->numberBetween(1,5000),
            'price' => fake()->numberBetween(1,3000),
            'image' => fake()->imageUrl(500,500),
            'user_id' => fake()->numberBetween(1,100)
        ];
    }
}
