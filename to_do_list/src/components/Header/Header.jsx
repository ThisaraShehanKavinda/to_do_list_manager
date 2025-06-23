import React from 'react'
import {FaUserCircle,FaSignOutAlt} from 'react-icons/fa';
import './header.css'

const Header = () => {
  return (
    <div className='Header'>
      <p className='title'>To-Do List Manager</p>
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
