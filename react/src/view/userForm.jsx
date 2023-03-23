import PageComponent from "../components/pageComponent.jsx";
import TButton from "../components/core/tButton.jsx";
import axiosClient from "../axios.js";
import {useState , useEffect} from "react";
import React from 'react';
import {useNavigate , useParams} from "react-router-dom";


export default function UserForm() {
  const navigate = useNavigate();
  const {slug} =useParams();
  const [ users ,setUsers ] = useState({
    name:'',
    email:'',
  });
  const [ error , setError ] = useState([]);
  const [loading,setLoading] = useState(false);


  const onSubmit = (ev)=>{
    ev.preventDefault();
    const payload = {...users};
    setLoading(true);

    let status = null;
    if(slug){
      status = axiosClient.put(`/user/${slug}`,payload);
    }else{
      status = axiosClient.post('/user',payload);
    }

    status.then((res)=>{
      navigate("/user");
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
      axiosClient.get(`/user/${slug}`).then(({ data }) => {
        setUsers(data.data[0]);
        setLoading(false);
      });
    }else{
      setLoading(false);
    }
  }, [])
  return (
    <PageComponent title={!slug ? "User New" : "Update User" }>
      <div>
        {loading && <div className="text-center text-lg">Loading...</div>}

        {!loading &&
          <form action="#" method="POST" onSubmit={onSubmit}>


          <div className="form-group">
            <label htmlFor="name">name</label>
            <input type="text" className={`form-control ${error?.errors?.name ? "border border-danger" : ""}`}
                   id="name" name="name"
                   value={users.name}
                   onChange={(ev) => setUsers({ ...users, name: ev.target.value })}
                   placeholder="name"

            />
            {error?.errors?.name && (<div className="text-danger">{error.errors.name}</div>)}

          </div>
          <div className="form-group">
            <label htmlFor="name">email</label>
            <input type="email" className={`form-control ${error?.errors?.email ? "border border-danger" : ""}`}
                   id="email" name="email"
                   value={users.email}
                   onChange={(ev) => setUsers({ ...users, email: ev.target.value })}
                   placeholder="email"

            />
            {error?.errors?.email && (<div className="text-danger">{error.errors.email}</div>)}

          </div>
          <div className="form-group">
            <label htmlFor="name">password</label>
            <input type="password" className={`form-control ${error?.errors?.password ? "border border-danger" : ""}`}
                   id="password" name="password"
                   value={users.password}
                   onChange={(ev) => setUsers({ ...users, password: ev.target.value })}
                   placeholder="password"

            />
            {error?.errors?.password && (<div className="text-danger">{error.errors.password}</div>)}

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
