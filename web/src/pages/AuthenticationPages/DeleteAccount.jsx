import React, { useState, useEffect, useRef, useContext } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import "./Authentication.css";
import mainInstance from "../../api/instances/mainInstance";
import AuthContext from "../../context/AuthProvider";
import axios from "axios";
import md5 from 'md5-hash'

const DeleteAccount = () => {
    const userRef = useRef();
    const errorRef = useRef();
    const { setAuth } = useContext(AuthContext);

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("customer");

    const [understood, setUnderstood] = useState(false)

    const [errorMsg, setErrorMsg] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (understood) {
            var APIlink = 'http://localhost:8080/' + userType + 's/' + user;
            const response = await axios.get(APIlink)
            if (response.data.password === md5(password)) {
                axios.delete(APIlink);
                setUser('');
                setPassword('');
                setSuccess(true);
            }
            else {
            }
        } else {

        }
    }

    return (
        <div className="container">{success ? (
            <section>
                <h1>Account Deleted!</h1>
                <br />
                <p>
                    <a href='/'>Go to home</a>
                </p>
            </section>
        ) : (
            <section>
                <h1 className="header">Delete Account</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="username" className="label">
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
                    <label htmlFor="password" className="label">
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
                    <label>
                        <input type="checkbox" value="undertood" onChange={(e) => {
                            setUnderstood(e.target.checked);
                        }} />I Understand this can't be undone.
                    </label>
                    <button type="submit">
                        Delete
                    </button>
                </form>
            </section>
            )}
        </div>
    );
};

export default DeleteAccount;
