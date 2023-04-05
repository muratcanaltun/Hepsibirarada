import React from "react";
import {setDefaultProducts, setProducts} from "../features/productsSlice";
import axios from "axios";
import {useDispatch} from "react-redux";
import ProductList from "../components/Product/ProductList";

const baseURL = "https://fakestoreapi.com/products";

function Home(){

    const dispatch = useDispatch();
    let axios1 = require('axios')

    function delay() {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(42);
            }, 200);
        });
    }

    async function getAllBooks() {
        try {
            let products = await axios.get(`${baseURL}`)
            await delay();
            return products;
        } catch (error) {
            return null;
        }
    }

    const countSetter = (data) => {
        for (let i = 0; i < data.length; i++) {
            data[i].count = 1;
        }
        dispatch(setProducts(data));
        dispatch(setDefaultProducts(data));
    }



    (async function () {
        let products = await getAllBooks();
        countSetter(products?.data);

    })();



    return(<div>
        <ProductList/>
    </div>);
}

export default Home;