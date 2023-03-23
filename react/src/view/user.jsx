import PageComponent from "../components/pageComponent.jsx";
import TButton from "../components/core/tButton.jsx";
import {PlusCircleIcon} from "@heroicons/react/24/solid";
import React, {useEffect, useState} from "react";
import axiosClient from "../axios.js";
import Pagination from "../components/pagination.jsx";
import UserList from "../components/userList.jsx";


export default function User() {
  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(false);
  const [meta,setMeta] = useState({});

  const onPageClick = (link) => {
    getUsers(link.url);
  };



  const getUsers = (url) => {
    url = url || "/user";
    setLoading(true);
    axiosClient.get(url).then(({ data }) => {
      setUsers(data.data);
      setMeta(data.meta);
      setLoading(false);
    });
  };
  const onDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axiosClient.delete(`/user/${id}`).then(() => {
        getUsers();
      });
    }
  };

  useEffect(() => {
    getUsers();
  }, [])
  return (
    <PageComponent title="user"
                   buttons={(
                     <TButton color="green" to="/user/create">
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
              <h4 className="mt-4 text-lg font-bold">name</h4>
              <h4 className="mt-4 text-lg font-bold">email</h4>
              <h4 className="mt-4 text-lg font-bold">action</h4>
            </div>
            {users.map(user =>(
              <UserList user={user} key={user.id} onDeleteClick={onDeleteClick} />
            ))}
          </div>
          {users.length > 0 && <Pagination meta={meta} onPageClick={onPageClick} />}
        </div>
      )}
    </PageComponent>

  )
}
