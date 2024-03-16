import axios from 'axios'
import React, { createContext, useState } from 'react'


export let cartcontext=createContext(0)

async function addToCart(productId){
   return axios.post("https://ecommerce.routemisr.com/api/v1/cart",{ productId },
   { headers:{token: localStorage.getItem('token') }
    }).then(({data})=>data).catch(err=> err)

}

async function getUserCart(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/cart",
    { headers:{token: localStorage.getItem('token') }
     }).then(({data})=>data).catch(err=> err)
 
 }

 async function RemoveFromCart(productId){
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${ productId }`,
  { headers:{token: localStorage.getItem('token') }
   }).then(({data})=>data).catch(err=> err)
    
}
async function CleraCart(){
  return axios.delete('https://ecommerce.routemisr.com/api/v1/cart',
  { headers:{token: localStorage.getItem('token') }
   }).then(({data})=>data).catch(err=> err)
    
}
async function updateCount(id, newCount) {
  return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count: newCount }, {

      headers: {
          token: localStorage.getItem("token")
      }
  }).then(data => data).catch(err => err)

}

async function checkout(cartId){
  return axios.post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/"+cartId,{  },
  { headers:{token: localStorage.getItem('token') }
   }).then(({data})=>data).catch(err=> err)

}
export default function CartContextProvider({children}) {
  
    let [counter,setcounter]=useState(0)

  return <cartcontext.Provider value={{ counter,checkout, setcounter, addToCart , getUserCart ,RemoveFromCart ,CleraCart,updateCount}}>
          {children}
  </cartcontext.Provider>
}
