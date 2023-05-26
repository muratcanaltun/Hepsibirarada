import React, { useState, useRef, useContext, useEffect, useCallback } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import "./Authentication.css";
import AuthContext from "../../context/AuthProvider";
import md5 from 'md5-hash'

import mainInstance from "../../api/instances/mainInstance";
import request from '../../api/request'
import axios from "axios";



const Login = () => {
    const errorRef = useRef();
    const { setAuth } = useContext(AuthContext);


    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const [userType, setUserType] = useState("customer");

    const [errorMsg, setErrorMsg] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        var APIlink = 'http://localhost:8080/' + userType + 's/'+ user;
        const response = await axios.get(APIlink)
        if (response.data.password === md5(password)) {
            setUser('');
            setPassword('');
            setSuccess(true);
        }
        else {
        }
    }
            
    return (
        <div className="container" >
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href='/'>Go to home</a>
                    </p>
                </section>
            ) : (
                <div className="myd">
                    
                    <p ref={errorRef} className={errorMsg ? "errormsg" : "offscreen"} aria-live="assertive">{errorMsg}</p>
                    <h1 className="header">Sign In</h1>
                    <form className="form1" onSubmit={handleSubmit} style={{ backgroundColor: 'gray' }}>
                        <label for="product_name" className="label">
                            Username:
                        </label>
                        <input
                            className="input"
                            type="text"
                            name="product_name"
                            onChange={(event) => {
                                setUser(event.target.value);
                            }}
                            required
                        ></input>
                        <label for="price" className="label">
                            Password:
                        </label>
                        <input
                            className="input"
                            type="password"
                            name="price"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            required
                        ></input>
                         <FormControl>
                            <FormLabel id="radio-buttons-group-label">User Type:</FormLabel>
                            <RadioGroup
                                aria-labelledby="radio-buttons-group-label"
                                defaultValue="customer"
                                name="radio-buttons-group"
                                row
                                onChange={(e) => {
                                    setUserType(e.target.value);
                                }}
                            >
                                <FormControlLabel
                                    value="customer"
                                    control={<Radio />}
                                    label="Customer"
                                />
                                <FormControlLabel
                                    value="store"
                                    control={<Radio />}
                                    label="Store"
                                />
                            </RadioGroup>
                        </FormControl>
                        <button>Login</button>
                    </form>
                    <p className="need-an-account">
                        Need an Account?<br />
                        <span className="line">
                            <a href="/register">Sign Up</a>
                        </span>
                    </p>
                    </div>
            )}
        </div>
       
    );
};

export default Login;
