"use client"

import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import Link from 'next/link';
import '../../../assets/css/Tostify.css'
import { ToastContainer, toast } from 'react-toastify';

function Signup() {


    const [user, setUser] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const submit = () => {

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/users/SignUp',
            headers: {
                'Content-Type': 'application/json'
            },
            data: user
        };

        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                // alert(response.data.message);
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
                        window.location.replace("/Component/User/Login");
                    }, 3000);
            })
            .catch((error) => {
                console.log(error);
            });

    }

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

              <MDBRow>
                <MDBCol col='6'>
                <MDBInput
  wrapperClass='mb-4'
  value={user.firstname}
  onChange={handleChange}
  label='First name'
  id='form1'
  type='text'
  name='firstname' // Add this line to bind to the correct field
/>
                </MDBCol>

                <MDBCol col='6'>
                  <MDBInput 
                   wrapperClass='mb-4'
                   value={user.lastname}
                   onChange={handleChange}
                   label='Last name'
                   id='form2'
                   type='text'
                   name='lastname' // Add this line to bind to the correct field
                 />
                </MDBCol>
              </MDBRow>

              <MDBInput 
               wrapperClass='mb-4'
               value={user.email}
               onChange={handleChange}
               label='Email'
               id='form3'
               type='text'
               name='email' />

              <MDBInput 
              wrapperClass='mb-4' 
              value={user.password} 
              onChange={handleChange} 
              label='Password' 
              id='form1' 
              type='password'
              name='password'/>


              <MDBBtn className='w-100 mb-4' size='md' onClick={submit}>sign up</MDBBtn>

              <div className="text-center">

                <p>Do you have an account? 
                  <Link href={"/Component/User/Login"}>  <b>LogIn</b></Link></p>

               

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

export default Signup;
