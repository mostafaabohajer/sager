import PageComponent from "../components/pageComponent.jsx";
import TButton from "../components/core/tButton.jsx";
import {PlusCircleIcon} from "@heroicons/react/24/solid";
import React, {useEffect, useState} from "react";
import axiosClient from "../axios.js";
import Pagination from "../components/pagination.jsx";
import CategorytList from "../components/categorytList.jsx";


export default function Category() {
  const [categories,setCategories] = useState([]);
  const [loading,setLoading] = useState(false);
  const [meta,setMeta] = useState({});
  const [alert, setAlert] = useState(false);

  const onPageClick = (link) => {
    getCategories(link.url);
  };



  const getCategories = (url) => {
    url = url || "/category";
    setLoading(true);
    axiosClient.get(url).then(({ data }) => {
      console.log(data);
      setCategories(data.data);
      setMeta(data.meta);
      setLoading(false);
    });
  };
  const onDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      axiosClient.delete(`/category/${id}`).then((data) => {
        if(data.data.status == 204){
          getCategories();
          setAlert("The category was deleted");
        }else{
          setAlert("your cant remove this category");
        }
      });
    }
  };

  useEffect(() => {
    getCategories();
  }, [])
  return (
    <PageComponent title="category"
                   buttons={(
                     <TButton color="green" to="/category/create">
                       <PlusCircleIcon className="h-6 w-6 mr-2" />
                       Create New
                     </TButton>
                   )}
    >

      {loading && <div className="text-center text-lg">Loading...</div>}

      {!loading && (
        <div>
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3'>
            {alert && <div className={`alert alert-secondary`}>{alert}</div>}

            <div className="flex justify-between items-center flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
              <h4 className="mt-4 text-lg font-bold">name</h4>
              <h4 className="mt-4 text-lg font-bold">products used</h4>
              <h4 className="mt-4 text-lg font-bold">action</h4>
            </div>

            {categories.map(category =>(
              <CategorytList category={category} key={category.id} onDeleteClick={onDeleteClick} />
            ))}
          </div>
          {categories.length > 0 && <Pagination meta={meta} onPageClick={onPageClick} />}
        </div>
      )}
    </PageComponent>

  )
}
