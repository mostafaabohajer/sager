import PageComponent from "../components/pageComponent.jsx";
import {useStateContext} from "../contexts/contextProvider.jsx";
import TButton from "../components/core/tButton.jsx";
import {PhotoIcon} from "@heroicons/react/24/solid";
import axiosClient from "../axios.js";
import {useState , useEffect} from "react";
import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {useNavigate , useParams} from "react-router-dom";
// import { colourOptions } from './docs/data';

const test = [
  { value: '1', label: 'Ocean' },
  { value: '2', label: 'Blue' },
  { value: '3', label: 'Purple'},
  { value: '4', label: 'Red' },
  { value: '5', label: 'Orange' },
]
export default function ProductForm() {
  const navigate = useNavigate();
  const {slug} =useParams();
  const [ products ,setProducts ] = useState({
    name:'',
    image:null,
    image_url: null,
    description:"",
    price:"",
    quantity:"",
    category_id:[ [{
      value: '',
      label: ''
    }]],
  });
  const [ cat ,setCat ] = useState();
  const [ error , setError ] = useState([]);
  const [loading,setLoading] = useState(false);
  const [categories,setCategories] = useState([{
    value: '',
    label: ''
  }]);
  useEffect(() => {
    getCategories();
  }, [])
  const getCategories = (url) => {
    url =  `/all-category`;
    axiosClient.get(url).then(({ data }) => {
      const results = [];
      data.data.forEach((value, index) => {
        results.push({
            value: value.id,
            label: value.name
        });
      });
      setCategories(results);
    });
  };
  const onImageChoose = (ev) => {
    const file = ev.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setProducts({
        ...products,
        image: file,
        image_url: reader.result,
      });

      ev.target.value = "";
    };
    reader.readAsDataURL(file);
  };
  const onSubmit = (ev)=>{
    ev.preventDefault();
    const payload = {...products};
    if(payload.image){
      payload.image = payload.image_url;
    }
    delete payload.image_url;
    const cat_id = [];
    cat?.forEach((value, index) => {
      cat_id.push(value.value);
    });
    payload.category_id=cat_id;

    let status = null;
    if(slug){
      status = axiosClient.put(`/product/${slug}`,payload);
    }else{
      status = axiosClient.post('/product',payload);
    }

    status.then((res)=>{
      navigate("/product");
      setError([]);
      setLoading(false);



    }).catch((err)=>{
      if(err && err.response?.data?.message){
        setError(err.response.data);
        setLoading(false);

      }
    });
  }
  function handleSelect(data) {
    setCat(data);
  }
  const animatedComponents = makeAnimated();
  useEffect(() => {
    setLoading(true);
    if(slug){
      axiosClient.get(`/product/${slug}`).then(({ data }) => {
        setProducts(data.data[0]);
        setLoading(false);

        // console.log(data);
        const results = [];
        data.data[0].category_id.forEach((value, index) => {
          results.push({
            value: value.id,
            label: value.name
          });
        });
        handleSelect(results);

      });
    }else{
      setLoading(false);
    }
  }, [])
  return (
    <PageComponent title={!slug ? "Product New" : "Update Product" }>
      <div>
        {loading && <div className="text-center text-lg">Loading...</div>}

        {!loading &&
          <form action="#" method="POST" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Photo
            </label>
            <div className="mt-1 flex items-center">
              {products.image_url  && (
                <img
                  src={products.image_url }
                  alt=""
                  className="w-25 p-3"
                />
              )}
              {!products.image_url  && (
                <span className="flex justify-center  items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      <PhotoIcon className="w-8 h-8" />
                    </span>
              )}
              <button
                type="button"
                className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <input
                  type="file"
                  className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                  onChange={onImageChoose}
                />
                Change
              </button>
            </div>
            {error?.errors?.image && (<div className="text-danger">{error.errors.image}</div>)}

          </div>

          <div className="form-group">
            <label htmlFor="name">name</label>
            <input type="text" className={`form-control ${error?.errors?.name ? "border border-danger" : ""}`}
                   id="name" name="name"
                   value={products.name}
                   onChange={(ev) => setProducts({ ...products, name: ev.target.value })}
                   placeholder="name"

            />
            {error?.errors?.name && (<div className="text-danger">{error.errors.name}</div>)}

          </div>
          <div className="form-group">
            <label htmlFor="quantity">quantity</label>
            <input type="number" className={`form-control ${error?.errors?.quantity ? "border border-danger" : ""}`}
                   id="quantity" value={products.quantity}
                   onChange={(ev) => setProducts({ ...products, quantity: ev.target.value })}
                   placeholder="quantity" />
            {error?.errors?.quantity && (<div className="text-danger">{error.errors.name}</div>)}

          </div>
          <div className="form-group">
            <label htmlFor="price">price</label>
            <input type="number" className={`form-control ${error?.errors?.price ? "border border-danger" : ""}`} id="price" value={products.price}
                   onChange={(ev) => setProducts({ ...products, price: ev.target.value })}
                   placeholder="price" />
            {error?.errors?.price && (<div className="text-danger">{error.errors.price}</div>)}

          </div>
          <div className="form-group">
            <label htmlFor="description">description</label>
            <textarea className={`form-control ${error?.errors?.description ? "border border-danger" : ""}`} id="description" rows={4} cols={40} value={products.description}
                      onChange={(ev) => setProducts({ ...products, description: ev.target.value })}
                      placeholder="description" />
            {error?.errors?.description && (<div className="text-danger">{error.errors.description}</div>)}

          </div>
          <div className="form-group">
            <label htmlFor="category_id">Categories</label>
            <Select
              className={`${error?.errors?.category_id ? "border border-danger" : ""}`}
              closeMenuOnSelect={false}
              id="category_id"
              value={cat}
              components={animatedComponents}
              // defaultValue={products.category_id}
              isMulti
              options={categories}
              onChange={handleSelect}

            />
            {error?.errors?.category_id && (<div className="text-danger">{error.errors.category_id}</div>)}

          </div>

          <TButton>
            save
          </TButton>
        </form>
        }
      </div>

    </PageComponent>

  )
}
