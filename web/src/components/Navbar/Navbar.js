import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import logo from "../../images/logo.jpg";
import './Navbar.css';


class Navbar extends Component {


  render() {
    return (
      <nav className="NavbarItems">
        <a><img src={logo} className="navbar-logo" alt="" /></a>
        <ul className= "nav-menu">
          {MenuItems.map((item, index) => {
            return (
              <li>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Navbar;