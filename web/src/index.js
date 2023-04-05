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
import Login from "./pages/Login";
import Register from "./pages/Register";
import DeleteAccount from "./pages/DeleteAccount";
import CartFab from "./components/CartFab";
import PersistentDrawerRight from "./components/PersistentDrawerRight";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
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
        </Routes>
    </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
