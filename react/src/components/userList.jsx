import React from "react";
import {PencilIcon,TrashIcon} from "@heroicons/react/24/solid";
import TButton from "./core/tButton.jsx";



export default function UserList({user , onDeleteClick}) {
  return (

    <div className="flex justify-between items-center flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
      <h4 className="mt-4 text-lg font-bold">{user.name}</h4>
      <h4 className="mt-4 text-lg font-bold">{user.email}</h4>
      <div className="flex justify-between items-center mt-3">
      <TButton to={`/user/${user.slug}`} circle link color="green">
        <PencilIcon className="w-5 h-5 mr-2"/>
      </TButton>

      {user.id && (
        <TButton onClick={ev => onDeleteClick(user.id)} circle link color="red">
          <TrashIcon className="w-5 h-5" />
        </TButton>
      )}


    </div>

    </div>
  )
}
