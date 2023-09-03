"use client"

import React, { useState, useEffect }  from "react"
import axios from "axios"
import './view.css'
import Header from "../Header/Header"
import { MDBInput,  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn } from 'mdb-react-ui-kit';



function ViewProfile(){




  const [res, setRes] = useState([]);

  useEffect(() => {
    // Check if user_id exists in local storage
    const userUid = localStorage.getItem('user_id');

    if (userUid) {
      // Make an API request with the user_id
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/api/users/get/${userUid}`,
        headers: {}
      };

      axios.request(config)
        .then((response) => {
          console.log(response.data);
          setRes(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

    return(
        <>

        <Header/>
        <br/>
        <br/>
        
        {/* <div class="main-container" >
      <div style={{marginLeft:'10px'}}>
        <img
       src="https://i.postimg.cc/BvNYhMHS/user-img.jpg"
        class="image" style={{padding:'0px'}}
      ></img>
      </div>
      {res.map((v, i) =>{
    <MDBInput label='Example label' id='form1' type='text' />
      })} */}
    
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-6 col-lg-6">

          <MDBCard>
      <MDBCardBody>
      <img
       src="https://pbs.twimg.com/profile_images/1485050791488483328/UNJ05AV8_400x400.jpg"
      
        class="image" style={{padding:'0px', width:'200px', height:'200px', justifyContent:'center', margin:'auto'}}
      ></img>
      </MDBCardBody>
    </MDBCard>
   
          </div>


          <div className="col-md-6 col-sm-6 col-lg-6">

<MDBCard>
<MDBCardBody>
  
{res.map((v, i) => (
        <div key={i}>
          <label>First Name:</label>
          <MDBInput readOnly id={`form1_${i}`} type='text' value={v.firstname} />
<br/>
          <label>Last Name:</label>
          <MDBInput readOnly id={`form2_${i}`} type='text' value={v.lastname} />

          <br/>
          <label>Email:</label>
          <MDBInput readOnly id={`form2_${i}`} type='text' value={v.email} />

          <br/>
          <label>Password:</label>
          <MDBInput readOnly id={`form2_${i}`} type='password' value={v.password} />
        </div>
        
      ))}

</MDBCardBody>
</MDBCard>

</div>
        </div>
      </div>

        </>
    )
}

export default ViewProfile;