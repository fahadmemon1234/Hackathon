"use client"

import React, { useState, useEffect } from "react"
import '../../assets/css/mdb.css'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';

import Link from "next/link";

import './menu.css'



function Header(){

    const [showBasic, setShowBasic] = useState(false);


    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
      setMenuActive(!menuActive);
    };


    const Name = localStorage.getItem('name')
    


    return(
        <>
        <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#' style={{fontWeight:'600'}}>Blog</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
            <Link href={"/Component/Resturent/Home"}>
              <MDBNavbarLink active aria-current='page' href='#'>
                Home
              </MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link href={"/Component/Resturent/MyBlog"}>
              <MDBNavbarLink href='#'>My Blog</MDBNavbarLink>
              </Link>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <Link href={"/Component/AddBlog "}>
              <MDBNavbarLink href='#'>Add Blog</MDBNavbarLink>
              </Link>
            </MDBNavbarItem>


           
          </MDBNavbarNav>
            {/* <Link href={"/Component/User/Login"}>
            <MDBBtn color='primary'>Logout</MDBBtn>
            </Link> */}

<div className="profile" onClick={toggleMenu}>
    
        <div className="img-box">
          <img src="https://pbs.twimg.com/profile_images/1485050791488483328/UNJ05AV8_400x400.jpg" alt="some user image" />
        </div>
      </div>
      <div className={`menu ${menuActive ? 'active' : ''}`} style={{zIndex:'5'}}>
        <ul>
          <li><a href={"/Component/ViewProfile"}><i className="ph-bold ph-user"></i>&nbsp;View Profile</a></li>
          <li><a href={"/Component/EditProfile"}><i className="ph-bold ph-envelope-simple"></i>&nbsp;Edit Profile</a></li>
          <li><a href={"/Component/User/Login"}><i className="ph-bold ph-sign-out"></i>&nbsp;LogOut</a></li>
        </ul>
      </div>
 
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
        
        </>
    )
}

export default Header;