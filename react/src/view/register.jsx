import { Link } from 'react-router-dom'
import { useState } from "react";
import axiosClient from "../axios.js";
import {useStateContext} from "../contexts/contextProvider.jsx";

export default function Register() {
  const { setUserToken,setCurrentUser } = useStateContext();
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState({__html:""});

  const onRegister = (ev)=>{
    ev.preventDefault();
    setError({__html: ''});

    axiosClient.post('/register',{
      name:name,
      email,
      password
    }).then(({data})=>{
      setUserToken(data.token);
      setCurrentUser(data.user);
    }).catch((error)=>{
      if(error.response){
        const Errors = error.response.data.errors;
        const fullError = Object.values(Errors).reduce((accum , next)=>[...accum,...next],[]);
        setError({__html: fullError.join('<br>')})
      }
    })

  }
  return (

        <form onSubmit={onRegister} className="mt-8 space-y-6" action="#" method="POST">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Register Now
          </h2>
          <Link to={'/login'} className="flex justify-content-center">
            Login with your account
          </Link>
          {error.__html && (<div className="alert alert-danger" dangerouslySetInnerHTML={error}></div>)}

          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md">
            <div className="my-2">
              <label htmlFor="email-address" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={ev=>setName(ev.target.value)}
                className="relative block w-full p-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset
                 ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Full Name"
              />
            </div>
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

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>

  )
}
