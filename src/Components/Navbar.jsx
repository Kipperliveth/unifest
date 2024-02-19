import React, { useState } from 'react'
import logo from '../stock/logomain.png';
import { NavLink } from 'react-router-dom';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiMenu4Fill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";  

function Navbar() {

    const [isVisible, SetIsVisible] = useState(false);

    const toggleVisibilty = () => {
      SetIsVisible(!isVisible)
};

  return (
    <div className='navigation '>

      <nav className=" navbar">
        
        <NavLink to='/' className="logo-container">
          <img src={logo} alt="evanis-interior-logo" />
          <p className='logo'> <span>EVANIS</span> INTERIORS</p>
        </NavLink>

        <ul className="page-links">
            <li><NavLink className={({ isActive }) => (isActive? 'active-link' : 'link')} to='/shop' > Shop</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive? 'active-link' : 'link')} to='/masterclass'> Masterclass</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive? 'active-link' : 'link')} to='/about'> About</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive? 'active-link' : 'link')} to='/contact'> Contact</NavLink></li>
        </ul>

        <div className="app">
        <IoIosNotificationsOutline className='app-icon desktop-view notifs'/>
        <AiOutlineShoppingCart className='app-icon desktop-view cart' />
        <NavLink to='/login' className='login-btn'>
          Login
        </NavLink>

        <RiMenu4Fill className='app-icon mobile-view menu' onClick={toggleVisibilty}/>

        </div>



      </nav>
      
        <div className= {` mobile-menu-container ${isVisible ? 'is-visible' : ''} `}>

          <div className="mobile-menu">

            <div className="menu-content">


             <MdCancel  onClick={toggleVisibilty} className='cancel-btn'/>

              <span>
              <IoIosNotificationsOutline className='span-icon'/>
              <AiOutlineShoppingCart className='span-icon' />
              </span>

              <div className="mobilepage-links">
            <li><NavLink to='/shop'  onClick={toggleVisibilty} > Shop</NavLink></li>
            <li><NavLink to='/masterclass'  onClick={toggleVisibilty}> Masterclass</NavLink></li>
            <li><NavLink to='/about'  onClick={toggleVisibilty}> About</NavLink></li>
            <li><NavLink to='/contact'  onClick={toggleVisibilty}> Contact</NavLink></li>
               </div>

            </div>

          </div>

        </div>
      

    </div>
  )
}

export default Navbar