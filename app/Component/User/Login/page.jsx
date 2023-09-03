"use client"

import React, { use, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';
import '../../../assets/css/mdb.css'
import Link from 'next/link';
import '../../../assets/css/Tostify.css'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function Login() {

  const [user, setUser] = useState({
    email: '',
    password: '',
});


const handleChange = (e) => {
  const { name, value } = e.target;
  setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
  }));
};

const handleSubmit = () => {
  if(!user.email== "" && !user.password ==""){
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/users/Login', // Adjust the API endpoint
      headers: {
          'Content-Type': 'application/json',
      },
      data: user,
  };

  axios
      .request(config)
      .then((response) => {
          console.log(JSON.stringify(response.data));
          // alert(response.data.message);
          localStorage.setItem('user_id', response.data.data._id);
          localStorage.setItem('name', response.data.data.firstname);
          localStorage.setItem('lname', response.data.data.lastname);
          localStorage.setItem('email', response.data.data.email);
          

          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });

            setTimeout(function() {
              window.location.replace("/Component/Resturent/Home");
            }, 3000);
          // Redirect using window.location.href
         
      })
      .catch((error) => {
          console.log(error);
      });
  }

  else{
    toast.error('User Not Found', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }
  
    };

  return (
    <>

<ToastContainer
position="top-right"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    <MDBContainer fluid className='p-4'>

      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            The best offer <br />
            <span className="text-primary">for your business</span>
          </h1>

          <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eveniet, itaque accusantium odio, soluta, corrupti aliquam
            quibusdam tempora at cupiditate quis eum maiores libero
            veritatis? Dicta facilis sint aliquid ipsum atque?
          </p>

        </MDBCol>

        <MDBCol md='6'>

          <MDBCard className='my-5'>
            <MDBCardBody className='p-5'>

              <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' name='email' value={user.email} onChange={handleChange}/>
              <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' name='password' value={user.password} onChange={handleChange} />


              <MDBBtn className='w-100 mb-4' size='md' onClick={handleSubmit}>login</MDBBtn>

              <div className="text-center">

                <p>Don't have an account?
                <Link href={"/Component/User/SignUp"}> <b>Sign Up</b></Link></p>

               

              </div>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
    {/* <ToastContainer /> */}
    </>
  );
}

export default Login;
