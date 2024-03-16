import React from 'react'
import error from "../../assets/images/error.svg"
import { Helmet } from 'react-helmet'

export default function NotFound() {
    return (
        <div className='text-center my-5'>
             <Helmet>
                <meta charSet="utf-8" />
                <title>Not Found</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <img src={error} alt="" />
        </div>
    )
}
