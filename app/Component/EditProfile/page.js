"use client"


import React, { useState, useEffect, use } from 'react'
import './view.css'
import Header from '../Header/Header'
import { MDBInput,  MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn } from 'mdb-react-ui-kit';

    import axios from 'axios';

    import '../../assets/css/Tostify.css'
    import { ToastContainer, toast } from 'react-toastify';




function EditProfile(){


  const [basicModal, setBasicModal] = useState(false);
  const [Userid, setUserid] = useState(null)


  const toggleShow = (v) => {

    console.log("test")

    setUser({
        firstname:v.firstname,
        lastname: v.lastname,
        email: v.email,
        password: v.password
      });

      setUserid(v._id)

 // Open the modal
 setBasicModal(!basicModal)
  } ;

  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
});




const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
        ...prevUser,
        [name]: value
    }));
};


const [res, setRes] = useState([]);
const userUid = localStorage.getItem('user_id');

// get data


useEffect(() => {

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:3000/api/users/get/${userUid}`,
    headers: { }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    setRes(response.data.data)

  })
  .catch((error) => {
    console.log(error);
  });

},[])

const Refresh = () =>{
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:3000/api/users/get/${userUid}`,
    headers: { }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    setRes(response.data.data)

  })
  .catch((error) => {
    console.log(error);
  });
}


// Edit Profile


    const handleEdit = () =>{
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/api/users/get/${userUid}`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : {
          firstname:user.firstname,
          lastname:user.lastname,
          email:user.email,
          password:user.password
        }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        localStorage.removeItem('name');
        localStorage.removeItem('lname');
        setTimeout(function() {
        setUser(response.data.data)
        localStorage.setItem('name', user.firstname);
        localStorage.setItem('lname', user.lastname);
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        }, 1000);

          setTimeout(function() {
              // Your code to perform some action after the timeout
              setBasicModal(!basicModal);
            }, 2000);
            Refresh();
      })
      .catch((error) => {
        console.log(error);
      });
    }




    return(
        <>

        <Header/>
        <br/>
        <br/>
        
       
    

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
        <div >
          <label>First Name:</label>
          <MDBInput  type='text' readOnly name='firstname' value={v.firstname} />
<br/>
          <label>Last Name:</label>
          <MDBInput type='text' readOnly name='lastname' value={v.lastname} />

          <br/>
          <label>Email:</label>
          <MDBInput type='text' readOnly name='email' value={v.email}/>

          <br/>
          <label>Password:</label>
          <MDBInput  type='password' readOnly name='password' value={v.password} />

          <br/>

          <MDBBtn onClick={() => toggleShow(v)}>Edit Profile</MDBBtn>
        </div>
        
))}

</MDBCardBody>
</MDBCard>

</div>
        </div>
      </div>





      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>


            <div >
          <label>First Name:</label>
          <MDBInput  type='text' name='firstname' value={user.firstname} onChange={handleChange} />
<br/>
          <label>Last Name:</label>
          <MDBInput type='text' name='lastname' value={user.lastname} onChange={handleChange} />

          <br/>
          <label>Email:</label>
          <MDBInput type='text' name='email' value={user.email} onChange={handleChange}/>

          <br/>
          <label>Password:</label>
          <MDBInput  type='password' name='password' value={user.password} onChange={handleChange} />


        </div>


            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleEdit}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

        </>
    )
}

export default EditProfile;