import React, { useState } from 'react'
import {FaUserCircle,FaSignOutAlt , FaBell} from 'react-icons/fa';
import './header.css'
import todoLogo from '../../assets/to-do-list.png'; 
import { useTodoContext } from '../../hooks/TodoContext';



const Header = () => {
  const {
    notifications,
    hasNewNotification,
    clearNotifications,
  } = useTodoContext();

  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  const handleNotificationClick = () => {
    setShowNotificationPopup(!showNotificationPopup);
    clearNotifications();
  };

  return (
    <div className='Header' role="banner">
      <div className="header-left">
        <img src={todoLogo} alt="To-Do Logo" className="logo" />
        <p className='title'>To-Do List Manager</p>
      </div>

      <div className="header-right">
        <div className="notification-wrapper">
          <button className='btn notification-btn' data-label="Notifications" onClick={handleNotificationClick}>
            <FaBell className='icon' />
            Notifications
            {hasNewNotification && <span className="red-dot"></span>}
          </button>

          {showNotificationPopup && (
            <div className="notification-popup">
              {notifications.length === 0 ? (
                <p className="notification-item">No new notifications</p>
              ) : (
                notifications.map((n) => (
                  <p key={n.id} className="notification-item">{n.message}</p>
                ))
              )}
            </div>
          )}
        </div>

        <button className='btn profile-btn' data-label="Profile">
          <FaUserCircle className='icon' /> Profile
        </button>
        <button className='btn logout-btn' data-label="Logout">
          <FaSignOutAlt className='icon' /> Logout
        </button>
      </div>
    </div>
  );
};


export default Header
