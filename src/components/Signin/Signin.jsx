import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


export default function Signin() {

    let navigate = useNavigate()
    let [errMsg, setErrMsg] = useState('')
    const [loading,setLoading]=useState(true)


    function sendDataToApi(values) {
        setLoading(false)
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).then(({ data }) => {
            console.log(data);
            if (data.message == 'success') {
                //to signin
                localStorage.setItem("token",data.token)
                navigate('/Home')
            }
        }).catch(err => {
            setErrMsg(err.response.data.message)
            setLoading(true)
            console.log(err.response.data.message);
        })

    }

    function validationSchema() {

        let errors = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().matches(/^[A-Z][a-zA-Z0-9]{6,}$/).required(),
        })
        return errors
    }

    let login = useFormik({
        initialValues: {

            email: '',
            password: '',

        },
        validationSchema
        ,
        onSubmit: (values) => {
            console.log(values);
            // send to api
            sendDataToApi(values)
        }
    })

    return (
        <div>
             <Helmet>
                <meta charSet="utf-8" />
                <title>Signin</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className="w-75 m-auto my-5">
                <h2>login Now:</h2>
                <form onSubmit={login.handleSubmit}>


                    <label htmlFor="Email">Email:</label>
                    <input onBlur={login.handleBlur} value={login.values.email} onChange={login.handleChange} className='form-control mb-3' type="email" name="email" id="Email" />
                    {login.errors.email && login.touched.email ? <div className="alert alert-danger">
                        {login.errors.email}
                    </div> : ''}

                    <label htmlFor="password">Password:</label>
                    <input onBlur={login.handleBlur} value={login.values.password} onChange={login.handleChange} className='form-control mb-3' type="password" name="password" id="password" />
                    {login.errors.password && login.touched.password ? <div className="alert alert-danger">
                        {login.errors.password}
                    </div> : ''}


                    {errMsg ? <div className="alert alert-danger">
                        {errMsg}
                    </div> : ''}

                    <button disabled={!(login.isValid && login.dirty)} type='submit' className='btn bg-main text-white'>{loading?'Signin':<i className='fa fa-spinner fa-spin'></i>}</button>
                   <Link to={'/Forgot'}> <h6 className='mt-2'>Forgot Password?</h6></Link>
                </form>
            </div>
        </div>
    )
}
