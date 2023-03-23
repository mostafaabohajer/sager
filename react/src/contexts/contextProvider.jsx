import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";

const StateContext = createContext({
  currentUser: { },
  products:[],
  userToken: null,
  setCurrentUser: () => { },
  setUserToken: () => { }
});
const getProducts = [
  {
    "id": 2198,
    "name": "خفاقة شحن USB",
    "thumbnail_image": "https://icnamazons3.s3.amazonaws.com/uploads/all/FccsfAbtQd2Vw4NzkIHmiGEvtJbimOAkC0NqiokZ.png",
    "has_discount": true,
    "stroked_price": "<span class='currency_symbol-price'>JD</span> 9.70",
    "main_price": "<span class='currency_symbol-price'>JD</span> 8.25",
    "rating": 0,
    "sales": 0,
    "links": {
      "details": "https://icn.com/api/v2/products/2198"
    }
  },
  {
    "id": 1555,
    "name": "خلاط يدوي ستايلين 500 وات أبيض",
    "thumbnail_image": "https://icnamazons3.s3.amazonaws.com/uploads/all/YlS9Lvp3gaEPqLdw1ez9Hmbgj9M33ANpDwKCEvo5.png",
    "has_discount": true,
    "stroked_price": "<span class='currency_symbol-price'>JD</span> 90.00",
    "main_price": "<span class='currency_symbol-price'>JD</span> 75.00",
    "rating": 0,
    "sales": 0,
    "links": {
      "details": "https://icn.com/api/v2/products/1555"
    }
  },
  {
    "id": 1554,
    "name": "خلاط يدوي Ergo Mixx 450 وات أبيض",
    "thumbnail_image": "https://icnamazons3.s3.amazonaws.com/uploads/all/2DQIrsrIP05uMFhULpbk2HAHYTgCX68KI35d7gNh.png",
    "has_discount": true,
    "stroked_price": "<span class='currency_symbol-price'>JD</span> 75.00",
    "main_price": "<span class='currency_symbol-price'>JD</span> 65.00",
    "rating": 0,
    "sales": 0,
    "links": {
      "details": "https://icn.com/api/v2/products/1554"
    }
  },
];

export const ContextProvider = ( { children } ) => {

  const [currentUser , setCurrentUser] = useState({});
  const [userToken , _setUserToken] = useState(localStorage.getItem('TOKEN') || '');
  const [products , setProducts] = useState(getProducts);

  const setUserToken = (token) =>{
    if(token){
      localStorage.setItem('TOKEN',token);
    }else{
      localStorage.removeItem('TOKEN');
    }
    _setUserToken(token);
  }
  return (
    <StateContext.Provider value={
      {
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
        products,
        setProducts
      }
    }>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
