import React from "react";
import {PencilIcon,TrashIcon} from "@heroicons/react/24/solid";
import TButton from "./core/tButton.jsx";



export default function UserComp({user}) {
  return (
    <a id="list" className="btn btn-default btn-sm">
      <span className="glyphicon glyphicon-th-list">Name : </span>{user.name}
      <span className="glyphicon glyphicon-th-list">Email : </span>{user.email}

    </a>
  )
}
