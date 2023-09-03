"use client"

import React, { useState, useEffect } from "react"
import Header  from "../../Header/Header";
import axios from "axios";
import '../Home/card.css'

function Myblog(){

    let [res, setres] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
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



        // search

        const handleSearch = () => {
            const filteredData = res.filter((item) =>
              item.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setres(filteredData);
          };


          const Name = localStorage.getItem('name')
          const Lname = localStorage.getItem('lname')

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
     <img class="co-logo" style={{borderRadius:'50px'}} src="https://pbs.twimg.com/profile_images/1485050791488483328/UNJ05AV8_400x400.jpg" />
     <div class="co-name"><a href="#">{Name} {Lname}</a></div>
   </div>

 
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


export default Myblog;