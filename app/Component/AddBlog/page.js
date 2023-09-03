"use client"

import React, { useState, useEffect } from "react"

import Header from "../Header/Header";
import axios from "axios";
import { MDBBtn, MDBTable, MDBInput ,MDBTableHead, MDBTableBody,

    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBTextArea ,
    MDBModalBody,
    MDBModalFooter,} from 'mdb-react-ui-kit';

    import '../../assets/css/Tostify.css'
import { ToastContainer, toast } from 'react-toastify';


function AddBlog(){

    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);

    // edit
    const [EditModal, setEditModal] = useState(false);
    const [blogids, setBlogId] = useState(null)


  const toggleShows = (v) => {

    console.log("test")

    setFormData({
        image:v.image,
        title: v.title,
        description: v.description
      });

      setBlogId(v._id)

 // Open the modal
 setEditModal(!EditModal);
  } ;



    const [formData, setFormData] = useState({
        image: '',
        title: '',
        description: '',
        userid: localStorage.getItem('user_id'),
      });

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };


      const handleSubmit = async (e) => {
        e.preventDefault();
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/blog/MyBlog',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : formData
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
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



      //   Get Data in Table
    
      let [res, setres] = useState([])

      const blogid = localStorage.getItem('user_id')

      useEffect(()=>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:3000/api/blog/MyBlog/${blogid}`,
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            setres(response.data.data)
          })
          .catch((error) => {
            console.log(error);
          });

      },[])
      
  const Refresh = () =>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/api/blog/All',
        headers: { }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setres(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

    //   Delete

    const handleDelete = async (_id) =>{
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `http://localhost:3000/api/blog/MyBlog/${_id}`,
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
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

                setTimeout(function() {
                    // Your code to perform some action after the timeout
                    setEditModal(!EditModal);
                  }, 2000);
                  Refresh();
          })

          
          .catch((error) => {
            console.log(error);
          });
    }



    // Edit
    const handleEdit =() =>{


        
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://localhost:3000/api/blog/MyBlog/${blogids}`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : {
                image:formData.image,
                title:formData.title,
                description:formData.description
            }
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
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

                setTimeout(function() {
                    // Your code to perform some action after the timeout
                    setEditModal(!EditModal);
                  }, 2000);
                  Refresh();
          })
          .catch((error) => {
            console.log(error);
          });

console.log(formData)
    }



    // search
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        const filteredData = res.filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setres(filteredData);
      };
    return(
        <>
        <Header/>
        <br/>
        <br/>

        <div className="container">
<form className="d-flex input-group w-auto">
        <input
          type="search"
          className="form-control"
          placeholder="Type Title"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="button" className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </form>
          </div>

        <br/>
        <div className="container">
            <div className="row">
                <div className="col-md-6 col-sm-6 col-lg-6">
                    <h3>My Blog List</h3>
                </div>
                <div className="col-md-6 col-sm-6 col-lg-6">
                <MDBBtn style={{float:'right'}} onClick={toggleShow}>Add Blog</MDBBtn>
                </div>
            </div>


<br/>
<br/>

            <MDBTable align='middle' striped style={{border:'1px solid black', textAlign:'center'}}>
      <MDBTableHead style={{backgroundColor:'darkblue', color:'white'}}>
        <tr>
          <th scope='col'>Image</th>
          <th scope='col'>Title</th>
          {/* <th scope='col'>Description</th> */}
          <th scope='col'>Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody className="text-center">
      {res.map((v, i) => (
        
        <tr>
          <td>
            <div className='d-flex align-items-center justify-center'>
              <img
                src={v.image}
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              />
            </div>
          </td>
          
          <td style={{fontWeight:'600'}}>{v.title}</td>
          {/* <td>{v.description}</td> */}
          <td>
          <button type="button" class="btn btn-primary" onClick={() => toggleShows(v)}>Edit</button>
          <button type="button" class="btn btn-danger" style={{marginLeft:'5px'}} onClick={() => handleDelete(v._id)}>Delete</button>
          </td>
        </tr>
        ))}
      </MDBTableBody>
    </MDBTable>


        </div>


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

{/* Modal */}


      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add Blog</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>

                {/* image */}
            <MDBInput label='Image Link' className="form-control" id='form1' type='text' name="image" value={formData.image} onChange={handleChange} />
<br/>

            {/* Title */}
            <MDBInput label='Tile' className="form-control" id='form1' type='text' name="title" value={formData.title} onChange={handleChange} />
            <br/>
            <MDBTextArea label='Description' name="description" id='textAreaExample' rows={4} value={formData.description} onChange={handleChange} />

            <label style={{display:'none'}} value={formData.userid}></label>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleSubmit}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
          </MDBModalDialog>
          </MDBModal>



          {/* Edit Blog */}

          <MDBModal show={EditModal} setShow={setEditModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit Blog</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShows}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>

 {/* image */}
 <MDBInput label='Image Link' className="form-control" id='form1' type='text' name="image" value={formData.image} onChange={handleChange} />
<br/>

            {/* Title */}
            <MDBInput label='Tile' className="form-control" id='form1' type='text' name="title" value={formData.title} onChange={handleChange} />
            <br/>
            <MDBTextArea label='Description' name="description" id='textAreaExample' rows={4} value={formData.description} onChange={handleChange} />

            <label style={{display:'none'}} value={formData.userid}></label>

            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShows}>
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

export default AddBlog;