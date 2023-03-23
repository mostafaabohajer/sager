import PageComponent from "../components/pageComponent.jsx";
import TButton from "../components/core/tButton.jsx";
import axiosClient from "../axios.js";
import {useState , useEffect} from "react";
import React from 'react';
import {useNavigate , useParams} from "react-router-dom";


export default function CategoryForm() {
  const navigate = useNavigate();
  const {slug} =useParams();
  const [ categories ,setCategories ] = useState({
    name:'',
  });
  const [ error , setError ] = useState([]);
  const [loading,setLoading] = useState(false);


  const onSubmit = (ev)=>{
    ev.preventDefault();
    const payload = {...categories};
    setLoading(true);

    let status = null;
    if(slug){
      status = axiosClient.put(`/category/${slug}`,payload);
    }else{
      status = axiosClient.post('/category',payload);
    }

    status.then((res)=>{
      navigate("/category");
      setError([]);
      setLoading(false);

    }).catch((err)=>{
      if(err && err.response?.data?.message){
        setError(err.response.data);
        setLoading(false);
      }
    });
  }
  useEffect(() => {
    setLoading(true);
    if(slug){
      axiosClient.get(`/category/${slug}`).then(({ data }) => {
        setCategories(data.data[0]);
        setLoading(false);
      });
    }else{
      setLoading(false);
    }
  }, [])
  return (
    <PageComponent title={!slug ? "Category New" : "Update Category" }>
      <div>
        {loading && <div className="text-center text-lg">Loading...</div>}

        {!loading &&
          <form action="#" method="POST" onSubmit={onSubmit}>


          <div className="form-group">
            <label htmlFor="name">name</label>
            <input type="text" className={`form-control ${error?.errors?.name ? "border border-danger" : ""}`}
                   id="name" name="name"
                   value={categories.name}
                   onChange={(ev) => setCategories({ ...categories, name: ev.target.value })}
                   placeholder="name"

            />
            {error?.errors?.name && (<div className="text-danger">{error.errors.name}</div>)}

          </div>

          <TButton marg>
            save
          </TButton>
        </form>
        }
      </div>

    </PageComponent>

  )
}
