import React, {useEffect, useState} from "react";
import logo from "../../images/logo.jpg";
import './Navbar.css';
import {useNavigate} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

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
    }

]

function Navbar (){
    let navigate = useNavigate();
    const [toSearch, setToSearch] = useState("");
    let currentLocation = window.location.pathname;


    let textArea =  <textarea id="SearchTextArea" placeholder="Search" onKeyDown={(e)=>{if(e.keyCode === 13) {navigate(`/search/${toSearch}`, {replace: true})}}} onChange={(e)=>setToSearch(e.target.value)}  className="searchTextBox"></textarea>

    useEffect(() => {
        if(currentLocation.includes("search")) {
            document.getElementById("SearchTextArea").style.display="none";
        } else {
            document.getElementById("SearchTextArea").style.display="flex";
        }
        console.log(currentLocation);
    }, [currentLocation]);

    const navigateHandler = (url) => {
          navigate(`../${url}`, {replace: true})
      }
    return (
      <nav className="NavbarItems">
        <a onClick={()=> {navigate('')}}><img src={logo} className="navbar-logo" alt="" /></a>
        <ul className= "nav-menu">
            {textArea}
            <SearchIcon onClick={()=>navigate(`/search/${toSearch}`, {replace: true})}/>
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