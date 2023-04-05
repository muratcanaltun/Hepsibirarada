import React from "react";
import logo from "../../images/logo.jpg";
import './Navbar.css';
import {useNavigate} from "react-router-dom";

const MenuItems = [
    {
        title: 'Add Products',
        url: '/addProduct',
        cName: 'nav-links',
    },
    {
        title: 'Product 1',
        url: '/product/1',
        cName: 'nav-links',
    },
    {
        title: 'Product 2',
        url: '/product/2',
        cName: 'nav-links',
    },
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
    {
        title: 'Delete Account',
        url: '/deleteAccount',
        cName: 'nav-links',
    }

]

function Navbar (){
      let navigate = useNavigate();

      const navigateHandler = (url) => {
          navigate(`../${url}`, {replace: true})
      }
    return (
      <nav className="NavbarItems">
        <a><img src={logo} className="navbar-logo" alt="" /></a>
        <ul className= "nav-menu">
          {MenuItems.map((item, index) => {
            return (
              <li>
                <a className={item.cName} onClick={() => {navigateHandler(item.url)}}>
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
}

export default Navbar;