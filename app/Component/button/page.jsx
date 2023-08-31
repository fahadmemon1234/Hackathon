"use client"

import React from "react"
import { MDBBtn } from 'mdb-react-ui-kit';
import Link from "next/link";
import '../../assets/css/mdb.css'

import SignUp from '../User/SignUp/page'

function Button(){

    return(

<>
<SignUp/>
{/* <Link href={"/Component/User/SignUp"}>

<MDBBtn className='me-1'>
        SignUp
      </MDBBtn>
      </Link>

      <Link href={"/Component/User/Login"}>
      <MDBBtn className='me-1' color='danger'>
        LogIn
      </MDBBtn>
      </Link> */}
</>

    )

}

export default Button;