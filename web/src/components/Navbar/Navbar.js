import React from "react";
import logo from "../../images/logo.jpg";
import './Navbar.css';
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const LoggedOffItems = [
  {
    title: 'Register',
    url: '/register',
    cName: 'nav-links',
  },
  {
    title: 'Login',
    url: '/login',
    cName: 'nav-links',
  },
]

const LoggedInItems = [
  {
    title: 'Add Products',
    url: '/addProduct',
    cName: 'nav-links',
  },
  {
    title: 'Delete Account',
    url: '/deleteAccount',
    cName: 'nav-links',
  }
]

const Navbar = () => {
  const auth = localStorage.getItem('user')
  const navigate = useNavigate();

  const navigateHandler = (url) => {
    navigate(`../${url}`, { replace: true })
  }
  return (
    <div>
      {auth ?
        <nav className="NavbarItems">
          <a onClick={() => { navigate('') }}><img src={logo} className="navbar-logo" alt="" /></a>
          <ul className="nav-menu">
            {LoggedInItems.map((item, index) => {
              return (
                <li>
                  <a className={item.cName} onClick={() => { navigateHandler(item.url) }}>
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        : <nav className="NavbarItems">
          <a onClick={() => { navigate('') }}><img src={logo} className="navbar-logo" alt="" /></a>
          <ul className="nav-menu">
            {LoggedOffItems.map((item, index) => {
              return (
                <li>
                  <a className={item.cName} onClick={() => { navigateHandler(item.url) }}>
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      }
    </div>
  );
}

export default Navbar;


