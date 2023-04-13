import "./Authentication.css";
import React, { useEffect, useState, useRef } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import mainInstance from "../../api/instances/mainInstance";

const USER_REGEX = /^[a-zA-Z0][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

const USER_TYPE = "customer"

const Register = () => {
    const userRef = useRef();
    const errorRef = useRef();

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState("");
    const [userFocus, setUserFocus] = useState("");

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState("");
    const [emailFocus, setEmailFocus] = useState("");

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState("");
    const [passwordFocus, setPasswordFocus] = useState("");

    const [matchPassword, setMatchPassword] = useState("");
    const [validMatchPassword, setValidMatchPassword] = useState("");
    const [matchPasswordFocus, setMatchPasswordFocus] = useState("");

    const [userType, setUserType] = useState("customer");

    const [errorMsg, setErrorMsg] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPassword(result);
        const match = password === matchPassword;
        setValidMatchPassword(match);
    }, [password, matchPassword]);

    useEffect(() => {
        setErrorMsg("");
    }, [user, password, matchPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrorMsg("Invalid Entry");
            return;
        }
        try {
            const response = await mainInstance.post(
                "http://localhost:8080/customer/",
                JSON.stringify({ username: user, email, password }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            console.log(response.data);
            console.log(response.accessToken);
            console.log(JSON.stringify(response));
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrorMsg("No Server Response");
            } else if (err.response?.status === 409) {
                setErrorMsg("Username Taken");
            } else {
                setErrorMsg("Registration failed");
            }
            errorRef.current.focus();
        }
    };

    return (
        <div className="container">
            {success ? (
                <section>
                    <h1>Succees!</h1>
                    <p>
                        <a href="/login">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p
                        ref={errorRef}
                        className={errorMsg ? "errormsg" : "offscreen"}
                        aria-live="assertive"
                    >
                        {errorMsg}
                    </p>
                    <h1 className="header">Register</h1>
                    <form className="form" onSubmit={handleSubmit}>
                        <label for="username" className="label">
                            Username:
                        </label>
                        <input
                            className="input"
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => {
                                setUser(e.target.value);
                            }}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        ></input>
                        {!validName && user && userFocus ? (
                            <p
                                id="uidnote"
                                className={
                                    userFocus && user && !validName ? "instrucitons" : "offscreen"
                                }
                            >
                                4 to 24 characters. <br />
                                Must begin with a letter. <br />
                            </p>
                        ) : null}
                        <label for="email" className="label">
                            E-Mail:
                        </label>
                        <input
                            className="input"
                            type="email"
                            id="email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        ></input>
                        {!validEmail && emailFocus ? (
                            <p
                                id="emailnote"
                                className={
                                    emailFocus && email && !validEmail
                                        ? "instructions"
                                        : "offscreen"
                                }
                            >
                                Enter a valid email. <br />
                            </p>
                        ) : null}
                        <label for="password" className="label">
                            Password:
                        </label>
                        <input
                            className="input"
                            type="password"
                            id="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            required
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        ></input>
                        {!validPassword && passwordFocus ? (
                            <p
                                id="pwdnote"
                                className={
                                    passwordFocus && !validPassword ? "instructions" : "offscreen"
                                }
                            >
                                8 to 24 characters. <br />
                                Must include uppercase and lowercase letters and a number.{" "}
                                <br />
                            </p>
                        ) : null}
                        <label for="confirm_password" className="label">
                            Confirm Password:
                        </label>
                        <input
                            className="input"
                            type="password"
                            id="confirm_password"
                            onChange={(e) => {
                                setMatchPassword(e.target.value);
                            }}
                            required
                            aria-invalid={validMatchPassword ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchPasswordFocus(true)}
                            onBlur={() => setMatchPasswordFocus(false)}
                        ></input>
                        {!validMatchPassword && matchPasswordFocus ? (
                            <p
                                id="confirmnote"
                                className={
                                    matchPasswordFocus && !validMatchPassword
                                        ? "instructions"
                                        : "offscreen"
                                }
                            >
                                Must match the password. <br />
                            </p>
                        ) : null}
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
                                    value="store-owner"
                                    control={<Radio />}
                                    label="Store owner"
                                />
                            </RadioGroup>
                        </FormControl>
                        <button
                            disabled={
                                !validName || !validPassword || !validMatchPassword
                                    ? true
                                    : false
                            }
                        >
                            Sign Up
                        </button>
                    </form>
                    <p className="already-signed-in">
                        Already Registered?
                        <br />
                        <span className="line">
                            <a href="/login">Sign In</a>
                        </span>
                    </p>
                </section>
            )}
        </div>
    );
};

export default Register;
