import React, { useState, useRef, useContext, useEffect } from "react";
import "./Authentication.css";
import AuthContext from "../../context/AuthProvider";

import mainInstance from "../../api/instances/mainInstance";


const Login = () => {
    const errorRef = useRef();
    const { setAuth } = useContext(AuthContext);


    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const [errorMsg, setErrorMsg] = useState("");
    const [success, setSuccess] = useState("");

       const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await mainInstance.post("http://localhost:8080/customers/",
                JSON.stringify({ username: user, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, password, roles, accessToken });
            setUser('');
            setPassword('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrorMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrorMsg('Missing user or Password');
            } else if (err.response?.status === 401) {
                setErrorMsg('Unauthorized');
            } else {
                setErrorMsg('Login Failed');
            }
            errorRef.current.focus();
        }
    }

    return (
        <div className="container">
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href='/'>Go to home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errorRef} className={errorMsg ? "errormsg" : "offscreen"} aria-live="assertive">{errorMsg}</p>
                    <h1 className="header">Sign In</h1>
                    <form className="form" onSubmit={handleSubmit}>
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
                        <button type="submit">Login</button>
                    </form>
                    <p className="need-an-account">
                        Need an Account?<br />
                        <span className="line">
                            <a href="/register">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </div>
    );
};

export default Login;
