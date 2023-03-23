import { LockClosedIcon } from '@heroicons/react/20/solid'
import {useNavigate ,Link} from "react-router-dom";
import {createContext, useContext, useState} from "react";
import axiosClient from "../axios.js";



export default function ForgetPassword() {
  const [email,setEmail]=useState('');
  const [error,setError]=useState({__html:""});
  const navigate = useNavigate();

  const onForgetPassword = (ev)=>{
    ev.preventDefault();
    // setError({__html: ''});
    axiosClient.post('/password/email',{
      email,
    }).then(({data})=>{
      navigate('/reset-password');

    }).catch((error)=>{
      if(error.response){
        const Errors = error.response.data.errors;
        const fullError = Object.values(Errors).reduce((accum , next)=>[...accum,...next],[]);
        setError({__html: fullError.join('<br>')})
      }
    })

  }
  return (
    <form onSubmit={onForgetPassword} className="mt-8 space-y-6" action="#" method="POST">
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Forget Password
      </h2>
      <Link to={'/login'} className="flex justify-content-center">
        Login
      </Link>
      {error.__html && (<div className="alert alert-danger" dangerouslySetInnerHTML={error}></div>)}
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="-space-y-px rounded-md">
        <div className="my-2">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={ev=>setEmail(ev.target.value)}
            className="relative block w-full p-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Email address"
          />
        </div>
      </div>



      <div>
        <button
          type="submit"
          className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
          </span>
          Submit
        </button>
      </div>
    </form>

  )
}

