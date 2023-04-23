import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import {store} from "./app/store";
import {Provider} from "react-redux";
import AddProductPage from "./pages/AddProductPage";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/AuthenticationPages/Login";
import Register from "./pages/AuthenticationPages/Register";
import DeleteAccount from "./pages/AuthenticationPages/DeleteAccount";
import CartFab from "./components/CartFab";
import PersistentDrawerRight from "./components/PersistentDrawerRight";
import {CookiesProvider} from "react-cookie";
import CheckoutPage from "./pages/CheckoutPage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <CookiesProvider>
    <Provider store={store}>
    <BrowserRouter>
        <Navbar/>
        <CartFab/>
        <PersistentDrawerRight/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="product">
                <Route path=":id" element={<ProductPage />} />
            </Route>
            <Route path="addProduct" element={<AddProductPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="deleteAccount" element={<DeleteAccount/>} />
            <Route path="checkout" element={<CheckoutPage/>} />
        </Routes>
    </BrowserRouter>
    </Provider>
    </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
