import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';


export default function Forgot() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [isCodeSent, setIsCodeSent] = useState(false);
  let reset=useNavigate()

async function forgetPassword() {
  try {
    setLoading(false);
    const response = await axios.post(
      'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      { email }
    );
    setLoading(true);
    setIsCodeSent(true);
    setEmail(''); // Clear the email input
    console.log(response.data); // You can handle the response as per your requirements
  } catch (error) {
    console.error(error);
  }
}

  async function verifyResetCode() {
    try {
      setLoading(false);
      console.log(email);
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode' ,{'resetCode':email}  
      );
      setLoading(true);
      console.log(response.data); 
      if (response.data.status === 'Success') {
        
        return (
           reset('/reset')
       
        );
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <>
      <div className="container my-5">
        <h2>Please Enter your verification code:</h2>
        <input
          className="form-control mb-3"
          type="email"
          name="email"
          id="Email"
          placeholder={isCodeSent ? 'Verification Code' : 'Email:'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="btn bg-main text-white"
          onClick={isCodeSent ? verifyResetCode : forgetPassword}
        >
          {loading ? 'Verify' : <i className="fa fa-spinner fa-spin"></i>}
        </button>
      </div>
    </>
  );
}