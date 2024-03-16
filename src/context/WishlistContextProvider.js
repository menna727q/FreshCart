import axios from 'axios'
import React, { createContext } from 'react'


export let wishcontext = createContext(0);
  
 async function addToWishList(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers: { token: localStorage.getItem('token') } }
      )
      .then(({ data }) => data)
      .catch(err => err);
  }


 async function getUserWish(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",
    { headers:{token: localStorage.getItem('token') }
     }).then(({data})=>data).catch(err=> err)
 
 }
 async function RemoveFromWish(productId){
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${ productId }`,
  { headers:{token: localStorage.getItem('token') }
   }).then(({data})=>data).catch(err=> err)
    
}
export default function WishlistContextProvider({children}) {
  
  return <wishcontext.Provider value={{ addToWishList, getUserWish , RemoveFromWish }}>
          {children}
  </wishcontext.Provider>
}
