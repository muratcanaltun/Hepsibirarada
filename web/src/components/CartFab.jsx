import React from 'react'
import {Fab} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {setOpen} from "../features/drawerSlice";
import {useDispatch, useSelector} from "react-redux";
import {useCookies} from "react-cookie";
import {addItem, getProductFromID} from "../features/cartSlice";
import axios from "axios";
import {setDefaultProducts, setProducts} from "../features/productsSlice";

let firstRender = true;
const baseURL = "https://fakestoreapi.com/products";

//this is a floating button that manages if cart drawer is open
function CartFab() {
    //since this is visible on every page, we get products from the api here
    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['cart']);
    const myCart = useSelector((state) => state.cart.myCart);
    let axios1 = require('axios');

    //function for setting cookies
    const setCookies = () => {
        let idString = "";
        let countString = "";
        //first remove old cookies
        removeCookie("ids");
        removeCookie("counts");
        //put ids and counts of products into strings
        for (let i = 0; i < myCart.length; i++) {
            idString = idString + " " + myCart[i].id.toString();
            countString = countString + " " + myCart[i].count.toString();
        }
        setCookie('ids', idString, { path: '/' });
        setCookie('counts', countString, { path: '/' });
        console.log("cookies set, ids:"+idString);
        console.log("cookies set, counts:"+countString);
    }

    //anytime the cart changes, cookies are also updated.
    React.useEffect(() => {
        if (myCart) {
            setCookies();
        }
    }, [myCart]);

    //for putting delay until products are retrieved from the database
    function delay() {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(42);
            }, 200);
        });
    }

    //for getting the products asynchronously
    async function getAllData() {
        try {
            let products = await axios.get(`${baseURL}`)
            await delay();
            return products;
        } catch (error) {
            return null;
        }
    }

    //setting counts of products since "count" field is not yet in the database
    //after that setting products and default products array
    const countSetter = (data) => {
        for (let i = 0; i < data.length; i++) {
            data[i].count = 1;
        }
        dispatch(setProducts(data));
        dispatch(setDefaultProducts(data));
    }


    //this function makes everything happen
    (async function () {
        let products = await getAllData();
        countSetter(products?.data);
        getCookies(products?.data);
    })();

    //function for getting cookies
    function getCookies(products) {
        if (cookies.ids && firstRender && products) {
            let IDs = cookies.ids.split(" ");
            let counts = cookies.counts.split(" ");
            console.log("ids array before getting cookies:" + IDs);
            console.log("counts array before getting cookies:" + counts);
            let product;
            //get product from its id and add it to cart
            for (let i = 1; i < IDs.length; i++) {
                product = getProductFromID(products, parseInt(IDs[i]));
                for (let a = 0; a < parseInt(counts[i]); a++) {
                    dispatch(addItem(product));
                }
            }
        }
        //get cookies only when page is refreshed
        firstRender = false;
    }


    const handleDrawerOpen = () => {
        dispatch(setOpen(true));
    };

    return (
        <Fab onClick={handleDrawerOpen} size="large" style={{
            position: 'fixed',
            right: "3vh",
            top: "3vh",
            height: 60,
            width: 60,
            minHeight: 60,
            backgroundColor: "rgba(189,59,0,0.76)"
        }}>
            <ShoppingCartIcon fontSize="large" color="action"/>
        </Fab>
    )
}

export default CartFab;
