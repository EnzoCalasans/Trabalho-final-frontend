import React from 'react'
import './Navbar.css'
import navlogo from "../../assets/images/logo-meteora.png"


const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} alt="" className="nav-logo" />
    </div>
  )
}

export default Navbar
