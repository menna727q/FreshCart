import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query';
import Brand from '../Brand/Brand';
import { Helmet } from 'react-helmet';

export default function Brands() {
   
function getBrands(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
}
let {data}= useQuery("getBrands",getBrands);

console.log(data?.data)
    return (
       <div className="container">
         <Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        <div className="title text-center my-3 ">
            <h3 className='text-main fw-bolder'> ALL Brands</h3>
            </div>
        <div className="row">
        {data?.data.data.map((item) => ( <Brand key={item._id} item={item} />
          
          ))}
           
        </div>
       </div>
    )
}
