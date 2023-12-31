"use client"

import React, { useState, useEffect } from "react"
import Header  from "../../Header/Header";
import axios from "axios";
import './card.css'


function Home(){
    const [searchQuery, setSearchQuery] = useState('');


    let [res, setres] = useState([])

    useEffect(()=>{
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

    },[])


    // search

    const handleSearch = () => {
        const filteredData = res.filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setres(filteredData);
      };


    //   const Name = localStorage.getItem('name')

      const Name = localStorage.getItem('name');
      const Lname = localStorage.getItem('lname')
      const id = localStorage.getItem('user_id');
const userIdToMatch = id;
    return(
        <>
        <Header/>


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

        {res.map((v, i) => (
            <>
   <div class="f-card">
   <div class="header">
     <div class="options"><i class="fa fa-chevron-down"></i></div>
     {v.userid === userIdToMatch ? (
  <div>
    <img className="co-logo" style={{borderRadius:'50px'}} src="https://pbs.twimg.com/profile_images/1485050791488483328/UNJ05AV8_400x400.jpg" />
    <div className="co-name"><a href="#">{Name} {Lname}</a></div>
  </div>
) : (
  <div>
    <img className="co-logo" style={{borderRadius:'50px'}} src="https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?cs=srgb&dl=pexels-masha-raymers-2726111.jpg&fm=jpg" />
    <div className="co-name"><a href="#">Abc</a></div>
  </div>
)}

   </div>

 <br/>
   <div class="reference">
     <img class="reference-thumb" src={v.image} />
     <div class="reference-content">
       <div class="reference-title">{v.title}</div>
       <div class="reference-subtitle">{v.description}</div>
     </div>
   </div>
   <div class="social">
     <div class="social-content"></div>
    
   </div>
 </div>
 
 </>
        ))}
        
        </>
    )
}


export default Home;