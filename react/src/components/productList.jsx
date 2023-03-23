import React from "react";
import {PencilIcon,TrashIcon ,ChevronDownIcon} from "@heroicons/react/24/solid";
import TButton from "./core/tButton.jsx";



export default function ProductList({product , onDeleteClick ,onQuantityClick}) {
  return (
    <div className="flex justify-between items-center flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-8 h-48 object-cover"
      />
      <h4 className="mt-4 text-lg font-bold">{product.name}</h4>
      <h4 className="mt-4 text-lg font-bold">{product.quantity}</h4>
      <div className="flex justify-between items-center mt-3">
      {product.id && (
        <TButton onClick={ev => onQuantityClick(product.id)} circle link color="indigo">
          <ChevronDownIcon className="w-5 h-5 m-2" />
        </TButton>
      )}
      <TButton to={`/product/${product.slug}`} circle link color="green">
        <PencilIcon className="w-5 h-5 m-2"/>
      </TButton>
      {product.id && (
        <TButton onClick={ev => onDeleteClick(product.id)} circle link color="red">
          <TrashIcon className="w-5 h-5 m-2" />
        </TButton>
      )}
    </div>
    </div>
  )
}
