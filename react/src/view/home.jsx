import PageComponent from "../components/pageComponent.jsx";
import React, {useEffect, useState} from "react";
import axiosClient from "../axios.js";
import UserComp from "../components/userComp.jsx";
import ProductComp from "../components/productComp.jsx";
import CategoryComp from "../components/categoryComp.jsx";
import Pagination from "../components/pagination.jsx";


export default function Home() {
  const [categories,setCategories] = useState([]);
  const [products,setProducts] = useState([]);
  const [users,setUsers] = useState([]);
  const [meta,setMeta] = useState({});




  const getUseEffect = (url) => {
    axiosClient.get(url).then(({ data }) => {
      if(url == "/all-category"){
        setCategories(data.data);
      }else if(url == "/all-user"){
        setUsers(data.data);
      }else{
        setProducts(data.data);
        setMeta(data.meta);

      }
    });
  };
  const onPageClick = (link) => {
    getUseEffect(link.url);
  };


  useEffect(() => {
    getUseEffect("/all-category");
    getUseEffect("/all-user");
    getUseEffect("/all-product");

  }, [])
  return (
    <PageComponent title="home">
      <div className="container">
        <div className="well well-sm">
          <strong>All Categories</strong>
          <div className="btn-group d-block">
            {categories.map(category =>(
              <CategoryComp category={category}  />
            ))}
          </div>
        </div>
        <div id="products" className="row">
          <strong>All Products</strong>

          {products.map(product =>(
            <ProductComp product={product}  />
          ))}

          {products.length > 0 && <Pagination meta={meta} onPageClick={onPageClick}  />}
        </div>
        <strong>All users</strong>
        <div className="btn-group d-block">
          {users.map(user =>(
            <UserComp user={user} />
          ))}
        </div>
      </div>
    </PageComponent>

  )
}
