import React, { useEffect, useState } from "react";
import logo from "../../images/logo.jpg";
import './Navbar.css';
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const MenuItems = [
  {
    title: 'Add Products',
    url: '/addProduct',
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
  },
  {
    title: 'Suspend Product',
    url: '/suspendProduct',
    cName: 'nav-links',
  },
  {
    title: 'Suspend Store',
    url: '/suspendStore',
    cName: 'nav-links',
  },
]

const AuthItems = [
  {
    title: 'Add Products',
    url: '/addProduct',
    cName: 'nav-links',
  },
  {
    title: 'Delete Account',
    url: '/deleteAccount',
    cName: 'nav-links',
  },
  {
    title: 'Suspend Product',
    url: '/suspendProduct',
    cName: 'nav-links',
  },
  {
    title: 'Suspend Store',
    url: '/suspendStore',
    cName: 'nav-links',
  },
]

const NotAuthItems = [
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

function Navbar() {
  let navigate = useNavigate();
  const { auth } = useAuth();

  const navigateHandler = (url) => {
    navigate(`../${url}`, { replace: true })
  }

  return (
    auth?.username?
      <nav className="NavbarItems">
        <a onClick={() => { navigate('') }}><img src={logo} className="navbar-logo" alt="" /></a>
        <ul className="nav-menu">
          {AuthItems.map((item, index) => {
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
          {NotAuthItems.map((item, index) => {
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

export default Navbar;