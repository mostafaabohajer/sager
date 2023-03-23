import React from "react";
import {PencilIcon,TrashIcon} from "@heroicons/react/24/solid";
import TButton from "./core/tButton.jsx";



export default function ProductComp({product}) {
  return (


        <div className="item col-xs-4 col-lg-4">
          <div className="thumbnail">
            <img className="group list-group-image" src={product.image_url} alt={product.name}/>
            <div className="caption">
              <h4 className="group inner list-group-item-heading">
                {product.name}</h4>
              <p className="group inner list-group-item-text">
                {product.description}</p>
              <div className="row">
                <div className="col-xs-12 col-md-6">
                  <p className="lead">
                    ${product.price}</p>
                </div>
                <div className="col-xs-12 col-md-6">
                  quantity:<span className="lead">
                  {product.quantity}</span>
                </div>
              </div>
            </div>
          </div>
        </div>


  )
}
