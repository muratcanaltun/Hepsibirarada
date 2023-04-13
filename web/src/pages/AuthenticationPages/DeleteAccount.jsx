import React, { useState, useEffect, useRef, useContext } from "react";
import "./Authentication.css";
import mainInstance from "../../api/instances/mainInstance";
import AuthContext from "../../context/AuthProvider";
import axios from "axios";

const DeleteAccount = () => {
    const userRef = useRef();
    const errorRef = useRef();
    const { setAuth } = useContext(AuthContext);

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const [errorMsg, setErrorMsg] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.delete("http://localhost:8080/customers",
            { username: user, password }
        ).then(setUser(''), setPassword(''), setSuccess(true)).catch(err => console.log(err))

    }

    return (
        <div className="container">
            <section>
                <h1 className="header">Delete Account</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <label for="username" className="label">
                        Username:
                    </label>
                    <input
                        className="input"
                        type="text"
                        name="username"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => {
                            setUser(e.target.value);
                        }}
                        required
                    ></input>{" "}
                    <label for="password" className="label">
                        Password:
                    </label>
                    <input
                        className="input"
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        required
                    ></input>
                    <label>
                        <input type="radio" value="store" />I Understand this can't be undone.
                    </label>
                    <button type="submit">
                        Delete
                    </button>
                </form>
            </section>
        </div>
    );
};

export default DeleteAccount;
