import React from "react";
import {PencilIcon,TrashIcon} from "@heroicons/react/24/solid";
import TButton from "./core/tButton.jsx";



export default function CategoryComp({category}) {
  return (
    <a id="list" className="btn btn-default btn-sm">
      <span className="glyphicon glyphicon-th-list"></span>{category.name}
    </a>
  )
}
