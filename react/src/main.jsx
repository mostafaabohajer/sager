import React from 'react';
import ReactDOM from 'react-dom/client';
import './input.css';
import Router from "./router.jsx";
import {RouterProvider} from "react-router-dom";
import {ContextProvider} from "./contexts/contextProvider";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={Router}/>
    </ContextProvider>
  </React.StrictMode>,
)
