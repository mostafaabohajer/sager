import React from "react";
import {PencilIcon,TrashIcon} from "@heroicons/react/24/solid";
import TButton from "./core/tButton.jsx";



export default function CategorytList({category , onDeleteClick}) {
  return (

    <div className="flex justify-between items-center flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
      <h4 className="mt-4 text-lg font-bold">{category.name}</h4>
      <h4 className="mt-4 text-lg font-bold">{category.categories_number}</h4>
      <div className="flex justify-between items-center mt-3">
      <TButton to={`/category/${category.slug}`} circle link color="green">
        <PencilIcon className="w-5 h-5 m-2"/>
      </TButton>

      {category.id && (
        <TButton onClick={ev => onDeleteClick(category.id)} circle link color="red">
          <TrashIcon className="w-5 h-5 m-2" />
        </TButton>
      )}


    </div>

    </div>
  )
}
