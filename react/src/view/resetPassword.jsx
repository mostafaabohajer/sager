import { LockClosedIcon } from '@heroicons/react/20/solid'
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios.js";
import {useStateContext} from "../contexts/contextProvider.jsx";


export default function ResetPassword() {

  const { setUserToken,setCurrentUser } = useStateContext();
  const [code,setCode]=useState('');
  const [password,setPassword]=useState('');
  const navigate = useNavigate();

  const [error,setError]=useState({__html:null});

  const onResetPassword = (ev)=>{
    ev.preventDefault();
    setError({__html: ''});
    axiosClient.post('/password/reset',{
      code,
      password,

    }).then(({data})=>{
      setError(null)
      navigate('/login');
    }).catch((error)=>{
      if(error.response){
        const Errors = error.response.data.errors;
        const fullError = Object.values(Errors).reduce((accum , next)=>[...accum,...next],[]);
        setError({__html: fullError.join('<br>')})
      }
      console.log(error);
    })

  }
  return (
        <form onSubmit={onResetPassword} className="mt-8 space-y-6" action="#" method="POST">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Reset Password
          </h2>
          <p>Your need smtp for email<h4>you can get code in databases tebal : reset_code_passwords</h4></p>
          <Link to={'/login'} className="flex justify-content-center">
            login
          </Link>
          {error?.__html && (<div className="alert alert-danger" dangerouslySetInnerHTML={error}></div>)}
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md">
            <div className="my-2">
              <label htmlFor="email-address" className="sr-only">
                code
              </label>
              <input
                id="code"
                name="code"
                type="text"
                autoComplete="code"
                required
                value={code}
                onChange={ev=>setCode(ev.target.value)}
                className="relative block w-full p-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="code"
              />
            </div>
            <div className="my-2">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={ev=>setPassword(ev.target.value)}
                className="relative block w-full p-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Password"
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
              submit
            </button>
          </div>
        </form>

  )
}
