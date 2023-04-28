import React from "react";
import logo from "../../images/logo.jpg";
import './Navbar.css';
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

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

const AuthNavbar = () => {
    const auth = useAuth();
    const navigate = useNavigate();
  
    const navigateHandler = (url) => {
      navigate(`../${url}`, { replace: true })
    }
    return (
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
    );
  }
  
  export default AuthNavbar;