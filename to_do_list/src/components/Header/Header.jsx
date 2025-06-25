import React from 'react'
import {FaUserCircle,FaSignOutAlt} from 'react-icons/fa';
import './header.css'
import todoLogo from '../../assets/to-do-list.png'; 


const Header = () => {
  return (
<div className='Header' role="banner">
  <div className="header-left">
    <img src={todoLogo} alt="To-Do Logo" className="logo" />
    <p className='title'>To-Do List Manager</p>
  </div>

  <div className="header-right">
    <button className='btn profile-btn'>
        <FaUserCircle className='icon'/> Profile
    </button>
    <button className='btn logout-btn'>
        <FaSignOutAlt className='icon'/> Logout
    </button>
  </div>
</div>
  )
}

export default Header
