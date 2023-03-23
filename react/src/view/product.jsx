import PageComponent from "../components/pageComponent.jsx";
import {useStateContext} from "../contexts/contextProvider.jsx";
import ProductList from "../components/productList.jsx";
import TButton from "../components/core/tButton.jsx";
import {PlusCircleIcon} from "@heroicons/react/24/solid";
import React, {useEffect, useState} from "react";
import axiosClient from "../axios.js";
import Pagination from "../components/pagination.jsx";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/solid/index.js";


export default function Product() {
  // const { products } = useStateContext();

  const [products,setProducts] = useState([]);
  const [loading,setLoading] = useState(false);
  const [meta,setMeta] = useState({});

  const onPageClick = (link) => {
    getProducts(link.url);
  };



  const getProducts = (url) => {
    url = url || "/product";
    setLoading(true);
    axiosClient.get(url).then(({ data }) => {
      setProducts(data.data);
      setMeta(data.meta);
      setLoading(false);
    });
  };
  const onDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axiosClient.delete(`/product/${id}`).then(() => {
        getProducts();
      });
    }
  };
  const onQuantityClick = (id) => {
    axiosClient.post(`/quantity-product/${id}`).then(() => {
      getProducts();
    });
  };



  useEffect(() => {
    getProducts();
  }, [])
  return (
    <PageComponent title="Product"
      buttons={(
        <TButton color="green" to="/product/create">
          <PlusCircleIcon className="h-6 w-6 mr-2" />
          Create New
        </TButton>
      )}
    >

      {loading && <div className="text-center text-lg">Loading...</div>}

      {!loading && (
        <div>
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3'>
            <div className="flex justify-between items-center flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
              <h4 className="mt-4 text-lg font-bold">image</h4>
              <h4 className="mt-4 text-lg font-bold">name</h4>
              <h4 className="mt-4 text-lg font-bold">quantity</h4>
              <h4 className="mt-4 text-lg font-bold">action</h4>
            </div>
            {products.map(product =>(
              <ProductList product={product} key={product.id} onDeleteClick={onDeleteClick} onQuantityClick={onQuantityClick}/>
            ))}
          </div>
          {/*<Pagination meta={meta} onPageClick={onPageClick }/>*/}
         {products.length > 0 && <Pagination meta={meta} onPageClick={onPageClick}  />}
        </div>
        )}
        </PageComponent>

  )
}
