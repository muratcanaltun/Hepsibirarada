import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import "./Authentication.css";
import md5 from "md5-hash";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const errorRef = useRef();
  const userRef = useRef();
  const { setAuth } = useAuth();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("customer");

  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var APIlink = "http://localhost:8080/" + userType + "s/" + user;
    const response = await axios.get(APIlink);
    if (response.data.password === md5(password)) {
      setAuth({username: user, password: md5(password)});
      setUser("");
      setPassword("");
      setSuccess(true);
    } else {
    }
  };

  return (
    <div className="container">
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="/">Go to home</a>
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
          <h1 className="header">Sign In</h1>
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="product_name" className="label">
              Username:
            </label>
            <input
              className="input"
              type="text"
              id="username"
              ref={userRef}
              name="product_name"
              onChange={(event) => {
                setUser(event.target.value);
              }}
              value={user}
              required
            ></input>
            <label htmlFor="price" className="label">
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
            Need an Account?
            <br />
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
